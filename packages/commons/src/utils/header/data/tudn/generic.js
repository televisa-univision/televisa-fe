import contentTypes from '../../../../constants/contentTypes.json';
import { TUDN_SITE } from '../../../../constants/sites';
import genericNavData from '../genericNavData';

/**
 * Generic configuration to TUDN site
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericNavData(data);

  if (data.type === contentTypes.SECTION) {
    defaultNav.title.link = data.uri;
  }

  return {
    ...defaultNav,
    globalNavTop: true,
    brandedNavLogoName: 'tudn',
    title: {
      ...defaultNav.title,
      site: TUDN_SITE,
    },
  };
};
