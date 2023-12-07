import * as types from '../actions/action-types';

export const initialState = {
  anchorPlayer: {
    image: null,
    logo: null,
    sharingOptions: null,
    socialNetworks: null,
    stationDescription: null,
    stationTitle: null,
    uri: null,
  },
};

/**
 * Reducers related to radio player
 * @param {Object} state of the application
 * @param {Object} action to be trigger
 * @returns {Object}
 */
export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case types.PLAYER_PLAY_RADIO: {
      return {
        ...state,
        anchorPlayer: {
          ...state.anchorPlayer,
          ...action.nowPlaying,
        },
        pause: false,
      };
    }

    case types.PLAYER_PAUSE_RADIO: {
      const { pause } = action;
      return {
        ...state,
        pause,
      };
    }

    case types.PLAYER_RADIO_SET_HEARTBEAT: {
      const { heartbeat } = state;
      return {
        ...state,
        heartbeat: {
          ...heartbeat,
          ...action.heartbeat,
        },
      };
    }

    case types.PLAYER_SET_RADIO_URL: {
      return {
        ...state,
      };
    }

    case types.PLAYER_CLOSE_NOW_PLAYING: {
      return {
        ...state,
      };
    }

    case types.PLAYER_CLOSE_RADIO: {
      return {
        ...state,
        anchorPlayer: {
          ...initialState.anchorPlayer,
        },
      };
    }

    case types.PLAYER_ERROR:
      return {
        ...state,
        nowPlaying: {
          error: true,
        },
      };

    case types.PLAYER_STORE_TIMER:
      return {
        ...state,
        timer: action.data,
      };

    default:
      return state;
  }
}
