import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Store from '@univision/fe-commons/dist/store/store';
import * as horizontalSlideshowActions from '@univision/fe-commons/dist/store/actions/slideshow/horizontal-slideshow-actions';
import { exists, cleanArray } from '@univision/fe-commons/dist/utils/helpers';
import dfpManager from '@univision/fe-commons/dist/utils/ads/dfpManager';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import Features from '@univision/fe-commons/dist/config/features';

import AdBelowSlideshow from '../Ads/AdBelowSlideshow';

/**
 * SlideshowProvider component
 * Manages the state of the slideshow
 * Passes down state and helpers to children
 */
class SlideshowProvider extends Component {
  /**
   * noop function
   * @returns {null}
   */
  static noopFallback() {
    return null;
  }

  /**
   * Component constructor
   * @param {Object} props the component props
   */
  constructor(props) {
    super(props);

    this.state = {
      timerRunning: props.autoplay,
      timerFrame: 0,
      activeSlideProgress: 0,
      activeSlideIndex: 0,
      isDirect: false,
    };

    this.onShareClick = this.onShareClick.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
    this.toggleAutoplay = this.toggleAutoplay.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.restartSlideshow = this.restartSlideshow.bind(this);
    this.cancelTimer = this.cancelTimer.bind(this);
    this.timerLogic = this.timerLogic.bind(this);
  }

  /**
   * Call initTimer if autoplay is true in props
   *
   * If there is a valid slide ID hash on mount set the activeSlideIndex
   * in state equal to the index of the hash slide ID, otherwise clear
   * the hash and set it to the slide ID of the first slide
   */
  componentDidMount() {
    const {
      props: {
        autoplay,
        hasOpeningCard,
        primaryTag,
        slideImageIds,
        slides,
        title,
        type,
        uid,
      },
    } = this;
    const slideImagesIdsCleaned = cleanArray(slideImageIds);
    const isInline = type === 'inline';

    // start autoplay
    if (autoplay) {
      this.initTimer();
    }

    // Add visibilitychange listener
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    const activeSlideImageId = window.location.hash.substring(1);
    let trackingEvent = null;
    let activeSlideIndex = 0;
    let slideIdx = slideImagesIdsCleaned.indexOf(activeSlideImageId);

    // check if there's a duplicate id after the cover
    const idxAfterCover = slideImagesIdsCleaned.indexOf(activeSlideImageId, 1);
    if (slideIdx === 0 && idxAfterCover > 0) {
      slideIdx = idxAfterCover;
    }

    if (
      activeSlideImageId
      && slideImagesIdsCleaned.includes(activeSlideImageId)
      && slideIdx > 0
    ) {
      // We don't wanna replace the state for the cover
      trackingEvent = SlideshowTracker.events.change;
      /* istanbul ignore next */
      activeSlideIndex = slideIdx;
      const findSlideImageId = slideImageIds.indexOf(activeSlideImageId);
      this.setState({
        // When opening card is the same as the first slide, go to the first slide
        activeSlideIndex: findSlideImageId === 0 ? 1 : findSlideImageId,
        isDirect: true,
      });
    } else if (!isInline) {
      window.history.replaceState(null, null, `#${slideImagesIdsCleaned[activeSlideIndex]}`);
    }

    // Force the change event on embedded slideshows
    if (isInline) {
      trackingEvent = SlideshowTracker.events.change;
    }

    const activeSlideNumber = !hasOpeningCard ? activeSlideIndex + 1 : activeSlideIndex;

    if (slides && !isInline) {
      this.trackHorizontalSlideshowPageView(activeSlideNumber);
    }

    if (slides && trackingEvent) {
      SlideshowTracker.track(trackingEvent, {
        activeSlide: slides[activeSlideIndex],
        activeSlideNumber,
        isInline,
        primaryTag,
        slidesLength: hasOpeningCard ? slides.length - 1 : slides.length,
        title,
        uid,
      });
    }
  }

  /**
   * Also update the window hash to the active slide ID
   * if the current slide is an image ID, and clear the
   * hash if the current slide is an ad or end card
   *
   * @param {Object} prevProps the previous props
   * @param {Object} prevState the previous state
   */
  componentDidUpdate(prevProps, prevState) {
    const { type } = this.props;

    if (type !== 'inline') {
      this.updateBrowserSlideState(prevState);
    }

    this.checkIfShouldCancelAutoplay(type, this.props);
    this.checkIfWentToPreviousSlideshow(prevProps, this.props);
    this.checkIfWentToNextSlideshow(prevProps, this.props);
  }

  /**
   * Clear the timer on unmount
   */
  componentWillUnmount() {
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.cleanUpTimer();
  }

  /**
   * Pause autoplay when share button is clicked
   */
  onShareClick() {
    this.pauseTimer();
  }

  /**
   * Pause autoplay when visibility change
   * @param {Object} event callback
   */
  onVisibilityChange() {
    if (document && document.visibilityState === 'hidden') {
      this.pauseTimer();
    }
  }

