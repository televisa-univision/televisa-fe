import { TUDN_SITE } from '../../../../../constants/sites';
import tudnCoverage from '../../../../../constants/tudnCoverage';
import genericTudnData from '../generic';
import leagueLinks from '../links/league';

/**
 * Liga de Expansión MX header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericTudnData(data);
  const links = leagueLinks(data, {
    overwriteCoverage: `${tudnCoverage.BASIC}Plus`,
  });

  return {
    ...defaultNav,
    links,
    title: {
      logo: null,
      name: 'Liga de Expansión MX',
      link: '/futbol/liga-de-expansion-mx',
      site: TUDN_SITE,
    },
  };
};
