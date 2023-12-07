import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Styles from './StrippedBackground.styles';

const StrippedImage = styled.div`${Styles.background}`;

/**
 * StrippedBackground component
 * @property {string} [className] - modifier class
 * @property {string} [style] - modifier style
 * @returns {?JSX}
 */
const StrippedBackground = ({
  className,
  style,
}) => (
  <StrippedImage className={className} style={style} />
);

StrippedBackground.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export default StrippedBackground;
