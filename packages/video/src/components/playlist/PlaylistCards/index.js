/* eslint-disable babel/no-unused-expressions */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Loading from '@univision/fe-components-base/dist/components/Loading';
import useVideoPlaylist from '@univision/fe-commons/dist/utils/hooks/useVideoPlaylist';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import useIntersectionObserver from '@univision/fe-commons/dist/utils/hooks/useIntersectionObserver';
import {
  HORIZONTAL,
  VERTICAL,
} from '@univision/fe-commons/dist/constants/layoutTypes';

import PlaylistPlaceholder from './PlaylistPlaceholder';
import PlaylistCard from './PlaylistCard';

import Styles from './PlaylistCards.styles';

const PlaylistOuterStyled = styled.div`${Styles.playlistOuter}`;
const PlaylistInnerStyled = styled.div`${Styles.playlistInner}`;
const PlaylistContainerStyled = styled.div`${Styles.playlistContainer}`;
const LoadingStyled = styled.div`${Styles.loading}`;
const PlaylistCardStyled = styled(PlaylistCard)`${Styles.playlistCard}`;

/**
 * Playlist cards with list card
 * layout depending of the device
 * @param {Object} props - react component props
 * @returns {JSX}
 */
function PlaylistCards({
  autoScroll,
  contents,
  className,
  device,
  hideActionBar,
  onClick,
  onNewVideos,
  playlistBelowPlayer,
  isAnchor,
  isNewsDigitalChannel,
  isMultiTab,
  infiniteLimit,
  infiniteScroll,
  activeIndex,
  widgetContext,
  variant,
  theme,
  loading,
  layout,
  uid,
}) {
  const [page, setPage] = useState(0);
  const {
    loading: videosLoading,
    videos,
  } = useVideoPlaylist(uid, page, infiniteLimit);
  const { elRef, entries } = useIntersectionObserver({
    disable: !infiniteScroll,
  });

  useEffect(() => {
    /* istanbul ignore next */
    if (isValidArray(entries) && entries[0].isIntersecting) {
      setPage(previousPage => previousPage + 1);
    }
  }, [entries]);

  useEffect(() => {
    /* istanbul ignore next */
    if (!videosLoading) {
      onNewVideos?.(videos);
    }
  }, [videosLoading, onNewVideos, videos]);

  const playlistInnerRef = useRef();
  const currentMcpId = getKey(contents, [activeIndex, 'mcpid']);
  const isMobile = device !== 'desktop';
  let currentLayout = isMobile || playlistBelowPlayer ? VERTICAL : HORIZONTAL;
  const isLoading = loading || !isValidArray(contents);

  if (typeof layout !== 'undefined') {
    currentLayout = layout;
  }

  /**
   * Render playlist card with appropriate layout prop based on device.
   * Function here so we dont duplicate props per breakpoint
   * @param {Object} itemContent - the content card data
   * @param {number} itemIndex the card index
   * @returns {JSX}
   */
  const renderContentCard = (itemContent, itemIndex) => {
    const key = itemContent.uid || `${itemContent?.mcpid}${itemIndex}`;

    return (
      <PlaylistCardStyled
        key={`${key}-${itemIndex}`}
        autoScroll={autoScroll}
        activeIndex={activeIndex}
        contentIndex={itemIndex}
        content={itemContent}
        layout={currentLayout}
        playlistInnerRef={playlistInnerRef.current}
        playlistBelowPlayer={playlistBelowPlayer}
        isActiveItem={currentMcpId === itemContent?.mcpid}
        isMultiTab={isMultiTab}
        onClick={onClick}
        variant={variant}
        widgetContext={widgetContext}
        hideActionBar={hideActionBar}
      />
    );
  };

  /**
   * Render cards playlists
   */
  return (
    <>
      {isLoading && (
        <PlaylistPlaceholder
          theme={theme}
          layout={currentLayout}
          isNewsDigitalChannel={isNewsDigitalChannel}
        />
      )}
      <PlaylistOuterStyled
        variant={variant}
        className={className}
        loading={isLoading}
        playlistBelowPlayer={playlistBelowPlayer}
      >
        <PlaylistInnerStyled
          ref={playlistInnerRef}
          isNewsDigitalChannel={isNewsDigitalChannel}
          theme={theme}
          isAnchor={isAnchor}
          playlistBelowPlayer={playlistBelowPlayer}
        >
          <PlaylistContainerStyled
            layout={currentLayout}
            playlistBelowPlayer={playlistBelowPlayer}
            infiniteScroll={infiniteScroll}
          >
            {contents.map(renderContentCard)}
            {infiniteScroll && (
              <LoadingStyled ref={elRef}>
                {videosLoading && (
                  <Loading size="medium" theme={theme} />
                )}
              </LoadingStyled>
            )}
          </PlaylistContainerStyled>
        </PlaylistInnerStyled>
      </PlaylistOuterStyled>
    </>
  );
}

PlaylistCards.propTypes = {
  autoScroll: PropTypes.bool,
  activeIndex: PropTypes.number.isRequired,
  className: PropTypes.string,
  contents: PropTypes.array.isRequired,
  device: PropTypes.string,
  hideActionBar: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onNewVideos: PropTypes.func,
  playlistBelowPlayer: PropTypes.bool,
  isAnchor: PropTypes.bool,
  isMultiTab: PropTypes.bool,
  infiniteLimit: PropTypes.number,
  infiniteScroll: PropTypes.bool,
  isNewsDigitalChannel: PropTypes.bool,
  layout: PropTypes.string,
  loading: PropTypes.bool,
  theme: PropTypes.object,
  uid: PropTypes.string,
  variant: PropTypes.string,
  widgetContext: PropTypes.object,
};

PlaylistCards.defaultProps = {
  autoScroll: false,
};

export default PlaylistCards;
