/**
 * @module PrendeTV Live Channel Styles
 */
import { css } from 'styled-components';

import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BLACK, BITTERSWEET, MONTSERRAT_FONT_FAMILY, SHAMROCK, WHITE,
} from '@univision/fe-utilities/styled/constants';

import { isLandingPage } from '../../utils';

export default {
  wrapper: ({ page }) => css`
    background-color: ${WHITE};
    margin: 0 auto;
    padding: 50px 20px 40px;
    width: 100%;

    ${!isLandingPage(page) && css`
      background-color: ${BLACK};
      padding: 57px 20px 54px;
    `}

    ${media.md`
      padding: 60px 0 70px;

      ${!isLandingPage(page) && css`
        padding: 76px 0 57px;
      `}
    `}
  `,
  innerWrapper: css`
    margin: 0 auto;
    max-width: 374px;
    text-align: center;
    width: 100%;

    ${media.md`
      max-width: 1228px;
    `}
  `,
  image: css`
    width: 100%;
    ${media.md`
      max-width: 1035px;
    `}
  `,
  title: ({ page }) => css`
    color: ${BITTERSWEET};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(30)};
    font-weight: 900;
    letter-spacing: 0.27px;
    line-height: ${rem(26)};
    margin: 45px auto 0;

    ${!isLandingPage(page) && css`
      margin: 65px auto 0;
    `}

    ${media.md`
      font-size: ${rem(44)};
      letter-spacing: 0.96px;
      line-height: ${rem(43)};
      margin: 54px auto 0;

      ${!isLandingPage(page) && css`
        margin: 84px auto 0;
      `}
    `}
  `,
  text: ({ page }) => css`
    color: ${isLandingPage(page) ? BLACK : WHITE};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(20)};
    font-weight: 400;
    letter-spacing: 1.25px;
    line-height: ${rem(24)};
    margin: 20px auto 0;
    max-width: 338px;

    ${media.md`
      margin: 40px auto 0;
      font-size: ${rem(32)};
      letter-spacing: 2px;
      line-height: ${rem(40)};
      max-width: 837px;
    `}
  `,
  bullets: css`
    display: grid;
    list-style: none;
    margin: 37px auto 0;
    padding: 0;
    row-gap: 15px;

    ${media.md`
      margin: 64px auto 0;
      row-gap: 52px;
    `}
  `,
  bulletItem: css`
    color: ${WHITE};

    display: block;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(20)};
    font-weight: 400;
    letter-spacing: 1.25px;
    line-height: ${rem(24)};
    text-align: center;

    ${media.md`
      font-size: ${rem(32)};
      letter-spacing: 2px;
      line-height: ${rem(40)};
    `}
  `,
  partnerWithUsText: css`
    color: ${WHITE};
    display: block;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(16)};
    font-weight: 600;
    letter-spacing: ${rem(1.25)};
    line-height: ${rem(24)};
    margin: 50px auto 0;
    text-transform: uppercase;

    ${media.md`
      font-size: ${rem(28)};
      letter-spacing: ${rem(1.75)};
      line-height: ${rem(27)};
      margin: 80px auto 0;
    `}
  `,
  link: css`
    color: ${SHAMROCK};
    display: block;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(20)};
    font-weight: 400;
    letter-spacing: ${rem(1.25)};
    line-height: ${rem(27)};
    margin: 10px auto 0;
    max-height: 43px;
    max-width: 509px;
    text-align: center;
    text-transform: lowercase;

    &:hover{
      color: ${BITTERSWEET};
      text-decoration: none;
    }

    ${media.md`
      font-size: ${rem(32)};
      font-weight: 400;
      letter-spacing: ${rem(2)};
      line-height: ${rem(27)};
      margin: 19px auto 0;
    `}
  `,
};
