import { BANDAMAX_SITE } from '../../../../../dist/constants/sites';
import contentTypes from '../../../../constants/contentTypes.json';
import { BANDAMAX } from '../../../../constants/pageCategories';
import LOGOS from '../../../../constants/televisaSitesData';
import genericNavData from '../genericNavData';

/**
 * Generic configuration to TUDN site
 * @param {Object} data - page data
 * @returns {Object}
 */
export const genericBandamaxData = (data = {}) => {
  const logo = LOGOS.bandamax;
  const defaultNav = genericNavData(data);

  if (data.type === contentTypes.SECTION) {
    defaultNav.title.link = data.uri;
  }

  return {
    ...defaultNav,
    globalNavTop: true,
    brandedNavLogoName: BANDAMAX_SITE,
    title: {
      ...defaultNav.title,
      site: BANDAMAX,
    },
    logo: {
      src: logo,
      height: 28,
      width: 142,
      alt: `${BANDAMAX} logo`,
    },
  };
};

export default genericBandamaxData;
