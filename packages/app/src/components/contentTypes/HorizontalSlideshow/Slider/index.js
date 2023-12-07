import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import Swipeable from 'react-swipeable';
import classnames from 'classnames';

import Loading from '@univision/fe-components-base/dist/components/Loading';

import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { hideAdsSelector } from '@univision/fe-commons/dist/store/selectors/ads-selectors';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Features from '@univision/fe-commons/dist/config/features';
import { shouldRefresh, hideAdByIds } from '@univision/fe-commons/dist/store/actions/ads-actions';

import Icon from '@univision/fe-icons/dist/components/Icon';

import AdSlide from '../Slide/AdSlide';
import ConnectedEndCard from '../EndCard';
import ImageSlide from '../Slide/ImageSlide';
import LeadSlide from '../Slide/LeadSlide';
import NextSlideshowClue from '../NextSlideshowClue';
import Styles from './Slider.scss';
import { getFadeAnimationClassName } from '../helpers';

/**
 * Slider component
 */
export class Slider extends PureComponent {
  /**
   * Setup component state
   * @param {Object} props the component props
   */
  constructor(props) {
    super(props);

    this.state = {
      containerWidth: null,
      containerHeight: null,
      swipeOffset: 0,
      showContent: true,
    };

    this.device = props.device;
    this.renderedSlides = [];
    this.lastSlideIndex = 0;
    this.keyDown = false;
    this.initialContainerHeight = null;
    this.fromLandscape = false;
    this.handlePrevSlideClick = this.handlePrevSlideClick.bind(this);
    this.handleNextSlideClick = this.handleNextSlideClick.bind(this);
    this.debounceSetContainerSize = debounce(this.setContainerWidthAndHeight, 100).bind(this);
    this.container = React.createRef();
  }

  /**
   * Get the measurement for the container
   */
  componentDidMount() {
    this.setContainerWidthAndHeight();
    const { inline } = this.props;

    if (!inline && this.container.current) {
      this.container.current.focus();
    }

    window.addEventListener('resize', this.debounceSetContainerSize);
  }

  /* eslint camelcase: "off" */
  /* eslint-disable react/sort-comp */
  /**
   * Deactive transition for replay
   * @param {Object} nextProps the next props
   */
  UNSAFE_componentWillUpdate(nextProps) {
    const { containerHeight } = this.state;
    const { activeSlideIndex } = this.props;

    this.setContainerWidthAndHeight(nextProps);

    if (nextProps.activeSlideIndex !== activeSlideIndex) {
      this.lastSlideIndex = activeSlideIndex;
    }
    // Save the initial container height
    if (!nextProps.activeSlideIndex && containerHeight !== '100%') {
      this.initialContainerHeight = containerHeight;
    }
  }

  /**
   * Cleanup event listeners
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceSetContainerSize);
  }

  /**
   * Toggle the image description for mobile
   * @param {Object} e event
   */
  onImageClick = (e) => {
    if (e.target.tagName !== 'BUTTON' && this.device !== 'desktop') {
      this.setState(prevState => ({ showContent: !prevState.showContent }));
    }
  };

  /**
   * Callback added to avoid issue with the animation
   */
  onRestartClick = () => {
    const { actions } = this.props;
    if (this.device !== 'desktop') {
      this.setState({ containerHeight: this.initialContainerHeight });
    }
    actions.restartSlideshow();
  };

  /**
   * Set the width & height of the container and store it in state
   * @param {Object} nextProps nextProps
   */
  setContainerWidthAndHeight = (nextProps) => {
    /* eslint-disable react/destructuring-assignment */
    const { activeSlideIndex, endSlideIndex } = nextProps || this.props;
    if (this.container.current) {
      if (
        this.state.containerWidth !== this.container.current.offsetWidth
        && this.props.activeSlideIndex !== this.props.endSlideIndex
      ) {
        this.setState({
          containerWidth: this.container.current.offsetWidth,
        });
      }
      if (this.device !== 'desktop') {
        const height = window.innerHeight;
        const navHeight = 50;
        const globalNavHeight = 40;
        const adHeight = 135;
        const offset = 25;
        const clampHeight = navHeight + globalNavHeight + adHeight + offset;

        let canvasHeight;

        if (
          typeof activeSlideIndex !== 'undefined'
          && typeof endSlideIndex !== 'undefined'
          && activeSlideIndex === endSlideIndex
          && this.props.isThereEndcard
        ) {
          canvasHeight = '100%';
        } else if (this.isLandscape()) {
          canvasHeight = height - clampHeight;
          this.fromLandscape = true;
        } else if (
          !this.isLandscape()
          && !this.fromLandscape
          && this.state.containerHeight !== null
        ) {
          canvasHeight = this.state.containerHeight;
        } else {
          canvasHeight = height - clampHeight;
          this.fromLandscape = false;
        }
        if (this.state.containerHeight !== canvasHeight) {
          this.setState({
            containerHeight: canvasHeight,
          });
        }
      }
    }
  };

