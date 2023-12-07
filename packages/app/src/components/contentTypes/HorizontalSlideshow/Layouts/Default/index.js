import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';

import Features from '@univision/fe-commons/dist/config/features';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import dfpManager from '@univision/fe-commons/dist/utils/ads/dfpManager';
import { VISIBILITY_SENSOR_SCROLL_THROTTLE } from '@univision/fe-commons/dist/constants/spa';

import ShareBar from '@univision/fe-components-base/dist/components/ShareBar';

import getSharingValues from '../../../../../utils/content/getSlideShareOptions';
import Sidebar from '../../Sidebar';
import ConnectedSlider from '../../Slider';
import { handleShareBarClick } from '../../helpers';
import Status from '../../Status';
import Styles from './Default.scss';

/**
 * Default horizontal slideshow layout
 */
class Default extends Component {
  /**
   * Constructor
   */
  constructor() {
    super();

    this.renderSimpleStatus = this.renderSimpleStatus.bind(this);
    this.handleShareBarClick = this.handleShareBarClick.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * Refresh the ads on slide change and track
   * @param {Object} prevProps the previous props
   */
  componentDidUpdate(prevProps) {
    const { activeSlideIndex, shouldRefreshAds } = this.props;
    if (prevProps.activeSlideIndex !== activeSlideIndex && shouldRefreshAds === true) {
      dfpManager.refreshAds();
    }
  }

  /**
   * Abort the slideshow if out of view
   * @param {boolean} isVisible whether the slideshow is visible or not
   */
  handleVisibilityChange(isVisible) {
    const { actions } = this.props;

    if (!isVisible) actions.abortAutoplay();
  }

  /**
   * Allow keyboard navigation
   * @param {Object} evt the event
   */
  handleKeyDown(evt) {
    const {
      actions: { goToPrevSlide, goToNextSlide },
      activeSlideIndex,
      endSlideIndex,
      isFinalSlideshow,
      isFirstSlideshow,
    } = this.props;

    if (!this.keyDown) {
      this.keyDown = true;

      const canAdvance = activeSlideIndex !== endSlideIndex || !isFinalSlideshow;
      const canGoBack = activeSlideIndex !== 0 || !isFirstSlideshow;

      if (evt.keyCode === 37 && canGoBack) {
        goToPrevSlide('keyboard');
      } else if (evt.keyCode === 39 && canAdvance) {
        goToNextSlide('keyboard');
      }
    }
  }

  /**
   * Allow keydown action to happen again
   */
  handleKeyUp() {
    this.keyDown = false;
  }

  /**
   * Handle ShareBar click
   * @param {string} name name to share
   */
  handleShareBarClick(name) {
    const { title, uid, primaryTag } = this.props;
    const shareData = {
      title,
      uid,
      primaryTag,
      type: 'slideshow',
    };

    handleShareBarClick(name, { shareData, ...this.props });
  }

  /**
   * Render simple status (only autoplay button and slideshow number)
   * @param {Object} props additional props
   * @returns {JSX}
   */
  renderSimpleStatus(props) {
    const {
      actions,
      activeSlideIndex,
      activeSlideNumber,
      endSlideNumber,
      endSlideIndex,
      isFinalSlideshow,
      reaction,
      slides,
      status,
    } = this.props;
    const activeSlideId = getKey(slides[activeSlideIndex], 'uid');
    const isEndOfSlideshow = isFinalSlideshow && activeSlideIndex === endSlideIndex;

    return (
      <Status
        actions={actions}
        activeSlideId={activeSlideId}
        activeSlideNumber={activeSlideNumber}
        endSlideNumber={endSlideNumber}
        isEndOfSlideshow={isEndOfSlideshow}
        progress={status.progress}
        reaction={reaction}
        running={status.running}
        simple
        slides={slides}
        {...props}
      />
    );
  }

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    const {
      actions,
      activeSlideCaption,
      activeSlideIndex,
      activeSlideNumber,
      device,
      endSlideIndex,
      endSlideNumber,
      errorFetchingNextSlideshow,
      fetchingNextSlideshow,
      hideAds,
      hideCaption,
      isFinalSlideshow,
      isFirstSlideshow,
      isThereEndcard,
      meta,
      nextSlideshow,
      pollQuestionOverride,
      primaryTag,
      reaction,
      sharingOptions,
      slides,
      status,
      theme,
      title,
      uid,
    } = this.props;
    const shareData = {
      title,
      uid,
      primaryTag,
      type: 'slideshow',
    };
    const sharingValues = getSharingValues(sharingOptions, slides[activeSlideIndex]);
    const isMobile = device === 'mobile';
    const isFinalSlide = activeSlideIndex === endSlideIndex;
    const shareBarExpanded = isFinalSlideshow && isFinalSlide;
    const shareBarClassNames = classnames(Styles.shareBar, {
      [Styles.shareBarExpanded]: Features.slideshows.horizontal.stitchingEnabled()
        && shareBarExpanded,
    });
    const activeSlideId = getKey(slides[activeSlideIndex], 'uid');

    return (
      <div
        className={Styles.container}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        role="presentation"
      >
        {reaction && (
          <div className={Styles.mobileHeader}>
            <Status
              actions={actions}
              activeSlideId={activeSlideId}
              running={status.running}
              progress={status.progress}
              activeSlideNumber={activeSlideNumber}
              endSlideNumber={endSlideNumber}
              isEndOfSlideshow={isFinalSlideshow && activeSlideIndex === endSlideIndex}
              shareData={shareData}
              reaction={reaction}
              slides={slides}
              sharingOptions={sharingValues}
            />
          </div>
        )}
        <VisibilitySensor
          intervalCheck={false}
          partialVisibility
          onChange={this.handleVisibilityChange}
          scrollCheck
          scrollThrottle={VISIBILITY_SENSOR_SCROLL_THROTTLE}
        >
          <ConnectedSlider
            actions={actions}
            activeSlideIndex={activeSlideIndex}
            activeSlideNumber={activeSlideNumber}
            endSlideIndex={endSlideIndex}
            endSlideNumber={endSlideNumber}
            errorFetchingNextSlideshow={errorFetchingNextSlideshow}
            fetchingNextSlideshow={fetchingNextSlideshow}
            goToNextSlide={actions.goToNextSlide}
            goToPrevSlide={actions.goToPrevSlide}
            gotToNextSlideshow={actions.goToNextSlideshow}
            isFinalSlideshow={isFinalSlideshow}
            isFirstSlideshow={isFirstSlideshow}
            isThereEndcard={isThereEndcard}
            meta={meta}
            nextSlideshow={nextSlideshow}
            primaryTag={primaryTag}
            reaction={reaction}
            renderSimpleStatus={this.renderSimpleStatus}
            slides={slides}
            status={status}
            title={title}
            uid={uid}
          />
        </VisibilitySensor>
        {
        !(isThereEndcard && activeSlideIndex === endSlideIndex) && (
          <Sidebar
            actions={actions}
            activeSlideCaption={activeSlideCaption}
            activeSlideId={activeSlideId}
            activeSlideNumber={activeSlideNumber}
            device={device}
            endSlideNumber={endSlideNumber}
            hideAds={hideAds}
            hideCaption={hideCaption}
            isEndOfSlideshow={!(isThereEndcard && activeSlideIndex === endSlideIndex)}
            meta={meta}
            pollQuestionOverride={pollQuestionOverride}
            reaction={reaction}
            shareData={shareData}
            sharingOptions={sharingValues}
            showShareClue={isFinalSlide}
            status={status}
            theme={theme}
          />
        )}
        {/** Not rendering this for reaction slideshows because those need to keep old design for
         * now  (this sharebar is only for mobile) */
        isMobile && !reaction && (
          <ShareBar
            centerAll
            className={shareBarClassNames}
            device="mobile"
            expanded={shareBarExpanded}
            onClick={this.handleShareBarClick}
            padLeft={false}
            sharingOptions={sharingOptions}
            showShareClue={isFinalSlide}
            theme="rounded"
          />
        )}
      </div>
    );
  }
}

