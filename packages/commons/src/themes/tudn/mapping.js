import * as pageCategories from '../../constants/pageCategories';

import tudn from '.';
import leagues from './leagues';
import nflSuperbowl from './nflSuperbowl';
import tudnxtra from './tudnxtra';
import editorial from './editorial';
import premiosDpts from './premiosDpts';
import sportsLivestream from './livestream';
import tudnDark from './tudnDark';
import verizon360 from './verizon360';
import copaUnivision from './copaUnivision';

export default {
  // Default category
  [pageCategories.SPORTS]: tudn,

  // Sports
  [pageCategories.NFL_SUPER_BOWL]: nflSuperbowl,
  [pageCategories.COPA_UNIVISION]: copaUnivision,

  // Soccer sections
  [pageCategories.SOCCER_FUTBOL]: tudn,
  [pageCategories.SOCCER_FUTBOL_LIVE]: tudn,
  [pageCategories.SOCCER_FUTBOL_RESULTS]: tudn,
  [pageCategories.SOCCER_FUTBOL_STANDINGS]: tudn,
  [pageCategories.SOCCER_FUTBOL_RESULTS_STATS]: tudn,
  [pageCategories.SOCCER_LEAGUES_TOURNAMENTS]: tudn,
  [pageCategories.SOCCER_FUTBOL_EUROPA]: tudn,
  [pageCategories.SOCCER_FUTBOL_SUDAMERICA]: tudn,
  [pageCategories.SOCCER_FUTBOL_CENTROAMERICA]: tudn,

  // Specific leagues
  [pageCategories.SOCCER_MEXICO_NATIONAL_TEAM]: tudn,
  [pageCategories.SOCCER_USA_NATIONAL_TEAM]: tudn,

  // Additional custom categories
  [pageCategories.TUDNXTRA]: tudnxtra,
  [pageCategories.ENTREVISTAS]: editorial,
  [pageCategories.PREMIOS_UVN_DPTS]: premiosDpts,
  [pageCategories.OPINION]: editorial,
  [pageCategories.VIDEOS_VIRALES]: editorial,
  [pageCategories.VERIZON_360]: verizon360,

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
  [pageCategories.SOCCER_TEAM]: tudn,
  [pageCategories.SOCCER_TEAM_STATS]: tudn,
  [pageCategories.SOCCER_TEAM_PLANTEL]: tudn,
  [pageCategories.SOCCER_TEAM_RESULTS]: tudn,
  [pageCategories.SOCCER_TEAM_SPECIALS]: tudn,

  // Soccer match
  [pageCategories.SOCCER_MATCH_PRE]: tudn,
  [pageCategories.SOCCER_MATCH_MID]: tudn,
  [pageCategories.SOCCER_MATCH_POST]: tudn,

  // TUDN Livestream page
  [pageCategories.SPORTS_LIVESTREAM]: sportsLivestream,

  // TUDN Section pages
  [pageCategories.SPORTS_SHOWS]: tudnDark,
  [pageCategories.SPORTS_VIDEOS]: tudnDark,
  [pageCategories.SPORTS_TEMAS]: tudn,
  [pageCategories.OLYMPICS_MATCHCENTER]: tudn,

  // TUDN Soccer Person pages
  [pageCategories.SOCCER_PERSON]: tudn,
};
