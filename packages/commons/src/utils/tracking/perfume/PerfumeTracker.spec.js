import consoleLogger from '@univision/fe-utilities/utils/consola';

import perfumeTracker, { analyticsTracker } from './perfumeTracker';
import * as loadPerfume from './perfumeLoader';
import Tracker from '../tealium/Tracker';

describe('perfumeTracker', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    delete window.PERFUME;
  });
  it('should call tracker onload event', () => {
    const loadSpy = jest.spyOn(loadPerfume, 'default');
    perfumeTracker.load();

    expect(loadSpy).toHaveBeenCalled();
  });

  it('should not call tracker onload event if window is not defined', () => {
    const loadSpy = jest.spyOn(loadPerfume, 'default');
    const { window } = global;
    delete global.window;
    perfumeTracker.load();

    expect(loadSpy).not.toHaveBeenCalled();
    global.window = window;
  });

  it('should not return perfume instance if error', () => {
    const instance = perfumeTracker.initPerfume(null, 'error');

    expect(instance).toBe(null);
  });

  it('should log warning if error happens', () => {
    const consoleSpy = jest.spyOn(consoleLogger, 'warn');
    perfumeTracker.onError('error');

    expect(consoleSpy).toHaveBeenCalled();
  });
});

describe('analyticsTracker', () => {
  it('should not fire event on analytics tracker when metric name is not in the list', () => {
    const loadSpy = jest.spyOn(Tracker, 'fireEvent');

    analyticsTracker({ metricName: 'ff', data: 0, navigatorInformation: { isLowEndExperience: true } });

    expect(loadSpy).not.toHaveBeenCalled();
  });
  it('should fire event on analytics tracker', () => {
    const loadSpy = jest.spyOn(Tracker, 'fireEvent');

    analyticsTracker({ metricName: 'navigationTiming', data: {}, navigatorInformation: {} });

    expect(loadSpy).toHaveBeenCalledWith({
      event: 'web-vitals',
      event_category: 'Web Vitals',
      event_action: 'TTFB',
      event_value: 0,
      event_label: 'highEndExperience',
      non_interaction: true,
    });
  });

  it('should fire event on analytics tracker for lowEnd experience', () => {
    const loadSpy = jest.spyOn(Tracker, 'fireEvent');

    analyticsTracker({ metricName: 'cls', data: 0, navigatorInformation: { isLowEndExperience: true } });

    expect(loadSpy).toHaveBeenCalledWith({
      event: 'web-vitals',
      event_category: 'Web Vitals',
      event_action: 'cls',
      event_value: 0,
      event_label: 'lowEndExperience',
      non_interaction: true,
    });
  });
});
