/**
 * @module PrendeTV Not Found Styles
 */
import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import { MONTSERRAT_FONT_FAMILY, WHITE } from '@univision/fe-utilities/styled/constants';

export default {
  image: css`
    height: 100vh;
    max-height: 814px;
    width: 100vw;
  `,
  plugImage: css`
    position: absolute;
    top: 40%;
    width: 100%;

    ${media.xs`
      top: 20%;
    `}
  `,
  text: ({ big, small, medium }) => css`
    color: ${WHITE};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-weight: bold;
    letter-spacing: 0;
    line-height: ${rem('64px')};
    text-align: center;

    ${small && css`font-size: ${rem('24px')}`}
    ${medium && css`font-size: ${rem('48px')}`}
    ${big && css`font-size: ${rem('72px')}`}
  `,
  textWrapper: css`
    left: 50%;
    position: absolute;
    top: 40%;
    transform: translate(-50%, -80%);
    width: 100%;

    ${media.xs`
      top: 50%;
    `}
  `,
  wrapper: css`
    display: inline-block;
    position: relative;
  `,
};
