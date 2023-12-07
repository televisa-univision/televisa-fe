import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import { waitForGtmDomReady } from '../gtmHelpers';
import Tracker from '../tealium/Tracker';
import {
  FID,
  FID_EVENT_ACTION,
  FID_START_TIME,
  NEXT_BEFORE_HYDRATION,
  NEXT_HYDRATION,
  NEXT_HYDRATION_LABEL,
  WEB_VITALS_EVENT,
  WEB_VITALS_CATEGORY,
  NEXT_HYDRATION_FID_DIFF,
  DID_HAPPEN_DURING_HYDRATION,
  DID_NOT_HAPPEN_DURING_HYDRATION,
} from '../../../constants/tracking';
import gtmConfig from '../googleTagManager/gtmConfig';

/**
 * Fires hydration event
 * @param {Object} metric - Metric from nextjs reportWebVitals hook
 */
export function fireWebVitalEvent(metric) {
  let didHappenDuringHydration = false;
  switch (metric.name) {
    case FID:
      if (isValidArray(window[gtmConfig.dataLayer])
        && getKey(window[gtmConfig.dataLayer][0], NEXT_HYDRATION_FID_DIFF)) {
        Tracker.fireEvent({
          event: WEB_VITALS_EVENT,
          event_category: WEB_VITALS_CATEGORY,
          event_action: NEXT_HYDRATION_FID_DIFF,
          /* eslint-disable-next-line  max-len */
          event_value: Number(metric.startTime) - window[gtmConfig.dataLayer][0][NEXT_HYDRATION_FID_DIFF],
          // Use a non-interaction event to avoid affecting bounce rate
          non_interaction: true,
        });
      }
      Tracker.fireEvent({
        event: WEB_VITALS_EVENT,
        event_category: WEB_VITALS_CATEGORY,
        event_action: FID_START_TIME,
        event_value: metric.startTime,
        // Use a non-interaction event to avoid affecting bounce rate
        non_interaction: true,
      });
      if (isValidArray(window[gtmConfig.dataLayer])
        && window[gtmConfig.dataLayer][0]) {
        const hydrationStart = getKey(window[gtmConfig.dataLayer][0], NEXT_BEFORE_HYDRATION);
        const hydrationEnd = getKey(window[gtmConfig.dataLayer][0], NEXT_HYDRATION_FID_DIFF);
        didHappenDuringHydration = metric.startTime >= hydrationStart
          && metric.startTime <= hydrationEnd;
      }
      Tracker.fireEvent({
        event: WEB_VITALS_EVENT,
        event_category: WEB_VITALS_CATEGORY,
        event_action: FID_EVENT_ACTION,
        event_value: metric.value,
        event_label: didHappenDuringHydration
          ? DID_HAPPEN_DURING_HYDRATION : DID_NOT_HAPPEN_DURING_HYDRATION,
        // Use a non-interaction event to avoid affecting bounce rate
        non_interaction: true,
      });
      break;
    case NEXT_HYDRATION:
      if (isValidArray(window[gtmConfig.dataLayer])) {
        /* eslint-disable-next-line  max-len */
        window[gtmConfig.dataLayer][0][NEXT_HYDRATION_FID_DIFF] = Number(metric.startTime) + Number(metric.value);
        window[gtmConfig.dataLayer][0][NEXT_BEFORE_HYDRATION] = Number(metric.startTime);
      }
      Tracker.fireEvent({
        event: WEB_VITALS_EVENT,
        event_category: WEB_VITALS_CATEGORY,
        event_action: NEXT_BEFORE_HYDRATION,
        event_value: metric.startTime,
        // Use a non-interaction event to avoid affecting bounce rate
        non_interaction: true,
      });
      Tracker.fireEvent({
        event: WEB_VITALS_EVENT,
        event_category: WEB_VITALS_CATEGORY,
        event_action: metric.name,
        event_value: metric.value,
        // Use a non-interaction event to avoid affecting bounce rate
        non_interaction: true,
      });
      break;
    default:
      break;
  }
}

/**
 * Fires hydration and FID event when GTM get sample variable ready
 * We separate this two cause perfume doesn't includes these metrics
 * and on the other hand nextjs hook doesn't have the network and device data
 * so for now we continue with the hybrid approach
 * @param {Object} metric - Metric from nextjs reportWebVitals hook
 */
export default function trackNextjsWebVitals(metric) {
  if (metric.label === NEXT_HYDRATION_LABEL && metric.name === NEXT_HYDRATION
  || metric.name === FID && metric.startTime) {
    waitForGtmDomReady().then(() => {
      fireWebVitalEvent(metric);
    });
  }
}
