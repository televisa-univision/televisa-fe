import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';
import { BLACK, WHITE } from '@univision/fe-commons/dist/utils/styled/constants';

import Button from '../Button';
import Styles from './CardCarouselArrow.styles';

const Box = styled.div`
  ${Styles.box}
`;

const ArrowButton = styled(Button)`
  ${Styles.arrowButton}
`;

/**
 * Card Carousel Arrow component
 * @returns {JSX}
 */
const CardCarouselArrow = ({
  className,
  direction,
  iconSize,
  isHidden,
  onClick,
  size,
  variant,
}) => {
  const iconName = direction === 'left' ? 'arrowLeft' : 'arrowRight';
  const iconFill = variant === 'light' ? BLACK : WHITE;

  return (
    <Box
      className={className}
      isHidden={isHidden}
      direction={direction}
      size={size}
    >
      <ArrowButton onClick={onClick} variant={variant} size={size}>
        <Icon name={iconName} size={iconSize} fill={iconFill} />
      </ArrowButton>
    </Box>
  );
};

CardCarouselArrow.propTypes = {
  className: PropTypes.string,
  direction: PropTypes.oneOf(['left', 'right']),
  iconSize: PropTypes.number,
  isHidden: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.number,
  variant: PropTypes.oneOf(['dark', 'light']),
};

CardCarouselArrow.defaultProps = {
  direction: 'left',
  iconSize: 40,
  variant: 'light',
};

export default CardCarouselArrow;
