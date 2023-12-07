import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import {
  BACKGROUND_24_7,
  TUDN_CARD_MOBILE_BG,
  TUDN_CARD_DESKTOP_BG,
} from '@univision/fe-commons/dist/constants/urls';
import mediaRange from '@univision/fe-utilities/styled/mixins/mediaRange';
import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import {
  ARTICLE,
  EXTERNAL_CONTENT_PROMO,
  LIVE_BLOG,
  LIVE_STREAM,
  SECTION,
  VIDEO,
  VIX_PLAYER,
} from '@univision/fe-commons/dist/constants/contentTypes';
import {
  APP_BREAKPOINTS,
  MONTSERRAT_FONT_FAMILY,
  WHITE_25,
  BLACK_GREY,
  BLACK,
  BLACK_00,
  BLACK_GREY_00,
  DARK_GREY,
  DARKER_GREY,
  MOBILE_SCREEN_SIZE_SMALL,
  MOBILE_SCREEN_SIZE_DEFAULT,
  ROBOTO_CONDENSED_FONT_FAMILY,
  TORCH_RED,
  TRANSPARENT,
  WHITE,
  FOLLY,
  WOOD_SMOKE,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import numberOfLines from '@univision/fe-utilities/styled/mixins/numberOfLines';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';

/**
 * Main Wrapper Styles
 * @param {string} layout - layout type
 * @param {bool} isRelatedFlavor - if is related flavor
 * @returns {function}
 */
const getMainWrapperStyle = (layout, isRelatedFlavor) => {
  return getFromMap(layout, {
    [ARTICLE]: css`
      ${isRelatedFlavor && css`
        background: ${BLACK_GREY};
        grid-template-rows: auto auto 43.73333333%;

        ${media.sm`
          grid-template-rows: 100%;
        `}
      `}
    `,
    [LIVE_BLOG]: css`
      background: ${TRANSPARENT};
      grid-template-rows: auto auto 43.73333333%;

      ${media.sm`
        grid-template-rows: 50% auto;
      `}
    `,
  });
};

/**
 * Content Wrapper Styles
 * @param {string} layout - layout type
 * @returns {function}
 */
const getContentStyle = (layout) => {
  /**
   * Creates a gradient at bottom of element
   * @param {number} height - gradient heigh
   * @returns {Object}
   */
  const gradientSharedStyle = height => css`
    &::after {
      background: linear-gradient(180deg, rgba(24,24,24,0) 0%, ${BLACK_GREY} 100%);
      bottom: 0;
      content: "";
      height: ${height}px;
      left: 0;
      position: absolute;
      width: 100%;
    }

    ${media.sm`
      &::after {
        content: none;
      }
    `}
  `;

  return getFromMap(layout, {
    [ARTICLE]: gradientSharedStyle(210),
    [LIVE_BLOG]: css`
      grid-row: 1 / 3;

      ${gradientSharedStyle(210)};

      ${media.sm`
        grid-row-end: 1;

        &::after {
          content: none;
        }
      `}
    `,
    [SECTION]: css`
      grid-row: 1 / 3;

      ${gradientSharedStyle(120)};

      &::after {
        bottom: 50px;
      }

      ${media.sm`
        grid-row-end: 1;

        &::after {
          content: none;
        }
      `}
    `,
    [EXTERNAL_CONTENT_PROMO]: gradientSharedStyle(120),
  });
};

/**
 * Title Label Styles
 * @param {string} layout - layout type
 * @param {boolean} isRelatedFlavor - current flavor
 * @param {boolean} isLive247 - if is a livestream 24/7
 * @param {boolean} forceMobile - if true, it will force mobile
 * @param {boolean} isTudn - on TUDN site
 * @param {boolean} isVixPlayer - is vix player type
 * @returns {function}
 */
const getTitleLabelStyle = (
  layout,
  isRelatedFlavor,
  isLive247,
  forceMobile,
  isTudn,
  isVixPlayer
) => {
  const promoSharedStyle = css`
    background: transparent;
    bottom: 65px;
    grid-row: 1;
    height: auto;
    position: absolute;

    ${!forceMobile && media.sm`
      background-color: ${BLACK_GREY};
      bottom: unset;
      height: calc(100% - 50px);
      position: inherit;
    `}
  `;

  const liveAndVix = css`
    padding-top: ${rem(12)};

    ${(isLive247 || isVixPlayer) && css`
      background: url(${isTudn ? TUDN_CARD_MOBILE_BG : BACKGROUND_24_7}) no-repeat;
      background-size: cover;
      height: auto;
      min-height: ${rem(300)};

      ${isTudn && css`
        background-position: right 0 bottom 100px;
      `}

      ${media.sm`
        padding-top: ${rem(16)};
      `}

      ${isTudn && media.sm`
        background: url(${TUDN_CARD_DESKTOP_BG}) no-repeat;
      `}
    `}
  `;

  return getFromMap(layout, {
    [VIX_PLAYER]: liveAndVix,
    [LIVE_STREAM]: liveAndVix,
    [LIVE_BLOG]: css`
      background-color: ${TRANSPARENT};
      margin-top: -10px;
      position: absolute;

      ${media.sm`
        margin-top: 10px;
        position: relative;
      `}
    `,
    [SECTION]: promoSharedStyle,
    [EXTERNAL_CONTENT_PROMO]: promoSharedStyle,
    [ARTICLE]: css`
      ${isRelatedFlavor && css`
        background-color: ${TRANSPARENT};
        position: absolute;
        top: -90px;

        ${media.sm`
          position: unset;
        `}
      `}
    `,
  });
};

/**
 * Link Color style
 * @param {string} layout - layout type
 * @param {boolean} isDarkTheme - is dark theme
 * @returns {function}
 */
const getLinkTitleStyle = (layout, isDarkTheme) => getFromMap(layout, {
  [LIVE_BLOG]: css`
    ${media.sm`
      color: ${isDarkTheme ? WHITE : BLACK_GREY};

      &&:hover {
        color: ${isDarkTheme ? WHITE : BLACK_GREY};
      }
    `}
  `,
});

/**
 * Action Wrapper Styles
 * @param {string} layout - layout type
 * @param {boolean} isDarkTheme - is dark theme
 * @returns {function}
 */
const getActionWrapperStyle = (layout, isDarkTheme) => getFromMap(layout, {
  [LIVE_BLOG]: css`
    background-color: ${isDarkTheme ? BLACK_GREY : WHITE};
  `,
});

/**
 * Category Wrapper Styles
 * @param {string} layout - layout type
 * @returns {function}
 */
const getCategoryStyles = layout => getFromMap(layout, {
  [ARTICLE]: css`
    margin-top: -26px;

    ${media.sm`
      margin-top: 0;
    `};
  `,
  [VIDEO]: css`
    margin-top: 10px;
  `,
  [LIVE_BLOG]: css`
    > div {
      max-height: 24px;
    }
  `,
});
/**
 * Picture Styles
 * @param {string} layout - layout type
 * @returns {function}
 */
const getPictureStyle = (layout) => {
  const sharedPictureStyle = css`
    > div {
      padding-bottom: 100%;
    }

    ${media.sm`
      > div {
      padding-bottom: 56.25%;
    `}
  `;

  return getFromMap(layout, {
    [EXTERNAL_CONTENT_PROMO]: sharedPictureStyle,
    [SECTION]: sharedPictureStyle,
  });
};

/**
 * Title style
 * @param {string} layout - layout type
 * @param {boolean} isRelatedFlavor - current flavor
 * @returns {function}
 */
const getTitleStyle = (layout, isRelatedFlavor) => getFromMap(layout, {
  [ARTICLE]: css`
    margin: 10px 0 14px;

    ${media.sm`
      margin: 0;
    `}

    ${isRelatedFlavor && css`
      ${media.sm`
        margin: 10px 0 5px;
      `}
    `}
  `,
  [LIVE_BLOG]: css`
    color: ${WHITE};
    margin: 10px 0;
  `,
  [VIDEO]: css`
    margin: 0;
  `,
});

export default {
  actionBarWrapper: ({
    forceMobile,
    type,
    isDarkTheme,
  }) => css`
    border-top: 1px solid ${WHITE_25};
    bottom: 0;
    height: 50px;
    position: absolute;
    width: 100%;
    z-index: 2;

    ${isDarkTheme && css`
      border-top: 1px solid ${DARK_GREY};
      path:nth-child(2) {
        fill: ${WHITE};
      }
      div {
        border-top: none;
      }
    `}

    ${getActionWrapperStyle(type, isDarkTheme)}

    ${!forceMobile && media.sm`
      right: 0;
      width: 36%;
    `}
  `,
  articleContentWrapper: css`
    color: ${BLACK_GREY};
    grid-row: 2;
    padding: 0;
    position: absolute;
    top: 110px;

    ${mediaRange(APP_BREAKPOINTS.xxs, MOBILE_SCREEN_SIZE_SMALL, `
      margin-top: -15px;
    `)}

    ${media.sm`
      grid-row: 2;
      grid-column: 2;
      position: unset;
    `}
  `,
  aspectRatioWrapper: ({ forceMobile, isDarkTheme }) => css`
    background-color: ${isDarkTheme ? BLACK_GREY : BLACK_00};
    border-radius: 5px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.08);
    overflow: hidden;
    padding-bottom: 100%;
    position: relative;
    width: 100%;

    ${!forceMobile && media.sm`
      padding-bottom: 36%;
    `}
  `,
  categoryWrapper: ({ type }) => css`
    display: flex;
    margin-bottom: 4px;
    position: relative;

    ${getCategoryStyles(type)}
  `,
  content: ({ forceMobile, type }) => css`
    grid-row: 1;
    position: relative;

    img {
      object-fit: cover;
    }

    ${getContentStyle(type)};

    ${!forceMobile && media.sm`
      grid-column: 1;
    `}
  `,
  imageWrapper: css`
    svg {
      display: block;
      height: 20px;
      width: 126px;

      ${media.sm`
        height: 32px;
        width: 202px;
      `}
    }
  `,
  label: ({ isWorldCupMVP }) => css`
    font-family: ${ROBOTO_CONDENSED_FONT_FAMILY};
    font-size: ${rem(12)};
    font-weight: bold;
    letter-spacing: ${rem(1)};
    margin: 0;
    text-transform: uppercase;

    ${isWorldCupMVP && css`
      display: none;
      font-family: 'Roboto Flex', sans-serif;
      ${media.md`
        display: initial;
      `}
    `}
  `,
  lastUpdateLabel: ({ isWorldCupMVP }) => css`
    color: ${TORCH_RED};
    display: inline;
    font-family: ${ROBOTO_CONDENSED_FONT_FAMILY};
    font-size: ${rem(12)};
    letter-spacing: ${rem(1)};
    margin-left: -4px;
    padding: 0 24px;

    ${media.sm`
      margin-left: 4px;
    `}

    ${isWorldCupMVP && css`
      color: ${FOLLY};
      font-family: 'Poppins', sans-serif;
      font-size: ${rem(10)};
    `}
  `,
  liveblogContentWrapper: css`
    margin-top: 8px;

    ${media.sm`
      grid-area: 2 / 2;
      margin-top: -10px;
    `}
  `,
  pictureContentMatchCard: ({ type }) => css`
    height: auto;

    img {
      height: auto;
    }

    ${getPictureStyle(type)};
  `,
  readTime: css`
    color: ${WHITE};
    font-size: ${rem(10)};
    line-height: ${rem(14)};
    margin-top: -6px;
    text-transform: uppercase;

    svg {
      margin-right: 6px;
    }

    ${media.sm`
      margin-top: 16px;
    `}
  `,
  liveTextWrapper: ({ isTudn }) => css`
    align-items: center;
    bottom: -2px;
    color: ${WHITE};
    display: flex;
    font-size: ${rem(isTudn ? 10 : 12)};
    font-weight: 700;
    letter-spacing: 1px;
    padding: 0 0 0 ${isTudn ? '22px' : '24px'};
    position: relative;
    text-transform: uppercase;
    width: 100%;
    ${!isTudn && css`
      font-family: ${ROBOTO_CONDENSED_FONT_FAMILY};
    `}

    ${mediaRange(APP_BREAKPOINTS.sm, APP_BREAKPOINTS.md, `
      padding: 5px 0 0 ${isTudn ? '22px' : '24px'};
    `)}

    a {
      color: ${WHITE};
    }

    svg:nth-child(1) {
      bottom: 1px;
      left: -4px;
      position: relative;
    }

    svg:nth-child(2) {
      margin-left: 4px;
      transform: scale3d(1.5, 1.5, 1.5);

      ${mediaRange(APP_BREAKPOINTS.sm, APP_BREAKPOINTS.md, `
        height: 40px;
        width: auto;
      `)}
    }

    ${mediaRange(APP_BREAKPOINTS.xxs, MOBILE_SCREEN_SIZE_DEFAULT, `
      font-size: ${rem(isTudn ? 10 : 12)};
      letter-spacing: ${rem(0.3)};

      a {
        width: 100%;
      }

      svg {
        transform: scale3d(1.2, 1.2, 1.2);
      }
    `)}
  `,
  linkCategory: ({ type, isDarkTheme }) => css`
    color: ${WHITE};
    &:hover {
      color: ${WHITE};
      text-decoration: none;
    }

    ${getLinkTitleStyle(type, isDarkTheme)};
  `,
  linkTitle: ({ type, isDarkTheme, isTudn }) => css`
    color: ${WHITE};
    font-family: ${isTudn ? 'Roboto Flex' : MONTSERRAT_FONT_FAMILY}, sans-serif;
    font-size: ${rem(16)};
    font-weight: 700;
    line-height: ${rem(20)};
    &&:hover {
      color: ${WHITE};
      text-decoration: none;
    }
    ${media.md`
      font-size: ${rem(30)};
      line-height: ${rem(34)};
    `}
    ${getLinkTitleStyle(type, isDarkTheme)};
  `,
  linkTitleMatch: ({ type, isDarkTheme }) => css`
    color: ${WHITE};
    font-family: 'Roboto Flex', sans-serif;
    font-weight: 700;
    line-height: ${rem(16)};
    position: relative;
    z-index: 3;
    &&:hover {
      color: ${WHITE};
      text-decoration: none;
    }
    ${media.sm`
      font-size: ${rem(16)};
    `}
    ${media.md`
      font-size: ${rem(32)};
      line-height: ${rem(30)};
    `}
    ${media.lg`
      line-height: ${rem(38)};
    `}
    ${getLinkTitleStyle(type, isDarkTheme)};
`,
  mainWrapper: ({
    forceMobile,
    isRelatedContentFlavor,
    type,
  }) => css`
    background: ${BLACK_GREY};
    display: grid;
    grid-template-rows: auto 43.73333333%;
    height: 100%;
    position: absolute;
    width: 100%;

    ${!forceMobile && media.sm`
      grid-template-columns: auto 36%;
      grid-template-rows: auto;
    `}

    ${getMainWrapperStyle(type, isRelatedContentFlavor)};
  `,
  pictureContent: ({ type }) => css`
    height: auto;

    img {
      height: 100%;
    }

    ${getPictureStyle(type)};
  `,
  scheduleTimeWrapper: css`
    line-height: ${rem(16)};
    margin: 0 0 -4px;

    ${mediaRange(APP_BREAKPOINTS.xxs, MOBILE_SCREEN_SIZE_DEFAULT, `
      margin-bottom: -5px;
    `)}

    ${media.sm`
      margin: 16px 0px 0;
      line-height: ${rem(21)};
    `}
  `,
  squareBadgeWrapper: css`
    left: 0;
    margin-right: 10px;
    position: relative;
    top: 0;
  `,
  squareLiveblogPostsWrapper: css`
    margin-bottom: 0;
    margin-top: 7px;
    max-height: 70px;
    overflow: hidden;

    ${media.sm`
      height: 150px;
      max-height: 150px;
      margin-top: 10px;
      z-index: 2;

      li {
        height: 55px;
        padding-top: 10px;
      }

      a {
        font-size: ${rem(14)};
        line-height: ${rem(18)}
      }
    `}
  `,
  title: ({ type, isRelatedContentFlavor, isWorldCupMVP }) => css`
    color: ${WHITE};
    font-size: ${rem(16)};
    line-height: ${rem(20)};
    margin: 10px 0 0;

    ${media.md`
      margin: 10px 0 0;
    `}

    ${numberOfLines(2)}

    ${media.sm`
      font-size: clamp(${rem(16)}, 2.1vw, ${rem(34)});
      letter-spacing: -0.4px;
      line-height: clamp(${rem(16)}, 2.4vw, ${rem(34)});

      ${numberOfLines(4)}
    `}

    ${getTitleStyle(type, isRelatedContentFlavor)};

    ${isWorldCupMVP && css`
      font-family: 'Roboto Flex', sans-serif;
      font-size: ${rem(14)};
      ${media.sm`
        font-size: clamp(${rem(16)}, 2.1vw, ${rem(34)});
      `}
    `}
  `,
  titleLabel: ({
    forceMobile,
    isLive247,
    isRelatedContentFlavor,
    type,
    isTudn,
    isVixPlayer,
  }) => css`
    background-color: ${BLACK_GREY};
    display: flex;
    flex-direction: column;
    grid-row: 2;
    height: 100%;
    padding: 0 ${isTudn ? '22px' : '24px'};
    position: relative;
    width: 100%;
    z-index: 2;

    ${getTitleLabelStyle(type, isRelatedContentFlavor, isLive247, forceMobile, isTudn, isVixPlayer)};

    ${!forceMobile && media.sm`
      grid-area: 1 / 2;
      justify-content: center;
    `}
  `,
  timeAgoWrapper: ({ isDarkTheme }) => css`
    color:  ${isDarkTheme ? WHITE : BLACK_00};
    font-family: ${ROBOTO_CONDENSED_FONT_FAMILY};
    font-size: ${rem(10)};
    letter-spacing: ${rem(0.4)};
    margin-left: -15px;
    padding-left: 10px;
    position: relative;
    text-transform: uppercase;

    &::before {
      background-color: ${DARKER_GREY};
      content: "";
      height: 8px;
      left: 0;
      position: absolute;
      top: 1px;
      width: 1px;
    }
  `,
  topLiveWrapper: ({ isTudn }) => css`
    color: ${WHITE};
    font-family: ${isTudn ? 'Roboto Flex' : ROBOTO_CONDENSED_FONT_FAMILY};
    font-size: ${rem(10)};
    letter-spacing: ${rem(0.4)};

    ${mediaRange(APP_BREAKPOINTS.xxs, MOBILE_SCREEN_SIZE_DEFAULT, `
      align-items: start;
      display: flex;
      flex-direction: column;
    `)}
  `,
  watchMoreWrapper: css`
    line-height: ${rem(20)};
    margin-right: ${rem(12)};

    ${mediaRange(APP_BREAKPOINTS.sm, APP_BREAKPOINTS.md, `
      margin-right: ${rem(10)};
    `)}
  `,
  competitionText: css`
    color: ${WHITE};
    font-size: ${rem(12)};
    font-weight: 700;
    justify-content: center;
    letter-spacing: 0;
    line-height: ${rem(11.72)};
    margin-left: 10px;
    text-transform: uppercase;
    z-index: 3;
`,
  matchImageWrapper: css`
    align-items: center;
    display: flex;
    height: 100%;
    position: relative;
    width: 100%;
  `,
  wrapperStatus: css`
    align-items: center;
    margin: -20px 0 16px 0;
    text-align: center;
    ${media.md`
      margin-top: -80px;
    `}
  `,
  wrapper: () => css`
    margin: 0px 24px 0;
    width: 100%;
    z-index: auto;

    ${media.xxs`
      margin: -160px 16px 0;
    `}
    ${media.xs`
      margin: -180px 16px 0;
    `}
    ${media.sm`
      margin: -40px 16px 0;
    `}
    ${media.md`
      margin: 0px 24px 0;
    `}
  `,
  row: () => css`
    align-items: center;
    flex-direction: row;
    margin: 16px 0 16px;
    padding: 0px;
    position: relative;
    z-index: 3;
  `,
  pictureBackground: ({ type }) => css`
    height: auto;
    position: inherit;
    z-index: -1;

    img {
      height: 100%;
    }

  ${getPictureStyle(type)};
  `,
  cardOverlayText: () => css`
    background: ${BLACK};
    bottom: 0;
    height: 100%;
    left: 0;
    opacity: 48%;
    position: absolute;
    right: 0;
    z-index: 0;
  `,
  cardOverlayImage: () => css`
    background: ${linearGradient({ direction: '180deg', start: BLACK_GREY_00, end: WOOD_SMOKE })};
    bottom: 0;
    height: ${rem(132)};
    left: 0;
    position: absolute;
    right: 0;
    z-index: 0;
  `,
  overlayWrapper: css`
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  `,
  scoreCardBadge: css`
    position:sticky;
  `,
  widgetMainTitle: css`
    font-size: ${rem(26)};
  `,
  watchingNow: ({ isTudn }) => css`
    color: ${WHITE};
    font-size: ${rem(10)};
    letter-spacing: ${rem(0.4)};
    line-height: ${rem(16)};
    ${!isTudn && css`
      font-family: ${ROBOTO_CONDENSED_FONT_FAMILY};
    `}

    ${media.sm`
      line-height: ${rem(21)};
    `}

    ${media.md`
      margin-top: ${rem(10)};
    `}
  `,
};
