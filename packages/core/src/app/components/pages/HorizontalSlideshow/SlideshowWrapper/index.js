import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Features from '@univision/fe-commons/dist/config/features';
import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import { SLIDESHOW_EMPTY_ERROR, SLIDESHOW_EMPTY_INFO } from '@univision/fe-commons/dist/constants/messages';
import {
  exists,
  hasKey,
  getKey,
  isValidArray,
  isValidObject,
  isValidValue,
} from '@univision/fe-commons/dist/utils/helpers';
import slideshowAds from '@univision/fe-commons/dist/utils/ads/Slideshow/slideshowAds';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import comScoreManager from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';

import DefaultLayout from '../Layouts/Default/Default';
import InlineLayout from '../Layouts/Inline/Inline';
import SlideshowProvider from '../SlideshowProvider/SlideshowProvider';

/**
 * SlideshowWrapper component
 */
class SlideshowWrapper extends Component {
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

    this.device = getDevice(Store);
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
    const { type, nextSlideshows, hasOpeningCard: openingCardExists } = slideshowData;
    let slides = slideshowData.slides || [];
    const endSlideNumber = openingCardExists ? slides.length - 1 : slides.length;
    const { isFinalSlideshow } = this.props;
    const isThereEndcard = isValidArray(nextSlideshows)
      && (!Features.slideshows.horizontal.stitchingEnabled() || isFinalSlideshow);

    if (type === 'default' || type === 'inline' || type === 'reaction') {
      slides = slideshowAds.injectAds(slides);
    } else {
      slides = slides.map((slide, idx) => ({
        id: idx,
        ...slide,
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
            isDirect
          );
          wrapperProps.actions.goToPrevSlide();
        },
        goToNextSlide: (interaction) => {
          this.trackSlideChange(
            slides[activeIndex + 1],
            endSlideNumber,
            typeof interaction === 'string' ? interaction : 'arrow',
            isDirect
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
   * Uses react-helmet to update the page title whenever the page data in redux changes.
   * This would happen when user goes to a new slideshow, or goes back to previous one.
   * @returns {null | JSX}
   */
  renderSlideshowHead() {
    const { page } = this.props;
    const pageTitle = getKey(page, 'seo.title') || page.title;
    // Do not render on server side or if HSS is disabled
    if (typeof window === 'undefined' || !Features.slideshows.horizontal.stitchingEnabled()) {
      return null;
    }

    return (
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
    );
  }

  /**
   * Render the appropriate layout
   * @param {Object} providerProps the props passed from the slideshow provider
   * @returns {JSX}
   */
  renderLayout(providerProps) {
    const {
      errorFetchingNextSlideshow,
      fetchingNextSlideshow,
      isFinalSlideshow,
      isFirstSlideshow,
      nextSlideshow,
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
          />
        );

      case 'reaction':
        return (
          <DefaultLayout
            errorFetchingNextSlideshow={errorFetchingNextSlideshow}
            fetchingNextSlideshow={fetchingNextSlideshow}
            isFinalSlideshow={isFinalSlideshow}
            isFirstSlideshow={isFirstSlideshow}
            meta={meta}
            nextSlideshow={nextSlideshow}
            reaction={reaction}
            {...layoutProps}
          />
        );

      default:
        return (
          <DefaultLayout
            errorFetchingNextSlideshow={errorFetchingNextSlideshow}
            fetchingNextSlideshow={fetchingNextSlideshow}
            isFinalSlideshow={isFinalSlideshow}
            isFirstSlideshow={isFirstSlideshow}
            meta={meta}
            nextSlideshow={nextSlideshow}
            primaryTag={primaryTag}
            title={title}
            uid={uid}
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
      isFinalSlideshow,
      isFirstSlideshow,
      nextSlideshow,
    } = this.props;

    if (!slides) {
      clientLogging(
        new Error(`${SLIDESHOW_EMPTY_ERROR} [uid: ${uid}]`),
        SLIDESHOW_EMPTY_INFO,
      );
      return null;
    }

    return (
      <Fragment>
        {this.renderSlideshowHead()}
        <SlideshowProvider
          autoplay={autoplay}
          autoplayDuration={autoplayTimer}
          autoRedirect={!exists(reaction)}
          currentSlideshowIndex={currentSlideshowIndex}
          endSlideIndex={endSlideIndex}
          endSlideNumber={endSlideNumber}
          hasOpeningCard={openingCardExists}
          isFinalSlideshow={isFinalSlideshow}
          isFirstSlideshow={isFirstSlideshow}
          nextSlideshow={nextSlideshow}
          onAutoplay={this.onAutoplay}
          primaryTag={primaryTag}
          slideImageIds={slideImageIds}
          slides={slides}
          title={title}
          type={type}
          uid={uid}
        >
          {this.renderLayout}
        </SlideshowProvider>
      </Fragment>
    );
  }
}

/**
 * propTypes
 * @property {boolean} autoplay should autoplay start automatically
 * @property {boolean} autoplayTimer autoplay duration per slide
 * @property {string} className component's parent CSS class name
 * @property {boolean} fetchingNextSlideshow determines if we are fetching a slideshow
 * @property {boolean} fullWidth determines if the component has full width
 * @property {boolean} isFinalSlideshow determines if we are on the final slideshow
 * @property {boolean} isFirstSlideshow determines if we are on the first slideshow
 * @property {boolean} isLead determines if slide is a lead slide
 * @property {array} nextSlideshows the upcoming slideshows
 * @property {Object} primaryTag the primary tag info
 * @property {array} slides the slideshow's slides
 * @property {number} currentSlideshowIndex the index of the current slideshow
 * @property {boolean} errorFetchingNextSlideshow determines if there was an error fetching the
 * next slideshow
 * @property {Object} initialPage the initial page info that comes from the server
 * @property {Object} page the page info that will keep updating on the client
 * @property {Object} sponsor the info about the slideshow sponsor
 * @property {string} title the slideshow title
 * @property {string} type the slideshow type
 * @property {string} uid the slideshow uid
 */
SlideshowWrapper.propTypes = {
  // start of possible enhancement props (when inlined)
  autoplay: PropTypes.bool,
  autoplayTimer: PropTypes.number,
  className: PropTypes.string,
  fetchingNextSlideshow: PropTypes.bool,
  fullWidth: PropTypes.bool,
  isFinalSlideshow: PropTypes.bool,
  isFirstSlideshow: PropTypes.bool,
  isLead: PropTypes.bool,
  nextSlideshow: PropTypes.object,
  nextSlideshows: PropTypes.arrayOf(
    PropTypes.shape({
      mainImage: PropTypes.object,
      slideCount: PropTypes.number,
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  primaryTag: PropTypes.object,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({
        href: PropTypes.string,
      }),
    })
  ),
  // end of possible enhancement props (when inlined)
  currentSlideshowIndex: PropTypes.number,
  errorFetchingNextSlideshow: PropTypes.bool,
  initialPage: PropTypes.object, // page rendered on the server
  page: PropTypes.object, // page rendered/updated on the client
  sponsor: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.oneOf(['default', 'inline', 'reaction']),
  uid: PropTypes.string,
};

SlideshowWrapper.defaultProps = {
  currentSlideshowIndex: 0,
  errorFetchingNextSlideshow: false,
  fetchingNextSlideshow: false,
  isFinalSlideshow: true,
  isFirstSlideshow: true,
  nextSlideshow: {},
  page: {},
  sponsor: null,
};

export default SlideshowWrapper;
