import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import hints from '@univision/fe-commons/dist/utils/ssr/hints';
import types from './widgetTypes.json';
// eslint-disable-next-line import/no-cycle
import { setSSRModuleHint } from '.';

/**
 * Widgets meant to be used on deportes sections.
 * THE CHUNK NAME MUST BE "sportsWidgets"
 */
const sportsWidgets = {
  [widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_RESULTS]: {
    name: 'Deportes - Grid - Soccer Matches Results and Calendar',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "sportsWidgets" */ '@univision/fe-deportes/dist/components/widgets/Matches/MatchesConnector'),
  },
  DeportesCardSoccerMatchScorecells: {
    name: 'Deportes - Card - Soccer Match Score Cells',
    type: types.card,
    loader: () => import(/* webpackChunkName: "sportsWidgets" */ '@univision/fe-deportes/dist/components/widgets/ScoreCells/ScoreCellsConnector'),
  },
  DeportesGridSoccerStandings: {
    name: 'Deportes - Grid - Soccer Standings',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "sportsWidgets" */ '@univision/fe-deportes/dist/components/widgets/Standings/StandingsConnector'),
  },
  DeportesGridSoccerMatchStats: {
    name: 'Deportes - Grid - Soccer Match Stats',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "sportsWidgets" */ '@univision/fe-deportes/dist/components/widgets/MatchStats/MatchStatsConnector'),
  },
  [widgetTypes.DEPORTES_GRID_EXTERNAL_SCRIPT]: {
    name: 'Deportes - Grid - External Script',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "sportsWidgets-external-script" */ '@univision/fe-deportes/dist/components/widgets/ExternalScriptWrapper'),
  },
  [widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY]: {
    name: 'Deportes - Play By Play',
    type: types.card,
    loader: () => import(/* webpackChunkName: "sportsWidgets" */ '@univision/fe-deportes/dist/components/widgets/PlayByPlay/PlayByPlayConnector'),
  },
  [widgetTypes.DEPORTES_MATCH_CENTER_LINEUP]: {
    name: 'Deportes - Match Center -  Lineup',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "sportsWidgets" */ '@univision/fe-deportes/dist/components/widgets/Lineup/LineupConnector'),
  },
  [widgetTypes.DEPORTES_GRID_SOCCER_TEAMS_CRESTS]: {
    name: 'Deportes - Grid - Soccer Teams Crests',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "sportsWidgets" */ '@univision/fe-deportes/dist/components/widgets/TeamsGrid/TeamsGridConnector'),
  },
  [widgetTypes.DEPORTES_MATCH_CENTER_PREMATCH]: {
    name: 'Deportes - Match Center - Soccer Pre Match',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "sportsWidgets" */ '@univision/fe-deportes/dist/components/widgets/PreMatch/PreMatchConnector'),
  },
  [widgetTypes.DEPORTES_GRID_SOCCER_MATCH_OPENING]: {
    name: 'Deportes - Soccer Match Center Opening',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "sportsWidgets" */ '@univision/fe-deportes/dist/components/widgets/MatchCenterOpening/MatchCenterOpeningConnector'),
  },
  [widgetTypes.DEPORTES_MATCH_SUMMARY]: {
    name: 'Deportes - Match Summary',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "sportsWidgets" */ '@univision/fe-deportes/dist/components/widgets/MatchSummary/MatchSummaryConnector'),
  },
  [widgetTypes.DEPORTES_MATCH_COMPARE_HEATMAP]: {
    name: 'Deportes - Compare Heatmap',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "sportsWidgets-external-script" */ '@univision/fe-deportes/dist/components/widgets/ExternalScriptWrapper'),
  },
  [widgetTypes.DEPORTES_LEAGUES_TOURNAMENTS]: {
    name: 'Deportes - Leagues and Tournaments',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "LeaguesAndTournaments" */ '@univision/fe-deportes/dist/components/widgets/LeaguesAndTournaments'),
  },
  [widgetTypes.DEPORTES_SOCCER_TEAM_SQUAD]: {
    name: 'Deportes - Team Squad',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "sportsWidgets" */ '@univision/fe-deportes/dist/components/widgets/Squad/SquadConnector'),
  },
  [widgetTypes.DEPORTES_SOCCER_BRACKETS]: {
    name: 'Deportes - Brackets',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "sportsWidgets" */ '@univision/fe-deportes/dist/components/widgets/Brackets/BracketsConnector'),
  },
  [widgetTypes.DEPORTES_SOCCER_LIVE]: {
    name: 'Deportes - Envivo',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "sportsWidgets" */ '@univision/fe-deportes/dist/components/widgets/SoccerLive/SoccerLiveConnector'),
  },
};

setSSRModuleHint(sportsWidgets, hints.sportsWidgets);
export default sportsWidgets;
