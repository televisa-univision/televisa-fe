import { logos } from '../../../../../themes/tudn';
import { TUDN_SITE } from '../../../../../constants/sites';
import genericTudnData from '../generic';
import leagueLinks from '../links/league';
/**
 * Copa Oro header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericTudnData(data);
  const links = leagueLinks(data);

  return {
    ...defaultNav,
    links,
    title: {
      logo: logos.copaOro,
      name: null,
      link: '/futbol/copa-oro',
      site: TUDN_SITE,
    },
  };
};
