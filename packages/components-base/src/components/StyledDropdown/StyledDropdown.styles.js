import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  BLACK,
  GREY,
  TRANSPARENT,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';

/**
 * Get the correct item color depending on the theme and if it is selected
 * @param {Object} options - Parameters sent as an object
 * @param {boolean} options.isDark - Is this a dark theme?
 * @param {boolean} options.isSelected - Is this item selected?
 * @returns {string}
 */
const getItemColor = ({ isDark, isSelected }) => {
  if (isDark && isSelected) return WHITE;
  if (!isDark && isSelected) return BLACK;
  return GREY;
};

export default {
  arrowDown: () => css`
    display: none;

    ${media.md`
      bottom: -4px;
      display: block;
      position: absolute;
      width: 100%;
    `}
  `,
  arrowMobile: () => css`
    display: block;
    pointer-events: none;
    position: absolute;
    right: 2px;
    top: 1px;

    ${media.md`
      display: none;
    `}
  `,
  arrowUp: () => css`
    display: none;

    ${media.md`
      display: block;
      position: absolute;
      top: -4px;
      width: 100%;
    `}
  `,
  container: ({ isDark }) => css`
    background: ${isDark ? BLACK : WHITE};
    display: inline-block;
    min-width: 140px;
    position: relative;

    ${media.md`
      height: 200px;
      min-width: 90px;
      overflow: hidden;
      padding-bottom: 50px;
    `}
  `,
  gradient: ({ isDark, isTop }) => css`
    ${media.md`
      background: ${linearGradient({ direction: isTop ? '0deg' : '180deg', start: TRANSPARENT, end: isDark ? BLACK : WHITE })};
      bottom: ${isTop ? 'auto' : '0'};
      height: ${isTop ? '50' : '65'}px;
      left: 0;
      pointer-events: none;
      position: absolute;
      right: 0;
      top: ${isTop ? '0' : 'auto'};
    `}
  `,
  item: ({ isDark, isOpen, isSelected }) => css`
      border-bottom: 2px solid ${isDark && !isSelected || !isDark && isSelected ? BLACK : WHITE};
      color: ${getItemColor({ isDark, isSelected })};
      display: ${isOpen || isSelected ? 'block' : 'none'};
      font-size: ${rem('12px')};
      letter-spacing: ${rem('0.75px')};
      line-height: ${rem('14px')};
      list-style: none;
      padding: 6px 6px 4px;
      text-align: center;
      text-transform: uppercase;
      user-select: none;

      ${media.md`
        cursor: pointer;
        display: block;
        padding: 12px 6px 10px;
      `}
    `,
  menu: ({ pos, items }) => css`
    box-sizing: content-box;
    margin: 0;
    padding: 0;
    scrollbar-width: none;

    ${media.md`
      height: 100%;
      min-height: ${items * 38}px;
      overflow: scroll;
      padding: 24px 0;
      transform: translateY(${pos}px);
      transition: all 1s;
    `}
  `,
};
