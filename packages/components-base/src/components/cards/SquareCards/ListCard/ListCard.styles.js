import { css } from 'styled-components';

import { HORIZONTAL, VERTICAL } from '@univision/fe-commons/dist/constants/layoutTypes';
import {
  BLACK_06,
  BLACK_08,
  BLACK,
  DARKER_GREY,
  WHITE,
  DEEP_SEA,
} from '@univision/fe-utilities/styled/constants';
import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import numberOfLines from '@univision/fe-utilities/styled/mixins/numberOfLines';

import { getSquareCardHeaderStyles } from '../../helpers';

/**
 * Gets the card size
 * @param {string} layout - the card layout
 * @param {bool} isTextOnly - if the card is text only
 * @param {bool} listGrid - if in list grid
 * @returns {string}
 */
const getCardSize = (layout, isTextOnly, listGrid) => getFromMap(layout, {
  [HORIZONTAL]: css`
    flex-direction: row;
    height: 125px;
    max-width: ${listGrid ? '100%' : '409px'};
    ${media.sm`
      height: ${isTextOnly ? '90px' : '125px'};
    `}
    ${media.md`
      height: ${isTextOnly ? '107px' : '125px'};
    `}
    ${media.lg`
      height: 136px;
    `}

  `,
  [VERTICAL]: css`
    flex: 0 0 100%;
    flex-direction: column;
    padding-bottom: 148.125%;
  `,
});

/**
 * Get tex wrapper width
 * @param {string} layout the layout of the card
 * @param {bool} isTextOnly true if in text only mode
 * @returns {string}
 */
const getTextWrapperWidth = (layout, isTextOnly) => getFromMap(layout, {
  [HORIZONTAL]: css`
    max-width: ${isTextOnly ? '100%' : '50%'}
  `,
  [VERTICAL]: css`
    height: ${isTextOnly ? '100%' : '49.36708861%'};
    position: absolute;
    top: ${isTextOnly ? 0 : '50.63291139%'};
    width: 100%;
  `,
});

/**
 * Gets color for the provided label type
 * @param {string} theme theme to be shown
 * @param {bool} isDark to know if its dark version
 * @returns {string}
 */
const getTitleColor = ({ theme, isDark }) => {
  let titleColor = BLACK;
  if (isDark || theme?.isDark) {
    titleColor = WHITE;
  } else if (theme?.primary) {
    titleColor = theme?.primary;
  }
  if (theme?.widgetTitleColor) {
    titleColor = theme?.widgetTitleColor;
  }
  return titleColor;
};

export default {
  actionBar: css`
    bottom: 0;
    position: absolute;
    right: 0;
    z-index: auto;
  `,
  badge: css`
    align-content: flex-start;
    display: flex;
  `,
  description: ({ layout, isDark }) => css`
    color: ${isDark ? WHITE : DARKER_GREY};
    font-size: ${rem(12)};
    line-height: ${rem(16)};
    margin-top: 4px;
    padding-top: 4px;
    ${numberOfLines(layout === HORIZONTAL ? 2 : 4)}
  `,
  dotIcon: css`
    margin: 0 10px;
    position: relative;
    top: 9px;
  `,
  dynamicAspectRatio: ({ isVerticalLayout }) => css`
    ${isVerticalLayout ? css`
      height: 50.63291139%;
      position: absolute;
      width: 100%;
    ` : css`
      width: 50%;
    `}
  `,
  labelLink: ({ theme }) => css`
    ${theme?.primary && css`
      && {
        color: ${theme.primary};
      }
    `}
    ${theme?.secondary && css`
      &&:hover {
        color: ${theme.secondary};
        text-decoration: none;
      }
    `}
  `,
  linkTitle: ({
    isTextOnly, layout, isRelatedCollection, isWorldCupMVP,
  }) => {
    const lineClamp = isRelatedCollection && isWorldCupMVP ? 3 : 4;
    return getFromMap(layout, {
      [HORIZONTAL]: css`
        ${numberOfLines(isTextOnly ? 2 : 4)}
      `,
      [VERTICAL]: css`
        ${numberOfLines(isTextOnly ? 4 : lineClamp)}
        && {
          &:hover {
            text-decoration: none;
          }
        }
      `,
    });
  },
  progressWrapper: css`
    bottom: 0;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 2;
  `,
  textWrapper: ({ layout, isTextOnly }) => css`
    display: flex;
    flex-direction: column;
    padding: ${isTextOnly ? '8px' : '2px 8px'};
    position: relative;
    ${getTextWrapperWidth(layout, isTextOnly)}
  `,
  title: ({
    layout,
    isDark,
    isWorldCupMVP,
    theme,
  }) => css`
    margin: 0;
    text-align: left;
    && {
      ${getSquareCardHeaderStyles(layout, { color: getTitleColor({ theme, isDark }) })}
    }
    ${isWorldCupMVP && css`
      font-family: 'Roboto Flex', Helvetica, Arial, sans-serif;
    `}
  `,
  titleWrapper: ({
    isTextOnly, isRadio, isCentered, isSoccerMatch,
  }) => css`
    align-items: flex-start;
    display: flex;
    ${(!isTextOnly && !isRadio) && css`flex-grow: 1;`}
    ${isCentered && css`align-items: center;`}
    ${isSoccerMatch && css`margin-top: ${isTextOnly ? '0' : '25px'};`}
  `,
  videoProgress: css`
    border-radius: 0 0 4px 4px;
  `,
  wrapper: ({
    layout, isDark, isTextOnly, listGrid, backgroundColor,
  }) => css`
    background: ${backgroundColor};
    border-radius: 4px;
    box-shadow: 0 -1px 3px 0px ${BLACK_06}, 0 2px 3px 0 ${BLACK_08};
    display: flex;
    position: relative;
    ${getCardSize(layout, isTextOnly, listGrid)};

    ${isDark && css`
      p {
        color: ${WHITE}
      }
    `}
    `,
  labelCustom: ({ isWorldCupMVP, isVerticalLayout }) => css`
    ${isWorldCupMVP && css`
    > span {
      color: ${DEEP_SEA};
      font-family: 'Roboto Flex', sans-serif;
      font-size: ${rem('12px')};
      font-style: normal;
      font-weight: 700;
      letter-spacing: 1px;
      line-height: ${rem('15px')};
      margin-bottom: 5px;
      margin-top: 5px;
      ${isVerticalLayout && css`
        letter-spacing: 0.48px;
      `}
    }
    `}
  `,
};
