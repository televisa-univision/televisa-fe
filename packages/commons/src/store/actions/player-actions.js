/* eslint-disable import/no-extraneous-dependencies */
import { batch } from 'react-redux';

import * as types from './action-types';
import { getKey, isValidFunction } from '../../utils/helpers';
import {
  isAnchorRadio,
} from '../radioStoreHelper';
import { RADIO_PLAYER_ID } from '../../constants/radio';
import { removePlayerInstance } from '../../utils/video';

/**
 * Action to store interval timer to state
 * @param   {number|null} timer the timer
 * @returns {Object} the action object
 */
export function storeTimer(timer) {
  return {
    type: types.PLAYER_STORE_TIMER,
    data: timer,
  };
}

/**
 * Register player for current station
 * @param {Object} nowPlaying from fetchPlayer/subscribeToTimer
 * @returns {Object}
 */
export function playRadioAction(nowPlaying) {
  return {
    type: types.PLAYER_PLAY_RADIO,
    nowPlaying,
  };
}

/**
 * Set Heartbeat data
 * @param {Object} heartbeat contains all the info related with the heartbeat tracking.
 * @returns {Object}
 */
export function setHeartBeat(heartbeat) {
  return {
    type: types.PLAYER_RADIO_SET_HEARTBEAT,
    heartbeat,
  };
}

/**
 * Action to clear station widget data
 * @returns {Object}
 */
export function releaseNowPlayingAction() {
  return {
    type: types.PLAYER_CLOSE_NOW_PLAYING,
  };
}

/**
 * Close radio action
 * @returns {Object}
 */
export function closeRadioAction() {
  return {
    type: types.PLAYER_CLOSE_RADIO,
  };
}

/**
 * Fall back to error when fetch fails
 * @param {string} error from fetchStation()
 * @returns {Object}
 */
export function playerError(error) {
  return {
    type: types.PLAYER_ERROR,
    error,
  };
}

/**
 * Set current radio data by type
 * @param {string} type action type
 * @param {string} nowPlayingId the stream id for the radio station
 * @returns {Object}
 */
export function setRadioData({
  type, songData,
}) {
  return {
    type, nowPlaying: songData,
  };
}

/**
 * Set Stream Url
 * @returns {Object}
 */
export function initRadio() {
  return {
    type: types.PLAYER_SET_RADIO_URL,
  };
}

/**
 * Clear interval, clean store timer and dispatch action
 * @param {function} action - Action to be dispatched after reset
 * @param {array} args - Rest of arguments
 * @returns {Function} redux-thunk
 */
export function resetAndDo(action, ...args) {
  return (dispatch, getState) => {
    const timer = getKey(getState(), 'player.timer');
    if (timer) {
      clearInterval(timer);
    }
    if (isValidFunction(action)) {
      batch(() => {
        dispatch(storeTimer(null));
        dispatch(action(...args));
      });
    }
  };
}

// Actions that require timer reset
/**
 * Facade for playRadio action
 * @param {Object} nowPlaying - Estation conf
 * @returns {Function} redux-thunk
 */
export function playRadio(nowPlaying) {
  return resetAndDo(playRadioAction, nowPlaying);
}

/**
 * Facade for releaseNowPlaying action to get the state
 * @returns {function}
 */
export function releaseNowPlaying() {
  return (dispatch, getState) => {
    // stop timer only if anchor radio not is playing
    if (!isAnchorRadio(getState())) {
      return dispatch(resetAndDo(releaseNowPlayingAction));
    }
    return dispatch(releaseNowPlayingAction());
  };
}

/**
 * Facade for closeRadio action
 * @returns {Object}
 */
export function closeRadio() {
  removePlayerInstance(RADIO_PLAYER_ID);
  return resetAndDo(closeRadioAction);
}
