import {
  SEARCH_SET_DATA,
  SEARCH_SET_DATE_FILTER,
  SEARCH_SET_FILTER_TYPE,
  SEARCH_SET_PAGE_NUMBER,
  SEARCH_SET_QUERY,
  SEARCH_FETCH_RESULTS,
  SET_SEARCH_RESULTS,
} from '../../actions/search/action-search-types';
import { SYNC_STORE } from '../../actions/action-types';
// eslint-disable-next-line import/no-cycle
import { getKey, isValidFunction } from '../../../utils/helpers';

const initialState = {
  dateFilter: null,
  filter: null,
  page: 1,
  query: '',
  ready: false,
  results: [], // data from fetch search API
  totalPages: 1,
  totalResults: 1,
};

/**
 * Helper to reuse after fullfill
 * @private
 * @param {Object} action - Action completed
 * @param {Object} state - Current state
 * @returns {Object}
 */
function fullfilledSetter(action, state) {
  const extractor = getKey(action, 'meta.extractor');
  if (action && action.payload && isValidFunction(extractor)) {
    const { results, totalPages, totalResults } = action.meta.extractor(action.payload);
    return {
      ...state,
      results,
      totalPages,
      totalResults,
      ready: true,
    };
  }
  return state;
}

/**
 * Reducers related to search
 * @param {Object} state of the application
 * @param {Object} action to be trigger
 * @returns {Object}
 */
export default function searchReducer(state = { ...initialState }, action) {
  if (action) {
    switch (action.type) {
      case SEARCH_SET_DATA:
        return { ...state, ...action.data };

      case `${SEARCH_FETCH_RESULTS}_PENDING`:
        // Reseting
        return { ...state, ready: false };

      case `${SEARCH_FETCH_RESULTS}_REJECTED`:
        return { ...state, ready: true, results: [] };

      case `${SEARCH_FETCH_RESULTS}_FULFILLED`:
        return fullfilledSetter(action, state);

      case `${SET_SEARCH_RESULTS}_PENDING`:
        // Reseting
        return { ...state, ready: false };

      case `${SET_SEARCH_RESULTS}_REJECTED`:
        return { ...state, ready: true, results: [] };

      case `${SET_SEARCH_RESULTS}_FULFILLED`:
        return {
          ...state,
          ...action.payload,
          ready: true,
        };

      case SEARCH_SET_FILTER_TYPE:
        return { ...state, filter: action.filter };

      case SEARCH_SET_DATE_FILTER:
        return { ...state, dateFilter: action.dateFilter };

      case SEARCH_SET_QUERY:
        return { ...state, query: action.query };

      case SEARCH_SET_PAGE_NUMBER:
        return { ...state, page: action.page };

      case SYNC_STORE:
        return { ...(action.data && action.data.search) };

      default:
        return state;
    }
  }
  return state;
}
