import { css } from 'styled-components';

import {
  LARGE,
  MEDIUM, SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import {
  BLACK_GREY,
  GREY_BLACK,
  TRANSPARENT,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import numberOfLines from '@univision/fe-utilities/styled/mixins/numberOfLines';
import { ACTION_BAR_HEIGHT } from '../SquareContent/SquareContent.styles';

/**
 * Get card image aspect ratio
 * @param {string} size the size of the card
 * @returns {string}
 */
const getCardImageAspectRatio = size => getFromMap(size, {
  [LARGE]: css`
      padding-bottom: 75%;
    `,
  [MEDIUM]: css`
      padding-bottom: 70%;
    `,
  default: css`
      padding-bottom: 90%;
    `,
});

/**
 * Get the logo container dimensions
 * @param {string} size the size of the card
 * @returns {string}
 */
const getLogoDimensions = size => getFromMap(size, {
  [LARGE]: css`
    width: 200px;
  `,
  [MEDIUM]: css`
    width: 150px;
    `,
  default: css`
    width: 280px;
    `,
});

/**
 * Get number of lines on show description by card size
 * @param {string} size the size of the card
 * @returns {string}
 */
const getNumberOfLines = size => getFromMap(size, {
  [LARGE]: css`
    ${numberOfLines(2)}
  `,
  [MEDIUM]: css`
    ${numberOfLines(3)}
  `,
  [SMALL]: css`
    ${numberOfLines(3)}
  `,
});

export default {
  airTime: css`
    color: ${WHITE};
    font-size: ${rem('10px')};
    letter-spacing: 1px;
    line-height: ${rem('16px')};
    margin-bottom: 20px;
    text-transform: uppercase;
  `,
  background: ({ size }) => css`
    bottom: 0;
    height: 100%;
    left: 0;
    object-fit: cover;
    position: absolute;
    right: 0;
    top: 0;

    > div:first-child {

      ${getFromMap(size,
    {
      [LARGE]: css`
        padding-bottom: 42%;
      `,
      [MEDIUM]: css`
        height: 50px;
      `,
      default: css`
        padding-bottom: 100%;
      `,
    })}
    }
  `,
  backgroundOverlay: ({ size }) => css`
    background: ${linearGradient({ direction: '180deg', start: TRANSPARENT, end: BLACK_GREY })};
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;

  ${getFromMap(size,
    {
      [LARGE]: css`
        height: 40px;
      `,
      [MEDIUM]: css`
        height: 50px;
      `,
      default: css`
        top: 0;
      `,
    })}
  `,
  backgroundWrapper: ({ size }) => css`
    height: 0;
    overflow: hidden;
    position: relative;
    ${getCardImageAspectRatio(size)};
  `,
  description: ({ size }) => css`
    color: ${WHITE};
    > a {
      color: ${WHITE};
      &:hover {
        color: ${GREY_BLACK};
      }
    }
    ${getFromMap(size,
    {
      [LARGE]: css`
        font-size: ${rem('16px')};
        line-height: ${rem('20px')};
        padding-right: 16px;
      `,
      [MEDIUM]: css`
        font-size: ${rem('14px')};
        line-height: ${rem('18px')};
        padding-right: 16px;
      `,
      default: css`
        font-size: ${rem('14px')};
        line-height: ${rem('18px')};
        padding-right: 8px;
      `,
    })}
  `,
  logo: ({ size }) => css`
    display: block;
    ${getLogoDimensions(size)};
  `,
  logoImage: ({ size }) => css`
    object-fit: contain;
    ${getFromMap(size,
    {
      [LARGE]: css`
        height: 133px;
        width: 200px;
      `,
      [MEDIUM]: css`
        height: 100px;
        width: 160px;
      `,
      default: css`
        height: 80px;
        object-position: left;
        width: 140px;
      `,
    })}
  `,
  showInfo: ({ size }) => css`
    bottom: 15px;
    position: absolute;
    width: 100%;

    ${getFromMap(size,
    {
      [LARGE]: css`
        padding: 24px;
      `,
      [MEDIUM]: css`
        padding: 16px;
      `,
      default: css`
        padding: 8px;
      `,
    })}
  `,
  wrapper: css`
    -webkit-font-smoothing: antialiased;
    flex: 1;
    margin-bottom: ${ACTION_BAR_HEIGHT};
    position: relative;
    width: 100%;
  `,
  linkStyled: ({ size }) => css`
    ${getNumberOfLines(size)}
  `,
};
