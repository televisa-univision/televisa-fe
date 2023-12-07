import { useEffect } from 'react';
import { isValidFunction } from '../helpers';

/**
 * Hook to defer the execution of a function using setTimeout,0.
 * The timeout will be cleared when the component is unmounted.
 * @param {function} fn Function to defer.
 */
export const useDefer = (fn) => {
  useEffect(() => {
    const timer = setTimeout(fn);
    return () => clearTimeout(timer);
  }, [fn]);
};

/**
 * Decorator to allow a class component to defer the execution of functions using setTimeout,0.
 * It will add a "defer" method to the class and
 * will clear the timeouts when the component is unmounted.
 * @param {*} ClassComponent React class component
 * @returns {*} Decorated class component
 */
export const asDeferrer = (ClassComponent) => {
  return class extends ClassComponent {
    /**
     * Constructor.
     * @constructor
     * @param {*} args Arguments
     */
    constructor(...args) {
      super(...args);
      this.displayName = ClassComponent.displayName;
      this.deferredFunctions = [];
    }

    /**
     * Defers the execution of the function using setTimeout,0.
     * @param {function} fn Function to defer.
     * @returns {number} Timeout ID.
     */
    defer(fn) {
      const timeout = setTimeout(fn.bind(this));
      this.deferredFunctions.push(timeout);
      return timeout;
    }

    /**
     * Clear the timeouts. Also call the componentWillUnmount of the decorated class, if any.
     */
    componentWillUnmount() {
      this.displayName = null;

      if (isValidFunction(ClassComponent.prototype.componentWillUnmount)) {
        super.componentWillUnmount.call(this);
      }
      while (this.deferredFunctions.length) {
        clearTimeout(this.deferredFunctions.shift());
      }
    }
  };
};
