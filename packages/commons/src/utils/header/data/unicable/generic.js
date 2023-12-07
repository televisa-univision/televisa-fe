import { UNICABLE_SITE } from '../../../../constants/sites';
import genericNavData from '../genericNavData';
import * as contentTypes from '../../../../constants/contentTypes.json';
import { UNICABLE } from '../../../../constants/pageCategories';
import LOGOS from '../../../../constants/televisaSitesData';

/**
 * Generic configuration to Canal 5 site
 * @param {Object} data - page data
 * @returns {Object}
*/
export const genericUnicableData = (data = {}) => {
  const logo = LOGOS.unicable;
  const { title } = genericNavData(data);

  return {
    activePath: data.uri,
    globalNavTop: true,
    brandedNavLogoName: UNICABLE,
    vertical: UNICABLE,
    type: contentTypes.SECTION,
    title: {
      ...title,
      name: UNICABLE,
      site: UNICABLE_SITE,
      logo,
    },
    logo: {
      src: logo,
      height: 24,
      width: 104.87,
      alt: `${UNICABLE} logo`,
    },
  };
};

export default genericUnicableData;
