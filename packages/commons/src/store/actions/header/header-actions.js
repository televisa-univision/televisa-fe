import * as types from './header-action-types';
import { deviceSelector, isMarketSelectorOpenSelector } from '../../selectors/page-selectors';

/**
 * Sets Market Selector open flag in headerConf store
 * @returns {Object}
 */
export function setMarketSelectorOpen() {
  return { type: types.SET_OPEN_MARKET_SELECTOR };
}

/**
 * Sets Market Selector closed flag in headerConf store
 * @returns {Object}
 */
export function setMarketSelectorClosed() {
  return { type: types.SET_CLOSED_MARKET_SELECTOR };
}

/**
 * Sets the header configuration, will merge initial state with new values
 * provided if any for SPA reset the initiial state for the Mega Menu
 * @param {Object} conf configuration to store
 * @returns {Object}
 */
export function setHeaderConf(conf = {}) {
  return {
    type: types.SET_HEADER_CONF,
    conf,
  };
}

/**
 * Sets hamburger open flag in headerConf store
 * @returns {Object}
 */
export function setHamburgerOpen() {
  if ('document' in global) {
    /**
     * WARNING: DO NOT MANIPULATE THE DOM DIRECTLY IF YOU ARE TARGETING AN
     * ELEMENT THAT'S INSIDE THE REACT TREE.
     *
     * The only reason we do it here is because this is an edge case. For the
     * scrolling on the mega menu to correctly work, we need to hide the
     * overflow-y of the body element, which lives outside of the react tree. If
     * not, the user would weirdly start scrolling the main page when having
     * finished scrolling on the mega menu.
     */
    global.document.body.classList.add('sections-mobile-open');
  }

  return { type: types.SET_OPEN_HAMBURGER_MENU };
}

/**
 * Sets hamburger closed flag in headerConf store
 * @returns {Object}
 */
export function setHamburgerClosed() {
  if ('document' in global) {
    global.document.body.classList.remove('sections-mobile-open');
  }
  return (dispatch, getState) => {
    const isDesktop = deviceSelector(getState) === 'desktop';
    const isMarketSelectorOpen = isMarketSelectorOpenSelector(getState());
    if (isMarketSelectorOpen && !isDesktop) {
      return dispatch(setMarketSelectorClosed());
    }
    return dispatch({ type: types.SET_CLOSED_HAMBURGER_MENU });
  };
}

/**
 * Sets search field open flag in headerConf store
 * @returns {Object}
 */
export function setSearchFieldOpen() {
  return { type: types.SET_OPEN_SEARCH_FIELD };
}

/**
 * Sets search field closed flag in headerConf store
 * @returns {Object}
 */
export function setSearchFieldClosed() {
  return { type: types.SET_CLOSED_SEARCH_FIELD };
}

/**
 * Sets user log in
 * @returns {Object}
 */
export function setUserLogIn() {
  return { type: types.SET_USER_LOG_IN };
}

/**
 * Sets user log out
 * @returns {Object}
 */
export function setUserLogOut() {
  return { type: types.SET_USER_LOG_OUT };
}
