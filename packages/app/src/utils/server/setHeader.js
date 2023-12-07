/* eslint-disable no-case-declarations */
import { isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import { appConfig } from '../../config';

/**
 * Adds custom headers to the http response
 * @param {Object} responseData Response from web state
 * @param {Object} res HTTP response object
 */
export default function setHeaders(responseData, res) {
  if (res) {
    const {
      status,
      type,
      code,
      url,
    } = responseData;

    switch (type) {
      case 'redirectdata':
        // Redirect from cms data
        if (url) {
          res.writeHead(Number(code), { Location: url });
          res.end();
        }
        break;
      default:
        const contentType = getKey(responseData, 'data.page.data.type');
        const originalUrl = getKey(responseData, 'data.page.originalUrl', '');
        const ttl = getKey(responseData, 'data.page.data.ttl', '900');
        const effectiveTTL = ttl;
        const edgeControl = `!no-store, cache-maxage=${effectiveTTL}s`;
        const cacheControl = `max-age=${effectiveTTL}`;
        const isRawHTML = contentType === 'rawhtml';

        // return plain *.txt directly
        if (isRawHTML && /^.*\.txt$/.test(originalUrl)) {
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Edge-Control', edgeControl);
          res.setHeader('Cache-Control', cacheControl);
          res.end(getKey(responseData, 'data.page.data.html', ''));
        // return apple-app-site-association directly
        } else if (isRawHTML && (appConfig.appleSiteAssociationPattern.test(originalUrl)
          || appConfig.wellKnownPattern.test(originalUrl))) {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Edge-Control', edgeControl);
          res.setHeader('Cache-Control', cacheControl);
          res.end(getKey(responseData, 'data.page.data.html', ''));
        } else {
          res.statusCode = status || res.statusCode;
          // Only send this headers if not redirect
          if (isValidFunction(res.setHeader)) {
            res.setHeader('Edge-Control', edgeControl);
            res.setHeader('Cache-Control', cacheControl);
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.setHeader('X-XSS-Protection', '1; mode=block');
          }
        }
        break;
    }
  }
}