  /**
   * Get the track styles
   * @returns {Object}
   */
  getTrackStyles = () => {
    const { containerWidth, swipeOffset } = this.state;
    const { activeSlideIndex, transitionDuration, transitionEffect } = this.props;
    const offset = -(containerWidth * activeSlideIndex) + swipeOffset;

    let transition;
    if (Math.abs(this.lastSlideIndex - activeSlideIndex) === 1 || this.lastSlideIndex === 0) {
      transition = `transform ${transitionDuration} ${transitionEffect}`;
    }

    return {
      transition: Math.abs(swipeOffset) > 0 ? 'none' : transition,
      transform: `translate3d(${offset}px, 0, 0)`,
    };
  };

  /**
   * Get the container min width
   * @param {string} type slide type
   * @returns {string} min width value
   */
  getMinWidth = (type) => {
    const { containerWidth } = this.state;
    return type !== 'end' ? `${containerWidth}px` : '100%';
  };

  /**
   * Return true if viewport is landscape
   * @returns {boolean}
   */
  isLandscape = () => {
    return window.innerHeight < window.innerWidth;
  };

  /**
   * Logic that happens on prev slide arrow click
   */
  handlePrevSlideClick() {
    this.handlePrevSlide('arrow');
  }

  /**
   * Logic for going to the next slide/slideshow
   * @param {string} actionType either 'arrow' or 'swipe'
   */
  handleNextSlide(actionType) {
    const {
      goToNextSlide,
    } = this.props;

    goToNextSlide(actionType);
  }

  /**
   * Logic for going to the previous slide/slideshow
   * @param {string} actionType either 'arrow' or 'swipe'
   */
  handlePrevSlide(actionType) {
    const {
      goToPrevSlide,
    } = this.props;

    goToPrevSlide(actionType);
  }

  /**
   * Logic that happens on next slide arrow click
   */
  handleNextSlideClick() {
    this.handleNextSlide('arrow');
  }

  /**
   * Swiping left event
   * @param {Object} evt the event object
   * @param {number} distance the distance swiping
   */
  handleSwipingLeft = (evt, distance) => {
    const {
      activeSlideIndex,
      isFinalSlideshow,
      endSlideIndex,
      inline,
    } = this.props;
    const isMouseEvent = /mouse/.test(evt.type);
    const isFinalSlide = activeSlideIndex === endSlideIndex;
    const shouldAnimate = !(inline && isFinalSlide)
      && !(isFinalSlideshow && isFinalSlide)
      && !isMouseEvent;

    if (shouldAnimate) {
      this.setState(() => ({ swipeOffset: -distance }));
    }
  };

  /**
   * Swiping right event
   * @param {Object} evt the event object
   * @param {number} distance the distance swiping
   */
  handleSwipingRight = (evt, distance) => {
    const {
      activeSlideIndex,
      endSlideIndex,
      inline,
      isFirstSlideshow,
      isFinalSlideshow,
    } = this.props;
    const isMouseEvent = /mouse/.test(evt.type);
    const isFirstSlide = activeSlideIndex === 0;
    const isLastSlide = activeSlideIndex === endSlideIndex;
    const isEndCard = !inline && isFinalSlideshow && isLastSlide;
    const isFirstSlideOfFirstSlideshow = isFirstSlideshow && isFirstSlide;
    const shouldAnimate = !(isFirstSlideOfFirstSlideshow || isEndCard) && !isMouseEvent;

    if (shouldAnimate) {
      this.setState(() => ({ swipeOffset: distance }));
    }
  };

  /**
   * Swiped left event
   * @param {Object} evt the event object
   * @param {number} distance the distance swiping
   * @param {boolean} isFlick whether the swipe was a flick or not
   */
  handleSwipedLeft = (evt, distance, isFlick) => {
    const { containerWidth } = this.state;
    const { activeSlideIndex, isFinalSlideshow, endSlideIndex } = this.props;
    const isIntentional = Math.abs(distance) > containerWidth / 2;
    const nextIndexExists = activeSlideIndex !== endSlideIndex;
    const canAdvance = nextIndexExists || !isFinalSlideshow;

    if ((isFlick || isIntentional) && canAdvance) {
      this.handleNextSlide('swipe');
    }

    this.setState({ swipeOffset: 0 });
  };

