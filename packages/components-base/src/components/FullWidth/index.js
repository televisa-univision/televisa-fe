import React from 'react';
import PropTypes from 'prop-types';

import Styles from './FullWidth.scss';

const BREAKPOINTS = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'];
/**
 * Make children extend edge-to-edge, regardless of container width
 * @param {*} children the children be rendered
 * @param {Array} breakpoints what breakpoints full-width should be applied;
 * @returns {jsx}
 */
const FullWidth = ({ children, breakpoints, className }) => {
  const classList = breakpoints.map(bp => Styles[`full-${bp}`]);
  if (className) classList.push(className);
  return (
    <div className={classList.join(' ')}>
      {children}
    </div>
  );
};

FullWidth.propTypes = {
  children: PropTypes.node,
  breakpoints: PropTypes.arrayOf(PropTypes.oneOf(BREAKPOINTS)),
  className: PropTypes.string,
};

FullWidth.defaultProps = {
  breakpoints: BREAKPOINTS,
};

export default FullWidth;
