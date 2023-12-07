import { getKey, toRelativeUrl } from '@univision/fe-commons/dist/utils/helpers';
import {
  DEPORTES_DEFAULT_PATH,
  LAS_ESTRELLAS_DEFAULT_HOST,
  TUDN_DEFAULT_HOST,
  UNIVISION_DEFAULT_HOST,
  UNIVISION_SITE,
} from '@univision/fe-commons/dist/constants/sites';
import { getLanguage } from '@univision/fe-local/dist/utils/helpers';
import { VIX_SITES } from '@univision/fe-commons/dist/constants/vixSitesData';
import * as languages from '@univision/fe-utilities/localization/languages';

import { SITES_LIST } from './config';

/**
 * Returns true if it is root host (without subdomain).
 * @param {string} domain - root domain to perform the valuation
 * @param {string} host - Host to check is root
 * @access private
 * @returns {boolean}
 */
function isRootHost(domain, host) {
  const hostRegExp = new RegExp(`^${domain}`);

  return domain && hostRegExp.test(host);
}

/**
 * Returns if it's a TUDN host.
 * @param {string} reqHost - Host from request headers
 * @access public
 * @returns {boolean}
 */
export function isTudnHost(reqHost) {
  const regExp = new RegExp(TUDN_DEFAULT_HOST);
  return regExp.test(reqHost);
}

/**
 * Returns if it's a TUDN site per domain or request URL.
 * @param {string} domain - root domain to perform the valuation
 * @param {string} uri - request uri to check domain or path
 * @access public
 * @returns {boolean}
 */
export function isTudnSite(domain, uri) {
  const pathRegExp = new RegExp(`^${DEPORTES_DEFAULT_PATH}`);
  return isTudnHost(domain) || isTudnHost(uri) || pathRegExp.test(toRelativeUrl(uri));
}

/**
 * Returns if it's a Univision host.
 * @param {string} reqHost - Host from request headers
 * @access public
 * @returns {boolean}
 */
export function isUnivisionHost(reqHost) {
  const regExp = new RegExp(UNIVISION_DEFAULT_HOST);
  return regExp.test(reqHost);
}

/**
 * Returns if it's a Las Estrellas host.
 * @param {string} reqHost - Host from request headers
 * @access public
 * @returns {boolean}
 */
export function isLasEstrellasHost(reqHost) {
  const regExp = new RegExp(LAS_ESTRELLAS_DEFAULT_HOST);
  return regExp.test(reqHost);
}

/**
 * Returns Univision site host.
 * @param {string} reqHost - Host from request headers
 * @param {boolean} prioritizeHost - indicates if should take the reqHost first at all
 * @access public
 * @returns {string}
 */
export function getUnivisionHost(reqHost, prioritizeHost) {
  const { env } = process;
  const baseHost = prioritizeHost
    ? reqHost || env.CMS_API_URL || UNIVISION_DEFAULT_HOST
    : env.CMS_API_URL || reqHost || UNIVISION_DEFAULT_HOST;
  const host = baseHost.replace(/^(?:(https|http)?:\/\/)?(?:syndicator\.)?/i, '');

  return isRootHost(UNIVISION_DEFAULT_HOST, host) ? `www.${host}` : host;
}

/**
 * Returns TUDN site host.
 * @param {string} reqHost - Host from request headers
 * @access public
 * @returns {string}
 */
export function getTudnHost(reqHost) {
  const { env } = process;
  const baseHost = env.TUDN_SITE_HOST || TUDN_DEFAULT_HOST;
  const host = isTudnHost(reqHost) ? reqHost : baseHost;

  return isRootHost(TUDN_DEFAULT_HOST, host) ? `www.${host}` : host;
}

/**
 * Returns Las Estrellas site host.
 * @param {string} reqHost - Host from request headers
 * @access public
 * @returns {string}
 */
export function getLasEstrellasHost(reqHost) {
  const { env } = process;
  const baseHost = env.LAS_ESTRELLAS_SITE_HOST || LAS_ESTRELLAS_DEFAULT_HOST;
  const host = isLasEstrellasHost(reqHost) ? reqHost : baseHost;

  return isRootHost(LAS_ESTRELLAS_DEFAULT_HOST, host) ? `www.${host}` : host;
}

/**
 * Returns true if it's a provided site host.
 * @param {string} reqHost - host from request headers
 * @param {string} site - site name
 * @returns {boolean}
 */
export function isSiteHost(reqHost, site) {
  const settings = SITES_LIST[site] || SITES_LIST[UNIVISION_SITE];
  const regExp = new RegExp(settings.defaultHost);

  return regExp.test(reqHost);
}

/**
 * Returns provided site host.
 * @param {string} reqHost - host from request headers
 * @param {string} site - site name
 * @returns {string}
 */
export function getSiteHost(reqHost, site) {
  const settings = SITES_LIST[site] || SITES_LIST[UNIVISION_SITE];

  if (UNIVISION_SITE === settings?.type) {
    return getUnivisionHost(reqHost);
  }

  const host = isSiteHost(reqHost, site) ? reqHost : settings.defaultHost;

  return isRootHost(settings.defaultHost, host) ? `www.${host}` : host;
}

/**
 * Returns domain for multi-site support.
 * @param {Object} req - Express.js HTTP Request
 * @access public
 * @returns {Object}
 */
export function getSites(req) {
  const { env } = process;

  if (env.MULTI_DOMAIN_DISABLED === 'true') {
    return {
      univision: '',
      tudn: DEPORTES_DEFAULT_PATH,
    };
  }

  const headers = getKey(req, 'headers', {});
  const { host, 'X-Forwarded-Proto': xProto } = headers;
  const protocol = `${xProto || 'https'}://`;
  const sites = Object.keys(SITES_LIST).map((site) => {
    const siteHost = getSiteHost(host, site);
    return [site, `${protocol}${siteHost}`];
  });
  return Object.fromEntries(sites);
}

/**
 * Finds the site name with a provided host. Defaults to univision
 * @param {string} domain - root domain to perform the valuation
 * @param {string} uri - request uri to check domain or path
 * @returns {string}
 */
export function getSiteNameFromDomain(domain, uri) {
  // If both values are undefined, then skip the loop
  if (!domain && !uri) {
    return UNIVISION_SITE;
  }

  return Object.keys(SITES_LIST).find((site) => {
    const { defaultHost } = SITES_LIST[site];
    return domain?.includes(defaultHost) || uri?.includes(defaultHost);
  }) ?? UNIVISION_SITE;
}

/**
 * Gets page language depending on site name
 * @param {string} site - site name
 * @param {Object} data - page data
 * @returns {string}
 */
export function getSiteLanguage(site, data) {
  // If site is part of ViX sites, then send portuguese
  if (site && VIX_SITES.includes(site)) {
    return languages.PT;
  }

  // Fallback to legacy logic
  return getLanguage(data);
}