  /**
   * Set the active slide
   * @param {number} newActiveSlideIndex the index of the slide to be set as active
   */
  setActiveSlide(newActiveSlideIndex) {
    this.setState({ activeSlideIndex: newActiveSlideIndex });
  }

  /**
   * Get state and helpers for rendered child
   * @returns {Object}
   */
  getStateAndHelpers() {
    const {
      timerRunning, activeSlideProgress, activeSlideIndex, isDirect,
    } = this.state;
    const { endSlideIndex } = this.props;

    return {
      // state
      status: {
        running: timerRunning,
        progress: activeSlideProgress,
      },
      activeSlideIndex,
      isDirect,
      // helpers
      actions: {
        goToPrevSlide: this.goToPrevSlide,
        goToNextSlide: this.goToNextSlide,
        togglePlaying: this.toggleAutoplay,
        abortAutoplay: activeSlideIndex === endSlideIndex
          ? SlideshowProvider.noopFallback
          : this.cancelTimer,
        restartSlideshow: this.restartSlideshow,
        onShareClick: this.onShareClick,
      },
    };
  }

  /**
   * Handles logic that should happen after going to a new slideshow
   * @param {Object} options the params as an object
   * @param {number} options.newActiveSlideIndex the active slide index to set
   * @param {number} options.slideshowPageViewNumber the page view number to track
   */
  handleSlideshowChange({ newActiveSlideIndex, slideshowPageViewNumber }) {
    this.setActiveSlide(newActiveSlideIndex);
    this.trackHorizontalSlideshowPageView(slideshowPageViewNumber);
  }

  /**
   * Cancel autoplay on final slide of inline slideshow and on EndCard of horizontal slideshows
   * @param {string} type slideshow type
   * @param {Object} props current component props
   */
  checkIfShouldCancelAutoplay(type, props) {
    const { activeSlideIndex, timerRunning } = this.state;
    const { endSlideIndex, isFinalSlideshow } = props;

    if (timerRunning && activeSlideIndex === endSlideIndex
        && (type === 'inline' || isFinalSlideshow)) {
      this.cancelTimer();
    }
  }

  /**
   * Check if we went to a previous slideshow and execute required logic
   * @param {Object} prevProps previous component props
   * @param {Object} props current component props
   */
  checkIfWentToPreviousSlideshow(prevProps, props) {
    const { currentSlideshowIndex, endSlideIndex, endSlideNumber } = props;

    if (prevProps.currentSlideshowIndex > currentSlideshowIndex) {
      this.handleSlideshowChange({
        newActiveSlideIndex: endSlideIndex,
        slideshowPageViewNumber: endSlideNumber,
      });
    }
  }

  /**
   * Check if we went to next slideshow and execute required logic
   * @param {Object} prevProps previous component props
   * @param {Object} props current component props
   */
  checkIfWentToNextSlideshow(prevProps, props) {
    const { currentSlideshowIndex } = props;

    if (prevProps.currentSlideshowIndex < currentSlideshowIndex) {
      this.handleSlideshowChange({
        newActiveSlideIndex: 0,
        slideshowPageViewNumber: 1,
      });
    }
  }

  /**
   * Tracks virtual page view for horizontal slideshow.
   * @param {number} activeSlideNumber the number for the currently displayed slide
   */
  trackHorizontalSlideshowPageView (activeSlideNumber) {
    const { hasOpeningCard, title, uid } = this.props;

    SlideshowTracker.track(SlideshowTracker.events.slideshowPageView, {
      activeSlideNumber,
      shouldTrackImagePosition: !(hasOpeningCard && activeSlideNumber === 0),
      title,
      uid,
    });
  }

  /**
   * Determine if the current slide is the final one of the slideshow
   * @returns {boolean}
   */
  isFinalSlide() {
    const { activeSlideIndex } = this.state;
    const { endSlideIndex } = this.props;

    return activeSlideIndex === endSlideIndex;
  }

  /**
   * Update browser URL to match new slide
   * @param {Object} prevState previous component state
   */
  updateBrowserSlideState(prevState) {
    const { activeSlideIndex } = this.state;
    const { slideImageIds } = this.props;

    if (prevState.activeSlideIndex !== activeSlideIndex) {
      if (exists(slideImageIds[activeSlideIndex])) {
        window.history.replaceState(null, null, `#${slideImageIds[activeSlideIndex]}`);
      } else if (window.location.hash) {
        window.history.replaceState(
          '',
          document.title,
          `${window.location.pathname}${window.location.search}`
        );
      }
    }
  }

  /**
   * Toggle autoplay
   */
  toggleAutoplay() {
    const { timerRunning } = this.state;

    if (this.timer && timerRunning) {
      this.pauseTimer();
    } else {
      this.setState({ timerRunning: true }, () => {
        this.initTimer();
      });
    }
  }

  /**
   * Setup a timer
   */
  initTimer() {
    this.cleanUpTimer();

    this.timer = setInterval(this.timerLogic, 1000);
  }

