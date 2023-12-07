import * as types from '../actions/action-types';

const initialState = {
  nodeId: null,
  updateState: {},
  fmgReady: false,
  firstVideoReady: false,
  playlistClicked: false,
  placeholderId: null,
  castingEnabled: false,
  castingNodeId: null,
  castingVideoData: null,
  isAdBreakEnabled: false,
  adPodcount: 1,
  adSequence: 1,
};

/**
 * Reducers api data
 * @param {Object} state of the application
 * @param {Object} action to be trigger
 * @returns {Object}
 */
export default function videoReducer(state = initialState, action) {
  switch (action.type) {
    case types.STORE_PLAYING_DATA:
      return Object.assign({}, state, {
        nodeId: action.nodeId,
        updateAnchoredState: action.updateAnchoredState,
      });
    case types.STORE_VIDEO_SDK_STATE:
      return Object.assign({}, state, {
        fmgReady: action.sdkReady,
      });
    case types.STORE_FIRST_VIDEO_READY:
      return Object.assign({}, state, {
        firstVideoReady: action.firstVideoReady,
        placeholderId: action.placeholderId,
      });
    case types.SET_PLAYLIST_CLICKED:
      return Object.assign({}, state, {
        playlistClicked: action.payload,
      });
    case types.CASTING_ENABLE:
      return {
        ...state,
        castingEnabled: true,
        castingNodeId: action.nodeId,
        castingVideoData: action.payload,
      };
    case types.CASTING_DISABLE:
      return {
        ...state,
        castingEnabled: false,
        castingNodeId: null,
        castingVideoData: null,
        isAdBreakEnabled: false,
      };
    case types.CASTING_AD_BREAK_END:
      return {
        ...state,
        isAdBreakEnabled: false,
      };
    case types.CASTING_AD_BREAK_START:
      return {
        ...state,
        isAdBreakEnabled: true,
      };
    case types.CASTING_AD_POD: {
      const {
        payload: {
          adPodcount = 1,
          adSequence = 1,
        },
      } = action;

      return {
        ...state,
        adPodcount,
        adSequence,
      };
    }

    default:
      return state;
  }
}
