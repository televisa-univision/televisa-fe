import * as types from './action-types';

/**
 * Register popups action
 * @param {array} list of popoups conf objects
 * @returns {Object}
 */
export function registerPopups(list) {
  return {
    type: types.REGISTER_POPUPS,
    list,
  };
}

/**
 * Remove all popups action
 * @param {array} list of popoups conf objects
 * @returns {Object}
 */
export function removePopups() {
  return {
    type: types.REMOVE_POPUPS,
  };
}

/**
 * Show particular popup
 * @param {string} id of the popup
 * @param {string} propsPopup of the popup
 * @returns {Object}
 */
export function showPopup(id, propsPopup) {
  return {
    type: types.SHOW_POPUP,
    id,
    propsPopup,
  };
}

/**
 * Close particular popup
 * @param {string} id from component
 * @returns {Object}
 */
export function closePopup(id) {
  return {
    type: types.CLOSE_POPUP,
    id,
  };
}
