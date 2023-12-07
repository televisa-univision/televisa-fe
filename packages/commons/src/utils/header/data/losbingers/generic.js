import { LOS_BINGERS_SITE } from '../../../../../dist/constants/sites';
import contentTypes from '../../../../constants/contentTypes.json';
import { LOS_BINGERS } from '../../../../constants/pageCategories';
import genericNavData from '../genericNavData';

const logo = 'https://st1.uvnimg.com/ad/04/79fd7b964dd985ca957836b45ed4/bingers-color.svg';

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
    brandedNavLogoName: LOS_BINGERS_SITE,
    title: {
      ...defaultNav.title,
      site: LOS_BINGERS,
    },
    logo: {
      src: logo,
      height: 28,
      width: 142,
      alt: `${LOS_BINGERS} logo`,
    },
  };
};
