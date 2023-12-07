/**
 * @module PrendeTV Supported Devices Styles
 */
import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BLACK,
  BITTERSWEET,
  MONTSERRAT_FONT_FAMILY,
  WHITE,
} from '@univision/fe-utilities/styled/constants';

import { COMPUTER, MOBILE } from '../../constants';

export default {
  wrapper: css`
    background-color: ${BLACK};
    margin: 0 auto;
    padding: 44px 0 45px;
    width: 100%;

    ${media.md`
      padding: 55px 0 58px;
    `}
  `,
  innerWrapper: css`
    margin: 0 auto;
    max-width: 376px;
    text-align: center;
    width: 100%;

    ${media.md`
      max-width: 1004px;
    `}
  `,
  title: css`
    color: ${BITTERSWEET};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(30)};
    font-weight: 900;
    letter-spacing: 0.27px;
    line-height: ${rem(26)};
    margin: 0 auto;
    max-width: 296px;

    ${media.md`
      font-size: ${rem(44)};
      letter-spacing: 0.96px;
      line-height: ${rem(43)};
      max-width: 1051px;
    `}
  `,
  list: css`
    display: block;
    list-style: none;
    margin: 45px auto 0;
    padding: 0;
    width: 100%;

    ${media.md`
      margin: 60px auto 0;
      display: flex;
    `}
  `,
  item: css`
    align-items: start;
    display: block;
    margin: 0 0 38px;
    vertical-align: top;
    width: 100%;

    &:last-child {
      margin: 0;
    }

    ${media.md`
      margin: 0;
      &:last-child {
        width: 60%;
      }
    `}
  `,
  containerLogoDevice: css`
    ${media.md`
      height: 176px;
      align-content: end;
      display: grid;
    `}
  `,
  logoDevice: ({ type }) => css`
    margin: 0 auto;
    max-width: 154px;
    width:100%;

    ${type === COMPUTER && css`
      max-width: 104px;
    `}

    ${type === MOBILE && css`
      max-width: 48px;
    `}

    ${media.md`
      max-width: 246px;

      ${type === COMPUTER && css`
        max-width: 188px;
      `}

      ${type === MOBILE && css`
        max-width: 72px;
      `}
    `}
  `,
  infoDevice: css`
    color: ${WHITE};
    display: block;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(12)};
    letter-spacing: 0.75px;
    line-height: ${rem(15)};
    margin: 10px auto 0;
    max-width: 110px;
    text-align: center;

    ${media.md`
      display: block;
      font-size: ${rem(16)};
      letter-spacing: 1px;
      line-height: ${rem(19)};
      text-align: center;
      padding: 0;
      margin: 70px auto 0;
      max-width: unset;
      width: 100%;
    `}
  `,
};
