import contentTypes from '../../../../constants/contentTypes.json';
import genericLasEstrellasData from './generic';

import links from './links/home';

/**
 * Main/Home Las Estrellas header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const navData = genericLasEstrellasData(data);

  if (data.type === contentTypes.SECTION) {
    navData.title = null;
  }

  return {
    ...navData,
    brandedNavLogoUri: '/',
    links,
  };
};
