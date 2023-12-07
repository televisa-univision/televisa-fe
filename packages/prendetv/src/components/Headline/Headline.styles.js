/**
 * @module PrendeTV Headline Styles
 */
import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BITTERSWEET, BLACK, MONTSERRAT_FONT_FAMILY,
} from '@univision/fe-utilities/styled/constants';

import { getHeadlineBackColor, getHeadlineFontColor, isLandingPage } from '../../utils';

export default {
  wrapper: ({ page }) => css`
    background-color: ${getHeadlineBackColor(page)};
    margin: 0 auto;
    min-height: 220px;
    width: 100%;
  `,
  innerWrapper: ({ page }) => css`
    padding: 40px 28px;
    text-align: center;
    width: 100%;

    ${!isLandingPage(page) && css`
      padding: 30px 0 0;
    `}

    ${media.md`
      padding: 44px 0;
      margin: 0 auto;

      ${!isLandingPage(page) && css`
        padding: 46px 0 0;
      `}
    `}
  `,
  title: ({ page }) => css`
    color: ${getHeadlineFontColor(page)};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(30)};
    font-weight: 900;
    letter-spacing: 0.27px;
    line-height: ${rem(26)};

    ${media.md`
      font-size: ${rem(44)};
      letter-spacing: 0.96px;
      line-height: ${rem(43)};

      ${!isLandingPage(page) && css`
        margin: 0 auto;
        max-width: 880px;
      `}
    `}
  `,
  subTitle: ({ page }) => css`
    color: ${getHeadlineFontColor(page)};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(20)};
    font-weight: 400;
    letter-spacing: 1.25px;
    line-height: ${rem(24)};
    margin: 20px auto 0;
    max-width: 300px;

    ${!isLandingPage(page) && css`
      margin: 18px auto 0;
      max-width: 358px;
    `}

    ${media.md`
      font-size: ${rem(32)};
      letter-spacing: 2px;
      line-height: ${rem(40)};
      margin: 20px auto 0;
      max-width: 837px;

      ${!isLandingPage(page) && css`
        margin: 30px auto 0;
        max-width: 1035px;
      `}
    `}
  `,
  text: ({ page }) => css`
    color: ${BLACK};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(16)};
    font-weight: 600;
    letter-spacing: 1px;
    line-height: ${rem(19)};
    margin: 30px auto 0;
    text-align: center;

    ${!isLandingPage(page) && css`
      background-color: ${BITTERSWEET};
      margin: 35px 0 0;
      padding: 11px 30px 16px;
    `}

    ${media.md`
      margin: 25px 0 0;
      font-size: ${rem(28)};
      letter-spacing: 1.75px;
      line-height: ${rem(34)};

      ${!isLandingPage(page) && css`
        line-height: ${rem(36)};
        margin: 50px 0 0;
        padding: 12px 0;
      `}
    `}
  `,
};
