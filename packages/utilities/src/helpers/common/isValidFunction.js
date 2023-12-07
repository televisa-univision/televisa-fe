/**
 * @module helpers/common/isValidFunction
 */

/**
 * Checks if passed argument is a function
 * @param {*} maybeFunction could be anything, the point is to check if arg is/is not a function
 * @returns {boolean} true if argument is a function, false if not
 */
export default function isValidFunction(maybeFunction) {
  return typeof maybeFunction === 'function';
}