  /**
   * Swiped right event
   * @param {Object} evt the event object
   * @param {number} distance the distance swiping
   * @param {boolean} isFlick whether the swipe was a flick or not
   */
  handleSwipedRight = (evt, distance, isFlick) => {
    const { containerWidth } = this.state;
    const {
      activeSlideIndex,
      endSlideIndex,
      inline,
      isFirstSlideshow,
      isFinalSlideshow,
    } = this.props;
    const isIntentional = Math.abs(distance) > containerWidth / 2;
    const prevIndexExists = activeSlideIndex !== 0;
    const isLastSlide = activeSlideIndex === endSlideIndex;
    const isEndCard = !inline && isFinalSlideshow && isLastSlide;
    const canGoBack = !isEndCard && (prevIndexExists || !isFirstSlideshow);

    if ((isFlick || isIntentional) && canGoBack) {
      this.handlePrevSlide('swipe');
    }

    this.setState({ swipeOffset: 0 });
  };

  /**
   * Render a slide by type
   * @param {Object} slideProps the props for the slide
   * @param {number} slideIndex the index of the slide in the slides array
   * @param {number} lazyLoadOffset the number of slides in advance to load
   * @returns {JSX}
   */
  renderSlide = (slideProps, slideIndex, lazyLoadOffset = 1) => {
    const {
      actions,
      activeSlideIndex,
      hideAds,
      endSlideIndex,
      endSlideNumber,
      inline,
      meta,
      onHideAdByIds,
      onShouldRefresh,
      primaryTag,
      reaction,
      renderSimpleStatus,
      slides,
      title,
      uid,
      fetchingNextSlideshow,
    } = this.props;

    const { showContent } = this.state;
    const shouldRender = slideIndex <= activeSlideIndex + lazyLoadOffset;
    const hasRendered = this.renderedSlides.indexOf(slideIndex) !== -1;
    const shareData = {
      title,
      uid,
      primaryTag,
      type: 'slideshow',
    };

    // if the current slide index is lower than the active slide + offset,
    // this should be rendered, or this already has been rendered
    // as long as the page is not currently fetching a new slideshow
    // cause we don't want to show previous slideshow while loading next
    if ((shouldRender || hasRendered) && !fetchingNextSlideshow) {
      if (this.renderedSlides.indexOf(slideIndex) === -1) {
        this.renderedSlides.push(slideIndex);
      }

      switch (slideProps.type) {
        case 'leadImage':
          return (
            <LeadSlide
              {...slideProps}
              endSlideNumber={endSlideNumber}
              meta={meta}
              reaction={reaction}
              renderSimpleStatus={renderSimpleStatus}
              showContent={showContent}
            />
          );
        case 'ad': {
          return (
            <AdSlide
              active={slideIndex === activeSlideIndex}
              inline={inline}
              renderSimpleStatus={renderSimpleStatus}
              shouldRefresh={onShouldRefresh}
              hideAdByIds={onHideAdByIds}
            />
          );
        }
        case 'end': {
          if (activeSlideIndex === endSlideIndex) {
            return (
              <ConnectedEndCard
                mainSlide={slides[0]}
                data={slideProps.slides}
                onRestartClick={this.onRestartClick}
                onPlayClick={actions.togglePlaying}
                shareData={shareData}
              />
            );
          }
          return null;
        }
        default:
          return (
            <ImageSlide
              active={slideIndex === activeSlideIndex}
              activeSlideNumber={slideProps.id}
              content={slideProps.caption}
              device={this.device}
              hideAds={hideAds}
              endSlideNumber={endSlideNumber}
              hideAdByIds={onHideAdByIds}
              hideCaption={slideProps.hideCaption}
              image={slideProps.image}
              inline={inline}
              meta={meta}
              onImageFocus={this.onImageFocus}
              pollQuestionOverride={slideProps.pollQuestionOverride}
              reaction={reaction}
              renderSimpleStatus={renderSimpleStatus}
              shouldRefresh={onShouldRefresh}
              showContent={showContent}
              title={title}
            />
          );
      }
    }

    return null;
  };

