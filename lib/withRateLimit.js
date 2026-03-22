const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_TRACKED_IPS = 500;

const globalStore = globalThis.__portfolioRateLimitStore || new Map();
globalThis.__portfolioRateLimitStore = globalStore;

function normalizeIp(ip = 'unknown') {
  if (typeof ip !== 'string') {
    return 'unknown';
  }

  const normalizedIp = ip.trim();
  return normalizedIp || 'unknown';
}

function cleanupExpiredEntries(now) {
  for (const [key, entry] of globalStore.entries()) {
    if (entry.resetAt <= now) {
      globalStore.delete(key);
    }
  }

  if (globalStore.size <= MAX_TRACKED_IPS) {
    return;
  }

  const entries = [...globalStore.entries()].sort((a, b) => a[1].resetAt - b[1].resetAt);
  const entriesToRemove = entries.slice(0, globalStore.size - MAX_TRACKED_IPS);

  for (const [key] of entriesToRemove) {
    globalStore.delete(key);
  }
}

export async function rateLimiter(ip = 'unknown') {
  try {
    const now = Date.now();
    const key = normalizeIp(ip);

    cleanupExpiredEntries(now);

    const existingEntry = globalStore.get(key);

    if (!existingEntry || existingEntry.resetAt <= now) {
      globalStore.set(key, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });

      return { allowed: true };
    }

    if (existingEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
      return {
        allowed: false,
        message: 'Too many requests. Please try again in 1 minute.',
      };
    }

    existingEntry.count += 1;
    globalStore.set(key, existingEntry);

    return { allowed: true };
  } catch (error) {
    console.error('Rate limiter failed:', error);
    return { allowed: true };
  }
}
