import * as types from '../actions/action-types';
// eslint-disable-next-line import/no-cycle
import { isValidArray } from '../../utils/helpers';

/**
 * Helper to combine hide / show popup actions
 * @param {Object} state - Current state
 * @param {string} id - ID of the popup to hide / show
 * @param {boolean} show - Visible status
 * @param {Object} propsPopup - Current state
 * @returns {Object}
 */
export const togglePopup = (state, id, show, propsPopup) => {
  if (isValidArray(state.list)) {
    return {
      ...state,
      ...{
        list: state.list.map((popup) => {
          if (popup.id === id) {
            if (propsPopup) {
              return { ...popup, ...{ visible: show, props: propsPopup } };
            }
            return { ...popup, ...{ visible: show } };
          }
          return popup;
        }),
      },
    };
  }
  return state;
};

/**
 * Reducers related to popups
 * @param {Object} state of the application
 * @param {Object} action to be trigger
 * @returns {Object}
 */
export default function popupReducer(state = { list: [] }, action) {
  switch (action.type) {
    case types.REGISTER_POPUPS:
      if (isValidArray(action.list)) {
        // Checking if popup id already exist
        const validPopus = action.list.filter(
          popup => state.list.every(popupToCheck => popupToCheck.id !== popup.id)
        );
        if (validPopus.length) {
          return { ...state, ...{ list: [...state.list, ...validPopus] } };
        }
      }
      return state;
    case types.SHOW_POPUP:
      return togglePopup(state, action.id, true, action.propsPopup);
    case types.CLOSE_POPUP:
      return togglePopup(state, action.id, false);
    case types.REMOVE_POPUPS:
      return { ...state, ...{ list: [] } };
    default:
      return state;
  }
}
