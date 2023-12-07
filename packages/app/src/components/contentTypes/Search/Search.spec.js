import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as searchActions from '@univision/fe-commons/dist/store/actions/search/search-actions';
import ConnectedSearch, {
  areStatePropsEqual,
  mapStateToProps,
  mapDispatchToProps,
} from '.';

// Mocks
const store = configureStore();
const dispatch = jest.fn();
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

describe('Search', () => {
  it('should renders as expected', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ConnectedSearch store={store} pageData={{}} />, div);
  });
});

describe('mapStateToProps', () => {
  it('should return the right object', () => {
    const state = {
      search: {
        ready: true,
        results,
      },
    };
    expect(mapStateToProps({
      ...state,
      search: { ...state.search, ready: false },
    }).search.results).toHaveLength(3);
  });
});

describe('mapDispatchToProps', () => {
  it('should call fetchSearchResults with the right arguments if actions defined', () => {
    searchActions.fetchSearchResults = jest.fn();
    const pageSize = 21;
    const porpsObj = mapDispatchToProps(dispatch);
    porpsObj.fetchSearchResults(pageSize);
    expect(searchActions.fetchSearchResults).toHaveBeenCalledWith(pageSize);
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
  it('should return the appropiate boolean', () => {
    const propA = {
      a: {
        b: {
          c: 'hello',
        },
      },
    };
    const propB = {
      a: {
        b: {
          c: 'hello world',
        },
      },
    };
    expect(areStatePropsEqual(propA, propA)).toBeTruthy();
    expect(areStatePropsEqual(propA, propB)).toBeFalsy();
  });
});
