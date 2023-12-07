import { TUDN_SITE } from '../../../../constants/sites';
import genericTudnData from './generic';
import links from './links/mexico';

/**
 * All /mexico (Selección MX) header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericTudnData(data);
  return {
    ...defaultNav,
    links,
    title: {
      name: 'Selección MX',
      link: '/futbol/mexico',
      site: TUDN_SITE,
    },
  };
};
