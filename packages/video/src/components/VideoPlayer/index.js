/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect, Provider } from 'react-redux';
import styled from 'styled-components';

import * as videoActions from '@univision/fe-commons/dist/store/actions/video-actions';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';

import {
  getTheme,
  getDevice,
  getPageData,
  getRequestParams,
} from '@univision/fe-commons/dist/store/storeHelpers';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import { pauseAnyPlayerPlaying, isPlayerBufferingOrPlaying, getCurrentIndex } from '@univision/fe-commons/dist/utils/video';
import Store from '@univision/fe-commons/dist/store/store';
import VideoTracker from '@univision/fe-commons/dist/utils/tracking/tealium/video/VideoTracker';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Clickable from '@univision/fe-components-base/dist/components/Clickable';
import Epg from '@univision/fe-components-base/dist/components/Epg';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import {
  HORIZONTAL,
} from '@univision/fe-commons/dist/constants/layoutTypes';
import {
  PRENDETV_BANNER,
  PRENDETV_24_7,
  VIX_BANNER,
} from '@univision/fe-commons/dist/constants/urls';
import features from '@univision/fe-commons/dist/config/features';
import { userLocationSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { US } from '@univision/fe-commons/dist/constants/userLocation';

import Video from '../Video';
import VideoMeta from '../VideoMeta';
import {
  generateVideoPlayerId,
  parsePlaylistItems,
} from '../../helpers';
import { appendVideos, anchorTracking } from '../../helpers/events';
import PlaylistCards from '../playlist/PlaylistCards';

import Styles from './VideoPlayer.scss';
import StyledComponent from './VideoPlayer.styles';

const BannerLinkWrapper = styled.button`${StyledComponent.bannerLinkWrapper}`;
const DesktopEpgWrapper = styled.div`${StyledComponent.desktopEpgWrapper}`;
const MobileEpgWrapper = styled.div`${StyledComponent.mobileEpgWrapper}`;
const PlaylistOuter = styled.div`${StyledComponent.playlistOuter}`;
const Tabs = styled.div`${StyledComponent.tabs}`;
const IFrameWrapper = styled.iframe`${StyledComponent.iframeWrapper}`;
export const Tab = styled(Clickable)`${StyledComponent.tab}`;

const LIVE_PLAYLIST_LIMIT = 5;
const VIDEO_PLAYLIST_LIMIT = 10;

/**
 * VideoPlayer component
 * @param {Object} props the component props
 * @returns {JSX}
 */
export class VideoPlayerComponent extends React.Component {
  /**
   * Bind methods and set initialState
   * @param {Object} props Properties of the component
   */
  constructor(props) {
    super(props);

    this.onNewVideos = this.onNewVideos.bind(this);
    this.loadPlaylist = this.loadPlaylist.bind(this);
    this.makeActive = this.makeActive.bind(this);
    this.onPlaylistItemClick = this.onPlaylistItemClick.bind(this);
    this.renderContent = this.renderContent.bind(this);

    this.isWorldCupMVP = features.deportes.isWorldCupMVP();

    this.pageData = getPageData(Store);
    this.metaReady = false;

    this.device = getDevice(Store);
    this.theme = getTheme(Store);
    const { widgetData, nodeId } = this.props;
    const { uid, mcpid } = widgetData;
    this.placeholderId = uid || generateVideoPlayerId(false);
    const playerId = (uid) ? `player-${uid}` : generateVideoPlayerId();
    this.currentNodeId = nodeId || playerId;
    this.currentMcpId = mcpid;

    this.state = {
      activeTab: 0,
      activeIndex: getCurrentIndex(this.currentNodeId),
      loading: !isPlayerBufferingOrPlaying(this.currentNodeId),
      playing: false,
      content: this.getPlaylist(),
    };
    this.isMobile = this.device === 'mobile';
    this.urlPrendeTV = `${PRENDETV_24_7}247_videobanner`;
    this.isVixEnabled = features.widgets.isVixEnabled();
  }

  /**
   * When component mounts
   */
  componentDidMount() {
    const { isNewsDigitalChannel } = this.props;
    const { loading, content } = this.state;
    const [, ...videos] = content;

    // When digital channel we don't have a playlist when player is anchor so,
    // if player is already running (due to coming from anchor) and we have a playlist,
    // append new videos into it
    if (isNewsDigitalChannel && !loading && isValidArray(videos)) {
      appendVideos(videos, {}, this.currentNodeId);
    }
  }

  /**
   * Gets playlist data
   * @returns {[]}
   */
  getPlaylist() {
    const { widgetData, userLocation } = this.props;
    const videos = getKey(widgetData, 'playlist.videos', []);
    let playlistVideos = [...videos];

    // Clear auth videos for recommendations
    if (!widgetData?.longform) {
      playlistVideos = playlistVideos.filter(item => !item.authRequired);
    }

    const parsedVideos = parsePlaylistItems([
      widgetData,
      ...playlistVideos,
    ], this.isWorldCupMVP, userLocation);

    return parsedVideos;
  }

  /**
   * set activeIndex state and fires the video tracker event
   * @param {Object} event click event
   * @param {number} activeIndex the new playlistItem index
   */
  onPlaylistItemClick = (event, activeIndex) => {
    const { setPlaylistClicked } = this.props;

    event.preventDefault();

    this.makeActive(activeIndex);
    setPlaylistClicked(true);
    VideoTracker.track(VideoTracker.events.playlistItemClick);
  };

  /**
   * Share Button click Handler
   * @returns {function}
   */
  shareButtonHandler = () => pauseAnyPlayerPlaying(null, true);

  /**
   * set activeIndex state
   * @param {number} index the new playlistItem index
   */
  makeActive = (index) => {
    const { activeIndex, content } = this.state;
    const { onPlaylistItemChange } = this.props;

    if (index === activeIndex) {
      return;
    }

    const activeItem = content[index];
    this.currentMcpId = activeItem?.identifier;
    this.pageData = getPageData(Store);

    this.setState({
      activeIndex: index,
      playing: true,
    });

    if (isValidFunction(onPlaylistItemChange)) {
      onPlaylistItemChange({
        link: activeItem?.permalink,
        title: activeItem?.title,
      });
    }
  };

  /**
   * Triggered for when player playlsit is ready
   */
  loadPlaylist() {
    const { loading } = this.state;

    if (loading) {
      this.setState({ loading: false });
    }
  }

  /**
   * Add items to the current playlist
   * @param {string} videos new videos
   */
  onNewVideos(videos) {
    if (isValidArray(videos)) {
      const { userLocation } = this.props;
      const { content } = this.state;
      const parsedVideos = parsePlaylistItems(videos, this.isWorldCupMVP, userLocation);
      this.setState({
        content: [...content, ...parsedVideos],
      });

      appendVideos(parsedVideos, {}, this.currentNodeId);
    }
  }

  /**
   * Renders the items in the content list
   * @returns {JSX}
   */
  renderContent() {
    const {
      activeIndex,
      content,
      loading,
    } = this.state;

    const {
      variant,
      isLivestreamPage,
      widgetData,
      isNewsDigitalChannel,
    } = this.props;
    const { uid } = widgetData;
    return this.renderPlaylist({
      device: this.device,
      contents: content,
      infiniteScroll: true,
      infiniteLimit: isLivestreamPage ? LIVE_PLAYLIST_LIMIT : VIDEO_PLAYLIST_LIMIT,
      isNewsDigitalChannel,
      activeIndex,
      layout: HORIZONTAL,
      loading,
      onClick: this.onPlaylistItemClick,
      onNewVideos: this.onNewVideos,
      variant,
      theme: this.theme,
      widgetContext: {},
      hideActionBar: true,
      uid,
    });
  }

  /**
   * Switch active tab
   * @param {number} tabIndex active tab
   * @returns {function}
   */
  switchTab(tabIndex) {
    return () => this.setState({ activeTab: tabIndex });
  }

  /**
   * Render Playlist with tabs if available
   * @param {Object} playlistProps properties for the playlist
   * @returns {JSX}
   */
  renderPlaylist(playlistProps) {
    const { tab } = this.props;
    const { activeTab } = this.state;

    if (tab) {
      return (
        <>
          {(activeTab === 0 && tab?.content)
            || (activeTab === 1 && (
              <PlaylistCards {...playlistProps} />
            ))}
        </>
      );
    }

    return <PlaylistCards {...playlistProps} />;
  }

  /**
   * Render Tabs if available
   * @returns {JSX}
   */
  renderTabs() {
    const { tab } = this.props;
    const { activeTab } = this.state;

    return (
      <>
        {tab && (
          <Tabs theme={this.theme}>
            <Tab
              label={tab.label}
              key="tab-0"
              type="button"
              onClick={this.switchTab(0)}
              activeTab={activeTab === 0}
              theme={this.theme}
            />
            <Tab
              label={localization.get('videos')}
              type="button"
              key="tab-1"
              activeTab={activeTab === 1}
              onClick={this.switchTab(1)}
              theme={this.theme}
            />
          </Tabs>
        )}
      </>
    );
  }

  /**
   * render
   * @returns {JSX}
   */
  render() {
    const {
      autoplay,
      digitalChannelSchedule,
      disableEnVivoLabel,
      embedVideo,
      hideMeta,
      hidePlaylist,
      isLivestreamPage,
      isNewsDigitalChannel,
      onClick,
      primaryTag,
      program,
      simple,
      smallMeta,
      stickyZIndex,
      variant,
      widgetData,
    } = this.props;

    const {
      captions,
      isSensitive,
      type,
      showUpdateDate,
      updateDate,
    } = widgetData;

    const {
      content,
      activeIndex,
      playing,
    } = this.state;

    const activeItem = content?.[activeIndex] || {};
    const {
      image,
      identifier,
      mcpid,
      videoType,
    } = activeItem;

    const video = {
      ...activeItem,
      isLivestream: videoType === 'livestream',
    };

    const localStyle = {
      zIndex: stickyZIndex,
    };

    /**
     * videoBlock - is only a function so `style` can be applied dynamically
     * @param {Object} style obj to apply
     * @returns {JSX}
     */
    const videoBlock = (style) => {
      const {
        allowAnchor,
        disableVideoAds,
        children,
        controls,
        fullWidth,
        isPrendeTV,
        repeat,
      } = this.props;

      const {
        livestreamId,
      } = widgetData;

      const videoProps = {
        allowAnchor,
        autoplay,
        controls,
        digitalChannelSchedule,
        disableEnVivoLabel,
        disableVideoAds,
        embedVideo,
        sticky: true,
        mcpid: this.currentMcpId || mcpid || identifier,
        isSensitive,
        livestreamId,
        nodeId: this.currentNodeId,
        image,
        isPrendeTV,
        playlistItem: activeIndex,
        onNext: this.makeActive,
        onPlay: this.loadPlaylist,
        playingStatus: playing,
        pageData: this.pageData,
        env: getRequestParams(Store).mode,
        variant,
        isVideoDetail: type === 'video',
        style,
        updateMetadata: false,
        fmgCall: {
          name: 'playlist',
        },
        isPlaylist: true,
        playlistContent: content,
        placeholderId: this.placeholderId,
        program,
        repeat,
        uid: video.uid,
        uri: video.uri,
        title: video.title,
        widgetData,
        playlist: content,
      };

      const VideoElement = children && children(videoProps) || (<Video {...videoProps} />);
      return (
        <ErrorBoundary>
          {fullWidth ? (
            <FullWidth breakpoints={['xxs']}>
              {VideoElement}
            </FullWidth>
          ) : VideoElement}
        </ErrorBoundary>
      );
    };

    /**
     * videoMetaBlock
     * @returns {JSX}
     */
    const videoMetaBlock = () => {
      return (
        <VideoMeta
          authors={video.authors}
          captions={captions}
          currentMcpId={this.currentMcpId}
          description={video.description}
          device={this.device}
          disableEnVivoLabel={disableEnVivoLabel}
          hidePlaylist={hidePlaylist}
          index={activeIndex}
          isLivestreamPage={isLivestreamPage}
          isNewsDigitalChannel={isNewsDigitalChannel}
          mcpid={video.mcpid || video.identifier}
          nodeId={this.currentNodeId}
          onClick={onClick}
          pageData={this.pageData}
          permalink={video.permalink || video.uri}
          primaryTag={primaryTag}
          program={program}
          shareButtonClick={this.shareButtonHandler}
          sharingOptions={video.sharingOptions}
          showLiveLabel={
            video.isLivestream
            || (isLivestreamPage && activeIndex === 0 && !disableEnVivoLabel)
          }
          showUpdateDate={showUpdateDate}
          simple={simple}
          smallVersion={smallMeta}
          theme={this.theme}
          title={video.title}
          uid={video.uid}
          uri={video.uri}
          updateDate={updateDate}
          variant={variant}
          video={video}
        />
      );
    };

    return (
      <Provider store={Store}>
        <ErrorBoundary>
          <div
            className={classNames(
              Styles.videoWrapper,
              {
                [Styles.videoFullWrapper]: hidePlaylist,
                'uvs-container': !hideMeta,
              }
            )}
          >
            <div className="row no-gutters">
              <div className={classNames('col-12', { 'col-md-9 col-lg-8': !hidePlaylist })}>
                { videoBlock(this.device !== 'desktop' ? localStyle : {}) }
                { !hideMeta && (
                  videoMetaBlock()
                )}
              </div>
              { !hidePlaylist && (
                <div className="col-12 col-md-3 col-lg-4">
                  {this.isMobile && this.renderTabs()}
                  {isNewsDigitalChannel && this.isMobile && (
                    <MobileEpgWrapper>
                      <Epg digitalChannelSchedule={digitalChannelSchedule} />
                    </MobileEpgWrapper>
                  )}
                  {isNewsDigitalChannel && (
                    <BannerLinkWrapper
                      onClick={anchorTracking({
                        title: video.title,
                        uid: video.uid,
                        url: this.urlPrendeTV,
                      })}
                    >
                      <IFrameWrapper
                        width="100%"
                        height="100%"
                        src={this.isVixEnabled ? VIX_BANNER : PRENDETV_BANNER}
                      />
                    </BannerLinkWrapper>
                  )}
                  <PlaylistOuter>
                    {!this.isMobile && this.renderTabs()}
                    {this.renderContent()}
                  </PlaylistOuter>
                </div>
              )}
            </div>
            {isNewsDigitalChannel && !this.isMobile && (
              <DesktopEpgWrapper>
                <Epg digitalChannelSchedule={digitalChannelSchedule} />
              </DesktopEpgWrapper>
            )}
          </div>
        </ErrorBoundary>
      </Provider>
    );
  }
}

VideoPlayerComponent.defaultProps = {
  allowAnchor: true,
  autoplay: true,
  embedVideo: false,
  fullWidth: false,
  hideMeta: false,
  hidePlaylist: false,
  isNewsDigitalChannel: false,
  isPrendeTV: false,
  sharing: {
    options: {},
  },
  smallMeta: false,
  stickyZIndex: 999999,
  variant: 'light',
  userLocation: US,
};

VideoPlayerComponent.propTypes = {
  allowAnchor: PropTypes.bool,
  autoplay: PropTypes.bool,
  captions: PropTypes.array,
  children: PropTypes.object,
  controls: PropTypes.bool,
  description: PropTypes.string,
  digitalChannelSchedule: PropTypes.array,
  disableVideoAds: PropTypes.bool,
  disableEnVivoLabel: PropTypes.bool,
  embedVideo: PropTypes.bool,
  fullWidth: PropTypes.bool,
  hasCustomPlaylist: PropTypes.bool,
  hideMeta: PropTypes.bool,
  hidePlaylist: PropTypes.bool,
  isPrendeTV: PropTypes.bool,
  livestreamId: PropTypes.string,
  nodeId: PropTypes.string,
  image: PropTypes.object,
  isNewsDigitalChannel: PropTypes.bool,
  isLivestreamPage: PropTypes.bool,
  isSensitive: PropTypes.bool,
  mcpid: PropTypes.string,
  onClick: PropTypes.func,
  onPlaylistItemChange: PropTypes.func,
  playlist: PropTypes.array,
  primaryTag: PropTypes.object,
  program: PropTypes.object,
  publishDate: PropTypes.string,
  repeat: PropTypes.bool,
  richTextDescription: PropTypes.array,
  setPlaylistClicked: PropTypes.func,
  shortDescription: PropTypes.string,
  smallMeta: PropTypes.bool,
  source: PropTypes.string,
  title: PropTypes.string,
  uid: PropTypes.string,
  uri: PropTypes.string,
  sharing: PropTypes.shape({
    options: PropTypes.object,
  }),
  showUpdateDate: PropTypes.bool,
  simple: PropTypes.bool,
  stickyZIndex: PropTypes.number,
  tab: PropTypes.object,
  type: PropTypes.string,
  updateDate: PropTypes.string,
  variant: PropTypes.oneOf(['light', 'dark']),
  videoPlaylist: PropTypes.array,
  widgetData: PropTypes.object,
  userLocation: PropTypes.string,
};

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @returns {{matches: Array}}
 */
export const mapStateToProps = (state) => {
  const userLocation = userLocationSelector(state);
  return {
    userLocation,
  };
};

export default connect(
  mapStateToProps,
  {
    setPlaylistClicked: videoActions.setPlaylistClicked,
  },
)(VideoPlayerComponent);
