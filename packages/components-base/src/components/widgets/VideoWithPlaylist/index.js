import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { LIVE } from '@univision/fe-commons/dist/constants/labelTypes';

import Store from '@univision/fe-commons/dist/store/store';
import {
  getPageData,
  getTheme,
  getRequestParams,
  getDevice,
} from '@univision/fe-commons/dist/store/storeHelpers';
import * as videoActions from '@univision/fe-commons/dist/store/actions/video-actions';
import {
  getKey,
  hasKey,
  isValidArray,
  isValidObject,
  exists,
} from '@univision/fe-commons/dist/utils/helpers';
import formatDate from '@univision/fe-utilities/helpers/date/formatDate';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import VideoTracker from '@univision/fe-commons/dist/utils/tracking/tealium/video/VideoTracker';
import features from '@univision/fe-commons/dist/config/features';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { pauseAnyPlayerPlaying } from '@univision/fe-commons/dist/utils/video';
import ResponsivePlaylist from '@univision/fe-video/dist/components/playlist/ResponsivePlaylist';

import {
  parsePlaylistItems,
  getImagesForVideoSDK,
  generateVideoPlayerId,
  fetchVideoMetadata,
} from '@univision/fe-video/dist/helpers';

import VideoPlaylistPlayerWrapper from '@univision/fe-video/dist/components/player/VideoPlaylistPlayerWrapper';

import ShareBar from '../../ShareBar';
import TopicBar from '../../TopicBar';
import FullWidth from '../../FullWidth';
import Title from '../../Title';
import Label from '../../Label';
import Caption from '../../Caption';
import Author from '../../Author';
import Clickable from '../../Clickable';

import Styles from './VideoWithPlaylist.scss';

/**
 * VideoWithPlaylist
 * @deprecated
 * @param {Object} props the components content
 */
export class VideoWithPlaylistComponent extends React.Component {
  /**
   * setup state and bind methods
   * @param  {Object} props component props
   */
  constructor(props) {
    super(props);

    this.makeActive = this.makeActive.bind(this);
    this.onPlaylistItemClick = this.onPlaylistItemClick.bind(this);
    this.updatePlaylist = this.updatePlaylist.bind(this);
    this.shouldShowPlaylist = this.shouldShowPlaylist.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.onShareClick = this.onShareClick.bind(this);
    this.device = getDevice(Store);
    this.isShow = features.shows.showsRedesign();
    this.variant = this.isShow ? 'dark' : 'light';
    this.state = {
      activeIndex: 0,
      playlist: [],
      tabs: this.getTabs(),
      activeTab: 0,
    };
    const {
      settings,
      uid: propsUid,
    } = this.props;
    const uid = propsUid || settings?.uid;
    this.placeholderId = uid || generateVideoPlayerId(false);
    this.currentNodeId = (uid) ? `player-${uid}` : generateVideoPlayerId();
    this.parseContent();
    this.getPlaylistSettings();
    this.playlistLoaded = false;
  }

  /**
   * Get the settings for the type of playlist
   */
  getPlaylistSettings() {
    const { settings, content } = this.props;
    const { tabs } = this.state;
    const mcpIds = content?.map(item => item.mcpid);
    const secondTab = getKey(tabs, '1.content', []);

    if (settings.soccerMatch) {
      this.playlistSettings = {
        type: 'soccer',
        ...settings.soccerMatch,
      };
    } else if (settings.livestream) {
      this.playlistSettings = {
        type: 'livestream',
        ...settings.livestream,
        mcpIds,
      };
    } else if (isValidArray(secondTab)) {
      this.playlistSettings = {
        type: 'multitab',
        tabs: [mcpIds, secondTab.map(i => i.mcpid)],
      };
    } else {
      this.playlistSettings = {
        type: 'static',
        mcpIds,
      };
    }
  }

  /**
   * set activeIndex state and fires the video tracker event
   * @param {number} activeIndex the new playlistItem index
   */
  onPlaylistItemClick(activeIndex) {
    const { setPlaylistClicked } = this.props;

    this.makeActive(activeIndex);
    setPlaylistClicked(true);
    VideoTracker.track(VideoTracker.events.playlistItemClick);
  }

  /**
   * Track clicks on social sharing
   * @param {string} name Social network name
   * @param {Object} shareData Contextual data
   */
  static onSocialSharingClick(name, shareData) {
    SocialTracker.track(SocialTracker.events.share, { name, ...shareData });
    pauseAnyPlayerPlaying(null, true);
  }

  /**
   * take prizma playlist items, map values so PlaylistItem can consume them,
   * and store on state.
   * @param {Array} items The video playlist items from Prizma
   * @returns {*[]}
   */
  onPlaylistInitialized() {
    return (items) => {
      this.setState({ showTabButtons: true });
      this.fetchVideoMetadata(parsePlaylistItems(items, {}, this.content));
    };
  }

