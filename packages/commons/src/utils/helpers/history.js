import { createBrowserHistory, createMemoryHistory } from 'history';

import Store from '../../store/store';
import { getDomain } from '../../store/storeHelpers';
import {
  isRelativeUrl,
  isValidString,
  locationRedirect,
  toRelativeUrl,
} from '.';

/**
 * Helper with history API with additional validation to avoid insecure error
 * and redirect to another site when the domain is different
 * @private
 * @param {string} method - API history method
 * @param {string} title - title on the browser
 * @param {string} url relative or absolute URL to update history or redirect
 * @param {string} [domain] to check if the URL has the same domain, empty get it from the Store
 * @returns {void}
 */
const historyOrRedirect = (method, title, url, domain) => {
  if (!global.window || !isValidString(url)) {
    return;
  }
  const checkDomain = domain || getDomain(Store);
  const hasMethod = window.history[method];

  if (hasMethod && (isRelativeUrl(url) || url.includes(checkDomain))) {
    window.history[method]({ url, title }, title, toRelativeUrl(url));
  } else {
    locationRedirect(url)();
  }
};

/**
 * Create browser history with option for basename
 * @public
 * @param {string} basename the basename to add the url
 * @returns {Function}
 */
const createHistory = basename => (
  global.window
    // client side
    ? createBrowserHistory({ basename })
    // server side
    : createMemoryHistory()
);

/**
 * Helper to replace URL without refreshing the page or redirect if the domain is different
 * @public
 * @param {string} title - title on the browser
 * @param {string} url relative or absolute URL to replace/redirect
 * @param {string} domain to check if the URL has the same domain, empty get it from the Store
 * @returns {void}
 */
export const replaceState = (title, url, domain) => {
  historyOrRedirect('replaceState', title, url, domain);
};

/**
 * Helper to update URL without refreshing the page or redirect if the domain is different
 * @public
 * @param {string} title - title on the browser
 * @param {string} url - path/URL to be added to host or redirect
 * @param {string} domain to check if the URL has the same domain, empty get it from the Store
 */
export const pushState = (title, url, domain) => {
  historyOrRedirect('pushState', title, url, domain);
};

export const actions = {
  POP: 'POP',
  PUSH: 'PUSH',
  REPLACE: 'REPLACE',
};

export default createHistory;
