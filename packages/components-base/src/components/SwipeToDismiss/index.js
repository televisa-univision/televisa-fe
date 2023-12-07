import React from 'react';
import { useAnimation } from 'framer-motion';

import SwipeToDismiss from './SwipeToDismiss';

/**
 * Swipe to dismiss wrapper
 * @param {Object} props the wrapper props
 * @returns {JSX}
 */
const SwipeToDismissWrapper = (props) => {
  const controls = useAnimation();

  return <SwipeToDismiss {...props} controls={controls} />;
};

export default SwipeToDismissWrapper;
