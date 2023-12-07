import mockStore from '../../__mocks__/store';
import {
  SET_CLOSED_HAMBURGER_MENU,
  SET_OPEN_HAMBURGER_MENU,
  SET_CLOSED_SEARCH_FIELD,
  SET_OPEN_SEARCH_FIELD,
  SET_OPEN_MARKET_SELECTOR,
  SET_CLOSED_MARKET_SELECTOR,
  SET_HEADER_CONF,
  SET_USER_LOG_IN,
  SET_USER_LOG_OUT,
} from './header-action-types';
import {
  setHamburgerClosed,
  setHamburgerOpen,
  setMarketSelectorClosed,
  setMarketSelectorOpen,
  setSearchFieldClosed,
  setSearchFieldOpen,
  setHeaderConf,
  setUserLogIn,
  setUserLogOut,
} from './header-actions';

describe('setHeaderConf spec', () => {
  it('should return the corresponding type by default', () => {
    expect(setHeaderConf()).toEqual({
      type: SET_HEADER_CONF,
      conf: {},
    });
  });
});

describe('setHamburgerOpen spec', () => {
  it('should return the corresponding type by default', () => {
    expect(setHamburgerOpen()).toEqual({
      type: SET_OPEN_HAMBURGER_MENU,
    });
  });

  it('should not try to toggle sections-mobile-open on the body if document does not exist', () => {
    const documentMemo = global.document;
    delete global.document;

    expect(() => setHamburgerOpen()).not.toThrow();

    global.document = documentMemo;
  });
});

describe('setHamburgerClosed spec', () => {
  it('should return the corresponding type when is mobile with MarketSelector closed', () => {
    const getState = jest.fn(() => ({ headerConf: { isMarketSelectorOpen: false }, page: { device: 'mobile' } }));
    const store = mockStore(getState);
    const { dispatch } = store;
    const action = setHamburgerClosed();
    const result = action(dispatch, getState);
    expect(result).toEqual({
      type: SET_CLOSED_HAMBURGER_MENU,
    });
  });

  it('should return the corresponding type when is mobile with MarketSelector open', () => {
    const getState = jest.fn(() => ({ headerConf: { isMarketSelectorOpen: true }, page: { device: 'mobile' } }));
    const store = mockStore(getState);
    const { dispatch } = store;
    const action = setHamburgerClosed();
    const result = action(dispatch, getState);
    expect(result).toEqual({
      type: SET_CLOSED_MARKET_SELECTOR,
    });
  });

  it('should not try to toggle sections-mobile-open on the body if document does not exist', () => {
    const documentMemo = global.document;
    delete global.document;

    expect(() => setHamburgerClosed()).not.toThrow();

    global.document = documentMemo;
  });
});
describe('setMarketSelectorOpen spec', () => {
  it('should return the corresponding type by default', () => {
    expect(setMarketSelectorOpen()).toEqual({
      type: SET_OPEN_MARKET_SELECTOR,
    });
  });
});

describe('setMarketSelectorClosed spec', () => {
  it('should return the corresponding type by default', () => {
    expect(setMarketSelectorClosed()).toEqual({
      type: SET_CLOSED_MARKET_SELECTOR,
    });
  });
});

describe('setSearchFieldOpen spec', () => {
  it('should return the corresponding type by default', () => {
    expect(setSearchFieldOpen()).toEqual({
      type: SET_OPEN_SEARCH_FIELD,
    });
  });
});

describe('setSearchFieldClosed spec', () => {
  it('should return the corresponding type by default', () => {
    expect(setSearchFieldClosed()).toEqual({
      type: SET_CLOSED_SEARCH_FIELD,
    });
  });
});

describe('setUserLogIn spec', () => {
  it('should return the corresponding type by default', () => {
    expect(setUserLogIn()).toEqual({
      type: SET_USER_LOG_IN,
    });
  });
});

describe('setUserLogOut spec', () => {
  it('should return the corresponding type by default', () => {
    expect(setUserLogOut()).toEqual({
      type: SET_USER_LOG_OUT,
    });
  });
});
