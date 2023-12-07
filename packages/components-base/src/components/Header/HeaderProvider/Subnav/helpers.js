/* eslint-disable import/prefer-default-export */
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';

/**
 * Returns the links for the sub navigation, grouped in "visible" and "hidden".
 * "visible" contains the links which can be placed in available max-width
 * @param   {Array} subNavLinks the links array
 * @param   {number} [maxWidth=712] max with available to place the links
 * @returns {{visible, hidden: Array}}
 */
export const getLinks = (subNavLinks, maxWidth = 712) => {
  const links = {
    visible: subNavLinks,
    hidden: [],
  };
  const device = getDevice(Store);
  let linksWidth = 0;

  if (device !== 'mobile' && device !== 'tablet' && Array.isArray(subNavLinks)) {
    links.visible = [];
    subNavLinks.forEach((link) => {
      if (link.name) {
        // Each link has a 24px padding
        linksWidth += 24;
        // Each letter has 8px
        linksWidth += 8 * link.name.length;
        if (linksWidth <= maxWidth) {
          links.visible.push(link);
        } else {
          links.hidden.push(link);
        }
      }
    });
  }

  return links;
};

/**
 * Tracks click navigation events on the branded subnav
 * @param {string} menuOptionName name of the menu option clicked on the subnav
 */
export const trackSubnavClick = (menuOptionName) => {
  const eventAction = `subnav-${menuOptionName.toLowerCase()}`;
  const utagData = {
    eventAction,
  };

  NavigationTracker.track(NavigationTracker.events.click, utagData);
};