  /**
   * Render previous slide arrow button
   * @returns {JSX}
   */
  renderPrevSlideButton() {
    const {
      activeSlideIndex,
      isFirstSlideshow,
      inline,
    } = this.props;
    const { showContent } = this.state;
    const isFirstSlide = activeSlideIndex === 0;

    if ((isFirstSlideshow || inline) && isFirstSlide) {
      return null;
    }

    return (
      <button
        className={classnames(
          Styles.arrow,
          Styles.prev,
          {
            [`${getFadeAnimationClassName({ showContent })}`]: !inline,
            [Styles.arrowCentered]: inline,
          },
        )}
        onClick={this.handlePrevSlideClick}
        key="prev"
      >
        <div className={Styles.arrowContent}>
          <Icon name="arrowLeft" fill="#FFFFFF" size="large" />
        </div>
      </button>
    );
  }

  /**
   * Render next slide arrow button
   * @returns {JSX}
   */
  renderNextSlideButton() {
    const {
      activeSlideIndex,
      endSlideIndex,
      inline,
      isFinalSlideshow,
      nextSlideshow,
      gotToNextSlideshow,
    } = this.props;
    const {
      showContent,
    } = this.state;

    if ((isFinalSlideshow || inline) && activeSlideIndex === endSlideIndex) {
      return null;
    }

    const showClue = activeSlideIndex === endSlideIndex && !isFinalSlideshow;
    const clueClassNames = classnames(Styles.nextSlideshowClue, {
      [Styles.showNextSlideshowClue]: showClue && showContent,
    });
    const {
      image,
      title: nextSlideshowTitle,
      mainImage: nextSlideshowImage,
    } = nextSlideshow;

    return (
      <div key="next">
        <button
          className={classnames(
            Styles.arrow,
            Styles.next,
            {
              [`${getFadeAnimationClassName({ showContent })}`]: !inline,
              [Styles.arrowCentered]: inline,
            },
          )}
          onClick={this.handleNextSlideClick}
          key="next"
        >
          <div className={Styles.arrowContent}>
            <Icon name="arrowRight" fill="#FFFFFF" size="large" />
          </div>
        </button>

        {
          Features.slideshows.horizontal.stitchingEnabled() && (
            <div className={clueClassNames}>
              <NextSlideshowClue
                title={nextSlideshowTitle}
                image={nextSlideshowImage || image}
                onClick={gotToNextSlideshow}
              />
            </div>
          )
        }
      </div>
    );
  }

  /**
   * Render loading overlay
   * @returns {JSX}
   */
  renderLoadingOverlay() {
    const { errorFetchingNextSlideshow, fetchingNextSlideshow } = this.props;

    if (errorFetchingNextSlideshow) {
      return (
        <div className={Styles.loadingOverlayContainer} key="error-overlay">
          <div
            onClick={this.handleNextSlideClick}
            role="button"
            style={{ color: 'white' }}
            tabIndex={0}
          >
            <Icon name="refresh" fill="#FFFFFF" size="small" />
            <span>{localization.get('tryAgain')}</span>
          </div>
        </div>
      );
    }

    if (!fetchingNextSlideshow) return null;

    return (
      <div className={Styles.loadingOverlayContainer} key="loading-overlay">
        <Loading label={localization.get('loading')} theme={{ primary: 'blue' }} svg />
      </div>
    );
  }

  /**
   * Render swipeable slides
   * @returns {JSX}
   */
  renderSlides() {
    const { inline, slides } = this.props;

    return (
      <div
        className={Styles.track}
        style={this.getTrackStyles()}
        key="track"
        role="presentation"
        onClick={this.onImageClick}
      >
        {slides.map((slide, idx) => (
          <Swipeable
            onSwipingLeft={this.handleSwipingLeft}
            onSwipingRight={this.handleSwipingRight}
            onSwipedLeft={this.handleSwipedLeft}
            onSwipedRight={this.handleSwipedRight}
            flickThreshold={0.3}
            preventDefaultTouchmoveEvent
            trackMouse
            key={`slide-${idx}`} // eslint-disable-line
            style={{
              minWidth: this.getMinWidth(slide.type),
              height: '100%',
            }}
          >
            <div
              className={classnames(Styles.slide, {
                [Styles.endSlide]: slide.type === 'end',
                [Styles.inlineSlide]: inline,
              })}
              style={{
                minWidth: this.getMinWidth(slide.type),
              }}
            >
              {this.renderSlide(slide, idx)}
            </div>
          </Swipeable>
        ))}
      </div>
    );
  }

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    const { containerWidth, containerHeight } = this.state;
    const {
      activeSlideIndex,
      endSlideIndex,
      inline,
      isFullWidth,
      isThereEndcard,
    } = this.props;
    const endCardStyle = !inline && activeSlideIndex === endSlideIndex && isThereEndcard ? Styles.endContainer : '';

