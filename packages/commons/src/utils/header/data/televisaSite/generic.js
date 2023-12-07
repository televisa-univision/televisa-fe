import { TELEVISA_SITE } from '../../../../constants/sites';
import genericNavData from '../genericNavData';
import * as contentTypes from '../../../../constants/contentTypes.json';
import { TELEVISA } from '../../../../constants/pageCategories';

const logo = 'https://st1.uvnimg.com/e4/9a/5179580043c2b3fe6183579b7b01/televisa-horizontal-color.svg';

/**
 * Generic configuration to Televisa site
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const { title } = genericNavData(data);

  return {
    activePath: data.uri,
    globalNavTop: false,
    brandedNavLogoName: TELEVISA,
    vertical: TELEVISA,
    type: contentTypes.SECTION,
    title: {
      ...title,
      site: TELEVISA_SITE,
      logo,
    },
    logo: {
      src: logo,
      height: 28,
      width: 160,
      alt: `${TELEVISA} logo`,
    },
  };
};
