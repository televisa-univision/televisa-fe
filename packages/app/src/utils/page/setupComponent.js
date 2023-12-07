import getDeviceForRequest from '@univision/fe-commons/dist/utils/server/deviceDetector';

import HttpError from './HttpError';
import { getClientConfig } from '../../config';
import { getPage } from '../../services/webapi';

/**
 * Get Component path based on nextjs context
 * Will try to capture the slug parameter, if not then it will fallback with the paths
 * sent by nextjs
 *
 * @param {Object} ctx - nextjs context
 * @returns {string}
 */
function getPathFromContext({ query }) {
  let path;
  let componentName;

  if (query?.slug) {
    const [component, ...paths] = query.slug.split('/');
    componentName = component;
    path = paths.join('/');
  } else {
    const { paths = [] } = query;
    const [component, ...rest] = paths;
    componentName = component;
    path = rest.join('/');
  }
  return {
    path,
    componentName,
  };
}

/**
 * Parse url path to colect props
 * @param {string} path from url
 * @returns{Object} component props
 */
function getComponentProps(path) {
  const props = {};
  // path like: /component/Button/color/blue
  const subPath = path?.substr(1);
  if (subPath !== '') {
    const pathArray = subPath.split('/');
    if (pathArray.length && pathArray[2]) {
      const propArray = pathArray.slice(2);
      propArray.forEach((value, index) => {
        if (index === 0 || ((index % 2) === 0 && propArray[index + 1])) {
          props[value] = propArray[index + 1];
        }
      });
    }
  }
  return props;
}

/**
 * Sets up initial data for the amp page
 *
 * @param {Object} ctx - nextjs context
 * @param {string} siteName - site name
 * @param {string} hostName - hostname of the site
 * @returns {Object}
 */
async function setupComponent(ctx, siteName) {
  if (!ctx) {
    throw HttpError.internal('Missing page context');
  }

  const deviceDetected = getDeviceForRequest(ctx?.req) || 'mobile';
  const config = getClientConfig();

  const { path, componentName } = getPathFromContext(ctx);
  const props = getComponentProps(path);
  const requestedUrl = props.pageUri?.replace(/\./g, '/');
  const response = await getPage(requestedUrl, {
    config,
    siteName,
  });

  const pageData = response?.data?.page;
  pageData.device = deviceDetected;
  pageData.component = componentName;
  pageData.props = props;

  return { page: pageData };
}

export default setupComponent;
