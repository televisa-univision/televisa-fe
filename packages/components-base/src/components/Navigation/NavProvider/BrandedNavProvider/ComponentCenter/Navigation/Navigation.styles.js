import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import {
  TRANSPARENT,
  WHITE,
  ZINDEX_ABOVE_NAVIGATION,
  WOOD_SMOKE,
} from '@univision/fe-utilities/styled/constants';

export default {
  iconWrapper: css`
    left: -20px;
    position: absolute;
    top: -4px;
  `,
  arrow: css`
    height: 18px;
    margin-bottom: 2px;
    margin-left: 4px;
    width: 18px;

    path {
      fill: ${WHITE};
    }
  `,
  linkWrapper: ({ preventFollowClick, theme }) => css`
    color: ${theme.colorBrandedLabels || WHITE};
    position: relative;
    &:hover {
      ${!preventFollowClick && `border-bottom: 1px solid ${theme.colorBrandedLabels || WHITE};`}
      color: ${theme.colorBrandedLabels || WHITE};
      padding-bottom: 2px;
    }
  `,
  mainList: ({ isWorldCupMVP, isTelevisaSite }) => css`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    margin: 0 auto;
    padding: 0;

    ${isWorldCupMVP && css`
      font-family: 'Poppins', sans-serif;
      justify-content: flex-start;
      width: 100%;

      ${media.sm`
        justify-content: space-between;
      `}

      ${media.md`
        width: 84%;
      `}

      ${media.lg`
        width: 95%;
      `}
    `}

    ${isTelevisaSite && css`
      @media (max-width: 820px) {
        gap: 12px 24px;
      }
  `}
  `,
  mainMenuItem: ({
    active,
    theme,
    isWorldCupMVP,
    isCurrentPage,
    isTelevisaSite,
  }) => css`
    background-color: ${theme.primary};
    border-radius: 3px;
    color: ${theme.colorBrandedLabels || WHITE};
    cursor: pointer;
    font-size: ${isTelevisaSite ? rem(14) : rem(16)};
    margin: 0 5px;
    position: relative;

    ${isWorldCupMVP && css`
      margin: 0;
      padding: 0;
    `};

    ${active && !isWorldCupMVP && `background-color: ${theme.secondary};`}

    ${isWorldCupMVP && active && css`
      > svg > path {
        fill: ${WHITE};
      }
    `}

    ${isWorldCupMVP && isCurrentPage && css`
      > a {
        border-bottom: 1px solid ${WHITE};
        padding-bottom: 2px;
      }
    `}

    ${isTelevisaSite && css`
      line-height: 18px!important;
      padding: 4px 0 4px 24px;
      position: relative;
      &:hover {
        color: ${theme.colorBrandedLabels || WHITE};
      }
      ${active && css`
        background: ${TRANSPARENT};

        & > a {
          border-bottom: 1px solid ${WHITE};
          padding-bottom: 2px;
        }
      `}

      @media (max-width: 820px) {
        line-height: 26px!important;
        padding: 0;
      }
    `}
  `,
  submenuWrapper: ({ active, isWorldCupMVP }) => css`
    background-color: ${WHITE};
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 20%) 0px 4px 8px 0px;
    display: ${active ? 'flex' : 'none'};
    margin-top: 21px;
    min-width: 190px;
    position: absolute;
    z-index: ${ZINDEX_ABOVE_NAVIGATION};

    &:before {
      border-bottom: 8px solid ${WHITE};
      border-left: 7px solid ${TRANSPARENT};
      border-right: 7px solid ${TRANSPARENT};
      content: "";
      left: 12px;
      position: absolute;
      top: -8px;
    }

    ${isWorldCupMVP && css`
      background-color: ${WOOD_SMOKE};
      margin-top: 0;
      z-index: ${ZINDEX_ABOVE_NAVIGATION + 2};

      &:before {
        border-bottom: 8px solid ${WOOD_SMOKE};
      }
    `}
  `,
  wrapper: ({
    theme,
    uppercase,
    isWorldCupMVP,
    isTelevisaSite,
  }) => css`
    align-items: center;
    background: ${isTelevisaSite && TRANSPARENT || theme.primary};
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    padding: ${!isTelevisaSite ? '18px 4%' : '0'};
    width: 100%;
    ${isWorldCupMVP && css`
      padding: 0;
    `}

    ${uppercase && css`
      letter-spacing: ${rem(0.5)};
      text-transform: uppercase;
    `}
  `,
};
