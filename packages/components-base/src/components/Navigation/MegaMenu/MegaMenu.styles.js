import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BLACK,
  CRIMSON_50,
  GREY,
  GREY_BLACK,
  LONGFORM_GRADIENT_LABEL,
  WHITE,
  WHITE_GREY,
  VERY_LIGHT_GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';

import {
  CAPECOD,
  SILVER_SAND,
  SPRING_WING,
  WOODSMOKE,
  ZINDEX_MEGA_MENU,
} from '@univision/fe-utilities/styled/constants';

const menuColumn = css`
  padding: 0 23px;
  ${media.md`
    padding: 0;
  `}
`;
const linkFont = css`
  font-size: ${rem('16px')};
  line-height: ${rem('18px')};
  ${media.md`
    font-size: ${rem('14px')};
  `}
`;

export default {
  columnPadding: css`
    ${menuColumn};
  `,
  columnContainer: css`
    padding: 0 10px;
  `,
  container: css`
    align-items: center;
    flex-direction: column;
    padding-bottom: 250px;
    ${media.md`
      padding-bottom: 100px;
    `}
  `,
  desktopTopSectionContainer: ({ isWorldCupMVP }) => css`
    border-bottom: 1px solid ${WHITE_GREY};
    display: flex;
    justify-content: space-between;
    padding: 16px 0;

    ${isWorldCupMVP && `
      span {
        font-size: ${rem('14px')};
        font-weight: bold;
      }
    `}
  `,
  globalImageLinksWithHeader: ({ isWorldCupMVP }) => css`
    ${isWorldCupMVP && `
      a:first-of-type {
        text-transform: uppercase;
      }

      h1 > div {
        border-color: ${SPRING_WING} !important;
      }

      a > span {
        text-transform: initial;
        color: ${SILVER_SAND};
        font-weight: 400;
      }

      path {
        fill: ${SILVER_SAND};
      }
    `}
  `,
  hamburgerMenuWrapper: css`
    display: flex;
    padding: 16px 0;
  `,
  linksContainer: css`
    margin-top: 41px;
    ${menuColumn};
    ${media.md`
      margin-top: 0;
    `}
  `,
  linkLogoWrapper: css`
    margin: 0 auto;
    ${media.md`
      display: none;
    `}
  `,
  linksSubgroup: css`
    margin: 0;
    margin-bottom: 22px;
    ${media.md`
      margin-bottom: 15px;
    `}
    &:last-child {
      margin-bottom: 0;
    }
  `,
  logo: css`
    margin-left: -30px;
  `,
  mainSectionContainer: css`
    max-width: 100%;
    padding: 0;
    ${media.md`
      margin-top: 24px;
    `}
  `,
  menuLink: ({ isWorldCupMVP }) => css`
    color: ${isWorldCupMVP ? WHITE : BLACK};
    margin-top: 20px;
    padding: 0 8px;
    width: 50%;
    ${linkFont}
    /** first two links **/
    &:nth-of-type(-n + 2) {
      margin-top: 0;
    }
    ${media.md`
      margin-top: 14.5px;
      width: 197px;
      &:nth-of-type(2) {
        margin-top: 14.5px;
      }
    `}
  `,
  menuLinksHeader: ({ noMargin, isWorldCupMVP }) => css`
    color: ${isWorldCupMVP ? WHITE : BLACK};
    margin-bottom: ${noMargin ? '0' : '20px'};
    padding-bottom: 0;
    a:first-of-type,
    div:nth-of-type(2) {
      font-size: ${rem('18px')};
      text-transform: initial;
    }
    ${media.md`
      margin-bottom: ${noMargin ? '0' : '16px'};
      padding-top: 16px;
      a:first-of-type, div:nth-of-type(2) {
        font-size: ${rem('16px')};
      }
    `}

    ${isWorldCupMVP && css`
      .uvs-font-a-bold {
        font-family: 'Roboto Flex', sans-serif;
      }

      a:first-child {
        color: ${WHITE};
        text-transform: uppercase;
      }
    `}
  `,
  menuSubtitle: css`
    color: ${GREY};
    font-weight: bold;
    margin-bottom: 16px;
    ${linkFont}
  `,
  mobileFollowMenu: css`
    margin-top: 28px;
  `,
  otherNetworksContainer: ({ isWorldCupMVP }) => css`
    align-items: center;
    color: ${isWorldCupMVP ? WHITE : BLACK};
    display: flex;
    font-size: ${rem('14px')};
    font-weight: bold;
    justify-content: space-between;
    margin-top: 26px;
    ${menuColumn}
    ${media.md`
      margin-top: 27px;
    `}
  `,
  tvGuideAndConectaContainer: css`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 26px;
    ${menuColumn}
    ${media.md`
      margin-top: 27px;
    `}
  `,
  otherNetworksIconsContainer: css`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-right: 0;
  `,
  popularTopicsContainer: ({ isWorldCupMVP }) => css`
    margin-left: -10px;
    padding: 0 10px;
    width: 100vw;
    ${media.sm`
      margin: 0;
      padding: 0;
      width: 100%;
    `}

    ${isWorldCupMVP && `
      background-color: ${WOODSMOKE};

      a {
        color: ${WHITE};
      }

      > div:first-child {
        color: ${SPRING_WING};
        border-color: ${SPRING_WING};
        font-size: 1rem;
        text-transform: uppercase;
      }
    `}
  `,
  secondaryShows: () => css`
    a:first-of-type {
      font-size: ${rem('14px')};
    }
  `,
  searchContainer: css`
    padding: 16px 23px;
    ${media.md`
      padding: 16px 0;
    `}
  `,
  search: ({ isWorldCupMVP }) => css`
    background-color: ${VERY_LIGHT_GREY};
    max-height: 40px;
    width: 100%;
    &&& {
      margin: 0;
      max-width: 100%;
    }
    form {
      border: 0;
      position: relative;
    }

    ${isWorldCupMVP && `
      background-color: ${CAPECOD};

      input:first-of-type {
        color: ${SILVER_SAND};
      }

      path {
        fill: ${SILVER_SAND};
      }
    `}
  `,
  tvGuideButton: ({ isWorldCupMVP }) => css`
    background-color: ${GREY_BLACK};
    color: ${WHITE};
    font-size: ${rem('14px')};
    font-weight: bold;
    height: 40px;
    letter-spacing: normal;
    line-height: ${rem('17px')};
    margin-top: 25px;
    text-transform: uppercase;
    width: 100%;

    ${isWorldCupMVP && css`
      background-color: ${SPRING_WING};
      color: ${BLACK};
    `}
  `,
  tvGuideLink: css`
    display: block;
    padding-right: 8px;
    ${media.md`
      padding-right: 10px;
    `}
  `,
  conectaLink: css`
    display: block;
    padding-left: 8px;
    ${media.md`
      padding-left: 10px;
    `}
  `,
  conectaButton: css`
    background: ${LONGFORM_GRADIENT_LABEL};
    background-color: ${CRIMSON_50};
    color: ${WHITE};
    font-size: ${rem('14px')};
    font-weight: bold;
    height: 40px;
    letter-spacing: normal;
    line-height: ${rem('17px')};
    margin-top: 25px;
    text-transform: uppercase;
    width: 100%;
  `,
  wrapper: ({ isWorldCupMVP }) => css`
    -webkit-overflow-scrolling: touch;
    background-color: ${WHITE};
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    z-index: ${ZINDEX_MEGA_MENU};

    ${isWorldCupMVP && `
      background-color: ${WOODSMOKE};
      color: ${WHITE};
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    `}
  `,
};
