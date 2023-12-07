import throttle from 'lodash.throttle';

/** Callback to manage the DOM changes */
const callback = throttle(() => {
  document.dispatchEvent(new CustomEvent('DOMChildChanges'));
}, 1000);

const defaultOptions = {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['class'],
};

/**
 * Check changes on the DOM element
 * @returns {{}}
 */
const mutation = () => {
  if (typeof window !== 'undefined' && 'MutationObserver' in window) {
    const observer = new MutationObserver(callback);
    const observedElements = [];

    return (element, options = {}) => {
      let observableElement = element;

      if (!element) {
        observableElement = document.documentElement || document.body;
      }

      if (!observedElements.includes(observableElement)) {
        observedElements.push(observableElement);
        observer.observe(observableElement, {
          ...defaultOptions,
          ...options,
        });
      }

      /** remove current observable element */
      const disconnect = () => {
        const index = observedElements.findIndex(item => item === observableElement);
        observedElements.splice(index, 1);
        observer.disconnect();
      };

      return {
        disconnect,
      };
    };
  }

  return null;
};

export default mutation();
