import {
  MULHER_SITE,
  DELICIOSO_SITE,
  TASAUDAVEL_SITE,
  ZAPPEANDO_SITE,
  TUDN_SITE,
  UNIVISION_SITE,
  LAS_ESTRELLAS_SITE,
} from '@univision/fe-commons/dist/constants/sites';
import {
  SPORTS,
  UNIVISION,
  MULHER,
  DELICIOSO,
  TASAUDAVEL,
  ZAPPEANDO,
  LAS_ESTRELLAS,
} from '@univision/fe-commons/dist/constants/pageCategories';
import archiveTypes from '@univision/fe-commons/dist/constants/archiveTypes';

import toAbsoluteUrl from '@univision/fe-utilities/helpers/url/toAbsoluteUrl';
import localization from '@univision/fe-utilities/localization';
import getHeaderConf from '@univision/fe-commons/dist/utils/header/headerConf';
import getStyledTheming from '@univision/fe-commons/dist/components/ThemeProvider/helpers';

import getArchiveContent from '../../services/archive';
import HttpError from './HttpError';
import { getClientConfig } from '../../config';
import { contentDomains } from '../../config/contentApiUrls';

// Page categories mapped to sites
const pageCategories = {
  [TUDN_SITE]: SPORTS,
  [UNIVISION_SITE]: UNIVISION,
  [LAS_ESTRELLAS_SITE]: LAS_ESTRELLAS,
  [DELICIOSO_SITE]: DELICIOSO,
  [TASAUDAVEL_SITE]: TASAUDAVEL,
  [MULHER_SITE]: MULHER,
  [ZAPPEANDO_SITE]: ZAPPEANDO,
};

// Localization keys for archive titles
const titleLocaleKeys = {
  [archiveTypes.MAIN]: 'archiveMainTitle',
  [archiveTypes.MONTH]: 'archiveMonthlyTitle',
  [archiveTypes.YEAR]: 'archiveYearlyTitle',
};

// Localization keys for archive descriptions
const descLocaleKeys = {
  [archiveTypes.MAIN]: 'archiveMainDesc',
  [archiveTypes.MONTH]: 'archiveMonthlyDesc',
  [archiveTypes.YEAR]: 'archiveYearlyDesc',
};

// Localization keys for monthly archive routes
const monthSlugs = {
  enero: 'january',
  febrero: 'february',
  marzo: 'march',
  abril: 'april',
  mayo: 'may',
  junio: 'june',
  julio: 'july',
  agosto: 'august',
  septiembre: 'september',
  octubre: 'october',
  noviembre: 'november',
  diciembre: 'december',
};

/**
 * Get archive path based on nextjs context
 * Will try to capture the slug parameter, if not then it will fallback with the paths
 * sent by nextjs
 *
 * @param {Object} ctx - nextjs context
 * @returns {string}
 */
function getPathFromContext({ query }) {
  const { paths = [] } = query;
  return query?.slug || paths.join('/');
}

/**
 * Retrieves Archive title depending on archive type requested
 * @param {Object} metadata - object containing metadata of the archive
 * @returns {string}
 */
function getArchiveTitle(metadata) {
  const { type, ...locals } = metadata;
  const localeKey = titleLocaleKeys[type];

  return localization.get(localeKey, { locals });
}

/**
 * Retrieves Archive description depending on archive type requested
 * @param {Object} metadata - object containing metadata of the archive
 * @returns {string}
 */
function getArchiveDescription(metadata) {
  const { type, ...locals } = metadata;
  const localeKey = descLocaleKeys[type];

  return localization.get(localeKey, { locals });
}

/**
 * Process path to get the api route and page number for monthly archive
 * @param {string} path page request from next.js
 * @returns {string}
 */
function processPath(path) {
  if (!path) {
    return { route: '' };
  }

  /**
   * We need to know how many parts the path has so we are certain
   * which route is being requested and avoid scenarios with invalid pages
   * which are gonna be more painful to cover in logic
   */
  const parts = path.split('/');
  const [year, monthWithPage] = parts;

  // {year}
  if (parts.length === 1) {
    return { route: year };
  }

  /**
   * {year}/{month}-{page}
   * Page value can be invalid value, but API will stil note this error anyway
   * and nothing will be shown which should be expected
  */
  if (parts.length === 2) {
    const [month, pageNumber = 1] = monthWithPage.split('-');
    const monthSlug = monthSlugs[month];

    return {
      route: `${year}/${monthSlug}/${pageNumber}`,
      pageNumber,
    };
  }

  // Send as it is when parts are > 2, API will send not found message
  return { route: path };
}

/**
 * Sets up initial data for the archive page
 *
 * @param {Object} ctx - nextjs context
 * @param {string} siteName - site name
 * @param {string} hostName - hostname of the site
 * @returns {Object}
 */
async function setupArchive(ctx, { siteName } = {}) {
  if (!ctx) {
    throw HttpError.internal('Missing page context');
  }

  const config = getClientConfig();
  const { apiEnv } = config;

  const path = getPathFromContext(ctx);
  const { route, pageNumber } = processPath(path);
  // TO-DO: 404 Error handling from the API
  const content = await getArchiveContent(route, { siteName, config });
  const { type = archiveTypes.MAIN, year, month } = content;

  // Variables used for title and description generation
  const metadata = {
    brand: localization.get(siteName),
    type,
    year,
    month: localization.get(month),
    pageNumber,
  };

  // This flag should be removed eventually
  const isTudn = siteName === TUDN_SITE;
  const pageCategory = pageCategories[siteName];

  const domain = contentDomains[siteName]
    ? contentDomains[siteName][apiEnv] : contentDomains[UNIVISION_SITE][apiEnv];

  const title = getArchiveTitle(metadata);
  const description = getArchiveDescription(metadata);
  const uri = toAbsoluteUrl(`/archivo/${path}`, domain);

  // Data required by GTM that usually comes from content API
  const analyticsData = {
    web: {
      common: {
        content_id: `archivo-${siteName}`,
        content_type: 'custom',
        platform: 'website',
        title: `archivo-${siteName}`,
        permalink: uri,
      },
    },
  };

  // TO-DO: SEO metadadata (keywords)
  const pageData = {
    analyticsData,
    uri,
    title,
    description,
    seo: {
      title,
      description,
      canonicalUrl: uri,
    },
    type: 'section',
    tagHierarchy: [{
      uri: domain,
    }],
  };

  // Later on the road we wanna get rid of pageCategory to be mandatory for these two
  const headerConf = getHeaderConf(pageData, pageCategory);
  const theme = getStyledTheming(pageCategory, pageData);

  /**
   * Mocked page state that should work as our initial state when the user loads the page
   * that calls this method, it should also return as initialProps for next js.
   * The value of this object will be sent to the SYNC_STORE redux action type on startup.
   */
  const pageState = {
    content,
    headerConf,
    page: {
      config,
      data: pageData,
      domain,
      isTudn,
      pageCategory,
      site: siteName,
      sites: {
        univision: contentDomains[UNIVISION_SITE][apiEnv],
        tudn: contentDomains[TUDN_SITE][apiEnv],
        lasestrellas: contentDomains[LAS_ESTRELLAS_SITE][apiEnv],
        mulher: contentDomains[MULHER_SITE][apiEnv],
        zappeando: contentDomains[ZAPPEANDO_SITE][apiEnv],
        tasaudavel: contentDomains[TASAUDAVEL_SITE][apiEnv],
        delicioso: contentDomains[DELICIOSO_SITE][apiEnv],
      },
      theme,
    },
    pageNumber,
  };

  return pageState;
}

export default setupArchive;
