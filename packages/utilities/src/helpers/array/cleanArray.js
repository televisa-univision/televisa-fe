/**
 * @module helpers/array/cleanArray
 */
import isValidArray from '../common/isValidArray';
import isValidString from '../common/isValidString';
import isValidFunction from '../common/isValidFunction';

/**
 * Method to remove all falsy values: undefined, null, 0, false, NaN and "" from array
 * @public
 * @param {Array} checkArray - array to perform the clean
 * @param {(number|string|boolean|Function)} filter - custom additional item to remove from array
 * of function to perform a custom filter, the function should return true to keep the item
 * @returns {Array}
 */
export default function cleanArray(checkArray, filter) {
  const newArray = [];
  if (!isValidArray(checkArray)) {
    return newArray;
  }
  for (let i = 0; i < checkArray.length; i += 1) {
    const item = checkArray[i];
    let shouldKeep = !!item;
    if (isValidFunction(filter)) {
      shouldKeep = filter(item);
    } else if (item && (isValidArray(item) || isValidString(item))) {
      shouldKeep = !item.includes(filter);
    }
    if (shouldKeep) {
      newArray.push(item);
    }
  }
  return newArray;
}
