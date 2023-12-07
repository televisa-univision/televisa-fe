/**
 * @module helpers/array/getFirstItem
 */

/**
 * Returns the first element which is present in both arrays.
 * @param {Array} firstArray First array to iterate
 * @param {Array} secondArray Second array to iterate
 * @returns {*} the first element which is present in both arrays, if any.
 */
export default function getFirstItem(firstArray, secondArray) {
  if (!Array.isArray(firstArray) || !Array.isArray(secondArray)) {
    return undefined;
  }
  return firstArray.find(
    expectedElement => secondArray.some(element => expectedElement === element)
  );
}
