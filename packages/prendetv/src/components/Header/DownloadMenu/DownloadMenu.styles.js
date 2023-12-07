/**
 * @module PrendeTV DownaloadMenu Styles
 */
import { css } from 'styled-components';

import {
  BITTERSWEET,
  BLACK_20,
  BLACK_35,
  BLACK_50,
  BLACK_GREY,
  DARK_GRAY,
  DARKER_GREY,
  GERALDINE,
  NERO,
  SPRING_STRAWBERRY,
  WHITE,
  ZINDEX_ABOVE_NAVIGATION,
} from '@univision/fe-utilities/styled/constants';
import { MOBILE } from '@univision/fe-commons/dist/constants/devices';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';

/**
 * Background style
 * @param {string} device - current device
 * @returns {Function}
 */
const getBackgroundStyle = device => getFromMap(device, {
  [MOBILE]: css`
    background-color: ${NERO};
    height: 100vh;
    padding: 70px 56px;
    width: 100vw;

    a:first-of-type {
      border-top: 1px solid ${DARKER_GREY};
    }
  `,
  default: css`
    background-color: ${BLACK_GREY};
    border-radius: 4px;
    box-shadow: 0 -1px 3px 0px ${BLACK_20}, 0 2px 3px 0 ${BLACK_50};
    left: unset;
    padding: 10px;
    position: absolute;
    right: 0;
    top: 38px;
    width: 216px;

    a:last-of-type {
      border-bottom: 0;
    }
  `,
});

export default {
  appLink: css`
    && {
      align-items: center;
      border-bottom: 1px solid ${DARKER_GREY};
      color: ${DARK_GRAY};
      display: flex;
      font-family: 'Roboto Condensed', Roboto, sans-serif;
      font-size: ${rem(16)};
      height: 46px;
      padding: 0 24px;
      user-select: none;
      width: 100%;

      &:hover,
      &:active {
        background-color: ${BITTERSWEET};
        border-radius: 4px;
        color: ${WHITE};
      }

      &:active {
        background-color: ${GERALDINE};
      }
    }
  `,
  background: ({ isMobile }) => css`
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 3};

    && {
      ${getBackgroundStyle(isMobile)};
    }
  `,
  closeButton: css`
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 30px;
    justify-content: center;
    position: absolute;
    right: 15px;
    top: 7px;
    width: 30px;
  `,
  closeIcon: css`
    path {
      stroke: ${DARK_GRAY};
      stroke-width: 22px;
    }
  `,
  downloadButton: css`
    align-items: center;
    background: linear-gradient(270deg, ${BITTERSWEET} 0%, ${SPRING_STRAWBERRY} 100%);
    border-radius: 4px;
    color: ${WHITE};
    cursor: pointer;
    display: flex;
    font-family: 'Roboto Condensed', Roboto, sans-serif;
    font-size: ${rem(12)};
    font-weight: bold;
    height: 30px;
    letter-spacing: ${rem(0.75)};
    line-height: ${rem(12)};
    padding: 0 13px 0 10px;
    text-transform: uppercase;
    user-select: none;

    &:hover {
      box-shadow: 0 1px 14px ${BLACK_35} ;
      filter: saturate(0.85);
    }
  `,
  downloadIcon: css`
    margin-right: 10px;
  `,
  wrapper: css`
    display: flex;
    position: relative;
  `,
};
