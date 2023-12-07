import { getKey, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import tudnCoverage from '@univision/fe-commons/dist/constants/tudnCoverage';

export default {
  /**
   * Helper to collect coverage level
   * @deprecated use {@link deportes/src/utils/helpers/index.js}
   * @param {Object} data from api
   * @returns {string}
   */
  getCoverage(data) {
    if (!data?.matchId) {
      return tudnCoverage.BASIC;
    }
    // Special case for Copa MX
    if (
      getKey(data, 'soccerCompetitionSeason.soccerCompetition.league.id')
      === 'l.soccer.mexico.mexicocup'
    ) {
      return tudnCoverage.SPECIAL;
    }
    if (hasKey(data, 'soccerCompetitionSeason.soccerCompetition.league.coverage')) {
      return data.soccerCompetitionSeason.soccerCompetition.league.coverage;
    }
    if (hasKey(data, 'associatedLeagueCoverage')) {
      return data.associatedLeagueCoverage;
    }
    // for teams
    if (hasKey(data, 'league.coverage')) {
      return data.league.coverage;
    }
    return null;
  },

  /**
   * Helper to aviod video player to render
   * @deprecated use {@link deportes/src/utils/helpers/index.js}
   * @param {Object} data from api
   * @returns {*|string|boolean}
   */
  showVideoPlayer(data) {
    return data.liveStreamEnabled && !(this.getCoverage(data) === 'Special' && getKey(data, 'soccerMatchStatus') === 'FULL');
  },
};
