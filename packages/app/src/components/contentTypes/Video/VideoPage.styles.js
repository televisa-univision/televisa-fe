import { css } from 'styled-components';

import {
  BLACK,
  BLACK_GREY,
  GREY_BLACK,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  videoWrapper: ({ isDark }) => css`
    background: ${BLACK_GREY} center center no-repeat;
    overflow: hidden;
    position: relative;

    ${media.md`
      padding-top: 1rem;
    `}

    ${isDark && css`
      background-color: ${BLACK_GREY};
    `}

    ${!isDark && css`
      background-color: ${WHITE};
    `}
  `,
  videoBg: css`
    filter: blur(10px);
    opacity: 0.5;
    transform: scale(1.1);
  `,
  dynamicBg: css`
    background: ${BLACK};
    display: none;
    height: 100%;
    position: absolute;
    width: 100%;

    ${media.sm`
      body & {
        display: block;
      }
    `}

    &:after {
      bottom: 0;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      @include gradient-y(fade-out(${BLACK}, 1), ${BLACK}, 0%, 100%);
    }
  `,
  mobileBackground: ({ variant }) => css`
    bottom:0;
    left: 0;
    position: absolute;
    right:0;
    top: 345px;

    ${media.sm`
      display: none;
    `}

    ${variant && css`
      background: ${BLACK_GREY} ${GREY_BLACK};
    `}
  `,
  adcontainer: css`
    margin: 50px 0;
  `,
  widgetsContainer: css`
    margin-bottom: 10px;
    padding: 0 19px;
  `,
  newsLetterContainerVideo: ({ isDark }) => css`
    background-color: ${WHITE};

    ${isDark && css`
      background-color: ${BLACK_GREY};
    `}
  `,
  rowScorecell: css`
    ${media.md`
      margin-bottom: -60px
    `}
  `,
};
