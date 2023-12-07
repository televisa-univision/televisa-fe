import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { getKey, isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import Styles from './SwipeHandler.styles';

const AnimatedDiv = styled(motion.div)`
  ${Styles.animatedDiv}
`;

/**
 * Swipe to dismiss component
 * @returns {JSX}
 */
const SwipeHandler = ({
  children,
  controls,
  disableAnimation,
  disabled,
  maxOffset,
  swipeConfig,
  useGradient,
}) => {
  const isGlobalDisabled = !Object.keys(disabled).find(key => !disabled[key]);
  const [isDisabled, setIsDisabled] = useState(isGlobalDisabled);
  const [dragDirection, setDragDirection] = useState(null);

  /**
   * Check if tap is on a JW Slider element and disable swipe gesture if true
   * @param {Object} event the tap start event
   */
  const handleTapStart = (event) => {
    setIsDisabled(isGlobalDisabled);
    const isJWSliderElement = getKey(event, 'target.closest')
      && isValidFunction(event.target.closest)
      && (event.target.closest('.jw-slider-time') || event.target.closest('.jw-slider-volume'));

    const isResponsivePlaylist = getKey(event, 'target.closest')
      && isValidFunction(event.target.closest)
      && event.target.closest('#responsive-playlist-inner');

    if (isJWSliderElement || isResponsivePlaylist) {
      setIsDisabled(true);
    }
  };

  /**
   * Reset gesture handling when the tap ends
   */
  const handleTapEnd = () => {
    setIsDisabled(isGlobalDisabled);
  };

  /**
   * Check if the gesture was intentional
   * @param {Object} offset the drag offset
   * @param {Object} velocity the drag velocity
   * @param {string} axis the swipe axis
   * @returns {boolean}
   */
  const isIntentionalGesture = (offset, velocity, axis) => {
    const directionalOffset = offset[axis];
    const directionalVelocity = velocity?.[axis] ?? 0;

    if (directionalOffset * directionalVelocity > 10000) {
      return true;
    }

    return false;
  };

  /**
   * Get the allowable drag directions
   * @returns {string|boolean}
   */
  const getAllowedDragDirection = () => {
    const {
      down, left, right, up,
    } = disabled;

    if ((down && left && right && up) || isDisabled) {
      return false;
    }

    if ((up && down) || (dragDirection === 'x' && (!left || !right))) {
      return 'x';
    }

    if ((left && right) || (dragDirection === 'y' && (!up || !down))) {
      return 'y';
    }

    return true;
  };

  /**
   * Get the swipe state
   * @param {Object} offset the drag offset
   * @param {Object} velocity the drag velocity
   * @returns {Object}
   */
  const getSwipeState = (offset, velocity) => {
    const offsetX = getKey(offset, 'x', 0);
    const offsetY = getKey(offset, 'y', 0);

    if (dragDirection === 'x') {
      if (offsetX > 0 && !disabled.right) {
        return { direction: 'right', intentional: isIntentionalGesture(offset, velocity, 'x') };
      }

      if (offsetX < 0 && !disabled.left) {
        return { direction: 'left', intentional: isIntentionalGesture(offset, velocity, 'x') };
      }
    }

    if (dragDirection === 'y') {
      if (offsetY < 0 && !disabled.up) {
        return { direction: 'up', intentional: isIntentionalGesture(offset, velocity, 'y') };
      }

      if (offsetY > 0 && !disabled.down) {
        return { direction: 'down', intentional: isIntentionalGesture(offset, velocity, 'y') };
      }
    }

    return { direction: '', intentional: false };
  };

  /**
   * Handle swipe
   * @param {string} direction the direction of the swipe
   * @param {boolean} intentional was the swipe intentional
   */
  const handleSwipe = async (direction, intentional) => {
    const {
      failureTransition, onComplete, resetTransition, successTransition,
    } = swipeConfig[
      direction
    ];

    if (intentional) {
      await controls.start(successTransition);
      onComplete();

      if (resetTransition) {
        controls.start(resetTransition);
      }
    } else {
      controls.start(failureTransition);
    }

    setDragDirection(null);
  };

  /**
   * Handle a swipe event that did not pass the threshold
   */
  const handleResetState = useCallback(() => {
    controls.start({ x: 0, y: 0, transition: { duration: 0.2 } });
  }, [controls]);

  /**
   * Handle drag event to constrain direction
   * @param {Object} event the drag event
   * @param {Object} info the drag info
   */
  const handleDragStart = (event, info) => {
    const offsetX = getKey(info, 'offset.x');
    const offsetY = getKey(info, 'offset.y');

    if (Math.abs(offsetX) > Math.abs(offsetY)) {
      setDragDirection('x');
    } else {
      setDragDirection('y');
    }
  };

  /**
   * Handle drag end
   * @param {Object} event the drag event
   * @param {Object} info the drag info
   */
  const handleDragEnd = async (event, info) => {
    const { direction, intentional } = getSwipeState(
      getKey(info, 'offset', {}),
      getKey(info, 'velocity', {})
    );

    if (direction) {
      handleSwipe(direction, intentional);
    }
  };

  useEffect(() => {
    setIsDisabled(isGlobalDisabled);

    if (isGlobalDisabled) {
      handleResetState();
    }
  }, [handleResetState, isGlobalDisabled]);

  const allowedDragDirection = getAllowedDragDirection();

  return (
    <AnimatedDiv // this component controls tracking the drag movement
      animate={controls}
      disableAnimation={disableAnimation}
      drag={allowedDragDirection}
      dragConstraints={{ bottom: 0, left: 0, top: -maxOffset }}
      dragElastic={false}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onTap={handleTapEnd}
      onTapCancel={handleTapEnd}
      onTapStart={handleTapStart}
      useGradient={useGradient}
    >
      {children}
    </AnimatedDiv>
  );
};

const swipeConfigProps = PropTypes.shape({
  failureTransition: PropTypes.object,
  onComplete: PropTypes.func,
  resetTransition: PropTypes.object,
  successTransition: PropTypes.object,
});

/**
 * propTypes
 * @property {Object} controls The animation controls provided by framer-motion lib
 * @property {func} onDismiss The function called when the component is swiped
 */
SwipeHandler.propTypes = {
  children: PropTypes.node.isRequired,
  controls: PropTypes.shape({
    start: PropTypes.func,
  }).isRequired,
  disableAnimation: PropTypes.bool,
  disabled: PropTypes.shape({
    down: PropTypes.bool,
    left: PropTypes.bool,
    right: PropTypes.bool,
    up: PropTypes.bool,
  }).isRequired,
  maxOffset: PropTypes.number,
  swipeConfig: PropTypes.shape({
    down: swipeConfigProps,
    left: swipeConfigProps,
    right: swipeConfigProps,
    up: swipeConfigProps,
  }),
  useGradient: PropTypes.bool,
};

/**
 * Default props
 */
SwipeHandler.defaultProps = {
  disableAnimation: false,
  maxOffset: 0,
  swipeConfig: {
    down: {},
    left: {},
    right: {},
    up: {},
  },
  useGradient: false,
};

export default SwipeHandler;
