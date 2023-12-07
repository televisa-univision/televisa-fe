import * as types from '../actions/action-types';
import videoReducer from './video-reducer';

const initialState = {
  nodeId: null,
  updateAnchoredState: {},
};

describe('STORE_PLAYING_DATA action', () => {
  it('should set correct values', () => {
    expect(videoReducer(initialState, {
      type: types.STORE_PLAYING_DATA,
      nodeId: null,
      updateAnchoredState: {},
    })).toEqual(initialState);
  });
});

describe('STORE_VIDEO_SDK_STATE action', () => {
  it('should set correct values', () => {
    expect(videoReducer(initialState, {
      type: types.STORE_VIDEO_SDK_STATE,
      sdkReady: true,
    })).toEqual({
      ...initialState,
      fmgReady: true,
    });
  });
});

describe('STORE_FIRST_VIDEO_READY action', () => {
  it('should set correct values', () => {
    expect(videoReducer(initialState, {
      type: types.STORE_FIRST_VIDEO_READY,
      firstVideoReady: true,
    })).toEqual({
      ...initialState,
      firstVideoReady: true,
    });
  });
});

describe('SET_PLAYLIST_CLICKED action', () => {
  it('should set correct values', () => {
    expect(videoReducer(initialState, {
      type: types.SET_PLAYLIST_CLICKED,
      payload: true,
    })).toEqual({
      ...initialState,
      playlistClicked: true,
    });
  });
});

describe('CASTING_ENABLE action', () => {
  it('should set castingEnabled to true', () => {
    const action = {
      type: types.CASTING_ENABLE,
      nodeId: 'test',
      payload: {},
    };
    expect(videoReducer(initialState, action)).toEqual(
      expect.objectContaining({
        castingEnabled: true,
        castingNodeId: 'test',
        castingVideoData: {},
      })
    );
  });
});

describe('CASTING_DISABLE action', () => {
  it('should set castingEnabled to false', () => {
    const action = {
      type: types.CASTING_DISABLE,
    };
    expect(videoReducer(initialState, action)).toEqual(
      expect.objectContaining({
        castingEnabled: false,
        castingNodeId: null,
        castingVideoData: null,
      })
    );
  });
});

describe('CASTING_AD_BREAK_END action', () => {
  it('should set isAdBreakEnabled to false', () => {
    const action = {
      type: types.CASTING_AD_BREAK_END,
    };
    expect(videoReducer(initialState, action)).toEqual(
      expect.objectContaining({
        isAdBreakEnabled: false,
      })
    );
  });
});

describe('CASTING_AD_BREAK_START action', () => {
  it('should set isAdBreakEnabled to true', () => {
    const action = {
      type: types.CASTING_AD_BREAK_START,
    };
    expect(videoReducer(initialState, action)).toEqual(
      expect.objectContaining({
        isAdBreakEnabled: true,
      })
    );
  });
});

describe('CASTING_AD_POD action', () => {
  it('should set ad count and sequence', () => {
    const action = {
      type: types.CASTING_AD_POD,
      payload: {},
    };
    expect(videoReducer(initialState, action)).toEqual(
      expect.objectContaining({
        adPodcount: 1,
        adSequence: 1,
      })
    );
  });

  it('should set ad count and sequence', () => {
    const action = {
      type: types.CASTING_AD_POD,
      payload: {
        adPodcount: 2,
        adSequence: 1,
      },
    };
    expect(videoReducer(initialState, action)).toEqual(
      expect.objectContaining({
        adPodcount: 2,
        adSequence: 1,
      })
    );
  });
});
