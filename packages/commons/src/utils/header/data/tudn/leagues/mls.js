import { logos } from '../../../../../themes/tudn';
import { TUDN_SITE } from '../../../../../constants/sites';
import tudnCoverage from '../../../../../constants/tudnCoverage';
import genericTudnData from '../generic';
import links from '../links/mls';
import getLeagueLinks from '../links/league';

/**
 * MLS header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericTudnData(data);

  return {
    ...defaultNav,
    links: [
      ...getLeagueLinks(data, {
        overwriteCoverage: tudnCoverage.PERFORMANCE,
        overwritePath: '/futbol/mls',
      }),
      ...links,
    ],
    title: {
      logo: logos.mls,
      name: null,
      link: '/futbol/mls',
      site: TUDN_SITE,
    },
  };
};
