import { CANAL5_SITE } from '../../../../constants/sites';
import genericNavData from '../genericNavData';
import * as contentTypes from '../../../../constants/contentTypes.json';
import { CANAL5 } from '../../../../constants/pageCategories';
import LOGOS from '../../../../constants/televisaSitesData';

/**
 * Generic configuration to Canal 5 site
 * @param {Object} data - page data
 * @returns {Object}
*/
export const genericCanal5Data = (data = {}) => {
  const logo = LOGOS.canal5;
  const { title } = genericNavData(data);

  return {
    activePath: data.uri,
    globalNavTop: true,
    brandedNavLogoName: CANAL5,
    vertical: CANAL5,
    type: contentTypes.SECTION,
    title: {
      ...title,
      name: CANAL5,
      site: CANAL5_SITE,
      logo,
    },
    logo: {
      src: logo,
      height: 28,
      width: 'auto',
      alt: `${CANAL5} logo`,
    },
  };
};

export default genericCanal5Data;
