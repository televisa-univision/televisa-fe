import {
  MEDIAPLAYER_PLAY_RADIO,
  MEDIAPLAYER_CLOSE_RADIO,
} from '../../actions/mediaplayer/action-types';

const initialRadioState = {
  image: null,
  logo: null,
  sharingOptions: null,
  socialNetworks: null,
  stationDescription: null,
  stationTitle: null,
  uri: null,
};

const initialState = {
  radio: initialRadioState,
  videoPlaying: null,
};

/**
 * MediaPlayer store reducer.
 * @param {Object} state Store state
 * @param {string} action to process;
 * @returns {Object}
 */
export default function mediaPlayerStoreReducer(state = { ...initialState }, action) {
  switch (action.type) {
    case MEDIAPLAYER_PLAY_RADIO: {
      return {
        ...state,
        radio: action.radio,
        videoPlaying: null,
      };
    }
    case MEDIAPLAYER_CLOSE_RADIO:
      return {
        ...state,
        radio: initialRadioState,
      };
    default:
      return state;
  }
}
