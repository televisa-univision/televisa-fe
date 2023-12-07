import {
  castingAdBreakSelector,
  castingAdPodSelector,
  castingDeviceNameSelector,
  castingEnabledSelector,
  castingNodeIdSelector,
  castingPlatformSelector,
  castingVideoDataSelector,
  videoSelector,
} from './castingSelectors';

const state = {
  video: {
    castingEnabled: true,
    castingNodeId: 'test',
    castingVideoData: {
      deviceName: 'airPlay',
      castingPlatform: 'airPlay',
      foo: 'bar',
    },
    isAdBreakEnabled: true,
    adPodcount: 2,
    adSequence: 1,
  },
};

describe('castingSelectors - videoSelector', () => {
  it('should select video from state', () => {
    expect(videoSelector(state)).toEqual(state.video);
  });
});

describe('castingSelectors - castingEnabledSelector', () => {
  it('should select casting enabled flag', () => {
    expect(castingEnabledSelector(state)).toBe(true);
  });
});

describe('castingNodeIdSelector', () => {
  it('should select casting node id', () => {
    expect(castingNodeIdSelector(state)).toBe('test');
  });
});

describe('castingVideoDataSelector', () => {
  it('should return empty object by default', () => {
    expect(castingVideoDataSelector({})).toEqual({});
  });
  it('should select casting video data', () => {
    expect(castingVideoDataSelector(state)).toEqual(state.video.castingVideoData);
  });
});

describe('castingAdBreakSelector', () => {
  it('should return ad break enabled flag', () => {
    expect(castingAdBreakSelector(state)).toBe(true);
  });
});

describe('castingAdPod', () => {
  it('should return ad info', () => {
    expect(castingAdPodSelector(state)).toEqual({
      adPodcount: 2,
      adSequence: 1,
    });
  });
});

describe('castingPlatformSelector', () => {
  it('should return casting platform', () => {
    expect(castingPlatformSelector(state)).toBe(state.video.castingVideoData.castingPlatform);
  });
});

describe('castingDeviceNameSelector', () => {
  it('should return casting platform', () => {
    expect(castingDeviceNameSelector(state)).toBe(state.video.castingVideoData.deviceName);
  });
});
