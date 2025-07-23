/**
 * Local Redis Rate Limiting Configuration
 * Uses in-memory fallback to avoid ES module bundling issues
 * Redis is optional and will fall back to memory-based rate limiting
 */

import { env } from "$env/dynamic/private";

// In-memory rate limiting store as fallback
const memoryStore = new Map<string, { count: number; resetTime: number; entries: number[] }>();

// Clean up expired entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, data] of memoryStore.entries()) {
      if (now > data.resetTime) {
        memoryStore.delete(key);
      }
    }
  }, 60000); // Clean up every minute
}

// Redis client instance (created lazily)
let redisClient: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
let isRedisConnected = false;
let redisModule: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
let useRedis = true; // Flag to disable Redis if it causes issues

// Check if we're in a server environment
const isServer = typeof process !== 'undefined' && process.versions?.node;

// Dynamically import Redis only on server side to avoid bundling issues
const getRedisModule = async () => {
  if (!isServer || !useRedis) {
    return null;
  }

  if (!redisModule) {
    try {
      redisModule = await import("redis");
    } catch (error) {
      console.warn("Failed to import Redis module, falling back to in-memory rate limiting:", error);
      useRedis = false;
      return null;
    }
  }
  return redisModule;
};

// Create Redis client lazily to avoid SSR issues
const getRedisClient = async () => {
  if (!redisClient) {
    const redis = await getRedisModule();
    if (!redis) return null;

    redisClient = redis.createClient({
      url: env.REDIS_URL || "redis://localhost:6379",
      socket: {
        connectTimeout: 5000,
      },
    });
  }
  return redisClient;
};

// Handle Redis connection
const connectRedis = async () => {
  if (!useRedis) return false;
  if (isRedisConnected) return true;

  try {
    const client = await getRedisClient();
    if (!client) return false;

    await client.connect();
    isRedisConnected = true;
    console.log("✅ Connected to local Redis");
    return true;
  } catch (error) {
    console.warn("⚠️ Redis connection failed, using in-memory rate limiting:", error);
    useRedis = false;
    return false;
  }
};

// In-memory rate limiting implementation
const checkMemoryRateLimit = (identifier: string, limit: number, windowMs: number) => {
  const key = identifier;
  const now = Date.now();
  const windowStart = now - windowMs;

  let data = memoryStore.get(key);
  if (!data) {
    data = { count: 0, resetTime: now + windowMs, entries: [] };
    memoryStore.set(key, data);
  }

  // Remove old entries outside the window
  data.entries = data.entries.filter(timestamp => timestamp > windowStart);
  data.count = data.entries.length;

  // Check if limit exceeded
  if (data.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: new Date(now + windowMs),
    };
  }

  // Add current request
  data.entries.push(now);
  data.count = data.entries.length;
  data.resetTime = now + windowMs;

  return {
    success: true,
    limit,
    remaining: limit - data.count,
    reset: new Date(now + windowMs),
  };
};

// Rate limiting implementation using local Redis
export class LocalRedisRateLimit {
  constructor(
    private limit: number,
    private windowMs: number,
    private keyPrefix: string,
  ) { }

  async check(identifier: string): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: Date;
  }> {
    // Try Redis first, fallback to memory if unavailable
    const connected = await connectRedis();

    if (!connected || !useRedis) {
      // Use in-memory rate limiting as fallback
      console.warn("Using in-memory rate limiting (Redis unavailable)");
      return checkMemoryRateLimit(identifier, this.limit, this.windowMs);
    }

    const key = `${this.keyPrefix}:${identifier}`;
    const now = Date.now();
    const windowStart = now - this.windowMs;

    try {
      const client = await getRedisClient();
      if (!client) {
        // Fall back to memory-based rate limiting
        return checkMemoryRateLimit(identifier, this.limit, this.windowMs);
      }

      // Use Redis sorted set for sliding window
      const multi = client.multi();

      // Remove old entries outside the window
      multi.zRemRangeByScore(key, 0, windowStart);

      // Count current entries in window
      multi.zCard(key);

      // Add current request
      multi.zAdd(key, { score: now, value: `${now}-${Math.random()}` });

      // Set expiry
      multi.expire(key, Math.ceil(this.windowMs / 1000));

      const results = await multi.exec();
      const currentCount = results[1] as unknown as number;

      // Check if limit exceeded (before adding current request)
      if (currentCount >= this.limit) {
        // Remove the request we just added since we're rejecting it
        await client.zRem(key, `${now}-${Math.random()}`);

        return {
          success: false,
          limit: this.limit,
          remaining: 0,
          reset: new Date(now + this.windowMs),
        };
      }

      return {
        success: true,
        limit: this.limit,
        remaining: this.limit - currentCount - 1,
        reset: new Date(now + this.windowMs),
      };
    } catch (error) {
      console.warn("Redis rate limiting error, falling back to memory:", error);
      // Fall back to in-memory rate limiting on Redis errors
      useRedis = false;
      return checkMemoryRateLimit(identifier, this.limit, this.windowMs);
    }
  }
}

// Create rate limiters for different endpoints
export const contactFormRateLimit = new LocalRedisRateLimit(
  3, // 3 requests
  10 * 60 * 1000, // per 10 minutes
  "contact_rate", // key prefix
);

export const globalRateLimit = new LocalRedisRateLimit(
  10, // 10 requests
  60 * 1000, // per minute
  "global_rate", // key prefix
);

// Main rate limiting function
export async function checkRateLimit(
  identifier: string,
  type: "contact" | "global" = "contact",
) {
  const limiter = type === "contact" ? contactFormRateLimit : globalRateLimit;
  return await limiter.check(identifier);
}

// Graceful shutdown
if (isServer) {
  process.on("SIGINT", async () => {
    if (isRedisConnected && redisClient) {
      try {
        await redisClient.quit();
        console.log("Redis connection closed");
      } catch (error) {
        console.warn("Error closing Redis connection:", error);
      }
    }
  });

  process.on("SIGTERM", async () => {
    if (isRedisConnected && redisClient) {
      try {
        await redisClient.quit();
        console.log("Redis connection closed");
      } catch (error) {
        console.warn("Error closing Redis connection:", error);
      }
    }
  });
}
