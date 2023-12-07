import storePlayingData, {
  castingAdBreakEnd,
  castingAdBreakStart,
  castingAdPod,
  castingDisabled,
  castingEnabled,
  setPlaylistClicked,
  storeSdkState,
} from './video-actions';
import * as types from './action-types';

describe('Video Actions tests', () => {
  it('storePlayingData returns expected action type', () => {
    expect(storePlayingData('id', {}))
      .toEqual({
        type: types.STORE_PLAYING_DATA,
        nodeId: 'id',
        updateAnchoredState: {},
      });
  });

  it('should return an action to update the SDK state', () => {
    expect(storeSdkState({ sdkReady: true }))
      .toEqual({
        type: types.STORE_VIDEO_SDK_STATE,
        sdkReady: true,
      });
  });

  it('should return an action to set the video anchored', () => {
    expect(setPlaylistClicked(true))
      .toEqual({
        type: types.SET_PLAYLIST_CLICKED,
        payload: true,
      });
  });

  it('should return an action to enable casting', () => {
    const options = {
      nodeId: 'test',
      payload: {},
    };

    expect(castingEnabled(options)).toEqual({
      type: types.CASTING_ENABLE,
      nodeId: options.nodeId,
      payload: options.payload,
    });
  });

  it('should return an action to disable casting', () => {
    expect(castingDisabled()).toEqual({
      type: types.CASTING_DISABLE,
    });
  });

  it('should return an action to start casting ad break', () => {
    expect(castingAdBreakStart()).toEqual({
      type: types.CASTING_AD_BREAK_START,
    });
  });

  it('should return an action to end casting ad break', () => {
    expect(castingAdBreakEnd()).toEqual({
      type: types.CASTING_AD_BREAK_END,
    });
  });

  it('should return an action to update ad pod', () => {
    expect(castingAdPod({ podcount: 2, sequence: 1 })).toEqual({
      type: types.CASTING_AD_POD,
      payload: {
        adPodcount: 2,
        adSequence: 1,
      },
    });
  });

  it('should return an action to update ad pod', () => {
    expect(castingAdPod()).toEqual({
      type: types.CASTING_AD_POD,
      payload: {
        adPodcount: undefined,
        adSequence: undefined,
      },
    });
  });
});
