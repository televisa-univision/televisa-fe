import { css } from 'styled-components';
import {
  VERY_LIGHT_GREY, WHITE_GREY, LIGHT_GREY, DARKER_GREY, APP_BREAKPOINTS,
} from '@univision/fe-utilities/styled/constants';
import {
  LARGE, MEDIUM, SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import { mediaRange } from '@univision/fe-commons/dist/utils/styled/mixins';

/**
 * Helper that returns the separator width between social networks
 * @param {string} separator - type of separator
 * @param {bool} isContentLayout - if it is in Layout type
 * @param {bool} isListCard - if it is in list card
 * @returns {string}
 */
const getSeparatorWidth = (separator, isContentLayout, isListCard) => {
  if (isContentLayout) {
    return '44px';
  }
  if (isListCard) {
    return '0';
  }
  switch (separator) {
    case LARGE:
      return '21px';
    case MEDIUM:
      return '28px';
    case SMALL:
      return '9px';
    default:
      return '44px';
  }
};

/**
 * Helper that returns the right position for the share Buttons
 * @param {string} size - type of container size
 * @param {bool} hasFavorite - if it has Favorite icon
 * @param {bool} isContentLayout - if it is in Layout type
 * @param {bool} isLandscape - if it is in VideoInlineLandscape
 * @param {bool} isListCard - if it is in list card
 * @returns {string}
 */
export const getButtonsPosition = ({
  size, hasFavorite, isContentLayout, isLandscape, isListCard,
}) => {
  if (isLandscape) {
    return hasFavorite ? '148px' : '109px';
  }
  if (isContentLayout) {
    return hasFavorite ? '132px' : '94px';
  }
  if (isListCard) {
    return '0';
  }
  switch (size) {
    case LARGE:
      return hasFavorite ? '111px' : '71px';
    case MEDIUM:
      return hasFavorite ? '116px' : '78px';
    case SMALL:
      return hasFavorite ? '98px' : '59px';
    default:
      return hasFavorite ? '133px' : '94px';
  }
};

/**
 * Get margin when is only VideoInlineLandscape version
 * @param {Object} props VideoInlineLandscape version
 * @returns {string}
 * @constructor
 */
export const getMainIconClose = ({
  hasFavorite,
  isLandscape,
  isListCard,
}) => {
  if (isListCard) {
    return '10px';
  }
  if (isLandscape) {
    return hasFavorite ? '74px' : '35px';
  }
  return hasFavorite ? '59px' : '20px';
};

export default {
  modalWrapper: css`
    height: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
  `,
  shareDrawer: ({
    isDark, isContentLayout, isMobile,
  }) => css`
    align-items: center;
    background-color: ${isDark ? DARKER_GREY : VERY_LIGHT_GREY};
    display: flex;
    flex-direction: column;
    height: 30px;
    justify-content: flex-start;
    padding: 24px;
    position: relative;
    right: 0;
    top: 0;
    transform-origin: top right;
    width: 100%;
    z-index: 2;
    ${isContentLayout && !isMobile && css`border-radius: 27px;`}
  `,

  close: ({ hasFavorite, isLandscape, isListCard }) => css`
    align-items: center;
    background: ${WHITE_GREY};
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    height: 30px;
    justify-content: center;
    position: absolute;
    right: ${getMainIconClose({ hasFavorite, isLandscape, isListCard })};
    top: 10px;
    width: 30px;
    &:hover {
      background-color: ${LIGHT_GREY};
    }
  `,

  shareButton: css`
    height: 30px;
    line-height: 28px;
    width: 30px;
  `,

  shareButtonsWrapper: ({
    separator, hasFavorite, isContentLayout, isLandscape, isListCard,
  }) => css`
    display: flex;
    position: absolute;
    right: ${getButtonsPosition({
    size: separator, hasFavorite, isContentLayout, isLandscape, isListCard,
  })};
    top: 10px;
    ${mediaRange(APP_BREAKPOINTS.xxs, 360, css`
    right: 80px;
  `)}
    ${isListCard && `
      right: 0;
      left: 0;
      width: calc(100% - 40px);
      justify-content: space-evenly;
    `}
  `,

  buttonContainer: ({ separator, isContentLayout, isListCard }) => css`
    display: flex;
    margin-left: ${getSeparatorWidth(separator, isContentLayout, isListCard)};
    ${mediaRange(321, 375, css`
      margin-left: 30px;
    `)}
    ${mediaRange(APP_BREAKPOINTS.xxs, 320, css`
      margin-left: 20px;
    `)}
  `,

  mask: css`
    height: 48px;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 3;
  `,
};