  /**
   * Gets the tabs of video items
   * @returns {*[]}
   */
  getTabs() {
    const tabs = [];
    const {
      settings: { mainTabLabel, otherTabs },
      content: mainTabContent,
    } = this.props;
    tabs.push({ label: mainTabLabel, content: mainTabContent });
    if (otherTabs) {
      const [secondTab] = otherTabs;
      if (secondTab && secondTab.label && secondTab.content) {
        tabs.push({ ...secondTab });
      }
    }
    return tabs;
  }

  /**
   * Fetches video metadata to use on analytics
   * @param {*[]} playlist list of videos to play
   */
  async fetchVideoMetadata(playlist) {
    const { content } = this.props;
    let metadata = {};
    let mcpIds = [];

    this.setState({ showTabButtons: true });

    if (isValidObject(this.metadata) || !isValidArray(content)) {
      this.setState({ playlist });
      return;
    }

    /**
     * Get mcpIds from the array of videos
     * @param {*[]} videos array of videos
     * @returns {*[]}
     */
    const getMcpIds = (videos) => {
      /* eslint-disable react/destructuring-assignment */
      const ids = [];

      if (isValidArray(videos)) {
        videos.forEach((video) => {
          const id = getKey(video, 'mcpid', null);
          if (id) {
            ids.push(id);
          }
        });
      }
      return ids;
    };

    if (hasKey(this.state, 'tabs.0.content')) {
      mcpIds = mcpIds.concat(getMcpIds(this.state.tabs[0].content));
    }
    if (hasKey(this.state, 'tabs.1.content')) {
      mcpIds = mcpIds.concat(getMcpIds(this.state.tabs[1].content));
    }

    if (!isValidArray(mcpIds)) {
      return;
    }

    try {
      metadata = await fetchVideoMetadata(mcpIds);
    } catch (e) {
      metadata = {};
    }

    if (isValidArray(metadata)) {
      const [firstVideoMetadata] = metadata;
      const newFirstVideoMetadata = {
        ...firstVideoMetadata,
        index: this.state.activeIndex,
      };
      global.window.FMG.trigger('VideoMeta', null, newFirstVideoMetadata, this.currentNodeId);

      metadata = Object.assign({}, ...metadata.map(item => ({ [item.mcpid]: item })));
    }

    this.metadata = metadata;
    this.setState({ playlist, showPlaylist: false, showTabButtons: true });
  }

  /**
   * Updates the playlist with new items
   * @param {Array} items Videos to update on the playlist
   */
  updatePlaylist(items) {
    this.replaceContent = true;
    this.setState({ playlist: items });
  }

  /**
   * Shows the right playlist
   * @param {bool} showPlaylist show or not the playlist
   */
  shouldShowPlaylist(showPlaylist) {
    this.setState({ showPlaylist });
  }

  /**
   * makeActive
   * @param  {number} activeIndex The 0-based index of contents to make active
   */
  makeActive(activeIndex) {
    this.setState({ activeIndex });

    if (!isValidObject(this.metadata)) return;

    const { playlist } = this.state;
    const mcpId = getKey(playlist, `${activeIndex}.mcpid`, null);
    const currentMetadata = getKey(this.metadata, mcpId, null);

    if (isValidObject(currentMetadata)) {
      currentMetadata.index = activeIndex;
      currentMetadata.mcpId = mcpId;
      // Playlist should update the metadata
      window.FMG.trigger('VideoMeta', null, currentMetadata, this.currentNodeId);
    }
  }

  /**
   * Switches the playlist tab
   * @param {number} i Index of the playlist to switch to
   */
  switchTab(i) {
    this.setState({ activeTab: i, playlist: [], activeIndex: 0 });
    this.makeActive(0);

    global.window.FMG.trigger('switchPlaylist', null, i, this.currentNodeId);
  }

  /**
   * Parse content array into an object of the type {123: {}, 456: {}}
   */
  parseContent() {
    const { content } = this.props;
    this.content = {};
    if (isValidArray(content)) {
      this.content = Object.assign({}, ...content.map(item => ({ [item.mcpid]: item })));
    }
  }

  /**
   * sharing click event handler
   * @param {string} name social media
   */
  onShareClick(name) {
    const { activeIndex } = this.state;
    const { content } = this.props;
    const currentItem = content[activeIndex] || content[0];
    const shareData = {
      primaryTag: currentItem.primaryTag,
      title: currentItem.title,
      uid: currentItem.uid || currentItem.contentId,
      type: 'video',
    };
    VideoWithPlaylistComponent.onSocialSharingClick(name, shareData);
  }

