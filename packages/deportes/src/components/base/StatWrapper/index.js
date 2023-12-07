import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Styles from './StatWrapper.scss';

/**
 * A wrapper for sports widgets
 * @param {Object} props wrapper props
 * @returns {JSX}
 */
const StatWrapper = ({
  children,
  className,
  withBorder,
  isLiveMatches,
}) => {
  const styleContainer = isLiveMatches ? Styles.containerLiveMatches : Styles.container;
  return (
    <div
      className={classnames(styleContainer, className, {
        [Styles.withBorder]: withBorder,
      }, 'col')}
    >
      {children}
    </div>
  );
};

/**
 * @property {Node} children - components to mount
 * @property {string} className - the class modifier
 * @property {boolean} withBorder - if true should set border
 */
StatWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  withBorder: PropTypes.bool,
  isLiveMatches: PropTypes.bool,
};

StatWrapper.defaultProps = {
  className: '',
  withBorder: false,
};

export default StatWrapper;
