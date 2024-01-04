import toDeburr from '@univision/fe-utilities/helpers/string/toDeburr';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import Tracker from '../Tracker';

/**
 * Card tracking events
 */
class CardTracker extends Tracker {
  /**
   * Constructor method
   */
  constructor() {
    super({
      click: CardTracker.trackClick,
      reaction: CardTracker.trackReaction,
      share: CardTracker.trackShare,
    });
  }

  /**
   * Tracks clicks on cards
   * @param {string} target target for the event
   * @param {Object} trackingData Tracking data
   * @param {string} trackingData.card_type shape of the card
   * @param {string} trackingData.card_title promo title related to the card
   * @param {string} trackingData.card_id promo uid related to the card
   * @param {number} trackingData.widget_pos Widget position
   * @param {string} trackingData.widget_title Widget title
   * @param {string} trackingData.widget_type Widget type
   */
  static trackClick(target, trackingData) {
    if (isValidObject(trackingData)) {
      const isContentTarget = target
        && [
          'content',
          'content_other',
          'content_personalized',
          'prendetv_cta_external',
        ].includes(target);

      const data = {
        ...trackingData,
        event: `${target}_click`,
      };
      if (!isContentTarget) {
        data.card_id = '';
        data.card_title = '';
        delete data.reaction_count;
      }
      Tracker.fireEvent(data);
    }
  }

  /**
   * Builds the tracking data.
   * @param {Object} content Content to track
   * @param {Object} widgetContext Widget contextual data.
   * @param {Object} target target to track
   * @returns {{
   * card_type: string,
   * card_title: string,
   * card_id: string,
   * widget_pos: number,
   * widget_title: string,
   * widget_type: string,
   * }|null}
   */
  static buildTrackingData(content, widgetContext, target = 'content') {
    if (isValidObject(widgetContext)) {
      let cardType = '';
      let eventLabel = '';
      let cardUid = content?.uid;
      if (widgetContext?.metaData) {
        cardType = `${widgetContext.metaData.cardName} - ${widgetContext.metaData.cardType}`;
      }

      if (content?.cardTypeOverride) {
        cardType = content.cardTypeOverride;
      }
      if (target === 'prendetv_cta_external') {
        eventLabel = `Widget_Pos${content?.position ? content.position : ''}`;
        cardUid = content?.uidContent;
      }
      return {
        card_type: cardType,
        card_title: content?.title,
        card_id: cardUid,
        reaction_count: getKey(content, 'reactionsCount', 0),
        widget_pos: widgetContext?.position,
        widget_title: toDeburr(widgetContext?.title, { lowercase: true }),
        widget_type: toDeburr(widgetContext?.name, { lowercase: true }),
        position: content?.position || 0,
        event_label: eventLabel,
        destination_url: content?.destination_url,
      };
    }
    return null;
  }

  /**
   * Returns a onClick handler to track events.
   * @param {Object} content Content data (from widgets.contents[i])
   * @param {Object} widgetContext Widget context from widget factory
   * @param {string} target Event target
   * @returns {Function}
   */
  onClickHandler(content, widgetContext, target = 'content') {
    const trackingData = this.constructor.buildTrackingData(content, widgetContext, target);
    // if the card metadata is marked as a personalized content, then override the target
    const targetOverride = getKey(widgetContext, 'metaData.isPersonalized', false) ? 'content_personalized' : target;
    return () => {
      this.track(
        this.events.click,
        targetOverride,
        trackingData,
      );
    };
  }

  /**
   * Track reaction click event
   * @param {string} contentId - content id to be tracked
   * @param {string} reaction - reaction clicked by the user
   * @param {number} reactionCount - reaction count at the moment
   */
  static trackReaction({ contentId, reaction, reactionCount }) {
    const eventData = {
      event: 'reaction_click',
      object_content_id: contentId,
      reaction_type: reaction.toLowerCase(),
      reaction_count: reactionCount,
    };
    Tracker.fireEvent(eventData);
  }

  /**
   * Track share click event
   * @param {string} contentId - content id to be tracked
   * @param {string} contentTitle - the title of the content being shared
   * @param {string} contentType - the content type of the content being shared
   * @param {string} share - share type clicked by the user
   */
  static trackShare({
    contentId, share, contentTitle, contentType,
  }) {
    const eventData = {
      event: 'social_share',
      event_action: share?.toLowerCase(),
      share_content_id: contentId,
      share_content_title: contentTitle,
      share_content_type: contentType,
    };
    Tracker.fireEvent(eventData);
  }
}

export default new CardTracker();
