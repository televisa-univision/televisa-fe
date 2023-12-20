import { LCDLF_SITE } from '../../../../../dist/constants/sites';
import contentTypes from '../../../../constants/contentTypes.json';
import { LCDLF } from '../../../../constants/pageCategories';
import genericNavData from '../genericNavData';

const logo = 'https://st1.uvnimg.com/02/bc/d572397f4880876b55d384bf49ef/lcdlf.png';

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
    brandedNavLogoName: LCDLF_SITE,
    title: {
      ...defaultNav.title,
      site: LCDLF,
    },
    logo: {
      src: logo,
      height: 32,
      width: 55,
      alt: `${LCDLF} logo`,
    },
  };
};
