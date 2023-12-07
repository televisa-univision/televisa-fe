import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import * as articleTypes from '@univision/fe-commons/dist/constants/articleTypes';
import {
  isValidObject,
  isValidString,
  getKey,
} from '@univision/fe-commons/dist/utils/helpers';
import cardNames from '@univision/fe-commons/dist/utils/tracking/tealium/card/constants/cardNames';
import univisionTheme from '@univision/fe-commons/dist/themes/univision';
import { getThemeFromVertical } from '@univision/fe-commons/dist/components/ThemeProvider/helpers';

/**
 * Determines which url to send to determine which vertical the content belongs to
 * @param {Object} hierarchy hierarchy of the content
 * @param {string} uri uri of the content
 * @returns {string}
 */
const getContentVertical = ({ hierarchy, uri }) => {
  return getKey(hierarchy, '0.uri', uri);
};

/**
 * Every card needs to also get the widgetContext along with the card metadata
 * for tracking purposes.
 * @param {Object} content the content object that comes from the API.
 * @param {Object} options extra options for tracking
 * @param {Object} options.widgetContext the context for the widget rendering
 * the card. For tracking purposes.
 * @param {Object} options.cardName the name of the card
 * @param {boolean} options.showSpinner flag to show the loading spinner
 * @returns {Object}
 */
const enhanceCardContent = (content, { widgetContext, cardName, showSpinner }) => ({
  ...content,
  cardTheme: {
    ...univisionTheme(),
    ...getThemeFromVertical(getContentVertical(content)),
  },
  contentType: content.type,
  showSpinner,
  widgetContext: {
    ...widgetContext,
    metaData: {
      cardName,
    },
  },
});

/**
 * Gets card data, which is a tuple where the first element is the card
 * component to be rendered, and the second element is the actual content
 * of the card.
 * @param {Object} content the content object that comes from the API.
 * @param {Object} options extra options for tracking
 * @param {Object} options.widgetContext the context for the widget rendering
 * the card. For tracking purposes.
 * @param {Object} options.cardName the name of the card.
 * @returns {Array} [CardComponent, content]
 */
const getCardData = (content, options) => {
  return [
    null, // we are not longer using this CardComponent
    enhanceCardContent(content, options),
  ];
};

/**
 * The card mapper will just map a content type to a card depending on the
 * specified set of rules. Then, in the widget factory, when building the new
 * redesign widgets, this helper will be called for each content that comes
 * from the API for that specific widget. The result will be passed to the
 * widget as an enhanced prop (this is all done in the widget factory).
 *
 * That result will either be an array of cards with the cards content:
 * [[RecipeCard, content], [AudioCard, content], [StoryCard, content], ...]
 *
 * Or, just a single card with its content (for SingleWidget for example):
 * [StoryCard, content]
 *
 * The props in each widget that received this result will be called `cardData`.
 *
 * Then, each widget will have the same interface, and it can just take care
 * of rendering the cards however it wishes, and also specifying the size the
 * card will have. Sizes for cards are determined on the widget level, that's why
 * this helper does not handle anything related to card sizing.
 */

/**
 * Gets the correct article card based on the defined rules.
 * @param {Object} content the content object that comes from the API.
 * @param {Object} options extra options
 * @param {Object} options.widgetContext the context for the widget rendering
 * the card. For tracking purposes.
 * @returns {Array} [Card, cardContent]
 */
const getArticleCard = (content, options) => {
  switch (content.articleType) {
    case articleTypes.HOROSCOPE:
      return getCardData(content, {
        ...options,
        cardName: cardNames.HOROSCOPE_CARD,
      });

    case articleTypes.RECIPE:
      return getCardData(content, {
        ...options,
        cardName: cardNames.RECIPE_CARD,
      });

    case articleTypes.JOB_LISTING:
      return getCardData(content, {
        ...options,
        cardName: cardNames.JOB_LISTING_CARD,
      });

    case articleTypes.ASK_EXPERT:
      return getCardData(content, {
        ...options,
        cardName: cardNames.ASK_EXPERT_CARD,
      });

    default:
      return getCardData(content, {
        ...options,
        cardName: cardNames.STORY_CARD,
      });
  }
};

