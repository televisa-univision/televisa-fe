import { logos } from '../../../../../themes/tudn';
import { TUDN_SITE } from '../../../../../constants/sites';
import genericTudnData from '../generic';
import leagueLinks from '../links/league';

/**
 * Liga MX header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericTudnData(data);
  const links = leagueLinks(data, {
    overwriteCoverage: 'performancePlus',
  });

  return {
    ...defaultNav,
    links,
    title: {
      logo: logos.ligaMx,
      name: null,
      link: '/futbol/liga-mx',
      site: TUDN_SITE,
    },
  };
};
