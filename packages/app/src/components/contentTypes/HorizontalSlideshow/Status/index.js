import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';
import ShareBar from '@univision/fe-components-base/dist/components/ShareBar';
import ProgressCircle from '@univision/fe-components-base/dist/components/ProgressCircle';

import { handleShareBarClick } from '../helpers';
import OpenStatus from './OpenStatus';
import ReactionStatus from './ReactionStatus';
import DefaultStatus from './DefaultStatus';
import InlineStatus from './InlineStatus';
import SimpleStatus from './SimpleStatus';
import Styles from './Status.scss';

/**
 * Status component
 * @returns {JSX}
 */
class Status extends Component {
  /** Constructor */
  constructor() {
    super();

    this.state = {
      showPlayButton: true,
      showArrows: true,
      showShare: true,
    };

    this.onShareBarClick = this.onShareBarClick.bind(this);
  }

  /**
   * Keep previous number for advertising
   * @param {Object} prevProps the previous props
   */
  componentDidUpdate({ activeSlideNumber: activeSlideNumberPrev }) {
    const { activeSlideNumber } = this.props;

    if (!activeSlideNumber && activeSlideNumber !== 0 && activeSlideNumberPrev) {
      this.prevSlideNumber = activeSlideNumberPrev;
    }
  }

  /**
   * On share button clicked
   */
  onShareIconClick = () => {
    this.setState(prevState => ({
      showPlayButton: !prevState.showPlayButton,
      showArrows: !prevState.showArrows,
      showShare: !prevState.showShare,
    }));
  };

  /**
   * share bar button clicked
   * @param {string} name to share
   */
  onShareBarClick(name) {
    handleShareBarClick(name, this.props);
  }

  /**
   * show autoplay render
   * @returns {JSX}
   */
  getAutoplayEl = () => {
    const {
      actions, running, progress, simple,
    } = this.props;
    const { showPlayButton } = this.state;
    return (
      <Fragment>
        {showPlayButton && (
          <div
            className={Styles.left}
            onClick={actions.togglePlaying}
            key="autoplay"
            role="presentation"
          >
            <button className={simple ? Styles.simpleControl : Styles.control}>
              {running ? (
                <Icon className={Styles.icon} name="pausecircle" size="small" />
              ) : (
                <Icon className={Styles.icon} name="playLegacy" size="small" />
              )}
              <ProgressCircle running={running} progress={progress} color="dark" />
            </button>
            {!simple && (
              <span> {running ? localization.get('stop') : localization.get('autoplay')} </span>
            )}
          </div>
        )}
      </Fragment>
    );
  };

  /**
   * show share render
   * @returns {JSX}
   */
  getShareEl = () => {
    const { sharingOptions } = this.props;
    const { showShare } = this.state;
    return (
      <Fragment>
        {showShare && (
          <div key="shareIcon" className={Styles.shareIcon}>
            <button className={Styles.arrow} onClick={this.onShareIconClick}>
              <Icon name="share" size="xsmall" />
            </button>
          </div>
        )}
        <div
          className={classnames(showShare ? Styles.hide : Styles.show, Styles.shareButtons)}
          key="shareBar"
        >
          <ShareBar
            iconSize="xsmall"
            className={Styles.show}
            sharingOptions={sharingOptions}
            theme="light"
            showComparte={false}
            device="mobile"
            compact
            onClick={this.onShareBarClick}
          />
          <button className={Styles.closeIcon} onClick={this.onShareIconClick}>
            <Icon name="close" size="xsmall" />
          </button>
        </div>
      </Fragment>
    );
  };

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const {
      actions,
      activeSlideId,
      activeSlideNumber,
      className,
      device,
      endSlideNumber,
      inline,
      isEndOfSlideshow,
      isLead,
      progress,
      reaction,
      running,
      sharingOptions,
      simple,
      slides,
      theme,
    } = this.props;
    const { showShare, showArrows } = this.state;
    const autoplayEl = this.getAutoplayEl();
    const shareEl = this.getShareEl();
    const isFirstSlide = activeSlideNumber === 0;
    const classNames = classnames(className, {
      [Styles.isEndCard]: isEndOfSlideshow && slides,
    });

