import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import VisibilitySensor from 'react-visibility-sensor';

import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import Icon from '@univision/fe-icons/dist/components/Icon';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import { VISIBILITY_SENSOR_SCROLL_THROTTLE } from '@univision/fe-commons/dist/constants/spa';

import CoreSlider from '../../CoreSlider';
import FeaturedCard from '../../FeaturedCard';
import ProgressCircle from '../../ProgressCircle';

import Styles from './FeaturedCardCarousel.scss';

/**
 * FeaturedCardCarousel class components
 */
class FeaturedCardCarousel extends PureComponent {
  /**
   * Props
   * @property {number} [autoplayDuration = 5] - autoplay duration in seconds
   * @property {Array} content - featured card content
   * @property {string} device - current device
   * @property {bool} [disableAutoplay = false] - disables autoplay
   * @property {Object} theme - theme settings
   * @property {Object} widgetContext - widget context
   */
  static propTypes = {
    autoplayDuration: PropTypes.number,
    content: PropTypes.array.isRequired,
    device: PropTypes.oneOf(['desktop', 'tablet', 'mobile']),
    disableAutoplay: PropTypes.bool,
    theme: PropTypes.object,
    widgetContext: PropTypes.object,
  }

  static defaultProps = {
    autoplayDuration: 5,
    device: 'mobile',
    theme: {},
    widgetContext: {},
  }

  /**
   * getFeaturedCard
   * @param {Object} item - featured card item
   * @param {Object} widgetContext - widget context
   * @param {string} device - current device
   * @param {bool} hasAutoPlayControls - true if it has autoplay controls
   * @returns {JSX}
   */
  static getFeaturedCard(item, widgetContext, device, hasAutoPlayControls) {
    const props = {
      ...item,
      duration: item.durationString,
      showPlayer: item.type === 'video' && !item.longform,
      device,
      widgetContext,
      hasAutoPlayControls,
    };

    if (item.type === 'video') {
      Object.assign(props, {
        ...props,
        autoplay: false,
        mcpId: item.mcpid,
      });
    }

    return (
      <div key={item.uid}>
        <FeaturedCard {...props} />
      </div>
    );
  }

  /**
   * Constructor
   * @param {Object} props - component props
   */
  constructor(props) {
    super(props);

    const {
      content, widgetContext, device, disableAutoplay,
    } = props;
    this.slider = React.createRef();
    this.timer = null;
    this.content = isValidArray(content)
      && content
        .slice(0, 5)
        .map(item => FeaturedCardCarousel
          .getFeaturedCard(item, widgetContext, device, content.length > 1));
    this.placeHolder = content && this.content[0];
    this.sliderSettings = content && this.getSliderSettings(widgetContext);

    this.onChangeSlide = this.onChangeSlide.bind(this);

    this.state = {
      currentSlide: 0,
      timerRunning: !disableAutoplay,
      timerFrame: 0,
      activeSlideProgress: 0,
      shouldContinuePlaying: false,
    };
  }

  /**
   * componentDidMount cycle
   */
  componentDidMount() {
    const { disableAutoplay } = this.props;

    if (!disableAutoplay) {
      this.initTimer();
      // Add visibilitychange listener
      document.addEventListener('visibilitychange', this.onVisibilityChange);
    }
  }

  /**
   * Clear the timer on unmount
   */
  componentWillUnmount() {
    const { disableAutoplay } = this.props;

    if (!disableAutoplay) {
      clearInterval(this.timer);
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
    }
  }

  /**
   * onChangeSlide
   * @param {number} currentSlide - current slide
   */
  onChangeSlide(currentSlide) {
    const { currentSlide: oldSlide } = this.state;

    if (oldSlide !== currentSlide) {
      this.setState({
        currentSlide,
      });
    }
  }

