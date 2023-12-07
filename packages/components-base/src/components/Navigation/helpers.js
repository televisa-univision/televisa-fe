import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import {
  SLIDESHOW,
  SLIDESHOW_HORIZONTAL,
  ARTICLE,
} from '@univision/fe-commons/dist/constants/contentTypes.json';
import { isValidString, isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import { DARK_VARIANT, LIGHT_VARIANT } from '@univision/fe-commons/dist/utils/styled/constants';
import features from '@univision/fe-commons/dist/config/features';
import { MX } from '@univision/fe-commons/dist/constants/userLocation';

import links from './GlobalNav/data/links';
import mxLinks from './GlobalNav/data/mx/links';
import televisaLinks from './GlobalNav/data/televisaLinks';

/**
 * Global Nav link handler
 * @param {string} eventName name of the event to be tracked
 * @param {(string|Object)} target name of the menu option clicked or JS event target
 */
export default function trackClickEvent(eventName, target) {
  let menuOptionName = target;

  if (isValidObject(target) && target.getAttribute) {
    menuOptionName = target.getAttribute('data-name');
  }

  if (!isValidString(menuOptionName)) {
    return;
  }
  const eventAction = `${eventName}-${menuOptionName.toLowerCase()}`;
  const utagData = {
    eventAction,
  };

  NavigationTracker.track(NavigationTracker.events.click, utagData);
}

// TODO: add own unit tests
/**
 * Returns if the current page type is an extended/dark page theme, such as
 * Videos or HSS galleries.
 * @param {string} type Type of page from page.data.type
 * @param {string} slideshowType Vertical or Horizontal slideshow
 * @param {string} variant Light or dark variant of the content
 * @returns {Object}
 */
export function isExtendedDarkPage(type, slideshowType, variant = LIGHT_VARIANT) {
  const extendedDark = {
    isDark: DARK_VARIANT === variant,
    isExtended: true,
  };

  if (type === ARTICLE || type === SLIDESHOW) extendedDark.isExtended = false;

  if (type === SLIDESHOW && slideshowType === SLIDESHOW_HORIZONTAL) {
    extendedDark.isDark = true;
    extendedDark.isExtended = true;
  }

  return extendedDark;
}

/**
 * Cases where should not render link
 * @param {bool} isTudnSite is a TUDN page
 * @param {Object} link url object
 * @param {bool} index index in the array
 * @param {bool} link.isTudnSite is a TUDN page
 * @param {string} link.isUvnLink is a Univision page
 * @param {bool} link.isTuCiudad is a TuCiudad link
 * @param {string} link.name name of site section (shows, noticias, etc)
 * @returns {bool} true if link should be rendered
 */
export function filterLinks({
  index,
  isTudnSite,
  isTelevisaSite,
  link,
}) {
  const isUvnLink = index === 0;
  // Ignore the link that is hidden in the proxy URL
  // (/proxy/api/cached/component/Header/hideLink/text/)
  const hideLink = features.header.hideLink(link.name.toLowerCase()?.replace(/\s+/g, ''));

  // Ignore Univision link on Univision site or

  const unvLinkOnUvnSite = (!isTelevisaSite && !isTudnSite) && isUvnLink;
  return !hideLink && !unvLinkOnUvnSite;
}

/**
 * Get filtered site links
 *
 * @param {boolean} prop.isTudnSite - is tudn site flag
 * @param {boolean} prop.isTelevisaSite - is televisa site flag
 * @returns {array} site filtered links
 */
export const getSiteLinks = ({
  isTudnSite,
  isTelevisaSite,
  userLocation,
}) => {
  let linkList = [];

  if (isTelevisaSite) {
    linkList = televisaLinks;
  } else {
    linkList = isTudnSite && userLocation === MX ? mxLinks : links;
  }

  // links filtering logic
  return linkList.filter((link, index) => filterLinks({
    index,
    isTelevisaSite,
    isTudnSite,
    link,
  }));
};
