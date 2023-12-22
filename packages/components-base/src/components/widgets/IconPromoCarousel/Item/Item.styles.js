import { css } from 'styled-components';

import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BLACK,
  GREY_BLACK,
  GRID_GUTTER_WIDTH,
  LONGFORM_GRADIENT_CIRCLE,
  WHITE,
  WHITE_GREY,
  ZINDEX_BASE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  wrapper: css`
    padding: 0 ${GRID_GUTTER_WIDTH / 2}px;
  `,
  promo: ({ isBigSize }) => css`
    cursor: pointer;
    display: block;
    margin: 0 auto;
    max-width: 65px;
    width: auto;

    ${!isBigSize && media.md`
      max-width: 72px;
    `}

    ${isBigSize && css`
      max-width: 130px;
    `}
  `,
  promoImage: ({ isBigSize, isDark, isTelevisaSite }) => css`
    background: ${WHITE};
    border: 1px solid ${WHITE_GREY};
    border-radius: 50%;
    display: flex;
    height: 64px;
    margin: 0 auto;
    margin-bottom: 8px;
    overflow: hidden;
    position: relative;
    transition: all 0.2s;
    width: 64px;

    ${media.md`
      width: 72px;
      height: 72px;
    `}

    img {
      display: block;
      height: auto;
      margin: auto;
      width: 100%;
    }

    ${isTelevisaSite && css`
      img {
        width: 250px;
      }
    `}

    ${isBigSize && css`
      height: 130px;
      width: 130px;

      ${media.md`
        width: 130px;
        height: 130px;
      `}
    `}

    ${isDark && css`
      background-clip: content-box, border-box;
      background-image: linear-gradient(${WHITE}, ${WHITE}), ${LONGFORM_GRADIENT_CIRCLE};
      background-origin: border-box;
      border: 1px solid transparent;

      :hover {
        ${media.md`
          background-image: none;
        `}
      }
    `}
  `,
  promoBorder: ({ isDark }) => css`
    border: 1px solid transparent;
    border-radius: 50%;
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: all 0.2s;
    width: 100%;
    z-index: ${ZINDEX_BASE};

    :hover {
      ${media.md`
        opacity: 1;

        ${isDark && css`
          border-color: ${WHITE};
          opacity: 1;
        `}
      `}
    }
  `,
  promoTitle: ({ isBigSize, isDark }) => css`
    color: ${isDark ? WHITE : BLACK};
    font-size: ${rem('11px')};
    line-height: ${rem('13px')};
    text-align: center;
    transition: all 0.2s;

    :hover {
      ${media.md`
        color: ${GREY_BLACK};
      `}
    }

    ${isBigSize && css`
      font-size: ${rem('16px')};
      line-height: ${rem('19px')};
    `}
  `,
};
