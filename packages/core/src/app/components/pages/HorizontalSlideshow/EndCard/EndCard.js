import React, { Component, Fragment } from 'react';
import debounce from 'lodash.debounce';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
  exists,
  getKey,
  locationRedirect,
  isValidFunction,
  isValidArray,
  toAbsoluteUrl,
} from '@univision/fe-commons/dist/utils/helpers';
import createTimer from '@univision/fe-commons/dist/utils/timer';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import Features from '@univision/fe-commons/dist/config/features';
import Store from '@univision/fe-commons/dist/store/store';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { shouldRefresh, hideAdByIds } from '@univision/fe-commons/dist/store/actions/ads-actions';
import { getDevice, getSharingOptions, getDomain } from '@univision/fe-commons/dist/store/storeHelpers';
import ProgressCircle from '@univision/fe-components-base/dist/components/ProgressCircle';

import ProgressBar from '@univision/fe-components-base/dist/components/ProgressBar';
import ContentCard from '@univision/fe-components-base/dist/components/ContentCard';
import Icon from '@univision/fe-icons/dist/components/Icon';
import ContentCardGrid from '@univision/fe-components-base/dist/components/widgets/ContentCardGrid';
import ShareBar from '@univision/fe-components-base/dist/components/ShareBar';
import Clickable from '@univision/fe-components-base/dist/components/Clickable';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import { handleShareBarClick } from '../helpers';
import Styles from './EndCard.scss';

/**
 * EndCard component
 */
class EndCard extends Component {
  /**
   * Constructor
   * @param {Object} props props
   */
  constructor(props) {
    super(props);

    this.timeout = null;
    this.domain = getDomain(Store);
    this.container = React.createRef();

    if (exists(props.data) && props.data.length) {
      this.data = this.dataMapping();
    }

    this.onShareBarClick = this.onShareBarClick.bind(this);
    this.debounceTimerControl = debounce(this.timerControl, 100).bind(this);
    this.onRelatedGalleryClick = this.onRelatedGalleryClick.bind(this);
    this.onRestartClick = this.onRestartClick.bind(this);
    this.onIntervalEnd = this.onIntervalEnd.bind(this);

    this.state = {
      timerRunning: false,
      timerFrame: 0,
      activeSlideProgress: 0,
    };
  }

  /**
   * React life cycle
   */
  componentDidMount() {
    window.addEventListener('visibilitychange', this.onVisibilityChange);
    window.addEventListener('scroll', this.debounceTimerControl);
    // check autoplay the first time
    if (!this.timer) {
      this.timerControl();
    }
    this.hideBottomAdAndStatus(true);
  }

  /**
   * Cleanup event listeners
   */
  componentWillUnmount() {
    window.removeEventListener('visibilitychange', this.onVisibilityChange);
    window.removeEventListener('scroll', this.debounceTimerControl);
    this.hideBottomAdAndStatus();
    clearTimeout(this.timeout);
    if (this.timer) {
      this.timer.cancel();
    }
  }

  /**
   * Handle state of time running
   */
  onTogglePlaying = () => {
    /* eslint-disable react/destructuring-assignment */
    if (this.timer) {
      this.setState(prevState => ({ timerRunning: !prevState.timerRunning }));
      if (this.state.timerRunning) {
        this.timer.stop();
      } else {
        this.timer.start();
      }
    }
  };

  /**
   * Handle related galleries
   * @param {event} event - click event
   */
  onRelatedGalleryClick(event) {
    if (event && isValidFunction(event.preventDefault)) {
      event.preventDefault();
      const uri = event.currentTarget.getAttribute('data-href');
      const { shareData: { uid, title, primaryTag } } = this.props;
      // Related Gallery tracking
      SlideshowTracker.track(SlideshowTracker.events.relatedGallery, {
        uid,
        title,
        primaryTag,
      });
      // Wait for the tracking and then redirect
      this.timeout = setTimeout(() => {
        global.window.location = toAbsoluteUrl(uri, this.domain);
      }, 500);
    }
  }

