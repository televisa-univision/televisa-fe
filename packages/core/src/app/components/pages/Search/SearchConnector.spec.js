import * as searchActions from '@univision/fe-commons/dist/store/actions/search/search-actions';
import {
  mapStateToProps,
  mapDispatchToProps,
  areStatePropsEqual,
} from './SearchConnector';
import searchActionDefinitions from './config/searchActionDefinitions';

// Mocks
const dispatch = jest.fn();
searchActionDefinitions.fetchResults = jest.fn(() => ('my action object'));
searchActions.getSearchResults = jest.fn();
searchActions.setFilterType = jest.fn();
searchActions.setDateFilter = jest.fn();
searchActions.setPageNumber = jest.fn();
searchActions.setSearchQuery = jest.fn();

const results = [
  {
    name: 'a',
    type: 'article',
  },
  {
    name: 'b',
    time: 1544184000000,
    type: 'slideshow',
  },
  {
    name: 'c',
    type: 'video',
  },
];

describe('mapStateToProps', () => {
  it('should return the right object', () => {
    const state = {
      search: {
        ready: true,
        results,
      },
    };
    expect(mapStateToProps(state, { testprops: 'abc' }).testprops).toBe('abc');
    expect(mapStateToProps({
      ...state,
      search: { ...state.search, ready: false },
    }).results).toHaveLength(3);
  });
});

describe('mapDispatchToProps', () => {
  it('should call getSearchResults with the right arguments if actions defined', () => {
    const porpsObj = mapDispatchToProps(dispatch);
    porpsObj.getSearchResults();
    expect(searchActions.getSearchResults).toHaveBeenCalled();
  });
  it('should call dispatch with the right arguments', () => {
    const porpsObj = mapDispatchToProps(dispatch);
    const date = 'year';
    porpsObj.setDateFilter(date);
    expect(searchActions.setDateFilter).toHaveBeenCalledWith(date);
    const query = 'abc';
    porpsObj.setSearchQuery(query);
    expect(searchActions.setSearchQuery).toHaveBeenCalledWith(query);
    const filter = 'article';
    porpsObj.setFilterType(filter);
    expect(searchActions.setFilterType).toHaveBeenCalledWith(filter);
    const page = '1';
    porpsObj.setPageNumber(page);
    expect(searchActions.setPageNumber).toHaveBeenCalledWith(page);
  });
});

describe('areStatePropsEqual', () => {
  it('should return the right value', () => {
    const prevProps = {
      ready: false,
      filter: 'all',
      date: 'today',
      pageNumber: '1',
      query: 'abc',
    };
    const nextProps = {
      ready: true,
      filter: 'article',
      date: 'week',
      pageNumber: '2',
      query: 'cde',
    };
    expect(areStatePropsEqual(prevProps, prevProps)).toBeTruthy();
    expect(areStatePropsEqual(prevProps, nextProps)).toBeFalsy();
    expect(areStatePropsEqual(null, null)).toBeFalsy();
  });
});
