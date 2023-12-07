import { TELEHIT_SITE } from '../../../../constants/sites';
import genericNavData from '../genericNavData';
import * as contentTypes from '../../../../constants/contentTypes.json';
import { TELEHIT } from '../../../../constants/pageCategories';
import LOGOS from '../../../../constants/televisaSitesData';

/**
 * Generic configuration to Canal 5 site
 * @param {Object} data - page data
 * @returns {Object}
*/
export const genericTelehitData = (data = {}) => {
  const logo = LOGOS.telehit;
  const { title } = genericNavData(data);

  return {
    activePath: data.uri,
    globalNavTop: true,
    brandedNavLogoName: TELEHIT,
    vertical: TELEHIT,
    type: contentTypes.SECTION,
    title: {
      ...title,
      name: TELEHIT,
      site: TELEHIT_SITE,
      logo,
    },
    logo: {
      src: logo,
      height: 28,
      width: 142,
      alt: `${TELEHIT} logo`,
    },
  };
};

export default genericTelehitData;
