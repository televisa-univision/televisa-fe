// TODO: BEX Migration - Figure out if this file is needed.
import contentTypes from '../../../../constants/contentTypes.json';
import { genericBandamaxData } from './generic';

import links from './links/home';

/**
 * Main/Home Bandamax header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export const bandamax = (data = {}) => {
  const navData = genericBandamaxData(data);
  return {
    ...navData,
    brandedNavLogoUri: '/',
    links,
  };
};

export default bandamax;