    return (
      <div
        role="slider"
        aria-valuemin={0}
        aria-valuemax={endSlideIndex}
        aria-valuenow={activeSlideIndex}
        tabIndex={0}
        className={classnames(endCardStyle, Styles.container, {
          [Styles.inline]: inline,
          [Styles.isFullWidth]: isFullWidth,
        })}
        ref={this.container}
        style={{ height: !inline ? containerHeight : '' }}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {containerWidth && [
          this.renderPrevSlideButton(),
          this.renderNextSlideButton(),
          this.renderSlides(),
          this.renderLoadingOverlay(),
        ]}
      </div>
    );
  }
}

/**
 * propTypes
 * @property {Object} actions - the slider actions
 * @property {number} activeSlideIndex - the slideder active slide index
 * @property {string} device - the current device
 * @property {number} endSlideIndex - the last slide index
 * @property {number} endSlideNumber - the last slide number
 * @property {bool} errorFetchingNextSlideshow - if there was an error fetching next slideshow
 * @property {func} gotToNextSlideshow - go to next slideshow handler
 * @property {func} goToNextSlide - go to next slide handler
 * @property {func} goToPrevSlide - got to prev slide handler
 * @property {array} hideAds - hidden ads
 * @property {bool} inline - is sline layout
 * @property {bool} isFinalSlideshow - is final slideshow
 * @property {bool} isFirstSlideshow - is first slideshow
 * @property {bool} isFullWidth - is full with
 * @property {bool} isThereEndcard - is there end card
 * @property {Object} meta - Meta data from this content (Author, date, source, sponsor)
 * @property {Object} meta.sponsor - Link, Logo and name from the sponsor
 * @property {object} nextSlideshow - next slideshow to show
 * @property {func} onHideAdByIds - hide ads by id handler
 * @property {func} onShouldRefresh - should refresh ads handler
 * @property {Object} primaryTag - primary tag for seo
 * @property {Object} reaction - reaction object for reactions slide
 * @property {func} renderSimpleStatus - render simple status handler
 * @property {array} slides - all the slides
 * @property {string} title - slider title
 * @property {string} transitionDuration - duration in ms
 * @property {string} transitionEffect - effect used from one of the valid transform options
 * @property {string} uid - from the content
 */
Slider.propTypes = {
  actions: PropTypes.object,
  activeSlideIndex: PropTypes.number,
  device: PropTypes.string,
  endSlideIndex: PropTypes.number,
  endSlideNumber: PropTypes.number,
  errorFetchingNextSlideshow: PropTypes.bool,
  fetchingNextSlideshow: PropTypes.bool,
  goToNextSlide: PropTypes.func,
  gotToNextSlideshow: PropTypes.func,
  goToPrevSlide: PropTypes.func,
  hideAds: PropTypes.array,
  inline: PropTypes.bool,
  isFinalSlideshow: PropTypes.bool,
  isFirstSlideshow: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  isThereEndcard: PropTypes.bool,
  meta: PropTypes.shape({
    author: PropTypes.array,
    date: PropTypes.string,
    source: PropTypes.string,
    sponsor: PropTypes.shape({
      link: PropTypes.string,
      logo: PropTypes.string,
      name: PropTypes.string,
    }),
    tempAuthors: PropTypes.array,
  }),
  nextSlideshow: PropTypes.object,
  onHideAdByIds: PropTypes.func,
  onShouldRefresh: PropTypes.func,
  primaryTag: PropTypes.object,
  reaction: PropTypes.object,
  renderSimpleStatus: PropTypes.func,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
    }),
  ),
  title: PropTypes.string,
  transitionDuration: PropTypes.string,
  transitionEffect: PropTypes.string,
  uid: PropTypes.string,
};

Slider.defaultProps = {
  errorFetchingNextSlideshow: false,
  fetchingNextSlideshow: false,
  isFirstSlideshow: true,
  isFullWidth: false,
  nextSlideshow: {},
  slides: [],
  transitionDuration: '300ms',
  transitionEffect: 'ease',
};

/**
 * Connector to be called when state change
 * @param {Object} state of the app
 * @returns {Object}
 */
export const mapStateToProps = state => ({
  device: deviceSelector(state),
  hideAds: hideAdsSelector(state),
});

/**
 * map app state to local props
 * @param  {function} dispatch redux action
 * @returns {Object} the actions to inject to the component
 */
export const mapDispatchToProps = dispatch => ({
  onHideAdByIds: ids => dispatch(hideAdByIds(ids)),
  onShouldRefresh: flag => dispatch(shouldRefresh(flag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
