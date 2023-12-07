import { css } from 'styled-components';

import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import numberOfLines from '@univision/fe-utilities/styled/mixins/numberOfLines';
import {
  APP_BREAKPOINTS,
  BLACK_GREY,
  GREY_BLACK,
  LIGHT_GREY,
  TORCH_RED,
  WHITE_00,
  TRANSPARENT,
  WHITE,
  GREY,
  WOOD_SMOKE,
  FOLLY,
} from '@univision/fe-utilities/styled/constants';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import mediaRange from '@univision/fe-utilities/styled/mixins/mediaRange';
import { ACTION_BAR_HEIGHT } from '../SquareContent/SquareContent.styles';

export default {
  bullet: ({ isWorldCupMVP }) => css`
    background-color: ${TORCH_RED};
    border-radius: 50%;
    height: 9px;
    margin-left: -21px;
    margin-right: 12px;
    margin-top: 4px;
    min-height: 9px;
    min-width: 9px;
    width: 9px;
    ${isWorldCupMVP && css`
      background-color: ${FOLLY};
    `}
  `,
  post: ({ size, isFirst, isDark }) => css`
    align-items: flex-start;
    border-bottom: 1px dashed ${isDark ? GREY : LIGHT_GREY};
    color: ${isDark ? WHITE : BLACK_GREY};
    display: flex;
    font-size: ${rem('14px')};
    line-height: ${rem('18px')};
    margin-left: 16px;

    ${getFromMap(size,
    {
      [LARGE]: css`
        height: ${isFirst ? '40px' : '60px'};
        padding-top: ${isFirst ? '0' : '10px'};
        ${media.sm`
          height: ${isFirst ? '50px' : '70px'};
          padding-top: ${isFirst ? '0' : '20px'};
        `}
      `,
      [MEDIUM]: css`
        height: ${isFirst ? '40px' : '60px'};
        padding-top: ${isFirst ? '0' : '10px'};
      `,
      [SMALL]: css`
        height: 65px;
        ${mediaRange(APP_BREAKPOINTS.md, APP_BREAKPOINTS.lg, `
          height: 40px;
          ${numberOfLines(2)}
      `)}
      `,
    })}
  `,
  postLink: ({ size, isDark, isWorldCupMVP }) => css`
    color: ${isDark ? WHITE : BLACK_GREY};

    &:hover {
      color: ${GREY_BLACK};
    }

    ${getFromMap(size,
    {
      [LARGE]: css`
        font-size: ${rem('14px')};
        line-height: 18px;
        padding-left: 13px;
        ${media.sm`
          font-size: ${rem('16px')};
          line-height: 20px;
          padding-left: 13px;
        `}
        ${numberOfLines(2)}
      `,
      [MEDIUM]: css`
        font-size: ${rem('14px')};
        line-height: 18px;
        padding-left: 5px;
        ${numberOfLines(2)}
      `,
      [SMALL]: css`
        font-size: ${rem('14px')};
        line-height: 18px;
        padding-left: 3px;
        ${numberOfLines(3)}
      `,
    })}

    ${isWorldCupMVP && css`
      color: ${isDark ? WHITE : WOOD_SMOKE};
      font-family: 'Poppins', sans-serif;
    `}
  `,
  posts: ({ isDark }) => css`
    border-left: 1px dashed ${isDark ? GREY : LIGHT_GREY};
    list-style: none;
    margin: 0 0 0 8px;
    padding: 0;
  `,
  postsOverlay: ({ isDark }) => css`
    background: ${linearGradient({ direction: '180deg', start: isDark ? TRANSPARENT : WHITE_00, end: isDark ? BLACK_GREY : WHITE })};
    bottom: 0;
    height: 60px;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
  `,
  postsWrapper: ({ size }) => css`
    flex: 1;
    margin-bottom: ${ACTION_BAR_HEIGHT};
    position: relative;
    ${getFromMap(size,
    {
      [LARGE]: css`
        height: 100px;
        margin-top: 14px;
        overflow: hidden;
        padding: 0 16px;
        ${media.sm`
          margin-top: 14px;
          padding: 0 24px;
        `}
      `,
      [MEDIUM]: css`
        margin-top: 14px;
        padding: 0 16px;
      `,
      [SMALL]: css`
        margin-top: 10px;
        padding: 0 16px;
      `,
    })}
  `,
};
