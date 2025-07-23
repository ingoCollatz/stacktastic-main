import { randomBytes, createHmac } from "crypto";
import { env } from "$env/dynamic/private";

// Use a strong secret for CSRF token generation
const CSRF_SECRET =
  env.CSRF_SECRET || env.CAPTCHA_SECRET || "dev-secret-change-in-production";

export function generateCSRFToken(): string {
  const randomValue = randomBytes(32).toString("hex");
  const timestamp = Date.now().toString();
  const payload = `${randomValue}.${timestamp}`;
  const signature = createHmac("sha256", CSRF_SECRET)
    .update(payload)
    .digest("hex");

  return `${payload}.${signature}`;
}

export function verifyCSRFToken(
  token: string,
  maxAge: number = 3600000,
): boolean {
  // 1 hour default
  if (!token || typeof token !== "string") {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  const [randomValue, timestamp, signature] = parts;
  const payload = `${randomValue}.${timestamp}`;

  // Verify signature
  const expectedSignature = createHmac("sha256", CSRF_SECRET)
    .update(payload)
    .digest("hex");

  if (signature !== expectedSignature) {
    return false;
  }

  // Check timestamp
  const tokenTime = parseInt(timestamp);
  const currentTime = Date.now();

  if (currentTime - tokenTime > maxAge) {
    return false;
  }

  return true;
}

// Helper to get client IP address
export function getClientIP(request: Request): string {
  // Check various headers for the real IP
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const clientIP = request.headers.get("x-client-ip");

  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (clientIP) {
    return clientIP;
  }

  // Fallback to a default IP if none found
  return "127.0.0.1";
}
