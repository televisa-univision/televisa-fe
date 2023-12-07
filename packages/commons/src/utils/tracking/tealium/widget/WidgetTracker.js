import Store from '../../../../store/store';
import { getPageData } from '../../../../store/storeHelpers';
import { deburrToLowerCase, hasKey, isValidFunction } from '../../../helpers';

import Tracker from '../Tracker';
import { RECTANGLE, SQUARE } from '../../../../constants/cardTypes';

/**
 * Return component shape
 * @param {string} widgetType widget type
 * @returns {string}
 */
const getShape = (widgetType) => {
  switch (widgetType) {
    case 'DigitalChannelEPG':
    case 'SingleWidget':
      return RECTANGLE;
    case 'GridWidget':
      return SQUARE;
    default:
      return '';
  }
};

/**
 * Tracks widgets events
 */
class WidgetTracker extends Tracker {
  /**
   * Sets the events for this tracker
   * @constructor
   */
  constructor() {
    super({
      click: WidgetTracker.trackClick,
      engagement: WidgetTracker.trackEngagement,
      smartbanner: WidgetTracker.trackSmartBanner,
      jobSearchEngagement: WidgetTracker.trackJobSearchEngagement,
      topQuickLinks: WidgetTracker.trackTopQuickLinks,
      helpCenterEngagement: WidgetTracker.trackHelpCenterEngagement,
    });
  }

  /**
   * Tracks clicks on widgets
   * @param {Object} widgetContext Contextual data
   * @param {string} target Target for the event
   * @param {string} [contentTitle] promo content title
   * @param {string} contentType promo content type
   * @param {string} [contentUid] promo content uid
   */
  static trackClick({
    widgetContext,
    target,
    contentTitle,
    contentType,
    contentUid,
    extraData,
    eventLabel,
  }) {
    if (hasKey(widgetContext, 'type')) {
      const pageData = getPageData(Store);
      const action = pageData.data.type === 'article' ? 'article_recirc' : target;
      let utagData = {
        event: `${action}_click`,
        ...(eventLabel && { event_label: eventLabel }),
        widget_pos: widgetContext.position,
        widget_title: deburrToLowerCase(widgetContext.title),
        widget_type: deburrToLowerCase(widgetContext.name) === 'all - countdown - timer' ? 'countdown banner' : deburrToLowerCase(widgetContext.name),
      };

      if (extraData) {
        utagData = { ...utagData, ...extraData };
      }

      // Only content and content_other target gets values, anything else will send empty values.
      if (target && ['content', 'content_other', 'prendetv_cta_external'].includes(target)) {
        utagData.card_type = `${contentType}${widgetContext.position} - ${getShape(widgetContext.widgetType)}`;
        utagData.card_title = deburrToLowerCase(contentTitle) || undefined;
        utagData.card_id = contentUid || 'undefined';
      } else {
        utagData.card_type = '';
        utagData.card_title = '';
        utagData.card_id = '';
      }

      Tracker.fireEvent(utagData);
    }
  }

  /**
   * Tracks clicks on sports widgets
   * @param {Object} data - track utag data
   * @param {string} [data.target] - legacy promo engagement name
   * @param {string} data.eventName - new he promo engagement name
   * @param {Function} callback The callback when the event is sent
   */
  static trackEngagement({ type, target, eventName }, callback) {
    const utagData = {
      event: 'engagement',
      event_action: eventName || target,
    };

    if (type || target) {
      // Legacy promo values
      utagData.promo_type = type;
      utagData.promo_loc = window.location.href;
      utagData.promo_name = target;
    }

    Tracker.fireEvent(utagData);

    if (isValidFunction(callback)) {
      callback();
    }
  }

  /**
   * Tracks clicks on sports widgets
   * @param {Object} data The smart banner data to track
   * @param {Function} callback The callback when the event is sent
   */
  static trackSmartBanner(data, callback) {
    const utagData = {
      event: 'engagement_click',
      ...data,
    };

    Tracker.fireEvent(utagData);

    if (isValidFunction(callback)) {
      callback();
    }
  }

  /**
   * Tracks clicks on jobSearch widgets
   * @param {Object} data The smart banner data to track
   */
  static trackJobSearchEngagement({ view, industry, title }) {
    const event = `engagement_trabajos_${view}`;
    const engagementDetails = `${industry} - ${title}`;

    Tracker.fireEvent({
      event,
      engagement_details: engagementDetails,
    });
  }

  /**
   * Tracks top quick links widget clicks
   * @param {Object} data the widget data to track
   */
  static trackTopQuickLinks({ title }) {
    Tracker.fireEvent({
      event: 'navigation_click',
      event_action: 'topnav-header-quicklinks',
      engagement_details: deburrToLowerCase(title),
    });
  }

  /**
   * Tracks click in Help Center
   * @param {Object} data the widget data to track
   */
  static trackHelpCenterEngagement(data) {
    Tracker.fireEvent({
      event: 'content_click',
      ...data,
    });
  }
}

export default new WidgetTracker();
