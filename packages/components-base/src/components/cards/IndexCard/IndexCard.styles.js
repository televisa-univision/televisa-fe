import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import {
  BLACK,
  WHITE,
  DARKER_GREY,
  GREY_BLACK,
} from '@univision/fe-utilities/styled/constants';

const CONTENT_COLUMN_WIDTH = '80%';

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

/**
 * IndexCard stylesheet
 */
export default {
  contentColumn: ({ hideImage }) => css`
    ${hideImage
    && css`
      ${media.md`
        flex-basis: ${CONTENT_COLUMN_WIDTH};
      `}
    `}

    ${!hideImage
      && css`
      ${media.md`
        flex-basis: calc(${CONTENT_COLUMN_WIDTH} - 140px);
      `}
      ${media.lg`
        flex-basis: calc(${CONTENT_COLUMN_WIDTH} - 198px);
      `}
    `}
  `,
  dataColumn: css`
    flex-basis: 25%;
    margin-right: 16px;

    ${media.md`
      text-align: right;
    `}
  `,
  description: css`
    color: ${DARKER_GREY};
    font-size: ${rem(14)};
    line-height: ${rem(18)};
    margin-bottom: 8px;
  `,
  titleLink: ({ isDarkTheme, theme }) => css`
    color: ${getTitleColor({ theme, isDark: isDarkTheme })};
    font-size: ${rem(14)};
    letter-spacing: -0.4px;
    line-height: ${rem(18)};
    margin-bottom: 4px;

    &:hover {
      color: ${!theme?.widgetTitleColor
        ? GREY_BLACK
        : getTitleColor({ theme, isDark: isDarkTheme })};
    }
  `,
  wrapper: css`
    overflow: auto;
    padding: 16px 0;

    ${media.md`
      display: flex;
    `}
  `,
  imageColumn: css`
    float: left;
    margin-right: 8px;

    ${media.sm`
      margin-right: 16px;
    `}

    ${media.md`
      float: none;
      flex-basis: 198px;
    `}
  `,
};
