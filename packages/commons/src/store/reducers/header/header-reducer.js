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
} from '../../actions/header/header-action-types';
import { SYNC_STORE } from '../../actions/action-types';

const initialState = {
  brandableType: null,
  isHamburgerMenuOpen: false,
  isMarketSelectorOpen: false,
  isSearchFieldOpen: false,
  userLogIn: false,
};

/**
 * Header configuration reducer
 * @param {Object} state of the header reducer
 * @param {*} action to be triggered
 * @returns {Object}
 */
export default function headerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_HEADER_CONF:
      // Should reset some general flags
      return {
        scrollTop: state.scrollTop,
        ...initialState,
        ...action.conf,
      };

    case SET_OPEN_HAMBURGER_MENU:
      return {
        ...state,
        isHamburgerMenuOpen: true,
      };

    case SET_CLOSED_HAMBURGER_MENU:
      return {
        ...state,
        isHamburgerMenuOpen: false,
      };

    case SET_OPEN_SEARCH_FIELD:
      return {
        ...state,
        isSearchFieldOpen: true,
      };

    case SET_CLOSED_SEARCH_FIELD:
      return {
        ...state,
        isSearchFieldOpen: false,
      };

    case SET_OPEN_MARKET_SELECTOR:
      return {
        ...state,
        isMarketSelectorOpen: true,
      };

    case SET_CLOSED_MARKET_SELECTOR:
      return {
        ...state,
        isMarketSelectorOpen: false,
      };

    case SET_USER_LOG_IN:
      return {
        ...state,
        userLogIn: true,
      };

    case SET_USER_LOG_OUT:
      return {
        ...state,
        userLogIn: false,
      };

    case SYNC_STORE:
      return { ...action.data.headerConf };

    default:
      return state;
  }
}
