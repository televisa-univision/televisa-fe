import { createSelector } from 'reselect';
import { getKey } from '../../utils/helpers';
import Features from '../../config/features';

/**
 * Gets currentSlideshowIndex from redux state
 * @param {Object} state redux state
 * @returns {number} current slideshow index
 */
export const currentSlideshowIndexSelector = state => getKey(
  state,
  'horizontalSlideshow.currentSlideshowIndex',
  0
);

/**
 * Gets isStickySlideshow from redux state
 * @param {Object} state redux state
 * @returns {bool} isStickySlideshow
 */
export const isStickySlideshowSelector = state => getKey(
  state,
  'horizontalSlideshow.isStickySlideshow',
  false,
);

/**
 * Gets current slideshows from redux state
 * @param {Object} state redux state
 * @returns {Array} an array of the current slideshows
 */
export const slideshowsSelector = state => getKey(
  state,
  'horizontalSlideshow.slideshows',
);

/**
 * Gets went forward from redux state
 * @param {Object} state redux state
 * @returns {bool} the current flag
 */
export const wentForwardSelector = state => getKey(
  state,
  'horizontalSlideshow.wentForward',
);

/**
 * Gets fetchingNextSlideshow from redux state
 * @param {Object} state redux state
 * @returns {bool} the current flag
 */
export const fetchingNextSlideshowSelector = state => getKey(
  state,
  'horizontalSlideshow.fetchingNextSlideshow',
);

/**
 * Determines if current slideshow is the first one
 * @returns {Function} the selector function that takes the redux state as an argument
 */
export const isFirstSlideshowSelector = createSelector(
  currentSlideshowIndexSelector,
  currentSlideshowIndex => currentSlideshowIndex === 0,
);

/**
 * Determines if current slideshow is the final one
 * @returns {Function} the selector function that takes the redux state as an argument
 */
export const isFinalSlideshowSelector = createSelector(
  currentSlideshowIndexSelector,
  (currentSlideshowIndex) => {
    return currentSlideshowIndex === Features.slideshows.horizontal.limit - 1;
  },
);

/**
 * Gets the slideshow that is up next
 * @returns {Function} the selector function that takes the redux state as an argument
 */
export const nextSlideshowSelector = createSelector(
  currentSlideshowIndexSelector,
  slideshowsSelector,
  (currentSlideshowIndex, slideshows) => slideshows[currentSlideshowIndex + 1],
);
