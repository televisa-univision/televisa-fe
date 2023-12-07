import { hasKey } from '../utils/helpers';

// 3 mins interval to fetch song api for station widget
// station chart will update when page load
// doesn't make sense to update it if user is not listening
export const STATION_INTERVAL = 1000 * 60 * 5;
// 30 secs interval to fetch song api for radio player
export const PLAYER_INTERVAL = 1000 * 30;

/**
 * Check if radio player is open
 * @param {Object} state - Global state
 * @returns {boolean}
 */
export function isAnchorRadio(state) {
  return hasKey(state, 'player.anchorPlayer.stationTitle');
}

/**
 * Helper to get timer interval based on status of the player
 * @param {Object} state - Global state
 * @returns {number}
 */
export function getFetchInterval(state) {
  let interval = STATION_INTERVAL;
  if (isAnchorRadio(state)) {
    interval = PLAYER_INTERVAL;
  }
  return interval;
}
