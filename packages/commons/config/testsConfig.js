/* eslint-disable import/prefer-default-export */
import { format } from "util";

/**
 * Any utilites that help bootstrap jest tests
 */

window.requestAnimationFrame = callback => setTimeout(callback, 0);

if (typeof window !== 'undefined') {
  window.matchMedia = window.matchMedia || function matchMedia() {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  };
}

/**
 * mockEvent - methods commonly required for testing event-driven methods with jest
 * @type {Object}
 */
export const mockEvent = {
  preventDefault: jest.fn(),
  target: {},
};
