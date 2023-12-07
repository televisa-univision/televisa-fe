import { logos } from '../../../../themes/tudn';
import { TUDN_SITE } from '../../../../constants/sites';
import genericTudnData from './generic';

/**
 * TUDN Opinion header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericTudnData(data);
  return {
    ...defaultNav,
    title: {
      logo: logos.opinion,
      name: null,
      link: '/opinion-deportes',
      site: TUDN_SITE,
    },
  };
};
