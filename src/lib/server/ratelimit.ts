import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "$env/dynamic/private";

// Create Redis instance
const redis =
  env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: env.UPSTASH_REDIS_REST_URL,
        token: env.UPSTASH_REDIS_REST_TOKEN,
      })
    : undefined;

// Create rate limiter instances
export const contactFormRateLimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(3, "10 m"), // 3 requests per 10 minutes
      analytics: true,
    })
  : undefined;

export const globalRateLimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per minute
      analytics: true,
    })
  : undefined;

// Fallback for when Redis is not configured
export async function checkRateLimit(
  identifier: string,
  type: "contact" | "global" = "contact",
) {
  const rateLimit = type === "contact" ? contactFormRateLimit : globalRateLimit;

  if (!rateLimit) {
    console.warn("Rate limiting not configured - Redis credentials missing");
    return { success: true, limit: 0, remaining: 0, reset: new Date() };
  }

  try {
    return await rateLimit.limit(identifier);
  } catch (error) {
    console.error("Rate limit check failed:", error);
    // Fail open - allow the request if rate limiting fails
    return { success: true, limit: 0, remaining: 0, reset: new Date() };
  }
}
