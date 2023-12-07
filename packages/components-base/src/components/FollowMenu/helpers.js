/* eslint-disable import/prefer-default-export */
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

/**
  * Tracks clicks on the follow us menu
  * @param {string} networkName name of the network that was clicked.
  */
export const trackFollowUsClick = (networkName) => {
  NavigationTracker.track(NavigationTracker.events.click, {
    eventAction: `topnav-header-brand social icons-${networkName}`,
  });
};
