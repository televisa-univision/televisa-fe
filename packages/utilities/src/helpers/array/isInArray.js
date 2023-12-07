/**
 * @module helpers/array/isInArray
 */
import isValidArray from '../common/isValidArray';

/**
 * Validate if one array exist inside the other
 * Ex: arrayIncludes([a, b, c] , [a, b]) -> true
 * @param {Array} checkArray - the array to be checked
 * @param {(number|string|boolean|Array)} item - content find inside the array
 * @returns {boolean}
 */
export default function isInArray(checkArray, item) {
  if (!isValidArray(checkArray)) {
    return false;
  }
  if (!isValidArray(item)) {
    return checkArray.includes(item);
  }
  return checkArray.every((value, i) => value === item[i]);
}
