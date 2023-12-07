import { css } from 'styled-components';
import {
  HALF_PORTRAIT,
  LANDSCAPE,
  LIST,
  PORTRAIT,
  RECTANGLE,
  SQUARE,
  VERTICAL as VERTICAL_CARD,
} from '@univision/fe-commons/dist/constants/cardTypes';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import { HORIZONTAL, VERTICAL } from '@univision/fe-commons/dist/constants/layoutTypes';
import {
  APP_BREAKPOINTS,
  BASELINE_CARDS,
  GREY_BLACK,
  WHITE,
  BLACK_GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';
import {
  ADVERTISING,
  BREAKING_NEWS,
  OTHER_SPORTS,
  LIVE_BLOG,
  FUTBOL,
  GALAVISION,
  ENTRETENIMIENTO,
  OPINION,
  SHOWS,
  FAMOSOS,
  DELICIOSO,
  MULHER,
  ZAPPEANDO,
  TASAUDAVEL,
  HOROSCOPOS,
  DEPORTES,
  LIFE_STYLE,
} from '@univision/shared-components/dist/constants/labelTypes';
import { JOB_LISTING } from '@univision/fe-commons/dist/constants/articleTypes';
import {
  ARTICLE,
  EXTERNAL_LINK,
  SLIDESHOW,
  VIDEO,
  LIVE_STREAM,
  SHOW,
  SECTION,
  SOCCER_MATCH,
  PODCAST_EPISODE,
  PODCAST_SERIES,
  PERSON,
  RADIO_STATION,
  TV_STATION,
  CROSS_VERTICAL_PROMO,
  EXTERNAL_CONTENT_PROMO,
  VIX_PLAYER,
} from '@univision/fe-commons/dist/constants/contentTypes';
import { BREAKING } from '@univision/fe-commons/dist/constants/contentPriorities';
import { media, mediaRange, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import features from '@univision/fe-commons/dist/config/features';
import {
  getFromMap,
  getKey,
  isValidObject,
  toRelativeUrl,
  isValidArray,
  deburrToLowerCase,
  isValidValue,
} from '@univision/fe-commons/dist/utils/helpers';
import toCamelCase from '@univision/fe-utilities/helpers/string/toCamelCase';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import Store from '@univision/fe-commons/dist/store/store';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { HOROSCOPE } from '@univision/fe-commons/dist/constants/pageCategories';
import squareCardTracking from '../SquareCards/SquareCard/constants/tracking';
/**
 * Check if card type is half portrait
 * @param {string} type the card type
 * @returns {boolean}
 */
export const isHalfPortraitCard = type => type === HALF_PORTRAIT;

/**
 * Check if card type is portrait
 * @param {string} type the card type
 * @returns {boolean}
 */
export const isPortraitCard = type => type === PORTRAIT;

/**
 * Check if card type is rectangle
 * @param {string} type the card type
 * @returns {boolean}
 */
export const isRectangleCard = type => type === RECTANGLE;

/**
 * Check if card type is square
 * @param {string} type the card type
 * @returns {boolean}
 */
export const isSquareCard = type => type === SQUARE;

/**
 * Check if card type is list
 * @param {string} type the card type
 * @returns {boolean}
 */
export const isListCard = type => type === LIST;

/**
 * Check if card type is vertical
 * @param {string} type the card type
 * @returns {boolean}
 */
export const isVerticalCard = type => type === VERTICAL_CARD;

const paddingPercentage1x1 = 100;
const paddingPercentage1x4 = 180;
const paddingPercentage2x1 = 50;
const paddingPercentage2x3 = 150;
const paddingPercentage4x1 = 33;
const paddingPercentage4x5 = 125;
const paddingPercentage16x9 = 56.25;

/**
 * Check if card type is landscape
 * @param {string} type the card type
 * @returns {boolean}
 */
export const isLandscapeCard = type => type === LANDSCAPE;

// TODO: all this styles 'helpers' must be move to commons/src/styled/mixins/cards/index.js
/**
 * Get card aspect ratio
 * @param {string} type the card type
 * @returns {string}
 */
export const getCardAspectRatio = type => getFromMap(type, {
  [HALF_PORTRAIT]: css`
    padding-bottom: ${paddingPercentage2x3}%;
  `,
  [LANDSCAPE]: css`
    /* On desktop, portrait cards are landscape which are 16:9 ratio + 76px */
    padding-bottom: calc(${paddingPercentage16x9}% + 76px);
  `,
  [LIST]: css`
    padding-bottom: ${paddingPercentage4x1}%;
  `,
  [PORTRAIT]: css`
    padding-bottom: ${paddingPercentage4x5}%;
  `,
  [RECTANGLE]: css`
    padding-bottom: ${paddingPercentage2x1}%;
  `,
  [SQUARE]: css`
    padding-bottom: ${paddingPercentage1x1}%;
  `,
  [VERTICAL]: css`
    padding-bottom: ${paddingPercentage1x4}%;
  `,
});

/**
 * Gets hover rule
 * @param {string} color To apply in the hover color
 * @returns {*}
 */
export const getCardHoverState = (color) => {
  if (!color) return null;

  return css`
    &:hover {
      color: ${color};
      & > svg path {
        fill: ${color} !important;
      }
    }
  `;
};

/**
 * Returns true is card is Portrait or Landscape
 * @param {*} type props type
 * @returns {bool}
 */
export const isPortraitOrLandscapeCard = (type) => {
  return isPortraitCard(type) || isLandscapeCard(type);
};

/**
 * Gets default Card Header consolidated styles
 * @param {string} type Card type
 * @param {Object} options for the header
 * @returns {*}
 */
export const getCardHeaderStyles = (type, options = {}) => {
  if (!type) return null;

  const {
    color = WHITE,
    hasAdSkin,
    hoverColor = GREY_BLACK,
  } = options;

  return css`
    color: ${color};

    a {
      color: ${color};
      ${getCardHoverState(hoverColor)}
    }

    ${getFromMap(type,
    {
      [LANDSCAPE]: css`
        font-size: ${rem('24px')};
        line-height: ${rem('29px')};
      `,
      [PORTRAIT]: css`
        font-size: ${rem('18px')};
        line-height: ${rem('21px')};

        ${mediaRange(BASELINE_CARDS, APP_BREAKPOINTS.sm, `
          font-size: ${rem('20px')};
          line-height: ${rem('24px')};
        `)}

        ${media.sm`
          font-size: ${rem('29px')};
          line-height: ${rem('35px')};
        `}

        ${media.md`
          font-size: ${rem('22px')};
          line-height: ${rem('26px')};
        `}
      `,
      [RECTANGLE]: css`
        font-size: ${rem('12px')};
        line-height: ${rem('16px')};

        ${mediaRange(BASELINE_CARDS, APP_BREAKPOINTS.sm, `
          font-size: ${rem('14px')};
          line-height: ${rem('18px')};
        `)}

        ${media.sm`
          font-size: ${rem('20px')};
          line-height: ${rem('26px')};
        `}

        ${media.md`
          font-size: ${rem('16px')};
          line-height: ${rem('20px')};
        `}

        ${hasAdSkin && media.xl`
          font-size: ${rem('14px')};
          line-height: ${rem('18px')};
        `}
      `,
      default: css`
        font-size: ${rem('14px')};
        line-height: ${rem('17px')};

        ${mediaRange(BASELINE_CARDS, APP_BREAKPOINTS.sm, `
          font-size: ${rem('16px')};
          line-height: ${rem('19px')};
        `)}

        ${media.sm`
          font-size: ${rem('23px')};
          line-height: ${rem('27px')};
        `}

        ${media.md`
          font-size: ${rem('16px')};
          line-height: ${rem('19px')};
        `}

        ${media.xl`
          font-size: ${rem('18px')};
          line-height: ${rem('21px')};
        `}

        ${hasAdSkin && media.xl`
          font-size: ${rem('16px')};
          line-height: ${rem('19px')};
        `}
      `,
    })}
  `;
};

/**
 * Gets default Card Description consolidated styles
 * @param {string} type Card type
 * @param {string} [color] Regular color of the description
 * @param {string} [hoverColor] hover color of the description
 * @returns {*}
 */
export const getCardDescriptionStyles = (type, color = WHITE, hoverColor = GREY_BLACK) => {
  if (!type) return null;

  return css`
    color: ${color};
    font-size: ${rem('12px')};
    line-height: ${rem('16px')};

    a {
      color: ${color};
      ${getCardHoverState(hoverColor)}
    }

    ${getFromMap(type,
    {
      [LANDSCAPE]: css`
        font-size: ${rem('16px')};
        line-height: ${rem('20px')};
      `,
      default: css`
        ${mediaRange(BASELINE_CARDS, APP_BREAKPOINTS.sm, `
          font-size: ${rem('14px')};
          line-height: ${rem('18px')};
        `)}

        ${media.sm`
          font-size: ${rem('20px')};
          line-height: ${rem('26px')};
        `}

        ${media.md`
          font-size: ${rem('15px')};
          line-height: ${rem('20px')};
        `}
      `,
    })}
  `;
};

/**
 * Attaches cardType if available to the cardContent metadata inside the
 * widgetContext.
 * @param {Object} cardContent the content that comes from the API plus whatever
 * gets added in the widgetFactory.
 * @param {string} cardType the card type provided at the widget level.
 * @returns {Object} the new card content with the cardType added to the
 * metadata.
 */
export const attachCardTypeMetaData = (cardContent, cardType) => {
  const newCardContent = { ...cardContent };
  const metaData = getKey(newCardContent, 'widgetContext.metaData');

  if (isValidObject(metaData)) {
    newCardContent.widgetContext.metaData.cardType = cardType;
  }

  return newCardContent;
};

/**
 * Wrapper for attachCardTypeMetaData to also mark this content as personalized.
 * @param {Object} cardContent the content that comes from the API plus whatever
 * gets added in the widgetFactory.
 * @returns {Object}
 */
export const setAsPersonalizedContent = (cardContent) => {
  const newCardContent = { ...cardContent };
  const metaData = getKey(newCardContent, 'widgetContext.metaData');

  if (isValidObject(metaData)) {
    newCardContent.widgetContext.metaData.isPersonalized = true;
  }

  return newCardContent;
};

/**
 * Gets the background card based on the variant
 * @param {Object} options for the background card
 * @returns {string}
 */
export const getCardBackground = ({ isDark }) => {
  return isDark ? BLACK_GREY : WHITE;
};

/**
 * Returns true is the current page's uri matches the one passed
 * @param {string} uri to check
 * @returns {bool}
 */
export const isParentSameAsPage = (uri) => {
  const pageData = getPageData(Store);
  const pageUri = getKey(pageData, 'data.uri', '');
  const parentUri = getKey(pageData, 'data.parent.uri', '');
  return (toRelativeUrl(uri) === toRelativeUrl(pageUri))
    && (toRelativeUrl(uri) === toRelativeUrl(parentUri));
};

/**
 * Gets default Square Card Header consolidated styles
 * @param {string} size Card size
 * @param {Object} options for the header
 * @returns {*}
 */
export const getSquareCardHeaderStyles = (size, options = {}) => {
  if (!isValidValue(size)) return null;
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const {
    color = WHITE,
    hoverColor = GREY_BLACK,
  } = options;

  return css`
    color: ${color};

    a {
      color: ${color};
      ${getCardHoverState(hoverColor)}
    }

    ${getFromMap(size,
    {
      [LARGE]: css`
        font-size: ${rem('16px')};
        line-height: ${rem('20px')};
        ${media.sm`
          font-size: ${rem('30px')};
          line-height: ${rem('34px')};
        `}
        ${isWorldCupMVP && css`
          ${media.sm`
            font-size: ${rem('34px')};
            line-height: ${rem('41px')};
          `}
        `}
        ${mediaRange(APP_BREAKPOINTS.md, APP_BREAKPOINTS.lg, `
          font-size: ${rem('22px')};
          line-height: ${rem('26px')};
        `)}
      `,
      [MEDIUM]: css`
        font-size: ${rem('16px')};
        line-height: ${rem('20px')};
      `,
      [SMALL]: css`
        font-size: ${rem('14px')};
        line-height: ${rem('18px')};
      `,
      [HORIZONTAL]: css`
        font-size: ${rem('14px')};
        line-height: ${rem('18px')};
      `,
      [VERTICAL]: css`
        font-size: ${rem('12px')};
        line-height: ${rem('16px')};
      `,
    })}
  `;
};

/**
 * Gets Card tag label data
 * @param {Object} options - options to get card label
 * @param {Array} options.authors - the authors
 * @param {Array} options.hierarchy - the content hierarchy
 * @param {string} options.articleType - the card type
 * @param {string} options.cardLabel - the card label form cms
 * @param {string} options.channelOrShowName - content name for show in prenda tv
 * @param {string} options.contentPriority - content priority
 * @param {string} options.type - the content or card type
 * @param {string} options.uri - the content uri
 * @param {string} options.vertical - the vertical the content belongs to
 * @returns {Object}
 */
export const getCardLabel = ({
  articleType = '',
  authors = [],
  cardLabel = '',
  channelOrShowName = '',
  contentPriority = '',
  hierarchy = [],
  type = '',
  uri = '',
  vertical = '',
} = {}) => {
  let label = {};
  let parent = '';
  // TODO: this logic require refactor
  if (isValidArray(hierarchy)) {
    label = hierarchy[hierarchy.length - 1];
    parent = hierarchy[0]?.name === DEPORTES ? hierarchy[1]?.name : hierarchy[0]?.name;
  }
  let text = cardLabel || label?.title || '';
  let href = label?.uri || '';
  let labelType = isValidValue(vertical) ? toCamelCase(vertical) : 'default';
  const validText = isValidValue(text);
  if (parent && (deburrToLowerCase(parent) !== FUTBOL) && labelType === DEPORTES) {
    labelType = OTHER_SPORTS;
  }
  if (isValidValue(parent)) {
    labelType = getFromMap(deburrToLowerCase(toCamelCase(parent)), {
      [SHOWS]: SHOWS,
      [FAMOSOS]: FAMOSOS,
      [DELICIOSO]: DELICIOSO,
      [HOROSCOPOS]: HOROSCOPOS,
      [GALAVISION]: GALAVISION,
      [ENTRETENIMIENTO]: ENTRETENIMIENTO,
      [MULHER]: MULHER,
      [ZAPPEANDO]: ZAPPEANDO,
      [TASAUDAVEL]: TASAUDAVEL,
      [deburrToLowerCase(LIFE_STYLE)]: LIFE_STYLE,
    }) || labelType;
  }
  if (validText && (deburrToLowerCase(text) === FUTBOL)) {
    labelType = FUTBOL;
  }
  if ((validText && (deburrToLowerCase(text) === OPINION)) && isValidArray(authors)) {
    text = authors[0]?.fullName;
    href = authors[0]?.uri;
    labelType = OPINION;
  }
  if (validText && (deburrToLowerCase(text) === LIVE_BLOG)) {
    labelType = LIVE_BLOG;
    href = uri;
  }
  if ((isValidValue(type) && (deburrToLowerCase(type) === ADVERTISING))
    || articleType === JOB_LISTING) {
    labelType = ADVERTISING;
    text = LocalizationManager.get('advertisement');
    href = label?.uri || '';
  }
  // For this particular case we wanna force the cardLabel value on livestream cards
  if (isValidValue(type)
    && (deburrToLowerCase(type) === LIVE_STREAM)) {
    labelType = LIVE_BLOG;
    text = isValidValue(cardLabel) ? cardLabel : '';
    href = isValidValue(cardLabel) ? uri : '';
  }
  if (isValidValue(contentPriority)
    && (deburrToLowerCase(contentPriority) === deburrToLowerCase(BREAKING))) {
    labelType = BREAKING_NEWS;
    text = LocalizationManager.get(BREAKING_NEWS);
    href = uri;
  }
  if (type === CROSS_VERTICAL_PROMO) {
    text = LocalizationManager.get('digitalChannel');
    labelType = SHOWS;
  }
  if (channelOrShowName) {
    text = channelOrShowName;
  }

  return {
    text, href, type: labelType,
  };
};

/**
 * Gets Square Card Content type
 * @param {string} cardType - the card type
 * @param {bool} liveStreamMatch - true if type is live stream match
 * @returns {Object}
 */
export const getSquareCardContentType = (cardType, liveStreamMatch) => {
  return {
    isArticle: cardType === ARTICLE,
    isAdvertising: cardType === ADVERTISING,
    isLiveblog: cardType === LIVE_BLOG,
    isSlideshow: cardType === SLIDESHOW,
    isVideo: cardType === VIDEO,
    isLivestream: cardType === LIVE_STREAM && !liveStreamMatch,
    isShow: cardType === SHOW,
    isSoccerMatch: cardType === SOCCER_MATCH || liveStreamMatch,
    isPodcastEpisode: cardType === PODCAST_EPISODE,
    isPodcasteSeries: cardType === PODCAST_SERIES,
    isPerson: cardType === PERSON,
    isRadioStation: cardType === RADIO_STATION,
    isGeneric: cardType === SECTION || cardType === TV_STATION,
    isCrossVerticalPromo: cardType === CROSS_VERTICAL_PROMO,
    isExternalPromo: cardType === EXTERNAL_CONTENT_PROMO || cardType === EXTERNAL_LINK,
    isHoroscope: cardType === HOROSCOPE,
    isVixPlayer: cardType === VIX_PLAYER,
  };
};

/**
 * Attaches square card metadata for tracking
 * @param {Object} cardContent the content that comes from the API
 * @param {string} cardType the card type provided at the widget level.
 * @returns {Object} the new card content with the cardNAme and cardType added to the
 * metadata.
 */
export const attachSquareCardMetaData = (cardContent, cardType = SQUARE) => {
  if (!isValidObject(cardContent)) {
    return null;
  }
  const isInlineVideo = cardContent?.isInlineVideo || false;
  const contentType = cardContent?.type || ARTICLE;
  const widgetContext = cardContent?.widgetContext || {};
  const cardName = squareCardTracking[`${contentType}${isInlineVideo ? 'Inline' : ''}`];
  const meta = {
    metaData: { cardName, cardType },
  };
  return { ...cardContent, widgetContext: { ...widgetContext, ...meta } };
};

/**
 * Gets the maximum width that a card can grow to
 * https://univision.invisionapp.com/dsm/univision/univision-cards/folder/components/5d277fb751d1d83ba3cab275
 * @param {string} type the card type
 * @returns {string}
 */
export const getCardWidth = (type) => {
  if (isLandscapeCard(type)) {
    return css`
      width: 730px;
    `;
  }

  if (isVerticalCard(type)) {
    return css`
      width: 140px;
    `;
  }

  return css`
    max-width: 376px;
    width: 100%;

    ${media.xs`
      max-width: 560px;
    `}

    ${media.sm`
      max-width: 646px;
    `}

    ${media.md`
      max-width: 410px;
    `}
  `;
};

/**
 * Get the card position based on its index
 * @param {number} index the card index
 * @returns {string}
 */
export const getCardPosition = index => getFromMap(index, {
  0: css`
      align-items: center;
      display: flex;
      grid-column: 1 / 2;
      grid-row: 1 / 3;
    `,
  1: css`
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    `,
  2: css`
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    `,
  3: css`
      grid-column: 3 / 4;
      grid-row: 1 / 2;
    `,
  4: css`
      grid-column: 3 / 4;
      grid-row: 2 / 3;
    `,
});

/**
 * Get theme gradient
 * @param {string} theme - the theme card definition
 * @param {string} dir - the direction in deg
 * @returns {string}
 */
export const getThemeGradient = (theme, dir = '270deg') => {
  if (theme?.gradient) {
    return linearGradient({
      direction: dir,
      start: theme?.gradient?.start,
      end: theme?.gradient?.end,
    });
  }
  return linearGradient({
    direction: dir,
    start: theme?.primary,
    end: theme?.secondary,
  });
};

/**
 * Gets the correct video card based on the defined rules.
 * @param {string} contentType receive string type CT.
 * @returns {boolean} true for CT valid or false for CT invalid
 */
export const getValidationMVP = (contentType) => {
  return [
    ARTICLE,
    VIDEO,
    LIVE_BLOG,
    SLIDESHOW,
    SOCCER_MATCH,
    CROSS_VERTICAL_PROMO,
  ].includes(contentType);
};
