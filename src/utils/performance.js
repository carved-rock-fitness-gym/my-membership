// Performance monitoring utility for tracking database query improvements
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      requests: 0,
      totalTime: 0,
      averageTime: 0,
      cacheHits: 0,
      cacheMisses: 0,
      slowRequests: 0, // Requests taking > 100ms
      requestTimes: []
    };
    this.slowThreshold = 100; // milliseconds
  }

  // Start timing a request
  startTimer(operation) {
    return {
      operation,
      startTime: process.hrtime.bigint()
    };
  }

  // End timing and record metrics
  endTimer(timer, cacheHit = false) {
    const endTime = process.hrtime.bigint();
    const durationMs = Number((endTime - timer.startTime) / BigInt(1000000));
    
    this.metrics.requests++;
    this.metrics.totalTime += durationMs;
    this.metrics.averageTime = this.metrics.totalTime / this.metrics.requests;
    
    if (cacheHit) {
      this.metrics.cacheHits++;
    } else {
      this.metrics.cacheMisses++;
    }
    
    if (durationMs > this.slowThreshold) {
      this.metrics.slowRequests++;
    }
    
    // Keep last 100 request times for detailed analysis
    this.metrics.requestTimes.push({
      operation: timer.operation,
      duration: durationMs,
      cacheHit,
      timestamp: Date.now()
    });
    
    if (this.metrics.requestTimes.length > 100) {
      this.metrics.requestTimes.shift();
    }

    return durationMs;
  }

  // Get performance statistics
  getStats() {
    const cacheHitRate = this.metrics.requests > 0 ? 
      (this.metrics.cacheHits / this.metrics.requests * 100).toFixed(2) : 0;
      
    const slowRequestRate = this.metrics.requests > 0 ? 
      (this.metrics.slowRequests / this.metrics.requests * 100).toFixed(2) : 0;

    return {
      ...this.metrics,
      cacheHitRate: `${cacheHitRate}%`,
      slowRequestRate: `${slowRequestRate}%`,
      averageTime: Math.round(this.metrics.averageTime * 100) / 100
    };
  }

  // Reset all metrics
  reset() {
    this.metrics = {
      requests: 0,
      totalTime: 0,
      averageTime: 0,
      cacheHits: 0,
      cacheMisses: 0,
      slowRequests: 0,
      requestTimes: []
    };
  }

  // Log performance summary
  logSummary() {
    const stats = this.getStats();
    console.log('=== Performance Summary ===');
    console.log(`Total Requests: ${stats.requests}`);
    console.log(`Average Response Time: ${stats.averageTime}ms`);
    console.log(`Cache Hit Rate: ${stats.cacheHitRate}`);
    console.log(`Slow Request Rate: ${stats.slowRequestRate}`);
    console.log(`Cache Hits: ${stats.cacheHits}, Cache Misses: ${stats.cacheMisses}`);
    console.log('===========================');
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Helper function to wrap service methods with performance monitoring
export function monitorPerformance(serviceName, methodName, method) {
  return async function(...args) {
    const timer = performanceMonitor.startTimer(`${serviceName}.${methodName}`);
    
    try {
      const result = await method.apply(this, args);
      
      // Check if result came from cache (simple heuristic: very fast response < 5ms)
      const duration = performanceMonitor.endTimer(timer, false);
      const cacheHit = duration < 5;
      
      if (cacheHit) {
        performanceMonitor.metrics.cacheHits++;
        performanceMonitor.metrics.cacheMisses = Math.max(0, performanceMonitor.metrics.cacheMisses - 1);
      }
      
      return result;
    } catch (error) {
      performanceMonitor.endTimer(timer, false);
      throw error;
    }
  };
}