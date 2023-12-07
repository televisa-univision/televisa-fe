import deepFreeze from 'deep-freeze';
import {
  SET_CLOSED_HAMBURGER_MENU,
  SET_OPEN_HAMBURGER_MENU,
  SET_OPEN_MARKET_SELECTOR,
  SET_CLOSED_MARKET_SELECTOR,
  SET_CLOSED_SEARCH_FIELD,
  SET_OPEN_SEARCH_FIELD,
  SET_HEADER_CONF,
  SET_USER_LOG_IN,
  SET_USER_LOG_OUT,
} from '../../actions/header/header-action-types';
import { SYNC_STORE } from '../../actions/action-types';
import reducer from './header-reducer';

const initialState = {
  brandableType: null,
  isHamburgerMenuOpen: false,
  isMarketSelectorOpen: false,
  isSearchFieldOpen: false,
  userLogIn: false,
};
deepFreeze(initialState);

describe('header-reducer spec', () => {
  it('should return an initial state when type is not found', () => {
    const action = { type: 'random' };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(initialState);
  });
});

describe('SET_HEADER_CONF', () => {
  it('should return an initial state by default', () => {
    const action = {
      type: SET_HEADER_CONF,
      conf: {},
    };
    deepFreeze(action);
    expect(reducer(initialState, action)).toEqual(initialState);
  });
  it('should return the expected conf', () => {
    const action = {
      type: SET_HEADER_CONF,
      conf: {
        title: 'title',
        brandableType: 'show',
      },
    };
    deepFreeze(action);
    const expectedState = {
      ...initialState,
      brandableType: 'show',
      title: 'title',
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});

describe('SET_OPEN_HAMBURGER_MENU', () => {
  it('should return corresponding state flag', () => {
    const expectedState = {
      ...initialState,
      isHamburgerMenuOpen: true,
    };
    const action = {
      type: SET_OPEN_HAMBURGER_MENU,
    };
    deepFreeze(action);
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});

describe('SET_CLOSED_HAMBURGER_MENU', () => {
  it('should return corresponding state flag', () => {
    const expectedState = {
      ...initialState,
      isHamburgerMenuOpen: false,
    };
    const action = {
      type: SET_CLOSED_HAMBURGER_MENU,
    };
    deepFreeze(action);
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});

describe('SET_OPEN_SEARCH_FIELD', () => {
  it('should return corresponding state flag', () => {
    const expectedState = {
      ...initialState,
      isSearchFieldOpen: true,
    };
    const action = {
      type: SET_OPEN_SEARCH_FIELD,
    };
    deepFreeze(action);
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});

describe('SET_CLOSED_SEARCH_FIELD', () => {
  it('should return corresponding state flag', () => {
    const expectedState = {
      ...initialState,
      isSearchFieldOpen: false,
    };
    const action = {
      type: SET_CLOSED_SEARCH_FIELD,
    };
    deepFreeze(action);
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});

describe('SET_OPEN_MARKET_SELECTOR', () => {
  it('should return corresponding state flag', () => {
    const expectedState = {
      ...initialState,
      isMarketSelectorOpen: true,
    };
    const action = {
      type: SET_OPEN_MARKET_SELECTOR,
    };
    deepFreeze(action);
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});

describe('SET_CLOSED_MARKET_SELECTOR', () => {
  it('should return corresponding state flag', () => {
    const expectedState = {
      ...initialState,
      isMarketSelectorOpen: false,
    };
    const action = {
      type: SET_CLOSED_MARKET_SELECTOR,
    };
    deepFreeze(action);
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});

describe('SYNC_STORE', () => {
  it('should return the right previous state when sync store', () => {
    const action = {
      type: SYNC_STORE,
      data: {
        headerConf: {
          ...initialState,
          ready: true,
        },
      },
    };
    deepFreeze(action);
    expect(reducer(initialState, action)).toEqual(expect.objectContaining({
      ...initialState,
      ready: true,
    }));
  });
});

describe('SET_USER LOG_IN', () => {
  it('should return corresponding state flag', () => {
    const expectedState = {
      ...initialState,
      userLogIn: true,
    };
    const action = {
      type: SET_USER_LOG_IN,
    };
    deepFreeze(action);
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});

describe('SET_LOGOUT_NOT_STICKY', () => {
  it('should return corresponding state flag', () => {
    const expectedState = {
      ...initialState,
      userLogIn: false,
    };
    const action = {
      type: SET_USER_LOG_OUT,
    };
    deepFreeze(action);
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
