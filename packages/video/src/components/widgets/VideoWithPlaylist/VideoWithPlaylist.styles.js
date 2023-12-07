import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import {
  WHITE,
  BLACK,
  BLACK_20,
  BLACK_GREY,
  LIGHT_VARIANT,
  DARK_VARIANT,
} from '@univision/fe-utilities/styled/constants';

const variantBg = {
  mobile: {
    [DARK_VARIANT]: BLACK_GREY,
    [LIGHT_VARIANT]: WHITE,
  },
  default: {
    [DARK_VARIANT]: BLACK,
    [LIGHT_VARIANT]: WHITE,
  },
};

export default {
  card: ({ variant, hidePlaylist }) => css`
    background-color: ${variantBg.mobile[variant]};
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 ${BLACK_20};
    padding-left: 0;
    padding-right: 0;
    position: relative;

    ${media.md`
      background-color: ${variantBg.default[variant]};
      box-shadow: none;
      border-radius: 0;
      min-height: 480px;
      padding-left: 4px;
      padding-right: 4px;
    `}

    ${hidePlaylist && css`
      margin: 0 auto;
      text-align: center;
   `}
  `,
  playlist: ({ playlistBelowPlayer }) => css`
    ${media.md`
      padding-left: 16px;

      ${playlistBelowPlayer && css`
        padding-left: 4px;
      `}
    `}
  `,
  prendeWrapper: ({ displayCTA }) => css`
    display: ${displayCTA ? 'block' : 'none'};
    max-height: 470px;
    overflow: hidden;
    position: relative;
    width: 100%;

    ${media.md`
      width: 99%;
    `}
  `,
  videoWrapper: ({ displayCTA }) => css`
    display: ${displayCTA ? 'none' : 'block'};
  `,
};