  /**
   * Render the Meta info including shareing bar
   * @param {Object} featured Data of active video
   * @param {Object} sharingOptions Data for sharing
   * @param {Object} shareData Contextual data
   * @returns {JSX}
   */
  renderMetaSharing(featured, sharingOptions) {
    const { playlist, activeIndex } = this.state;

    if (!isValidObject(featured)) return null;

    const {
      publishDate,
      liveDate,
      source,
    } = featured;

    const date = liveDate || publishDate;

    return (
      <div className={classnames('col-12', Styles.metaSharing)}>
        <div className="row">
          <p className={classnames('uvs-font-a-bold col-11 col-sm-6', Styles.videoMeta)}>
            {playlist[activeIndex] && source && (
              <strong className={Styles.source}>{source}</strong>
            )}
            {date && (
              <span className={classnames('uvs-font-a-regular', Styles.timestamp)}>
                {formatDate(new Date(date), 'es')}
              </span>
            )}
          </p>
          <div className={classnames('col-1 col-sm-6', Styles.shareContainer)}>
            <ShareBar
              stack
              mobileCollapse
              device={this.device}
              className={Styles.videoShare}
              sharingOptions={sharingOptions}
              iconSize="xsmall"
              onClick={this.onShareClick}
              theme={this.isShow ? 'light' : 'dark'}
            />
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render view
   * @returns {JSX}
   */
  render() {
    const {
      autoplay, settings, widgetContext, playlistView,
    } = this.props;
    let { content } = this.props;

    const {
      activeIndex,
      playlist,
      tabs,
      activeTab,
      showTabButtons,
      showPlaylist,
    } = this.state;

    if (this.replaceContent) {
      content = playlist;
    }

    const isValidContent = isValidArray(content);

    if (!isValidContent && !(hasKey(settings, 'livestream') || hasKey(settings, 'soccerMatch'))) return null;

    // if somehow activeIndex doesn't exist in the content array, fall back to the first video

    let featured = isValidContent && (content[activeIndex] || content[0]);
    const leadType = getKey(playlist, `${activeIndex}.leadType`);
    const typeContent = getKey(playlist, `${activeIndex}.type`);
    const videoType = getKey(playlist, `${activeIndex}.videoType`);

    const hasLiveStream = features.video.hasLivestream(leadType, typeContent, videoType);
    const isMultitab = tabs.length > 1;

    if (isMultitab && isValidArray(playlist)) {
      const tabsContent = getKey(tabs, [activeTab, 'content']);
      featured = isValidArray(tabsContent)
        && tabsContent.find(video => getKey(playlist, `${activeIndex}.mcpid`) === video.mcpid);
    }

    const mcpidPlaylist = getKey(playlist, [activeIndex, 'mcpid']);
    const isSameVideo = mcpidPlaylist === getKey(content, [activeIndex, 'mcpid']);
    if (!isSameVideo && mcpidPlaylist && !settings.soccerMatch) {
      featured = (isValidContent && content.find(item => item.mcpid === mcpidPlaylist)) || featured;
    }

    const mcpids = isMultitab
      ? [getImagesForVideoSDK(content), getImagesForVideoSDK(tabs[1].content)]
      : getImagesForVideoSDK(content);

    /**
     * When playlist contains a livestream, we check against content to display
     * player in fullview since playlist do have the livestream item and
     * we should also get display info from playlist, since content is empty
     */
    const hidePlaylist = (settings.livestream && !isValidContent)
      || (settings.soccerMatch
        && (!showPlaylist || !getKey(settings, 'soccerMatch.hasMatchHighlights', true)));

    if (settings.livestream && playlist[activeIndex]) {
      featured = playlist[activeIndex];
      featured = Object.assign({}, featured, this.content[featured.mcpid]);
      featured.caption = getKey(settings, 'livestream.image.caption', '');
      featured.credit = getKey(settings, 'livestream.image.credit', '');
      featured.liveDate = getKey(settings, 'livestream.updateDate');

      const authors = getKey(settings, 'livestream.authors', []);
      if (isValidArray(authors)) {
        const { title, firstName, lastName } = authors[0];

        featured.author = title;
        if (!featured.author && firstName && lastName) {
          featured.author = `${firstName} ${lastName}`;
        }
      }
    }

    const sharingOptions = getKey(featured, 'sharing.options', {});

    const theme = getTheme(Store);

    const commonProps = {
      ...featured,
      hidePlaylist,
      autoplay,
      mcpid: mcpids,
      onNext: this.makeActive,
      onPlaylistInitialized: this.onPlaylistInitialized(),
      pageData: getPageData(Store),
      env: getRequestParams(Store).mode,
      multitab: isMultitab,
      playlistContent: playlist,
      playlistItem: activeIndex,
      isPlaylist: true,
      updatePlaylist: this.updatePlaylist,
      shouldShowPlaylist: this.shouldShowPlaylist,
      playlistLoading: !isValidArray(playlist),
    };

    if ((settings.soccerMatch && !showPlaylist) || (settings.livestream && !isValidContent)) {
      commonProps.playlistLoading = false;
    }

    return (
      <div
        className={classnames('uvs-widget', Styles.playerContainer, { [Styles.dark]: this.isShow })}
      >
        <TopicBar
          settings={settings}
          separator="top"
          theme={theme}
          widgetContext={widgetContext}
          variant={this.variant}
        />
        <div className="row">
          <div
            className={classnames(
              'col-12',
              { 'col-md-10 col-lg-8 col-xl-10': hidePlaylist },
              { 'col-md-8 col-lg-8': !hidePlaylist && !playlistView }
            )}
            // TODO: use styled-components instead
            style={hidePlaylist ? {
              margin: '0 auto',
              textAlign: 'center',
            } : {}}
          >
            {hidePlaylist && settings.livestream && (
              <div className={Styles.headline}>
                <Label
                  className={Styles.headlineLabelTitle}
                  hasLiveIcon
                  label={localization.get('livestream')}
                  type={LIVE}
                />
                {featured.title && (
                  <Title className={Styles.fullTitle}>
                    {featured.title}
                  </Title>
                )}
                {featured.author && <Author title={featured.author} className={Styles.author} />}
              </div>
            )}
            <FullWidth breakpoints={['xxs', 'xs']}>
              <VideoPlaylistPlayerWrapper
                {...commonProps}
                ref={(v) => {
                  this.videoPlaylist = getKey(v, 'wrapper.current', v);
                }}
                settings={settings}
                nodeId={this.currentNodeId}
                placeholderId={this.placeholderId}
                activeIndex={activeIndex}
              />
              {hidePlaylist && settings.livestream && (
                <div className={Styles.livestreamInfo}>
                  <div className={classnames(Styles.videoInfo)}>
                    {this.renderMetaSharing(featured, sharingOptions)}
                  </div>
                </div>
              )}
            </FullWidth>
            {featured.caption && featured.credit && (
              <div className={`${Styles.caption}`}>
                <Caption content={featured.caption} credit={featured.credit} type="article" />
              </div>
            )}
            {!exists(playlistView) && !hidePlaylist && (
              <div className={classnames(Styles.videoInfo, { [Styles.dark]: this.isShow })}>
                <div className="col-12">
                  {playlist[activeIndex] && (
                    <Title className={Styles.title}>
                      {hasLiveStream && (
                        <Label
                          className={Styles.labelTitle}
                          hasLiveIcon
                          label={localization.get('livestream')}
                          type={LIVE}
                        />
                      )}
                      {featured.title}
                    </Title>
                  )}
                </div>
                {this.renderMetaSharing(featured, sharingOptions)}
              </div>
            )}
          </div>
          {!hidePlaylist && (
            <div className={classnames('col-12', { 'col-xs-12 col-md-4 col-lg-4': !playlistView })}>
              {isMultitab && showTabButtons && (
                <div className={Styles.buttons}>
                  {tabs.map((tab, i) => (
                    <Clickable
                      label={tab.label}
                      key={`tab-${tab.label}`}
                      type="button"
                      appearance={i === activeTab ? 'primary' : 'secondary'}
                      onClick={() => this.switchTab(i)}
                      theme={theme}
                      className={Styles.button}
                    />
                  ))}
                </div>
              )}
              <ResponsivePlaylist
                content={playlist}
                activeIndex={activeIndex}
                onClick={this.onPlaylistItemClick}
                playlistView={playlistView}
                variant={this.variant}
                widgetContext={widgetContext}
                playlistMeta={this.metadata}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

/**
 * propTypes
 * @param {Array} content the content array from the API
 * @param {String} direction which direction the playlist flows
 */
VideoWithPlaylistComponent.propTypes = {
  autoplay: PropTypes.bool,
  content: PropTypes.array,
  playlistView: PropTypes.string,
  setPlaylistClicked: PropTypes.func,
  settings: PropTypes.shape({
    uid: PropTypes.string,
    mainTabLabel: PropTypes.string,
    otherTabs: PropTypes.array,
    soccerMatch: PropTypes.object,
    livestream: PropTypes.object,
  }),
  uid: PropTypes.string,
  widgetContext: PropTypes.object,
};

VideoWithPlaylistComponent.defaultProps = {
  settings: {},
};

export default connect(
  null,
  {
    setPlaylistClicked: videoActions.setPlaylistClicked,
  }
)(VideoWithPlaylistComponent);
