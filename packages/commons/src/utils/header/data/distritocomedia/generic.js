import { DISTRITOCOMEDIA_SITE } from '../../../../constants/sites';
import genericNavData from '../genericNavData';
import * as contentTypes from '../../../../constants/contentTypes.json';
import { DISTRITO_COMEDIA } from '../../../../constants/pageCategories';
import LOGOS from '../../../../constants/televisaSitesData';

/**
 * Generic configuration to Canal 5 site
 * @param {Object} data - page data
 * @returns {Object}
*/
export const genericDistritoComediaData = (data = {}) => {
  const logo = LOGOS.distritocomedia;
  const { title } = genericNavData(data);

  return {
    activePath: data.uri,
    globalNavTop: true,
    brandedNavLogoName: DISTRITO_COMEDIA,
    vertical: DISTRITO_COMEDIA,
    type: contentTypes.SECTION,
    title: {
      ...title,
      name: DISTRITO_COMEDIA,
      site: DISTRITOCOMEDIA_SITE,
      logo,
    },
    logo: {
      src: logo,
      height: 28,
      width: 142,
      alt: `${DISTRITO_COMEDIA} logo`,
    },
  };
};

export default genericDistritoComediaData;
