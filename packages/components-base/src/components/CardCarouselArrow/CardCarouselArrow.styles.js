import { css } from 'styled-components';

import {
  DARKER_GREY,
  VERY_LIGHT_GREY,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';

/**
 * Card Carousel Arrow Styles
 */

/**
 * Gets CSS for button size
 * @param {number} size the pixel size
 * @returns {BaseThemedCssFunction<any>}
 */
const buttonMeasurements = (size) => {
  const buttonSize = size ? `${size}px` : '48px';

  return css`
    height: ${buttonSize};
    width: ${buttonSize};
  `;
};

export default {
  box: ({ direction, isHidden, size }) => css`
    ${buttonMeasurements(size)}
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.17);
    position: relative;
    top: calc(50% - 24px);
    transform: translate3d(0, 0, 0);
    transition: transform 0.3s ease-out;
    will-change: transform;

    ${isHidden && css`
      transform: translate3d(${direction === 'left' ? '-104%' : '104%'}, 0, 0);
    `}
  `,
  arrowButton: ({ variant, size }) => css`
    ${buttonMeasurements(size)}
    background-color: ${variant === 'light' ? WHITE : DARKER_GREY};
    display: block;
    padding: 0;

    ${variant === 'light' && css`
      border: 1px solid ${VERY_LIGHT_GREY};
    `}
  `,
};
