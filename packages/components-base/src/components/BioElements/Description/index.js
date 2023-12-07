import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { stripTagsHtml } from '@univision/fe-commons/dist/utils/helpers';
import Styles from './Description.styles';

const Description = styled.h4`${Styles.description}`;

/**
 * BioDescription function component
 * @property {element|Node} children - component children
 * @property {string} [className] - modifier class
 * @property {string} [style] - modifier style
 * @returns {?JSX}
 */
const BioDescription = ({
  children,
  className,
  style,
}) => {
  if (!children) return null;

  const isHtmlString = (typeof children === 'string');

  return (
    <Description className={className} style={style}>
      {isHtmlString ? stripTagsHtml(children) : children}
    </Description>
  );
};

BioDescription.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default BioDescription;
