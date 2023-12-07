import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BLACK_GREY,
  TRANSPARENT,
  WHITE_60,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  bannerLinkWrapper: css`
    display: block;
    width: 100%;
  `,
  desktopEpgWrapper: css`
    width: 100%;
  `,
  iframeWrapper: css`
    border: 0;
    max-height: 85px;
    padding-left: 0;

    ${media.sm`
      max-height: 140px;
    `}

    ${media.md`
      padding-left: 12px;
      max-height: 90px;
    `}
  `,
  mobileEpgWrapper: css`
    margin-bottom: 16px;
    width: 100%;

    & > div > div > div {
      overflow: hidden;
    }

    ${media.sm`
      & > div > div > div {
        overflow: initial;
      }
    `}
  `,
  playlistOuter: css`
    position: relative;

    ${media.md`
      padding-left: 16px;
    `}
  `,
  tabs: ({ theme }) => css`
    background: ${theme?.livestreamDefaultColor ? theme?.livestreamDefaultColor : TRANSPARENT};
    border-radius: 4px;
    margin: 0 0 15px;
    overflow: hidden;
    > button {
      font-family: "Roboto Condensed", sans-serif;
      font-weight: bold;
      letter-spacing: 0.75px;
    }
  `,

  tab: ({ theme, activeTab }) => css`
    background: ${TRANSPARENT};
    border-bottom: 4px solid ${TRANSPARENT};
    color: ${theme?.variant === 'dark' ? WHITE_60 : BLACK_GREY} !important;
    font-size: ${rem('12px')};
    height: 48px;
    line-height: ${rem('20px')};
    text-transform: uppercase;
    width: 50%;
    &:hover, &:active, &:focus {
      filter: none;
    }
    &:hover {
      opacity: 0.8;
    }
    ${activeTab && css`
      border-bottom: 4px solid ${theme?.livestreamActiveColor ? theme?.livestreamActiveColor : TRANSPARENT} !important;
      color: ${theme?.livestreamActiveColor ? theme?.livestreamActiveColor : BLACK_GREY} !important;
      &:hover, &:active, &:focus {
        border-bottom: 4px solid ${theme?.livestreamActiveColor ? theme?.livestreamActiveColor : TRANSPARENT} !important;
      }
    `}
  `,
};
