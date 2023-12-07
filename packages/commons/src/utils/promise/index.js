/**
 * Adds a timeout to a promise
 * Promise will reject after milliseconds if it has not yet resolved
 *
 * @param {Promise} promise The promise
 * @param {number} milliseconds Timeout in milliseonds
 * @returns {Promise} The timing out promise
 */
export const timeoutPromise = (promise, milliseconds) => {
  // Create a promise that rejects in <ms> milliseconds
  const timeout = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject(new Error(`Timed out in ${milliseconds}ms.`));
    }, milliseconds);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([
    promise,
    timeout,
  ]);
};

/**
 * Returns a single Promise which resolves when all the given promises
 * have either resolved or rejected.
 * Whereas Promise.all will reject on the first promise to reject,
 * allResolveAndReject will always resolve
 * The returned promise will resolve to an array of the results from
 * each given promise or undefined if the given promise rejected
 * The result array will have a property 'errors' which is an array
 * containing all rejections
 *
 * @param {[Promise]} promises Promises to wait for
 * @returns {Promise} Promise A promise off all promises
 */
export const resolveOrRejectAll = (promises) => {
  return Promise.all(promises.map((p) => {
    return p
      .then(success => ({ success }))
      .catch(error => ({ error }));
  })).then((results) => {
    const result = results.map(r => r.success);
    result.errors = results.map(r => r.error);
    return result;
  });
};

/**
 * Makes a Promise cancelable by wrapping the promise into another promise
 * and returning an object with the cancel method
 * @example
 * const myPromise = makeCancelablePromise(promise);
 * myPromise.cancel(); // to cancel the promise
 * await myPromise; // to load your promise
 * @param {Promise} promise - promise to wrap
 * @returns {Object}
 */
export const makeCancelablePromise = (promise) => {
  let resolvePromise;
  let rejectPromise;
  let cancel;

  const wrappedPromise = new Promise((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;

    cancel = () => {
      resolvePromise = null;
      rejectPromise = null;
    };

    promise.then(
      val => resolvePromise && resolvePromise(val),
      error => rejectPromise && rejectPromise(error)
    );
  });

  wrappedPromise.cancel = cancel;

  return wrappedPromise;
};
