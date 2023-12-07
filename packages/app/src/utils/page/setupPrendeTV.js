import getDeviceForRequest from '@univision/fe-commons/dist/utils/server/deviceDetector';
import consoleLogger from '@univision/fe-utilities/utils/consola';

import HttpError from './HttpError';
import { getClientConfig } from '../../config';
import getPage from '../../services/prendetv';
import { setNotFoundProps, shouldIgnoreRequest } from '../server/setupUtils';
import setHeaders from '../server/setHeader';

/**
 * Get api path based on the nextjs context
 * @private
 * @param {Object} ctx - page context from Next
 * @returns {Object}
 */
function getPathFromContext({ query, asPath }) {
  // proxy comes by default from the lambda and we don't use it
  // so we just exclude it
  const { paths, proxy, ...requestParams } = query || {};

  let path = paths ? `/${paths.join('/')}` : null;
  if (!path) {
    if (proxy) {
      path = `/${proxy}`;
    } else {
      const [currentPath] = asPath.split('?');

      // asPath contains the prendetv app folder. So, it being removed because
      // this path that belongs to the home page, is used by the toggle language.
      path = currentPath.replace('/prendetv', '');
    }
  }

  return { path, requestParams };
}

/**
 * Sets up initial data for the prende tv page
 *
 * @param {Object} ctx - nextjs context
 * @returns {Object}
 */
async function setupPrendeTV(ctx) {
  if (!ctx) {
    throw HttpError.internal('Missing page context');
  }
  const { req, res } = ctx;
  const { path, requestParams } = getPathFromContext(ctx);
  let device = 'mobile';
  if (req) {
    device = getDeviceForRequest(req);
  }
  const initialProps = {
    device,
    path,
    requestParams,
  };

  // if path includes invalid patterns we don't send a request to syndicator
  // instead a 404 is returned directly
  if (res && shouldIgnoreRequest(path)) {
    res.statusCode = 404;
    consoleLogger.log(`[nextjs]: Request path ignored - ${path}`);
    initialProps.error = HttpError.notFound('Invalid page');
    initialProps.page = setNotFoundProps(initialProps, path);
    return initialProps;
  }

  const config = getClientConfig();
  const response = await getPage({ path, requestParams }, config);

  let page = {};
  if (response?.data?.code) {
    page.error = response;
    res.statusCode = response.data.code;
  } else {
    page = response;
  }

  /**
   * Setup the headers for the redirect and/or the rawhtml
   */
  setHeaders({
    code: res.statusCode,
    status: res.statusCode,
    type: response?.data?.type,
    url: response?.data?.url,
    data: {
      page: {
        originalUrl: path,
        ...response,
      },
    },
  }, res);

  return {
    ...initialProps,
    page: {
      ...page,
      config,
    },
  };
}

export default setupPrendeTV;