/**
 * Gets the correct video card based on the defined rules.
 * @param {Object} content the content object that comes from the API.
 * @param {Object} options extra options
 * @param {Object} options.widgetContext the context for the widget rendering
 * the card. For tracking purposes.
 * @param {Object} options.forceVideoInlineCard force this card to be an inline
 * video
 * @returns {Array} [Card, cardContent]
 */
const getVideoCard = (content, options) => {
  let cardName;

  switch (true) {
    // longform first so it is always the episode card
    case content.longform:
      cardName = cardNames.EPISODE_CARD;
      break;
    case options.forceVideoInlineCard:
      cardName = cardNames.VIDEO_INLINE_CARD;
      break;
    default:
      cardName = cardNames.VIDEO_PREVIEW_CARD;
      break;
  }

  return getCardData(content, { ...options, cardName });
};

/**
 * Gets the correct video card based on the defined rules.
 * @param {Object} content the content object that comes from the API.
 * @param {Object} options extra options
 * @param {Object} options.widgetContext the context for the widget rendering
 * the card. For tracking purposes.
 * @param {Object} options.forcePromoCard force this card to be a promo card
 * @returns {Array} [Card, cardContent]
 */
const getLiveStreamCard = (content, options) => {
  let cardName;

  switch (true) {
    case options.forcePromoCard:
      cardName = cardNames.PROMO_CARD;
      break;

    default:
      cardName = cardNames.LIVESTREAM_CARD;
      break;
  }

  return getCardData(content, { ...options, cardName });
};

/**
 * Maps a content type to a card depending on what widget the content type is
 * rendered on.
 * @param {Object} content the content object that comes from the API.
 * Found under
 *  widgets: Array ->
 *    widget: Object ->
 *      contents: Array ->
 *        content: Object
 * @param {Object} options extra options
 * @param {Object} options.widgetContext the context for the widget rendering
 * the card. For tracking purposes.
 * @param {boolean} [options.forceVideoInlineCard] makes video content type a
 * VIDEO_INLINE_CARD.
 * @returns {Array} [Card, cardContent]
 */
const getCardByContentType = (
  content,
  options = { widgetContext: {}, forceVideoInlineCard: false }
) => {
  if (!isValidObject(content) || !isValidString(content.type)) {
    return [null, null];
  }

  switch (content.type) {
    case contentTypes.ARTICLE:
      return getArticleCard(content, options);

    case contentTypes.SLIDESHOW:
      return getCardData(content, {
        ...options,
        cardName: cardNames.SLIDESHOW_CARD,
      });

    case contentTypes.VIDEO:
      return getVideoCard(content, options);

    case contentTypes.SHOW:
      return getCardData(content, {
        ...options,
        cardName: cardNames.SHOW_CARD,
      });

    case contentTypes.LIVE_STREAM:
      return getLiveStreamCard(content, options);

    case contentTypes.LOCAL_WEATHER_FORECAST:
      return getCardData(content, {
        ...options,
        cardName: cardNames.LOCAL_WEATHER_FORECAST,
      });

    case contentTypes.PERSON:
      return getCardData(content, {
        ...options,
        cardName: cardNames.PERSON_CARD,
      });

    case contentTypes.LIVE_BLOG:
      return getCardData(content, {
        ...options,
        cardName: cardNames.LIVEBLOG_CARD,
      });

    case contentTypes.PODCAST_EPISODE:
      return getCardData(content, {
        ...options,
        cardName: cardNames.PODCAST_EPISODE_CARD,
      });

    case contentTypes.PODCAST_SERIES:
      return getCardData(content, {
        ...options,
        cardName: cardNames.PODCAST_SERIE_CARD,
      });

    case contentTypes.RADIO_STATION:
      return getCardData(content, {
        ...options,
        cardName: cardNames.RADIO_CARD,
      });

    case contentTypes.SOCCER_MATCH:
      return getCardData(content, {
        ...options,
        cardName: cardNames.MATCH_CARD,
      });

    default:
      return getCardData(content, {
        ...options,
        cardName: cardNames.PROMO_CARD,
      });
  }
};

export default getCardByContentType;
