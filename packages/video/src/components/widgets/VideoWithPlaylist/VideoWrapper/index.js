import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ToolTip from '@univision/fe-components-base/dist/components/ToolTip';
import localization from '@univision/fe-utilities/localization';
import isValidString from '@univision/fe-utilities/helpers/common/isValidString';
import {
  VIDEO_EVENT_PLAY,
  VIDEO_TYPE_LIVESTREAM,
} from '@univision/fe-commons/dist/constants/video';

import VideoPlaylistPlayerWrapper from '../../../player/VideoPlaylistPlayerWrapper';
import Styles from './VideoWrapper.styles';

const ToolTipStyled = styled(ToolTip)`${Styles.tooltip}`;
const SlateStyled = styled.img`${Styles.slate}`;

const TOOLTIP_360_ID = 'uvn_video_360_tooltip';
const TOOLTIP_HIDE_DELAY = 10 * 1000;
const TOOLTIP_CLOSE = 'close';
const TOOLTIP_SHOW = 'show';

/**
 * Video Wrapper for video with playlist widget
 * @param {Object} props - react component props
 * @returns {JSX}
 */
function VideoWrapper({
  contentItem,
  autoplay,
  activeTab,
  channels,
  disableAnchor,
  mcpIdImages,
  hidePlaylist,
  language,
  settings,
  pageData,
  onNextItem,
  onPlaylistInitialized,
  onMatchOver,
  playlistItems,
  activeIndex,
  shouldShowPlaylist,
  isLoading,
  placeholderId,
  nodeId,
  showPrendeCTA,
  showSlate,
  slate,
  cuepoints,
  theme,
  updatePlaylist,
}) {
  const tooltipTimeout = useRef(null);
  const [statusInfoTooltip, setStatusInfoTooltip] = useState(null);
  const showInfoTooltip = statusInfoTooltip === TOOLTIP_SHOW;
  const closeInfoTooltip = statusInfoTooltip === TOOLTIP_CLOSE;
  const showTooltip = contentItem?.is360;

  /**
   * Video play handler to show english tooltip when is a livestream
   * @param {Object} event SDK video event
   */
  const onPlayVideoHandler = (event) => {
    if (closeInfoTooltip || !showTooltip || event?.type !== VIDEO_EVENT_PLAY) {
      return;
    }
    const isLivestream = contentItem?.videoType === VIDEO_TYPE_LIVESTREAM
      || contentItem?.type === VIDEO_TYPE_LIVESTREAM;

    setStatusInfoTooltip(isLivestream ? TOOLTIP_SHOW : TOOLTIP_CLOSE);
  };

  /**
   * Set tooltip autohide timeout on mount and clean on unmount
   */
  useEffect(() => {
    if (showInfoTooltip && !tooltipTimeout.current) {
      tooltipTimeout.current = setTimeout(
        setStatusInfoTooltip.bind(null, TOOLTIP_CLOSE),
        TOOLTIP_HIDE_DELAY
      );
    }
    return () => {
      clearTimeout(tooltipTimeout.current);
    };
  }, [showInfoTooltip]);

  if (showSlate && isValidString(slate) && !showPrendeCTA && !settings?.isBroadcastStream) {
    return (
      <SlateStyled
        slateImage={slate}
      />
    );
  }

  return (
    <>
      <VideoPlaylistPlayerWrapper
        {...contentItem}
        isPlaylist
        activeTab={activeTab}
        autoplay={autoplay}
        channels={channels}
        disableAnchor={disableAnchor}
        mcpid={mcpIdImages}
        hidePlaylist={hidePlaylist}
        language={language}
        settings={settings}
        pageData={pageData}
        onNext={onNextItem}
        onPlaylistInitialized={onPlaylistInitialized}
        onPlay={onPlayVideoHandler}
        onMatchOver={onMatchOver}
        playlistContent={playlistItems}
        playlistItem={activeIndex}
        activeIndex={activeIndex}
        shouldShowPlaylist={shouldShowPlaylist}
        playlistLoading={isLoading}
        playlist={playlistItems}
        placeholderId={placeholderId}
        nodeId={nodeId}
        cuepoints={cuepoints}
        updatePlaylist={updatePlaylist}
        showPrendeCTA={showPrendeCTA}
      />
      {showTooltip && (
        <ToolTipStyled
          arrowPosition={0}
          close={closeInfoTooltip}
          content={localization.get('tooltip360')}
          toolTipId={TOOLTIP_360_ID}
          showToolTip={showInfoTooltip}
          showTimes={4}
          theme={theme}
          showArrowRight
        />
      )}
    </>
  );
}

VideoWrapper.propTypes = {
  activeTab: PropTypes.number,
  contentItem: PropTypes.object,
  channels: PropTypes.object,
  cuepoints: PropTypes.arrayOf(PropTypes.object),
  disableAnchor: PropTypes.bool,
  mcpIdImages: PropTypes.array,
  pageData: PropTypes.object,
  autoplay: PropTypes.bool,
  hidePlaylist: PropTypes.bool,
  language: PropTypes.string,
  isLoading: PropTypes.bool,
  activeIndex: PropTypes.number,
  onNextItem: PropTypes.func,
  onPlaylistInitialized: PropTypes.func,
  onMatchOver: PropTypes.func,
  updatePlaylist: PropTypes.func,
  shouldShowPlaylist: PropTypes.func,
  placeholderId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  nodeId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  playlistItems: PropTypes.arrayOf(PropTypes.object),
  settings: PropTypes.shape({
    livestream: PropTypes.object,
    soccerMatch: PropTypes.object,
    isBroadcastStream: PropTypes.bool,
  }),
  showPrendeCTA: PropTypes.bool,
  showSlate: PropTypes.bool,
  showLanguageTooltip: PropTypes.bool,
  slate: PropTypes.string,
  theme: PropTypes.object,
};

export default VideoWrapper;
