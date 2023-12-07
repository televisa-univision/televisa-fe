import { css } from 'styled-components';

import {
  media,
  mediaRange,
  rem,
} from '@univision/fe-commons/dist/utils/styled/mixins';
import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';
import {
  APP_BREAKPOINTS,
  BLACK,
  GREY,
  GREY_BLACK,
  THEME_DEFAULT_PRIMARY,
  VERY_LIGHT_GREY,
  WHITE,
} from '@univision/fe-utilities/styled/constants';

const NOW_PLAYING = 'nowPlaying';
const FEATURED_STATION = 'featuredStation';
const TOOLBAR = 'toolbar';
const STATION_LIST = 'stationList';
const DEFAULT_TYPES = [NOW_PLAYING, FEATURED_STATION, TOOLBAR];

/**
 * Checks if default button type
 * @param {string} type of the button
 * @returns {bool}
 */
const isDefaultType = type => DEFAULT_TYPES.includes(type);
/**
 * Checks if featured button type
 * @param {*} type of the button
 * @returns {bool}
 */
const isFeaturedType = type => DEFAULT_TYPES.slice(0, 2).includes(type);

export default {
  playStationBtn: ({ type }) => css`
    cursor: pointer;

    ${isDefaultType(type) && css`
      background: ${THEME_DEFAULT_PRIMARY};
      border-radius: 100%;
      color: ${WHITE};
      position: relative;
    `}

    ${isFeaturedType(type) && css`
      box-shadow: 0 0 10px 0 ${BLACK};
      flex: 0 0 60px;
      height: 60px;
      width: 60px;

      svg {
        bottom: 0;
        display: block;
        height: 20px;
        left: 0;
        margin: auto;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(1px);
        width: 20px;
      }

      ${media.sm`
        bottom: 0;
        box-shadow: none;
      `}

    `}

    ${getFromMap(type, {
    [TOOLBAR]: css`
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
      flex-shrink: 0;
      height: 32px;
      margin-right: 0;
      position: relative;
      width: 32px;

      ${media.md`
        margin-right: 0;
      `}

      svg {
        bottom: 0;
        display: block;
        height: 15px !important;
        left: 0;
        margin: auto;
        position: absolute;
        right: 0;
        top: 0;
        width: 12px !important;
      }
    `,
    [FEATURED_STATION]: css`
      border: 2px solid ${WHITE};
      bottom: 0;
      left: 0;
      margin: auto auto -0.5rem;
      position: absolute;
      right: 0;

      ${mediaRange(APP_BREAKPOINTS.xxs, APP_BREAKPOINTS.sm, css`
        box-shadow: none;
        height: 50px;
        width: 50px;
      `)}
    `,
    [STATION_LIST]: css`
      border: 1px solid ${GREY};
      color: ${BLACK};
      font-size: 0.625rem;
      line-height: 0.75rem;
      padding: 0.5rem 1rem;
      text-transform: uppercase;
      white-space: nowrap;

      ${media.sm`
        &:not(:last-child) {
          margin-right: 1rem;
        }
      `}
    `,
    nowPlayingPlain: css`
      color: ${VERY_LIGHT_GREY};
      fill: ${VERY_LIGHT_GREY};
      font-size: ${rem('9px')};
      line-height: ${rem('11px')};
      padding-right: 0;
      text-align: right;
      text-transform: uppercase;
      width: 100%;
    `,
  })}

    &:hover {
      color: ${GREY_BLACK};
    }

    &:focus {
      outline: none;
    }
  `,
};
