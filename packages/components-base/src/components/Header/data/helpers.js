import Store from '@univision/fe-commons/dist/store/store';
import { getPageData, isVerticalHome } from '@univision/fe-commons/dist/store/storeHelpers';
import { hasKey, getKey } from '@univision/fe-commons/dist/utils/helpers';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
// eslint-disable-next-line
import { LAS_ESTRELLAS } from '@univision/fe-commons/src/constants/pageCategories';
import whiteLogos from './whiteLogos';
// eslint-disable-next-line import/no-cycle
import navs from '.';
// eslint-disable-next-line import/no-cycle
import genericNav from './generic';

/**
 * kind of a hacking interem solution for vertical
 * category being first for only noticias sections.
 * @param   {Array} links the original array of links
 * @param   {string} vertical to be prioritized
 * @returns {Array} the resorted array of links
 */
export function prioritizeNavColumn(links, vertical) {
  let i = 0;
  let category;
  while (i <= links.length) {
    if (links[i].name === vertical) {
      [category] = links.splice(i, 1);
      break;
    }
    i += 1;
  }
  links.unshift(category);
  return links;
}

/**
 * get vertical's navigation object using dynamic imports and promises
 * @param {Object} pageData page object
 * @param {string} pageCategory Current page category
 * @param {function} onLoad Function to call when the nav chunk is loaded
 * @param {string} profile for sports
 * @returns {Object}
 */
export function getVerticalNav(pageData = {}, pageCategory, onLoad, profile) {
  const moduleToLoad = navs[pageCategory];
  const nav = (moduleToLoad || genericNav)(pageData, pageCategory, profile);
  const isPromise = nav instanceof Promise;
  const defaultNav = genericNav();

  /**
   * Get the result object
   * @param {Object} data data
   * @returns {Object}
   */
  const getResult = (data) => {
    // merge primary/secondary links from vertical
    const links = Object.assign({}, defaultNav.links, data.links);
    return Object.assign({}, defaultNav, { ...data, links });
  };

  let result = getResult(nav);

  if (isPromise && nav) {
    result = Promise.resolve(null);
    result = nav
      .then(({ default: navFn }) => {
        if (typeof onLoad === 'function') {
          onLoad();
        }
        const data = navFn(pageData, pageCategory, profile);
        return getResult(data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-param-reassign
        error.message = `error loading navData ${pageCategory}: ${error.message}`;
        clientLogging(error);
      });
  }

  return result;
}

/**
 * get the section title
 * @param {Object} data page data
 * @returns {string} sectionTitle
 */
export function getSectionTitle(data) {
  const {
    parent,
    primaryTag,
    primaryTopic,
    shortTitle,
    type,
    title,
  } = data || {};
  let sectionTitle = title || '';
  if (type !== 'section' && (hasKey(primaryTag, 'name') || hasKey(parent, 'title'))) {
    sectionTitle = getKey(primaryTag, 'title', getKey(primaryTag, 'name', getKey(parent, 'title')));
  } else if (shortTitle) {
    sectionTitle = shortTitle;
  }
  // Check if title is not the same as vertical name
  if (sectionTitle === primaryTopic) {
    sectionTitle = '';
  }
  return sectionTitle;
}

/**
 * Get a white logo based on the section page (vertical)
 * @returns {Object}
 */
export function getWhiteLogoBySection() {
  const pageData = getPageData(Store);
  const { data, pageCategory } = pageData;
  let sectionUrl = '';
  // Use the nav data to know the current vertical section
  let navData = {};
  if (pageData.navData) {
    navData = getKey(pageData, 'navData', navData);
  } else if (navs[pageCategory]) {
    navData = navs[pageCategory](data, pageCategory);
  }
  // Get the section name based on the logoUrl
  if (hasKey(navData, 'logoUrl')) {
    const { logoUrl } = navData;
    // force pageCategory in some cases
    if (pageCategory === 'local-tv') {
      sectionUrl = pageCategory;
    } else if (pageCategory === 'horoscopos') {
      sectionUrl = 'univision';
    } else if (pageCategory === 'show' || pageCategory === 'novela' || pageCategory === 'serie') {
      sectionUrl = 'entretenimiento';
    } else if (pageCategory === 'famosos') {
      sectionUrl = 'famosos';
    } else if (data.vertical && data.vertical === 'Deportes') {
      sectionUrl = 'deportes';
    } else if (data.vertical && pageCategory === LAS_ESTRELLAS) {
      sectionUrl = LAS_ESTRELLAS;
    } else {
      sectionUrl = logoUrl === '/' ? 'univision' : navData.logoUrl.substring(1);
    }
  }
  const section = whiteLogos(data)[sectionUrl] ? sectionUrl : 'univision';
  // check if have children
  const sectionName = !isVerticalHome(Store) && navData.sectionTitle ? `${section}WithSection` : section;
  const logoDesktop = { ...whiteLogos(data)[sectionName] }.desktop || {};
  const logoMobile = { ...whiteLogos(data)[sectionName] }.mobile || {};
  return { logoDesktop, logoMobile };
}

/**
 * Checks to validate if it is a deportes/tudn site in order to switch the background
 * of the header for the corresponding section
 * @param {boolean} isTudn marks if site is from deportes/tudn
 * @param {Object} styling has the properties for background image configuration
 * @returns {Object}
 */
export function chooseBgStyle(isTudn, styling) {
  let bgStyle = {};

  if (isTudn) {
    bgStyle = {
      backgroundImage: `url(${styling.backgroundImage})`,
    };
  }
  return bgStyle;
}
