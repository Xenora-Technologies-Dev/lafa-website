type Bucket = {
  count: number;
  resetAt: number;
  failures: number;
  lockedUntil: number;
};

const buckets = new Map<string, Bucket>();

function now() {
  return Date.now();
}

function getBucket(key: string, windowMs: number): Bucket {
  const current = buckets.get(key);
  const t = now();
  if (!current || (current.resetAt <= t && current.lockedUntil <= t)) {
    const fresh: Bucket = { count: 0, resetAt: t + windowMs, failures: 0, lockedUntil: 0 };
    buckets.set(key, fresh);
    return fresh;
  }
  return current;
}

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSec: number; locked: boolean; message: string };

/**
 * Basic in-memory rate limit. Suitable for a single Netlify function instance.
 * Not shared across instances; still blocks noisy clients on one instance.
 */
export function consumeRateLimit(
  key: string,
  options: { limit: number; windowMs: number; message?: string },
): RateLimitResult {
  const bucket = getBucket(key, options.windowMs);
  const t = now();
  if (bucket.lockedUntil > t) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((bucket.lockedUntil - t) / 1000),
      locked: true,
      message: options.message || 'Too many requests. Try again later.',
    };
  }
  if (bucket.resetAt <= t) {
    bucket.count = 0;
    bucket.resetAt = t + options.windowMs;
  }
  bucket.count += 1;
  buckets.set(key, bucket);
  if (bucket.count > options.limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - t) / 1000)),
      locked: false,
      message: options.message || 'Too many requests. Try again later.',
    };
  }
  return { ok: true };
}

/**
 * Login lockout: count failures; after `maxFailures`, lock the key for `lockoutMs`.
 */
export function registerLoginFailure(
  key: string,
  options: { maxFailures: number; windowMs: number; lockoutMs: number },
): RateLimitResult {
  const bucket = getBucket(key, options.windowMs);
  const t = now();
  if (bucket.lockedUntil > t) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((bucket.lockedUntil - t) / 1000),
      locked: true,
      message: 'Too many failed sign-in attempts. Try again later.',
    };
  }
  if (bucket.resetAt <= t) {
    bucket.failures = 0;
    bucket.resetAt = t + options.windowMs;
  }
  bucket.failures += 1;
  if (bucket.failures >= options.maxFailures) {
    bucket.lockedUntil = t + options.lockoutMs;
    bucket.failures = 0;
    buckets.set(key, bucket);
    return {
      ok: false,
      retryAfterSec: Math.ceil(options.lockoutMs / 1000),
      locked: true,
      message: 'Too many failed sign-in attempts. Try again later.',
    };
  }
  buckets.set(key, bucket);
  return { ok: true };
}

export function clearLoginFailures(key: string) {
  buckets.delete(key);
}

export function loginLockStatus(key: string): RateLimitResult {
  const bucket = buckets.get(key);
  const t = now();
  if (bucket && bucket.lockedUntil > t) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((bucket.lockedUntil - t) / 1000),
      locked: true,
      message: 'Too many failed sign-in attempts. Try again later.',
    };
  }
  return { ok: true };
}

export function clientKey(request: Request, scope: string) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const realIp = request.headers.get('x-real-ip')?.trim();
  const ip = forwarded || realIp || 'unknown';
  return `${scope}:${ip}`;
}