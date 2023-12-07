import Store from '../../../store/store';
import { getContentType, getTracking } from '../../../store/storeHelpers';
import { exists } from '../../helpers';

import SportsTracker from '../../tracking/tealium/sports/SportsTracker';

/**
 * Ad Tracking events per content type
 * @param {string} value to track for the ad
 */
export default function trackingAdEvents(value) {
  const contentType = getContentType(Store);
  const { title: trackingTitle } = getTracking(Store);

  if (exists(value)) {
    switch (contentType) {
      case 'soccermatch':
        SportsTracker.track(
          SportsTracker.events.ad,
          { title: trackingTitle, position: value }
        );
        break;
      default:
        break;
    }
  }
}
