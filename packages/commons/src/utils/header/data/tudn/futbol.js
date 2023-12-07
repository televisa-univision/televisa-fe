import genericTudnData from './generic';
import links from './links/futbol';
import leagues from './leagues';
import features from '../../../../config/features';

/**
 * All /futbol header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericTudnData(data);

  const { type, uri } = data;
  let leaguesData = {};
  if (features.deportes.useLeagueTheme(uri, type)) {
    leaguesData = leagues(data);
  }

  return {
    ...defaultNav,
    links,
    ...leaguesData,
  };
};
