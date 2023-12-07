// eslint-disable-next-line import/no-cycle
import { cloneDeep, getKey } from '../../../utils/helpers';
import {
  FETCH_PAGE_DATA_PENDING,
  FETCH_PAGE_DATA_FULFILLED,
  FETCH_PAGE_DATA_REJECTED,
  SYNC_STORE,
} from '../../actions/action-types';
import {
  SET_INITIAL_HORIZONTAL_SLIDESHOWS,
  SET_CURRENT_HORIZONTAL_SLIDESHOW_INDEX,
  SET_STICKY_SLIDESHOW,
} from '../../actions/slideshow/horizontal-slideshow-action-types';
import { SLIDESHOW } from '../../../constants/contentTypes';

const initialState = {
  currentSlideshowIndex: 0,
  errorFetchingNextSlideshow: false,
  fetchingNextSlideshow: false,
  slideshows: [],
  isStickySlideshow: false,
};

/**
 * Determine if page data is for a horizontal slideshow
 * @param {Object} action redux action
 * @returns {boolean}
 */
function isHorizontalSlideshowPage(action) {
  return getKey(action, 'meta.page') === 'horizontal slideshow';
}

/**
 * Reducers api data
 * @param {Object} state state of the horizontalSlideshowReducer
 * @param {Object} action to be trigger
 * @returns {Object}
 */
export default function horizontalSlideshowReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INITIAL_HORIZONTAL_SLIDESHOWS:
      return {
        ...state,
        slideshows: action.payload,
      };

    case SET_CURRENT_HORIZONTAL_SLIDESHOW_INDEX:
      return {
        ...state,
        wentForward: action.payload > state.currentSlideshowIndex,
        currentSlideshowIndex: action.payload,
      };

    case FETCH_PAGE_DATA_PENDING:
      if (!isHorizontalSlideshowPage(action)) return state;

      return {
        ...state,
        errorFetchingNextSlideshow: false,
        fetchingNextSlideshow: true,
      };

    case FETCH_PAGE_DATA_FULFILLED: {
      if (!isHorizontalSlideshowPage(action)) return state;

      const newSlideshows = cloneDeep(state.slideshows);
      const nextSlideshowIndex = state.currentSlideshowIndex + 1;
      newSlideshows[nextSlideshowIndex] = action.payload.data;

      return {
        ...state,
        currentSlideshowIndex: nextSlideshowIndex,
        errorFetchingNextSlideshow: false,
        fetchingNextSlideshow: false,
        slideshows: newSlideshows,
      };
    }

    case FETCH_PAGE_DATA_REJECTED:
      if (!isHorizontalSlideshowPage(action)) return state;

      return {
        ...state,
        errorFetchingNextSlideshow: true,
        fetchingNextSlideshow: false,
      };

    case SET_STICKY_SLIDESHOW:
      return {
        ...state,
        isStickySlideshow: action.payload,
        fetchingNextSlideshow: true,
      };

    case SYNC_STORE:
      // this reducer is specific for nextjs
      if (action.data?.page?.appVersion !== 2) return state;

      // if next content type is not slideshow or
      // request param auto is in url, means last sticky slideshow finished
      // clean up the slideshow state
      if (action.data?.page?.data?.type !== SLIDESHOW || action.data?.page?.requestParams?.auto) {
        return initialState;
      }

      return {
        ...state,
        fetchingNextSlideshow: false,
      };

    default:
      return state;
  }
}
