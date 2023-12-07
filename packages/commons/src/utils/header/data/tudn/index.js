import contentTypes from '../../../../constants/contentTypes.json';
import genericTudnData from './generic';
import links from './links/home';

/**
 * Main/Home TUDN header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const genericNav = genericTudnData(data);

  if (data.type === contentTypes.SECTION) {
    genericNav.title = null;
  }

  return {
    ...genericNav,
    links,
    brandedNavLogoUri: '/',
  };
};
