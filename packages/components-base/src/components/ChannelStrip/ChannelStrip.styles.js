import { css } from 'styled-components';

import {
  BACKGROUND_24_7,
  TUDN_STRIP_BG_MOBILE,
  TUDN_STRIP_BG_DESKTOP,
} from '@univision/fe-commons/dist/constants/urls';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  WHITE,
  WHITE_GREY,
  WHITE_RGB,
  WHITE_40,
  WHITE_60,
  EBONY_CLAY,
  GRADIENT_BLACK_TRANSPARENT,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { CHANNEL_STRIP_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/channelStrip';

export default {
  channelStripContainer: ({ isTudn }) => css`
    align-items: stretch;
    background: url(${isTudn ? TUDN_STRIP_BG_MOBILE : BACKGROUND_24_7}) no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 5px;
    display: flex;
    height: 105px;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1260px;
    overflow: hidden;

    ${isTudn && media.sm`
      background: url(${TUDN_STRIP_BG_DESKTOP}) no-repeat;
      background-position: right;
      background-size: cover;
    `}

    ${media.sm`{
      justify-content: flex-start;
    }`}
  `,
  channelContentWrapper: css`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    width: 100%;
    ${media.sm`{
      align-items: center;
      flex-direction: row;
      padding: 0;
      width: auto;
    }`}
    ${media.md`{
      width: 100%;
    }`}
  `,
  logo: css`
    width: 108px;
    ${media.sm`{
      width: 151px;
    }`}
  `,
  logoWrapper: ({ isTudn }) => css`
    align-items: center;
    display: flex;
    margin-bottom: 4px;

    svg {
      height: 16px;
      width: 102px;
    }

    ${media.sm`
      margin-bottom: 8px;
    `}
    ${media.md`
      margin-bottom: 0;

      svg {
        height: ${isTudn ? '20px' : '24px'};
        width: 152px;
      }
    `}
  `,
  contentLink: css`
    align-items: stretch;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 50%;

    ${media.sm`
      width: auto;
    `}
    ${media.md`
      width: 100%;
      flex-direction: row;
    `}
  `,
  channelMeta: css`
    display: flex;
    flex-direction: column;
    ${media.sm`{
      padding: 0 40px;
    }`}
    ${media.md`{
      width: 100%;
    }`}
  `,
  channelMetaPre: css`
    color: ${WHITE_40};
    font-size: ${rem(10)};
    letter-spacing: 0.4px;
    line-height: ${rem(14)};
    text-transform: uppercase;
  `,
  title: css`
    align-items: flex-start;
    color: ${WHITE};
    display: flex;
    flex: 0 1 33%;
    flex-direction: column;
    letter-spacing: -0.4px;

    ${media.sm` {
      padding: 12px 40px 12px 32px;
      border-right: 1px solid rgba(${WHITE_RGB}, .1);
      margin-right: 0;
    }`}
    ${media.md`{
      align-items: center;
      flex-direction: row;
      justify-content: space-around;
    }`}
  `,
  liveWrapper: css`
    display: inline-block;
    flex-shrink: 0;
    margin: -3px 5px 0 1px;
    position: relative;
    vertical-align: middle;
    > div {
      position: static;
      span {
        padding-top: 1px;
      }
    }
  `,
  thumbnail: css`
    max-width: ${CHANNEL_STRIP_RATIOS.mobile.width}px;
    position: relative;
    width: 50%;
    &:before {
      background: ${GRADIENT_BLACK_TRANSPARENT};
      content: "";
      height: 100%;
      opacity: 0.5;
      position: absolute;
      width: 100%;
      z-index: 6;
    }
    ${media.sm` {
      width: 100%;
      max-width: ${CHANNEL_STRIP_RATIOS.desktop.width}px;
    }`}
  `,
  shortTitleText: css`
    color: ${WHITE};
    display: block;
    font-size: ${rem(12)};
    line-height: ${rem(16)};
    margin-top: 8px;
    vertical-align: middle;
    &:hover {
      color: ${WHITE_GREY};
    }
    ${media.sm` {
      font-size: ${rem(16)};
      line-height: ${rem(20)};
      margin: 4px 0;
    }`}
  `,
  longTitleText: css`
    display: none;
    ${media.sm` {
      display: inline;
    }`}
  `,
  timeWrapper: css`
    color: ${WHITE_60};
    display: block;
    font-size: ${rem(10)};
    letter-spacing: 1px;
    line-height: ${rem(12)};
    text-transform: uppercase;
    ${media.sm` {
      line-height: ${rem(16)};
    }`}
  `,
  actionButton: ({ isTudn }) => css`
    bottom: 8px;
    display: flex;
    font-size: 90px;
    left: 4px;

    ${media.lg` {
      align-items: center;
      display: flex;
      padding-right: 62px;
    }`}

    button {
      align-items: center;
      background: transparent;
      border-radius: 4px;
      display: flex;
      font-size: ${rem(isTudn ? 10 : 12)};
      font-weight: bold;
      height: 20px;
      justify-content: space-between;
      line-height: ${rem(18)};
      padding: 0 10px;
      position: static;
      transform: none;
      white-space: nowrap;
      width: 160px;

      ${isTudn && css`
        font-family: 'Roboto Flex';
      `}

      svg {
        height: 12px;
        margin-right: 5px;
        width: 12px;
      }

      &:hover, &:focus, &:active {
        background: ${EBONY_CLAY};
      }

      ${media.sm`
        font-size: ${rem(12)};
      `}

      ${media.md`
        border: 1px solid rgba(${WHITE_RGB}, 0.5);
        height: auto;
        padding: 14px 16px;
        width: 180px;
      `}
    }

    ${media.md`
      position: unset;
    `}
  `,
};
