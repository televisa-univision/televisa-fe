import { css } from 'styled-components';

import {
  HALF_PORTRAIT,
  LANDSCAPE,
  PORTRAIT,
  RECTANGLE,
  SQUARE,
} from '@univision/fe-commons/dist/constants/cardTypes';
import {
  APP_BREAKPOINTS,
  BASELINE_CARDS,
  BLACK_GREY,
  GRADIENT_BLACK_GREY_TRANSPARENT,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';
import { media, mediaRange, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  getCardDescriptionStyles,
  getCardHeaderStyles,
  isLandscapeCard,
  isPortraitCard,
  isRectangleCard,
  isSquareCard,
} from '../helpers';

const airTimeFontStyling = css`
  font-size: ${rem('10px')};
  line-height: ${rem('12px')};

  ${mediaRange(BASELINE_CARDS, APP_BREAKPOINTS.sm, `
    font-size: ${rem('12px')};
    line-height: ${rem('14px')};
  `)}

  ${media.sm`
    font-size: ${rem('17px')};
    line-height: ${rem('20px')};
  `}

  ${media.md`
    font-size: ${rem('13px')};
    line-height: ${rem('15px')};
  `}
`;

/**
 * Get card image aspect ratio
 * @param {string} cardType the type of the card
 * @returns {string}
 */
const getCardImageAspectRatio = cardType => getFromMap(cardType, {
  [LANDSCAPE]: css`
      padding-bottom: 42%;
    `,
  [RECTANGLE]: css`
      padding-bottom: 50%;
    `,
  [SQUARE]: css`
      padding-bottom: 56.25%;
    `,
  default: css`
      padding-bottom: 100%;
    `,
});

/**
 * Get the logo container dimensions
 * @param {string} type the type of the card
 * @returns {string}
 */
const getLogoDimensions = type => getFromMap(type, {
  [HALF_PORTRAIT]: css`
      width: 100%;
    `,
  [PORTRAIT]: css`
    width: 225px;
  `,
  [SQUARE]: css`
      width: 150px;
    `,
  default: css`
      width: 280px;
    `,
});

export default {
  airTime: ({ type }) => css`
    color: ${WHITE};
    font-size: ${rem('11px')};
    line-height: ${rem('13px')};

    ${isSquareCard(type)
      && css`
        margin-bottom: 8px;
      `}

    ${getFromMap(type,
    {
      [SQUARE]: airTimeFontStyling,
      [RECTANGLE]: airTimeFontStyling,
    })}
  `,
  background: ({ type }) => css`
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;

    > div:first-child {

      ${getFromMap(type,
    {
      [LANDSCAPE]: css`
        padding-bottom: 42%;
      `,
      [SQUARE]: css`
        height: 50px;
      `,
      default: css`
        padding-bottom: 100%;
      `,
    })}
    }
  `,
  backgroundOverlay: ({ type }) => css`
    background: ${GRADIENT_BLACK_GREY_TRANSPARENT};
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;

  ${getFromMap(type,
    {
      [HALF_PORTRAIT]: css`
        height: 40px;
      `,
      [SQUARE]: css`
        height: 50px;
      `,
      default: css`
        top: 0;
      `,
    })}
  `,
  backgroundWrapper: ({ type }) => css`
    height: 0;
    overflow: hidden;
    position: relative;
    ${getCardImageAspectRatio(type)};

    ${isRectangleCard(type)
      && css`
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
      `}
  `,
  ShowCardLabel: css`
    display: inline-block;
    margin: 0px 0px 4px;
  `,
  cta: ({ type }) => css`
    align-items: center;
    color: ${WHITE};
    display: flex;
    flex-grow: 1;
    font-size: ${rem('12px')};
    letter-spacing: 0.88px;
    line-height: ${rem('14px')};
    position: absolute;
    text-transform: uppercase;

    &:hover {
      color: ${WHITE};
      opacity: 0.9;
    }

    & svg {
      display: inline-block;
      fill: ${WHITE};
      margin-right: 8px;
    }

    ${getFromMap(type,
    {
      [PORTRAIT]: css`
        top: 280px;
      `,
      [SQUARE]: css`
        bottom: 24px;
      `,
      default: css`
        bottom: 40px;
      `,
    })}

    ${media.lg`
      font-size: ${rem('12px')};
      letter-spacing: 0.75px;
      line-height: ${rem('14px')};
    `}
  `,
  description: ({ type }) => css`
    color: ${WHITE};
    margin-bottom: 24px;

    ${getCardDescriptionStyles(type)}

    ${isSquareCard(type) && css`
      font-size: ${rem('14px')};
      line-height: ${rem('18px')};

      ${mediaRange(BASELINE_CARDS, APP_BREAKPOINTS.sm, `
        font-size: ${rem('16px')};
        line-height: ${rem('20px')};
      `)}

      ${media.sm`
        font-size: ${rem('23px')};
        line-height: ${rem('29px')};
      `}

      ${media.md`
        font-size: ${rem('18px')};
        line-height: ${rem('22px')};
      `}
    `}

    > a {
      color: ${WHITE};

      &:hover {
        opacity: 0.9;
      }
    }
  `,
  logo: ({ type }) => css`
    display: block;
    margin-bottom: 16px;
    ${getLogoDimensions(type)};

    ${isRectangleCard(type) && css`
      margin-bottom: 4px;
    `}

    ${isSquareCard(type) && css`
      margin-bottom: 10px;
    `}

    ${media.lg`
      ${getLogoDimensions(type)}
    `}
  `,
  logoImage: ({ type }) => css`
    object-fit: contain;
    width: 100%;

    ${getFromMap(type,
    {
      [HALF_PORTRAIT]: css`
        max-height: 90px;
        object-position: center;
      `,
      [PORTRAIT]: css`
        height: 133px;
        width: 200px;

        ${mediaRange(BASELINE_CARDS, APP_BREAKPOINTS.sm, `
          height: 150px;
          width: 225px;
        `)}

        ${media.sm`
          height: 224px;
          width: 335px;
        `}

        ${media.md`
          height: 111px;
          width: 167px;
        `}
      `,
      [RECTANGLE]: css`
        max-height: 133px;
        object-position: left;
      `,
      [SQUARE]: css`
        height: 80px;
        width: 140px;

        ${mediaRange(BASELINE_CARDS, APP_BREAKPOINTS.sm, `
          height: 133px;
          width: 200px;
        `)}

        ${media.sm`
          height: 199px;
          width: 298px;
        `}

        ${media.md`
          height: 146px;
          width: 218px;
        `}
      `,
      default: css`
        max-height: 150px;
        object-position: left;
      `,
    })}
  `,
  showInfo: ({ type }) => css`
    bottom: 0;
    left: 0;
    padding: 0 16px 16px;
    position: absolute;
    right: 0;

    ${getFromMap(type,
    {
      [HALF_PORTRAIT]: css`
        top: 159px;
      `,
      [PORTRAIT]: css`
        top: 132px;
      `,
      [RECTANGLE]: css`
        top: 24px;
      `,
      [SQUARE]: css`
        top: 54px;
      `,
      default: css`
        top: 111px;
      `,
    })}

    ${isLandscapeCard(type)
      && css`
        padding: 0 40px 40px;
      `}
  `,
  title: ({ type, hasAdSkin }) => css`
    ${getCardHeaderStyles(type, { hasAdSkin })}

    ${isPortraitCard(type)
      && css`
        font-size: ${rem('14px')};
        line-height: ${rem('18px')};
        object-position: center;

        ${mediaRange(BASELINE_CARDS, APP_BREAKPOINTS.sm, `
          font-size: ${rem('16px')};
          line-height: ${rem('20px')};
        `)}

        ${media.sm`
          font-size: ${rem('23px')};
          line-height: ${rem('29px')};
        `}

        ${media.md`
          font-size: ${rem('18px')};
          line-height: ${rem('21px')};
        `}
      `}

    ${media.lg`
      font-size: ${rem('24px')};
      line-height: ${rem('29px')};
      max-width: 365px;
    `}
  `,
  wrapper: css`
    -webkit-font-smoothing: antialiased;
    background-color: ${BLACK_GREY};
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    overflow: hidden;
    position: relative;
    width: 100%;
  `,
};
