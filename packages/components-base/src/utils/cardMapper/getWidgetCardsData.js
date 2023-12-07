import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import {
  getKey,
  isValidArray,
} from '@univision/fe-commons/dist/utils/helpers';
import features from '@univision/fe-commons/dist/config/features';
import * as WidgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import cardMapper from '.';

/**
 * Get individual widget cardData based on widget type and content positioning
 * @param {Object} widgetContext the original widget props
 * @param {string} widgetContext.type widget type
 * @param {Array} content widget card content
 * @param {number} contentWidgetIndex index of the widget card content
 * @returns {Array} [[Card, cardContent], ...]
 */
export const getSingleCardData = (widgetContext, content, contentWidgetIndex) => {
  if (!content) return null;

  switch (getKey(widgetContext, 'widgetType')) {
    case WidgetTypes.SINGLE_WIDGET:
    case WidgetTypes.LOCAL_OPENING: {
      const options = {
        widgetContext,
        // always make video inline for the single widget and the local opening widget.
        // Later we will filter out longform in cardMapper.
        forceVideoInlineCard: true,
      };
      return cardMapper(content, options);
    }
    case WidgetTypes.CAROUSEL_WIDGET:
    case WidgetTypes.SHOWS_LF_GRID_FEATURED_EPISODES:
    case WidgetTypes.HERO_WIDGET: {
      // Livestream card should be forced to be a promo card for these
      const forcePromoCard = content.type === contentTypes.LIVE_STREAM;
      const options = {
        widgetContext,
        forcePromoCard,
      };
      return cardMapper(content, options);
    }
    case WidgetTypes.GRID_WIDGET: {
      // If its the first item in the grid and its a video, force inline
      // card.
      const forceInline = contentWidgetIndex === 0 && content.type === contentTypes.VIDEO;
      const showSpinner = (content.device === 'mobile' && contentWidgetIndex === 0) || (content.device !== 'mobile' && contentWidgetIndex === 1);
      const options = {
        widgetContext,
        forceVideoInlineCard: forceInline,
        showSpinner,
      };

      return cardMapper(content, options);
    }
    case WidgetTypes.LIST_WIDGET: {
      return cardMapper(content, { widgetContext });
    }
    default:
      return null;
  }
};

/**
 * Get widget cardsData based on widget type
 * @param {Object} widgetContext the original widget props
 * @param {string} widgetContext.type widget type
 * @param {Array} contents widget cards content
 * @returns {Array} [[Card, cardContent], ...]
 */
export const getWidgetCardsData = (widgetContext, contents) => {
  if (!isValidArray(contents)) return [];

  let result = [];
  switch (getKey(widgetContext, 'widgetType')) {
    case WidgetTypes.SINGLE_WIDGET:
    case WidgetTypes.LOCAL_OPENING: {
      const [content] = contents;
      return getSingleCardData(widgetContext, content, 0);
    }
    case WidgetTypes.CAROUSEL_WIDGET:
    case WidgetTypes.SHOWS_LF_GRID_FEATURED_EPISODES:
    case WidgetTypes.HERO_WIDGET: {
      result = contents.map((content, index) => getSingleCardData(widgetContext, content, index));
      break;
    }
    case WidgetTypes.GRID_WIDGET: {
      result = contents.map((content, index) => getSingleCardData(widgetContext, content, index));
      break;
    }
    case WidgetTypes.LIST_WIDGET: {
      const listContentLimit = features.widgets.listWidget.contentLimit();
      // only showing the first x items set in the features
      result = contents
        .slice(0, listContentLimit)
        .map((content, index) => getSingleCardData(widgetContext, content, index));
      break;
    }
    default:
  }
  return result.filter(cardData => !!cardData); // Returns only defined elements
};

export default getWidgetCardsData;
