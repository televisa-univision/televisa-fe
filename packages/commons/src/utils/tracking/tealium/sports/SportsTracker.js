import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';

import Tracker from '../Tracker';
import Store from '../../../../store/store';
import { getTracking } from '../../../../store/storeHelpers';
import { localTimeFormat } from '../../../helpers/dateTimeUtils';

const SCORECELL = 'scorecells';
/**
 * Tracks Sports events
 */
class SportsTracker extends Tracker {
  /**
   * Sets events for the tracker
   */
  constructor() {
    super({
      ad: SportsTracker.trackAd,
      pageView: SportsTracker.pageView,
      mvpd: SportsTracker.trackMvpd,
      match: SportsTracker.trackMatch,
      momios: SportsTracker.trackMomios,
      caliente: SportsTracker.trackCaliente,
    });
  }

  /**
   * Tracks mid view.
   * @param {Object} data - contextual data
   */
  static trackAd(data) {
    const { title = '' } = data || {};
    const eventData = {
      event: 'virtualpv_load',
      title,
    };
    Tracker.fireEvent(eventData);
  }

  /**
   * Tracks page(screen) view.
   * @param {Object} data - analytic data from sports API
   * @param {Object} options - overwrite options
   */
  static pageView(data, options) {
    const trackingData = getTracking(Store);
    const sportsAnalytics = data;
    const { weekOverwrite } = options || {};
    if (hasKey(sportsAnalytics, 'all_tags') && isValidValue(weekOverwrite)) {
      sportsAnalytics.all_tags[1] = weekOverwrite;
    }
    const eventData = {
      event: 'view_screen',
      permalink: trackingData.permalink,
      content_id: trackingData.content_id,
      ...sportsAnalytics,
    };
    Tracker.fireEvent(eventData);
  }

  /**
   * Tracks events for mvpd popups
   * @param {Object} data Additional parameters for the handler
   */
  static trackMvpd(data) {
    const {
      event, mvpdProvider,
    } = data;
    if (event && mvpdProvider) {
      const utagData = {
        event,
        mvpd_provider: mvpdProvider,
      };
      Tracker.fireEvent(utagData);
    }
  }

  /**
   * Tracks events for score cells match
   * @param {Object} props - analytic data for score cell
   * @param {Object} [props.data] - the card data from score cell
   * @param {string} [props.type] - the type of widget to track for
   * @param {Function} callback The callback when the event is sent
   */
  static trackMatch({ data, type = SCORECELL }, callback) {
    const today = localTimeFormat(new Date().getTime());
    if (isValidObject(data)) {
      const { key, eventName, status } = data;
      const utagData = {
        card_id: key,
        card_title: eventName,
        card_type: `${type}-${status}`,
        widget_title: `${type}-${today.year}-${today.month.abbreviatedMonth}-${today.day}`,
        widget_type: `${type} widget`,
        widget_pos: '0',
        event: 'content_click',
      };
      Tracker.fireEvent(utagData);
    }
    if (isValidFunction(callback)) {
      callback();
    }
  }

  /**
   * Tracks scorecell MX users
   * @param {Object} data - analytic data
   */
  static trackMomios(data) {
    if (isValidObject(data)) {
      const { key, title } = data;

      const utagData = {
        card_id: key,
        card_title: title,
        event: 'scorecell_momios_click',
      };

      Tracker.fireEvent(utagData);
    }
  }

  /**
   * Tracks caliente cta clicks
   * @param {Object} data - analytic data
   */
  static trackCaliente(data) {
    if (isValidObject(data)) {
      const { key, title } = data;

      const utagData = {
        card_id: key,
        card_title: title,
        event: 'scorecell_banner_click',
      };

      Tracker.fireEvent(utagData);
    }
  }
}

export default new SportsTracker();
