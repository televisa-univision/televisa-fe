import { createSelector } from 'reselect';
import { getKey } from '../../utils/helpers';

/**
 * Gets the current Video PiP from the store
 * @param {Object} state redux state
 * @returns {Object} current video pip
 */
export const videoPiPSelector = state => getKey(state, 'videoPip', {});

/**
 * Get Video PiP anchored from Store
 * @returns {Function} the selector function that takes the redux state as an argument
 */
export const videoPiPAnchored = createSelector(
  videoPiPSelector,
  videoPip => getKey(videoPip, 'anchored', null)
);

/**
 * Get Video PiP placeholderId from Store
 * @returns {Function} the selector function that takes the redux state as an argument
 */
export const videoPiPPlaceholderId = createSelector(
  videoPiPSelector,
  videoPip => getKey(videoPip, 'placeholderId', null)
);

export const videoPiPStatus = createSelector(
  videoPiPSelector,
  videoPip => getKey(videoPip, 'status', null)
);
