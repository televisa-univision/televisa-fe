import { css } from 'styled-components';

import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import media from '@univision/fe-utilities/styled/mixins/media';
import numberOfLines from '@univision/fe-utilities/styled/mixins/numberOfLines';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import {
  SLIDESHOW,
  ARTICLE,
  VIDEO,
  LIVE_BLOG,
  LIVE_STREAM,
  SHOW, SOCCER_MATCH,
  EXTERNAL_CONTENT_PROMO,
  EXTERNAL_LINK,
} from '@univision/fe-commons/dist/constants/contentTypes';
import {
  ADVERTISING,
} from '@univision/shared-components/dist/constants/labelTypes';
import {
  APP_BREAKPOINTS,
  MOBILE_SCREEN_SIZE_SMALL,
  WHITE,
  BLACK,
} from '@univision/fe-utilities/styled/constants';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import { HOROSCOPE } from '@univision/fe-commons/dist/constants/pageCategories';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import mediaRange from '@univision/fe-utilities/styled/mixins/mediaRange';

import { getSquareCardHeaderStyles } from '../../../../helpers';

const livestreamWithBadge = {
  [LARGE]: css`
    padding: 40px 16px 16px;
    ${media.sm`
      padding: 64px 24px 24px;
    `}
  `,
  [MEDIUM]: 'padding: 40px 16px 16px;',
  [SMALL]: 'padding: 40px 8px 8px;',
};

const paddingMap = {
  [ARTICLE]: {
    [LARGE]: css`
      padding: 16px;
      ${media.sm`
        padding: 24px 24px 10px;
      `}
      ${mediaRange(APP_BREAKPOINTS.xxs, MOBILE_SCREEN_SIZE_SMALL, `
        padding: 8px 16px;
      `)}
    `,
    [MEDIUM]: 'padding: 13px 16px;',
    [SMALL]: 'padding: 8px 8px 4px;',
  },
  [ADVERTISING]: {
    [LARGE]: css`
      padding: 16px;
      ${media.sm`
        padding: 24px;
      `}
    `,
    [MEDIUM]: 'padding: 13px 16px;',
    [SMALL]: 'padding: 8px;',
  },
  [LIVE_BLOG]: {
    [LARGE]: css`
      padding: 8px 16px 16px;
      ${media.sm`
        padding: 16px 24px 16px 24px;
      `}
    `,
    [MEDIUM]: 'padding: 13px 16px;',
    [SMALL]: 'padding: 8px 8px 16px;',
  },
  [SLIDESHOW]: {
    [LARGE]: css`
      padding: 14px 16px 8px;
      ${media.sm`
        padding: 24px
      `}
    `,
    [MEDIUM]: css`
      padding: 14px 16px 8px;
    `,
    [SMALL]: css`
      padding: 8px 8px 4px;
    `,
  },
  [VIDEO]: {
    [LARGE]: css`
      padding: 14px 16px 8px;
      ${media.sm`
        padding: 12px 24px
      `}
    `,
    [MEDIUM]: css`
      padding: 4px 16px;
    `,
    [SMALL]: css`
      padding: 4px 8px;
    `,
  },
  [LIVE_STREAM]: {
    [LARGE]: css`
      padding: 16px;
      ${media.sm`
        padding: 24px;
      `}
    `,
    [MEDIUM]: 'padding: 8px 16px 16px;',
    [SMALL]: 'padding: 8px 8px 16px;',
  },
  [SHOW]: {
    [LARGE]: css`
      padding: 16px;
      ${media.sm`
        padding: 24px;
      `}
    `,
    [MEDIUM]: 'padding: 8px 16px 16px;',
    [SMALL]: 'padding: 8px 8px 16px;',
  },
  [SOCCER_MATCH]: {
    [LARGE]: css`
      padding: 16px;
      ${media.sm`
        padding: 24px;
      `}
    `,
    [MEDIUM]: 'padding: 8px 16px;',
    [SMALL]: 'padding: 8px 8px 16px;',
  },
  [EXTERNAL_CONTENT_PROMO]: {
    [LARGE]: css`
      padding: 16px;
      ${media.sm`
        padding: 24px;
      `}
    `,
    [MEDIUM]: 'padding: 8px 16px 16px;',
    [SMALL]: 'padding: 8px;',
  },
  [EXTERNAL_LINK]: {
    [LARGE]: css`
      padding: 16px;
      ${media.sm`
        padding: 24px;
      `}
    `,
    [MEDIUM]: 'padding: 8px 16px 16px;',
    [SMALL]: 'padding: 8px;',
  },
  [HOROSCOPE]: {
    [LARGE]: 'padding: 24px 24px 16px;',
    [MEDIUM]: 'padding: 16px;',
    [SMALL]: 'padding: 16px 16px 8px;',
  },
};

