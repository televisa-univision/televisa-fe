import { logos } from '../../../../../themes/tudn';
import { TUDN_SITE } from '../../../../../constants/sites';
import genericTudnData from '../generic';
import leagueLinks from '../links/league';

/**
 * UEFA Nations League header configuration
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
      logo: logos.nationsLeague,
      name: null,
      link: '/futbol/uefa-nations-league',
      site: TUDN_SITE,
    },
  };
};
