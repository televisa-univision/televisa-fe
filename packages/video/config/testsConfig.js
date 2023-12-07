/* eslint-disable import/prefer-default-export */

window.requestAnimationFrame = callback => setTimeout(callback, 0);

window.matchMedia = window.matchMedia || function matchMedia() {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  };
};


/**
 * Any utilites that help bootstrap jest tests
 */
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

/**
 * mockEvent - methods commonly required for testing event-driven methods with jest
 * @type {Object}
 */
export const mockEvent = {
  preventDefault: jest.fn(),
  target: {},
};
