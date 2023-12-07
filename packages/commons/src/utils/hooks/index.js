import {
  useEffect,
  useReducer,
  useRef,
  useState,
  useCallback,
} from 'react';
import debounce from 'lodash.debounce';

import Store from '../../store/store';
import { getDevice } from '../../store/storeHelpers';
import { APP_BREAKPOINTS } from '../styled/constants';

/**
 * getBreakpoint
 * @param {number} width - screen width
 * @returns {string}
 */
function getBreakpoint(width) {
  let breakpoint;

  // We're using if instead of switch based on browsers performance tests
  // http://jsfiddle.net/some/HKdug/
  if (width >= APP_BREAKPOINTS.xs && width < APP_BREAKPOINTS.sm) {
    breakpoint = 'xs';
  } else if (width >= APP_BREAKPOINTS.sm && width < APP_BREAKPOINTS.md) {
    breakpoint = 'sm';
  } else if ((width >= APP_BREAKPOINTS.md && width < APP_BREAKPOINTS.lg)) {
    breakpoint = 'md';
  } else if (width >= APP_BREAKPOINTS.lg && width < APP_BREAKPOINTS.xl) {
    breakpoint = 'lg';
  } else if (width >= APP_BREAKPOINTS.xl) {
    breakpoint = 'xl';
  } else {
    breakpoint = 'xxs';
  }

  return breakpoint;
}

/**
 * getDefaultWidth
 * @returns {number}
 */
function getDefaultBreakPoint() {
  return getDevice(Store) === 'mobile' ? 'xxs' : 'sm';
}

/**
 * usePrevious Hook
 * @param {any} value - value to save
 * @returns {any}
 */
export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * useWidth custom hook
 * @example
 * const width = useWidth()
 * @returns {number}
 */
export function useWidth() {
  const [width, setWidth] = useState(global.window
    ? window.innerWidth : 0);

  useEffect(() => {
    /**
     * didCancel note
     * https://github.com/facebook/react/issues/14369#issuecomment-468267798
     */
    let didCancel = false;
    const handleResize = debounce(() => {
      if (!didCancel) setWidth(window.innerWidth);
    }, 100);
    window.addEventListener('resize', handleResize);

    return () => {
      didCancel = true;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}

/**
 * useBreakPoint custom hook
 * @example
 * const breakpoint = useBreakPoint();
 * @returns {string}
 */
export function useBreakPoint() {
  /**
   * we can't use useState for the breakPoint as
   * react will trigger two updates for the same value
   * triggering two render each time the break point changes
   * https://github.com/facebook/react/issues/14259
   */
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const breakPoint = useRef(global.window
    ? getBreakpoint(window.innerWidth) : getDefaultBreakPoint());

  useEffect(() => {
    /**
     * didCancel note
     * https://github.com/facebook/react/issues/14369#issuecomment-468267798
     */
    let didCancel = false;
    const handleResize = debounce(() => {
      const currentBreakPoint = getBreakpoint(window.innerWidth);

      if (currentBreakPoint !== breakPoint.current && !didCancel) {
        breakPoint.current = currentBreakPoint;
        forceUpdate();
      }
    }, 100);
    window.addEventListener('resize', handleResize);

    return () => {
      didCancel = true;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakPoint.current;
}

/**
 * Re-usable and declarative setInterval hook. Created by Dan Abramov.
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @param {Function} callback the function to execute on every interval.
 * @param {number | null} interval the duration of the interval in milliseconds
 * or null to cancel the interval.
 * @returns {Object}
 */
export function useInterval(callback, interval) {
  const savedCallback = useRef();
  const timeout = useRef();

  // the clear method
  const clear = useCallback(() => {
    clearInterval(timeout.current);
  }, []);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    /**
     * Handler that gets executed on every interval
     */
    function tick() {
      savedCallback.current();
    }

    if (interval !== null) {
      timeout.current = setInterval(tick, interval);
      return clear;
    }
  }, [interval, clear]);

  return {
    clear,
  };
}
