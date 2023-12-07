import request from './request';
import { hasKey, getKey } from '../helpers';

import Store from '../../store/store';
import { getConfig } from '../../store/storeHelpers';

/**
 * fetch API and return `data` instead of the entire response
 * @param {(string|Object)} opts the request options or URL to fetch
 * @param {Object} headers to be passed to fetch
 * @returns {Object} the API response
 */
export default function fetchSportClientApi(opts, headers) {
  let location = 'http://localhost:8080'; // Base path to server side
  let options = {};
  let path = '';

  if (typeof opts === 'string') {
    path = opts;
    options = { headers };
  } else {
    options = opts;
    path = opts.uri;
  }

  // point to another side only in local storybook
  location = window.location.host.match(/localhost:60[0-9]+/)
    ? 'https://performance.univision.com'
    : '';

  if (
    getKey(process, 'env.NODE_ENV') === 'production'
    && getConfig(Store, 'deploy.env') !== 'test'
    && hasKey(process, 'env.CDN_URL')
  ) {
    location = process.env.CDN_URL;
  }

  const cachedPath = '/proxy/api/cached';
  options.uri = `${location}${cachedPath}/sports${path}`;

  return request(options);
}
