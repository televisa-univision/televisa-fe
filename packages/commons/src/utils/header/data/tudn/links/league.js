import { TUDN_SITE } from '../../../../../constants/sites';
import {
  SOCCER_COMPETITION_RELEGATION,
  SOCCER_COMPETITION_RESULTS,
  SOCCER_COMPETITION_STANDINGS,
  SOCCER_COMPETITION_STATS,
  SOCCER_COMPETITION_TEAMS,
  SOCCER_COMPETITION_BRACKETS,
} from '../../../../../constants/pageCategories';
import tudnCoverage from '../../../../../constants/tudnCoverage';
import { toRelativeUrl } from '../../../../helpers';
import { getTudnCoverage, getBracketsSupport } from '../../../helpers';

/**
 * Get links per leagues type
 * @param {Object} data - initial page data
 * @param {Object} [opts] - additional options to get league links
 * @param {string} [opts.overwriteCoverage] - custom coverage to overwrite
 * @param {string} [opts.overwritePath] - custom URL path to overwrite
 * @returns {Object[]}
 */
export default function getLeagueLinks(data, opts) {
  const site = TUDN_SITE;
  const { overwriteCoverage, overwritePath } = { ...opts };
  const coverage = overwriteCoverage || getTudnCoverage(data);
  const hasBrackets = getBracketsSupport(data);
  const { uri } = data || {};
  const path = overwritePath || toRelativeUrl(uri);
  const standingsOrBrackets = {
    name: 'Posiciones',
    link: `${path}/posiciones`,
    category: SOCCER_COMPETITION_STANDINGS,
    site,
    ...(hasBrackets && {
      name: 'Llaves',
      link: `${path}/llaves`,
      category: SOCCER_COMPETITION_BRACKETS,
    }),
  };

  const links = {
    [tudnCoverage.PERFORMANCE]: [
      {
        name: 'Resultados',
        link: `${path}/resultados`,
        category: SOCCER_COMPETITION_RESULTS,
        site,
      },
      standingsOrBrackets,
      {
        name: 'Equipos',
        link: `${path}/equipos`,
        category: SOCCER_COMPETITION_TEAMS,
        site,
      },
      {
        name: 'Estadisticas',
        link: `${path}/estadisticas`,
        category: SOCCER_COMPETITION_STATS,
        site,
      },
    ],
    [tudnCoverage.SPECIAL]: [
      {
        name: 'Resultados',
        link: `${path}/resultados`,
        category: SOCCER_COMPETITION_RESULTS,
        site,
      },
      standingsOrBrackets,
    ],
    [tudnCoverage.BASIC]: [],
    generic: [
      {
        name: 'Resultados',
        link: `${path}/resultados`,
        category: SOCCER_COMPETITION_RESULTS,
        site,
      },
      standingsOrBrackets,
    ],
  };
  const extraLinks = {
    performancePlus: [
      ...links[tudnCoverage.PERFORMANCE],
      {
        name: 'Descenso',
        link: `${path}/descenso`,
        category: SOCCER_COMPETITION_RELEGATION,
        site,
      },
    ],
    [`${tudnCoverage.BASIC}Plus`]: [
      {
        name: 'Resultados',
        link: `${path}/resultados`,
        category: SOCCER_COMPETITION_RESULTS,
        site,
      },
      standingsOrBrackets,
    ],
  };

  return links[coverage] || extraLinks[coverage] || links.generic;
}
