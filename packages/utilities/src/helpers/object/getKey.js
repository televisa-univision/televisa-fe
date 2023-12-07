/**
 * @module helpers/object/getKey
 */
import get from 'lodash.get';

import isValidObject from '../common/isValidObject';

/**
 * Helper function to get key if exist otherwise returns undefined
 * @param {Object} obj - The object to query
 * @param {(Array|string)} path - The path of the property to get
 * @param {*} [fallback = undefined] - fallback value
 * @param {bool} [strict = false] - if is set to true, it will accept null as valid
 * @returns {*}
 */
export default function getKey(obj, path, fallback, strict = false) {
  if (!isValidObject(obj) || !path) return fallback;

  const result = obj[path] || get(obj, path, fallback);

  return strict || (!strict && result !== null) ? result : fallback;
}
