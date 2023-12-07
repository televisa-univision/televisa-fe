import { act } from 'react-dom/test-utils';

const observerMap = new Map();
const instanceMap = new Map();

beforeAll(() => {
  global.IntersectionObserver = jest.fn((cb, options) => {
    const instance = {
      thresholds: Array.isArray(options.threshold)
        ? options.threshold
        : [options.threshold],
      root: options.root,
      rootMargin: options.rootMargin,
      time: Date.now(),
      observe: jest.fn((element) => {
        instanceMap.set(element, instance);
        observerMap.set(element, cb);
      }),
      unobserve: jest.fn((element) => {
        instanceMap.delete(element);
        observerMap.delete(element);
      }),
      disconnect: jest.fn(),
    };

    return instance;
  });
});

afterEach(() => {
  global.IntersectionObserver.mockClear();
  instanceMap.clear();
  observerMap.clear();
});

/**
 * Set the `isIntersecting` for the IntersectionObserver of a specific element.
 * @param {Node} element - element to test
 * @param {boolean} isIntersecting - true if it's intersecting
 */
export function mockIsIntersecting(element, isIntersecting) {
  const cb = observerMap.get(element);
  const instance = instanceMap.get(element);
  if (cb && instance) {
    const entry = [
      {
        boundingClientRect: element.getBoundingClientRect(),
        intersectionRatio: isIntersecting ? 1 : 0,
        intersectionRect: isIntersecting ? element.getBoundingClientRect() : {},
        isIntersecting,
        rootBounds: instance.root ? instance.root.getBoundingClientRect() : {},
        target: element,
        time: Date.now() - instance.time,
      },
    ];
    if (act) act(() => cb(entry, instance));
    else cb(entry, instance);
  } else {
    throw new Error(
      'No IntersectionObserver instance found for element. Is it still mounted in the DOM?',
    );
  }
}

/**
 * Set the `isIntersecting` on all current IntersectionObserver instances
 * @param {boolean} isIntersecting - true if its intersecting
 */
export function mockAllIsIntersecting(isIntersecting) {
  observerMap.forEach((onChange, element) => {
    mockIsIntersecting(element, isIntersecting);
  });
}

/**
 * Call the `intersectionMockInstance` method with an element, to get the (mocked)
 * `IntersectionObserver` instance. You can use this to spy on the `observe` and
 * `unobserve` methods.
 * @param {Element} element - node element
 * @returns {function}
 */
export function intersectionMockInstance(element) {
  return instanceMap.get(element);
}