/**
 * propTypes
 * @property {Object} meta - Meta data from this content (Author, date, source and sponsor)
 * @property {Object} meta.sponsor - Link, Logo and name from the sponsor
 */
Default.propTypes = {
  actions: PropTypes.shape({
    goToPrevSlide: PropTypes.func.isRequired,
    goToNextSlide: PropTypes.func.isRequired,
    goToNextSlideshow: PropTypes.func.isRequired,
    togglePlaying: PropTypes.func.isRequired,
    abortAutoplay: PropTypes.func.isRequired,
    onShareClick: PropTypes.func.isRequired,
  }),
  activeSlideCaption: PropTypes.string,
  activeSlideIndex: PropTypes.number.isRequired,
  activeSlideNumber: PropTypes.number,
  endSlideIndex: PropTypes.number.isRequired,
  endSlideNumber: PropTypes.number,
  errorFetchingNextSlideshow: PropTypes.bool.isRequired,
  device: PropTypes.string,
  fetchingNextSlideshow: PropTypes.bool.isRequired,
  hideAds: PropTypes.array,
  hideCaption: PropTypes.bool,
  isFinalSlideshow: PropTypes.bool,
  isFirstSlideshow: PropTypes.bool,
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
  pollQuestionOverride: PropTypes.string,
  primaryTag: PropTypes.object,
  reaction: PropTypes.object,
  sharingOptions: PropTypes.object,
  shouldRefreshAds: PropTypes.bool,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({
        href: PropTypes.string,
      }),
    }),
  ).isRequired,
  status: PropTypes.shape({
    running: PropTypes.bool,
    progress: PropTypes.number,
  }),
  theme: PropTypes.object,
  title: PropTypes.string,
  uid: PropTypes.string,
};

Default.defaultProps = {
  sharingOptions: {},
};

export default Default;
