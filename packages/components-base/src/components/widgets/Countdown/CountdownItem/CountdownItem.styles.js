import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import mediaRange from '@univision/fe-utilities/styled/mixins/mediaRange';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  APP_BREAKPOINTS,
  BLACK,
  GREY_BLACK,
  MOBILE_SCREEN_SIZE_SMALL,
  WHITE_GREY,
  WHITE,
} from '@univision/fe-utilities/styled/constants';

export default {
  timerItem: ({ isPrendeTV }) => css`
    color: ${isPrendeTV ? WHITE : GREY_BLACK};
    display: flex;
    flex-direction: column;
    font-size: ${rem(isPrendeTV ? 10 : 9)};
    line-height: ${rem('11px')};
    padding: 0 16px;
    position: relative;
    text-align: center;

    ${isPrendeTV ? css`
      letter-spacing: 0.4px;
      padding: 0 22px;
      text-transform: uppercase;

      ${mediaRange(APP_BREAKPOINTS.xxs, MOBILE_SCREEN_SIZE_SMALL, `
        padding: 0 12px;
      `)}
    ` : css`
      font-weight: 400;
    `}

    &:first-of-type {
      padding-left: 0;
      span {
        &:first-of-type {
          display: none;
        }
      }
    }

    &:last-child {
      padding-right: 0;
    }

    ${media.md`
      &:first-child {
          padding-left: 12px;
        }
    `}
  `,
  separator: ({ isPrendeTV }) => css`
    border-right: 1px solid ${WHITE_GREY};
    height: ${isPrendeTV ? 24 : 22}px;
    left: 0;
    position: absolute;
    top: 6px;
    width: 1px;
  `,
  time: ({ isPrendeTV }) => css`
    letter-spacing: 0;

    ${isPrendeTV ? css`
      color: ${WHITE};
      font-size: ${rem(24)};
      line-height: ${rem(32)};
      width: 35px;
    ` : css`
      color: ${BLACK};
      font-size: ${rem(22)};
      font-weight: 600;
      line-height: ${rem(25)};
    `}
  `,
};
