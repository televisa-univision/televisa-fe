import {
  SEARCH_FETCH_RESULTS,
  SEARCH_SET_DATA,
  SEARCH_SET_DATE_FILTER,
  SEARCH_SET_FILTER_TYPE,
  SEARCH_SET_QUERY,
  SEARCH_SET_PAGE_NUMBER,
  SET_SEARCH_RESULTS,
} from './action-search-types';
import { isValidFunction } from '../../../utils/helpers';
import { fetchSearchApi } from '../../../utils/api/fetchApi';
import { cleanSearchQuery } from '../../../utils/text';

/**
 * Set search data to the state
 * @param {Object} data - search data to set on the state
 * @returns {Object}
 */
const setSearchData = data => ({
  type: SEARCH_SET_DATA,
  data,
});

/**
 * Get all events action
 * @param {Function} getPayload - get action payload and meta
 * @returns {Object}
 */
const getSearchResults = (getPayload) => {
  if (!isValidFunction(getPayload)) {
    return null;
  }
  return {
    type: SEARCH_FETCH_RESULTS,
    ...getPayload(),
  };
};

/**
 * Action to fetch search results
 * @param {number} pageSize limit for the search result
 * @returns {func}
 */
export function fetchSearchResults(pageSize) {
  return (dispatch, getState) => {
    const state = getState();
    const {
      search: {
        query,
        filter,
        dateFilter,
        page,
        sort,
      },
      page: { requestParams },
    } = state;
    const queryText = query || requestParams?.q;
    return dispatch({
      type: SET_SEARCH_RESULTS,
      payload: fetchSearchApi({
        q: cleanSearchQuery(queryText),
        t: filter,
        d: dateFilter || 'month',
        p: page,
        s: pageSize,
        o: sort,
      })
        .then((response) => {
          const payload = {
            results: response?.data?.results || [],
            totalPages: response?.data?.totalPages || 0,
            totalResults: response?.data?.totalResults || 0,
          };

          return payload;
        }),
    });
  };
}

/**
 * Set date
 * @param {string} filter - filter type to be set
 * @returns {Object}
 */
const setFilterType = filter => ({
  type: SEARCH_SET_FILTER_TYPE,
  filter,
});

/**
 * Set date
 * @param {string} dateFilter - Date filter to be set
 * @returns {Object}
 */
const setDateFilter = dateFilter => ({
  type: SEARCH_SET_DATE_FILTER,
  dateFilter,
});

/**
 * Set query
 * @param {string} query - Date filter to be set
 * @returns {Object}
 */
const setSearchQuery = query => ({
  type: SEARCH_SET_QUERY,
  query,
});

/**
 * Set page number
 * @param {string} page - page number to be set
 * @returns {Object}
 */
const setPageNumber = page => ({
  type: SEARCH_SET_PAGE_NUMBER,
  page,
});

export {
  getSearchResults,
  setSearchData,
  setDateFilter,
  setFilterType,
  setSearchQuery,
  setPageNumber,
};
