import { logos } from '../../../../themes/tudn';
import { TUDN_SITE } from '../../../../constants/sites';
import genericTudnData from './generic';
import links from './links/tudnextra';

/**
 * TUDNXtra header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericTudnData(data);

  return {
    ...defaultNav,
    links,
    title: {
      logo: logos.tudnxtra,
      name: null,
      link: '/tudnxtra',
      site: TUDN_SITE,
    },
  };
};
