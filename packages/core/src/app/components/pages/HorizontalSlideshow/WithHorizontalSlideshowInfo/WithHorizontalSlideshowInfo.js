import { connect } from 'react-redux';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import {
  currentSlideshowIndexSelector,
  isFinalSlideshowSelector,
  isFirstSlideshowSelector,
  nextSlideshowSelector,
  slideshowsSelector,
} from '@univision/fe-commons/dist/store/selectors/horizontal-slideshow-selectors';

/**
 * HOC to subscribe a component that needs to know about the horizontal slideshow page
 * @param {Object} WrappedComponent component to be connected to horizontal slideshow store info
 * @returns {React.Component}
 */
export default function (WrappedComponent) {
  /**
   * Connect to the horizontal slideshow store properties
   * @param {Object} state of the page
   * @returns {Object}
   */
  const mapStateToProps = state => ({
    currentSlideshowIndex: currentSlideshowIndexSelector(state),
    errorFetchingNextSlideshow: state.horizontalSlideshow.errorFetchingNextSlideshow,
    fetchingNextSlideshow: state.horizontalSlideshow.fetchingNextSlideshow,
    isFinalSlideshow: isFinalSlideshowSelector(state),
    isFirstSlideshow: isFirstSlideshowSelector(state),
    nextSlideshow: nextSlideshowSelector(state),
    page: getKey(state, 'page.data', {}),
    slideshows: slideshowsSelector(state),
  });

  return connect(mapStateToProps)(WrappedComponent);
}
