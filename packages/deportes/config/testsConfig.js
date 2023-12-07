/* eslint-disable import/prefer-default-export */

/**
 * Any utilites that help bootstrap jest tests
 */

window.requestAnimationFrame = callback => setTimeout(callback, 0);

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};

window.scrollTo = jest.fn();

/**
 * mockEvent - methods commonly required for testing event-driven methods with jest
 * @type {Object}
 */
export const mockEvent = {
  preventDefault: jest.fn(),
  target: {},
};
