import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  HALF_PORTRAIT,
  LANDSCAPE,
  LIST,
  PORTRAIT,
  RECTANGLE,
  SQUARE,
  VERTICAL,
} from '@univision/fe-commons/dist/constants/cardTypes';

import Styles from './CardSizer.styles';

const Container = styled.div`
  ${Styles.container}
`;
const AspectRatioBox = styled.div`
  ${Styles.aspectRatioBox}
`;
const InnerAspectRatioBox = styled.div`
  ${Styles.innerAspectRatioBox}
`;

/**
 * Component for sizing all cards according to their type
 * @param {Object} props component props
 * @returns {JSX}
 */
const CardSizer = ({
  children,
  className,
  hasActionBar,
  style,
  type,
}) => {
  return (
    <Container className={className} style={style} type={type}>
      <AspectRatioBox type={type} hasActionBar={hasActionBar}>
        <InnerAspectRatioBox>{children}</InnerAspectRatioBox>
      </AspectRatioBox>
    </Container>
  );
};

CardSizer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  hasActionBar: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  type: PropTypes.oneOf([
    HALF_PORTRAIT,
    LANDSCAPE,
    LIST,
    PORTRAIT,
    RECTANGLE,
    SQUARE,
    VERTICAL,
  ]).isRequired,
};

export default CardSizer;
