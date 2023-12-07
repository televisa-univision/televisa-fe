/**
 * @module PrendeTV Legal Links Styles
 */
import { css } from 'styled-components';

import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { CHINESE_SILVER, MONTSERRAT_FONT_FAMILY } from '@univision/fe-utilities/styled/constants';

export default {
  link: ({ vertical }) => css`
    align-items: center;
    color: ${CHINESE_SILVER};
    display: flex;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem('10px')};
    letter-spacing: ${rem('0.63px')};
    line-height: ${rem('15px')};
    margin: auto 0;
    text-decoration: underline;

    > img {
      height: ${vertical ? 52 : 41}px;
      margin: ${vertical ? '0 0 12px 0' : '10px 0'};

      ${media.md`
        ${vertical ? css`
          display: block;
        ` : css`
          display: inline-block;
          height: 54px;
        `}
      `}
    }
  `,
  wrapper: ({ vertical }) => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: ${vertical ? 'space-between' : 'flex-start'};
    margin: 28px 0;

    ${vertical ? css`
      flex-direction: column;
      margin: 0;
      > a {
        display: block;

        &:last-child img {
          margin: 0;
        }
      }
    ` : css`
      a:nth-child(odd) {
        margin-right: 20px;
      }
      a:nth-child(even) {
        margin-right: 40px;
      }

      ${media.md`
        a:nth-child(n) {
          margin-right: 32px;
        }
      `}
    `}

    ${media.md`
      justify-content: initial;
    `}
  `,
};
