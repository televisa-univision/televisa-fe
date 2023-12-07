import { css } from 'styled-components';

import { HORIZONTAL, VERTICAL } from '@univision/fe-commons/dist/constants/layoutTypes';
import { WHITE, DARKER_GREY } from '@univision/fe-utilities/styled/constants';
import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';

/**
 * Get published wrapper color
 * @param {string} layout the layout of the card
 * @param {bool} isDark true is it is dark mode
 * @param {bool} isTextOnly true if it is text only
 * @param {bool} isSponsor true if it is sponsor
 * @param {bool} turnDark true if text is required to be dark
 * @returns {string}
 */
const getPublishedWrapperColor = (layout, isDark, isTextOnly, isSponsor, turnDark) => {
  let horizontalColor = isSponsor ? DARKER_GREY : WHITE;
  if (isTextOnly || turnDark) {
    horizontalColor = isDark ? WHITE : DARKER_GREY;
  }
  return getFromMap(layout, {
    [HORIZONTAL]: css`
      color: ${isDark ? WHITE : horizontalColor};
    `,
    [VERTICAL]: css`
      color: ${isDark ? WHITE : DARKER_GREY};
    `,
  });
};

/**
 * Get published wrapper color
 * @param {string} layout the layout of the card
 * @param {bool} isTextOnly true if it is text only
 * @param {string} property property
 * @returns {string}
 */
const getDisplayAndMargin = (layout, isTextOnly, property) => {
  switch (property) {
    case 'display':
      return getFromMap(layout, {
        [VERTICAL]: css`
          display: ${layout === 'vertical' || isTextOnly ? 'flex' : 'none'};
        `,
      });
    default:
      return getFromMap(layout, {
        [HORIZONTAL]: css`
            margin-left: ${layout === 'horizontal' && !isTextOnly ? '5px' : '0px'};
          `,
      });
  }
};

/**
 * Get published wrapper color
 * @param {string} layout the layout of the card
 * @param {bool} isTextOnly true if it is text only
 * @returns {string}
 */
const getLeft = (layout, isTextOnly) => {
  return getFromMap(layout, {
    [VERTICAL]: css`
      left: ${isTextOnly ? '10px' : '90px'};
    `,
    [HORIZONTAL]: css`
      left: ${isTextOnly ? '12px' : '48%'};
    `,
  });
};

/**
 * Get published wrapper color
 * @param {string} layout the layout of the card
 * @param {bool} isTextOnly true if it is text only
 * @returns {string}
 */
const getContent = (layout, isTextOnly) => {
  return getFromMap(layout, {
    [VERTICAL]: css`
      content: '|';
    `,
    [HORIZONTAL]: css`
      content: ${isTextOnly === true && '|'};
    `,
  });
};

export default {
  articleIcon: css`
    margin-right: 4px;
    position: relative;
    top: 5px;
  `,
  ctaIcon: ({ isWorldCupMVP }) => css`
    margin-right: 4px;
    position: relative;
    top: 7px;
    ${isWorldCupMVP && css`
      top: 2px;
    `}
  `,
  ctaWrapper: ({ hasFlavor }) => css`
    bottom: 3px;
    display: flex;
    flex-direction: row;
    height: 17px;
    justify-content: flex-start;
    left: 0;
    pointer-events: none;
    position: absolute;
    width: 100%;
    ${hasFlavor && 'left:50%;'}
  `,
  logoWrapper: css`
    bottom: 17px;
    height: 48px;
    left: 20px;
    position: absolute;
    width: 48px;
    z-index: 1;
    > div {
      height: 100%;
      width: 100%;
      
      > picture > img {
        border-radius: 4px;
      }
    }
  `,
  publishedWrapper: ({
    layout, isDark, isTextOnly, turnDark, isWorldCupMVP,
  }) => css`
    bottom: 0px;
    display: flex;
    font-size: ${rem(10)};
    height: 20px;
    justify-content: flex-start;
    left: 8px;
    position: ${isTextOnly ? 'relative' : 'absolute'};
    text-transform: uppercase;
    width: 100%;
    ${getPublishedWrapperColor(layout, isDark, isTextOnly, false, turnDark)}
    ${isWorldCupMVP && css` 
    font-family: 'Roboto Flex', sans-serif;
    font-size: ${rem('10px')};
    font-weight: 400;
    letter-spacing: .48px;
    line-height: ${rem('21px')};
    text-transform: lowercase;
    ${media.md`
    font-size: ${rem('12px')};
    `}
    `}
  `,
  sponsor: ({
    layout, isDark, isTextOnly, isSponsor,
  }) => css`
    align-items: center;
    bottom: ${isTextOnly ? '-2px' : '-7px'};
    display: flex;
    justify-content: flex-end;  
    position: ${isTextOnly ? 'relative' : 'absolute'};
    text-transform: uppercase;
    width: auto;
    ${getDisplayAndMargin(layout, isTextOnly, 'margin')}
    ${getLeft(layout, isTextOnly)};
    ${getPublishedWrapperColor(layout, isDark, isTextOnly, isSponsor)}
    span {
      font-size: ${rem(10)}; 
    }
    &:before {
      justify-content: flex-end;
      margin: 0 4px;
      ${getContent(layout, isTextOnly)}
      ${getDisplayAndMargin(layout, isTextOnly, 'display')}
    }
  `,
};
