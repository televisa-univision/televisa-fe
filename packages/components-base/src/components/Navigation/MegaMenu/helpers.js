import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import { isValidArray, isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import {
  VIX_BANNER_PATH,
  VIX_BANNER_DOMAIN,
  VIX_SMART_BANNER_PATH,
  VIX_BANNER_FOOTER_PATH,
  VIX_SMART_BANNER_DOMAIN,
} from '@univision/fe-commons/dist/constants/vixSitesData';

const HAMBURGER_EVENT_ACTION_ID = 'hamburger';

/**
 * Enhances a single social network with tracking action
 * @param {Object} network the social network data object
 * @returns {Array | null}
 */
const enhanceNetworkWithTracking = (network) => {
  if (!isValidObject(network)) return null;

  return {
    ...network,
    // eslint-disable-next-line no-use-before-define
    onClick: () => trackNavigationClick('brand social icons', network.name),
  };
};

/**
 * Enhances network list
 * @param {Object} networks the network list
 * @returns {Array}
 */
const enhanceNetworkList = networks => networks.reduce((reducer, network) => {
  const enhancedNetwork = enhanceNetworkWithTracking(network);

  if (!enhancedNetwork) return reducer;

  return [...reducer, enhancedNetwork];
}, []);

/**
 * Tracks click on the actual header link or on children links under a header
 * @param {string} headerName name of header section
 * @param {string} linkName name of sub link
 */
export const trackNavigationClick = (headerName, linkName) => {
  const initialEventAction = `${HAMBURGER_EVENT_ACTION_ID}-${headerName}`;
  const eventAction = linkName ? `${initialEventAction}-${linkName}` : initialEventAction;

  NavigationTracker.track(NavigationTracker.events.click, {
    eventAction,
  });
};

/**
 * Adds parent name to the child link if possible
 * @param {Object} sectionData the link data for a specific section
 * @returns {Array}
 */
export const enhanceChildrenLinksWithParentInfo = (sectionData) => {
  if (!isValidObject(sectionData) || !isValidArray(sectionData.children)) return [];

  return sectionData.children.map(linkItem => ({
    ...linkItem,
    parent: sectionData.name,
  }));
};

/**
 * Adds tracking action to each social network
 * @param {Array | Object} networks social networks can come as an array of objects or as an object
 * with the name of the social network as a key and then an object with the social network data as
 * a value.
 * @returns {Array} the list of social networks with tracking action attached
 */
export const enhanceNetworksWithTracking = (networks) => {
  if (isValidArray(networks)) {
    return enhanceNetworkList(networks);
  }

  if (isValidObject(networks)) {
    const networkList = Object.keys(networks).map(networkName => networks[networkName]);

    return enhanceNetworkList(networkList);
  }

  return [];
};

/**
 * Adds tracking action to each cshild link under a section
 * @param {Object} sectionData a mega menu section data
 * @returns {Array} the list of enhanced children links
 */
export const enhanceSectionLinksWithTracking = (sectionData = {}) => {
  if (!isValidArray(sectionData.children)) return [];

  return sectionData.children.map(childLink => ({
    ...childLink,
    onClick: () => trackNavigationClick(sectionData.name, childLink.name),
  }));
};

/**
 * Adds tracking to Vix Banner or Smart Banner
 *
 * @param {boolean} isFooter - is vix banner on footer
 * @param {boolean} isSmartBanner - is it tracking for smart banner
 * @param {boolean} closeSmartBanner - click on close button
 */
export const tracksVIXLink = (
  isFooter = false,
  isSmartBanner = true,
  closeSmartBanner = false
) => {
  window.dataLayer = window.dataLayer || [];

  let event = '';
  let linkUrl = '';
  let linkDomain = '';
  const whenSmartBannerClosed = 'vix_smart_banner';

  if (isSmartBanner) {
    event = `${whenSmartBannerClosed}${closeSmartBanner ? '_discard' : ''}`;
    linkUrl = `${VIX_BANNER_DOMAIN}${VIX_SMART_BANNER_PATH}`;
    linkDomain = VIX_SMART_BANNER_DOMAIN;
  } else {
    event = isFooter ? 'vix_footer_banner' : 'vix_hamburger_menu';
    linkUrl = isFooter ? VIX_BANNER_FOOTER_PATH : VIX_BANNER_PATH;
    linkDomain = VIX_BANNER_DOMAIN;
  }

  window.dataLayer.push({
    event,
    link_text: closeSmartBanner ? 'x' : 'ViX', // Link full text
    link_domain: linkDomain, // Link domain
    link_url: linkUrl, // Link URL
    outbound: true, // Type of link click i.e., outbound
  });
};
