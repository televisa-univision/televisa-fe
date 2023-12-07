import fieldsByPageType from './fieldsByPageType.json';
/**
 * Returns subset of state's data to be logged
 * @param {Object} pageData page node from Store.getState().
 * @returns {Object} subset of data we'll send to the logs
 */
export default function filterForLogs(pageData) {
  const replacerArray = [
    ...fieldsByPageType.common,
    ...(fieldsByPageType[pageData.data.type] || []),
  ];

  /**
   * Custom replacer function to use with JSON.stringify to tell it
   * what fields we are interested in getting serialized
   * @param {string} key Key in current iteration
   * @param {Object} value value for key
   * @returns {Object}
   */
  function replacer(key, value) {
    // Removes null values from the stringified json
    if (value === null) {
      return undefined;
    }
    // Filters using the replacer array defined above
    if (key === '' || replacerArray.includes(key)) {
      return value;
    }
    // Allows for array items to be included as their keys are 0, 1, 2, etc
    /* eslint-disable no-restricted-globals */
    if (!isNaN(key)) {
      return value;
    }
    // Return undefined for everything else. That'll exclude those fields from the json string
    return undefined;
  }

  return JSON.parse(JSON.stringify(pageData, replacer));
}
