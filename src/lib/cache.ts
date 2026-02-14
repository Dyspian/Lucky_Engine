"use client";

type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

class InMemoryCache {
  private store = new Map<string, CacheEntry<any>>();
  private lastGoodStore = new Map<string, any>();

  /**
   * Sets a value in the cache with a specific TTL.
   * Also updates the 'lastGood' fallback storage.
   */
  public set<T>(key: string, value: T, ttlMs: number): void {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
    });
    this.lastGoodStore.set(key, value);
  }

  /**
   * Retrieves a value from the cache.
   * Returns the fresh value if available, otherwise returns the last known good value.
   */
  public get<T>(key: string): { value: T | null; source: "cache" | "fallback" | "none" } {
    const entry = this.store.get(key);
    
    if (entry && entry.expiresAt > Date.now()) {
      return { value: entry.value, source: "cache" };
    }

    const lastGood = this.lastGoodStore.get(key);
    if (lastGood) {
      return { value: lastGood, source: "fallback" };
    }

    return { value: null, source: "none" };
  }

  public clear(): void {
    this.store.clear();
    this.lastGoodStore.clear();
  }
}

export const cache = new InMemoryCache();