  /**
   * Call the callback & reset the state
   */
  onRestartClick() {
    const { onRestartClick } = this.props;

    if (this.timer) {
      this.resetTimer();
    }
    this.hideBottomAdAndStatus();
    onRestartClick();
  }

  /**
   * Callback when interval is completed
   */
  onIntervalEnd() {
    const { data } = this.props;
    const redirectUrl = data[0] && data[0].url;

    this.resetTimer();
    locationRedirect(`${redirectUrl}?auto=true`)();
  }

  /**
   * handle share button callback
   * @param {string} name to share
   * @param {Object} shareData shareData
   */
  onShareBarClick(name) {
    this.pauseTimer();
    handleShareBarClick(name, this.props);
  }

  /**
   * Pause the autoplay when visibility change
   */
  onVisibilityChange = () => {
    if (document && document.visibilityState === 'hidden') {
      this.pauseTimer();
    }
  };

  /**
   * on current tick callback
   * @param {number} tick current tick
   */
  onCurrentTick = (tick) => {
    const { autoplayDuration, slideshowType } = this.props;
    const duration = slideshowType === 'horizontal'
      ? autoplayDuration * 1000
      : autoplayDuration;

    this.setState({
      timerFrame: tick,
      activeSlideProgress: tick / duration,
    });
  };

  /**
   * Get replay button
   * @param {Function} onRestartClick callback method
   * @returns {JSX}
   */
  getReplayEl = () => (
    <Clickable
      label={localization.get('watchAgain')}
      onClick={this.onRestartClick}
      className={Styles.replay}
      type="button"
      icon="replay"
      size="medium"
      reverse
    />
  );

  // Get overlay element
  getOverlayEl = () => {
    const { showPlayButton } = this.state;
    return (
      <div
        className={classnames(showPlayButton ? Styles.show : Styles.hide, Styles.playControl)}
        role="presentation"
      >
        {this.renderAutoplayBtn()}
      </div>
    );
  };

  /**
   * Gets the correct background image for the end card
   * @returns {string} image URL
   */
  getBackgroundImage() {
    const { mainSlide } = this.props;
    const isDesktop = getDevice(Store) === 'desktop';

    if (isDesktop) return getKey(mainSlide, 'image.renditions.original.href', '');

    return getKey(mainSlide, 'image.renditions.slideshow-4x3-vertical-mobile.href', '');
  }

  /**
   * Hide the bottom Ad when endCard is mounted
   * @param {boolean} value to apply
   */
  hideBottomAdAndStatus = (value) => {
    Store.dispatch(hideAdByIds([]));
    Store.dispatch(shouldRefresh(false));
    if (value && getDevice(Store) !== 'desktop') {
      Store.dispatch(hideAdByIds([AdTypes.SLIDESHOW_BOT_AD]));
    }
  };

  /**
   * Show the play button when the end card is visible
   */
  timerControl = () => {
    const { timerFrame } = this.state;

    if (
      this.container
      && this.container.current
      && Features.slideshows.horizontal.endCardAutoplayEnabled()
    ) {
      const rect = this.container.current.getBoundingClientRect();
      if (rect.top <= 150 && rect.top >= -250) {
        /* istanbul ignore next */
        if (!timerFrame) {
          this.setState({ timerRunning: true, showPlayButton: true }, () => {
            this.initTimer();
          });
        }
      } else if (this.timer) {
        this.pauseTimer();
      }
    }
  };

  /**
   * Pause the timer
   */
  pauseTimer = () => {
    this.setState({ timerRunning: false });
    if (this.timer) {
      this.timer.stop();
    }
  };

  /**
   * Clear the current timer
   */
  resetTimer = () => {
    this.timer.cancel();
    this.setState({
      showPlayButton: false,
      timerRunning: false,
      timerFrame: 0,
      activeSlideProgress: 0,
    });
  };

  /**
   * Setup a timer
   * @param {number} tick current tick
   */
  initTimer = () => {
    const { autoplayDuration, slideshowType } = this.props;

    if (this.timer) {
      this.timer.cancel();
    }

    const timerInterval = slideshowType === 'horizontal' ? 100 : 1000;
    this.timer = createTimer(
      autoplayDuration,
      this.onIntervalEnd,
      this.onCurrentTick,
      timerInterval
    );
  };

