import * as pageCategories from '../../../../constants/pageCategories';

import tudn from '.';
import generic from './generic';
import europa from './europa';
import futbol from './futbol';
import leagues from './leagues';
import mexico from './mexico';
import teams from './teams';
import soccerMatch from './soccerMatch';
import nflSuperbowl from './nflSuperbowl';
import tudnxtra from './tudnxtra';
import premiosDpts from './premiosDpts';
import opinion from './opinion';
import entrevistas from './entrevistas';
import verizon360 from './verizon360';
import soccerPerson from './soccerPerson';
import copaUnivision from './copaUnivision';

export default {
  // Default category
  [pageCategories.SPORTS]: tudn,

  // Sports
  [pageCategories.NFL_SUPER_BOWL]: nflSuperbowl,
  [pageCategories.COPA_UNIVISION]: copaUnivision,

  // Soccer sections
  [pageCategories.SOCCER_FUTBOL]: futbol,
  [pageCategories.SOCCER_FUTBOL_LIVE]: futbol,
  [pageCategories.SOCCER_FUTBOL_RESULTS]: futbol,
  [pageCategories.SOCCER_FUTBOL_STANDINGS]: futbol,
  [pageCategories.SOCCER_FUTBOL_RESULTS_STATS]: futbol,
  [pageCategories.SOCCER_LEAGUES_TOURNAMENTS]: futbol,
  [pageCategories.SOCCER_FUTBOL_EUROPA]: europa,
  [pageCategories.SOCCER_FUTBOL_SUDAMERICA]: futbol,
  [pageCategories.SOCCER_FUTBOL_CENTROAMERICA]: futbol,

  // Specific leagues
  [pageCategories.SOCCER_MEXICO_NATIONAL_TEAM]: mexico,
  [pageCategories.SOCCER_USA_NATIONAL_TEAM]: teams,

  // Additional custom categories
  [pageCategories.TUDNXTRA]: tudnxtra,
  [pageCategories.ENTREVISTAS]: entrevistas,
  [pageCategories.PREMIOS_UVN_DPTS]: premiosDpts,
  [pageCategories.OPINION]: opinion,
  [pageCategories.VIDEOS_VIRALES]: generic,
  [pageCategories.VERIZON_360]: verizon360,
  [pageCategories.SOCCER_PERSON]: soccerPerson,

  // All leagues/competitions
  [pageCategories.SOCCER_LEAGUE]: leagues,
  [pageCategories.SOCCER_COMPETITION]: leagues,
  [pageCategories.SOCCER_COMPETITION_STATS]: leagues,
  [pageCategories.SOCCER_COMPETITION_TEAMS]: leagues,
  [pageCategories.SOCCER_COMPETITION_STANDINGS]: leagues,
  [pageCategories.SOCCER_COMPETITION_RELEGATION]: leagues,
  [pageCategories.SOCCER_COMPETITION_BRACKETS]: leagues,
  [pageCategories.SOCCER_COMPETITION_RESULTS]: leagues,

  // All Soccer teams
  [pageCategories.SOCCER_TEAM]: teams,
  [pageCategories.SOCCER_TEAM_STATS]: teams,
  [pageCategories.SOCCER_TEAM_PLANTEL]: teams,
  [pageCategories.SOCCER_TEAM_RESULTS]: teams,
  [pageCategories.SOCCER_TEAM_SPECIALS]: teams,

  // Soccer match
  [pageCategories.SOCCER_MATCH_PRE]: soccerMatch,
  [pageCategories.SOCCER_MATCH_MID]: soccerMatch,
  [pageCategories.SOCCER_MATCH_POST]: soccerMatch,

  // TUDN Livestream page
  [pageCategories.SPORTS_LIVESTREAM]: tudn,

  // TUDN Section pages
  [pageCategories.SPORTS_SHOWS]: tudn,
  [pageCategories.SPORTS_VIDEOS]: tudn,
  [pageCategories.SPORTS_TEMAS]: generic,
  [pageCategories.OLYMPICS_MATCHCENTER]: tudn,
};
