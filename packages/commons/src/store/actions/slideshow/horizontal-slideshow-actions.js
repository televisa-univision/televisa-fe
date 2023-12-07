import { batch } from 'react-redux';

import {
  SET_INITIAL_HORIZONTAL_SLIDESHOWS,
  SET_CURRENT_HORIZONTAL_SLIDESHOW_INDEX,
  SET_STICKY_SLIDESHOW,
} from './horizontal-slideshow-action-types';
import {
  isValidArray,
  isValidObject,
  getKey,
  hasKey,
} from '../../../utils/helpers';
import { replaceState } from '../../../utils/helpers/history';
import Features from '../../../config/features';
import dfpManager from '../../../utils/ads/dfpManager';
import Store from '../../store';
import { getDomain } from '../../storeHelpers';
import setPageData, * as pageActions from '../page-actions';
import getStyledTheme from '../../../components/ThemeProvider/helpers';

const INITIAL_SLIDESHOW_KEYS_LENGTH = 3;

/**
 * Action to update the current slideshow index
 * @param {integer} index slideshow index to set
 * @returns {Object}
 */
export function setCurrentSlideshow(index) {
  return {
    type: SET_CURRENT_HORIZONTAL_SLIDESHOW_INDEX,
    payload: index,
  };
}

/**
 * Action to set isStickySlideshow
 * @param {boolean} isStickySlideshow to show a horizontal slideshow regardless content type
 * @returns {Object}
 */
export function setStickySlideshowFlag(isStickySlideshow) {
  return {
    type: SET_STICKY_SLIDESHOW,
    payload: isStickySlideshow,
  };
}

/**
 * Register popups action
 * @returns {Object}
 */
export function setInitialSlideshows() {
  return (dispatch, getState) => {
    const slideshowPageData = getKey(getState(), 'page.data', {});
    const { nextSlideshows } = slideshowPageData;
    const finalSlideshowIndex = Features.slideshows.horizontal.limit - 1;
    const nextFourSlideshows = (isValidArray(nextSlideshows)
      && nextSlideshows.slice(0, finalSlideshowIndex)) /* istanbul ignore next */ || [];
    const relatedSlideshows = nextFourSlideshows.reduce((acc, slideshow) => {
      return [
        ...acc,
        {
          mainImage: slideshow.mainImage,
          title: slideshow.title,
          uri: slideshow.url,
        },
      ];
    }, []);
    // First horizontal slideshow is the same as the initial page data
    const initialSlideshows = [slideshowPageData, ...relatedSlideshows];

    return dispatch({
      type: SET_INITIAL_HORIZONTAL_SLIDESHOWS,
      payload: initialSlideshows,
    });
  };
}

/**
 * Executes logic for going to previous slideshow on horizontal slideshow page
 * @returns {void}
 */
export function goToPreviousSlideshow() {
  return (dispatch, getState) => {
    const state = getState();
    const { horizontalSlideshow: { currentSlideshowIndex, slideshows } } = state;
    const domain = getDomain(Store, state);

    if (currentSlideshowIndex === 0) {
      throw new Error('Failed to go to previous slideshow: no more slideshows available');
    }

    dfpManager.destroyAds();

    const prevSlideshowIndex = currentSlideshowIndex - 1;
    const previousSlideshow = slideshows[prevSlideshowIndex];

    dispatch(setCurrentSlideshow(prevSlideshowIndex));
    dispatch(setPageData({ data: previousSlideshow }));
    replaceState(null, previousSlideshow.uri, domain);
  };
}

/**
 * Executes logic for going to next slideshow on horizontal slideshow page
 * @returns {void}
 */
export function goToNextSlideshow() {
  return async (dispatch, getState) => {
    const state = getState();
    const { horizontalSlideshow: { currentSlideshowIndex, slideshows } } = state;
    const finalSlideshowIndex = Features.slideshows.horizontal.limit - 1;
    const domain = getDomain(Store, state);

    if (currentSlideshowIndex === finalSlideshowIndex) {
      // There are no more slideshows, throw error (rejects promise)
      throw new Error('Failed to go to next slideshow: no more slideshows available');
    }

    dfpManager.destroyAds();

    // Check if we already have the next slideshow
    const nextSlideshowIndex = currentSlideshowIndex + 1;
    const nextSlideshow = slideshows[nextSlideshowIndex] || {};
    // Every slideshow starts with only the `uri` property. If we have more properties, then we
    // know we already fetched that slideshow.
    const nextSlideshowAlreadyFetched = Object
      .keys(nextSlideshow).length > INITIAL_SLIDESHOW_KEYS_LENGTH;

    if (nextSlideshowAlreadyFetched) {
      dispatch(setCurrentSlideshow(nextSlideshowIndex));
      dispatch(setPageData({ data: nextSlideshow }));
      replaceState(null, nextSlideshow.uri, domain);
      return;
    }

    const {
      value: nextPageData,
    } = await dispatch(pageActions.fetchPageData(nextSlideshow.uri, {
      themeFn: getStyledTheme,
      meta: {
        page: 'horizontal slideshow',
        initiator: 'slideshow-stitching',
      },
    }));
    const data = (
      hasKey(nextPageData, 'data') && isValidObject(nextPageData.data) && nextPageData.data
    ) || {};

    dispatch(setPageData({ data }));
    replaceState(null, data.uri, domain);
  };
}

/**
 * Makes navigation to next or previous slideshow for nextjs
 * these next action was added for nextjs purpose since the existing one
 * has not longer required logic
 * @param {Object} options.isGoingForward is going to the next slideshow
 * @returns {void}
 */
export function goToNextorPreviousSlideshow({ isGoingForward = true } = {}) {
  return async (dispatch, getState) => {
    const state = getState();
    const { horizontalSlideshow: { currentSlideshowIndex } } = state;

    const newSlideshowIndex = isGoingForward
      ? currentSlideshowIndex + 1 : currentSlideshowIndex - 1;

    batch(() => {
      dispatch(setCurrentSlideshow(newSlideshowIndex));
      dispatch(setStickySlideshowFlag(true));
    });
  };
}