  /**
   * Executes logic that happens when timer is active
   */
  timerLogic() {
    const { autoplayDuration, onAutoplay } = this.props;
    const {
      activeSlideIndex,
      timerFrame,
      timerRunning,
    } = this.state;
    const { isFinalSlideshow, type } = this.props;

    if (timerRunning) {
      const timerHasNotEnded = timerFrame < autoplayDuration;

      if (timerHasNotEnded) {
        this.updateTimer();
      } else {
        if (type !== 'inline' && this.isFinalSlide() && !isFinalSlideshow) {
          this.triggerNextSlideshow();
        } else {
          // Go to next slide
          this.setState(state => ({
            timerFrame: 0,
            activeSlideIndex: state.activeSlideIndex + 1,
            activeSlideProgress: 0,
          }));
        }

        if (exists(onAutoplay)) {
          onAutoplay(activeSlideIndex + 1);
        }
      }
    }
  }

  /**
   * Go to the next slideshow if HSS is enabled
   * @returns {void | null}
   */
  triggerNextSlideshow() {
    if (!Features.slideshows.horizontal.stitchingEnabled()) return null;

    Store.dispatch(horizontalSlideshowActions.goToNextSlideshow());

    return this.restartTimer();
  }

  /**
   * Pause the timer
   */
  pauseTimer() {
    this.setState({ timerRunning: false });
  }

  /**
   * Update the timer
   */
  updateTimer() {
    const { autoplayDuration } = this.props;

    this.setState(state => ({
      timerFrame: state.timerFrame + 1,
      activeSlideProgress: (state.timerFrame + 1) / autoplayDuration,
    }));
  }

  /**
   * Reset the timer
   */
  restartTimer() {
    this.setState({
      timerFrame: 0,
      activeSlideProgress: 0,
    });
  }

  /* eslint-disable react/destructuring-assignment */
  /**
   * Reset the autoplay timer
   */
  cancelTimer() {
    this.cleanUpTimer();
    this.setState({
      timerRunning: false,
      timerFrame: 0,
      activeSlideProgress: 0,
    });
  }

  /**
   * Clean up autoplay timer
   */
  cleanUpTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /**
   * Go to the previous slide
   */
  goToPrevSlide() {
    const { activeSlideIndex } = this.state;
    const { isFirstSlideshow, type } = this.props;
    const prevSlideIndex = Math.max(0, activeSlideIndex - 1);
    const isFirstSlide = activeSlideIndex === 0;

    if (
      type !== 'inline'
      && isFirstSlide
      && !isFirstSlideshow
      && Features.slideshows.horizontal.stitchingEnabled()
    ) {
      Store.dispatch(horizontalSlideshowActions.goToPreviousSlideshow());
    } else if (prevSlideIndex !== activeSlideIndex) {
      this.setActiveSlide(prevSlideIndex);
    }

    this.cancelTimer();
  }

  /**
   * Go to the next slide
   */
  goToNextSlide() {
    const { activeSlideIndex } = this.state;
    const { endSlideIndex, isFinalSlideshow, type } = this.props;
    const nextSlideIndex = Math.min(endSlideIndex, activeSlideIndex + 1);

    if (
      type !== 'inline'
      && this.isFinalSlide()
      && !isFinalSlideshow
      && Features.slideshows.horizontal.stitchingEnabled()
    ) {
      Store.dispatch(horizontalSlideshowActions.goToNextSlideshow());
    } else if (nextSlideIndex !== activeSlideIndex) {
      this.setActiveSlide(nextSlideIndex);
    }

    this.cancelTimer();
  }

  /**
   * Restart the slideshow
   */
  restartSlideshow() {
    this.setState(
      {
        timerRunning: this.props.autoplay,
        timerFrame: 0,
        activeSlideProgress: 0,
        activeSlideIndex: 0,
      },
      () => {
        dfpManager.refreshAds();

        if (this.props.autoplay) {
          this.initTimer();
        }
      }
    );
  }

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    const { currentSlideshowIndex } = this.props;

    return (
      <div key={currentSlideshowIndex}>
        {this.props.children(this.getStateAndHelpers())}
        <AdBelowSlideshow />
      </div>
    );
  }
}

SlideshowProvider.propTypes = {
  autoplay: PropTypes.bool,
  autoplayDuration: PropTypes.number,
  children: PropTypes.func.isRequired,
  currentSlideshowIndex: PropTypes.number, // eslint-disable-line
  endSlideIndex: PropTypes.number.isRequired,
  hasOpeningCard: PropTypes.bool,
  isFinalSlideshow: PropTypes.bool.isRequired,
  isFirstSlideshow: PropTypes.bool.isRequired,
  onAutoplay: PropTypes.func,
  primaryTag: PropTypes.object,
  slides: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.shape({
      href: PropTypes.string,
    }),
  })).isRequired,
  slideImageIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string,
  type: PropTypes.oneOf(['default', 'inline', 'reaction']),
  uid: PropTypes.string,
};

SlideshowProvider.defaultProps = {
  autoplay: false,
  autoplayDuration: 7,
};

export default SlideshowProvider;
