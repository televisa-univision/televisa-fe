import { isValidArray, getKey } from '../../../helpers';
import Tracker from '../Tracker';

const PREFIX = 'performance.';

/**
 * Tracks performance events
 */
class PerformanceTracker extends Tracker {
  /**
   * Sets the events for this tracker.
   * @constructor
   */
  constructor() {
    super({
      pageLoad: `${PREFIX}pageLoad`,
      swPerformance: `${PREFIX}serviceWorkerPerformance`,
    });

    this.paintMetrics = {
      'first-contentful-paint': 'firstContentfulPaint',
      'first-paint': 'firstPaint',
    };
  }

  /**
   * Track the events.
   * @param {string} event Event name (see constructor).
   * @param {Object} data Event data
   */
  track(event, data = {}) {
    let dataLayer = {};
    switch (event) {
      case this.events.pageLoad:
        if ('performance' in global && typeof global.performance.getEntriesByType === 'function') {
          const paintMetrics = global.performance.getEntriesByType('paint');
          const navMetris = global.performance.getEntriesByType('navigation');
          const swSupported = 'serviceWorker' in global.navigator;
          dataLayer = {
            event: 'pageload_performance',
            swControlled: swSupported ? !!global.navigator.serviceWorker.controller : 'unsupported',
          };
          if (isValidArray(navMetris)) {
            const [{
              domContentLoadedEventEnd,
              loadEventStart,
              domComplete,
            }] = navMetris;
            dataLayer = Object.assign(dataLayer, {
              domContentLoad: Math.round(domContentLoadedEventEnd),
              pageLoad: Math.round(loadEventStart),
              domComplete: Math.round(domComplete),
            });
          }
          if (Array.isArray(paintMetrics)) {
            paintMetrics.forEach(({ name, startTime }) => {
              if (this.paintMetrics[name]) {
                dataLayer[this.paintMetrics[name]] = Math.round(startTime);
              }
            });
          }
        }
        break;
      case this.events.swPerformance: {
        dataLayer = {
          event: 'service_worker_performance',
          event_action: data.action,
          registrationTime: data.time,
          networkType: getKey(global, 'navigator.connection.effectiveType', 'N/A'),
        };
        break;
      }
      default: break;
    }

    if (dataLayer.event) {
      Tracker.fireEvent(dataLayer);
    }
  }
}

export default new PerformanceTracker();
