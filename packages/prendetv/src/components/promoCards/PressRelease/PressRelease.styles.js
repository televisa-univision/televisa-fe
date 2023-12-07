/**
 * @module Press Release Promo Card styles
 */
import { css } from 'styled-components';

import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BITTERSWEET, MONTSERRAT_FONT_FAMILY, WHITE,
} from '@univision/fe-utilities/styled/constants';

export default {
  innerWrapper: css`
    margin: 0 auto;
    max-width: 1440px;
    width: 100%;
  `,
  newsListContainer: css`
    display: block;
    width: 100%;

    ${media.md`
      margin: 50px auto 0;
      max-width: 1050px;
    `}
  `,
  title: css`
    color: ${BITTERSWEET};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(30)};
    font-weight: 900;
    letter-spacing: ${rem('0.27px')};
    line-height: ${rem(26)};
    margin: 0;
    text-align: center;
    text-transform: uppercase;

    ${media.md`
      font-size: ${rem(44)};
      letter-spacing: ${rem('0.96px')};
      line-height: ${rem(43)};
    `}
  `,
  wrapper: css`
    background-color: ${WHITE};
    padding: 20px;
    width: 100%;

    ${media.md`
      padding: 45px 0 60px;
    `}
  `,
};
