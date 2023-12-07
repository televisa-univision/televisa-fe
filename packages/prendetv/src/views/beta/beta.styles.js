/**
 * @module PrendeTV Beta styles
 */
import { css } from 'styled-components';

import {
  rem,
  media,
} from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BITTERSWEET,
  BLACK,
  MONTSERRAT_FONT_FAMILY,
  SHAMROCK,
  WHITE,
} from '@univision/fe-utilities/styled/constants';

export default {
  button: css`
    background-color: ${SHAMROCK};
    border-radius: 4px;
    color: ${BLACK};
    display: inline-block;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem('14px')};
    font-weight: bold;
    padding: 10px 0;
    text-transform: uppercase;
    width: 198px;
  `,
  buttonWrapper: css`
    padding: 30px 0 45px;
    text-align: center;
  `,
  contentWrapper: css`
    padding: 0 35px;
  `,
  disclaimer: css`
    font-size: ${rem('16px')};
    font-style: italic;
    line-height: ${rem('22px')};
  `,
  header: css`
    background-color: ${BITTERSWEET};
    padding: 20px 0;

    h1 {
      color: ${WHITE};
      font-family: ${MONTSERRAT_FONT_FAMILY};
      font-size: ${rem('30px')};
      font-weight: bold;
      letter-spacing: ${rem('0.27px')};
      line-height: ${rem('26px')};
      margin: auto;
      max-width: 320px;
      text-align: center;
      text-transform: uppercase;

      ${media.sm`
        max-width: none;
      `}
    }
  `,
  introOutro: css`
    font-size: ${rem('20px')};
    font-weight: bold;
    line-height: ${rem('26px')};
    margin: 35px auto;
    max-width: 835px;

    a {
      color: ${SHAMROCK};
    }

    ${media.md`
      margin: 48px auto 48px;
    `}
  `,
  mainContent: css`
    font-size: ${rem('20px')};
    line-height: ${rem('24px')};
    margin: auto;
    max-width: 835px;
  `,
  title: css`
    color: ${BITTERSWEET};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem('24px')};
    line-height: ${rem('29px')};
    margin: 20px auto;
    max-width: 835px;
  `,
  wrapper: css`
    background: ${BLACK};
    color: ${WHITE};
    padding-bottom: 4px;
  `,
};
