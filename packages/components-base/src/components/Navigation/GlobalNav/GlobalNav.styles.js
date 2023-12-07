import { css } from 'styled-components';
import {
  MINE_SHAFT,
  WHITE,
  SIROCCO,
  TRANSPARENT,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

const navHeight = 40;
const activeBackground = 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.14) 100%);';

/**
 * Function for setting Nav type color text hover
 * @param {Object} theme - the styled component props
 * @param {Object} isTudnMX - the styled component props
 * @returns {string}
 */
const getColorText = (theme, isTudnMX) => {
  if (isTudnMX) {
    return `${SIROCCO};`;
  }
  if (theme.colorTextGlobalNav) {
    return `${theme.colorTextGlobalNav};`;
  }
  return `${WHITE};`;
};

export default {
  wrapper: ({ theme }) => css`
    align-items: center;
    background: ${theme.globalNavBackgroundColor || MINE_SHAFT};
    display: flex;
    height: ${navHeight}px;
    justify-content: center;
    overflow: hidden;
    padding: 0;
    width: 100%;
    ${theme.globalNavBorderTop ? `border-top: ${theme.globalNavBorderTop};` : ''}
  `,
  list: css`
    list-style: none;
    margin: 0;
    overflow-x: auto;
    padding: 0;
    white-space: nowrap;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  itemList: ({ isTuCiudad, theme }) => css`
    display: inline-block;
    position: relative;
    ${isTuCiudad && css`
      display: inline-flex;
      letter-spacing: 0.75px;

      & a {
        align-items: center;
        display: flex;
        justify-content: center;
      }

      &:before {
        background: linear-gradient(90deg, ${theme.globalNavBackgroundColor || MINE_SHAFT} 0%, ${theme.globalNavBackgroundColor || MINE_SHAFT} 91.04%, rgba(51, 51, 51, 0) 100%);
        content: '';
        display: inline-flex;
        height: 30px;
        position: absolute;
        width: 115px;
        z-index: 1;
      }

      ${media.sm`
        &:before {
          display: none;
        }
      `}
  `}
  `,

  link: ({
 bottomBorderColor, theme, isTudnMX, isTelevisaSite,
}) => css`
    background: transparent;
    color: ${getColorText(theme, isTudnMX)};
    display: block;
    font-size: ${rem(12)};
    line-height: ${rem(navHeight)};
    opacity: ${isTudnMX ? 1 : 0.5};
    padding-left: 8px;
    padding-right: 8px;
    position: relative;
    text-transform: uppercase;

    ${isTelevisaSite && css`
      @media (max-width: 820px) {
        padding-left: 12px;
        padding-right: 12px;
      }
    `}

    &:before {
      background: ${bottomBorderColor};
      bottom: ${theme.globalNavBorderTop ? '1px' : 0};
      content: ' ';
      display: none;
      height: 2px;
      left: 0;
      position: absolute;
      width: 100%;
    }

    &:hover {
      background: ${activeBackground};
      color: ${WHITE};
      opacity: 1;

      &:before {
        display: block;
      }
    }

    &.active {
      background: ${activeBackground};
      opacity: 1;
      &:before {
        display: block;
      }
    }

    ${isTelevisaSite && css`
      &.active {
        background: ${theme.globalNavLink};
        bottom: ${theme.globalNavBorderTop ? '1px' : 0};

        &:before {
          background: ${theme.bottomBorderGlobalNav || WHITE} ;
          display: block;
        }
      }
      &:hover {
        background: ${theme.hoverGlobalNav || TRANSPARENT};
        color: ${theme.colorHoverGlobalNav || WHITE} ;

        &:before {
          background: ${theme.bottomBorderGlobalNav || WHITE} ;
          display: block;
        }
      }
    `}
  `,
};
