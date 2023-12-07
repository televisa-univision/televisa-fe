/* eslint-disable babel/no-unused-expressions */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';

import {
  HORIZONTAL,
} from '@univision/fe-commons/dist/constants/layoutTypes';
import {
  LIVE_24_7_URL,
  PRENDETV_BANNER,
  VIX_BANNER,
  PRENDETV_PROMO,
} from '@univision/fe-commons/dist/constants/urls';
import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import {
  closeAnchor,
  isPlaceholderAvailable,
  removeVideoInstance,
  pauseAnyPlayerPlaying,
  checkExpandOnPlaylistChange,
} from '@univision/fe-commons/dist/utils/video';
import Epg from '@univision/fe-components-base/dist/components/Epg';
import features from '@univision/fe-commons/dist/config/features';

import VideoMeta from '../VideoMeta';
import PlaylistCards from '../playlist/PlaylistCards';
import { lockUnlockBody } from '../../helpers';
import { handleExpandedClick, handleCloseAnchor, anchorTracking } from '../../helpers/events';
import PlayerSwipeController from './PlayerSwipeController';
import Styles from './VideoPlayerWrapper.styles';

const ButtonWrapper = styled.button`${Styles.buttonWrapper}`;
const MetaWrapper = styled.div`
  ${Styles.metaWrapper}
`;
const PlayerWrapper = styled.div`
  ${Styles.videoPlayerWrapper}
`;
const IframeContainer = styled.div`${Styles.iframeContainer}`;
const IframeWrapper = styled.iframe`${Styles.iframeWrapper}`;
const EpgWrapper = styled.div`${Styles.epgWrapper}`;
const InnerPlayerWrapper = styled.div`
  ${Styles.innerVideoPlayerWrapper}
`;

export const PlaylistWrapper = styled.div`
  ${Styles.playlistWrapper}
`;

const VERTICAL_PADDING = 16;

/**
 * call JWPlayer playlistItem method with desired item index
 * @param {number} itemIndex the index of the item to be played
 * @param {string} id player id
 */
export const jumpToPlaylistItem = (itemIndex, id) => {
  if (typeof itemIndex !== 'undefined' && global?.FMG) {
    const { FMG } = global;
    FMG.trigger('video_playlist_page.click_item', null, itemIndex, id);
  }
};

/**
 * Set anchor close event
 * This is a fallback just to close the video if there is not a parent
 * @param {string} id - player id
 * @param {boolean} expanded - expanded
 */
export const setClosePlayerEvent = (id, expanded) => {
  if (global?.FMG) {
    const { FMG } = global;
    FMG.on('closeAnchorVideo', () => {
      handleCloseAnchor(id)(expanded);
      // if there is not parent remove video
      if (!isPlaceholderAvailable(id)) {
        removeVideoInstance(id);
      }

      lockUnlockBody(false);
    }, id);
  }
};

/**
 * Set playlist change event
 * @param {string} id - player id
 * @param {Function} setActivePlaylistIndex - Hook playlist setter
 */
export const setPlaylistChangeEvent = (id, setActivePlaylistIndex) => {
  if (global?.FMG) {
    const { FMG } = global;
    FMG.on('SDK.playlist_item', (item) => {
      setActivePlaylistIndex(item?.index);
    }, id);
  }
};

/**
 * Share Button click Handler
 * @returns {function}
 */
export const shareButtonHandler = () => pauseAnyPlayerPlaying(null, true);

/**
 * On Playlist Card Click
 * @param {Function} setActiveIndex sets current playing index
 * @param {string} nodeId current player id
 * @returns {function}
 */
export const onPlaylistCardClick = (setActiveIndex, nodeId) => (e, index) => {
  e.preventDefault();
  jumpToPlaylistItem(index, nodeId);
  setActiveIndex(index);
};

/**
 * VideoPlayerWrapper
 * @returns {JSX}
 */
