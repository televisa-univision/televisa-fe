import { getKey } from '../../helpers';
import * as storeHelpers from '../../../store/storeHelpers';

describe('User Timing supported', () => {
  const mockMetric = 'test_metric';
  let userTiming;

  beforeAll(async () => {
    delete window.performance;
    window.performance = {
      clearMarks: jest.fn(),
      clearMeasures: jest.fn(),
      getEntriesByName: jest.fn(),
      getEntriesByType: jest.fn(),
      mark: jest.fn(),
      measure: jest.fn(),
      now: jest.fn(),
      clearResourceTimings: jest.fn(),
    };
    const userTiimingModule = await import('.');
    userTiming = getKey(userTiimingModule, 'default', userTiimingModule);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('init', () => {
    it('should `mark` when spa is false (mpa)', () => {
      storeHelpers.isSpa = jest.fn().mockReturnValueOnce(false);
      userTiming(mockMetric).init();
      expect(window.performance.clearMarks).not.toHaveBeenCalled();
      expect(window.performance.mark).not.toHaveBeenCalledWith('mark:test_metric');
    });

    it('should `mark` when spa is true', () => {
      storeHelpers.isSpa = jest.fn().mockReturnValueOnce(true);
      userTiming(mockMetric).init();
      expect(window.performance.clearMarks).toHaveBeenCalled();
      expect(window.performance.mark).toHaveBeenCalledWith('mark:test_metric:spa');
    });
  });

  describe('referenceMark', () => {
    it('should get the reference mark', () => {
      storeHelpers.isSpa = jest.fn().mockReturnValueOnce(true);
      const spy = jest.spyOn(window.performance, 'getEntriesByName')
        .mockReturnValue([{ name: 'mark:test_metric:spa' }]);
      const timing = userTiming(mockMetric);
      timing.referenceMark();
      expect(spy).toHaveBeenCalled();
      expect(timing.startMark).toHaveProperty('name', 'mark:test_metric:spa');
    });
  });

  describe('referenceMeasure', () => {
    it('should call measure method with two params', () => {
      storeHelpers.isSpa = jest.fn().mockReturnValueOnce(true);
      const timing = userTiming(mockMetric);
      timing.isValidEntry = jest.fn(() => true);
      timing.startMark = { name: 'mark:test_metric:spa' };
      timing.referenceMeasure('test_metric');
      expect(window.performance.clearMeasures).toHaveBeenCalled();
      expect(window.performance.measure)
        .toHaveBeenCalledWith('measure:test_metric:spa', 'mark:test_metric:spa');
    });

    it('should not call measure method', () => {
      storeHelpers.isSpa = jest.fn().mockReturnValueOnce(true);
      const timing = userTiming(mockMetric);
      timing.isValidEntry = jest.fn(() => false);
      timing.referenceMeasure('test_metric');
      expect(window.performance.clearMeasures).not.toHaveBeenCalled();
      expect(window.performance.measure).not.toHaveBeenCalled();
    });
  });

  describe('referenceTime', () => {
    it('should get the reference time', () => {
      storeHelpers.isSpa = jest.fn().mockReturnValueOnce(true);
      const spy = jest.spyOn(window.performance, 'now')
        .mockReturnValue(100);
      const timing = userTiming(mockMetric);
      timing.startMark = { name: 'mark:test_metric:spa', startTime: 0 };
      const result = timing.referenceTime();
      expect(spy).toHaveBeenCalled();
      expect(result).toBe(100);
    });
  });

  describe('getEntryByName', () => {
    it('should get an existing entry', () => {
      storeHelpers.isSpa = jest.fn().mockReturnValueOnce(true);
      const spy = jest.spyOn(window.performance, 'getEntriesByName')
        .mockReturnValue([{ name: 'mark:test_metric:spa' }]);
      const timing = userTiming(mockMetric);
      const entry = timing.getEntryByName();
      expect(spy).toHaveBeenCalled();
      expect(entry).toHaveProperty('name', 'mark:test_metric:spa');
    });
  });

  describe('findEntryByType', () => {
    it('should get an existing entry by type and match value', () => {
      storeHelpers.isSpa = jest.fn().mockReturnValueOnce(true);
      const spy = jest.spyOn(window.performance, 'getEntriesByType')
        .mockReturnValue([{ name: 'mark:test_metric:spa' }]);
      const timing = userTiming(mockMetric);
      const entry = timing.findEntryByType('type', /mark/);
      expect(spy).toHaveBeenCalled();
      expect(entry).toHaveProperty('name', 'mark:test_metric:spa');
    });
  });

  describe('isValidEntry', () => {
    it('should validate if exist a valid entry', () => {
      storeHelpers.isSpa = jest.fn().mockReturnValueOnce(true);
      const spy = jest.spyOn(window.performance, 'getEntriesByName')
        .mockReturnValue([{ name: 'mark:test_metric:spa' }]);
      const timing = userTiming(mockMetric);
      const entry = timing.isValidEntry();
      expect(spy).toHaveBeenCalled();
      expect(entry).toBeTruthy();
    });
  });

  describe('clearResources', () => {
    it('should call the clearResourceTimings method', () => {
      storeHelpers.isSpa = jest.fn().mockReturnValueOnce(true);
      const spy = jest.spyOn(window.performance, 'clearResourceTimings');
      const timing = userTiming(mockMetric);
      timing.clearResources();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('finish', () => {
    it('should `mark` when spa is false (mpa)', () => {
      userTiming(mockMetric).finish();
      expect(window.performance.clearMarks).not.toHaveBeenCalled();
      expect(window.performance.mark).not.toHaveBeenCalled();
    });

    it('should `mark` and not `measure` if not has the default init mark', () => {
      storeHelpers.isSpa = jest.fn().mockReturnValueOnce(true);
      window.performance.getEntriesByName = () => [];
      userTiming(mockMetric).finish();
      expect(window.performance.clearMeasures).not.toHaveBeenCalled();
      expect(window.performance.measure).not.toHaveBeenCalled();
    });

    it('should `mark` and `measure` if has the default init mark', () => {
      storeHelpers.isSpa = jest.fn().mockReturnValueOnce(true);
      window.performance.getEntriesByName = () => [true];
      userTiming(mockMetric).finish();
      expect(window.performance.clearMeasures).toHaveBeenCalled();
      expect(window.performance.measure).toHaveBeenCalled();
    });
  });
});
