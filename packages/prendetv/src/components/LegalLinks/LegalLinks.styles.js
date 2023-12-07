/**
 * @module PrendeTV Legal Links Styles
 */
import { css } from 'styled-components';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

import { BITTERSWEET, CHINESE_SILVER, MONTSERRAT_FONT_FAMILY } from '@univision/fe-utilities/styled/constants';

export default {
  wrapper: ({ vertical }) => css`
    margin: 28px 0 0;

    ${vertical && css`
      display: flex;
      flex-direction: column;
      margin: auto 0;
      > a {
        display: block;
        font-size: ${rem(10)};
        margin-bottom: 16px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    `}
  `,
  link: css`
    color: ${CHINESE_SILVER};
    display: inline-block;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(9)};
    letter-spacing: ${rem('0.56')};
    line-height: ${rem('15')};
    margin: auto 16px auto 0;
    text-decoration: underline;
    &:hover {
      color: ${BITTERSWEET};
    }
  `,
};
