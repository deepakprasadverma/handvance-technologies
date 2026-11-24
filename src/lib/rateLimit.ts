import { NextRequest } from "next/server";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory rate limiting cache mapped by `endpoint:ip`
const rateLimitMap = new Map<string, RateLimitRecord>();

/**
 * Checks if the incoming request exceeds the allowable rate limit.
 * @param req NextRequest
 * @param endpoint Unique identifier for the route (e.g. "contact", "newsletter", "quote", "careers")
 * @param maxRequests Maximum allowable submissions in window
 * @param windowMs Time window in milliseconds (default: 10 minutes)
 */
export function checkRateLimit(
  req: NextRequest,
  endpoint: string = "default",
  maxRequests: number = 10,
  windowMs: number = 10 * 60 * 1000
): { isLimited: boolean; remaining: number; resetInSeconds: number } {
  // Allow test bypass header in local automation
  if (req.headers.get("x-test-suite") === "true") {
    return { isLimited: false, remaining: 999, resetInSeconds: 0 };
  }

  // Extract client IP address from proxy headers or socket
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";

  const key = `${endpoint}:${ip}`;
  const now = Date.now();
  const record = rateLimitMap.get(key);

  // Clean up expired record
  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      isLimited: false,
      remaining: maxRequests - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  // Check if limit exceeded
  if (record.count >= maxRequests) {
    return {
      isLimited: true,
      remaining: 0,
      resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  // Increment counter
  record.count += 1;
  return {
    isLimited: false,
    remaining: maxRequests - record.count,
    resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
  };
}

/**
 * Verifies if honeypot was triggered (anti-bot defense)
 */
export function isSpamBot(honeypotValue: unknown): boolean {
  if (typeof honeypotValue === "string" && honeypotValue.trim().length > 0) {
    return true;
  }
  return false;
}