  // Convert the props data
  dataMapping = () => {
    const {
      data,
      shareData: { primaryTag },
    } = this.props;
    let dataMapped = [];
    const contentLimit = getDevice(Store) !== 'desktop' ? 3 : 5;
    if (exists(data)) {
      dataMapped = data
        .filter((val, id) => id < contentLimit)
        .map((element, index) => {
          const {
            mainImage, title, url, slideCount,
          } = element;

          return {
            image: mainImage,
            uri: url,
            type: 'slideshow',
            uid: getKey(mainImage, 'uid', index),
            iconContent: slideCount,
            showTag: getDevice(Store) === 'desktop',
            primaryTag,
            title,
          };
        });
    }
    return dataMapped;
  };

  // Render the autoplay button
  renderAutoplayBtn = () => {
    const { activeSlideProgress: progress, timerRunning: running } = this.state;
    const labelText = running ? localization.get('stop') : localization.get('autoplay');
    const label = (
      <Fragment>
        <ProgressCircle running={running} progress={progress} color="white" key="progress" />
        <span key="span">{labelText}</span>
      </Fragment>
    );

    return (
      <Clickable
        className={Styles.icon}
        type="button"
        icon={running ? 'pause-circle' : 'play'}
        label={label}
        size="medium"
        onClick={this.onTogglePlaying}
        reverse
      />
    );
  };

  /**
   * Renders transparent black overlay for a relatively positioned parent
   * @returns {JSX}
   */
  // eslint-disable-next-line
  renderOverlay() {
    return <div className={Styles.nextSlideshowsListOverlay} />;
  }

  /**
   * Render a list of the next related slideshows
   * @param {Object} options component options
   * @param {boolean} options.withBackgroundImage determines if the list container should have the
   *  main image of the finished slideshow as a background
   * @returns {JSX}
   */
  renderNextSlideshowsList({ withBackgroundImage = false } = {}) {
    const { activeSlideProgress: progress, timerRunning: running, timerFrame } = this.state;
    const { autoplayDuration } = this.props;
    const secondsUntilNextGallery = Math.round(autoplayDuration - (timerFrame / 1000));
    let backgroundImageStyle = {};

    if (withBackgroundImage) {
      const backgroundImage = this.getBackgroundImage();
      backgroundImageStyle = { backgroundImage: `url(${backgroundImage})` };
    }

    return (
      <div
        className={Styles.nextSlideshowsListContainer}
        style={backgroundImageStyle}
      >
        {this.renderOverlay()}
        <ProgressBar
          percent={progress * 100}
          strokeColor="#FFFFFF"
          trailSize={3}
          trailColor="#747474"
        />
        <div className={Styles.nextGalleryInContainer}>
          <button className={Styles.autoplayButton} onClick={this.onTogglePlaying}>
            {running
              ? (
                <Icon className={Styles.icon} fill="#FFFFFF" name="pausecircle" size="small" />
              )
              : (
                <Icon
                  className={Styles.icon}
                  fill="#FFFFFF"
                  name="playcircle"
                  size="small"
                />
              )
            }
            <ProgressCircle running={running} progress={progress} color="white" size={24} />
          </button>
          <span>
            {localization.get('nextGalleryIn').toUpperCase()} {secondsUntilNextGallery}
          </span>
        </div>

        {isValidArray(this.data) && this.data.map((card, idx) => (
          <div
            className={classnames(Styles.cardItem, {
              [Styles.cardItemWithBorder]: idx !== 0,
            })}
          >
            <ContentCard
              {...card}
              device={getDevice(Store)}
              onClick={this.onRelatedGalleryClick}
              showDesc={false}
              variant="dark"
              view="horizontal"
            />
          </div>
        ))}
      </div>
    );
  }

