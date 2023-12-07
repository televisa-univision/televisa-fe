import { LAS_ESTRELLAS_SITE } from '../../../../../dist/constants/sites';
import contentTypes from '../../../../constants/contentTypes.json';
import { LAS_ESTRELLAS } from '../../../../constants/pageCategories';
import genericNavData from '../genericNavData';

const logo = 'https://st1.uvnimg.com/5b/a8/efebc6fd40b6bba631cf1d75f48a/lasestrellas-horizontal-solid.svg';

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
    brandedNavLogoName: LAS_ESTRELLAS_SITE,
    title: {
      ...defaultNav.title,
      site: LAS_ESTRELLAS,
    },
    logo: {
      src: logo,
      height: 28,
      width: 142,
      alt: `${LAS_ESTRELLAS} logo`,
    },
  };
};
