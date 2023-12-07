/**
 * @module PrendeTV Hamburger Menu Styles
 */
import { css } from 'styled-components';

import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  CHINESE_SILVER,
  HAMBURGER_MENU_GRADIENT,
  WHITE,
  ZINDEX_ABOVE_NAVIGATION,
} from '@univision/fe-utilities/styled/constants';

export default {
  background: css`
    background-image: linear-gradient(180deg, ${HAMBURGER_MENU_GRADIENT.start} 39%, ${HAMBURGER_MENU_GRADIENT.end} 100%);
    height: 100vh;
    position: absolute;
    width: 100vw;
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 1};

    ${media.md`
      padding-left: 30px;
      width: 360px;
    `}
  `,
  categoryTitle: css`
    color: ${WHITE};
    font-family: 'Roboto Condensed', Roboto, sans-serif;
    font-size: ${rem(13)};
    letter-spacing: ${rem(1.08)};
    line-height: ${rem(14)};
    margin-bottom: 24px;
    text-transform: uppercase;
  `,
  contentWrapper: css`
    padding: 40px 37px 160px 37px;

    ${media.sm`
      padding: 40px 37px;
    `}
  `,
  headMenu: css`
    display: flex;
    flex: 0.1;
    max-height: 50px;
  `,
  icon: css`
    cursor: pointer;
    margin-right: 20px;
  `,
  separator: css`
    background-image: linear-gradient(to bottom, ${CHINESE_SILVER} 0%, ${CHINESE_SILVER} 51%, transparent 51%);
    background-size: 100% 1px;
    height: 1px;
    margin: 40px 0;
    opacity: 0.5;
    width: 100%;
  `,
  wrapper: css`
    && {
      -webkit-overflow-scrolling: touch;
      display: flex;
    }
    flex-direction: column;
    height: 100%;
    justify-content: flex-start;
    overflow-x: hidden;
    overflow-y: touch;
    padding: 10px 0 0px 20px;
    vertical-align: middle;
    width: 100%;
  `,
};
