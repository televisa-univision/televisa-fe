import { SECTION_SUBNAV } from '../../../../../constants/subNavTypes';
import { getFromMapPattern, toRelativeUrl } from '../../../../helpers';
import genericTudnData from '../generic';
import leaguesMapping from './mapping';
import getLeagueLinks from '../links/league';

/**
 * Get generic league header config
 * @param {Object} data - page data
 * @returns {Object}
 */
const genericLeagueData = data => ({
  ...genericTudnData(data),
  links: getLeagueLinks(data),
  subNavType: SECTION_SUBNAV,
});

/**
 * Get leagues header config based on the URL
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const navDataFn = getFromMapPattern(
    toRelativeUrl(data.uri),
    leaguesMapping,
    genericLeagueData,
  );
  return navDataFn(data);
};
