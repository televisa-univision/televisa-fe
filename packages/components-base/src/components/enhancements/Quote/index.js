import React from 'react';
import PropTypes from 'prop-types';

import Styles from './Quote.scss';

/**
 * Inline block quote
 * @param {string} text the quote
 * @param {enum} type - quote type
 * @returns {jsx}
 */
const Quote = ({ text, type, theme }) => {
  return (
    <div className={Styles[type]} style={{ borderColor: theme.primary }}>
      {text}
    </div>
  );
};

Quote.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['blockquote', 'pullquote']).isRequired,
  theme: PropTypes.object,
};

Quote.defaultProps = {
  theme: { primary: '#3a3a3a' },
};

export default Quote;
