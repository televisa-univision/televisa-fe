import React from 'react';
import PropTypes from 'prop-types';
import Styles from './LoadingIndicatorBar.scss';

/**
 * SPA Loading indicator.
 * @param {boolean} loading Is Loading
 * @returns {JSX}
 * @constructor
 */
const LoadingIndicatorBar = ({ loading }) => {
  return loading ? <div className={Styles.loader} />
    : null;
};

/**
 * propTypes
 * @property {Node} page Store page object
 * @property {Node} pageComponent React element rendered on the server
 */
LoadingIndicatorBar.propTypes = {
  loading: PropTypes.bool,
};

export default LoadingIndicatorBar;
