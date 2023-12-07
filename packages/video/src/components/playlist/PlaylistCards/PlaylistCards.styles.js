import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import {
  WHITE,
  WHITE_00,
  BLACK,
  TRANSPARENT,
  DARK_VARIANT,
  LIGHT_VARIANT,
} from '@univision/fe-utilities/styled/constants';

const variantBg = {
  [DARK_VARIANT]: BLACK,
  [LIGHT_VARIANT]: WHITE,
};

const transparentBg = {
  [DARK_VARIANT]: TRANSPARENT,
  [LIGHT_VARIANT]: WHITE_00,
};

export default {
  playlistOuter: ({ variant, loading, playlistBelowPlayer }) => css`
    margin-top: 16px;

    ${loading && css`
      display: none;
    `}

    ${media.md`
      margin-top: 0;
    `}

    ${!playlistBelowPlayer && css`
      &:after {
        background: ${linearGradient({ direction: '90deg', start: transparentBg[variant], end: variantBg[variant] })};
        bottom: 0;
        content: '';
        height: 260px;
        position: absolute;
        right: -4px;
        width: 40px;
        z-index: 2;

        ${media.md`
          background: ${linearGradient({ direction: '180deg', start: transparentBg[variant], end: variantBg[variant] })};
          bottom: -20px;
          left: 0;
          right: 15px;
          height: 80px;
          top: initial;
          width: 100%;
      `}

        ${media.lg`
          right: 5px;
      `}
      }
    `}
  `,

  playlistInner: ({
    theme,
    isAnchor,
    playlistBelowPlayer,
    isNewsDigitalChannel,
  }) => css`
    -webkit-overflow-scrolling: touch;
    display: flex;
    margin: 0 -4px -20px;
    min-height: 238px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 20px;
    scrollbar-width: none;

    ${isAnchor && css`
      margin: 0 -8px 0 0;
    `}

    ${media.md`
      max-height: ${isNewsDigitalChannel ? '375px' : '530px'};
      overflow-x: hidden;
      overflow-y: auto;
      scrollbar-color: ${theme.primary} transparent;
      scrollbar-width: thin;
    `}

    ${media.lg`
      max-height: ${isNewsDigitalChannel ? '430px' : '580px'};
    `}

    ${playlistBelowPlayer && css`
      &&& {
        min-height: auto;
        overflow-x: auto;
        overflow-y: hidden;
      }
    `}

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 10px;
      ${media.md`
         background-color: ${theme.primary};
      `}
    }
   `,

  playlistCard: ({ playlistBelowPlayer }) => css`
    ${playlistBelowPlayer && css`
      min-width: 164px;

      ${media.md`
         min-width: 25%;
      `}

      > div > div {
        box-shadow: none;
        padding-bottom: 56.25%;

        > div {
          height: 100%;
        }
      }
    `}
  `,
  playlistContainer: ({
    layout,
    playlistBelowPlayer,
    infiniteScroll,
  }) => css`
    display: flex;
    flex-direction: row;

    > div {
      margin-bottom: 16px;

      ${playlistBelowPlayer && css`
        padding: 0 4px;
        width: 25%;
      `}
    }

    > div:last-child {
      min-width: 200px;
      padding-right: 40px;
    }

    ${media.md`
      flex-direction: column;
      height: 100%;
      width: 100%;

      ${playlistBelowPlayer && css`
        flex-direction: row;
      `}

      > div:last-child {
        padding-right: 0;
        padding-bottom: 0;
        margin-bottom: 50px;
      }
    `}

    ${layout === 'horizontal' && css`
      flex-direction: column;
      height: 100%;
      width: 100%;

      > div:last-child {
        margin-bottom: ${infiniteScroll ? 50 : 0}px;
        padding-bottom: 0;
        padding-right: 0;
      }
    `}
  `,

  loading: css`
    position: relative;
    top: -20px;
    width: 100%;
  `,
};
