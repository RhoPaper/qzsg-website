// 性能监控工具
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    // 监听页面加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.measureDOMContentLoaded();
      });
    } else {
      this.measureDOMContentLoaded();
    }

    // 监听页面完全加载
    window.addEventListener('load', () => {
      this.measurePageLoad();
    });

    // 监听性能指标
    this.observePerformanceMetrics();
  }

  measureDOMContentLoaded() {
    const timing = performance.timing;
    const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
    this.metrics.domContentLoaded = domContentLoaded;
    console.log(`DOM Content Loaded: ${domContentLoaded}ms`);
  }

  measurePageLoad() {
    const timing = performance.timing;
    const pageLoad = timing.loadEventEnd - timing.navigationStart;
    this.metrics.pageLoad = pageLoad;
    console.log(`Page Load: ${pageLoad}ms`);

    // 测量其他关键指标
    this.measureKeyMetrics();
  }

  measureKeyMetrics() {
    const timing = performance.timing;
    
    // DNS查询时间
    const dns = timing.domainLookupEnd - timing.domainLookupStart;
    this.metrics.dns = dns;
    
    // TCP连接时间
    const tcp = timing.connectEnd - timing.connectStart;
    this.metrics.tcp = tcp;
    
    // 首字节时间
    const ttfb = timing.responseStart - timing.navigationStart;
    this.metrics.ttfb = ttfb;
    
    // DOM解析时间
    const domParse = timing.domInteractive - timing.responseEnd;
    this.metrics.domParse = domParse;
    
    // 资源加载时间
    const resourceLoad = timing.loadEventEnd - timing.domContentLoadedEventEnd;
    this.metrics.resourceLoad = resourceLoad;

    console.log('Performance Metrics:', this.metrics);
  }

  observePerformanceMetrics() {
    // 使用 Performance Observer 监听现代性能指标
    if ('PerformanceObserver' in window) {
      // 监听 Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.lcp = lastEntry.startTime;
          console.log(`LCP: ${lastEntry.startTime}ms`);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // 监听 First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            this.metrics.fid = entry.processingStart - entry.startTime;
            console.log(`FID: ${this.metrics.fid}ms`);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // 监听 Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.metrics.cls = clsValue;
          console.log(`CLS: ${clsValue}`);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observer not supported');
      }
    }
  }

  // 获取性能指标
  getMetrics() {
    return this.metrics;
  }

  // 发送性能数据到分析服务
  sendMetrics() {
    if (Object.keys(this.metrics).length > 0) {
      // 这里可以发送到Google Analytics或其他分析服务
      console.log('Sending performance metrics:', this.metrics);
      
      // 示例：发送到Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'performance', {
          event_category: 'performance',
          event_label: 'page_load',
          value: this.metrics.pageLoad
        });
      }
    }
  }

  // 测量特定操作的性能
  measureOperation(name, operation) {
    const start = performance.now();
    const result = operation();
    const end = performance.now();
    const duration = end - start;
    
    this.metrics[name] = duration;
    console.log(`${name}: ${duration}ms`);
    
    return result;
  }

  // 异步测量
  async measureAsyncOperation(name, operation) {
    const start = performance.now();
    const result = await operation();
    const end = performance.now();
    const duration = end - start;
    
    this.metrics[name] = duration;
    console.log(`${name}: ${duration}ms`);
    
    return result;
  }
}

// 创建全局性能监控实例
const performanceMonitor = new PerformanceMonitor();

// 在页面卸载时发送性能数据
window.addEventListener('beforeunload', () => {
  performanceMonitor.sendMetrics();
});

export default performanceMonitor; 