/* eslint-disable class-methods-use-this */
/* eslint-disable require-jsdoc */
/* eslint-disable import/prefer-default-export */

/**
 * Any utilites that help bootstrap jest tests
 */

window.requestAnimationFrame = callback => setTimeout(callback, 0);

window.IntersectionObserver = class IntersectionObserver {
  observe() {
    return null;
  }

  unobserve() {
    return null;
  }
};

window.MutationObserver = class MutationObserver {
  observe() {
    return null;
  }

  unobserve() {
    return null;
  }
};

window.matchMedia = window.matchMedia || function matchMedia() {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  };
};

window.open = jest.fn();
window.scrollTo = jest.fn();

// To avoid errors like Error: Not implemented: HTMLMediaElement.prototype.load
// jsdom doesn't support any loading or playback media operations.
window.HTMLMediaElement.prototype.load = jest.fn();

/**
 * mockEvent - methods commonly required for testing event-driven methods with jest
 * @type {Object}
 */
export const mockEvent = {
  preventDefault: jest.fn(),
  target: {
    getAttribute: jest.fn(),
  },
};