    return (
      <div className={classNames}>
        {isFirstSlide && !inline && !simple && (
          <OpenStatus
            actions={actions}
            activeSlideNumber={activeSlideNumber}
            autoplayEl={autoplayEl}
            device={device}
            endSlideNumber={endSlideNumber}
            onShareBarClick={this.onShareBarClick}
            reaction={reaction}
            shareEl={shareEl}
            sharingOptions={sharingOptions}
            showArrows={showArrows}
            showShare={showShare}
          />
        )}
        {reaction && !isFirstSlide && !simple && (
          <ReactionStatus
            actions={actions}
            activeSlideId={activeSlideId}
            activeSlideNumber={activeSlideNumber}
            device={device}
            endSlideNumber={endSlideNumber}
            onShareBarClick={this.onShareBarClick}
            prevSlideNumber={this.prevSlideNumber}
            reaction={reaction}
            shareEl={shareEl}
            sharingOptions={sharingOptions}
            showArrows={showArrows}
            showShare={showShare}
            theme={theme}
          />
        )}
        {!isFirstSlide && !reaction && !inline && !simple && (
          <DefaultStatus
            actions={actions}
            activeSlideNumber={activeSlideNumber}
            autoplayEl={autoplayEl}
            endSlideNumber={endSlideNumber}
            prevSlideNumber={this.prevSlideNumber}
            shareEl={shareEl}
            showArrows={showArrows}
          />
        )}
        {inline && !simple && (
          <InlineStatus
            actions={actions}
            activeSlideNumber={activeSlideNumber}
            endSlideNumber={endSlideNumber}
            isEndOfSlideshow={isEndOfSlideshow}
            isLead={isLead}
            prevSlideNumber={this.prevSlideNumber}
            progress={progress}
            running={running}
            showArrows={showArrows}
          />
        )}
        {/* Reaction slideshows do not have autoplay and therefore not status */}
        {simple && !reaction && (
          <SimpleStatus
            activeSlideNumber={activeSlideNumber}
            autoplayEl={autoplayEl}
            endSlideNumber={endSlideNumber}
            prevSlideNumber={this.prevSlideNumber}
          />
        )}
      </div>
    );
  }
}

/**
 * propTypes
 * @property {Object} actions The slideshow actions that come from SlideshowProvider
 * @property {function} actions.abortAutoplay Stops the slideshow autoplay completely
 * @property {function} actions.goToNextSlide Goes to the next slide
 * @property {function} actions.goToPrevSlide Goes to the previous slide
 * @property {function} actions.onShareClick Called when sharing the current slide
 * @property {function} actions.togglePlaying Toggles the slideshow autoplay
 * @property {string} activeSlideId The ID of the current slide
 * @property {number} activeSlideNumber The number of the current slide
 * @property {string} className The CSS class name for the Status component
 * @property {number} endSlideNumber The number of the final slide
 * @property {boolean} inline Determines if slideshow is an embed
 * @property {boolean} isEndOfSlideshow Determines if slideshow is at its end
 * @property {boolean} isLead Determine if current slide is a lead slide (opening card)
 * @property {number} progress The autoplay progress of the current slide
 * @property {Object} reaction The reaction slideshow data object
 * @property {boolean} running Determines if the slideshow autoplay is running
 * @property {Object} shareData The share data object
 * @property {Object} shareData.primaryTag The primary tag to be used when sharing the slide
 * @property {Object} shareData.title The title to be used when sharing the slide
 * @property {Object} shareData.uid The ID to be used when sharing the slide
 * @property {Object} sharingOptions The social network sharing options
 * @property {boolean} simple Determines if the Status component should be of type 'simple'
 * @property {array} slides The slideshow slide list
 */
Status.propTypes = {
  actions: PropTypes.shape({
    abortAutoplay: PropTypes.func,
    goToNextSlide: PropTypes.func,
    goToPrevSlide: PropTypes.func,
    onShareClick: PropTypes.func,
    togglePlaying: PropTypes.func,
  }).isRequired,
  activeSlideId: PropTypes.string,
  activeSlideNumber: PropTypes.number,
  className: PropTypes.string,
  device: PropTypes.string,
  endSlideNumber: PropTypes.number,
  inline: PropTypes.bool,
  isEndOfSlideshow: PropTypes.bool,
  isLead: PropTypes.bool,
  progress: PropTypes.number,
  reaction: PropTypes.object,
  running: PropTypes.bool,
  shareData: PropTypes.shape({
    primaryTag: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }),
  sharingOptions: PropTypes.object,
  simple: PropTypes.bool,
  slides: PropTypes.array,
  theme: PropTypes.object,
};

export default Status;
