import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAnimation } from 'framer-motion';

import { isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import SwipeHandler from '@univision/fe-components-base/dist/components/SwipeHandler';

/**
 * Control swipes on the player component
 * @returns {JSX}
 */
function PlayerSwipeController({
  children,
  disabled,
  disableUp,
  isExpanded,
  maxOffset,
  onChange,
  onClose,
  useGradient,
}) {
  const controls = useAnimation();

  const swipeConfig = {
    down: {
      onComplete: () => {
        if (isValidFunction(onChange)) {
          onChange(false);
        }
      },
      successTransition: {
        x: 0,
        y: '0',
        transition: { duration: 0.2 },
      },
      failureTransition: {
        x: 0,
        y: `-${maxOffset}px`,
        transition: { duration: 0.2 },
      },
    },
    right: {
      onComplete: () => {
        if (isValidFunction(onChange)) {
          onClose();
        }
      },
      resetTransition: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: { duration: 0 },
      },
      successTransition: {
        x: '120%',
        y: 0,
        opacity: 0,
        transition: { duration: 0.2 },
      },
      failureTransition: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: { duration: 0.2 },
      },
    },
    up: {
      onComplete: () => {
        if (isValidFunction(onChange)) {
          onChange(true);
        }
      },
      successTransition: {
        x: 0,
        y: `-${maxOffset}px`,
        transition: { duration: 0.2 },
      },
      failureTransition: {
        x: 0,
        y: 0,
        transition: { duration: 0.2 },
      },
    },
  };

  /**
   * Get the disabled state
   * @returns {Object}
   */
  const getDisabledState = () => {
    const defaultState = {
      down: true,
      left: true,
      right: false,
      up: !!disableUp,
    };

    if (disabled) {
      defaultState.right = true;
      defaultState.up = true;
    } else if (isExpanded) {
      defaultState.down = false;
      defaultState.right = true;
      defaultState.up = true;
    }

    return defaultState;
  };

  useEffect(() => {
    if (isExpanded) {
      controls.start(swipeConfig.up.successTransition);
    } else {
      controls.start(swipeConfig.down.successTransition);
    }
  }, [controls, isExpanded, swipeConfig]);

  return (
    <SwipeHandler
      controls={controls}
      disableAnimation={disabled}
      disabled={getDisabledState()}
      maxOffset={maxOffset}
      swipeConfig={swipeConfig}
      useGradient={useGradient}
    >
      {children}
    </SwipeHandler>
  );
}

PlayerSwipeController.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  disableUp: PropTypes.bool,
  isExpanded: PropTypes.bool,
  maxOffset: PropTypes.number,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  useGradient: PropTypes.bool,
};

PlayerSwipeController.defaultProps = {
  maxOffset: 0,
};

export default PlayerSwipeController;
