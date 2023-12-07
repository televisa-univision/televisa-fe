import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from 'next/head';

import Features from '@univision/fe-commons/dist/config/features';
import { clientLevelLogging } from '@univision/fe-commons/dist/utils/logging/clientLogging';
import loggingLevels from '@univision/fe-commons/dist/utils/logging/loggingLevels';
import { SLIDESHOW_EMPTY_ERROR, SLIDESHOW_EMPTY_INFO } from '@univision/fe-commons/dist/constants/messages';
import {
  exists,
  hasKey,
  getKey,
  isValidArray,
  isValidFunction,
  isValidObject,
  isValidValue,
} from '@univision/fe-commons/dist/utils/helpers';
import slideshowAds from '@univision/fe-commons/dist/utils/ads/Slideshow/slideshowAds';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import comScoreManager from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';
import { deviceSelector, sharingOptionsSelector, themeSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { hideAdsSelector, shouldRefreshAdsSelector } from '@univision/fe-commons/dist/store/selectors/ads-selectors';
import {
  currentSlideshowIndexSelector,
  slideshowsSelector,
  wentForwardSelector,
  fetchingNextSlideshowSelector,
} from '@univision/fe-commons/dist/store/selectors/horizontal-slideshow-selectors';
import { setInitialSlideshows } from '@univision/fe-commons/dist/store/actions/slideshow/horizontal-slideshow-actions';

import DefaultLayout from '../Layouts/Default';
import InlineLayout from '../Layouts/Inline';
import ConnectedSlideshowProvider from '../SlideshowProvider';

const FINAL_SLIDESHOW_INDEX = Features.slideshows.horizontal.limit - 1;

/**
 * SlideshowWrapper component
 */
export class SlideshowWrapper extends Component {
  /**
   *
   * Set horizontal slideshows in the redux store after page mounts
   * @returns {void}
   */
  componentDidMount() {
    const { onSetInitialSlideshows } = this.props;

    if (isValidFunction(onSetInitialSlideshows)) onSetInitialSlideshows();
  }

  /**
   * Get the correct page data. From the server on first render, and from client on subsequent ones.
   * @param {Object} props component props
   * @returns {Object}
   */
  static getPage(props) {
    const { page, initialPage, type } = props;

    // When this component is used inlined, it receives all of its data through props
    if (type === 'inline') {
      return { ...props };
    }

    return isValidObject(page) ? page : initialPage;
  }

  /**
   * Get slide image ids if necessary
   * @param {array} slides array of slides
   * @returns {array}
   */
  static getSlideImageIds(slides) {
    return slides.map((slide) => {
      if (hasKey(slide, 'image.uid')) {
        const { uid } = slide.image;
        return uid.substring(uid.lastIndexOf('-') + 1, uid.length);
      }

      return null;
    });
  }

  /**
   * construcor
   * @param {Object} props component props
   */
  constructor(props) {
    super(props);

    this.isStichingEnabled = Features.slideshows.horizontal.stitchingEnabled();

    this.device = props.device;
    this.getAuthor = this.getAuthor.bind(this);
    this.getTempAuthors = this.getTempAuthors.bind(this);
    this.onAutoplay = this.onAutoplay.bind(this);
    this.trackSlideChange = this.trackSlideChange.bind(this);
    this.renderLayout = this.renderLayout.bind(this);
  }

  /**
   * Function to call when a slide is changed by the auto player
   * @param {number} activeSlideIndex Index of the active slide
   */
  onAutoplay(activeSlideIndex) {
    const { slides, endSlideNumber } = this.getSlidesData();
    this.trackSlideChange(slides[activeSlideIndex], endSlideNumber, 'autoplay', false);
  }

  /**
   * Gets info for regular slidehow
   * @param {Object} page the current page object
   * @returns {Object} reaction slideshow info
   */
  getSlideshowInfo(page) {
    const slides = this.injectLeadSlide(page);
    const pageType = page.type === 'slideshow' ? 'default' : page.type;
    const inline = pageType === 'inline';
    const autoplay = inline ? page.autoplay : !page.disableAutoPlay;

    return {
      analyticsData: page.analyticsData,
      autoplay,
      autoplayTimer: page.autoPlayTimer,
      meta: {
        author: this.getAuthor(),
        date: page.publishDate,
        source: page.source,
        sponsor: page.sponsor,
        tempAuthors: this.getTempAuthors(),
      },
      nextSlideshows: page.nextSlideshows,
      hasOpeningCard: !inline && this.hasOpeningCard(),
      primaryTag: page.primaryTag,
      sharing: page.sharing,
      slides,
      title: page.title,
      type: pageType,
      uid: page.uid,
      isLead: page.isLead,
      fullWidth: page.fullWidth,
    };
  }

  /**
   * Gets info for reaction slideshow
   * @param {Object} page the current page object
   * @returns {Object} reaction slideshow info
   */
  getReactionSlideshowInfo(page) {
    const slides = this.injectLeadSlide(page);

    return {
      analyticsData: page.analyticsData,
      autoplay: false,
      nextSlideshows: page.nextSlideshows,
      hasOpeningCard: this.hasOpeningCard(),
      primaryTag: page.primaryTag,
      reaction: {
        slideshowId: page.uid,
        pollOptions: page.pollOptions,
        pollQuestion: page.pollQuestion,
        autoSlideChangeTime: page.autoSlideChangeTime || 2,
        closedDate: page.closedDate,
        webAppPollOptions: page.webAppPollOptions,
      },
      slides,
      sharing: page.sharing,
      title: page.title,
      type: 'reaction',
      uid: page.uid,
    };
  }

  /**
   * Get required slideshow data
   * @returns {Object} the final slideshow data
   */
  getSlideshowData() {
    const page = SlideshowWrapper.getPage(this.props);
    const slideshowInfo = page.type === 'reactionslideshow'
    || page.slideshowType === 'reactionslideshow'
      ? this.getReactionSlideshowInfo(page)
      : this.getSlideshowInfo(page);

    return {
      autoplay: true,
      autoplayTimer: 7,
      fullWidth: false,
      type: 'default',
      ...slideshowInfo,
    };
  }

  /**
   * Get the author for a slide
   * @returns {Object}
   */
  getAuthor() {
    const page = SlideshowWrapper.getPage(this.props);

    if (hasKey(page, 'authors') && isValidArray(page.authors)) {
      return page.authors;
    }

    return null;
  }

  /**
   * Get the tempAuthors for a slide
   * @returns {Object}
   */
  getTempAuthors() {
    const page = SlideshowWrapper.getPage(this.props);

    if (hasKey(page, 'tempAuthors') && isValidArray(page.tempAuthors)) {
      return page.tempAuthors;
    }

    return null;
  }

  /**
   * Get the slides with ads and end card and slides data
   * @returns {Object}
   */
  getSlidesData() {
    const slideshowData = this.getSlideshowData();
    const { isFinalSlideshow } = this.getNextAndPreviousSlideshow();
    const { type, nextSlideshows, hasOpeningCard: openingCardExists } = slideshowData;
    let slides = slideshowData.slides || [];
    const endSlideNumber = openingCardExists ? slides.length - 1 : slides.length;
    const isThereEndcard = isValidArray(nextSlideshows)
      && (!this.isStichingEnabled || isFinalSlideshow);

    if (type === 'default' || type === 'inline' || type === 'reaction') {
      slides = slideshowAds.injectAds(slides);
    } else {
      slides = slides.map((slide, idx) => ({
        ...slide,
        id: idx,
      }));
    }

    if (isThereEndcard) {
      slides.push({
        type: 'end',
        slides: nextSlideshows,
      });
    }

    return {
      endSlideIndex: slides.length - 1,
      endSlideNumber,
      isThereEndcard,
      slideImageIds: SlideshowWrapper.getSlideImageIds(slides),
      slides,
    };
  }

  /**
   * Get layout props
   * @param {Object} wrapperProps the props passed from the slideshow wrapper
   * @returns {Object}
   */
  getLayoutProps(wrapperProps) {
    const {
      endSlideIndex,
      endSlideNumber,
      isThereEndcard,
      slides,
    } = this.getSlidesData();
    // This flag is used to detect when a user comes from a social network
    // or looking for a specific slide
    const { isDirect } = wrapperProps;
    const {
      primaryTag,
      sponsor,
      title,
      uid,
      hasOpeningCard: openingCardExists,
    } = this.getSlideshowData();
    const activeSlide = slides[wrapperProps.activeSlideIndex];
    const activeIndex = wrapperProps.activeSlideIndex;
    let activeSlideCaption;
    let activeSlideNumber;
    let hideCaption = false;
    let pollQuestionOverride;

    if (activeSlide && typeof activeSlide.id !== 'undefined') {
      activeSlideCaption = activeSlide.caption;
      activeSlideNumber = openingCardExists ? activeSlide.id : activeSlide.id + 1;
      ({ hideCaption, pollQuestionOverride } = activeSlide);
    } else {
      activeSlideCaption = '';
      activeSlideNumber = null;
    }

    return {
      ...wrapperProps,
      actions: {
        ...wrapperProps.actions,
        goToPrevSlide: (interaction) => {
          this.trackSlideChange(
            slides[activeIndex - 1],
            endSlideNumber,
            typeof interaction === 'string' ? interaction : 'arrow',
            isDirect,
          );
          wrapperProps.actions.goToPrevSlide();
        },
        goToNextSlide: (interaction) => {
          this.trackSlideChange(
            slides[activeIndex + 1],
            endSlideNumber,
            typeof interaction === 'string' ? interaction : 'arrow',
            isDirect,
          );
          wrapperProps.actions.goToNextSlide();
        },
      },
      activeSlideCaption,
      activeSlideNumber,
      endSlideIndex,
      endSlideNumber,
      hideCaption,
      isThereEndcard,
      pollQuestionOverride,
      primaryTag,
      slides,
      sponsor,
      title,
      uid,
    };
  }

  /**
   * Determines if slideshow has an opening card
   * @returns {boolean}
   */
  hasOpeningCard() {
    return !!(
      this.device === 'mobile'
      && getKey(SlideshowWrapper.getPage(this.props), 'openingCard.renditions')
    );
  }

  /**
   * Injects opening card slide if available
   * @param {Object} page page object
   * @returns {Object} slides
   */
  injectLeadSlide(page) {
    const {
      slides,
      description: desc,
      meta,
      title,
      openingCard,
      type,
    } = page || {};

    const renditions = getKey(openingCard, 'renditions');

    if (slides && renditions && this.device === 'mobile' && type !== 'inline') {
      return [{
        desc,
        image: openingCard,
        meta,
        title,
        type: 'leadImage',
      }, ...slides];
    }

    return slides;
  }

  /**
   * Track slide change
   * @param {Object} activeSlide the active slide
   * @param {number} endSlideNumber the end slide number
   * @param {string} interaction the interaction method
   * @param {boolean} isDirect true if the user comes from social media or directly
   */
  trackSlideChange(activeSlide, endSlideNumber, interaction, isDirect) {
    if (exists(activeSlide)) {
      const {
        uid, type, title, primaryTag, analyticsData,
      } = this.getSlideshowData();
      const isInline = type === 'inline';
      const activeSlideNumber = isInline || !this.hasOpeningCard()
        ? activeSlide.id + 1
        : activeSlide.id;
      const slidesLength = endSlideNumber;
      let trackingData = {
        activeSlide,
        activeSlideNumber,
        interaction,
        isInline,
        primaryTag,
        slidesLength,
        title,
        uid,
      };
      if (isInline) {
        trackingData = Object.assign(trackingData, {
          contentSpecificTracking: getKey(analyticsData, 'web.contentSpecific', {}),
        });
      }
      let trackingEvent = null;

      if (isValidValue(activeSlideNumber)) {
        trackingEvent = SlideshowTracker.events.change;
      } else if (!isDirect && (!this.endCardTracked && activeSlide.type === 'end')) {
        this.endCardTracked = true;
        trackingEvent = SlideshowTracker.events.change;
        trackingData.activeSlideNumber = 'end_card';
      }

      if (trackingEvent !== null) {
        SlideshowTracker.track(trackingEvent, trackingData);
      }

      if (!isInline) {
        comScoreManager.beacon();
      }
    }
  }

  /**
   * Uses next/head to update the page title whenever the page data in redux changes.
   * This would happen when user goes to a new slideshow, or goes back to previous one.
   * @returns {null | JSX}
   */
  renderSlideshowHead() {
    const { page, type } = this.props;
    const pageTitle = getKey(page, 'seo.title') || page.title;
    // Do not render on server side or if HSS is disabled or if slideshow is inline
    if (typeof window === 'undefined' || !this.isStichingEnabled || type === 'inline') {
      return null;
    }

    return (
      <Head>
        <title>{pageTitle}</title>
      </Head>
    );
  }

  /**
   * Get next and previous slideshow in the list
   * @returns {Object}
   */
  getNextAndPreviousSlideshow() {
    const { currentSlideshowIndex, slideshows } = this.props;

    return {
      nextSlideshow: slideshows?.[currentSlideshowIndex + 1],
      previousSlideshow: slideshows?.[currentSlideshowIndex - 1],
      isFirstSlideshow: currentSlideshowIndex === 0,
      isFinalSlideshow: currentSlideshowIndex === FINAL_SLIDESHOW_INDEX,
    };
  }

  /**
   * Render the appropriate layout
   * @param {Object} providerProps the props passed from the slideshow provider
   * @returns {JSX}
   */
  renderLayout(providerProps) {
    const {
      device,
      errorFetchingNextSlideshow,
      fetchingNextSlideshow,
      hideAds,
      sharingOptions,
      shouldRefreshAds,
      theme,
    } = this.props;
    const {
      className,
      fullWidth,
      isLead,
      meta,
      primaryTag,
      reaction,
      title,
      type,
      uid,
    } = this.getSlideshowData();
    const layoutProps = this.getLayoutProps(providerProps);
    const {
      nextSlideshow,
      isFirstSlideshow,
      isFinalSlideshow,
    } = this.getNextAndPreviousSlideshow();

    switch (type) {
      case 'inline':
        return (
          <InlineLayout
            isLead={isLead}
            meta={meta}
            title={title}
            uid={uid}
            {...layoutProps}
            className={className}
            isFullWidth={fullWidth}
            theme={theme}
          />
        );

      case 'reaction':
        return (
          <DefaultLayout
            device={device}
            errorFetchingNextSlideshow={errorFetchingNextSlideshow}
            fetchingNextSlideshow={fetchingNextSlideshow}
            hideAds={hideAds}
            isFinalSlideshow={isFinalSlideshow}
            isFirstSlideshow={isFirstSlideshow}
            meta={meta}
            nextSlideshow={nextSlideshow}
            reaction={reaction}
            sharingOptions={sharingOptions}
            shouldRefreshAds={shouldRefreshAds}
            theme={theme}
            {...layoutProps}
          />
        );

      default:
        return (
          <DefaultLayout
            device={device}
            errorFetchingNextSlideshow={errorFetchingNextSlideshow}
            fetchingNextSlideshow={fetchingNextSlideshow}
            hideAds={hideAds}
            isFinalSlideshow={isFinalSlideshow}
            isFirstSlideshow={isFirstSlideshow}
            meta={meta}
            nextSlideshow={nextSlideshow}
            primaryTag={primaryTag}
            title={title}
            uid={uid}
            sharingOptions={sharingOptions}
            shouldRefreshAds={shouldRefreshAds}
            theme={theme}
            {...layoutProps}
          />
        );
    }
  }

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    const {
      autoplay,
      autoplayTimer,
      hasOpeningCard: openingCardExists,
      primaryTag,
      reaction,
      slides,
      title,
      type,
      uid,
    } = this.getSlideshowData();
    const { endSlideIndex, endSlideNumber, slideImageIds } = this.getSlidesData();
    const {
      currentSlideshowIndex,
      hideAds,
      wentForward,
    } = this.props;

    if (!slides) {
      clientLevelLogging({
        error: new Error(`${SLIDESHOW_EMPTY_ERROR} [uid: ${uid}]`),
        info: SLIDESHOW_EMPTY_INFO,
        level: loggingLevels.warn,
      });
      return null;
    }

    const {
      nextSlideshow,
      previousSlideshow,
      isFirstSlideshow,
      isFinalSlideshow,
    } = this.getNextAndPreviousSlideshow();

    return (
      <Fragment>
        {this.renderSlideshowHead()}
        {/** TODO: fix re-render issue in autoplay */}
        <ConnectedSlideshowProvider
          autoplay={autoplay}
          autoplayDuration={autoplayTimer}
          autoRedirect={!reaction}
          currentSlideshowIndex={currentSlideshowIndex}
          endSlideIndex={endSlideIndex}
          endSlideNumber={endSlideNumber}
          hasOpeningCard={openingCardExists}
          hideAds={hideAds}
          isFinalSlideshow={isFinalSlideshow}
          isFirstSlideshow={isFirstSlideshow}
          nextSlideshow={nextSlideshow}
          onAutoplay={this.onAutoplay}
          previousSlideshow={previousSlideshow}
          primaryTag={primaryTag}
          slideImageIds={slideImageIds}
          slides={slides}
          title={title}
          type={type}
          uid={uid}
          wentForward={wentForward}
        >
          {this.renderLayout}
        </ConnectedSlideshowProvider>
      </Fragment>
    );
  }
}

