/**
 * In-Memory Rate Limiting for Contact Form Protection
 * Simple, reliable rate limiting without external dependencies
 */

// In-memory rate limiting store
const memoryStore = new Map<string, { count: number; resetTime: number; entries: number[] }>();

// Clean up expired entries periodically to prevent memory leaks
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

// In-memory rate limiting implementation using sliding window
const checkMemoryRateLimit = (identifier: string, limit: number, windowMs: number) => {
  const key = identifier;
  const now = Date.now();
  const windowStart = now - windowMs;

  let data = memoryStore.get(key);
  if (!data) {
    data = { count: 0, resetTime: now + windowMs, entries: [] };
    memoryStore.set(key, data);
  }

  // Remove old entries outside the sliding window
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

  // Add current request timestamp
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

// Rate limiting class for consistent API
export class InMemoryRateLimit {
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
    // Use key prefix to namespace different rate limiters
    const key = `${this.keyPrefix}:${identifier}`;
    return checkMemoryRateLimit(key, this.limit, this.windowMs);
  }
}

// Create rate limiters for different endpoints
export const contactFormRateLimit = new InMemoryRateLimit(
  3, // 3 requests
  10 * 60 * 1000, // per 10 minutes
  "contact_rate", // key prefix
);

export const globalRateLimit = new InMemoryRateLimit(
  10, // 10 requests
  60 * 1000, // per minute
  "global_rate", // key prefix
);

// Main rate limiting function - maintains same API for backward compatibility
export async function checkRateLimit(
  identifier: string,
  type: "contact" | "global" = "contact",
) {
  const limiter = type === "contact" ? contactFormRateLimit : globalRateLimit;
  return await limiter.check(identifier);
}