const VideoPlayerWrapper = ({
  anchored,
  children,
  context,
  digitalChannelSchedule,
  disableEnVivoLabel,
  hasAdSkin,
  isCasting,
  isLiveStream,
  infiniteScroll,
  isMobile,
  isNewsDigitalChannel,
  isSticky,
  nodeId,
  onNewVideos,
  playlistContent,
  program,
  title,
  uri,
}) => {
  const playerRef = useRef(null);
  const innerHeight = useRef(global?.window?.innerHeight);
  const [playlistActiveIndex, setActivePlaylistIndex] = useState(0);
  const [playerHeight, setPlayerHeight] = useState(0);
  const [expandedState, setExpanded] = useState(false);
  const isVixEnabled = features.widgets.isVixEnabled();

  const enableAnchor = !isSticky && anchored;
  const enableSticky = isSticky && anchored;
  const videoOptions = {
    category: null,
    title,
    uri,
  };
  const isValidPlaylist = enableAnchor && isValidArray(playlistContent)
    && playlistContent.length >= playlistActiveIndex;

  // overwrite default video values using playlist data
  const currentPlaylistContent = playlistContent?.[playlistActiveIndex];
  if (isValidPlaylist) {
    videoOptions.title = playlistActiveIndex === 0 && isNewsDigitalChannel
      ? program?.title : currentPlaylistContent?.title;
    videoOptions.category = currentPlaylistContent?.category;
    videoOptions.uri = playlistActiveIndex === 0 && isNewsDigitalChannel
      ? LIVE_24_7_URL : currentPlaylistContent?.permalink;
  }

  const mcpId = playlistContent?.[playlistActiveIndex]?.mcpid;

  // height component calculation
  let maxOffset = 0;
  let negativeMaxOffset = 0;
  const navHeight = 90;
  if (innerHeight.current) {
    const availableSpace = isMobile
      ? innerHeight.current - playerHeight
      : innerHeight.current - playerHeight - navHeight - (VERTICAL_PADDING * 2);

    if (!Number.isNaN(availableSpace)) {
      maxOffset = availableSpace;
      negativeMaxOffset = maxOffset * (-1);
    }
  }

  /**
   * on Swipe state change
   * @param {boolean} expandedValue - expanded
   */
  const onExpandChange = (expandedValue) => {
    setExpanded(expandedValue);
    handleExpandedClick(expandedValue);
    if (isMobile) {
      lockUnlockBody(expandedValue);
    }
  };

  useEffect(() => {
    setPlayerHeight(playerRef?.current?.getBoundingClientRect?.()?.height);
  }, [anchored, expandedState]);

  /* Mount player element */
  useEffect(() => {
    if (nodeId) {
      setClosePlayerEvent(nodeId);
      setPlaylistChangeEvent(nodeId, setActivePlaylistIndex);
      global.window?.FMG?.on?.('switchPlaylist', setActivePlaylistIndex.bind(null, 0), nodeId);
    }

    return () => {
      global.window?.FMG?.off?.('switchPlaylist', nodeId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (nodeId) {
      const isExpanded = isValidArray(playlistContent) && expandedState;
      setExpanded(isExpanded);
      checkExpandOnPlaylistChange(nodeId, isExpanded);
      global.window?.FMG?.on?.('onAnchorExpanded', onExpandChange, nodeId);
    }

    return () => {
      global.window?.FMG?.off?.('onAnchorExpanded', nodeId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistContent]);

  /**
   * close anchor
   */
  const onClose = () => {
    // if there is not parent remove video
    if (!isPlaceholderAvailable(nodeId)) {
      removeVideoInstance(nodeId);
    } else {
      closeAnchor(nodeId);
    }

    if (isMobile) {
      lockUnlockBody(false);
    }
  };

  return (
    <PlayerWrapper
      className={classnames({ 'jw-skin-anchor': enableAnchor })}
      hasAdSkin={hasAdSkin}
      isAnchor={enableAnchor}
      isExpanded={expandedState}
      isMobile={isMobile}
      isSticky={enableSticky}
      isCasting={isCasting}
      style={{ bottom: isValidPlaylist ? negativeMaxOffset : 0 }}
    >
      <PlayerSwipeController
        disabled={!enableAnchor}
        disableUp={!isValidPlaylist}
        isExpanded={expandedState}
        isMobile={isMobile}
        maxOffset={maxOffset}
        onChange={onExpandChange}
        onClose={onClose}
        useGradient={enableAnchor && isMobile}
      >
        <InnerPlayerWrapper
          key="player"
          ref={playerRef}
          isAnchor={enableAnchor}
          isMobile={isMobile}
          className={classnames({
            'anchor-mobile': isMobile && !isSticky,
            'anchor-wrapper': enableAnchor,
            'digital-channel': enableAnchor && isNewsDigitalChannel,
            'jw-flag-expanded': enableAnchor,
            'jw-flag-collapsed': !expandedState,
            'jw-flag-playlist': isValidPlaylist,
          })}
        >
          {children}
          <MetaWrapper
            isExpanded={expandedState}
            visible={enableAnchor}
            isNewsDigitalChannel={isNewsDigitalChannel}
          >
            <VideoMeta
              category={expandedState ? videoOptions?.category : undefined}
              context={context}
              currentMcpId={mcpId}
              index={playlistActiveIndex}
              isClickable
              isExpanded={expandedState}
              isNewsDigitalChannel={isNewsDigitalChannel}
              mcpid={mcpId}
              shareButtonClick={shareButtonHandler}
              showLiveLabel={isLiveStream && !disableEnVivoLabel}
              simple
              smallVersion
              variant="dark"
              nodeId={nodeId}
              program={program}
              video={videoOptions}
            />
          </MetaWrapper>
        </InnerPlayerWrapper>
        {isValidPlaylist && (
          <PlaylistWrapper
            id="responsive-playlist-inner"
            key="playlist"
            style={{ height: maxOffset }}
            isNewsDigitalChannel={isNewsDigitalChannel}
          >
            {expandedState && isNewsDigitalChannel && (
              <>
                <EpgWrapper>
                  <Epg digitalChannelSchedule={digitalChannelSchedule} isAnchor />
                </EpgWrapper>
                <ButtonWrapper
                  onClick={anchorTracking({ ...currentPlaylistContent, url: PRENDETV_PROMO })}
                >
                  <IframeContainer>
                    <IframeWrapper
                      width="100%"
                      height="100%"
                      src={isVixEnabled ? VIX_BANNER : PRENDETV_BANNER}
                    />
                  </IframeContainer>
                </ButtonWrapper>
              </>
            )}
            <PlaylistCards
              layout={HORIZONTAL}
              activeIndex={playlistActiveIndex}
              contents={playlistContent}
              hideActionBar
              infiniteScroll={infiniteScroll}
              isAnchor
              onClick={onPlaylistCardClick(setActivePlaylistIndex, nodeId)}
              onNewVideos={onNewVideos}
              variant="dark"
              uid={playlistContent?.[0]?.uid}
            />
          </PlaylistWrapper>
        )}
      </PlayerSwipeController>
    </PlayerWrapper>
  );
};

VideoPlayerWrapper.defaultProps = {
  anchored: false,
  hasAdSkin: false,
  isLiveStream: false,
  isMobile: false,
  isSticky: false,
  title: '',
};

VideoPlayerWrapper.propTypes = {
  anchored: PropTypes.bool,
  children: PropTypes.node.isRequired,
  context: PropTypes.object,
  digitalChannelSchedule: PropTypes.array,
  disableEnVivoLabel: PropTypes.bool,
  hasAdSkin: PropTypes.bool,
  isCasting: PropTypes.bool,
  isLiveStream: PropTypes.bool,
  isMobile: PropTypes.bool,
  isNewsDigitalChannel: PropTypes.bool,
  isSticky: PropTypes.bool,
  infiniteScroll: PropTypes.bool,
  nodeId: PropTypes.string,
  onNewVideos: PropTypes.func,
  playlistContent: PropTypes.array,
  program: PropTypes.object,
  title: PropTypes.string,
  uri: PropTypes.string,
};

export default VideoPlayerWrapper;
