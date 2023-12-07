/**
 * @module helpers/array/sortArrayByObjectKey
 */
import isValidArray from '../common/isValidArray';
import isValidString from '../common/isValidString';

/**
* Sort an array by object key
* @example: arrayIncludes([a, b, c] , [a, b]) -> true
* @param {Array} array - the array to be sorted
* @param {string} key - sorting key
* @returns {Array}
*/
export default function sortArrayByObjectKey(array, key) {
  if (!isValidArray(array) || !isValidString(key)) {
    return array ?? [];
  }

  return array.sort((a, b) => a?.[key]?.localeCompare(b?.[key]));
}
