const grammarCache = new Map<string, any>();
const cacheTimers = new Map<string, NodeJS.Timeout>();

export function getCached(key: string) {
  return grammarCache.get(key);
}

export function setCached(
  key: string,
  data: any,
  ttlMs = 1000 * 60 * 30
) {
  grammarCache.set(key, data);

  if (cacheTimers.has(key)) {
    clearTimeout(cacheTimers.get(key));
  }

  const timer = setTimeout(() => {
    grammarCache.delete(key);
    cacheTimers.delete(key);
  }, ttlMs);

  cacheTimers.set(key, timer);
}
