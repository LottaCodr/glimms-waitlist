import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let limiter: Ratelimit | null | undefined;

function getLimiter() {
  if (limiter !== undefined) return limiter;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return (limiter = null);

  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, '10 m'),
    prefix: 'glimms:waitlist',
    analytics: false,
  });
  return limiter;
}

export async function checkWaitlistRateLimit(identifier: string) {
  const activeLimiter = getLimiter();
  // Local development remains usable without an Upstash project. Production deploys
  // must configure Upstash; the route explicitly rejects otherwise.
  if (!activeLimiter) return { success: process.env.NODE_ENV !== 'production', reset: 0 };
  return activeLimiter.limit(identifier);
}
