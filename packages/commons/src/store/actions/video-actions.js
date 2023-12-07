import * as types from './action-types';

/**
 * Register video player for current playing data
 * @param {Object} nodeId current playing data
 * @param {Object} updateAnchoredState updates current instance state
 * @returns {Object}
 */
export default function storePlayingData(nodeId, updateAnchoredState) {
  return {
    type: types.STORE_PLAYING_DATA,
    nodeId,
    updateAnchoredState,
  };
}

/**
 * Update the SDK state
 * @param {boolean} sdkReady Flag to indicate if the SDK is ready
 * @returns {{type: string, sdkReady: *}}
 */
export function storeSdkState({ sdkReady }) {
  return {
    type: types.STORE_VIDEO_SDK_STATE,
    sdkReady,
  };
}

/**
 * Store the playlist clicked state
 * @param {boolean} clicked if the playlist is clicked
 * @returns {{type: string, payload: Object}}
 */
export function setPlaylistClicked(clicked) {
  return {
    type: types.SET_PLAYLIST_CLICKED,
    payload: clicked,
  };
}

/**
 * Video casting enabled action
 * @param {Object} options - action options
 * @property {string} options.nodeId - casting video nodeId
 * @property {Object} options.payload - casting video data payload
 * @returns {Object}
 */
export function castingEnabled({
  nodeId,
  payload,
}) {
  return {
    type: types.CASTING_ENABLE,
    nodeId,
    payload,
  };
}

/**
 * Video casting enabled action
 * @returns {Object}
 */
export function castingDisabled() {
  return {
    type: types.CASTING_DISABLE,
  };
}

/**
 * Video casting ad break end action
 * @returns {Object}
 */
export function castingAdBreakEnd() {
  return {
    type: types.CASTING_AD_BREAK_END,
  };
}

/**
 * Video casting ad break end action
 * @returns {Object}
 */
export function castingAdBreakStart() {
  return {
    type: types.CASTING_AD_BREAK_START,
  };
}

/**
 * Video casting ad break end action
 * @param {Object} payload current ad info
 * @returns {Object}
 */
export function castingAdPod({ podcount: adPodcount, sequence: adSequence } = {}) {
  return {
    type: types.CASTING_AD_POD,
    payload: {
      adPodcount,
      adSequence,
    },
  };
}
