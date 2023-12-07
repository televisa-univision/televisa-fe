/**
 * @module PrendeTV Subscribe Styes
 */
import { css } from 'styled-components';

import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { NERO, MONTSERRAT_FONT_FAMILY, WHITE } from '@univision/fe-utilities/styled/constants';

export default {
  wrapper: css`
    background-color: ${NERO};
    margin: 0 auto;
    padding: 35px 0 15px;
    width: 100%;

    ${media.md`
      padding: 48px 0 41px;
    `}
  `,
  innerWrapper: css`
    margin: 0 auto;
    max-width: 352px;
    text-align: center;
    width: 100%;
    ${media.md`
      max-width: 960px;
    `}
  `,
  title: css`
    color: ${WHITE};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(20)};
    font-weight: 400;
    letter-spacing: 1.25px;
    line-height: ${rem(24)};
    margin: 0;

    ${media.md`
      font-size: ${rem(32)};
      letter-spacing: 2px;
      line-height: ${rem(40)};
      margin: 0 auto;
      max-width: 1000px;
    `}
  `,
  iframeContainer: css`
    border: 0;
    display: block;
    height: 160px;
    margin: 30px auto 0 !important;
    width: 100%;

    ${media.md`
      margin: 30px auto 0 !important;
      height: 140px;
    `}
  `,
};
