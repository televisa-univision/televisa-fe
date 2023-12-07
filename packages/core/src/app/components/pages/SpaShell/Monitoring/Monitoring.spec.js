import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import userTiming from '@univision/fe-commons/dist/utils/performance/userTiming';
import features from '@univision/fe-commons/dist/config/features';
import Monitoring from '.';

Monitoring.timing = userTiming();
Monitoring.timing.init = jest.fn();
Monitoring.timing.referenceMark = jest.fn();
Monitoring.timing.referenceMeasure = jest.fn();
Monitoring.timing.referenceTime = jest.fn(() => 100);
Monitoring.timing.getEntryByName = jest.fn(() => ({ duration: 100 }));
Monitoring.timing.findEntryByType = jest.fn(() => ({ duration: 100 }));
Monitoring.timing.isValidEntry = jest.fn();
Monitoring.timing.clearResources = jest.fn();
Monitoring.timing.finish = jest.fn();

jest.mock('@univision/fe-commons/dist/store/storeHelpers', () => ({
  getPageCategory: jest.fn(() => 'entretenimiento'),
  isVerticalHome: jest.fn(() => false),
  getContentType: jest.fn(() => 'section'),
  isSpa: jest.fn(() => true),
}));

class mockPerformanceObserver {
  static forceError = false;

  constructor(cb) {
    this.observe = () => {
      if (mockPerformanceObserver.forceError) {
        mockPerformanceObserver.forceError = false;
        throw new Error('fail');
      }
      cb();
    };

    this.disconect = () => {};
  }
}

class mockMutationObserver {
  static forceError = false;

  constructor(cb) {
    this.observe = () => {
      if (mockMutationObserver.forceError) {
        mockMutationObserver.forceError = false;
        throw new Error('fail');
      }
      cb();
    };

    this.disconect = () => {};
  }
}

describe('SPA Performance Monitoring', () => {
  beforeAll(() => {
    delete window.history;
    window.history = {
      pushState: jest.fn(),
    };
  });

  afterAll(() => {
    jest.restoreeAllMocks();
    jest.resetAllMocks();
  });

  describe('when LUX is not loaded', () => {
    beforeEach(() => {
      window.LUX = jest.fn();
    });

    it('should do nothing if `LUX.init()` is invalid', () => {
      Monitoring.init();
      expect(window.LUX.init).not.toBeDefined();
    });
    it('should do nothing if `LUX.send()` is invalid', () => {
      Monitoring.send();
      expect(window.LUX.send).not.toBeDefined();
    });
  });

  describe('when LUX is loaded', () => {
    beforeEach(() => {
      window.LUX = jest.fn();
      window.LUX.init = jest.fn();
      window.LUX.send = jest.fn();
      window.LUX.addData = jest.fn();
    });

    describe('when spa is false', () => {
      it('should do nothing if `spa` is false', () => {
        storeHelpers.isSpa = jest.fn().mockReturnValueOnce(false);
        expect(window.LUX.init).not.toHaveBeenCalled();
      });
    });

    describe('addData', () => {
      beforeAll(() => {
        jest.restoreAllMocks();
      });

      it('should add new custom data to lux', () => {
        Monitoring.addData('id', 'value');
        expect(window.LUX.addData).toHaveBeenCalledWith('measure:id:spa', 'value');
      });

      it('should not add new custom data if value is null', () => {
        Monitoring.addData('id', null);
        expect(window.LUX.addData).not.toHaveBeenCalled();
      });
    });

    describe('init', () => {
      it('should invoke `send` method', () => {
        storeHelpers.isSpa = jest.fn().mockReturnValueOnce(true);
        Monitoring.send();
        expect(window.LUX.label).toEqual('entretenimiento section SPA');
        expect(window.LUX.send).toHaveBeenCalled();
      });
      it('should invoke `LUX.init()', () => {
        Monitoring.init();
        expect(window.LUX.init).toHaveBeenCalled();
      });
    });

    describe('done', () => {
      beforeAll(() => {
        jest.restoreAllMocks();
      });

      it('should call disconnect method for observers', () => {
        Monitoring.resource = { disconnect: jest.fn() };
        Monitoring.mutation = { disconnect: jest.fn() };
        Monitoring.done();
        expect(Monitoring.resource.disconnect).toHaveBeenCalled();
        expect(Monitoring.mutation.disconnect).toHaveBeenCalled();
      });
    });

    describe('register', () => {
      beforeEach(() => {
        window.PerformanceObserver = mockPerformanceObserver;
        window.MutationObserver = mockMutationObserver;
        features.tracking.spaMonitoring = jest.fn().mockReturnValueOnce(true);
      });

      afterAll(() => {
        jest.restoreeAllMocks();
      });

      it('should not instance observers when call register with spa disabled', () => {
        Monitoring.register(false);
        expect(Monitoring.timing.referenceMeasure).not.toHaveBeenCalled();
      });

      it('should not instance observers when call register with spaMonitoring false', () => {
        features.tracking.spaMonitoring = jest.fn().mockReturnValueOnce(false);
        Monitoring.register(true);
        expect(Monitoring.timing.referenceMeasure).not.toHaveBeenCalled();
      });

      it('should add custom data on lux when has a valid route', () => {
        Monitoring.done = jest.fn();
        jest.useFakeTimers();
        Monitoring.addData = jest.fn();
        const spy = jest.spyOn(Monitoring, 'addData');
        storeHelpers.isSpa = jest.fn().mockReturnValueOnce(true);
        Monitoring.register();
        window.history.pushState(null, null, '/spa/show');
        Monitoring.records = [...Array(10).keys()]
          .map(index => ({ time: 100 * index, count: 100 * index }));
        jest.runOnlyPendingTimers();
        expect(spy).toHaveBeenCalledTimes(5);
        expect(Monitoring.done).toHaveBeenCalled();
      });

      it('should not call the clearResources method if not has a valid history state', () => {
        Monitoring.timing.clearResources = jest.fn();
        window.history.pushState();
        expect(Monitoring.timing.clearResources).not.toHaveBeenCalled();
      });

      it('should call the clearResources method', () => {
        jest.useFakeTimers();
        Monitoring.timing.getEntryByName = jest.fn(() => null);
        window.history.pushState(null, null, '/spa/famosos');
        Monitoring.records = [...Array(10).keys()]
          .map(index => ({ time: 100 * index, count: 100 }));
        jest.runOnlyPendingTimers();
        expect(Monitoring.timing.clearResources).toHaveBeenCalled();
      });
    });

    describe('send', () => {
      it('should invoke `LUX.send()`', () => {
        storeHelpers.isVerticalHome.mockReturnValueOnce(true);
        Monitoring.send();
        expect(window.LUX.send).toHaveBeenCalled();
        expect(window.LUX.label).toEqual('entretenimiento Home SPA');
      });
    });
  });
});
