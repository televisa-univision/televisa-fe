import React from 'react';
import PropTypes from 'prop-types';

import localization from '../../../utils/localization';

/**
 * An api error placeholder
 * @param {Object} props - the component props
 * @returns {JSX}
 */
const ApiError = ({ className, message }) => {
  return (
    <div className={className}>
      {message || localization.get('apiError')}
    </div>
  );
};

/**
 * @property {string} message - The custom message error
 */
ApiError.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default ApiError;
