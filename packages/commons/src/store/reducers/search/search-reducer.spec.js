import {
  SEARCH_FETCH_RESULTS,
  SEARCH_SET_DATA,
  SEARCH_SET_DATE_FILTER,
  SEARCH_SET_FILTER_TYPE,
  SEARCH_SET_PAGE_NUMBER,
  SEARCH_SET_QUERY,
  SET_SEARCH_RESULTS,
} from '../../actions/search/action-search-types';
import { SYNC_STORE } from '../../actions/action-types';
import searchReducer from './search-reducer';

const extractorMock = jest.fn(data => (data));
const sampleState = {
  results: [
    // data from different sources
  ],
  query: '',
  filter: 'all',
  dateFilter: 'today',
  pageNumber: 1,
  totalPages: 1,
  totalResults: 1,
  ready: false,
};

describe('search reducer', () => {
  beforeEach(() => {
    extractorMock.mockClear();
  });

  it('should returns default state if not have valid action', () => {
    expect(searchReducer(sampleState, null)).toEqual(sampleState);
  });

  it('should returns the right state when start to fetch', () => {
    expect(searchReducer(sampleState, {
      type: SEARCH_SET_DATA,
      data: {
        query: 'test',
      }
    }).query).toEqual('test');
  });

  it('should returns the right state when start to fetch', () => {
    expect(searchReducer(sampleState, {
      type: `${SEARCH_FETCH_RESULTS}_PENDING`,
    }).ready).toBeFalsy();
  });

  it('should returns the right state when the fetch is rejected', () => {
    expect(searchReducer(sampleState, {
      type: `${SEARCH_FETCH_RESULTS}_REJECTED`,
    }).ready).toBeTruthy();
  });

  it('should returns the right state and call "fullfilledSetter"', () => {
    const payload = {
      results: [{ type: 'article' }],
      totalPages: 1,
      totalResults: 1,
    };
    expect(searchReducer(sampleState, {
      type: `${SEARCH_FETCH_RESULTS}_FULFILLED`,
      payload,
      meta: {
        extractor: extractorMock,
      },
    }).results[0].type).toBe('article');
    expect(extractorMock).toHaveBeenCalledWith(payload);
  });

  it('should returns default state if not have valid data', () => {
    const payload = null;
    expect(searchReducer(sampleState, {
      type: `${SEARCH_FETCH_RESULTS}_FULFILLED`,
      payload,
    }).results).toEqual([]);
    expect(extractorMock).not.toHaveBeenCalled();
  });

  it('should returns the right state when set date filter', () => {
    const dateFilter = 'all';
    expect(searchReducer(sampleState, {
      type: SEARCH_SET_DATE_FILTER,
      dateFilter,
    }).dateFilter).toBe(dateFilter);
  });

  it('should returns the right state when set type filter', () => {
    const filter = 'article';
    expect(searchReducer(sampleState, {
      type: SEARCH_SET_FILTER_TYPE,
      filter,
    }).filter).toBe(filter);
  });

  it('should returns the right state when set page number', () => {
    const query = 'query';
    expect(searchReducer(sampleState, {
      type: SEARCH_SET_QUERY,
      query,
    }).query).toBe(query);
    const pageNumber = 1;
    expect(searchReducer(sampleState, {
      type: SEARCH_SET_PAGE_NUMBER,
      pageNumber,
    }).pageNumber).toBe(pageNumber);
  });

  it('should return the right previous state when sync store', () => {
    expect(searchReducer(sampleState, {
      type: SYNC_STORE,
      data: {
        search: {
          ...sampleState,
          ready: true,
        },
      },
    })).toEqual(expect.objectContaining({
      ready: true,
      query: '',
      filter: 'all',
    }));
  });

  it('should return the right state when set search results', () => {
    expect(searchReducer(sampleState, {
      type: `${SET_SEARCH_RESULTS}_FULFILLED`,
      data: {
        search: {
          ...sampleState,
          ready: true,
        },
      },
    })).toEqual(expect.objectContaining({
      ready: true,
      query: '',
      filter: 'all',
    }));
  });

  it('should returns the right state when the fetch is rejected', () => {
    expect(searchReducer(sampleState, {
      type: `${SET_SEARCH_RESULTS}_REJECTED`,
    }).ready).toBeTruthy();
  });

  it('should returns the right state when start to fetch', () => {
    expect(searchReducer(sampleState, {
      type: `${SET_SEARCH_RESULTS}_PENDING`,
    }).ready).toBeFalsy();
  });
});
