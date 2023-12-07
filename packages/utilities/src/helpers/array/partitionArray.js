/**
 * @module helpers/array/partitionArray
 */

/**
 * Convert a long array into an array of arrays
 * @param {Array} inputList - the starting array
 * @param {Object} options - custom partition options
 * @param {number} [options.count=2] how many columns are desired
 * @param {number} [options.threshold=5] the minimum number of links before splitting occurs
 * @returns {Array} an array of arrays(columns)
 */
export default function partitionArray(inputList, { count = 2, threshold = 5 } = {}) {
  if (inputList.length <= threshold) return [{ key: 0, contents: inputList }];
  const columns = [];
  const list = [...inputList];
  const itemsPerColumn = Math.ceil(list.length / count);
  let i = 0;
  while (i < count) {
    columns.push({ key: i, contents: list.splice(0, itemsPerColumn) });
    i += 1;
  }
  return columns;
}
