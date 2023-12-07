/* eslint-disable babel/no-unused-expressions */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

import {
  VIDEO_TYPE_LIVESTREAM,
} from '@univision/fe-commons/dist/constants/video';
import VideoTracker from '@univision/fe-commons/dist/utils/tracking/tealium/video/VideoTracker';
import WidgetTitle from '@univision/fe-components-base/dist/components/widgets/WidgetTitle';
import {
  LIGHT_VARIANT,
  DARK_VARIANT,
} from '@univision/fe-utilities/styled/constants';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import { useInterval } from '@univision/fe-commons/dist/utils/hooks';
import { fetchPlaylistApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import PrendeCTA from '@univision/fe-deportes/dist/components/widgets/PrendeCTA';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import { getCurrentIndex } from '@univision/fe-commons/dist/utils/video';
import features from '@univision/fe-commons/dist/config/features';
import { MX } from '@univision/fe-commons/dist/constants/userLocation';

import { matchOver } from '../../player/SoccerPlayerWrapper/SdkHelpers';
import PlaylistCards from '../../playlist/PlaylistCards';
import {
  parsePlaylistItems,
  generateVideoPlayerId,
  geoFilterVideos,
} from '../../../helpers';
import { appendVideos } from '../../../helpers/events';
import VideoContent from './VideoContent';
import VideoWrapper from './VideoWrapper';
import VideoTabs from './VideoTabs';
import Styles from './VideoWithPlaylist.styles';

const VideoCardStyled = styled.div`${Styles.card}`;
const PlaylistStyled = styled.div`${Styles.playlist}`;
const PrendeCTAWrapper = styled.div`${Styles.prendeWrapper}`;
const VideoWrapperStyled = styled.div`${Styles.videoWrapper}`;
const VixStyled = { aspectRatio: '16/9' };
const REQUEST_TIME_HIGHLIGHTS = 90000;

/**
 * Check if it's an livestream playlist type,
 * could be livestream or soccerMatch
 * @param {Object} settings - widget settings from API
 * @returns {boolean} true if its a livestream playlist
 */
function isLiveStreamPlaylist(settings) {
  return isValidObject(settings?.livestream) || isValidObject(settings?.soccerMatch);
}

/**
 * Get mcpId or livestream id from content item,
 * @param {Object} content - item content from API
 * @returns {string}
 */
function getMcpIdContent(content) {
  return content?.mcpid || content?.livestreamId || content?.streamId || content?.eventId;
}

/**
 * Filter content item that only have mcpId value
 * @param {Object[]} items - content items from API
 * @returns {Object[]}
 */
function filterContents(items) {
  if (!isValidArray(items)) {
    return [];
  }

  return items.filter(item => getMcpIdContent(item));
}

/**
 * Get second tabs values from BEX settings
 * @param {Object} settings - widget settings from API
 * @returns {?Array}
 */
function getSecondTabContent(settings) {
  return settings?.otherTabs?.[0]?.content;
}

/**
 * Get available playlists from API respose.
 * Right now our design only support max two tabs
 * so we assume the second as index 0
 * if we add more tabs we should change this.
 * @param {Object[]} content - main content item from API
 * @param {Object} settings - widget settings from API
 * @param {Object[]} prendePlaylist - the prende clips
 * @param {boolean} showPrendeCTA - true if prende cta should show
 * @param {string} userLocation - true if prende cta should show
 * @returns {Object[]}
 */
function getAvailablePlaylists(content, settings, prendePlaylist, showPrendeCTA, userLocation) {
  const secondTab = getSecondTabContent(settings) || [];
  let firstTab = content;

  if (isLiveStreamPlaylist(settings) && !showPrendeCTA) {
    const stream = settings.soccerMatch || settings.livestream;
    stream.videoType = VIDEO_TYPE_LIVESTREAM;

    if (isValidArray(content)) {
      const filteredContent = geoFilterVideos(
        content,
        userLocation,
        isValidObject(settings.soccerMatch)
      );
      firstTab = [stream, ...filteredContent];
    } else {
      firstTab = [stream];
    }
  }

  if (showPrendeCTA) {
    if (isValidArray(content)) {
      firstTab = [...content];
    }
    if (isValidArray(prendePlaylist)) {
      firstTab = [...firstTab, ...prendePlaylist];
    }
  }

  const contents = [firstTab];
  if (isValidArray(secondTab)) {
    contents.push(secondTab);
  }

  return contents.reduce((result, value) => {
    result.push(filterContents(value));
    return result;
  }, []);
}

/**
 * When playlist contains a livestream, we check against content to display
 * player in fullview since playlist do have the livestream item and
 * we should also get display info from playlist, since content is empty
 * @param {Object} playlist - active playlist data
 * @param {Object} state - component state values
 * @param {Object} settings - widget settings from API
 * @param {Object[]} prendePlaylist - the prende clips
 * @returns {boolean}
 */
function shouldHidePlaylist(playlist, state, settings, prendePlaylist) {
  const { showPlaylist } = state;
  const hasPlaylist = isValidArray(playlist) || isValidArray(prendePlaylist);

  if (settings.soccerMatch?.hasMatchHighlights) {
    return !showPlaylist && !hasPlaylist;
  }
  return isLiveStreamPlaylist(settings) && !hasPlaylist;
}

/**
 * Determine if should show tabs based if have content items
 * @param {Object} settings - widget settings from API
 * @returns {boolean} true if should show tabs
 */
function shouldShowMultiTab(settings) {
  return isValidArray(getSecondTabContent(settings));
}

/**
 * Filter cuepoints by video action id and add mcpId
 * @param {Object[]} cuepoints - the cuepoints highlights events
 * @param {Object[]} items - the video clip items
 * @returns {Object[]}
 */
function filterCuepointsByActionId(cuepoints, items) {
  let newCuepoints = [];

  if (isValidArray(cuepoints) && isValidArray(items)) {
    newCuepoints = items.reduce((result, item) => {
      const cuepointEvent = cuepoints.find(event => event?.actionId === item?.actionId);

      if (isValidObject(cuepointEvent)) {
        result.push({
          ...cuepointEvent,
          mcpId: item?.mcpid,
        });
      }
      return result;
    }, []);
  }

  return newCuepoints;
}

/**
 * Remove existing videos so we don't render them twice
 * @param {Object} state current component state
 * @param {number} tab current playlist tab index
 * @param {Object[]} videos new videos to append
 * @returns {Object[]}
 */
function removeDuplicates(state, tab, videos) {
  const currentIds = state.playlists?.[tab]?.map(video => video.mcpid);
  return videos?.filter(video => !currentIds.includes(video.mcpid));
}

/**
 * Video with playlist widget component
 * @param {Object} props - react component props
 * @param {boolean} [props.autoplay] - true enable video autoplay to next item
 * @param {Object[]} props.content - widget content items from API
 * @param {Object} props.channels - the network channels for the soccer match
 * @param {Object[]} [props.cuepoints] - the cuepoints events for highlights
 * @param {string} props.device - active page device type
 * @param {string} props.pageCategory - current page category
 * @param {pageData} props.pageData - current page data from API injected from redux connect
 * @param {Object} props.prendeCTAProps - the props for prende CTA
 * @param {Object[]} props.prendeCTAProps - the manually updloaded prende clips
 * @param {Object[]} [props.reactions] - widget user reactions data for action bar
 * @param {boolean} [props.showPrendeCTA] - true will show prende cta on pre match
 * @param {function} props.setPlaylistClicked - redux action to enable playlist clickable
 * @param {Object} props.settings - widget settings from API
 * @param {Object} props.theme - page/widget theme definition
 * @param {Object} props.widgetContext - widget context data from widget factory
 * @returns {JSX}
 */
function VideoWithPlaylist({
  autoplay,
  cuepoints,
  content,
  channels,
  device,
  language,
  pageCategory,
  pageData,
  playlistBelowPlayer,
  prendeCTAProps,
  prendePlaylist,
  reactions,
  slate,
  showPrendeCTA,
  showSlate,
  setPlaylistClicked,
  settings,
  theme,
  userLocation,
  widgetContext,
}) {
  const addPrendeCTA = showPrendeCTA && pageCategory !== pageCategories.SOCCER_MATCH_POST;
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const { uid } = settings;
  const ref = useRef({
    isMultiTab: shouldShowMultiTab(settings),
    nodeId: uid ? `player-${uid}` : generateVideoPlayerId(),
    placeholderId: uid || generateVideoPlayerId(false),
  });
  const {
    nodeId,
    placeholderId,
    isMultiTab,
  } = ref.current;
  const isMxUser = userLocation === MX;
  const embedVixPlayer = isMxUser ? pageData?.vixPlayerMx : pageData?.vixPlayerUs;

  const [state, setState] = useState(() => {
    const newContent = [...(content || [])];

    if (addPrendeCTA) {
      newContent.unshift({
        title: prendeCTAProps?.subTitle,
        type: 'video',
        // Use this as a placeholder video with mcpid: -1
        mcpid: -1,
        image: {
          type: 'image',
          renditions: {
            original: {
              href: prendeCTAProps?.imageConfig?.thumbnail,
            },
          },
        },
      });
    }

    return {
      playlists:
        getAvailablePlaylists(newContent, settings, prendePlaylist, showPrendeCTA, userLocation),
      activeIndex: getCurrentIndex(nodeId),
      activeTab: 0,
      showPlaylist: false,
      isLoading: true,
    };
  });

  const { isDark } = theme;
  const variant = isDark ? DARK_VARIANT : LIGHT_VARIANT;
  const titleLink = settings?.titleLink?.href;
  const title = settings?.title;
  const {
    activeTab,
    activeIndex,
    playlists,
  } = state;
  const playlist = parsePlaylistItems(playlists[activeTab],
    isWorldCupMVP, userLocation);
  const contentItem = playlist[activeIndex];
  const cuepointsEvents = filterCuepointsByActionId(cuepoints, playlist);
  let hidePlaylist = shouldHidePlaylist(content, state, settings, prendePlaylist);

  // When Prende CTA is enabled, cta is first item so hide playlist since there's no more clips
  if (addPrendeCTA && isValidArray(playlist) && playlist.length === 1) {
    hidePlaylist = playlist.length === 1;
  }

  // If vixPlayer exist
  let showVixPlayer = false;
  const VIX_ON = 'ON';

  if (isValidObject(embedVixPlayer) && isWorldCupMVP) {
    showVixPlayer = embedVixPlayer?.status === VIX_ON;
    hidePlaylist = showVixPlayer;
  }

  /**
   * Appends videos to the playlist
   * @param {Object[]} videos new videos to append
   * @param {bool} isSoccerPlaylist marks if this is a soccer match
   * @param {bool} shouldPrepend should we prepend or append items to the playlist
   */
  const updatePlaylist = (videos, isSoccerPlaylist, shouldPrepend = true) => {
    const newPlaylist = [...playlists];
    const filteredVideos = geoFilterVideos(
      videos,
      userLocation,
      isValidObject(settings?.soccerMatch)
    );
    const parsedVideos = parsePlaylistItems(removeDuplicates(state, activeTab, filteredVideos),
      isWorldCupMVP, userLocation);

    // We should prepend videos while match is live,
    // since we order them reversely after index 0 that is always the match,
    // if not live or initial call we just append them at last index
    const insertAtIndex = shouldPrepend ? 1 : newPlaylist?.[activeTab]?.length - 1;

    if (isValidArray(parsedVideos)) {
      if (isSoccerPlaylist) {
        newPlaylist?.[activeTab]?.splice(insertAtIndex, 0, ...parsedVideos);

        // Since we are inserting the clips at the top activeIndex is being moved
        if (showPrendeCTA) {
          setState({ ...state, activeIndex: activeIndex + parsedVideos.length });
        }
      } else {
        newPlaylist?.[activeTab]?.push(...parsedVideos);
      }

      appendVideos(parsedVideos, { isSoccerPlaylist, insertAtIndex }, nodeId);
      setState({ ...state, playlists: newPlaylist, isLoading: false });
    }
  };

  /**
   * Interval to pull clips from video-api
   */
  const { clear } = useInterval(async () => {
    if (addPrendeCTA) {
      if (pageCategory === pageCategories.SOCCER_MATCH_MID) {
        const videos = await fetchPlaylistApi(uid);
        updatePlaylist?.(videos, true);
      }
    } else {
      clear();
    }
  }, REQUEST_TIME_HIGHLIGHTS);

  /**
   * On Match over remove first item from the playlist
   */
  const onMatchOver = () => {
    const newPlaylist = [...playlists];
    if (newPlaylist?.[activeTab]?.[0]?.videoType === VIDEO_TYPE_LIVESTREAM) {
      newPlaylist[activeTab].shift();
    }

    setState({ ...state, playlists: newPlaylist, isLoading: false });
  };

  useEffect(() => {
    if (showPrendeCTA && pageCategory === pageCategories.SOCCER_MATCH_POST) {
      clear();
      onMatchOver();
      matchOver(nodeId);
    }
  }, [pageCategory]);

  /**
   * Take playlist items, map values so playlist item can consume them,
   * and store on state.
   */
  const onPlaylistInitializedHandler = () => {
    if (state.isLoading) {
      setState({ ...state, isLoading: false });
    }
  };

  /**
   * Handler of on next item playlist
   * @param {Object} itemId - the next playlist item 0-based index
   */
  const onNextItemHandler = (itemId) => {
    if (state.activeIndex !== itemId) {
      setState({ ...state, activeIndex: itemId });
    }
  };

  /**
   * Set activeIndex state and fires the video tracker event
   * @param {Object} event - javascript click event data
   * @param {number} itemId - the new playlist item index
   */
  const onPlaylistItemClick = (event, itemId) => {
    event.preventDefault();
    setState({ ...state, activeIndex: itemId });

    VideoTracker.track(VideoTracker.events.playlistItemClick);
    if (isValidFunction(setPlaylistClicked)) {
      setPlaylistClicked(true);
    }
  };

  /**
   * Handler from video that determines if should show or hide playlist
   * @param {bool} shouldShow - true show the playlist
   */
  const shouldShowPlaylistHandler = (shouldShow) => {
    if (shouldShow !== state.showPlaylist) {
      setState({ ...state, showPlaylist: shouldShow });
    }
  };

  /**
   * Switches the playlist tab
   * @param {Object} event - javascript click event data
   * @param {number} activeTabIndex Index of the playlist to switch to
   */
  const switchTab = (event, activeTabIndex) => {
    event.preventDefault();
    setState({
      ...state,
      activeTab: activeTabIndex,
      activeIndex: 0,
    });
  };

  const {
    mainTabLabel,
    otherTabs,
    soccerMatch,
  } = settings;

  const displayCTA = addPrendeCTA && activeIndex === 0;
  const isTitleCase = isWorldCupMVP;
  const isBroadcastStream = userLocation === MX
    && isWorldCupMVP && isValidObject(pageData?.broadcastEvent);
  const emptyPlaylist = !isValidArray(playlist);

  return (
    <div className="uvs-widget">
      <WidgetTitle titleLink={titleLink} title={title} isTitleCase={isTitleCase} />
      <div className="row">
        <VideoCardStyled
          variant={variant}
          hidePlaylist={hidePlaylist}
          className={classnames(
            'col-12',
            { 'col-md-10 col-lg-8 col-xl-10': hidePlaylist && !playlistBelowPlayer && !addPrendeCTA },
            { 'col-md-8 col-lg-8': !hidePlaylist && !playlistBelowPlayer },
          )}
        >
          {showVixPlayer && (
            <iframe
              width="100%"
              height="100%"
              title={embedVixPlayer.title}
              src={embedVixPlayer.url}
              frameBorder="0"
              allowFullScreen="true"
              allow="encrypted-media"
              style={VixStyled}
            />
          )}
          {addPrendeCTA && !showVixPlayer && (
            <PrendeCTAWrapper displayCTA={displayCTA}>
              <PrendeCTA {...prendeCTAProps} />
            </PrendeCTAWrapper>
          )}
          <VideoWrapperStyled displayCTA={displayCTA}>
            {!showVixPlayer && (
              <VideoWrapper
                disableAnchor={displayCTA}
                contentItem={contentItem}
                autoplay={autoplay}
                activeTab={activeTab}
                channels={channels}
                hidePlaylist={hidePlaylist}
                language={language}
                settings={{ ...settings, isBroadcastStream }}
                pageData={pageData}
                onNextItem={onNextItemHandler}
                onPlaylistInitialized={onPlaylistInitializedHandler}
                playlistItems={playlist}
                activeIndex={activeIndex}
                shouldShowPlaylist={shouldShowPlaylistHandler}
                playlistLoading={state.isLoading}
                placeholderId={placeholderId}
                prendeCTAProps={prendeCTAProps}
                nodeId={nodeId}
                cuepoints={cuepointsEvents}
                showPrendeCTA={showPrendeCTA}
                showSlate={showSlate || emptyPlaylist}
                slate={slate}
                theme={theme}
                onMatchOver={onMatchOver}
                updatePlaylist={updatePlaylist}
              />
            )}
          </VideoWrapperStyled>
          {!playlistBelowPlayer && !showVixPlayer && (
            <VideoContent
              contentItem={contentItem}
              device={device}
              brandTitle={theme?.brandTitle}
              reactions={reactions}
              pageData={pageData}
              variant={variant}
              actionBarType={theme?.actionBarType}
              isWorldCupMVP={isWorldCupMVP}
            />
          )}
        </VideoCardStyled>
        {!hidePlaylist && (
          <PlaylistStyled
            className={classnames(
              'col-12',
              { 'col-12 col-xs-12 col-md-4 col-lg-4': !playlistBelowPlayer },
            )}
            playlistBelowPlayer={playlistBelowPlayer}
          >
            {isMultiTab && (
              <VideoTabs
                activeTab={activeTab}
                mainTabLabel={mainTabLabel}
                otherTabs={otherTabs}
                onClick={switchTab}
                theme={theme}
                variant={variant}
              />
            )}
            <PlaylistCards
              device={device}
              activeIndex={activeIndex}
              isMultiTab={isMultiTab}
              contents={playlist}
              onClick={onPlaylistItemClick}
              variant={variant}
              loading={state.isLoading}
              theme={theme}
              widgetContext={widgetContext}
              infiniteScroll={soccerMatch?.hasMatchHighlights}
              uid={uid}
              onNewVideos={updatePlaylist}
              playlistBelowPlayer={playlistBelowPlayer}
            />
          </PlaylistStyled>
        )}
      </div>
    </div>
  );
}

VideoWithPlaylist.propTypes = {
  autoplay: PropTypes.bool,
  playlistBelowPlayer: PropTypes.bool,
  channels: PropTypes.object,
  content: PropTypes.arrayOf(PropTypes.object),
  cuepoints: PropTypes.arrayOf(PropTypes.object),
  device: PropTypes.string,
  language: PropTypes.string,
  pageCategory: PropTypes.string,
  pageData: PropTypes.object,
  prendeCTAProps: PropTypes.object,
  prendePlaylist: PropTypes.arrayOf(PropTypes.object),
  reactions: PropTypes.array,
  slate: PropTypes.string,
  showPrendeCTA: PropTypes.bool,
  showSlate: PropTypes.bool,
  setPlaylistClicked: PropTypes.func,
  settings: PropTypes.shape({
    uid: PropTypes.string,
    mainTabLabel: PropTypes.string,
    otherTabs: PropTypes.array,
    soccerMatch: PropTypes.object,
    livestream: PropTypes.object,
    title: PropTypes.string,
    titleLink: PropTypes.object,
  }),
  widgetContext: PropTypes.object,
  theme: PropTypes.object,
  userLocation: PropTypes.string,
};

VideoWithPlaylist.defaultProps = {
  settings: {},
  theme: {},
  playlistBelowPlayer: false,
};

export default VideoWithPlaylist;
