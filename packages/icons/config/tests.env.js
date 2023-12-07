import { format } from "util";

/**
 * Any utilites that help bootstrap jest tests
 */

window.requestAnimationFrame = callback => setTimeout(callback, 0);

window.matchMedia = window.matchMedia || function matchMedia() {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  };
};

/**
 * mockEvent - methods commonly required for testing event-driven methods with jest
 * @type {Object}
 */
export const mockEvent = {
  preventDefault: jest.fn(),
  target: {},
};

// To prevent unhandled unit test fails and props warnings
const error = global.console.error;
global.console.error = function(...args) {
  error(...args);
  throw(format(...args));
};
