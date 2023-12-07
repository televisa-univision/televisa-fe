import { css } from 'styled-components';

import {
  BLACK,
  GREY_BLACK,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';

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
  title: ({
    theme, isDark, listGrid, isTitleCase, singleCard,
  }) => css`
    color: ${getTitleColor({ theme, isDark })};
    display: block;
    font-size: ${singleCard ? rem('22px') : rem('18px')};
    line-height: ${rem('24px')};
    position: relative;
    text-transform: ${isTitleCase ? 'capitalize' : 'uppercase'};
    & a {
      color: ${getTitleColor({ theme, isDark })};

      &:hover {
        color: ${GREY_BLACK};
      }
    }
    ${media.md`
      padding: ${listGrid ? '0 0 4px 0' : '0 0 16px 0'};
      font-size: ${singleCard ? rem('26px') : rem('18px')};
    `}
    ${media.lg`
      padding: ${listGrid ? '0 0 10px 0' : '0 0 16px 0'};
    `}
    ${isTitleCase && css`
      font-size: ${rem('22px')};
      line-height: ${rem('26px')};
      ${media.md`
      font-size: ${rem('26px')};
    `}
    `}
  `,
};
