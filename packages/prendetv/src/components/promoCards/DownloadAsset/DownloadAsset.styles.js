/**
 * @module PrendeTV Download Asset Promo Card styles
 */
import { css } from 'styled-components';

import {
  media,
  rem,
} from '@univision/fe-commons/dist/utils/styled/mixins';

import {
  BITTERSWEET,
  BLACK,
  MONTSERRAT_FONT_FAMILY,
  WHITE,
} from '@univision/fe-utilities/styled/constants';

export default {
  containerLogoDevice: css`
    width: 100%;
  `,
  headLine: css`
    color: ${BITTERSWEET};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(30)};
    font-weight: 900;
    letter-spacing: ${rem('0.27px')};
    line-height: ${rem(26)};
    margin: 0 auto;
    text-align: center;

    ${media.md`
      font-size: ${rem(44)};
      letter-spacing ${rem('0.96px')};
      line-height: ${rem(43)};
    `}
  `,
  image: css`
    margin: 0 auto;
    max-width: 177px;
    width: 100%;

    ${media.md`
      max-width: 231px;
    `}
  `,
  info: css`
    color: ${WHITE};
    display: block;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(12)};
    font-weight: 700;
    letter-spacing: ${rem('0.75px')};
    line-height: ${rem(15)};
    margin: 19px 0 0;
    padding: 0;
    text-align: center;
    width: 100%;

    ${media.md`
      font-size: ${rem(16)};
      letter-spacing: ${rem(1)};
      line-height: ${rem(36)};
      margin: 25px 0 0;
      font-weight: 600;
    `}
  `,
  innerWrapper: css`
    margin: 0 auto;
    width: 100%;

    ${media.md`
      max-width: 1060px;
    `}
  `,
  item: css`
    justify-self: flex-start;

    &:nth-child(odd) {
      justify-self: flex-end;
    }
  `,
  link: css`
    display: block;
    text-decoration: none;
  `,
  list: css`
    display: grid;
    grid-gap: 3vw;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    list-style: none;
    margin-top: 33px;
    padding: 0;
    width: 100%;
  `,
  subHeadLine: css`
    color: ${BITTERSWEET};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(20)};
    font-weight: 400;
    letter-spacing: ${rem('1.25px')};
    line-height: ${rem(24)};
    margin: 17px 0 0;
    text-align: center;

    ${media.md`
      font-size: ${rem(32)};
      letter-spacing ${rem(2)};
      line-height: ${rem(40)};
      margin: 40px 0 0;
    `}
  `,
  wrapper: css`
    background-color: ${BLACK};
    margin: 0 auto;
    padding: 40px 20px 58px;
    width: 100%;

    ${media.md`
      padding: 57px 0 52px;
    `}
  `,
};