  /**
   * getSliderSettings
   * @param {Object} widgetContext - widget context
   * @returns {Object}
   */
  getSliderSettings(widgetContext) {
    return {
      infinite: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 728,
          settings: {
            arrows: false,
          },
        },
      ],
      onSwipe: () => {
        this.cancelTimer();
        WidgetTracker.track(WidgetTracker.events.click, { widgetContext, target: 'feature_nav' });
      },
    };
  }

  /**
   * Pause the autoplay when visibility change by focus view
   */
  onVisibilityChange = () => {
    if (document && document.visibilityState) {
      this.handleSlideVisibilityChange(document.visibilityState !== 'hidden');
    }
  };

  /**
   * renders navigation
   * @returns {JSX}
   */
  get navigation() {
    const {
      content,
      state: {
        currentSlide,
        activeSlideProgress,
        timerRunning,
      },
      props: {
        disableAutoplay,
      },
    } = this;

    return (
      <div className={Styles.navigation}>
        <div className={Styles.navigationWrapper}>
          {!disableAutoplay && (
            <div className={Styles.autoPlayWrapper}>
              <button className={Styles.control} onClick={this.togglePlaying}>
                <div className={Styles.pausePlayButton}>
                  <div className={classnames(Styles.pause, { [Styles.play]: !timerRunning })} />
                  <ProgressCircle progress={activeSlideProgress} color="autoplay" running={timerRunning} size={28} onlyStroke />
                </div>
                <span> {timerRunning ? localization.get('stop') : localization.get('autoplay')} </span>
              </button>
            </div>
          )}
          <div className={Styles.pagination}>
            <button
              onClick={this.goToPreviousSlide}
              className={classnames(Styles.resetButton, Styles.arrowLeft)}
            >
              <Icon name="arrowLeft" fill="white" size={40} />
            </button>
            {Array.from({ length: content.length }, (v, i) => (
              <button
                className={classnames(Styles.dot, Styles.resetButton,
                  { [Styles.active]: i === currentSlide })}
                key={`FeaturedCardDot${i}`}
                onClick={e => this.goToSlide(i, true, e)}
              />
            ))}
            <button
              onClick={e => this.goToNextSlide(true, e)}
              className={classnames(Styles.resetButton, Styles.arrowRight)}
            >
              <Icon name="arrowRight" fill="white" size={40} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Pause the autoplay when the component is no longer in view
   * @param {bool} isVisible - true if visible
   */
  handleSlideVisibilityChange = (isVisible) => {
    const { timerRunning, shouldContinuePlaying } = this.state;

    if (!isVisible && timerRunning) {
      this.setState({
        timerRunning: false,
        shouldContinuePlaying: true,
      });
    }

    if (isVisible && shouldContinuePlaying) {
      this.setState({
        timerRunning: true,
        shouldContinuePlaying: false,
      });
    }
  };

  /**
   * Toggle auto play button
   */
  togglePlaying = () => {
    if (this.timer === null) {
      this.setState({
        timerRunning: true,
      }, this.initTimer());
    } else {
      this.setState(({ timerRunning }) => ({
        timerRunning: !timerRunning,
      }));
    }
  }

  /**
   * Setup a timer
   */
  initTimer = () => {
    const { autoplayDuration } = this.props;

    this.timer = setInterval(() => {
      const { timerRunning, timerFrame } = this.state;

      if (timerRunning) {
        if (timerFrame < autoplayDuration) {
          this.setState(state => ({
            timerFrame: state.timerFrame + 1,
            activeSlideProgress: (state.timerFrame + 1) / autoplayDuration,
          }));
        } else {
          this.setState({
            timerFrame: 0,
            activeSlideProgress: 0,
          });

          this.goToNextSlide(false);
        }
      }
    }, 1000);
  };

  /**
   * Cancel the timer
   */
  cancelTimer = () => {
    clearInterval(this.timer);
    this.timer = null;

    this.setState({
      timerRunning: false,
      timerFrame: 0,
      activeSlideProgress: 0,
    });
  };

  /**
   * goToSlide method
   * @param {number} slide - slide to go
   * @param {bool} cancelAutoplay - true to cancel autoplay
   */
  goToSlide = (slide, cancelAutoplay) => {
    const {
      state: {
        currentSlide: oldSlide,
      },
      props: {
        disableAutoplay,
        widgetContext,
      },
    } = this;

    if (cancelAutoplay && !disableAutoplay) {
      this.cancelTimer();
    }

    if (this.slider.current && oldSlide !== slide) {
      this.slider.current.goToSlide(slide);

      if (cancelAutoplay) {
        WidgetTracker.track(WidgetTracker.events.click, { widgetContext, target: 'nav_arrow' });
      }
    }
  }

  /**
   * goToNextSlide method
   * @param {bool} cancelAutoplay - true to cancel autoplay
   */
  goToNextSlide = (cancelAutoplay) => {
    const { state: { currentSlide }, content } = this;
    const newSlide = currentSlide + 2 > content.length ? content.length : currentSlide + 1;
    this.goToSlide(newSlide, cancelAutoplay);
  }

  /**
   * goToNextSlide method
   */
  goToPreviousSlide = () => {
    const { state: { currentSlide }, content } = this;
    const newSlide = currentSlide - 1 < 0 ? content.length - 1 : currentSlide - 1;
    this.goToSlide(newSlide, true);
  }

  /**
   * Render method
   * @returns {?JSX}
   */
  render() {
    const {
      content,
      placeHolder,
      sliderSettings,
      navigation,
      props: {
        disableAutoplay,
      },
    } = this;

    if (!content) return null;

    if (content.length > 1) {
      return (
        <VisibilitySensor
          partialVisibility
          active={!disableAutoplay}
          minTopValue={300}
          scrollCheck
          intervalCheck={false}
          scrollThrottle={VISIBILITY_SENSOR_SCROLL_THROTTLE}
          onChange={
            this.handleSlideVisibilityChange
          }
        >
          <div className={`uvs-widget ${Styles.wrapper}`}>
            <CoreSlider
              tooltip
              tooltipClass={Styles.tooltip}
              placeholder={placeHolder}
              settings={sliderSettings}
              onChangeSlide={this.onChangeSlide}
              ref={this.slider}
            >
              {content}
            </CoreSlider>
            {navigation}
          </div>
        </VisibilitySensor>
      );
    }

    return (
      <div className={`uvs-widget ${Styles.wrapper}`}>
        {placeHolder}
      </div>
    );
  }
}

export default FeaturedCardCarousel;
