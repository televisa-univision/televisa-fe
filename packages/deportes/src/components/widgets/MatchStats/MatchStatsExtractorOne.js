import matchStatsExtractor from '@univision/shared-components/dist/extractors/matchStatsExtractor';
import teamExtractor from '@univision/shared-components/dist/extractors/teamExtractor';
import { getStatus } from '@univision/shared-components/dist/extractors/commonsExtractor';

import localization from '../../../utils/localization';

/**
 * Helper to unify the two extractors
 * @param {Object} data from api
 * @returns {Object}
 */
export default function getMatchStatsData(data) {
  const {
    general,
    distribution,
    attack,
    defence,
  } = matchStatsExtractor(data);
  const stats = [
    {
      statName: localization.get('general'),
      data: general ? general.cardData : {},
    },
    {
      statName: localization.get('distribution'),
      data: distribution ? distribution.cardData : {},
    },
    {
      statName: localization.get('attack'),
      data: attack ? attack.cardData : {},
    },
    {
      statName: localization.get('defence'),
      data: defence ? defence.cardData : {},
    },
  ];

  const { homeName, awayName } = teamExtractor(data);
  return {
    stats,
    home: homeName,
    away: awayName,
    status: getStatus(data),
  };
}
