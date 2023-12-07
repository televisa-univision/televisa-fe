import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Styles from './ProgressCircle.scss';

/**
 * Linear tween function
 * @param {number} currentTime the current time of animation
 * @param {number} initialValue the intitial tween value
 * @param {number} targetValue the target tween value
 * @param {number} duration the duration of the animation
 * @returns {number}
 */
export const tweenLinear = (currentTime, initialValue, targetValue, duration) => {
  const distance = targetValue - initialValue;
  return ((distance * currentTime) / duration) + initialValue;
};

/**
 * Progress indicator for autoplay slideshow
 */
class Progress extends Component {
  /**
   * Set component initial state
   * @param {Object} props the component props
   */
  constructor(props) {
    super(props);

    this.data = {
      startValue: 0,
      currentTime: 0,
      startTime: null,
      rafId: null,
      progress: 0,
      offset: (props.onlyStroke ? props.size : props.size / 2) * Math.PI,
    };
    this.indicator = React.createRef();
  }

  /**
   * Setup the animation
   */
  componentDidMount = () => {
    this.startAnimation();
  };

  /* eslint camelcase: "off" */
  /* eslint-disable react/sort-comp */
  /**
   * Component will update
   * @param {Object} nextProps the next props
   */
  UNSAFE_componentWillUpdate(nextProps) {
    const { progress } = this.props;

    if (nextProps.progress !== progress) {
      this.data.startTime = null;
      this.data.startValue = progress;
      this.data.endValue = nextProps.progress;

      if (nextProps.progress === 0) {
        this.abortAnimation();
      }
    }
  }

  /**
   * Component did update
   * @param {Object} prevProps the previous props
   */
  componentDidUpdate(prevProps) {
    const { progress, running } = this.props;

    if (!prevProps.running && running) {
      this.data.startTime = performance.now() - this.data.currentTime;
      this.animationStep(performance.now());
    }

    if (progress === 0) {
      this.data.startValue = 0;
      this.data.currentTime = 0;
      this.data.startTime = null;
      this.startAnimation();
    }
  }

  /**
   * Abort timer on unmount
   */
  componentWillUnmount() {
    this.abortAnimation();
  }

  /**
   * Animate the progress indicator
   * @param {number} timestamp current frame
   */
  animationStep = (timestamp) => {
    const { running } = this.props;

    if (!this.data.startTime) {
      this.data.startTime = timestamp;
    }

    this.data.currentTime = timestamp - this.data.startTime;

    const position = tweenLinear(
      this.data.currentTime,
      this.data.startValue,
      this.data.endValue,
      1000,
    );
    const progress = Number.isNaN(position) ? 0 : position * this.data.offset;
    this.data.progress = progress > this.data.progress
    || progress === 0 ? progress : this.data.progress;

    if (this.indicator.current) {
      this.indicator.current.style.stroke = this.data.progress === 0 ? 'transparent' : null;
      this.indicator.current.style.strokeDasharray = `${this.data.progress}, ${this.data.offset - this.data.progress}`;
    }

    if (running) {
      this.data.rafId = window.requestAnimationFrame(this.animationStep);
    }
  };

  /**
   * Start the animation
   */
  startAnimation = () => {
    this.data.rafId = window.requestAnimationFrame(this.animationStep);
  };

  /**
   * Stop the animation
   */
  abortAnimation = () => {
    window.cancelAnimationFrame(this.data.rafId);
  };

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    const { size, color, onlyStroke } = this.props;

    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={classnames(Styles.indicator, Styles[color], { [Styles.onlyStroke]: onlyStroke })}
      >
        {onlyStroke && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size / 2) - 2}
            className={Styles.onlyStrokeBackground}

            style={{
              strokeDashoffset: 0,
              strokeWidth: 1,
              strokeDasharray: 100,
            }}
          />
        )}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={onlyStroke ? (size / 2) - 2 : size / 4}
          ref={this.indicator}
          style={{
            strokeDashoffset: (size / 8) * Math.PI,
            strokeWidth: onlyStroke ? 1 : size / 2,
            strokeDasharray: `0, ${(size / 2) * Math.PI}`,
          }}
        />
      </svg>
    );
  }
}

Progress.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  running: PropTypes.bool,
  progress: PropTypes.number,
  onlyStroke: PropTypes.bool,
};

Progress.defaultProps = {
  size: 24,
  color: '',
};

export default Progress;
