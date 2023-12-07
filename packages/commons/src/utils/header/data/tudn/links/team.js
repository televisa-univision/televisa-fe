import toRelativeUrl from '@univision/fe-utilities/helpers/url/toRelativeUrl';

import { TUDN_SITE } from '../../../../../constants/sites';
import {
  SOCCER_TEAM_PLANTEL,
  SOCCER_TEAM_RESULTS,
  SOCCER_TEAM_STATS,
} from '../../../../../constants/pageCategories';
import tudnCoverage from '../../../../../constants/tudnCoverage';
import { getTudnCoverage } from '../../../helpers';

/**
 * Get links per team coverage type
 * @param {Object} data - initial page data
 * @returns {Object[]}
 */
export default function getTeamsLinks(data) {
  const site = TUDN_SITE;
  const coverage = getTudnCoverage(data);
  const { uri } = data || {};
  const path = toRelativeUrl(uri);
  const links = {
    [tudnCoverage.PERFORMANCE]: [
      {
        name: 'Resultados',
        link: `${path}/resultados`,
        category: SOCCER_TEAM_RESULTS,
        site,
      },
      {
        name: 'Plantel',
        link: `${path}/plantel`,
        category: SOCCER_TEAM_PLANTEL,
        site,
      },
      {
        name: 'Estadisticas',
        link: `${path}/estadisticas`,
        category: SOCCER_TEAM_STATS,
        site,
      },
    ],
    generic: [
      {
        name: 'Plantel',
        link: `${path}/plantel`,
        category: SOCCER_TEAM_PLANTEL,
        site,
      },
    ],
  };

  return links[coverage] || links.generic;
}
