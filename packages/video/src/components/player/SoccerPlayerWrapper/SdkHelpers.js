import { hasKey } from '@univision/fe-commons/dist/utils/helpers';

/**
 * triggers match over
 * @param {string} nodeId player id
 */
export const matchOver = (nodeId) => {
  if (hasKey(global, 'window.FMG.trigger')) {
    const instance = global.window.FMG.getInstance(nodeId);
    if (instance) {
      instance.isMatchOver = false;
    }

    global.window.FMG.trigger('matchOver', null, { matchOver: true }, nodeId);
  }
};

/**
 * triggers match over
 * @param {Object} options config for playlist init
 */
export const initSoccerPlaylist = (options) => {
  if (hasKey(global, 'window.FMG.soccerPlaylist')) {
    global.window.FMG.soccerPlaylist(options);
  }
};

/**
 * triggers match over
 * @param {Function} cb function to run when event triggers
 * @param {string} nodeId player id
 */
export const onPreauthorizedResources = (cb, nodeId) => {
  if (hasKey(global, 'window.FMG.on')) {
    global.window.FMG.on('preauthorizedResources', cb, nodeId);
  }
};

/**
 * triggers language changed
 * @param {Function} cb function to run when event triggers
 * @param {string} nodeId player id
 */
export const onVideoLanguageChanged = (cb, nodeId) => {
  if (hasKey(global, 'window.FMG.on')) {
    global.window.FMG.on('Video.LanguageChanged', cb, nodeId);
  }
};

/**
 * triggers init playlist Livestream
 * @param {Object} options config for playlist init
 */
export const initPlaylistLivestream = (options) => {
  if (hasKey(global, 'window.FMG.playlistLivestream')) {
    global.window.FMG.playlistLivestream(options);
  }
};

/**
 * triggers init play Livestream
 * @param {Object} options config for playlist init
 */
export const initPlayLivestream = (options) => {
  if (hasKey(global, 'window.FMG.playLivestream')) {
    global.window.FMG.playLivestream(options);
  }
};

/**
 * triggers on cue points module ready
 * @param {Function} cb function to run when event triggers
 * @param {string} nodeId player id
 */
export const onCuePointsModuleReady = (cb, nodeId) => {
  if (hasKey(global, 'window.FMG.on')) {
    global.window.FMG.on('cuepointsModuleReady', cb, nodeId);
  }
};

/**
 * updates broadcast state
 * @param {string} nodeId player id
 * @param {string} params state params
 */
export const updateBroadcastState = (nodeId, params) => {
  if (hasKey(global, 'window.FMG.trigger')) {
    global.window.FMG.trigger('updateBroadcastState', null, params, nodeId);
  }
};
