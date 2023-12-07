import dynamic from 'next/dynamic';

import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import types from './widgetTypes.json';

/**
 * Widgets meant to be used on deportes sections.
 * THE CHUNK NAME MUST BE "sportsWidgets"
 */
const sportsWidgets = {
  [widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_RESULTS]: {
    name: 'Deportes - Grid - Soccer Matches Results and Calendar',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "matches-ssr-cpm" */ '@univision/fe-deportes/dist/components/widgets/MatchesRebrand/MatchesFeatureConnector')),
  },
  [widgetTypes.DEPORTES_SCORE_CELLS]: {
    name: 'Deportes - Card - Soccer Match Score Cells',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "score-cells-ssr-cpm" */ '@univision/fe-deportes/dist/components/widgets/ScoreCells/ScoreCellsConnector')),
  },
  [widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS]: {
    name: 'Deportes - Grid - Soccer Standings',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "standings-ssr-cpm" */ '@univision/fe-deportes/dist/components/widgets/Standings/StandingsConnector')),
  },
  [widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_STATS]: {
    name: 'Deportes - Grid - Soccer Match Stats',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "match-stats-ssr-cpm" */ '@univision/fe-deportes/dist/components/widgets/MatchStats/MatchStatsConnector')),
  },
  [widgetTypes.DEPORTES_GRID_EXTERNAL_SCRIPT]: {
    name: 'Deportes - Grid - External Script',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "sportsWidgets-external-script" */ '@univision/fe-deportes/dist/components/widgets/ExternalScriptWrapper')),
  },
  [widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY]: {
    name: 'Deportes - Play By Play',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "play-by-play-ssr-cpm" */ '@univision/fe-deportes/dist/components/widgets/PlayByPlay/PlayByPlayConnector')),
  },
  [widgetTypes.DEPORTES_MATCH_CENTER_LINEUP]: {
    name: 'Deportes - Match Center -  Lineup',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "lineup-ssr-cpm" */ '@univision/fe-deportes/dist/components/widgets/Lineup/LineupConnector')),
  },
  [widgetTypes.DEPORTES_GRID_SOCCER_TEAMS_CRESTS]: {
    name: 'Deportes - Grid - Soccer Teams Crests',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "teams-grid-ssr-cpm" */ '@univision/fe-deportes/dist/components/widgets/TeamsGrid/TeamsGridConnector')),
  },
  [widgetTypes.DEPORTES_MATCH_CENTER_PREMATCH]: {
    name: 'Deportes - Match Center - Soccer Pre Match',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "pre-match-ssr-cpm" */ '@univision/fe-deportes/dist/components/widgets/PreMatch/PreMatchConnector')),
  },
  [widgetTypes.DEPORTES_GRID_SOCCER_MATCH_OPENING]: {
    name: 'Deportes - Soccer Match Center Opening',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "match-center-opening-ssr-cpm" */ '@univision/fe-deportes/dist/components/widgets/MatchCenterOpening/MatchCenterOpeningConnector')),
  },
  [widgetTypes.DEPORTES_MATCH_SUMMARY]: {
    name: 'Deportes - Match Summary',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "match-summary-ssr-cpm" */ '@univision/fe-deportes/dist/components/widgets/MatchSummary/MatchSummaryConnector')),
  },
  [widgetTypes.DEPORTES_MATCH_COMPARE_HEATMAP]: {
    name: 'Deportes - Compare Heatmap',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "sportsWidgets-external-script" */ '@univision/fe-deportes/dist/components/widgets/ExternalScriptWrapper')),
  },
  [widgetTypes.DEPORTES_LEAGUES_TOURNAMENTS]: {
    name: 'Deportes - Leagues and Tournaments',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "LeaguesAndTournaments-ssr-cpm" */ '@univision/fe-deportes/dist/components/widgets/LeaguesAndTournaments')),
  },
  [widgetTypes.DEPORTES_SOCCER_TEAM_SQUAD]: {
    name: 'Deportes - Team Squad',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "squad-ssr-cpm" */ '@univision/fe-deportes/dist/components/widgets/Squad/SquadConnector')),
  },
  [widgetTypes.DEPORTES_SOCCER_BRACKETS]: {
    name: 'Deportes - Brackets',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "brackets-ssr-cpm" */ '@univision/fe-deportes/dist/components/widgets/Brackets/BracketsConnector')),
  },
  [widgetTypes.DEPORTES_SOCCER_LIVE]: {
    name: 'Deportes - Envivo',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "soccer-live-ssr-cpm" */ '@univision/fe-deportes/dist/components/widgets/SoccerLive/SoccerLiveConnector')),
  },
  [widgetTypes.PRENDE_CTA]: {
    name: 'Deportes - Prende CTA',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "prende-cta-ssr-cpm" */ '@univision/fe-deportes/dist/components/widgets/PrendeCTA')),
  },
};

export default sportsWidgets;
