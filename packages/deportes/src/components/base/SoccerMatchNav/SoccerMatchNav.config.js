import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';

const summary = {
  name: localization.get('summaryGame'),
  link: `#${widgetTypes.DEPORTES_MATCH_SUMMARY}`,
  type: widgetTypes.DEPORTES_MATCH_SUMMARY,
};
const standings = {
  name: localization.get('standings'),
  link: '#DeportesGridSoccerStandings',
  type: 'DeportesGridSoccerStandings',
};
const preview = {
  name: localization.get('previewGame'),
  link: '#DeportesMatchCenterPreMatch',
  type: 'DeportesMatchCenterPreMatch',
};
const nowPlaying = {
  name: localization.get('nowPlaying'),
  link: `#${widgetTypes.DEPORTES_MATCH_SUMMARY}`,
  type: widgetTypes.DEPORTES_MATCH_SUMMARY,
};
const liveGame = {
  name: localization.get('liveGame'),
  link: '#AllVideoPlaylistVideo',
  type: 'AllVideoPlaylistVideo',
};
const stats = {
  name: localization.get('stats'),
  link: '#DeportesGridSoccerMatchStats',
  type: 'DeportesGridSoccerMatchStats',
};
const lineup = {
  name: localization.get('lineup'),
  link: `#${widgetTypes.DEPORTES_MATCH_CENTER_LINEUP}`,
  type: widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
};
const commentary = {
  name: localization.get('commentaries'),
  link: `#${widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY}`,
  type: widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY,
};
const coreNowPlaying = {
  name: localization.get('nowPlaying'),
  link: `#${widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY}`,
  type: widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY,
};
const coreSummary = {
  name: localization.get('summaryGame'),
  link: `#${widgetTypes.DEPORTES_MATCH_SUMMARY}`,
  type: widgetTypes.DEPORTES_MATCH_SUMMARY,
};

/**
 * Define navigation types
 * @param {string} type of formation
 * @returns {Object} of formation order and type
 */
export default function(type) {
  const navigations = {
    Core: [lineup, standings],
    Classic: [preview, lineup, standings],
    Performance: [preview, lineup, standings],
    CoreLiveStream: [liveGame, lineup, commentary, standings],
    CoreLive: [lineup, coreNowPlaying, standings],
    ClassicLiveStream: [liveGame, stats, lineup, commentary, standings],
    ClassicLive: [nowPlaying, stats, lineup, commentary, standings],
    PerformanceLiveStream: [liveGame, summary, commentary, stats, lineup, standings],
    PerformanceLive: [nowPlaying, commentary, stats, lineup, standings],
    CorePost: [lineup, coreSummary, standings],
    ClassicPost: [summary, stats, lineup, commentary, standings],
    PerformancePost: [summary, stats, standings, commentary, lineup],
    Special: [lineup],
    SpecialLive: [summary, lineup],
    SpecialPost: [summary, lineup],
    Basic: [preview, standings],
    BasicLiveStream: [liveGame, standings],
    BasicLive: [standings],
    BasicPost: [standings],
  };
  // Return particular navigation type if found
  if (typeof navigations[type] !== 'undefined') {
    return navigations[type];
  }
  return null;
}
