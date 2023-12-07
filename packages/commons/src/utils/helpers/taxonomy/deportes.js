import * as categories from '../../../constants/pageCategories';
// eslint-disable-next-line import/no-cycle
import { matchSoccerType, matchRoot, matchStatus } from './matchers/custom/soccer';
// eslint-disable-next-line import/no-cycle
import { matchPageUri, matchExactPageUri } from './matchers';

export default {
  // General category
  [categories.SPORTS_SHOWS]: [matchPageUri('/deportes/shows')],
  [categories.SPORTS_VIDEOS]: [matchPageUri('/deportes/video')],
  [categories.SPORTS_TEMAS]: [matchPageUri('/deportes/temas')],

  // Sports
  [categories.NFL_SUPER_BOWL]: [matchPageUri('/deportes/nfl/super-bowl')],

  // Soccer sections
  [categories.SOCCER_FUTBOL_LIVE]: [matchPageUri('/deportes/futbol/partidos-de-futbol-para-hoy-en-vivo')],
  [categories.SOCCER_FUTBOL_RESULTS]: [matchPageUri('/deportes/resultados'), matchPageUri('/deportes/futbol/resultados')],
  [categories.SOCCER_FUTBOL_STANDINGS]: [matchPageUri('/deportes/posiciones'), matchPageUri('/deportes/futbol/posiciones')],
  [categories.SOCCER_FUTBOL_RESULTS_STATS]: [matchPageUri('/futbol/resultados-y-estadisticas-futbol')],
  [categories.SOCCER_LEAGUES_TOURNAMENTS]: [matchPageUri('/deportes/futbol/ligas-y-torneos')],
  [categories.SOCCER_FUTBOL_EUROPA]: [matchPageUri('/deportes/futbol/europa'), matchPageUri('/deportes/mx/futbol/europa')],
  [categories.SOCCER_FUTBOL_SUDAMERICA]: [matchPageUri('/deportes/futbol/sudamerica')],
  [categories.SOCCER_FUTBOL_CENTROAMERICA]: [matchPageUri('/deportes/futbol/centroamerica')],

  // Additional custom categories
  [categories.TUDNXTRA]: [matchPageUri('/deportes/tudnxtra')],
  [categories.ENTREVISTAS]: [matchPageUri('/deportes/entrevistas')],
  [categories.PREMIOS_UVN_DPTS]: [matchPageUri('/deportes/premios-univision-deportes')],
  [categories.OPINION]: [matchPageUri('/deportes/opinion-deportes')],
  [categories.VIDEOS_VIRALES]: [matchPageUri('/deportes/videos-virales')],
  [categories.VERIZON_360]: [
    matchPageUri('/deportes/verizon-360-tudn'),
    matchPageUri('/deportes/tudn-vision'),
  ],
  [categories.OLYMPICS_MATCHCENTER]: [matchPageUri('/deportes/juegos-olimpicos/matchcenter')],

  // Specific leagues
  [categories.SOCCER_MEXICO_NATIONAL_TEAM]: [matchPageUri('/deportes/futbol/mexico')],
  [categories.SOCCER_USA_NATIONAL_TEAM]: [matchPageUri('/deportes/futbol/eeuu')],

  // All leagues/competitions
  [categories.SOCCER_LEAGUE]: [
    matchSoccerType(categories.SOCCER_COMPETITION),
    matchSoccerType(categories.SOCCER_LEAGUE),
    matchExactPageUri('/deportes/futbol/mls/perfiles'),
    matchExactPageUri('/deportes/futbol/mls/mercado-mls'),
  ],
  [categories.SOCCER_COMPETITION_RESULTS]: [
    matchSoccerType(categories.SOCCER_COMPETITION),
    matchSoccerType(categories.SOCCER_LEAGUE, categories.SOCCER_COMPETITION),
  ],
  [categories.SOCCER_COMPETITION_STANDINGS]: [
    matchSoccerType(categories.SOCCER_COMPETITION),
    matchSoccerType(categories.SOCCER_LEAGUE, categories.SOCCER_COMPETITION),
  ],
  [categories.SOCCER_COMPETITION_TEAMS]: [
    matchSoccerType(categories.SOCCER_COMPETITION),
    matchSoccerType(categories.SOCCER_LEAGUE, categories.SOCCER_COMPETITION),
  ],
  [categories.SOCCER_COMPETITION_STATS]: [
    matchSoccerType(categories.SOCCER_COMPETITION),
    matchSoccerType(categories.SOCCER_LEAGUE, categories.SOCCER_COMPETITION),
  ],
  [categories.SOCCER_COMPETITION_RELEGATION]: [
    matchSoccerType(categories.SOCCER_COMPETITION),
    matchSoccerType(categories.SOCCER_LEAGUE, categories.SOCCER_COMPETITION),
  ],
  [categories.SOCCER_COMPETITION_BRACKETS]: [
    matchSoccerType(categories.SOCCER_COMPETITION),
    matchSoccerType(categories.SOCCER_LEAGUE, categories.SOCCER_COMPETITION),
  ],

  // All Soccer teams
  [categories.SOCCER_TEAM_RESULTS]: [matchSoccerType(categories.SOCCER_TEAM)],
  [categories.SOCCER_TEAM_STATS]: [matchSoccerType(categories.SOCCER_TEAM)],
  [categories.SOCCER_TEAM_PLANTEL]: [matchSoccerType(categories.SOCCER_TEAM)],
  [categories.SOCCER_TEAM_SPECIALS]: [matchSoccerType(categories.SOCCER_TEAM)],

  // Soccer match
  [categories.SOCCER_MATCH_PRE]: [matchStatus(categories.SOCCER_MATCH)],
  [categories.SOCCER_MATCH_MID]: [matchStatus(categories.SOCCER_MATCH)],
  [categories.SOCCER_MATCH_POST]: [matchStatus(categories.SOCCER_MATCH)],

  // Overwrite/default for teams/competitions, must be before custom categories for teams/leagues
  [categories.SOCCER_COMPETITION]: [matchRoot(categories.SOCCER_COMPETITION)],
  [categories.SOCCER_TEAM]: [matchRoot(categories.SOCCER_TEAM)],
  [categories.SOCCER_PERSON]: [matchRoot(categories.SOCCER_PERSON)],

  // Must be before categories.SOCCER_FUTBOL to have preference
  [categories.SOCCER_FUTBOL]: [matchPageUri('/deportes/futbol')],

  [categories.COPA_UNIVISION]: [matchPageUri('/deportes/copa-univision')],
};
