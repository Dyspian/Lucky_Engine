type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

class InMemoryCache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private readonly TTL = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

  public set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if entry is expired
    if (Date.now() - entry.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  public has(key: string): boolean {
    return this.get(key) !== null;
  }

  public clear(): void {
    this.cache.clear();
  }
}

const cache = new InMemoryCache();
export default cache;