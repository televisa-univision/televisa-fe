import { css } from 'styled-components';

import {
  APP_BREAKPOINTS,
  DUSTY_GRAY,
  MOBILE_SCREEN_SIZE_SMALL,
  ROBOTO_CONDENSED_FONT_FAMILY,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import numberOfLines from '@univision/fe-utilities/styled/mixins/numberOfLines';

import media from '@univision/fe-utilities/styled/mixins/media';
import mediaRange from '@univision/fe-utilities/styled/mixins/mediaRange';

export default {
  collectionWrapper: css`
    position: relative;

    ${media.sm`
      margin-top: 10px;
    `}

    &::before {
      border-left: 1px solid ${DUSTY_GRAY};
      content: "";
      height: 90%;
      position: absolute;
      top: 8px;
    }
  `,
  listWrapper: css`
    list-style: none;
    padding-left: 30px;
    position: relative;
  `,
  listItem: css`
    color: white;
    font-size: ${rem(14)};
    font-weight: 300;
    letter-spacing: 0;
    line-height: 18px;
    margin-top: 12px;

    ${mediaRange(APP_BREAKPOINTS.xxs, MOBILE_SCREEN_SIZE_SMALL, `
      margin-top: 0px;
    `)}

    ${numberOfLines(2)};

    &::before {
      color: white;
      content: '\\25CF';
      font-size: ${rem(16)};
      left: 15px;
      position: absolute;
    }
  `,
  linkWrapper: css`
    color: ${WHITE};

    &:hover {
      color: ${WHITE};
    }
  `,
  relatedLabel: css`
    font-family: ${ROBOTO_CONDENSED_FONT_FAMILY};
    font-size: ${rem(10)};
    font-weight: bold;
    letter-spacing: ${rem(1)};
    padding-left: 16px;
    text-transform: uppercase;
  `,
};
