import { TUDN_SITE } from '../../../../constants/sites';
import genericTudnData from './generic';
import links from './links/europa';

/**
 * All /europa header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericTudnData(data);
  return {
    ...defaultNav,
    links,
    title: {
      name: 'Fútbol Europa',
      link: '/futbol/europa',
      site: TUDN_SITE,
    },
  };
};
