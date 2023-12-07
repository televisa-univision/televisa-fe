/**
 * @module PrendeTV Navigation Styles
 */
import { css } from 'styled-components';

import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BITTERSWEET, CHINESE_SILVER, MONTSERRAT_FONT_FAMILY,
} from '@univision/fe-utilities/styled/constants';

export default {
  list: ({ isFooter }) => css`
    display: inline-block;
    margin: 10px 0 0;
    text-align: left;
    width: 100%;

    ${!isFooter && css`
      display: flex;
      flex-direction: column;
      margin: 0;
      max-height: 140px;
    `}

    ${media.md`
      justify-content: unset;
    `}

    div:last-child a {
      margin: 0;
    }
  `,
  item: ({ isFooter }) => css`
    display: block;

    ${isFooter && css`
      border-bottom: 1px solid ${CHINESE_SILVER};
      margin: 14px 0px 10px 0;
      padding: 0 0 14px 0;

      ${media.md`
        border: 0;
        display: inline-flex;
        margin: 0 50px 0 0;
      `}
    `}
  `,
  link: ({ isFooter }) => css`
    color: ${CHINESE_SILVER};
    display: inherit;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${isFooter ? rem(12) : rem(15)};
    font-weight: bold;
    letter-spacing: ${rem(1.25)};
    line-height: ${rem(15)};
    text-decoration: none;
    text-transform: uppercase;

    &:hover,
    &.active {
      color: ${BITTERSWEET};
    }

    ${isFooter ? css`
      letter-spacing: ${rem(0.75)};
    ` : css`
      margin-bottom: 24px;
    `}
  `,
};
