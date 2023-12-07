import React from 'react';
import PropTypes from 'prop-types';

import consoleLogger from '@univision/fe-utilities/utils/consola';

/**
 * Icon wrapper to catch icons errors
 * @returns {JSX}
 */
class IconWrapper extends React.Component {
  state = {
    hasError: false,
  };

  /**
   * Determine if error has been thrown by a descendant Icon component
   * @returns {Object}
   */
  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  /**
   * Show browser log about what icon thrown
   * @param {Object} error - the error that was thrown.
   * @param {Object} errorInfo - an object with a componentStack key containing information about
   * which component threw the error.
   */
  componentDidCatch(error, errorInfo) {
    consoleLogger.error(error, errorInfo);
  }

  /**
   * Render icon components or fallback SVG
   * @returns {JSX}
   */
  render() {
    const { props, state } = this;
    if (state.hasError) {
      return props.fallback || null;
    }
    return props.children;
  }
}

IconWrapper.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.node,
};

export default IconWrapper;
