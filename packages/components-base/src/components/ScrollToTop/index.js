import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isValidFunction } from '@univision/fe-commons/dist/utils/helpers';

import Styles from './ScrollToTop.scss';

/**
 * Detect if the browser supports passive events
 * @returns {boolean}
 */
export const supportsPassive = () => {
  if (
    typeof window === 'object'
    && isValidFunction(window.addEventListener)
    && isValidFunction(Object.defineProperty)
  ) {
    let passive = false;
    const options = Object.defineProperty({}, 'passive', {
      /* eslint-disable getter-return */
      get() {
        passive = true;
      },
    });
    window.addEventListener('test', null, options);
    return passive;
  }

  return false;
};

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
  return (distance * currentTime) / duration + initialValue;
};

/**
 * ScrollToTop Component
 */
class ScrollToTop extends Component {
  /**
   * Setup component state
   */
  constructor() {
    super();

    this.state = { visible: false };
    this.data = {
      startValue: 0,
      currentTime: 0,
      startTime: null,
      rafId: null,
    };
  }

  /**
   * Setup event listeners on mount
   */
  componentDidMount() {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener(
      'touchstart',
      this.abortScroll,
      supportsPassive() ? { passive: true } : false
    );
  }

  /**
   * Avoid unecessary renders
   * @param {Object} nextProps the next set of props
   * @param {Object} nextState the next state
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    const { visible } = this.state;
    return nextState.visible !== visible;
  }

  /**
   * Cleanup event listeners
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('touchstart', this.abortScroll, false);
  }

  /**
   * Determine whether to show or hide the scroll up button
   */
  handleScroll = () => {
    const {
      props: { showAtOffset },
      state: { visible },
    } = this;

    if (window.pageYOffset > showAtOffset) {
      if (!visible) {
        this.setState({ visible: true });
      }
    } else if (visible) {
      this.setState({ visible: false });
    }
  };

  /**
   * Handle click event to trigger scroll to top
   */
  handleClick = () => {
    this.abortScroll();
    this.data.startValue = window.pageYOffset;
    this.data.currentTime = 0;
    this.data.startTime = null;
    this.data.rafId = window.requestAnimationFrame(this.scrollStep);
  };

  /**
   * Manage the scroll to top
   * @param {number} timestamp the RAF timestamp
   */
  scrollStep = (timestamp) => {
    const { topOffset, duration } = this.props;
    if (!this.data.startTime) {
      this.data.startTime = timestamp;
    }

    this.data.currentTime = timestamp - this.data.startTime;

    const position = tweenLinear(this.data.currentTime, this.data.startValue, topOffset, duration);

    if (window.pageYOffset <= topOffset) {
      this.abortScroll();
    } else {
      window.scrollTo(window.pageYOffset, position);
      this.data.rafId = window.requestAnimationFrame(this.scrollStep);
    }
  };

  /**
   * Stop the animation
   */
  abortScroll = () => {
    window.cancelAnimationFrame(this.data.rafId);
  };

  /**
   * Render
   * @returns {jsx}
   */
  render() {
    const { visible } = this.state;
    const className = `${Styles.button} ${visible ? Styles.visible : ''}`;
    /* eslint-disable react/button-has-type */
    return <button onClick={this.handleClick} className={className} />;
  }
}

ScrollToTop.propTypes = {
  showAtOffset: PropTypes.number,
  topOffset: PropTypes.number,
  duration: PropTypes.number,
};

ScrollToTop.defaultProps = {
  showAtOffset: 400,
  topOffset: 0,
  duration: 200,
};

export default ScrollToTop;
