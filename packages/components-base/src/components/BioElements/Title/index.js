import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Styles from './Title.styles';

const Title = styled.h3`${Styles.title}`;

/**
 * BioTitle component
 * @property {element|Node} children - component children
 * @property {string} [className] - modifier class
 * @property {string} [style] - modifier style
 * @returns {?JSX}
 */
const BioTitle = ({
  children,
  className,
  style,
}) => {
  if (!children) return null;

  return (
    <Title className={className} style={style}>
      {children}
    </Title>
  );
};

BioTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default BioTitle;
