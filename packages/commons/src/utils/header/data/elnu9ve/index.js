import genericElnu9ve from './generic';
import links from './links/home';

/**
 * Main/Home Las Estrellas header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const navData = genericElnu9ve(data);
  return {
    ...navData,
    brandedNavLogoUri: '/',
    links,
  };
};
