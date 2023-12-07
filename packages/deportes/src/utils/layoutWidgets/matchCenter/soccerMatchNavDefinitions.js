import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import tudnCoverage from '@univision/fe-commons/dist/constants/tudnCoverage';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';

const SUMMARY = {
  name: localization.get('summaryGame'),
  link: `#${widgetTypes.DEPORTES_MATCH_SUMMARY}`,
  type: widgetTypes.DEPORTES_MATCH_SUMMARY,
};
const STANDINGS = {
  name: localization.get('standings'),
  link: `#${widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS}`,
  type: widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
};
const PREMATCH = {
  name: localization.get('previewGame'),
  link: `#${widgetTypes.DEPORTES_MATCH_CENTER_PREMATCH}`,
  type: widgetTypes.DEPORTES_MATCH_CENTER_PREMATCH,
};
const LIVEGAME = {
  name: localization.get('liveGame'),
  link: `#${widgetTypes.ALL_VIDEO_PLAYLIST_VIDEO}`,
  type: widgetTypes.ALL_VIDEO_PLAYLIST_VIDEO,
};
const STATS = {
  name: localization.get('stats'),
  link: `#${widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_STATS}`,
  type: widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_STATS,
};
const LINEUP = {
  name: localization.get('lineup'),
  link: `#${widgetTypes.DEPORTES_MATCH_CENTER_LINEUP}`,
  type: widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
};
const COMMENTARY = {
  name: localization.get('commentaries'),
  link: `#${widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY}`,
  type: widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY,
};

const navigationsDefinition = {
  [categories.SOCCER_MATCH_PRE]: {
    Special: [
      widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
    ],
    Basic: [
      widgetTypes.DEPORTES_MATCH_CENTER_PREMATCH,
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
    ],
    Core: [
      widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
    ],
    Classic: [
      widgetTypes.DEPORTES_MATCH_CENTER_PREMATCH,
      widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
    ],
    Performance: [
      widgetTypes.DEPORTES_MATCH_CENTER_PREMATCH,
      widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
    ],
  },
  [categories.SOCCER_MATCH_MID]: {
    Special: [
      widgetTypes.DEPORTES_MATCH_SUMMARY,
      widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
    ],
    BasicLiveStream: [
      widgetTypes.ALL_VIDEO_PLAYLIST_VIDEO,
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
    ],
    Basic: [
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
    ],
    CoreLiveStream: [
      widgetTypes.ALL_VIDEO_PLAYLIST_VIDEO,
      widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
      widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY,
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
    ],
    Core: [
      widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
      widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY,
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
    ],
    ClassicLiveStream: [
      widgetTypes.ALL_VIDEO_PLAYLIST_VIDEO,
      widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_STATS,
      widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
      widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY,
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
    ],
    Classic: [
      widgetTypes.DEPORTES_MATCH_SUMMARY,
      widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_STATS,
      widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
      widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY,
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
    ],
    PerformanceLiveStream: [
      widgetTypes.ALL_VIDEO_PLAYLIST_VIDEO,
      widgetTypes.DEPORTES_MATCH_SUMMARY,
      widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY,
      widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_STATS,
      widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
    ],
    Performance: [
      widgetTypes.DEPORTES_MATCH_SUMMARY,
      widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY,
      widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_STATS,
      widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
    ],
  },
  [categories.SOCCER_MATCH_POST]: {
    Special: [
      widgetTypes.DEPORTES_MATCH_SUMMARY,
      widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
    ],
    Basic: [
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
    ],
    Core: [
      widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
      widgetTypes.DEPORTES_MATCH_SUMMARY,
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
    ],
    Classic: [
      widgetTypes.DEPORTES_MATCH_SUMMARY,
      widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_STATS,
      widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
      widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY,
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
    ],
    Performance: [
      widgetTypes.DEPORTES_MATCH_SUMMARY,
      widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_STATS,
      widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
      widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY,
      widgetTypes.DEPORTES_MATCH_CENTER_LINEUP,
    ],
  },
};

/**
 * Parse and sort soccer match navigation links by game status definition and registered by widgets
 * @param {Object} navigationItems - registered navigation items available
 * @param {Object} soccerMatchData - necessary data to create final links
 * @param {string} soccerMatchData.coverage - soccer match/league coverage
 * @param {string} soccerMatchData.pageCategory - soccer match/page category
 * @param {boolean} soccerMatchData.hasLiveStream - true if have live-stream enabled
 * @returns {Object} navigation link by status game
 */
export function getSoccerMatchNavLinks(navigationItems, {
  coverage,
  pageCategory,
  hasLiveStream,
} = {}) {
  const navigationData = { ...navigationItems };
  let layoutCoverage = coverage;
  if (!isValidObject(navigationData)) {
    return [];
  }

  if (hasLiveStream && categories.SOCCER_MATCH_MID === pageCategory) {
    layoutCoverage = `${layoutCoverage}LiveStream`;

    if (!navigationData[LIVEGAME.type]) {
      navigationData[LIVEGAME.type] = LIVEGAME;
    }
  }

  const navigationLayout = navigationsDefinition[pageCategory];
  const navigationTypes = navigationLayout?.[layoutCoverage]
        || navigationLayout?.[tudnCoverage.BASIC];

  return navigationTypes?.reduce((accu, type) => {
    const item = navigationData[type];
    if (item) {
      accu.push(item);
    }
    return accu;
  }, []);
}

export default Object.freeze({
  SUMMARY,
  STANDINGS,
  PREMATCH,
  LIVEGAME,
  STATS,
  LINEUP,
  COMMENTARY,
});
