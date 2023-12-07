import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Styles from './CardOptionsList.styles';

export const CardOptionsWrapper = styled.div`${Styles.cardOptionsWrapper}`;

/**
 * Render the card image.
 * @param {string} type props type
 * @param {string} title alt text for image
 * @param {string} image the image to be rendered
 * @param {string} aspectRatio the aspect ratio of the image to be displayed
 * @param {string} iconName the icon to be rendered
 * @returns {JSX}
 */
const CardOptions = ({ children, color }) => {
  return (
    <CardOptionsWrapper color={color}>
      {children}
    </CardOptionsWrapper>
  );
};

CardOptions.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
};

export default CardOptions;
