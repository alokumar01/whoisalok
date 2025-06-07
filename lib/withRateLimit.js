import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const RATE_LIMIT_WINDOW = 60*60 ; // 1 hour in seconds
const RATE_LIMIT_MAX_REQUESTS = 5;

export async function rateLimiter(ip) {
  const key = `rate_limit:${ip}`;
  const requests = await redis.incr(key);

  if (requests === 1) {
    await redis.expire(key, RATE_LIMIT_WINDOW);
  }

  if (requests > RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      message: 'Too many requests. Please try again in an hour.',
    };
  }

  return { allowed: true };
}
