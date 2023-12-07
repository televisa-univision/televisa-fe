import PropTypes from 'prop-types';
import React from 'react';

import formatDate from '@univision/fe-utilities/helpers/date/formatDate';

/**
 * TimeLabel base component.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const TimeLabel = ({ className, language }) => {
  return (
    <time className={className}>
      {formatDate(new Date(), language)}
    </time>
  );
};

/**
 * propTypes
 * @property {String} class Class name of the element
 * @property {String} language Language for date format ('es' or 'en' only)
 */
TimeLabel.propTypes = {
  className: PropTypes.string,
  language: PropTypes.string,
};

/**
 * propTypes
 * @property {String} class Default class to render
 */
TimeLabel.defaultProps = {
  className: '',
  language: 'en',
};

export default TimeLabel;
