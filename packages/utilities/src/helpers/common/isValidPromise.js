/**
 * @module helpers/common/isValidPromise
 */

/**
 * Checks if passed argument is a Promise
 * @param {*} maybePromise object to be checked
 * @returns {boolean} true if argument is an instance of a Promise
 */
export default function isValidPromise(maybePromise) {
  return maybePromise instanceof Promise;
}
