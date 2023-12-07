/**
 * @module helpers/object/hasKey
 */
import isValidArray from '../common/isValidArray';

const { hasOwnProperty } = Object.prototype;

/**
 * Helper function to check if key is not null and defined
 * @param {Object} obj to te tested
 * @param {(Array|string)} key to be checked
 * @returns {boolean}
 */
export default function hasKey(obj, key) {
  let tempObj = obj;
  let path = key;
  if (typeof path === 'string') {
    path = key.split('.');
  }
  if (!isValidArray(path)) {
    return false;
  }
  return path.every((x) => {
    if (!tempObj || typeof obj !== 'object'
        || !(hasOwnProperty.call(tempObj, x) || x in tempObj)) {
      return false;
    }
    tempObj = tempObj[x];
    return true;
  });
}
