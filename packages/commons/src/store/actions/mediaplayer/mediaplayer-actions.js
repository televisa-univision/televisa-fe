import {
  MEDIAPLAYER_PLAY_RADIO,
  MEDIAPLAYER_CLOSE_RADIO,
} from './action-types';

/**
 * Set mediaPlayer radio data to state
 * @param {Object} config the radio player config
 * @returns {Object}
 */
export const mediaPlayerPlayRadio = config => ({
  type: MEDIAPLAYER_PLAY_RADIO,
  radio: config,
});

/**
 * Close radio mediaPlayer
 * @returns {Object}
 */
export const mediaPlayerCloseRadio = () => ({
  type: MEDIAPLAYER_CLOSE_RADIO,
});
