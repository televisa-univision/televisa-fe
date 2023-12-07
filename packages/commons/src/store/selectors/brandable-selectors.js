/**
 * Gets the page tvStation data
 * @param {Object} state - redux state
 * @returns {Object}
 */
export const tvStationSelector = state => state?.page?.data?.tvStation;

/**
 * Gets the page radioStation data
 * @param {Object} state - redux state
 * @returns {Object}
 */
export const radioStationSelector = state => state?.page?.data?.radioStation;
