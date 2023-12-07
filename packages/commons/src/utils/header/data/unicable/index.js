// TODO: BEX Migration - Figure out if this file is needed.
import contentTypes from '../../../../constants/contentTypes.json';
import { genericUnicableData } from './generic';

import links from './links/home';

/**
 * Main/Home Canal 5 header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export const unicable = (data = {}) => {
  const navData = genericUnicableData(data);
  return {
    ...navData,
    brandedNavLogoUri: '/',
    links,
  };
};

export default unicable;
