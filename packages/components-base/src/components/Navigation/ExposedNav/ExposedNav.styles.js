import { css } from 'styled-components';
import {
  BLACK_35, LIGHT_BLUE, WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { media, rem, getBackgroundRule } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  wrapper: ({
    theme: {
      subNavBackgroundColor,
      exposedNavBackgroundImages: backgroundImages,
      exposedNavBackground: backgroundImage,
      exposedNavGradient: backgroundGradient,
    },
  }) => css`
    background-color: ${subNavBackgroundColor || LIGHT_BLUE};
    background-size: cover;
    box-shadow: 0 1px 5px 0 ${BLACK_35};
    ${getBackgroundRule({ backgroundImages, backgroundImage, backgroundGradient })};
    color: ${WHITE};
    width: 100%;
  `,
  container: ({ localAdSkinStyle }) => css`
    height: auto;
    padding: 15px 0;

    ${!localAdSkinStyle && media.lg`
      max-height: 80px;
      padding: 24px 0;
    `}
  `,
  linkLocalMarket: css`
    margin-right: 20px;

    &::after {
      background-color: rgba(255,255,255,0.21);
      content: '';
      height: 33px;
      margin-left: 7px;
      margin-top: 9px;
      position: absolute;
      top: calc(50% - 25px);
      width: 1px;

      ${media.lg`
        height: 35px;
        margin-top: 0;
        top: calc(50% - 17px);
      `}
    }
  `,
  logoArea: ({ isLocalesCustom }) => css`
    align-items: center;
    display: flex;
    font-size: ${rem(28)};
    justify-content: flex-start;
    max-height: 32px;

    ${isLocalesCustom && css`
      padding-bottom: 2px;
    `}
  `,
  logo: css`
    max-height: 32px;
    max-width: 200px;
  `,
  logoText: ({
    noBorder, isLocalesCustom, hasSubtitle, customBranding,
  }) => css`
    border-left: ${noBorder ? 0 : `1px solid ${WHITE}`};
    font-size: ${noBorder ? rem(28) : rem(24)};
    line-height: ${rem(32)};
    margin-bottom: 0;
    margin-left: ${noBorder ? 0 : '10px'};
    padding-left: ${noBorder ? 0 : '10px'};

    ${hasSubtitle && css`
      margin-top: 22px;
      ${media.lg`
        margin-top: 16px;
      `}
    `}

    ${isLocalesCustom && css`
      font-size: ${rem(20)};
      line-height: ${rem(22)};

      ${media.md`
        font-size: ${rem(28)};
        line-height: ${rem(32)};
      `}
    `}
    ${customBranding && css`
      font-size: ${rem(13)};
      font-weight: normal;
      line-height: ${rem(34)};
       margin-left: 16px;
      ${media.md`
        font-size: ${rem(14)};
        margin-left: 40px;
      `}
    `}
  `,
  logoTextWrapper: css`
    display: flex;
  `,
  navArea: ({ localAdSkinStyle }) => css`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin-top: 16px;

    ${!localAdSkinStyle && media.lg`
      margin-top: 0;
    `}

    &.col-lg-pull-3 {
      ${''/* Emulating col-lg-pull-3 */}
      ${media.lg`
        right: 25%;
      `}
    }
  `,
  navList: ({ isLocalesCustom }) => css`
    list-style: none;
    margin: 0;
    margin-bottom: 0 0 -10px 0;
    padding: 0;

    ${isLocalesCustom && media.lg`
      margin-left: 35px;
    `}
  `,
  homeLink: ({ hasLogoMarket }) => css`
    color: ${WHITE};
    width: 100%;

    &:hover {
      color: ${WHITE};
    }

    ${hasLogoMarket && css`
      img {
        max-width: 154px;
      }
    `}
  `,
  rightCol: css`
    display: flex;
    justify-content: flex-end;
    &.col-lg-push-6 {
      ${''/* Emulating col-lg-push-6 */}
      ${media.lg`
        left: 50%;
      `}
    }
  `,
  subtitle: css`
    font-size: ${rem('14px')};
    font-weight: normal;
    line-height: ${rem('18px')};
    margin-bottom: 0;
    padding-bottom: 18px;
    ${media.lg`
      padding-bottom: 16px;
    `}
  `,
};
