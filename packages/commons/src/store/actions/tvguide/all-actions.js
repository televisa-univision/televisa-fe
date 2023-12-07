import {
  TV_GUIDE_FETCH_ALL_EVENTS,
  TV_GUIDE_SET_DATE,
  TV_GUIDE_SET_CHANNEL,
  TV_GUIDE_SET_CONTENT_TYPE,
} from './action-tv-guide-types';
import Store from '../../store';
import { isValidArray } from '../../../utils/helpers';

/**
 * Get all events action
 * @param {Object} actions - Action definition
 * @returns {Object}
 */
const getAllEvents = (actions) => {
  if (isValidArray(actions)) {
    return {
      type: TV_GUIDE_FETCH_ALL_EVENTS,
      payload: Promise.all(actions.map(action => Store.dispatch(action()))),
    };
  }
  return {};
};

/**
 * Set date
 * @param {string} date - Date to be set
 * @returns {Object}
 */
const setDate = date => ({
  type: TV_GUIDE_SET_DATE,
  date,
});

/**
 * Set channel
 * @param {string} channel - Channel to be set
 * @returns {Object}
 */
const setChannel = channel => ({
  type: TV_GUIDE_SET_CHANNEL,
  channel,
});

/**
 * Set content
 * @param {string} contentType - Content to be set
 * @returns {Object}
 */
const setContent = contentType => ({
  type: TV_GUIDE_SET_CONTENT_TYPE,
  contentType,
});

export {
  getAllEvents,
  setDate,
  setChannel,
  setContent,
};