/**
 * propTypes
 * @property {string} device current user's device
 * @property {boolean} fetchingNextSlideshow determines if we are fetching a slideshow
 * @property {array} hideAds hidden ads
 * @property {boolean} isLead determines if slide is a lead slide
 * @property {func} onSetInitialSlideshows handler to set initial values
 * @property {Object} sharingOptions from the api content
 * @property {bool} shouldRefreshAds if ads needs to be refreshed
 * @property {array} slideshows from initial values
 * @property {array} slides the slideshow's slides
 * @property {number} currentSlideshowIndex the index of the current slideshow
 * @property {boolean} errorFetchingNextSlideshow determines if there was an error fetching the
 * next slideshow
 * @property {Object} initialPage the initial page info that comes from the server
 * @property {Object} page the page info that will keep updating on the client
 * @property {Object} theme current page theme
 * @property {bool} wentForward flag to know if navigation was forward
 */
SlideshowWrapper.propTypes = {
  device: PropTypes.string,
  fetchingNextSlideshow: PropTypes.bool,
  hideAds: PropTypes.array,
  isLead: PropTypes.bool,
  onSetInitialSlideshows: PropTypes.func,
  sharingOptions: PropTypes.object,
  shouldRefreshAds: PropTypes.bool,
  slideshows: PropTypes.array,
  // end of possible enhancement props (when inlined)
  currentSlideshowIndex: PropTypes.number,
  errorFetchingNextSlideshow: PropTypes.bool,
  initialPage: PropTypes.object, // page rendered on the server
  page: PropTypes.object, // page rendered/updated on the client
  theme: PropTypes.object,
  type: PropTypes.string,
  wentForward: PropTypes.bool,
};

SlideshowWrapper.defaultProps = {
  currentSlideshowIndex: 0,
  errorFetchingNextSlideshow: false,
  page: {},
};

/**
 * Connector to be called when state change
 * @param {Object} state of the app
 * @returns {Object}
 */
const mapStateToProps = state => ({
  device: deviceSelector(state),
  hideAds: hideAdsSelector(state),
  sharingOptions: sharingOptionsSelector(state),
  shouldRefreshAds: shouldRefreshAdsSelector(state),
  theme: themeSelector(state),
  currentSlideshowIndex: currentSlideshowIndexSelector(state),
  slideshows: slideshowsSelector(state),
  wentForward: wentForwardSelector(state),
  fetchingNextSlideshow: fetchingNextSlideshowSelector(state),
});

/**
 * map app state to local props
 * @param  {function} dispatch redux action
 * @returns {Object} the actions to inject to the component
 */
const mapDispatchToProps = dispatch => ({
  onSetInitialSlideshows: () => dispatch(setInitialSlideshows()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlideshowWrapper);
