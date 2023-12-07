import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import Store from '../../store/store';
import setPageData from '../../store/actions/page-actions';

import {
  useBreakPoint,
  usePrevious,
  useWidth,
  useInterval,
} from '.';

jest.useFakeTimers();
jest.mock('lodash.debounce', () => jest.fn(fn => fn));

/**
 * TestHook component
 * @param {func} callback - test callback
 * @returns {JSX}
 */
const TestHook = ({ callback }) => {
  callback();
  return null;
};

/**
 * testHook
 * @param {func} callback - test callback
 */
const testHook = (callback) => {
  mount(<TestHook callback={callback} />);
};

let width = 0;
let breakPoint;
let prevValue;

/** @test {custom hooks} */
describe('custom hooks', () => {
  const windowMemo = global.window;
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });

  describe('useBreakPoint', () => {
    it('should get the default break point in SSR in desktop', () => {
      // mock the global window object
      const windowSpy = jest.spyOn(global, 'window', 'get');
      windowSpy.mockImplementation(() => null);
      Store.dispatch(setPageData({
        device: 'desktop',
      }));
      shallow(
        <TestHook
          callback={() => {
            breakPoint = useBreakPoint();
          }}
        />
      );

      expect(breakPoint).toEqual('sm');
      windowSpy.mockRestore();
    });

    it('should get the default break point in SSR in mobile', () => {
      delete global.window;
      Store.dispatch(setPageData({
        device: 'mobile',
      }));
      shallow(
        <TestHook
          callback={() => {
            breakPoint = useBreakPoint();
          }}
        />
      );

      expect(breakPoint).toEqual('xxs');
    });

    it('should get the right break point for xxs', () => {
      global.window = windowMemo;
      global.innerWidth = 100;
      testHook(() => {
        breakPoint = useBreakPoint();
      });

      expect(breakPoint).toEqual('xxs');
    });

    it('should get the right break point for xs', () => {
      global.innerWidth = 480;
      testHook(() => {
        breakPoint = useBreakPoint();
      });

      expect(breakPoint).toEqual('xs');
    });

    it('should get the right break point for sm', () => {
      global.innerWidth = 768;
      testHook(() => {
        breakPoint = useBreakPoint();
      });

      expect(breakPoint).toEqual('sm');
    });

    it('should get the right break point for md', () => {
      global.innerWidth = 1024;
      testHook(() => {
        breakPoint = useBreakPoint();
      });

      expect(breakPoint).toEqual('md');
    });

    it('should get the right break point for lg', () => {
      global.innerWidth = 1280;
      testHook(() => {
        breakPoint = useBreakPoint();
      });

      expect(breakPoint).toEqual('lg');
    });

    it('should get the right break point for xl', () => {
      global.innerWidth = 1440;
      testHook(() => {
        breakPoint = useBreakPoint();
      });

      expect(breakPoint).toEqual('xl');
    });

    it('should remove the listener when the component unmounts', () => {
      global.removeEventListener = jest.fn();
      const wrapper = mount(
        <TestHook
          callback={() => {
            breakPoint = useBreakPoint();
          }}
        />
      );

      wrapper.unmount();
      expect(global.removeEventListener).toHaveBeenCalled();
    });
  });

  describe('usePrevious', () => {
    beforeEach(() => {
      prevValue = () => renderHook(({ state }) => usePrevious(state), {
        initialProps: { state: 0 },
      });
    });

    it('should return undefined on initial render', () => {
      const { result } = prevValue();

      expect(result.current).toBeUndefined();
    });

    it('should always return previous state after each update', () => {
      const { result, rerender } = prevValue();

      rerender({ state: 2 });
      expect(result.current).toBe(0);

      rerender({ state: 4 });
      expect(result.current).toBe(2);

      rerender({ state: 6 });
      expect(result.current).toBe(4);
    });
  });

  describe('useWidth', () => {
    it('should get the default width in SSR in desktop', () => {
      delete global.window;
      Store.dispatch(setPageData({
        device: 'desktop',
      }));
      shallow(
        <TestHook
          callback={() => {
            width = useWidth();
          }}
        />
      );

      expect(width).toEqual(0);
    });

    it('should remove the listener when the component unmounts', () => {
      global.window = windowMemo;
      global.removeEventListener = jest.fn();
      const wrapper = mount(
        <TestHook
          callback={() => {
            width = useWidth();
          }}
        />
      );

      wrapper.unmount();
      expect(global.removeEventListener).toHaveBeenCalled();
    });

    it('should update the values when the screen resizes', () => {
      global.innerWidth = 1440;
      const resizeEvent = new Event('resize');
      testHook(() => {
        width = useWidth();
      });

      expect(width).toEqual(1440);

      act(() => {
        global.innerWidth = 1000;
        window.dispatchEvent(resizeEvent);
        testHook(() => {
          width = useWidth();
        });
      });

      expect(width).toEqual(1000);
    });
  });

  describe('useInterval', () => {
    afterEach(() => {
      jest.clearAllTimers();
    });

    it('should take a `handler` and an `interval`', () => {
      const handler = jest.fn();

      testHook(() => {
        useInterval(handler, 1000);
      });

      expect(handler).toHaveBeenCalledTimes(0);
      jest.advanceTimersByTime(5000);
      expect(handler).toHaveBeenCalledTimes(5);
    });

    it('should "pause" the interval if you pass an `interval` of `null`', () => {
      const handler = jest.fn();

      testHook(() => {
        useInterval(handler, null);
      });

      jest.advanceTimersByTime(5000);
      expect(handler).toHaveBeenCalledTimes(0);
    });

    it('should not restart the interval if you pass a new `handler`', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      let handler = handler1;

      const { rerender } = renderHook(() => {
        useInterval(handler, 1000);
      });

      jest.advanceTimersByTime(500);

      handler = handler2;
      rerender();

      jest.advanceTimersByTime(500);
      expect(handler1).toHaveBeenCalledTimes(0);
      expect(handler2).toHaveBeenCalledTimes(1);
    });

    it('should cancel the current interval and start a new one if you pass a new `interval`', () => {
      const handler = jest.fn();
      let interval = 500;

      const { rerender } = renderHook(() => {
        useInterval(handler, interval);
      });

      jest.advanceTimersByTime(1000);
      expect(handler).toHaveBeenCalledTimes(2);

      interval = 1000;
      rerender();
      jest.advanceTimersByTime(5000);
      expect(handler).toHaveBeenCalledTimes(7);
    });

    it('should cause no change in the interval when passing the same parameters', () => {
      const handler = jest.fn();

      const { rerender } = renderHook(() => {
        useInterval(handler, 1000);
      });

      jest.advanceTimersByTime(500);

      rerender();

      jest.advanceTimersByTime(500);
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
