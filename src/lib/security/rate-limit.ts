type RateLimitOptions = {
  windowMs: number;
  max: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

function nowMs(): number {
  return Date.now();
}

function getBucketKey(key: string, windowMs: number): string {
  const windowId = Math.floor(nowMs() / windowMs);
  return `${key}:${windowId}`;
}

export function checkRateLimit(key: string, options: RateLimitOptions) {
  const bucketKey = getBucketKey(key, options.windowMs);
  const current = buckets.get(bucketKey);

  if (!current) {
    const resetAt = nowMs() + options.windowMs;
    buckets.set(bucketKey, { count: 1, resetAt });

    return {
      allowed: true,
      remaining: options.max - 1,
      resetAt,
    };
  }

  if (current.count >= options.max) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: current.resetAt,
    };
  }

  current.count += 1;
  buckets.set(bucketKey, current);

  return {
    allowed: true,
    remaining: options.max - current.count,
    resetAt: current.resetAt,
  };
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) {
      return first;
    }
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

// Opportunistic cleanup to limit memory growth in long-lived processes.
setInterval(() => {
  const now = nowMs();
  for (const [key, value] of buckets.entries()) {
    if (value.resetAt <= now) {
      buckets.delete(key);
    }
  }
}, 60_000).unref();
