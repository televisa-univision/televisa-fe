import React from 'react';
import { useAnimation } from 'framer-motion';

import SwipeHandler from './SwipeHandler';

/**
 * SwipeHanlder animation control and prop injector
 * @param {Object} props the props to pass to wrapped component
 * @returns {JSX}
 */
const SwipeHandlerPropInjector = (props) => {
  const controls = useAnimation();

  return <SwipeHandler controls={controls} {...props} />;
};

export default SwipeHandlerPropInjector;
