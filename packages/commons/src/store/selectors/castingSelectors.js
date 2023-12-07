import { createSelector } from 'reselect';

/**
 * Gets video reducer
 * @param {Object} state - redux store state
 * @returns {Object}
 */
export const videoSelector = state => state?.video;

/**
 * castingEnabled selector
 */
export const castingEnabledSelector = createSelector(
  videoSelector,
  video => !!video?.castingEnabled
);

/**
 * castingNodeId selector
 */
export const castingNodeIdSelector = createSelector(
  videoSelector,
  video => video?.castingNodeId
);

/**
 * castingVideoData selector
 */
export const castingVideoDataSelector = createSelector(
  videoSelector,
  video => video?.castingVideoData || {}
);

/**
 * isAdBreakEnabled selector
 */
export const castingAdBreakSelector = createSelector(
  videoSelector,
  video => !!video?.isAdBreakEnabled
);

/**
 * isAdBreakEnabled selector
 */
export const castingAdPodSelector = createSelector(
  videoSelector,
  ({ adPodcount, adSequence }) => ({ adPodcount, adSequence })

);

/**
 * casting platform selector
 */
export const castingPlatformSelector = createSelector(
  castingVideoDataSelector,
  castingVideoData => castingVideoData?.castingPlatform,
);

/**
 * casting device name selector
 */
export const castingDeviceNameSelector = createSelector(
  castingVideoDataSelector,
  castingVideoData => castingVideoData?.deviceName,
);
