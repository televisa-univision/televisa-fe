/**
 * @module PrendeTV Feature with headlines
 */
import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

import {
  BLACK,
  BITTERSWEET,
  MONTSERRAT_FONT_FAMILY,
  WHITE,
  ZINDEX_BASE_SCREEN,
} from '@univision/fe-utilities/styled/constants';

export default {
  containerGradient: css`
    background-image: linear-gradient(transparent, ${BLACK});
    bottom: -1px;
    height: 50%;
    position: absolute;
    width: 100%;
    z-index: ${ZINDEX_BASE_SCREEN};

    ${media.md`
      height: 219px;
    `}
  `,
  link: css`
    background-color: transparent;
    border: 1px solid ${BITTERSWEET};
    bottom: 20px;
    color: ${WHITE};
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    &:hover {
      background: ${BITTERSWEET};
      color: ${WHITE};
    }

    ${media.md`
      bottom: 45px;
    `}
  `,
  toggleAudio: css`
    background: ${BITTERSWEET};
    border-radius: 50%;
    color: ${WHITE};
    cursor: pointer;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem('14px')};
    letter-spacing: ${rem('0.75px')};
    line-height: ${rem('14px')};
    padding: 10px;
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: ${ZINDEX_BASE_SCREEN};
  `,
  videoWrapper: css`
    margin: 0 auto;
    padding: 0;

    div[id^='player-'] {
      max-width: 100%;
    }

    ${media.md`
      border: 7.5px solid ${BLACK};
      margin: 30px auto 25px;
      max-width: 747px;
    `}
  `,
};
