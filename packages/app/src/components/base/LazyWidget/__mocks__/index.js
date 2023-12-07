import React from 'react';
import PropTypes from 'prop-types';

/**
 * Mock component
 * @param {function} children - Children components
 * @returns {*}
 * @constructor
 */
const LazyWidget = ({ children }) => <>{children()}</>;

export default LazyWidget;

LazyWidget.propTypes = {
  children: PropTypes.func,
};
