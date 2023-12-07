import {
  setSearchData,
  getSearchResults,
  setFilterType,
  setDateFilter,
  setPageNumber,
  setSearchQuery,
  fetchSearchResults,
} from './search-actions';
import {
  SEARCH_FETCH_RESULTS,
  SEARCH_SET_DATA,
  SEARCH_SET_DATE_FILTER,
  SEARCH_SET_FILTER_TYPE,
  SEARCH_SET_PAGE_NUMBER,
  SEARCH_SET_QUERY,
} from './action-search-types';
import * as fetchApi from '../../../utils/api/fetchApi';

const data = { ready: true };
const testPromise = new Promise((resolve, reject) => {
  resolve({ 'sports-content': 'abc' });
  reject(new Error('something bad happened'));
});

/**
 * Dummy action function
 * @returns {Object}
 */
const action = () => ({
  payload: testPromise,
});

describe('search actions', () => {
  it('should returns the right action', () => {
    expect(setSearchData(data).type).toBe(SEARCH_SET_DATA);
    expect(getSearchResults()).toEqual(null);
    expect(getSearchResults(action).type).toBe(SEARCH_FETCH_RESULTS);
    expect(setDateFilter('myDate').type).toBe(SEARCH_SET_DATE_FILTER);
    expect(setFilterType('myFilter').type).toBe(SEARCH_SET_FILTER_TYPE);
    expect(setSearchQuery('myQuery').type).toBe(SEARCH_SET_QUERY);
    expect(setPageNumber('pageNumber').type).toBe(SEARCH_SET_PAGE_NUMBER);
  });

  it('should return the expected action type when fetching results', async () => {
    fetchApi.fetchSearchApi = jest.fn(() => Promise.resolve({
      data: {},
    }));
    const currentAction = fetchSearchResults(10);
    const mockDispatch = jest.fn().mockImplementation(() => new Promise((resolve) => {
      resolve({ value: { data: 'test' } });
    }));
    await currentAction(mockDispatch, jest.fn(() => ({
      search: {},
      page: {},
    })));
    expect(mockDispatch).toHaveBeenCalled();
  });
});
