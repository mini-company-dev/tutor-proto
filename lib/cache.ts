// cache.ts
import { Method } from "axios";

const grammarCache = new Map<string, any>();
const cacheTimers = new Map<string, NodeJS.Timeout>();

export function getCached(method: Method, path: string) {
  return grammarCache.get(buildKey(method, path));
}

export function setCached(
  method: Method,
  path: string,
  data: any,
  ttlMs = 1000 * 60 * 30
) {
  const key = buildKey(method, path);
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

function buildKey(method: Method, path: string): string {
  return `${method}-${path}`;
}