/**
 * Get title padding
 * @param {string} size the size of the card
 * @param {string} type the type of the card
 * @returns {string}
 */
const getTitlePadding = ({
  size,
  type,
  showBadge,
}) => {
  // Livestream with badge case
  if (type === LIVE_STREAM && showBadge) {
    return getFromMap(size, livestreamWithBadge);
  }
  // Generic cases
  return getKey(paddingMap, `${type}.${size}`);
};

/**
 * Get title color
 * @param {string} type the type of the card
 * @param {bool} isDark if in dark mode
 * @returns {string}
 */
const getTitleColor = (type, isDark) => getFromMap(type, {
  [ARTICLE]: isDark ? WHITE : BLACK,
  [ADVERTISING]: isDark ? WHITE : BLACK,
  [LIVE_BLOG]: WHITE,
  [SLIDESHOW]: WHITE,
  [VIDEO]: WHITE,
  [LIVE_STREAM]: isDark ? WHITE : BLACK,
  [SHOW]: isDark ? WHITE : BLACK,
  [SOCCER_MATCH]: WHITE,
  [EXTERNAL_CONTENT_PROMO]: WHITE,
  [EXTERNAL_LINK]: WHITE,
  [HOROSCOPE]: WHITE,
  default: isDark ? WHITE : BLACK,
});

/* ${numberOfLines(type === SOCCER_MATCH ? 2 : 3)} */
const DEFAULT_NUMBER_OF_LINES = {
  [LARGE]: css`
    ${numberOfLines(4)}
  `,
  [MEDIUM]: css`
    ${numberOfLines(3)}
  `,
  [SMALL]: css`
    ${numberOfLines(3)}
    ${media.md`
      ${numberOfLines(1)}
    `}
    ${media.lg`
      ${numberOfLines(3)}
    `}
  `,
};
const numberOfLinesMap = {
  [SOCCER_MATCH]: {
    ...DEFAULT_NUMBER_OF_LINES,
    [LARGE]: css`
      ${numberOfLines(4)}
      ${media.md`
        ${numberOfLines(3)}
      `}
      ${media.lg`
        ${numberOfLines(3)}
      `}
    `,
  },
  [HOROSCOPE]: {
    [LARGE]: css`
      ${numberOfLines(4)}
      ${media.md`
        ${numberOfLines(3)}
      `}
    `,
    [MEDIUM]: css`
      ${numberOfLines(3)}
    `,
    [SMALL]: css`
      ${numberOfLines(3)}
      ${mediaRange(APP_BREAKPOINTS.md, APP_BREAKPOINTS.lg, `
        ${numberOfLines(2)}
      `)}
    `,
  },
  [VIDEO]: {
    ...DEFAULT_NUMBER_OF_LINES,
    [SMALL]: css`
    ${numberOfLines(3)}
    ${mediaRange(APP_BREAKPOINTS.md, APP_BREAKPOINTS.lg, `
      ${numberOfLines(2)}
    `)}
  `,
  },
  [SHOW]: {
    ...DEFAULT_NUMBER_OF_LINES,
    [SMALL]: css`
    ${numberOfLines(3)}
    ${mediaRange(APP_BREAKPOINTS.md, APP_BREAKPOINTS.lg, `
      ${numberOfLines(2)}
    `)}
  `,
  },
  default: DEFAULT_NUMBER_OF_LINES,
};

/**
 * Get number of lines on title by card size
 * @param {string} size the size of the card
 * @param {string} type the card type
 * @returns {string}
 */
const getNumberOfLines = ({ size, type }) => getKey(
  numberOfLinesMap, `${type}.${size}`, numberOfLinesMap.default[size]
);

export default {
  titleWrapper: css`
    align-items: flex-start;
    display: flex;
  `,

  title: ({
    titleSize,
    type,
    isDark,
    showBadge,
    isWorldCupMVP,
  }) => css`
    margin: 0;
    text-align: left;
    ${getSquareCardHeaderStyles(titleSize, { color: getTitleColor(type, isDark) })}
    ${getTitlePadding({ size: titleSize, type, showBadge })}
    ${mediaRange(APP_BREAKPOINTS.xxs, MOBILE_SCREEN_SIZE_SMALL, `
      font-size: ${rem('12px')};
      line-height: ${rem('14px')};
    `)}
    ${isWorldCupMVP && css`
      ${mediaRange(APP_BREAKPOINTS.xxs, MOBILE_SCREEN_SIZE_SMALL, `
        font-size: ${rem('16px')};
        line-height: ${rem('20px')};
        padding-bottom: 5px;
      `)}
    `}
  `,

  link: ({ size, type }) => css`
    ${getNumberOfLines({ size, type })}
  `,
};
