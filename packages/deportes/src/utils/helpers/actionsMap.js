import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import { addWidgets } from '@univision/fe-commons/dist/store/actions/page-actions';
import getScheduleEvent from '@univision/fe-commons/dist/store/actions/deportes/scheduleResults-actions';
import getMatches from '@univision/fe-commons/dist/store/actions/deportes/matches-actions';
import getScoreCells from '@univision/fe-commons/dist/store/actions/deportes/scoreCell-actions';
import getStandings from '@univision/fe-commons/dist/store/actions/deportes/standings-actions';
import getTeams from '@univision/fe-commons/dist/store/actions/deportes/teamsGrid-actions';
import getStats from '@univision/fe-commons/dist/store/actions/deportes/stats-actions';
import getSquad from '@univision/fe-commons/dist/store/actions/deportes/squad-actions';
import getBrackets from '@univision/fe-commons/dist/store/actions/deportes/brackets-actions';
import getAllEvents from '@univision/fe-commons/dist/store/actions/deportes/soccerlive-actions';
import matchesExtractor from '@univision/shared-components/dist/extractors/matchesExtractor';
import matchCenterExtractor from '@univision/shared-components/dist/extractors/matchCenterExtractor';
import scoreCellsExtractor from '@univision/shared-components/dist/extractors/scoreCellsExtractor';
import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';
import teamsExtractor from '@univision/shared-components/dist/extractors/teamsExtractor';
import matchSummaryExtractor from '@univision/shared-components/dist/extractors/summaryMatchExtractor';
import preMatchExtractor from '@univision/shared-components/dist/extractors/preMatchExtractor';
import squadExtractor from '@univision/shared-components/dist/extractors/squadExtractor';
import bracketsExtractor from '@univision/shared-components/dist/extractors/bracketsExtractor';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import * as soccerPersonActions from '@univision/fe-commons/dist/store/slices/tudn/soccerPerson/soccerPersonSlice';

import addSoccerCompetitionResults from '../layoutWidgets/addSoccerCompetitionResults';
import addSoccerCompetitionPositions from '../layoutWidgets/addSoccerCompetitionPositions';
import addSoccerCompetitionTeams from '../layoutWidgets/addSoccerCompetitionTeams';
import addSoccerCompetitionTeamStats from '../layoutWidgets/addSoccerCompetitionTeamStats';
import addSoccerCompetitionRelegation from '../layoutWidgets/addSoccerCompetitionRelegation';
import addSoccerCompetitionBrackets from '../layoutWidgets/addSoccerCompetitionBrackets';
import addSoccerCompetitionTeamSquad from '../layoutWidgets/addSoccerCompetitionTeamSquad';
import addSoccerScriptWidget from '../layoutWidgets/addSoccerScriptWidget';
import addSoccerMatchWidgets from '../layoutWidgets/matchCenter/addSoccerMatchWidgets';

import addLeaguesTournamentsWidget from '../layoutWidgets/addLeaguesTournamentsWidget';

/**
 * Mapping data actions and widgets
 */
export default {
  [widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_RESULTS]: {
    action: getMatches,
    extractor: matchesExtractor,
  },
  DeportesCardSoccerMatchScorecells: {
    action: getScoreCells,
    extractor: scoreCellsExtractor,
  },
  DeportesGridSoccerStandings: {
    action: getStandings,
    extractor: standingsExtractor,
  },
  [widgetTypes.DEPORTES_GRID_SOCCER_TEAMS_CRESTS]: {
    action: getTeams,
    extractor: teamsExtractor,
  },
  [widgetTypes.DEPORTES_MATCH_CENTER_PREMATCH]: {
    action: getScheduleEvent,
    extractor: preMatchExtractor,
  },
  [widgetTypes.DEPORTES_GRID_SOCCER_MATCH_OPENING]: {
    action: getScheduleEvent,
    extractor: matchCenterExtractor,
  },
  [widgetTypes.DEPORTES_MATCH_SUMMARY]: {
    action: getStats,
    extractor: matchSummaryExtractor,
  },
  [widgetTypes.DEPORTES_SOCCER_TEAM_SQUAD]: {
    action: getSquad,
    extractor: squadExtractor,
  },
  [widgetTypes.DEPORTES_SOCCER_BRACKETS]: {
    action: getBrackets,
    extractor: bracketsExtractor,
  },
  [widgetTypes.DEPORTES_SOCCER_LIVE]: {
    action: getAllEvents,
    extractor: matchesExtractor,
  },
};

/**
 * Mapping page category and widgets list
 */
export const pageCategoryActions = {
  [categories.SOCCER_COMPETITION_RESULTS]: {
    action: data => addWidgets(addSoccerCompetitionResults(data)),
  },
  [categories.SOCCER_COMPETITION_STANDINGS]: {
    action: data => addWidgets(addSoccerCompetitionPositions(data)),
  },
  [categories.SOCCER_COMPETITION_TEAMS]: {
    action: data => addWidgets(addSoccerCompetitionTeams(data)),
  },
  [categories.SOCCER_COMPETITION_RELEGATION]: {
    action: data => addWidgets(addSoccerCompetitionRelegation(data)),
  },
  [categories.SOCCER_COMPETITION_BRACKETS]: {
    action: data => addWidgets(addSoccerCompetitionBrackets(data)),
  },
  [categories.SOCCER_TEAM_RESULTS]: {
    action: data => addWidgets(addSoccerCompetitionResults(data)),
  },
  [categories.SOCCER_TEAM_PLANTEL]: {
    action: data => addWidgets(addSoccerCompetitionTeamSquad(data, categories.SOCCER_TEAM_PLANTEL)),
  },
  [categories.SOCCER_TEAM_STATS]: {
    action: data => addWidgets(addSoccerCompetitionTeamStats(data)),
  },
  [categories.SOCCER_MATCH_PRE]: {
    action: data => addWidgets(addSoccerMatchWidgets(data, categories.SOCCER_MATCH_PRE)),
  },
  [categories.SOCCER_MATCH_MID]: {
    action: data => addWidgets(addSoccerMatchWidgets(data, categories.SOCCER_MATCH_MID)),
  },
  [categories.SOCCER_MATCH_POST]: {
    action: data => addWidgets(addSoccerMatchWidgets(data, categories.SOCCER_MATCH_POST)),
  },
  [categories.SOCCER_COMPETITION_STATS]: {
    action: data => addWidgets(addSoccerScriptWidget(data, categories.SOCCER_COMPETITION_STATS)),
  },
  [categories.SOCCER_LEAGUES_TOURNAMENTS]: {
    action: data => addWidgets(
      addLeaguesTournamentsWidget(data, categories.SOCCER_LEAGUES_TOURNAMENTS)
    ),
  },
  [categories.SOCCER_PERSON]: {
    action: (data) => {
      return async (dispatch) => {
        await dispatch(soccerPersonActions.fetchSoccerPerson({ data }));
        return dispatch(addWidgets(addSoccerCompetitionResults(data)));
      };
    },
  },
  [categories.OLYMPICS_MATCHCENTER]: {
    action: data => addWidgets(addSoccerScriptWidget(data, categories.OLYMPICS_MATCHCENTER)),
  },
};