  /**
   * Renders end card for desktop devices
   * @returns {JSX}
   */
  renderHorizontalSlideshowDesktopEndCard() {
    const { sharingOptions } = this.props;
    const backgroundImage = this.getBackgroundImage();
    const backgroundImageStyle = { backgroundImage: `url(${backgroundImage})` };

    return (
      <div className={Styles.horizontalSlideshowDesktopEndCard}>
        <div
          className={Styles.horizontalSlideshowDesktopEndCardLeft}
          style={backgroundImageStyle}
        >
          <ShareBar
            centerAll
            device="desktop"
            onClick={this.onShareBarClick}
            padLeft={false}
            sharingOptions={sharingOptions || getSharingOptions(Store)}
            showShareClue
            theme="rounded"
          />
          {this.renderOverlay()}
        </div>
        {this.renderNextSlideshowsList()}
      </div>
    );
  }

  /**
   * Render end card for vertical slideshows
   * @returns {JSX}
   */
  renderVerticalSlideshowEndCard() {
    const {
      className,
      shareData,
      sharingOptions,
      slideshowType,
    } = this.props;

    return (
      <div
        data-element-name="vertical-slideshow-end-card"
        className={classnames(Styles[slideshowType], Styles.endCard, className || '', 'row')}
        ref={this.container}
      >
        <div className={Styles.header}>
          <div className={Styles.textWrapper}>
            <span>{localization.get('youWereWatching')}: </span>
            <h3>{shareData.title}</h3>
          </div>
          <div className={Styles.shareWrapper}>
            {this.getReplayEl()}
            <ShareBar
              className={Styles.shareBar}
              sharingOptions={sharingOptions || getSharingOptions(Store)}
              onClick={this.onShareBarClick}
            />
          </div>
        </div>
        {exists(this.data) && (
          <div className={Styles.imagesContainer}>
            {getDevice(Store) !== 'desktop' && (
              <span className={Styles.subtitle}>A continuación:</span>
            )}
            <ContentCardGrid
              leadAlignment="left"
              device="desktop"
              content={this.data}
              className={Styles.contentCardGrid}
              overlay={this.getOverlayEl()}
              withAd={false}
              onClick={this.onRelatedGalleryClick}
              mobileAsTabletView
            />
          </div>
        )}
        <div className={Styles.footer}>{this.getReplayEl()}</div>
      </div>
    );
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const { slideshowType } = this.props;

    if (
      slideshowType === 'horizontal'
      && Features.slideshows.horizontal.stitchingEnabled()
    ) {
      return (
        <div ref={this.container}>
          {
            getDevice(Store) === 'desktop'
              ? this.renderHorizontalSlideshowDesktopEndCard()
              : this.renderNextSlideshowsList({ withBackgroundImage: true })
          }
        </div>
      );
    }

    return this.renderVerticalSlideshowEndCard();
  }
}

/**
 * propTypes
 * @property {Object} mainSlide the first image of the slideshow
 * @property {Object} mainSlide.image the actual main image
 * @property {Object} mainSlide.image.renditions the object with all the available image sizes
 * @property {Array} data a list of the slideshow's slides
 * @property {Object} shareData the data needed to share the slideshow
 * @property {string} shareData.title the slideshow title
 * @property {string} shareData.uid the slideshow ID
 * @property {Object} shareData.primaryTag the slideshow primary tag
 * @property {number} autoplayDuration how long it takes before the autoplay next slideshow fires
 * @property {Function} onRestartClick handler for when slideshow restart CTA is clicked
 * @property {string} className CSS class name for the EndCard component
 * @property {string} sharingOptions the data that has all the platforms where the slideshow can
 * be shared to
 * @property {string} slideshowType the type of the slideshow, either 'vertical' or 'horizontal'
 */
EndCard.propTypes = {
  mainSlide: PropTypes.shape({
    image: PropTypes.shape({
      renditions: PropTypes.object,
    }),
  }),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      mainImage: PropTypes.object.isRequired,
      slideCount: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  shareData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    primaryTag: PropTypes.object.isRequired,
  }).isRequired,
  autoplayDuration: PropTypes.number,
  onRestartClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  sharingOptions: PropTypes.object,
  slideshowType: PropTypes.oneOf(['vertical', 'horizontal']),
};

EndCard.defaultProps = {
  autoplayDuration: 7,
  slideshowType: 'horizontal',
};

export default EndCard;
