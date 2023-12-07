import React from 'react';
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux';

import { isValidFunction } from '../../utils/helpers';
import clientLogging from '../../utils/logging/clientLogging';
import { errorHandler, errorFormatter as spaErrorFormatter } from '../../utils/helpers/spa';

/**
 * catch errors and hide child if exception occurs
 */
class ErrorBoundary extends React.Component {
    /**
   * set up error in state
   * @param   {Object} error error instance
   * @returns {Object} the new state
   */
  static getDerivedStateFromError(error) {
    // Update state to indicate an error has occurred
    return { hasError: true, error };
  }

  /**
   * set up initial state
   * @param   {Object} props component props
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * catch errors
   * @param   {Object} error the error that occured
   * @param   {Object} info  additional error info
   */
  async componentDidCatch(error, info) {
    await this.logAndHandleError(error, info);
  }

  /**
   * Logs the error using the clientLogging util and then execute the given onCatch function.
   * @param   {Object} error the error that occured
   * @param   {Object} info  additional error info
   */
  async logAndHandleError(error, info) {
    const { onCatch, errorFormatter } = this.props;
    /* istanbul ignore next */
    const { store = {} } = this.context || {};

    this.setState({ hasError: true });
    let formattedError = errorFormatter({
      error,
      store,
    });
    // Await for the client logging request before executing onCatch
    // to avoid the request to be canceled by any redirect in onCatch
    try {
      this.setState({ hasError: true });
      formattedError = errorFormatter({
        error,
        store,
      });
      await clientLogging(formattedError, info);
    } finally {
      onCatch(store);
    }
  }

  /**
   * render childern or null if error occurred
   * @returns {JSX} the view
   */
  render() {
    const {
      state: { hasError },
      props: { fallbackRender, children },
    } = this;

    if (hasError) {
      if (isValidFunction(fallbackRender)) {
        return fallbackRender();
      }
      return null;
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired,
  fallbackRender: PropTypes.func,
  onCatch: PropTypes.func,
  errorFormatter: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  onCatch: errorHandler,
  errorFormatter: spaErrorFormatter,
};

ErrorBoundary.contextType = ReactReduxContext;

export default ErrorBoundary;
