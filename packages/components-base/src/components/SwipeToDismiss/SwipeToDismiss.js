import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { getKey, isValidFunction } from '@univision/fe-commons/dist/utils/helpers';

/**
 * Swipe to dismiss component
 * @returns {JSX}
 */
const SwipeToDismiss = ({
  children, className, controls, disabled, onDismiss,
}) => {
  const [isDisabled, setIsDisabled] = useState(disabled);

  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);

  /**
   * Check if tap is on a JW Slider element and disable swipe gesture if true
   * @param {Object} event the tap start event
   */
  const handleTapStart = (event) => {
    const isJWSliderElement = getKey(event, 'target.closest')
      && isValidFunction(event.target.closest)
      && event.target.closest('.jw-slider-time');

    if (isJWSliderElement) {
      setIsDisabled(true);
    }
  };

  /**
   * Reset gesture handling when the tap ends
   */
  const handleTapEnd = () => {
    setIsDisabled(disabled);
  };

  /**
   * Handle drag end
   * @param {Object} event the drag event
   * @param {Object} info the drag info
   */
  const handleDragEnd = async (event, info) => {
    const offset = getKey(info, 'offset.x', 0);
    const velocity = getKey(info, 'velocity.x', 0);

    if (offset > 200 || velocity > 500) {
      await controls.start({
        x: '120%',
        opacity: 0,
        transition: { duration: 0.2 },
      });
      onDismiss();
      controls.start({ x: 0, opacity: 1, transition: { duration: 0 } });
    } else {
      controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } });
    }
  };

  return (
    <motion.div
      className={className}
      drag={isDisabled ? false : 'x'}
      dragConstraints={{ left: 0 }}
      dragDirectionLock
      dragElastic={0}
      onTap={handleTapEnd}
      onTapCancel={handleTapEnd}
      onTapStart={handleTapStart}
      onDragEnd={handleDragEnd}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

/**
 * propTypes
 * @property {Object} controls The animation controls provided by framer-motion lib
 * @property {func} onDismiss The function called when the component is swiped
 */
SwipeToDismiss.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  controls: PropTypes.shape({
    start: PropTypes.func,
  }).isRequired,
  disabled: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
};

export default SwipeToDismiss;
