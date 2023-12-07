import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import features from '@univision/fe-commons/dist/config/features';
import { MX, US } from '@univision/fe-commons/dist/constants/userLocation';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import { isValidFunction, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import tudnCoverage from '@univision/fe-commons/dist/constants/tudnCoverage';
import createTimer from '@univision/fe-commons/dist/utils/timer';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import { WHITE } from '@univision/fe-utilities/styled/constants';
import { getIconStatic } from '@univision/fe-icons/dist/components/IconContainer';
import soccerHelpers from '@univision/fe-deportes/dist/utils/helpers/soccerHelper';
import { getMatchHeadLineFromOpening, showVideoPlayer, getPrendeMatchHeadLine } from '@univision/fe-deportes/dist/utils/helpers';
import widgetDefinitions from '@univision/fe-deportes/dist/utils/layoutWidgets/matchCenter/soccerMatchWidgetDefinitions';
import SoccerMatchNavContext from '@univision/fe-deportes/dist/components/base/SoccerMatchNav/SoccerMatchNavContext';
import { getChannelsType } from '@univision/shared-components/dist/extractors/commonsExtractor';

import { GlobalWidget } from '../../../base/GlobalWidget';
import SoccerMatchHeader from '../SoccerMatchHeader';
import SoccerMatchContent from '../SoccerMatchContent';

import Styles from './SoccerMatchContainer.styles';

const SeparatorStyled = styled.div`${Styles.separator}`;

/**
 * Offset value for Y size to have in account the SoccerMatchHeader
 * sticky menu height + the height for the LogOutBar
 * @type {number}
 */
const WIDGET_OFFSET_Y = 150;
/**
 * How many time on seconds should fetch match status
 * @type {number}
 */
const STATUS_INTERVAL = {
  [pageCategories.SOCCER_MATCH_PRE]: 30,
  [pageCategories.SOCCER_MATCH_MID]: 90,
};

/**
 * How many time on seconds should update nav with new items
 * @type {number}
 */
const NAV_DEBOUNCE_WAIT = 2;
/**
 * Maximun match period time to extact events and ad as highlights
 * @type {number}
 */
const CUEPOINTS_MAX_PERIOD_TIME = 3;

/**
 * Valid Cuepoints to be included in highlihts
 * @type {*[]}
 */
const VALID_CUEPOINTS = [
  'game-start',
  'goal',
  'red-card',
  'yellow-red-card',
  'missed-penalty',
  'off-post',
];

/**
 * Get Match title/headline because on the description or match/teams data
 * @private
 * @param {Object} pageData - the page data from API
 * @param {Object} options - additional options/data to get match title/headline
 * @param {string} options.pageCategory - fetched page category from get status
 * @param {Object} options.coverage - league/match coverage
 * @param {Object} options.matchData - match data from sport API
 * @param {Object} options.videoSettings - video settings to check if the match have video enabled
 * @returns {string}
 */
function getMatchHeadline(pageData, {
  pageCategory,
  coverage,
  matchData,
  videoSettings,
}) {
  const { title, description } = pageData || {};
  const withVideo = videoSettings?.showVideo;
  // Way to turn on CMS title instead of hardcoded
  // if promo title is not default (equal to primaryTag)
  if (!description || description.includes(title)) {
    return getMatchHeadLineFromOpening(matchData, { withVideo, pageCategory, coverage });
  }
  return title;
}

/**
 * Get Match title/headline becaise on the description or match/teams data
 * @private
 * @param {Object[]} parseWidgets - page widget already parsed
 * @param {Object[]} widgetsData - raw widget data from API
 * @returns {string}
 */
function getMatchWidgets(parseWidgets, widgetsData) {
  const initialData = {
    widgets: [],
    openingWidget: null,
    matchData: null,
  };
  if (!isValidArray(parseWidgets) || !isValidArray(widgetsData)) {
    return initialData;
  }

  return widgetsData.reduce((result, widgetData, index) => {
    const newData = result;
    const widgetType = widgetData?.type || '';
    const key = `widget${widgetType}${index}`;
    const widgetId = widgetType || key;
    const newWidget = parseWidgets[index];

    if (widgetType === widgetTypes.DEPORTES_GRID_SOCCER_MATCH_OPENING) {
      newData.openingWidget = newWidget;
      newData.matchData = widgetData;
      return newData;
    }
    newData.widgets.push(
      <div id={widgetId} key={key} data-widget-offset={WIDGET_OFFSET_Y}>
        {newWidget}
      </div>,
    );
    return newData;
  }, initialData);
}

/**
 * Get Video settings and if it should show video player
 * for Opta matches or non opta matches if its a non opta match
 * we compared against page category, this type of match will always
 * have livestream so as long as the match is in mid event we show the video player
 * if not we check the match/page data for opta games to see if we should show the video
 * @private
 * @param {Object} pageData - the page data from API
 * @param {Object} options - additional relavant options to get video settings
 * @param {string} options.pageCategory - fetched page category from get status
 * @param {Object} options.coverage - league/match coverage
 * @param {Object} options.extraData - the extra data fetched from the sport service
 * @returns {Object}
 */
function getVideoSettings(pageData, {
  pageCategory,
  coverage,
  extraData,
  userLocation,
}) {
  const isBasic = coverage === tudnCoverage.BASIC;
  let videoSettings = isBasic
    ? widgetDefinitions(pageData)?.LivestreamVideo
    : widgetDefinitions(pageData)?.AllVideoPlaylistVideo;

  let showVideo = isValidObject(videoSettings) && showVideoPlayer(pageData);
  let soccerMatchSettings = {};
  let liveStreamSettings = {};

  const { broadcastEvent, streamId } = pageData || {};
  const isMxUser = userLocation === MX && features.deportes.isWorldCupMVP();
  const isBroadcastEvent = isValidObject(broadcastEvent) && isMxUser;

  /**
   * We should not show video in the following cases:
   * 1. Is a MX user but there's no broadcast event
   * 2. Is an US user, is opta match (valid matchId), but does not have an actual stream
   */
  if (isMxUser && !isValidObject(broadcastEvent) || (!isMxUser && !streamId)) {
    showVideo = false;
  }

  if (isBasic) {
    if (!isBroadcastEvent) {
      showVideo = showVideo && pageCategory !== pageCategories.SOCCER_MATCH_POST;
    }

    liveStreamSettings = {
      ...videoSettings?.settings?.livestream,
      streamEndTime: extraData?.mcpStreamEndTime,
      streamStartTime: extraData?.mcpStreamStartTime,
    };
    videoSettings = {
      ...videoSettings,
      settings: {
        ...videoSettings?.settings,
        livestream: liveStreamSettings,
      },
    };
  }
  if (!isBasic) {
    soccerMatchSettings = {
      ...videoSettings?.settings?.soccerMatch,
      streamEndTime: extraData?.mcpStreamEndTime,
      streamStartTime: extraData?.mcpStreamStartTime,
      gamePeriod: extraData?.periodTime,
    };
    videoSettings = {
      ...videoSettings,
      settings: {
        ...videoSettings?.settings,
        soccerMatch: soccerMatchSettings,
      },
    };
  }
  return {
    settings: videoSettings,
    showVideo,
  };
}

/**
 * Format video highlights cuepoints from commentary events
 * @param {Object} commentaryEvents - the commentary events object from play by play widget
 * @returns {Array}
 */
async function getVideoCuepoints(commentaryEvents) {
  const cueEvents = commentaryEvents;

  return cueEvents.reduce(async(resultP, event) => {
    const result = await resultP;
    if (!isValidObject(event) || event.period > CUEPOINTS_MAX_PERIOD_TIME
      || !VALID_CUEPOINTS.includes(event.title)) {
      return result;
    }
    const icon = await getIconStatic(event.iconName, {
      size: 'small',
      stroke: WHITE,
    });
    result.push({
      icon,
      period: event.period,
      seconds: parseInt(event.sort, 10) * 60,
      actionId: event.key?.replace(/\D/g, ''),
    });
    return result;
  }, []);
}

/**
 * Soccer Match container for add custom logic around match state
 * and custom widget parsing
 * @public
 * @param {Object} props - component react props
 * @param {Object} props.commentaryEvents - the commentary events for video highlights cuepoints
 * @param {string} props.device - the current device
 * @param {Function} props.getStatus - to get current match status from API
 * @param {string} props.pageCategory - current page category that change
 * depending of the match state
 * @param {Object} props.pageData - page data from API/state
 * @param {string} props.pageData.title - page title default to show
 * @param {string} props.pageData.description - match text description
 * @param {number} props.pageData.matchId - opta match/event ID from API
 * @param {Object[]} props.pageData.widgets - page widget list for current state/game
 * @param {Object[]} props.pageData.globalWidgets - page global widget list
 * @param {Object[]} props.pageData.vixMxExternalLink - MX Link to PrendCTA banner
 * @param {Object[]} props.pageData.vixUsExternalLink - US Link to PrendCTA banner
 * @param {Object[]} props.parseWidgets - widget page already parsed
 * @param {Object} props.theme - the current theme
 * @param {Object} props.userLocation - current users location
 * @returns {JSX}
 */
function SoccerMatchContainer ({
  commentaryEvents,
  device,
  getStatus,
  hideMatchCenterNav,
  language,
  pageCategory,
  pageData,
  parseWidgets,
  theme,
  userLocation,
}) {
  const {
    eventId,
    globalWidgets,
    matchId,
    mcpVideoId,
    vixMxExternalLink,
    vixUsExternalLink,
    playlist,
    prendePlaylist,
    shortTitle,
    widgets: widgetsData,
    liveStreamEnabled,
    featuredEvent,
    vixPlayerMx,
    vixPlayerUs,
  } = pageData || {};
  const { widgets, matchData, openingWidget } = getMatchWidgets(parseWidgets, widgetsData);
  const id = matchId || mcpVideoId || eventId;
  const coverage = soccerHelpers.getCoverage(pageData);
  const isMxUser = userLocation === MX;
  const externalLink = isMxUser ? vixMxExternalLink : vixUsExternalLink;
  const embedVixPlayer = isMxUser ? vixPlayerMx : vixPlayerUs;
  const videoSettings = getVideoSettings(pageData, {
    pageCategory,
    coverage,
    extraData: matchData?.extraData,
    userLocation,
  });
  const headline = getMatchHeadline(pageData, {
    pageCategory,
    coverage,
    matchData,
    videoSettings,
  });
  const prendeSubtitle = getPrendeMatchHeadLine(matchData);
  const channels = getChannelsType(pageData, isMxUser);
  const self = useRef({
    navAccumulator: {},
    navDebounce: null,
    timer: null,
  });
  const [navigationItems, setNavigationItems] = useState(self.current.navAccumulator);
  const [videoCuepoints, setVideoCuepoints] = useState([]);

  /**
   * Set navigation item from chldren widget component if the widget have data
   * and the item is not available yet, we will wait {@link NAV_DEBOUNCE_WAIT}
   * until update the state in order to avoid unncesary re-renders.
   * @param {Object} item - navigation item with the necesary information
   * such as `link`, `name` and `type`.
   */
  const setNavigationItem = (item) => {
    const { current } = self;

    if (item?.type && !current.navAccumulator[item.type]) {
      current.navAccumulator[item.type] = item;

      if (!current.navDebounce) {
        current.navDebounce = setTimeout(() => {
          current.navDebounce = null;
          setNavigationItems({
            ...navigationItems,
            ...current.navAccumulator,
          });
        }, NAV_DEBOUNCE_WAIT * 1000);
      }
    }
  };

  /**
   * Update and set video parse cuepoints
   */
  const updateVideoCuepoints = useCallback(async () => {
    if (isValidArray(commentaryEvents)) {
      const newVideoCuepoints = await getVideoCuepoints(commentaryEvents);
      setVideoCuepoints(newVideoCuepoints);
    }
  }, [setVideoCuepoints, commentaryEvents]);

  /**
   * Verify if the API call is needed and possible to get the match status,
   * if needed start a interval otherwise cancel it if is active
   */
  const maybeCallMatchStatus = useCallback(() => {
    const shouldFetchStatus = isValidFunction(getStatus)
      && pageCategory !== pageCategories.SOCCER_MATCH_POST;
    if (shouldFetchStatus) {
      getStatus();
      return;
    }
    // eslint-disable-next-line babel/no-unused-expressions
    self.current?.timer?.cancel();
  }, [pageCategory, getStatus]);

  /**
   * Start interval to refresh match status
   */
  const startMatchInterval = useCallback(() => {
    const { timer } = self.current;
    const interval = STATUS_INTERVAL[pageCategory];

    if (!timer && interval) {
      self.current.timer = createTimer(interval, maybeCallMatchStatus);
      maybeCallMatchStatus();
    }
  }, [maybeCallMatchStatus, pageCategory]);

  /**
   * Allow to dispatch actions after component mount on client
   * And cleanup on unmount
   */
  useEffect(() => {
    updateVideoCuepoints();
    startMatchInterval();
    const { current } = self;
    return function unmount() {
      // eslint-disable-next-line babel/no-unused-expressions
      current.timer?.cancel();
      clearTimeout(current.navDebounce);
      current.navDebounce = null;
      current.timer = null;
    };
  }, [startMatchInterval, updateVideoCuepoints]);

  return (
    <SoccerMatchNavContext.Provider
      value={{
        navigationItems,
        setNavigationItem: !hideMatchCenterNav && setNavigationItem,
      }}
    >
      <SoccerMatchHeader
        matchId={matchId}
        openingWidget={openingWidget}
      />
      <SeparatorStyled className="uvs-container">
        <GlobalWidget theme={theme} widgetsData={globalWidgets} />
        <SoccerMatchContent
          id={id}
          // eslint-disable-next-line react/prop-types
          section={pageData?.analyticsData?.web?.common?.section}
          channels={channels}
          device={device}
          featuredEvent={featuredEvent}
          headline={headline}
          pageCategory={pageCategory}
          language={language}
          videoCuepoints={videoCuepoints}
          videoSettings={videoSettings}
          widgets={widgets}
          widgetOffset={WIDGET_OFFSET_Y}
          theme={theme}
          externalLink={externalLink}
          playlist={playlist}
          prendeSubtitle={prendeSubtitle}
          shortTitle={shortTitle}
          prendePlaylist={prendePlaylist}
          liveStreamEnabled={liveStreamEnabled}
          embedVixPlayer={embedVixPlayer}
        />
      </SeparatorStyled>
    </SoccerMatchNavContext.Provider>
  );
}

SoccerMatchContainer.propTypes = {
  commentaryEvents: PropTypes.arrayOf(PropTypes.object),
  device: PropTypes.string,
  getStatus: PropTypes.func,
  hideMatchCenterNav: PropTypes.bool,
  language: PropTypes.string,
  parseWidgets: PropTypes.array,
  pageCategory: PropTypes.string,
  pageData: PropTypes.shape({
    eventId: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    matchId: PropTypes.number,
    globalWidgets: PropTypes.arrayOf(PropTypes.object),
    widgets: PropTypes.arrayOf(PropTypes.object),
    vixUsExternalLink: PropTypes.string,
    vixMxExternalLink: PropTypes.string,
    playlist: PropTypes.object,
    mcpVideoId: PropTypes.number,
    vixPlayerMx: PropTypes.object,
    vixPlayerUs: PropTypes.object,
  }),
  theme: PropTypes.object,
  userLocation: PropTypes.string,
};

SoccerMatchContainer.defaultProps = {
  userLocation: US,
};

export default React.memo(SoccerMatchContainer);
