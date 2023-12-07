import PerformanceTracker from './PerformanceTracker';
import Tracker from '../Tracker';

// create a mock window
const performance = {
  location: {
    href: '#',
  },
};

beforeEach(() => {
  // mock the global window object
  const windowSpy = jest.spyOn(global, 'window', 'get');
  windowSpy.mockImplementation(() => performance);
});

describe('Page load performance.', () => {
  it('should not trigger an event if the Performance API is unsupported.', () => {
    spyOn(Tracker, 'fireEvent');
    PerformanceTracker.track(PerformanceTracker.events.pageLoad);
    expect(Tracker.fireEvent).not.toHaveBeenCalled();
  });

  it('should ignore invalid events.', () => {
    spyOn(Tracker, 'fireEvent');
    PerformanceTracker.track('random event');
    expect(Tracker.fireEvent).not.toHaveBeenCalled();
  });

  it('should trigger an event if the Performance API is supported.', () => {
    spyOn(Tracker, 'fireEvent');
    delete global.performance;
    global.performance = {
      getEntriesByType: (name) => {
        if (name === 'paint') {
          return [
            {
              name: 'first-paint',
              startTime: 123,
            },
            {
              name: 'random-metric',
              startTime: 123,
            },
          ];
        }
        return [{
          domComplete: 1,
          domContentLoadedEventEnd: 2,
          loadEventStart: 3,
        }];
      },
    };
    PerformanceTracker.track(PerformanceTracker.events.pageLoad);
    expect(Tracker.fireEvent).toHaveBeenCalledWith({
      event: 'pageload_performance',
      swControlled: 'unsupported',
      firstPaint: 123,
      domComplete: 1,
      domContentLoad: 2,
      pageLoad: 3,
    });
  });

  it('should track the service worker status.', () => {
    spyOn(Tracker, 'fireEvent');
    delete global.performance;
    global.performance = {
      getEntriesByType: () => null,
    };
    global.navigator.serviceWorker = {
      controller: {},
    };
    PerformanceTracker.track(PerformanceTracker.events.pageLoad);
    expect(Tracker.fireEvent).toHaveBeenCalledWith({
      event: 'pageload_performance',
      swControlled: true,
    });
  });

  it('should track the service worker registration time', () => {
    spyOn(Tracker, 'fireEvent');
    global.navigator.connection = {
      effectiveType: '4g',
    };
    PerformanceTracker.track(PerformanceTracker.events.swPerformance, {
      action: 'install',
      time: 1500,
    });
    expect(Tracker.fireEvent).toHaveBeenCalledWith({
      event: 'service_worker_performance',
      event_action: 'install',
      registrationTime: 1500,
      networkType: '4g',
    });
  });
});
