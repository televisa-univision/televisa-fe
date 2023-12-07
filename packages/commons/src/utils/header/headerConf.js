import { isValidFunction } from '../helpers';
import navs from './data';

/**
 * Retrieves the header configuration
 * @param {Object} data request page data
 * @param {string} pageCategory current page category
 * @returns {Object}
 */
export default function getHeaderConf(data, pageCategory) {
  const moduleToLoad = navs[pageCategory] || navs.genericNavData;
  let result = null;

  if (isValidFunction(moduleToLoad)) {
    /**
     * Second paremeter is optional, if a configuration needs to use
     * store helper methods (getDevice, getBrandable), this keeps the information in sync
     */
    result = moduleToLoad(data);
  }

  return result;
}
