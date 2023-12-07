import { css } from 'styled-components';

import {
  ASTRONAUT,
  BLACK_08,
  DARK_BLUE,
  DARKER_GREY,
  VERY_LIGHT_GREY,
  WHITE,
  WHITE_GREY,
  ZINDEX_ABOVE_NAVIGATION,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  arrowIcon: css`
    position: absolute;
  `,
  arrowIconWrapper: ({ isOpen }) => css`
    height: 24px;
    margin-left: 3px;
    position: relative;
    width: 24px;

    ${isOpen && css`
      background-color: ${BLACK_08};
    `}
  `,
  arrowUp: ({ isOpen }) => css`
    border-bottom: 14px solid white;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    display: none;
    height: 0;
    margin-left: 18px;
    margin-top: 3px;
    position: absolute;
    width: 0;
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 3};
    ${isOpen && css`
      display: block;
    `}
  `,
  bar: css`
    position: relative;
  `,
  market: ({ isActive }) => css`
    color: ${DARKER_GREY};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    font-size: ${rem('12px')};
    height: 48px;
    justify-content: center;
    padding-left: 38px;
    text-transform: uppercase;
    width: 50%;

    ${media.sm`
      padding-left: 16px;
      width: 25%;
    `}

    ${isActive && css`
      background-color: ${VERY_LIGHT_GREY};
    `}

    &:hover {
      color: ${DARK_BLUE};
    }
  `,
  marketLogo: css`
    margin-left: 24px;
  `,
  marketWeatherWrapper: css`
    display: flex;
    position: absolute;
    right: 0;
    top: -7px;
  `,
  selectMarketList: css`
    background-color: ${WHITE};
    border-radius: 4px;
    box-shadow: 0 1px 2px 0 ${BLACK_08};
    display: flex;
    flex-wrap: wrap;
    max-width: calc(100% - 8px);
    padding: 15px 5px;
    width: 100%;

    ${media.sm`
      border: 1px solid ${WHITE_GREY};
      padding: 16px;
      width: 66.66667%;
    `}
  `,
  selectMarketWrapper: ({ isOpen }) => css`
    display: none;
    left: -16px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 16px;
    padding-left: 20px;
    padding-right: 20px;
    position: absolute;
    width: 100vw;
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 1};

    ${isOpen && css`
      display: flex;
    `}
  `,
  title: ({ isOpen }) => css`
    color: ${ASTRONAUT};
    cursor: pointer;
    display: flex;
    font-size:  ${rem('20px')};
    position: relative;
    user-select: none;

    ${isOpen && css`
      color: ${WHITE};
      z-index: ${ZINDEX_ABOVE_NAVIGATION + 3};
    `}
  `,
  wrapper: css`
    align-items: flex-start;
    display: flex;
    position: relative;
  `,
};
