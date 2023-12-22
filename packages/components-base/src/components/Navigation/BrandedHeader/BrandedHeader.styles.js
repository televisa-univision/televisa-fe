import { css } from 'styled-components';
import {
  BLACK,
  WHITE,
  WHITE_GREY,
  WOODSMOKE,
  TRANSPARENT,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';

/**
 * getBackgroundColor Get BG Color
 * @param {*} theme theme object
 * @returns {string} as color
 */
export const getBackgroundColor = (theme) => {
  if (!theme) {
    return WHITE;
  }

  if (
    !theme.isBrandedHeaderBlack
    && theme.brandedHeaderBackgroundColor
    && theme.brandedHeaderBackgroundColor !== TRANSPARENT
  ) {
    return theme.brandedHeaderBackgroundColor;
  }

  return theme.isBrandedHeaderBlack ? BLACK : WHITE;
};

export default {
  wrapper: ({ theme = {}, isWorldCupMVP, isTelevisaSite } = {}) => css`
    background: ${getBackgroundColor(theme)};
    color: ${theme.brandedHeaderColor || theme.isBrandedHeaderBlack
      ? WHITE
      : BLACK};

    ${theme.isBrandedHeaderBlack && !theme.brandedHeaderBackgroundColor && css`
      background-color: ${BLACK};
    `}

    ${theme.brandedHeaderBackgroundColor && css`
      background-color: ${theme.brandedHeaderBackgroundColor};
    `}

    ${!theme.isBrandedHeaderBlack && css`
      border-bottom: 1px solid ${WHITE_GREY};
    `}

    ${isWorldCupMVP && css`
      background-color: ${WOODSMOKE};
    `};

    @media (max-width: 820px) {
      ${isTelevisaSite && css`
        & > .uvs-container {
          padding: 16px;
        }
      `}
    }
  `,
  container: ({ isWorldCupMVP, forceCenterRender, isTelevisaSite }) => css`
    align-items: center;
    height: ${(isTelevisaSite && '80px') || (isWorldCupMVP ? 'auto' : '49px')};

    ${!isTelevisaSite && isWorldCupMVP && css`
      display: grid;
      grid-column: 3;
      grid-template-columns: 16.66667% auto 16.66667%;
      grid-template-rows: 75px auto;
      min-height: 75px;

      ${forceCenterRender && css`
        grid-template-rows: 50px auto;
      `}

      ${media.sm`
        grid-template-rows: 46px 56px;
      `};

      ${media.lg`
        grid-template-rows: 75px auto;
      `};
    `};

    ${isTelevisaSite && css`
      @media (min-width: 1280px) {
        display: flex;
        flex-wrap: nowrap;
      }
      @media (max-width: 820px) {
        height: auto;
        justify-content: space-between;
      }
    `}
  `,
  centerCol: ({
    disablePrendeTvButton,
    forceCenterRender,
    isTelevisaSite,
    isWorldCupMVP,
    isTelevisaParentSite,
  }) => css`
    display: flex;
    justify-content: ${disablePrendeTvButton ? 'center' : 'flex-start'};

    ${!disablePrendeTvButton && media.sm`
      justify-content: center;
    `}

    ${isWorldCupMVP && css`
      display: ${forceCenterRender ? 'flex' : 'none'};
      grid-column: 1/4;
      grid-row: 2;
      max-width: none;

      ${forceCenterRender && css`
        & > nav > ul > li {
            line-height: 46px;
            margin-right: 20px;

            ${media.sm`
              margin: 0;
            `}
          }
        }
      `}

      ${media.sm`
        display: flex;
      `};

      ${media.lg`
        grid-row: 1;
        grid-column: 2;
      `};
    `};

    ${isTelevisaSite && css`
      @media (min-width: 1280px) {
        display: contents !important;
      }
    `}

    @media (max-width: 820px) {
      ${isTelevisaParentSite && css`
        & img {
          margin-left: -18px;
          @media (max-width: 425px) {
            margin-left: -22px;
            width: 122px;
            height: 24px;
            @media (max-width: 425px) {
              width: 118px;
              height: 20px;
            }
            @media (max-width: 375px) {
              width: 97px;
              height: 17px;
            }
          }
          @media (max-width: 375px) {
            margin-left: -22px;
            width: 97px;
            height: 16px;
          }
        }
      `}
      ${isTelevisaSite && css`
        flex: 1;
        flex-basis: 100%;
        margin-left: 0px;
        margin-top: 16px;
        order: 3;
        padding: 0;
      `}
    }
  `,
  leftCol: ({ isWorldCupMVP, isTelevisaSite }) => css`
    display: flex;
    justify-content: flex-start;

    ${isWorldCupMVP && css`
      max-width: none;

      button {
        margin-left: 0;
      }
    `};

    ${isTelevisaSite && css`
      @media (min-width: 1280px) {
        min-width: 251px;
      }
      & img {
        height: 32px;

        @media (max-width: 820px) {
          margin: 0;
        }
      }
    `};
  `,
  logo: ({ disablePrendeTvButton }) => css`
    ${!disablePrendeTvButton && css`
      margin-left: 8px;

      ${media.sm`
        margin-left: 0;
      `}
    `}
  `,
  rightCol: ({ isWorldCupMVP }) => css`
    display: flex;
    justify-content: flex-end;

    ${isWorldCupMVP && css`
      grid-column: 3;
      max-width: none;
    `};
  `,
};
