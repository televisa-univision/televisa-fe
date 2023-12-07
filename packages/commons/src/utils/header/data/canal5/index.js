// TODO: BEX Migration - Figure out if this file is needed.
import contentTypes from '../../../../constants/contentTypes.json';
import { genericCanal5Data } from './generic';

import links from './links/home';

/**
 * Main/Home Canal 5 header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export const canal5 = (data = {}) => {
  const navData = genericCanal5Data(data);
  return {
    ...navData,
    brandedNavLogoUri: '/',
    links,
  };
};

export default canal5;
