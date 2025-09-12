// Centralized cache management utility for performance optimization
class CacheManager {
  constructor(ttl = 300000) { // Default 5 minutes TTL
    this.cache = new Map();
    this.ttl = ttl; // Time to live in milliseconds
    this.timers = new Map();
  }

  set(key, value, customTtl = null) {
    const expiry = customTtl || this.ttl;
    
    // Clear existing timer if any
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
    }

    // Set the value
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });

    // Set expiration timer
    const timer = setTimeout(() => {
      this.delete(key);
    }, expiry);
    
    this.timers.set(key, timer);
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) {
      return null;
    }

    // Check if expired (backup check)
    if (Date.now() - item.timestamp > this.ttl) {
      this.delete(key);
      return null;
    }

    return item.value;
  }

  has(key) {
    return this.cache.has(key) && this.get(key) !== null;
  }

  delete(key) {
    // Clear timer
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }
    
    // Remove from cache
    return this.cache.delete(key);
  }

  clear() {
    // Clear all timers
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    
    this.timers.clear();
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }

  // Get cache statistics for performance monitoring
  getStats() {
    const now = Date.now();
    const entries = Array.from(this.cache.entries());
    
    return {
      size: this.size(),
      oldestEntry: entries.length > 0 ? 
        Math.min(...entries.map(([, item]) => now - item.timestamp)) : 0,
      newestEntry: entries.length > 0 ? 
        Math.max(...entries.map(([, item]) => now - item.timestamp)) : 0,
      ttl: this.ttl
    };
  }
}

// Export singleton instances for different cache types
export const classCache = new CacheManager(300000); // 5 minutes for class data
export const membershipCache = new CacheManager(900000); // 15 minutes for membership data  
export const trainingCache = new CacheManager(300000); // 5 minutes for training data

export { CacheManager };