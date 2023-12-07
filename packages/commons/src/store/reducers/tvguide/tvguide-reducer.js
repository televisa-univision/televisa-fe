import {
  TV_GUIDE_FETCH_ALL_EVENTS,
  TV_GUIDE_SET_DATE,
  TV_GUIDE_SET_CHANNEL,
  TV_GUIDE_SET_CONTENT_TYPE,
  TV_GUIDE_FETCH_SPORT_EVENTS,
  TV_GUIDE_FETCH_SHOWS_EVENTS,
  TV_GUIDE_FETCH_UDN_EVENTS,
} from '../../actions/tvguide/action-tv-guide-types';
import {
  NETWORK_UNIVISION,
} from '../../../constants/tvGuide';
import { getKey } from '../../../utils/helpers';

const initialState = {
  events: [
    // data from different sources
  ],
  date: new Date().toISOString(),
  contentType: 'all',
  channel: NETWORK_UNIVISION,
  ready: false,
};

/**
 * Helper to reuse after fullfill
 * @param {Object} action - Action completed
 * @param {Object} state - Current state
 * @returns {Object}
 */
export function fullfilledSetter(action, state) {
  const extractor = getKey(action, 'meta.instance.extractor');
  if (action && action.payload && extractor && typeof extractor === 'function') {
    return {
      ...state,
      events: [
        ...state.events, ...action.meta.instance.extractor(action.payload),
      ],
    };
  }
  return state;
}

/**
 * Reducers related to tvGuide
 * @param {Object} state of the application
 * @param {Object} action to be trigger
 * @returns {Object}
 */
export default function tvGuidReducer(state = { ...initialState }, action) {
  if (action) {
    switch (action.type) {
      case `${TV_GUIDE_FETCH_ALL_EVENTS}_PENDING`:
        // Reseting
        return { ...state, ready: false, events: [] };
      case `${TV_GUIDE_FETCH_ALL_EVENTS}_REJECTED`:
      case `${TV_GUIDE_FETCH_ALL_EVENTS}_FULFILLED`:
        return { ...state, ready: true };

      case `${TV_GUIDE_FETCH_SPORT_EVENTS}_FULFILLED`:
        return fullfilledSetter(action, state);

      case `${TV_GUIDE_FETCH_SHOWS_EVENTS}_FULFILLED`:
        return fullfilledSetter(action, state);

      case `${TV_GUIDE_FETCH_UDN_EVENTS}_FULFILLED`:
        return fullfilledSetter(action, state);

      case TV_GUIDE_SET_DATE:
        return { ...state, date: action.date };

      case TV_GUIDE_SET_CHANNEL:
        return { ...state, channel: action.channel };

      case TV_GUIDE_SET_CONTENT_TYPE:
        return { ...state, contentType: action.contentType };

      default:
        return state;
    }
  }
  return state;
}
