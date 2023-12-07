import { css, keyframes } from 'styled-components';

import {
  APP_BREAKPOINTS,
  BLACK,
  MOBILE_SCREEN_SIZE_SMALL,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';
import numberOfLines from '@univision/fe-utilities/styled/mixins/numberOfLines';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import mediaRange from '@univision/fe-utilities/styled/mixins/mediaRange';

import { getSquareCardHeaderStyles } from '../../../helpers';

export const ripple = keyframes`
  0% {
    transform: scale(0, 0);
    opacity: 0.16;
  }
  20% {
    transform: scale(25, 25);
    opacity: 0.16;
  }
  100% {
    opacity: 0;
    transform: scale(40, 40);
  }
`;

/**
 * Gets the videowrapper layout
 * @param {string} size of card
 * @returns {css}
 */
const getVideoWrapperLayout = size => getFromMap(size, {
  [LARGE]: css`
    min-height: 349px;
  `,
  [MEDIUM]: css`
    min-height: 211px;
  `,
  [SMALL]: css`
    min-height: 168px;
  `,
});

/**
 * Gets not focused state for element
 * @returns {css}
 */
const getNotFocusedState = () => css`
  &:focus:not(:active)::after {
    animation: ${ripple} 5s ease-out;
  }
`;

/**
 * Gets the title padding according to card size
 * @param {string} size of card
 * @returns {css}
 */
const getTitlePadding = size => getFromMap(size, {
  [LARGE]: css`
    padding: 16px;
    ${media.sm`
      padding: 24px;
    `}
  `,
  [MEDIUM]: 'padding: 8px 16px 16px;',
  [SMALL]: 'padding: 16px 8px 16px;',
});

/**
 * Gets the title position by size
 * @param {string} size of card
 * @returns {css}
 */
const getTitlePosition = size => getFromMap(size, {
  [LARGE]: css`
    top: 68%;
  `,
  [MEDIUM]: css`
    top: 71%;
  `,
  [SMALL]: css`
    top: 69%;
  `,
});

/**
 * Get number of lines on title by card size
 * @param {string} size the size of the card
 * @returns {string}
 */
const getNumberOfLines = size => getFromMap(size, {
  [LARGE]: css`
    ${numberOfLines(3)}
  `,
  default: css`
    ${numberOfLines(2)}
  `,
});

export default {
  container: css`
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-start;
    overflow: hidden;
    position: relative;
  `,

  title: ({
    size, type, isDark, isWorldCupMVP,
  }) => css`
    align-items: flex-start;
    display: flex;
    margin: 0;
    position: absolute;
    text-align: left;
    z-index: 1;
    ${getTitlePosition(size, type)}
    ${getSquareCardHeaderStyles(size, { color: isDark ? WHITE : BLACK })}
    ${getTitlePadding(size, type)}
     a {
      ${getNotFocusedState()}
    }
    ${mediaRange(APP_BREAKPOINTS.xxs, MOBILE_SCREEN_SIZE_SMALL, `
      font-size: ${rem('12px')};
      line-height: ${rem('14px')};
    `)}

    ${isWorldCupMVP && css`
      ${mediaRange(APP_BREAKPOINTS.xxs, MOBILE_SCREEN_SIZE_SMALL, `
        font-size: ${rem('16px')};
        line-height: ${rem('20px')};
    `)}
    `}

  `,

  videoContainer: css`
    height: 0;
    padding-bottom: 54%;
    position: relative;
    width: 100%;
  `,

  videoWrapper: ({ type }) => css`
    justify-content: flex-start;
    width: 100%;
    ${getVideoWrapperLayout(type)};
  `,

  titleLink: ({ size }) => css`
    ${getNumberOfLines(size)}
  `,
};
