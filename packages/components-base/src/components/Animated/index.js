import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import isEqual from '@univision/fe-utilities/helpers/common/isEqual';

import Styles from './Animated.styles';

const Motion = styled(motion.div)`${Styles.motion}`;

/**
 * Check if should re-render the component based on props changes
 * @param {Object} prevProps - react previous props component
 * @param {Object} nextProps - react new props component
 * @returns {boolean}
 */
const hasChanged = (prevProps, nextProps) => {
  return (
    isEqual(prevProps.animate, nextProps.animate)
    && isEqual(prevProps.exit, nextProps.exit)
    && isEqual(prevProps.initial, nextProps.initial)
    && prevProps.isVisible === nextProps.isVisible
  );
};

/**
 * Animated component
 * @param {Object} animate - mount animation
 * @param {Object} children - Children components
 * @param {string} className - modifier class name
 * @param {Object} exit - unmount animation
 * @param {number} hideSpeed - speed of mounting
 * @param {Object} initial - from where to animate from
 * @param {boolean} isVisible - if is set to true, displays the background
 * @param {func} onClick - onClick event
 * @param {number} showSpeed - speed of mounting
 * @returns {JSX}
 */
const Animated = forwardRef(({
  animate,
  className,
  children,
  exit,
  hideSpeed = { duration: 0.5 },
  initial,
  isVisible,
  onClick,
  showSpeed = { duration: 0.5 },
}, ref) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <Motion
          className={className}
          key="animatedModalBackground"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            animate: { ...animate, transition: { ...showSpeed } },
            exit: { ...exit, transition: { ...hideSpeed } },
            initial: { ...initial },
          }}
          onClick={onClick}
          onTouchStart={onClick}
          ref={ref}
        >
          {children}
        </Motion>
      )}
    </AnimatePresence>
  );
});

Animated.propTypes = {
  animate: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.array,
  ]),
  exit: PropTypes.object,
  hideSpeed: PropTypes.shape({
    duration: PropTypes.number,
  }),
  initial: PropTypes.object,
  isVisible: PropTypes.bool,
  onClick: PropTypes.func,
  showSpeed: PropTypes.shape({
    duration: PropTypes.number,
  }),
};

export default React.memo(Animated, hasChanged);
