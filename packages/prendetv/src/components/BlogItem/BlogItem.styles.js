/**
 * @module PrendeTV Blog Item component styles
 */
import { css } from 'styled-components';

import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BLACK,
  BLACK_GREY,
  BITTERSWEET,
  MONTSERRAT_FONT_FAMILY,
  VERY_LIGHT_GREY,
} from '@univision/fe-utilities/styled/constants';

export default {
  author: ({ consecutive }) => css`
    display: none;

    ${consecutive === 0 && css`
      color: ${BLACK};
      display: block;
      font-size: ${rem(10)};
      grid-column: span 2;
      line-height: ${rem(14)};
      margin: 12px 12px 0;
      text-transform: uppercase;
    `}

    ${consecutive === 0 && media.md`
      grid-column-start: 1;
      margin-top: 35px;
    `}
  `,
  blogImage: css`
    width: 100%;
  `,
  blogImageContainer: ({ consecutive }) => css`
    grid-row-start: 1;

    ${consecutive === 0 && css`
      grid-column: span 2;
    `}

    ${consecutive !== 0 && css`
      grid-column-start: 2;
      grid-row-end: 4;
      padding-right: 15px;
    `}

    ${media.md`
      padding-right: 0;
    `}

    ${consecutive === 0 && media.md`
      grid-column: 2;
      grid-row-end: 7;
    `}

    ${consecutive !== 0 && media.md`
      grid-column-start: 3;
    `}
  `,
  container: ({ consecutive }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: auto;
    max-width: 1045px;

    ${consecutive === 0 && media.md`
      grid-template-columns: 1fr 1.2fr;
    `}

    ${consecutive !== 0 && media.md`
      grid-template-columns: 120px 3fr 1fr;
    `}
  `,
  description: ({ consecutive }) => css`
    color: ${BLACK_GREY};
    font-weight: 100;
    grid-column: span 2;
    margin: 12px;

    ${consecutive === 0 && media.md`
      grid-column: 1;
      padding-right: 45px;
    `}

    ${consecutive !== 0 && media.md`
      grid-column: 1;
      grid-column-start: 2;
    `}
  `,
  featuredTags: ({ consecutive }) => css`
    display: none;

    ${consecutive === 0 && css`
      color: ${BITTERSWEET};
      display: block;
      font-family: ${MONTSERRAT_FONT_FAMILY};
      font-size: ${rem(12)};
      font-weight: 700;
      grid-column: span 2;
      line-height: ${rem(14)};
      margin: 12px;
      text-transform: uppercase;
    `}

    ${consecutive === 0 && media.md`
      grid-column: 1;
      grid-column-start: 1;
    `}
  `,
  publishDate: ({ consecutive }) => css`
    margin: 12px;

    > p {
      color: ${BITTERSWEET};
      font-family: ${MONTSERRAT_FONT_FAMILY};
      font-size: ${rem(12)};
      font-weight: 700;
      line-height: ${rem(14)};
      text-transform: uppercase;
    }

    ${consecutive === 0 && css`
      grid-row-start: 5;
      margin: 0 12px;

      > p {
        color: ${BLACK};
        font-family: inherit;
        font-size: ${rem(10)};
        font-weight: 100;
        line-height: ${rem(14)};
      }
    `}

    ${consecutive === 0 && media.md`
      grid-row-start: 4;
    `}

    ${consecutive !== 0 && media.md`
      margin: 0 12px;
    `}
  `,
  seeMore: ({ consecutive }) => css`
    color: ${BITTERSWEET};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(12)};
    grid-column: span 2;
    line-height: ${rem(14)};
    margin: 12px;

    ${consecutive === 0 && media.md`
      display: none;
    `}

    ${consecutive !== 0 && media.md`
      grid-column: 1;
      grid-column-start: 2;
    `}
  `,
  separator: ({ consecutive }) => css`
    border: 1px solid ${VERY_LIGHT_GREY};
    grid-column: span 2;
    width: 85%;

    ${media.md`
      margin: 20px auto;
      grid-column: span 3;
    `}

    ${consecutive === 0 && media.md`
      margin-bottom: 40px;
    `}
  `,
  title: ({ consecutive }) => css`
    color: ${BLACK};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(24)};
    line-height: ${rem(29)};
    margin: 0 12px;

    ${consecutive === 0 && css`
      grid-column: span 2;
    `}

    ${consecutive !== 0 && css`
      font-size: ${rem(16)};
      font-weight: 600;
      line-height: ${rem(20)};
    `}

    ${media.md`
      font-weight: 600;
      grid-column: 1;
    `}

    ${consecutive === 0 && media.md`
      padding-right: 45px
    `}

    ${consecutive !== 0 && media.md`
      grid-column-start: 2;
    `}
  `,
};
