import React from 'react';
import PropTypes from 'prop-types';

import GradientBox from 'components/layout/GradientBox/GradientBox';
import Styles from './AltoImpacto.scss';

/**
 * Alto Impacto Component
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const AltoImpacto = ({ content }) => {
  if (Array.isArray(content) && content.length > 0) {
    return (
      <GradientBox {...content[0]} className={Styles.altoImpacto} />
    );
  }
  return null;
};

/**
 * propTypes
 * @property {content} component content
 */
AltoImpacto.propTypes = {
  content: PropTypes.array.isRequired,
};

export default AltoImpacto;
