import { logos } from '../../../../themes/tudn';
import { TUDN_SITE } from '../../../../constants/sites';
import genericTudnData from './generic';

/**
 * TUDNXtra header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericTudnData(data);

  return {
    ...defaultNav,
    title: {
      logo: logos.premios,
      name: null,
      link: '/premios-univision-deportes',
      site: TUDN_SITE,
    },
  };
};
