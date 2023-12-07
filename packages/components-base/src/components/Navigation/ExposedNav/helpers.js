/* eslint-disable import/prefer-default-export */
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

/**
 * Tracks clicks on the exposed nav logo
 * @param {string} name the title of the page or the page category
 */
export const trackLogoContentClick = (name) => {
  NavigationTracker.track(NavigationTracker.events.click, {
    eventAction: `subnav-logo-${name}`,
  });
};
