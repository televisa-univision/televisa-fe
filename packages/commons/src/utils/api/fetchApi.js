import request, { requestServer } from './request';
import appConfig from '../../config';
import Store from '../../store/store';
import { getConfig } from '../../store/storeHelpers';
import sportsRequest from './proxyDefinition';
import fetch from '../fetch';
import { clientLevelLogging } from '../logging/clientLogging';
import { loggingLevels } from '../logging/loggingLevels';

const DAYS = 'day';
const HOURS = 'hour';
const CURRENT = 'current';

/**
 * fetch API and return `Location` instead of the entire response
 * @returns {Object} the API response
 */
export async function fetchLocationApi() {
  const prefix = getConfig(Store, 'syndicator.uri');
  const uri = `${prefix}/proxy/uncached/user-loc`;
  try {
    const response = await request({ uri });
    return response.pinfo.Location;
  } catch (err) {
    return {};
  }
}

/**
 * fetch API and return `Token` for radio player
 * @returns {string} the API response
 */
export async function fetchPlayerTokenApi() {
  const uri = 'https://streamguy.univision.com/api/v3/radio-auth/token';
  try {
    const response = await request({ uri });
    return response || {};
  } catch (err) {
    return {};
  }
}

/**
 * fetch API and return `data` instead of the entire response
 * @param   {string} id the uid reference for fetch
 * @param   {string} domain which environment to fetch from
 * @returns {Object} the API response
 */
export async function fetchAlertApi(id, domain) {
  const prefix = domain || getConfig(Store, 'syndicator.uri');
  if (id && prefix) {
    try {
      const uri = `${prefix}/web-api/alert?i=${id}`;
      const response = await request({ uri });
      return response.data;
    } catch (err) {
      return {};
    }
  }
  return {};
}

/**
 * fetch API and return `data` instead of the entire response
 * @param   {string} url the URL where is fetching
 * @param   {string} wid the widget id to retreive
 * @returns {Object} the API response
 */
export async function fetchWidgetApi(url, wid) {
  try {
    if (wid) {
      const uri = `https://syndicator.univision.com/web-api/widget?url=${url}&wid=${wid}`;
      const response = await fetch(uri);
      return response.data;
    }
  } catch (err) {
    return {};
  }
  return {};
}

/**
 * fetch API and return `data` instead of the entire response
 * @param   {string} uid the contentId id to retreive
 * @param   {string} offset offset for videos
 * @param   {string} limit limit of videos
 * @returns {Object} the API response
 */
export async function fetchPlaylistApi(uid, offset = 0, limit = 50) {
  try {
    const url = global.window?.location.origin;
    const prefix = getConfig(Store, 'syndicator.uri');
    const uri = `${prefix}/web-api/playlist?url=${url}&contentId=${uid}&offset=${offset}&limit=${limit}`;
    const response = await fetch(uri);
    return response?.data?.playlist?.videos || [];
  } catch (error) {
    clientLevelLogging({
      error,
      level: loggingLevels.error,
    });

    return [];
  }
}

/**
 * fetch API and return `data` instead of the entire response
 * @param   {string} url the URL to fetch
 * @param   {string} env which environment to fetch from
 * @returns {Object}     the API response
 */
export default async function fetchApi({ url, env }) {
  const domains = {
    performance: 'syndicator.performance.univision.com',
    uat: 'uat2.x.univision.com',
    uat2: 'uat2.x.univision.com',
    prod: 'syndicator.univision.com',
  };

  const domain = domains[env] || domains.prod;
  const uri = `https://${domain}/web-api/content?url=${url}`;
  const response = await request({ uri });

  return response.data;
}

/**
 * fetch API and return `data` instead of the entire response
 * @param {(string|Object)} opts the request options or URL to fetch
 * @param {Object} headers to be passed to fetch
 * @returns {Object} the API response
 */
export function fetchSportApi(opts, headers) {
  const isClient = typeof window !== 'undefined';
  const cachedPath = '/proxy/api/cached';
  const {
    NODE_ENV,
    DEPLOY_ENV,
    CDN_URL,
  } = { ...process?.env };

  let options = {};
  let path = '';

  if (typeof opts === 'string') {
    path = opts;
    options = { headers };
  } else {
    options = { ...opts };
    path = opts.uri;
  }

  let location = options.proxyUri || ''; // Base path to client side
  if (isClient) {
    // point to another side only in local storybook
    location = window.location.host.match(/localhost:60[0-9]+/)
      ? 'https://performance.univision.com' : location;
  }
  // Just to avoid send unknown option to fetch
  delete options.proxyUri;

  if (NODE_ENV === 'production'
    && DEPLOY_ENV !== 'test'
    && CDN_URL) {
    location = CDN_URL;
  }

  if (isClient) {
    options.uri = `${location}${cachedPath}/sports${path}`;
    return request(options);
  }

  return sportsRequest({
    path,
    query: options.params,
  });
}
/**
 * fetch API for search and return the entire response
 * @param {(Object)} params the request options
 * @returns {Object} the API response
 */
export async function fetchSearchApi(params) {
  const isClient = typeof window !== 'undefined';
  const uri = getConfig(Store, 'syndicator.search');

  if (isClient) {
    return request({ uri, params });
  }

  return requestServer({ uri, qs: params });
}

/**
 * Fetch call for weather api request.
 * @param {Object} filter - data required to generated request param
 * @returns {Promise<*>}
 */
export async function fetchWeatherForecastApi(filter = {
  type: DAYS,
  value: 7,
  languageCode: 'en-US',
  zipCode: 81657,
}) {
  const isClient = typeof window !== 'undefined';
  const domain = isClient && window.location.host.match(/localhost:60[0-9]+/) ? 'http://localhost:8080' : window.location.origin;
  const cachedPath = appConfig.routes.proxy.cached;

  const option = {
    uri: `${domain}${cachedPath}/weather/${CURRENT}/${filter.languageCode}/${filter.zipCode}`,
  };

  if (filter.type === HOURS || filter.type === DAYS) {
    option.uri = `${domain}${cachedPath}/weather/${filter.value}${filter.type}/${filter.languageCode}/${filter.zipCode}`;
  }

  const response = await request(option);

  return response.data;
}
