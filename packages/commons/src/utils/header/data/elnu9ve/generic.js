import { ELNU9VE_SITE } from '../../../../constants/sites';
import genericNavData from '../genericNavData';
import * as contentTypes from '../../../../constants/contentTypes.json';
import { ELNU9VE } from '../../../../constants/pageCategories';
import LOGOS from '../../../../constants/televisaSitesData';

const logo = LOGOS[ELNU9VE_SITE];

/**
 * Generic configuration to Las Estrellas site
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const { title } = genericNavData(data);

  return {
    activePath: data.uri,
    globalNavTop: true,
    brandedNavLogoName: ELNU9VE,
    vertical: ELNU9VE,
    type: contentTypes.SECTION,
    title: {
      ...title,
      name: ELNU9VE,
      site: ELNU9VE_SITE,
      logo,
    },
    logo: {
      src: logo,
      height: 32,
      width: 60,
      alt: `${ELNU9VE} logo`,
    },
  };
};
