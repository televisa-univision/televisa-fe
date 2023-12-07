import { isValidFunction } from '../helpers';

/**
 * Helper to mock promises
 * @param {Object} props - method options
 * @param {any} [props.resolve = null] - resolve method
 * @param {any} [props.reject = null] - rejection method
 * @param {number} [props.delay = 0] - time out delay
 * @returns {Promise}
 */
export default function promiseMock(props) {
  const { resolve = null, reject = null, delay = 0 } = props;

  return new Promise((resolvePromise, rejectPromise) => {
    if (resolve) {
      setTimeout(() => {
        if (isValidFunction(resolve)) {
          resolve();
          resolvePromise();
        } else {
          resolvePromise(resolve);
        }
      }, delay);
    }
    if (reject) {
      setTimeout(() => {
        if (isValidFunction(reject)) {
          reject();
          rejectPromise(new Error('error'));
        } else {
          rejectPromise(reject);
        }
      }, delay);
    }
  });
}

/**
 * Helper to wait for specific amount of time in tests.
 * @param {number} period the amount of time to sleep for.
 * @returns {Promise}
 */
export const sleep = period => new Promise(
  resolve => setTimeout(resolve, period)
);
