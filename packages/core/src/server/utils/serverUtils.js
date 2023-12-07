import URL from 'url';
import crypto from 'crypto';
import serverConfig from 'server/config';
import logger from 'app/utils/logging/serverLogger';
import Datadog from 'app/utils/datadog';

import { exists } from '@univision/fe-commons/dist/utils/helpers';
import { loggingLevels, getLoggingLevel } from '@univision/fe-commons/dist/utils/logging/loggingLevels';
import { urlDecode } from '@univision/fe-commons/dist/utils/logging/clientLogging';

import vanityDomains from '../assets/domains/vanity.json';

/**
 * Handles errors raised while rendering a page.
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {string} message Message to log
 * @param {Object} error JS Exception, if any
 * @param {Object} logData Object with additional data to use on log messages
 */
export function handleError(req, res, message, error, logData = {}) {
  let level = loggingLevels.error;
  let context = {
    errorType: 'SSR',
    ...logData,
    ...req.headers,
  };

  if (error?.message) {
    context.errorId = crypto.createHash('md5').update(error.message).digest('hex');
    context.stack = error.stack;
    res.header('X-Error-Id', context.errorId);
    res.header('X-Error-Message', error.message);
  }

  if (error?.context) {
    context = {
      ...context,
      ...error.context,
    };
    level = error.context?.level || level;
  }

  // Validate logging level
  level = getLoggingLevel(level);
  res.errorMessage = message;

  logger[level](message, context);
}

/**
 * Returns true if the given origin is an Univision Vanity Domain
 * @param {string} origin Current origin
 * @returns {boolean}
 */
export function isVanityDomain(origin) {
  if (typeof origin !== 'string') {
    return false;
  }
  const domain = URL.parse(origin).hostname || origin;
  return (
    typeof domain === 'string' && vanityDomains.some(vanityDomain => domain.endsWith(vanityDomain))
  );
}

/**
 * Adds custom headers to the http response
 * @param {Object} res HTTP response object
 * @param {Object} ttl TTL from API payload object
 */
export function setHeaders(res, ttl) {
  const effectiveTTL = ttl || '900';
  const edgeControl = `!no-store, cache-maxage=${effectiveTTL}s`;
  const cacheControl = `max-age=${effectiveTTL}`;
  res.setHeader('Edge-Control', edgeControl);
  res.setHeader('Cache-Control', cacheControl);
  logger.info('Adding headers to the response', { edgeControl, cacheControl });
}

/**
 * Default port the server side application listens on
 * @type {number}
 */
const PORT = serverConfig.port;

/**
 * Regular Expression for testing univision.com subdomains and local origins
 * @type {RegExp}
 */
const regDomainPattern = serverConfig.domainAllowed;

/**
 * Local development origin url
 * @type {string}
 */
const localHostURL = `localhost:${PORT}`;

const localHostStory = 'localhost:60';

const localHostURLAppV2 = 'localhost:3000';

const apiGateWayHost = 'execute-api.us-east-1.amazonaws.com';

/**
 * Determines if a given domain is allowed to communicate with this nodejs server
 * @param {string} origin Domain being tested
 * @returns {boolean}
 */
export function isDomainAllowed(origin) {
  if (
    !exists(origin)
    || regDomainPattern.test(origin)
    || origin.indexOf(localHostURL) > -1
    || origin.indexOf(localHostStory) > -1
    || origin.indexOf(localHostURLAppV2) > -1
    || process.env.BYPASS_DOMAIN_VALIDATION
    || isVanityDomain(origin)
    // Enable api gateway domain access on lower envs
    || origin.indexOf(apiGateWayHost) > -1
  ) {
    return true;
  }
  logger.error(`Domain ${origin} is not allowed!`);
  return false;
}

/**
 * Domain verifier before requesting cms
 * @param {string} url Value to be tested
 * @returns {boolean}
 */
export function isCmsValidDomain(url) {
  return (
    url
    && (
      url.indexOf('univision.com') > -1
      || url.indexOf('tudn.com') > -1
    )
  );
}

/**
 * Determines if the origin is a SSO Domain
 * @param {string} origin origin of the url
 * @returns {boolean}
 */
export function isSsoDomain(origin) {
  return serverConfig.ssoDomainAllowed.test(origin);
}

/**
 * Cors middleware options includes:
 * Function to configure cors middleware with dynamic origins
 * @type {Object}
 */
export const corsOptions = {
  origin(origin, callback) {
    if (isDomainAllowed(origin)) {
      callback(null, true);
    } else {
      const corsError = new Error(`Request from origin:${origin} not allowed by CORS`);
      logger.info(corsError);
      callback(corsError);
    }
  },
};

/**
 * Helper to consolidate all APM transaction naming
 * @param {string} type - key for transaction
 * @param {string} name - value for the transaction
 */
export function setTransactionName(type, name) {
  Datadog.addTag(type, name);
}

/**
 * Base64 decode and remove non-ascii chars.
 * @param {string} string to decode
 * @returns {string}
 */
export function decodeAndClean(string) {
  // Skip decode if no string is provided
  if (!string) {
    return null;
  }

  return Buffer.from(urlDecode(string), 'base64').toString().replace(/[^\x20-\x7E]/g, '');
}
