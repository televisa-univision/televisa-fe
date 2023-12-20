/* eslint-disable react/destructuring-assignment */
/* eslint-disable babel/no-unused-expressions */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
// do not remove this loader
import '../VideoPlayerLoader';
import classnames from 'classnames';
import { connect, ReactReduxContext } from 'react-redux';
import localStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';
import throttle from 'lodash.throttle';
// Use W3C official polyfill
import 'intersection-observer';
import Store from '@univision/fe-commons/dist/store/store';
import RouterContext from '@univision/fe-commons/dist/components/RouterContext';
import {
  VIDEO_PLAY_REASON_VIEWABLE,
  TIME_DISCONNECT_OBSERVER,
  AIRPLAY,
} from '@univision/fe-commons/dist/constants/video';
import { USER_ID } from '@univision/fe-commons/dist/constants/personalization';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import * as languages from '@univision/fe-utilities/localization/languages';

import {
  getContentType,
  getCommonTracking,
  getPageData,
  getNielsenTracking,
} from '@univision/fe-commons/dist/store/storeHelpers';

import {
  hasKey,
  getKey,
  isInViewport,
  isEqual,
  isValidFunction,
} from '@univision/fe-commons/dist/utils/helpers';

import {
  closeRadioIfPlayerIsEnabled,
  doIfPlayerExists,
  getPlayerCurrentState,
  getPlayerInstance,
  getPlayerPlaylist,
  getWrapperElement,
  getPlaceholderElement,
  isAnyAutoplayPlayer,
  isAnyPlayerAnchored,
  isAnyPlayerPlaying,
  isPlayerBufferingOrPlaying,
  isWrapperAvailable,
  pauseAnyPlayerPlaying,
  removeAnyPlayerAnchored,
  removeVideoInstance,
  setPlayerAnchorState,
  getVideoUserGroup,
  isPipSupported,
  isPipRunning,
  getCastingReceiverId,
  getCastingPlatform,
  getCurrentIndex,
  getVideoInstance,
} from '@univision/fe-commons/dist/utils/video';

import VideoAds from '@univision/fe-commons/dist/utils/ads/Video/videoAdsSettings';
import features from '@univision/fe-commons/dist/config/features';
import thirdPartyFeatures from '@univision/fe-commons/dist/config/features/thirdParties';

import action, {
  setPlaylistClicked,
  castingAdBreakEnd,
  castingAdBreakStart,
  castingAdPod,
  castingDisabled,
  castingEnabled,
} from '@univision/fe-commons/dist/store/actions/video-actions';

import tudnBg from '@univision/fe-commons/dist/assets/images/match-loading.png';
import castingSlate from '@univision/fe-commons/dist/assets/images/casting-slate.png';
import {
  isTudnSiteSelector,
  radioAnchorSelector,
  userLocationSelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';

import { getUserData } from '@univision/fe-commons/dist/utils/tracking/trackingHelpers';
import VideoPlayerWrapper from '../VideoPlayerWrapper';

import { generateVideoPlayerId, checkFreeVideoPreview } from '../../helpers';

import VideoPopupsWrapper from '../VideoPopupsWrapper';
import VideoPlaceholder, { TYPE_LOADER } from '../VideoPlaceholder';
import VideoMetadata from '../VideoMetadata';

import Styles from './Video.scss';
import StyledComponent from './Video.styles';

const PlaceholderWrapper = styled.div`${StyledComponent.placeholderWrapper}`;

const UNIVISION_FALLBACK_IMAGE = 'Univision Fallback Image';

/**
 * Video component
 */
class VideoComponent extends React.Component {
  /**
   * Set video state to paused when share icons are clicked
   */
  static onPauseShareClick() {
    pauseAnyPlayerPlaying(null, true);
  }

  /**
   * constructor
   * @param {Object} props the component props
   */
  constructor(props) {
    super(props);
    this.placeholderId = props.placeholderId || props.uid || generateVideoPlayerId(false);
    this.nodeId = props.nodeId || generateVideoPlayerId();

    this.pageData = getPageData(Store);
    this.isTudnSite = isTudnSiteSelector(Store.getState());
    this.contentType = getContentType(Store);

    this.isMobile = getKey(this.pageData, 'device', 'desktop') === 'mobile';
    this.theme = getKey(this.pageData, 'theme', {});
    this.data = getKey(this.pageData, 'data', {});
    this.playlist = props.playlistContent;

    this.onCloseAnchorVideo = this.onCloseAnchorVideo.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onPauseShareClick = this.constructor.onPauseShareClick.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.geoGateError = this.geoGateError.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onPlaylistInitialized = this.onPlaylistInitialized.bind(this);
    this.onSdkPlaylistItem = this.onSdkPlaylistItem.bind(this);
    this.onTime = this.onTime.bind(this);
    this.enableAnchorVideo = throttle(this.enableAnchorVideo.bind(this), 250);
    this.triggerNativePIP = this.triggerNativePIP.bind(this);
    this.onCast = this.onCast.bind(this);
    this.adBreakEnd = this.adBreakEnd.bind(this);
    this.adBreakStart = this.adBreakStart.bind(this);
    this.dispatchEnableCast = this.dispatchEnableCast.bind(this);
    this.shouldCastingKeepState = this.shouldCastingKeepState.bind(this);
    this.isSection = features.video.isSection();
    this.isVideoLayout = features.video.isVideoLayout();
    this.isSticky = features.video.sticky();
    this.enableNativePip = features.video.enableNativePip() && isPipSupported();
    this.castingPlatform = features.video.enableCasting() && getCastingPlatform();
    this.castingSource = features.video.enableCasting() && 'web';
    this.castingPreviously = false;

    this.fmgReady = false;
    this.playerReady = false;
    this.isCastingActive = false;
    this.castingTimeout = null;
    this.castingKeepState = false;

    this.state = {
      casting: false,
      castingAvailable: false,
      castingDevice: null,
      contentPlaying: false,
      geoGateError: false,
      playing: false,
    };

    // pip initial logic
    this.deferPosition = throttle(this.movePIPWrapperElement.bind(this), 500);
    this.mutationContainerBodySelector = 'body';
    this.mutationContainerSelector = '#app-root';
    this.mutationOptions = {
      attributes: true,
      attributeFilter: ['class'],
      childList: true,
      subtree: true,
    };
    this.mutationOptionsBody = {
      childList: true,
    };

    // check if this new video is playing on any player to persist
    const playerId = isAnyPlayerPlaying();
    const { isNewsDigitalChannel } = this.props;

    // check if this new video is playing on any player to persist
    if ((playerId === this.nodeId)
      || (isNewsDigitalChannel && isPlayerBufferingOrPlaying(this.nodeId))) {
      // use same player
      this.nodeId = playerId || this.nodeId;

      // avoid any new video initialize
      this.initted = true;
    } else if (this.isVideoLayout) {
      removeAnyPlayerAnchored(this.nodeId);
    }

    this.anchored = !this.isVideoLayout && isAnyPlayerAnchored() === this.nodeId;
  }

  /**
   * Set up the userId in the video ads
   */
  sendUserIdToFMG() {
    const userStored = localStorage.getObject(USER_ID)?.univision_user_id;
    const { userId } = this.props;
    const user = userId || userStored;
    if (user && !this.userIdSent) {
      this.userIdSent = true;
      global.window?.FMG?.trigger(
        'SDK.onUserId', null, { userId: user }, this.nodeId
      );
    }
  }

  /**
   * Set up the video SDK
   */
  componentDidMount() {
    this.initialPath = window.location.pathname;

    if (this.initted && !this.isVideoLayout) {
      // set scroll events if player is persited
      this.addScrollEvent();

      // Place the player on container if in view when player is persisted
      this.enableAnchorVideo();
      this.setState({ contentPlaying: true });
    }

    // If player is persisted make sure to persist casting state
    const state = this.context?.store?.getState?.();
    const { video } = state || {};
    if (this.initted && this.nodeId === video?.castingNodeId && video?.castingEnabled) {
      this.setState({ casting: true, castingDevice: video?.castingVideoData?.deviceName });
    }

    this.sendUserIdToFMG();
  }

  /**
   * update player if mcpid changes
   * @param {Object} prevProps the previous props
   */
  componentDidUpdate(prevProps) {
    const {
      playlistClicked,
      playlistItem,
      setPlaylistClicked: setClicked,
      isCastingEnabled,
    } = this.props;

    if (typeof playlistItem !== 'undefined') {
      if (playlistClicked && playlistItem !== prevProps.playlistItem) {
        this.jumpToPlaylistItem(playlistItem);
        setClicked(false);
      }
    }

    // When the user ends a casting session inside video layout
    if (this.isVideoLayout && !isCastingEnabled) {
      // Pauses the video to stop chartbeat from throwing errors
      pauseAnyPlayerPlaying(this.nodeId);
    }

    // update wrapper props on component update, anchored, playlist...
    this.createOrUpdatePIPPlayerElement();
    this.sendUserIdToFMG();
  }

  /**
   * Update the component when the data is loaded and the component is visible
   * - remove pageData for props validation
   * @param {Object} nextProps the next set of props
   * @param {Object} nextState the next set of props
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    const { pageData: nextPagaData, ...restNextProps } = nextProps;
    const { pageData, ...restProps } = this.props;

    return !isEqual(restProps, restNextProps) || !isEqual(nextState, this.state);
  }

  /* eslint camelcase: "off" */
  /* eslint-disable react/sort-comp */
  /**
   * update playlistItem if it changes
   * @param {Object} nextProps the incoming props
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { language, activeTab } = this.props;
    // Call the given FMG api function to reload the player, we can only reload it once
    // But only reload again if language change
    if ((nextProps.reloadPlayer && !this.playerReloaded)
      || (this.playerReloaded && (language !== nextProps.language)
        || activeTab !== nextProps.activeTab)) {
      // Clear previous FMG events, to avoid duplicated events everytime we change language
      global.window?.FMG?.clearInstanceEvents(this.nodeId);

      // Reset flags to initialize events again
      this.initted = false;
      this.fmgReady = false;
      this.playerReady = false;
      this.languageChanged = language !== nextProps.language;
      this.playlist = nextProps.playlist;
      this.autoplay = VIDEO_PLAY_REASON_VIEWABLE;

      this.initVideo();

      this.playerReloaded = true;

      // Reset language changed after setting up video
      this.languageChanged = false;
    }
  }

  /**
   * Unroll FMG Video SDK configs
   */
  componentWillUnmount() {
    const { disableAnchor } = this.props;

    // remove this event to avoid side effects
    this.removeScrollEvent();
    // clear mutation oberver
    this.disconnectOberservers();
    // remove sticky mode on transition
    this.isSticky = false;
    // remove casting timeout
    clearTimeout(this.castingTimeout);

    if (isPlayerBufferingOrPlaying(this.nodeId) && !disableAnchor) {
      if (!this.anchored) {
        // update anchor player state
        setPlayerAnchorState(this.nodeId, true);
        this.anchored = true;
        // close radio player
        const state = this.context?.store?.getState?.();
        closeRadioIfPlayerIsEnabled(state, this.nodeId);
        // move player to placeholder position
        this.movePIPWrapperElement();
        this.dispatchEnableCast();
      }
      clearTimeout(this.timeout);
      // video is playing, move to anchor mode
      // video is anchor but sticky, update to remove sticky mode
      this.createOrUpdatePIPPlayerElement();
    } else if (
      getPlayerCurrentState(this.nodeId) !== 'buffering'
      || disableAnchor
      || this.initialPath !== window.location.pathname
    ) {
      // unmount video if not buffering or if initial page changed
      delete global.window?.FMG.player?.instance[this.nodeId];
      this.deletePIPWrapperElement();
    }

    // Anchor video and native pip should never co-exist.
    // Native PIP Should be removed when component unmounts since anchor loads
    global.window?.FMG?.trigger('Video.onPIPUpdate', null, { load: false }, this.nodeId);
  }

  /**
   * Disconnect observer and position listeners
   */
  disconnectOberservers() {
    this.mutationObserver?.disconnect?.();
    this.mutationObserver = null;
    this.mutationObserverBody?.disconnect?.();
    this.mutationObserverBody = null;
    window.removeEventListener('resize', this.deferPosition);
  }

  /**
   * Create logic for video. Observer, wrapper element and playlist logic
   */
  initVideoWrapperLogic() {
    this.mutationContainer = document.querySelector(this.mutationContainerSelector);
    // create observer handler on component mount to detect changes on placeholder
    this.observeVideoPlaceholder();

    // create initial observer handler on component mount to detect changes on body during 8 seg
    this.observeVideoPlaceholderBody();

    // Create wrapper element
    this.createPIPWrapperElement();

    // if video already exist, attach current playlist to this component
    if (this.initted) {
      // load events and functions to the current video
      this.initVideo();
      // get playlist from current video to initialice playlist ui
      const playlist = getPlayerPlaylist(this.nodeId);
      if (playlist) {
        this.onPlaylistInitialized(playlist);
      }
    }
  }

  /**
   * Call a few methods to get JWPlayer set up.
   */
  initVideo() {
    const { onSdkReady } = this.props;
    if (!this.fmgReady) {
      this.fmgReady = true;
      const beforeInit = this.initted;
      if (!this.initPlayer() && !this.isVideoLayout) {
        this.onPlayerReady();
      } else {
        this.setListeners();
        if (this.isVideoLayout && beforeInit) {
          this.onPlayerReady();
        }
      }
      // call ready callback
      if (onSdkReady) {
        onSdkReady();
      }
    }
  }

  /**
   * Add scroll callback depending on content type
   */
  addScrollEvent() {
    if (!this.scrollEvent && !(!this.isMobile && this.isVideoLayout)) {
      document.addEventListener('scroll', this.enableAnchorVideo);
      this.scrollEvent = true;
    }
  }

  /**
   * Remove scroll listeners
   */
  removeScrollEvent() {
    document.removeEventListener('scroll', this.enableAnchorVideo);
    this.scrollEvent = false;
  }

  /**
   * invoked by JWPlayer when the instance is ready to go
   */
  onPlayerReady() {
    if (!this.playerReady) {
      doIfPlayerExists(this.nodeId, (player) => {
        /* istanbul ignore next */
        global.window.FMG.on('SDK.playlist_item', (item) => {
          this.onSdkPlaylistItem(item);
        }, this.nodeId);
        this.setPlayerEvents(player);
      });
      this.playerReady = true;
    }

    this.setState({ contentPlaying: true });
  }

  /**
   * Triggers Native PIP Event to load it or remove it
   * @param {Object} viewable if current player is visible on screen or not
   * @param {boolean} appChanged if app changed
   */
  triggerNativePIP({ viewable }) {
    if (!this.enableNativePip) {
      return;
    }

    const isPlaying = isPlayerBufferingOrPlaying(this.nodeId);

    if (!viewable && document.hidden && isPlaying) {
      global.window?.FMG?.trigger('Video.onPIPUpdate', null, { load: true }, this.nodeId);
    } else if (viewable && (this.anchored || this.isVideoLayout)) {
      global.window?.FMG?.trigger('Video.onPIPUpdate', null, { load: false }, this.nodeId);
    }
  }

  /**
   * Sets current video playing data in the store
   */
  dispatchEnableCast() {
    const {
      props: {
        castingEnabled: enableCast,
        image,
        playlistContent,
      },
      state: {
        casting,
        castingDevice,
      },
      nodeId,
    } = this;

    // Just to avoid incosistencies, check casting is on and the method exists
    if (casting && enableCast) {
      const item = playlistContent?.[getCurrentIndex(this.nodeId)];
      enableCast({
        nodeId,
        payload: {
          castingPlatform: this.castingPlatform,
          deviceName: castingDevice,
          image,
          isLiveStream: item?.isLivestream,
          hideCastingBar: !isAnyPlayerAnchored(),
          title: item?.title,
        },
      });
    }
  }

  /**
   * Listens to jw player on cast event
   * @param {Object} e - event
   */
  onCast(e) {
    const { active, available, deviceName } = e || {};

    const {
      props: {
        castingDisabled: disableCast,
        isCastingEnabled,
      },
      state: {
        casting,
      },
      nodeId,
    } = this;

    // Used for the green tooltip
    this.setState({ castingAvailable: !!available });

    // Let the store know this player is starting a casting session if there isn't one enabled
    if (!isCastingEnabled && !casting && active && isPlayerBufferingOrPlaying(nodeId)) {
      this.isCastingActive = true;
      this.setState({ casting: true, castingDevice: deviceName });
      this.dispatchEnableCast();

      // Patch to restart player state when casting is enabled on AirPlay
      // Remove after JW fix
      if (this.castingPlatform === AIRPLAY && !this.castingTimeout) {
        this.castingTimeout = setTimeout(() => {
          getPlayerInstance(nodeId).play();
        }, 1000);
      }
    }

    // This will remove the flag to keep the active state in case the user decides
    // to disconnect the device, so we can report it correctly to the webapp
    if (
      isCastingEnabled
      && casting
      && active
      && available
      && isPlayerBufferingOrPlaying(nodeId)
      && this.castingKeepState
    ) {
      this.castingKeepState = false;
    }

    // Let the store know this player is finishing the casting session if there is one enabled
    if (isCastingEnabled && casting && !active && !this.castingKeepState) {
      this.isCastingActive = false;
      this.setState({ casting: false, castingDevice: null });
      // Flag to mark this instance as previously playing
      this.castingPreviously = this.castingPlatform === AIRPLAY && this.isMobile;

      clearTimeout(this.castingTimeout);
      disableCast();
    }
  }

  /**
   * Flags the ad break as finished
   */
  adBreakEnd() {
    const { castingAdBreakEnd: endAdBreak } = this.props;
    const { casting } = this.state;

    if (casting) {
      endAdBreak();
    }
  }

  /**
   * Listens to ad play event
   * @param {Object} ad current ad pod
   */
  onAdPlay = ({ podcount, sequence }) => {
    const { castingAdPod: setCastingAdPod } = this.props;

    if (this.isCastingActive) {
      setCastingAdPod({ podcount, sequence });
    }
  }

  /**
   * Flags the ad break as started
   */
  adBreakStart() {
    const { castingAdBreakStart: startAdBreak } = this.props;
    const { casting } = this.state;

    if (casting) {
      startAdBreak();
    }
  }

  /**
   * Flags the player to keep casting status on when platform is AirPlay
   * Used when switching videos, because AirPlay kills the session momentarily
   * @param {string} target - target
   */
  shouldCastingKeepState() {
    // We could include both statements, but we don't wanna set a state when casting is off
    if (this.isCastingActive) {
      this.castingKeepState = this.castingPlatform === AIRPLAY;
    }
  }

  /**
   * Set player events
   * @param {Object} player - jw player instance
   */
  setPlayerEvents(player) {
    player.on('complete', this.onComplete);
    player.on('play adPlay', this.onPlay);
    player.on('pause adPause', this.onPause);
    player.on('mute', this.onMute);
    player.on('viewable', this.triggerNativePIP);
    player.once('time', this.onTime);

    // Will only listen if feature flag is enabled
    if (features.video.enableCasting()) {
      player.on('nextClick', this.shouldCastingKeepState);
      player.on('nextAutoAdvance', this.shouldCastingKeepState);
      player.on('adBreakStart', this.adBreakStart);
      player.on('adBreakEnd', this.adBreakEnd);
      player.on('adPlay', this.onAdPlay);
      player.on('cast', this.onCast);
    }
  }

  /**
   * Listens to mute player event
   * @param {Object} e - current mute event data
   */
  onMute = (e) => {
    const { casting } = this.state;
    const player = getPlayerInstance(this.nodeId);

    // in case of unmuting
    if (e && e.type === 'mute' && !e.mute
      && player.getState() === 'playing') {
      // If radio pip and playing pause it
      pauseAnyPlayerPlaying(player.id);
    }

    if (casting) {
      player.setVolume(e.mute ? 0 : 100);
    }
  }

  /**
   * Sets playing to true only once
   */
  onTime() {
    this.setState({ playing: true });
  }

  /**
   * invoked by FMG SDK when the anchor instance will be closed
   */
  onCloseAnchorVideo() {
    this.anchored = false;
    const player = getPlayerInstance(this.nodeId);
    if (player) {
      player.pause();
      // Make sure remove scroll listener
      this.scrollEvent = true;
      this.removeScrollEvent();
    }

    // update element with new anchor state
    this.createOrUpdatePIPPlayerElement();
    // move element to new position
    this.movePIPWrapperElement();

    // create observer handler again
    this.observeVideoPlaceholder();
  }

  /**
   * update states
   */
  onComplete() {
    // remove scroll listener
    this.removeScrollEvent();
  }

  /**
   * invoked by JWPlayer when video changes.
   * @param  {number} index the index of the video to be played
   */
  onSdkPlaylistItem({ index }) {
    const { onNext, playlistClicked } = this.props;
    if (this.playlistInitialized) {
      global.window.FMG.trigger('SDK.playlist_clicked', null, playlistClicked, this.nodeId);
      if (onNext) {
        onNext(index);
      }

      if (this.isCastingActive) {
        this.dispatchEnableCast();
      }
    }

    this.playlistInitialized = true;
  }

  /**
   * Method exclusively used to resume an AirPlay session on Safari Mobile
   * to avoid race conditions while multiple video instances are avaiable
   */
  resumeAirPlaySession = () => {
    this.castingPreviously = false;
    this.setState({ casting: true, castingDevice: AIRPLAY });
    this.dispatchEnableCast();
    removeAnyPlayerAnchored(this.node);
  }

  /**
   * Set current video state to playing
   * @param {Object} event - player event
   * newstate: "playing"
   * oldstate: "buffering"
   * playReason: "viewable / interaction"
   * reason: "playing"
   * type: "play"
   */
  onPlay(event) {
    const {
      disableAnchor,
      onPlay,
      skipPause,
      isCastingEnabled,
    } = this.props;
    const { casting } = this.state;

    if (isValidFunction(onPlay)) {
      onPlay(event);
    }

    this.setState({ contentPlaying: true });

    // Pause any player playing including radio on any other place
    if (!skipPause) {
      pauseAnyPlayerPlaying(this.nodeId);
    }

    // When anchor is disabled, position it once starts playing
    if (disableAnchor) {
      setTimeout(this.movePIPWrapperElement.bind(this), 200);
    }

    // add scroll event for anchor mode
    this.addScrollEvent();

    // Safari mobile airplay race condition patch for multiple video instances in same page
    if (
      this.castingPlatform === AIRPLAY
      && this.isMobile
      && isCastingEnabled
      && !casting
    ) {
      const remoteState = getPlayerInstance(this.nodeId)
        .getContainer()
        .querySelector('video')?.remote?.state;

      if (remoteState === 'connected') {
        this.castingTimeout = setTimeout(this.resumeAirPlaySession, 200);
      }

      if (this.castingPreviously && remoteState !== 'connected') {
        this.resumeAirPlaySession();
      }
    }
  }

  /**
   * Set current video state to paused
   */
  onPause() {
    // remove scroll listener
    this.removeScrollEvent();
  }

  /**
   * set playlistInitialized flag + call given function if supplied
   * @param {Object} data to send to callback
   * @returns {boolean} result from callback function or false
   */
  onPlaylistInitialized(data) {
    const { onPlaylistInitialized } = this.props;
    this.playlistInitialized = true;
    return onPlaylistInitialized?.(data);
  }

  /**
   * Set up all necessary FMG event listeners
   */
  setListeners() {
    const { FMG } = global.window;
    const {
      setListeners,
    } = this.props;

    FMG.on('playerReady', this.onPlayerReady, this.nodeId);
    FMG.on('GeoGate', this.geoGateError, this.nodeId);
    FMG.on('closeAnchorVideo', this.onCloseAnchorVideo, this.nodeId);
    FMG.on('playlistInitialized', this.onPlaylistInitialized, this.nodeId);
    FMG.on('setAdobeTempPass', checkFreeVideoPreview, this.nodeId);
    FMG.on('SDK.cuepointClick', this.shouldCastingKeepState, this.nodeId);

    if (isValidFunction(setListeners)) {
      setListeners();
    }
  }

  /**
   * invoked by JWPlayer when the geogate throws error
   */
  geoGateError() {
    this.setState({ geoGateError: true });
  }

  /**
   * call JWPlayer playlistItem method with desired item index
   * @param {number} itemIndex the index of the item to be played
   */
  jumpToPlaylistItem(itemIndex) {
    if (typeof itemIndex !== 'undefined') {
      doIfPlayerExists(this.nodeId, (player) => {
        global.window.FMG.trigger('video_playlist_page.click_item', null, itemIndex, player.id);
        // Casting state validation is in this method already
        this.shouldCastingKeepState();
      });
    }
  }

  /**
   * Check if autoplay is possible
   * @returns {string} autoplay state
   */
  shouldAutoPlay() {
    const { autoplay, skipPause, isCastingEnabled } = this.props;
    const playerNodes = document.querySelectorAll('[data-nodeiduvn]');

    // Override below logic if a casting session is currently enabled
    if (isCastingEnabled) {
      return false;
    }

    /**
     * Custom autoplay logic for sections:
     * 1 - Channel Strip should always autoplay
     * 2 - First player on page should always autoplay, with next exception
     * 2 - If there's a channel strip, second available video widget should autoplay
     * 3 - If anchor is enabled and playing, no player should autoplay (except channel strip)
     * Using this logic because is the only way to know on player setup time which is the first
     * widget on page, since close players could load at same time,
     * this way we check for widget position against current player node's id
     */
    if (this.isSection && playerNodes.length) {
      const isAnchorActive = isPlayerBufferingOrPlaying(isAnyPlayerAnchored());
      const playerPlaying = isAnyPlayerPlaying();
      const isChannelStripPlaying = playerPlaying && playerPlaying.includes('channelstrip');

      const firstNode = playerNodes[0];
      const channelStrip = firstNode.dataset.nodeiduvn.includes('channelstrip');
      const id = channelStrip ? playerNodes[1]?.dataset.nodeiduvn : firstNode.dataset.nodeiduvn;

      // If current widget has a video, and there's no other video playing or
      if ((id === this.nodeId && (!playerPlaying || isChannelStripPlaying) && !isAnchorActive)
        || skipPause
      ) {
        return VIDEO_PLAY_REASON_VIEWABLE;
      }

      return false;
    }

    let autoplayValue = VIDEO_PLAY_REASON_VIEWABLE;
    const cmsStopAutoplay = this.pageData?.data?.autoPlay === false;
    // if any other player is playing something or there is a prop forcing a false autoplay
    // start this new video without autoplay
    if (isAnyPlayerPlaying() || isAnyAutoplayPlayer() || autoplay === false || cmsStopAutoplay) {
      autoplayValue = false;
    }

    return this.autoplay || autoplayValue;
  }

  /**
   * If we are initializing a previously existing player, lets make sure is not marked as ready
   */
  resetReady() {
    const instance = getVideoInstance(this.nodeId);
    if (instance) {
      instance.playerReady = false;
    }
  }

  /**
   * format options to pass to the fmg service
   * @param {Object} extraOptions: extra options to pass to the fmg service
   * @returns {Object} object of options
   */
  fmgOptions(extraOptions = {}) {
    const {
      disableFirstPreroll,
      disableVideoAds,
      embedVideo,
      settings,
      sharing,
      isPrendeTV,
      isSensitive,
      controls,
      repeat,
      userId,
    } = this.props;

    const store = this.context?.store;
    const autoplay = this.shouldAutoPlay();
    const pageDisableAds = this.pageData.data?.adSettings?.disableVideoAds;
    const isLiveDAI = features.video.isDAI() || settings?.livestream?.enableDai;
    const isVodDAI = features.video.isVodDAI(userLocationSelector(store?.getState()));
    const disableAds = features.video.disableAds(isSensitive) || disableVideoAds || pageDisableAds;
    const commonTracking = getCommonTracking(Store);

    return {
      adRules: features.video.enableAdRules(),
      asyncMeta: features.video.asyncMeta(),
      autoplay,
      castingReceiverId: features.video.enableCasting() && getCastingReceiverId(),
      castingPlatform: this.castingPlatform,
      castingSource: this.castingSource,
      contentType: this.contentType,
      contentVertical: getKey(getCommonTracking(Store), 'content_vertical'),
      commonTracking,
      controls,
      device: this.pageData?.device,
      dfp: VideoAds.getDFPSettings(this.pageData, disableAds && isVodDAI),
      disableAds: disableAds && !isVodDAI,
      disableFirstPreroll,
      embedVideo,
      enablePermutive: thirdPartyFeatures.isPermutiveEnabled(),
      enableNativePip: this.enableNativePip,
      isDAI: isLiveDAI,
      isEU: features.advertisement.areCookiesDisallowed(),
      isFreeVideoPreview: features.video.isFreeVideoPreview(),
      isMVPDImprov: features.video.isMVPDImprov(),
      isPrendeTV,
      isTudn: this.isTudnSite,
      isVodDAI,
      isWorldCupMVP: features.deportes.isWorldCupMVP(store?.getState()),
      getVideoUserGroup: getVideoUserGroup(store?.getState()),
      mute: true,
      nielsen: getNielsenTracking(Store),
      nodeId: this.nodeId,
      preload: this.isVideoLayout ? 'auto' : undefined,
      primaryTag: getKey(this.pageData, 'data.primaryTag.name', 'unknown'),
      playlist: this.playlist,
      repeat,
      phasedRelease: this.pageData?.requestParams?.phased_release,
      mvpd: {
        redirectLink: getKey(this.pageData, 'data.parent.uri', ''),
      },
      sharing: {
        primary: getKey(this.theme, 'primary', null),
        ...sharing,
      },
      uri: this.pageData?.data?.uri,
      uid: this.placeholderId,
      userLocation: userLocationSelector(store?.getState()),
      languageChanged: this.languageChanged,
      longformExperience: this.pageData?.data?.longform,
      broadcastEvent: this.pageData?.data?.broadcastEvent,
      broadcastEventLogin: this.pageData?.data?.broadcastEventLogin,
      userId,
      site: this.pageData?.site,
      isTelevisaSite: this.pageData?.parentSite === 'televisa',
      ...extraOptions,
    };
  }

  /**
   * format options to pass to the fmg service
   * @param {Object} extraOptions options to pass to the fmg service
   */
  callFmgServices(extraOptions) {
    const options = this.fmgOptions(extraOptions);
    const { fmgCall, mcpid: mcpId, sharing } = this.props;
    if (fmgCall && typeof hasKey(global.window.FMG, fmgCall.name)) {
      if (fmgCall.custom) {
        fmgCall.custom(options);
      } else {
        if (hasKey(fmgCall, 'options.sharing.enabled')) {
          fmgCall.options.sharing.primary = getKey(this.theme, 'primary', null);
        }

        const fmgArgs = {
          ...options,
          ...(fmgCall.options || {}),
        };

        global.window.FMG.callFn(fmgCall.name, fmgArgs);
      }
    } else {
      global.window.FMG.callFn('playVOD', {
        mcpId,
        ...options,
        sharing: {
          enabled: true,
          ...this.theme,
          ...sharing,
        },
      });
    }
  }

  /**
   * calls FMG Video SDK
   */
  callPlayer() {
    const options = {};
    const anchorPlayer = radioAnchorSelector(Store.getState());

    if (this.isSection || (!this.isVideoLayout && anchorPlayer.abacast)) {
      options.mute = true;
    }

    options.dynamicPlaylist = getKey(this.pageData, 'data.dynamicPlaylist', false);

    this.resetReady();
    this.callFmgServices(options);
  }

  /**
   * call video SDK playVOD method with approprate mcpid
   * @returns {boolean} whether or not the init happened.
   */
  initPlayer() {
    if (this.initted) return false;
    this.initted = true;
    this.callPlayer();
    return true;
  }

  /**
   * Check if player should be paused if not in view
   */
  shouldPauseWhenNoAnchor() {
    const videoInView = isInViewport(this.node, this.node?.offsetHeight * 0.60);
    if (!videoInView) {
      doIfPlayerExists(this.nodeId, player => player.pause(true));
    }
  }

  /**
   * Sets the player on anchor mode
   */
  enableAnchorVideo() {
    const state = this.context?.store?.getState?.();
    const { disableAnchor } = this.props;

    if (!this.node) {
      this.node = document.getElementById(`${this.nodeId}-container`);
    }

    if (this.node
      && !closeRadioIfPlayerIsEnabled(state, this.nodeId)
      && !isPipRunning()
      && !disableAnchor
    ) {
      let enableAnchor = false;

      const { allowAnchor } = this.props;
      if (!allowAnchor) {
        this.shouldPauseWhenNoAnchor();
        return;
      }

      // new improved anchor logic without states
      if (this.isSticky) {
        enableAnchor = !isInViewport(this.node, this.node.offsetHeight);
      } else {
        enableAnchor = !isInViewport(this.node, (this.node.offsetHeight * 0.60) + 130);
      }

      enableAnchor = enableAnchor && isPlayerBufferingOrPlaying(this.nodeId);

      // only apply new values if anchor status is different
      if (this.anchored !== enableAnchor) {
        this.anchored = enableAnchor;
        if (enableAnchor) {
          // remove any other video on anchor mode
          removeAnyPlayerAnchored(this.nodeId);
          // disconnect unnecesary observers
          this.disconnectOberservers();
        } else {
          // create observer handler again beacause the video is no anchor anymore
          this.observeVideoPlaceholder();
        }
        // update element with new anchor state
        this.createOrUpdatePIPPlayerElement();
        // move element to anchor or default position
        this.movePIPWrapperElement();
        // update anchor state
        setPlayerAnchorState(this.nodeId, enableAnchor);

        global.window.FMG.trigger('SDK.anchorEnabled', null, {
          anchored: enableAnchor,
          nodeId: this.nodeId,
        }, this.nodeId);

        this.dispatchEnableCast();
      }
    }
  }

  /**
  * call back after wrapper element is created
   * @param {Object} element this is a reference to the wrapper
   */
  refCallback = (element) => {
    if (element) {
      this.playerRef = element;
      // Initialize player logic
      this.initVideoWrapperLogic();
    }
  };

  /**
   * Create observer to move video player
   */
  observeVideoPlaceholder() {
    if (this.playerRef && !this.mutationObserver && window?.MutationObserver) {
      // check if document change
      this.mutationObserver = new MutationObserver(this.deferPosition);

      // check if placeholder change size
      window.addEventListener('resize', this.deferPosition);

      // Observe all changes on document element
      this.mutationObserver.observe(this.mutationContainer, this.mutationOptions);
    }
  }

  /**
   * Create initial observer to detect changes on body during 8 seg
   */
  observeVideoPlaceholderBody() {
    this.mutationContainerBody = document.querySelector(this.mutationContainerBodySelector);
    if (this.playerRef && !this.mutationObserverBody && window?.MutationObserver) {
      this.mutationObserverBody = new MutationObserver(this.deferPosition);
      this.mutationObserverBody.observe(this.mutationContainerBody, this.mutationOptionsBody);
      this.timeout = setTimeout(() => {
        this.mutationObserverBody?.disconnect?.();
        this.mutationObserverBody = null;
      }, TIME_DISCONNECT_OBSERVER);
    }
  }

  /**
   * Move player to component placeholder position
   */
  movePIPWrapperElement() {
    if (this.playerRef) {
      const VideoPlayerPIPElement = getWrapperElement(this.nodeId);
      if (VideoPlayerPIPElement) {
        if (!this.anchored) {
          this.playerRef = getPlaceholderElement(this.nodeId);
          const position = this.playerRef?.getBoundingClientRect?.();
          if (position) {
            const {
              height, left, top, width,
            } = position;
            // add a connector to VideoPlayerPIPWrapper
            // and update the styles/position there
            VideoPlayerPIPElement.style.height = `${height}px`;
            VideoPlayerPIPElement.style.left = `${left}px`;
            VideoPlayerPIPElement.style.position = 'absolute';
            VideoPlayerPIPElement.style.top = `${top + window.pageYOffset}px`;
            VideoPlayerPIPElement.style.width = `${width}px`;
            // to avoid side-effect where depends of wrapper position
            VideoPlayerPIPElement.style.zIndex = '2';
            // JW Player container requires 1 extra percent to match 100% of screen
            VideoPlayerPIPElement.style.maxWidth = '101%';
          }
        } else {
          VideoPlayerPIPElement.style = null;
        }
      }
    }
  }

  /**
   * Create div element for player
   */
  createPIPWrapperElement() {
    if (!isWrapperAvailable(this.nodeId)) {
      this.pipWrapperElement = document.createElement('div');
      this.pipWrapperElement.setAttribute('id', `${this.nodeId}-wrapper`);
      const VideoPlayerPIPWrapper = document.getElementById('VideoPlayerPIPWrapper');

      if (VideoPlayerPIPWrapper) {
        VideoPlayerPIPWrapper.appendChild(this.pipWrapperElement);
      }
    }

    this.createOrUpdatePIPPlayerElement();
  }

  /**
   * Create or Update Player element for PIP if there are new props
   */
  createOrUpdatePIPPlayerElement() {
    const {
      digitalChannelSchedule,
      disableEnVivoLabel,
      isCastingEnabled,
      isLiveStream,
      isNewsDigitalChannel,
      onNewVideos,
      playlist,
      playlistContent,
      playlistMeta,
      program,
      title,
      uri,
    } = this.props;

    /* eslint-disable react/no-danger */
    const playerWrapper = (
      <VideoPlayerWrapper
        anchored={this.anchored}
        context={this.ctx}
        digitalChannelSchedule={digitalChannelSchedule}
        disableEnVivoLabel={disableEnVivoLabel}
        isCasting={isCastingEnabled}
        isLiveStream={isLiveStream}
        isNewsDigitalChannel={isNewsDigitalChannel}
        isMobile={this.isMobile}
        isSticky={this.isSticky}
        nodeId={this.nodeId}
        playlist={playlist}
        playlistContent={playlistContent}
        playlistMeta={playlistMeta}
        program={program}
        uri={uri || this.pageData?.data?.uri || this.pageData?.uri}
        store={this.context?.store}
        title={title}
        onNewVideos={onNewVideos}
      >
        <div id={this.nodeId} className={Styles.playerContainer} />
      </VideoPlayerWrapper>
    );

    const wrapperElement = getWrapperElement(this.nodeId);
    if (wrapperElement) {
      ReactDOM.render(
        playerWrapper,
        getWrapperElement(this.nodeId),
        this.initVideo.bind(this)
      );
    }
  }

  /**
   * delete div element for player
   */
  deletePIPWrapperElement() {
    const { casting } = this.state;

    if (isWrapperAvailable(this.nodeId) && !casting) {
      removeVideoInstance(this.nodeId);
    }
  }

  /**
   * Render the view
   * @returns {JSX} the div to inject the video into.
   */
  render() {
    const {
      className,
      image,
      isActive,
      isLiveStream,
      onClick,
      overrideImageUrl,
      settings,
      showFreePopup,
      style,
      widgetData,
    } = this.props;

    const {
      casting,
      contentPlaying,
      geoGateError,
    } = this.state;

    let placeholderImage = image;
    const soccerMatch = getKey(settings, 'soccerMatch', {});
    if (this.contentType === contentTypes.SOCCER_MATCH) {
      placeholderImage = soccerMatch.image;
    }
    let backgroundImageOverrideUrl = null;

    if (placeholderImage && this.isTudnSite) {
      const { title } = placeholderImage;
      backgroundImageOverrideUrl = title === UNIVISION_FALLBACK_IMAGE ? tudnBg : null;
    }
    if (!placeholderImage && this.isTudnSite) {
      backgroundImageOverrideUrl = overrideImageUrl || tudnBg;
    }
    let isPlayerReady = this.playerReady;
    const placeholderType = isActive ? TYPE_LOADER : null;

    // remove background on video content layouts
    if (features.video.isVideoLayout()) {
      backgroundImageOverrideUrl = null;
      placeholderImage = null;
      isPlayerReady = false;
    }

    if (casting) {
      backgroundImageOverrideUrl = castingSlate;
      isPlayerReady = true;
    }

    const placeholder = (
      <VideoPlaceholder
        backgroundImageOverrideUrl={backgroundImageOverrideUrl}
        image={placeholderImage}
        isPlayerReady={isPlayerReady}
        theme={this.theme}
        placeholderType={placeholderType}
      />
    );

    const containerProps = {
      className: classnames(Styles.videoWrapper, className),
      onClick,
      ref: (node) => {
        this.node = node;
      },
      style,
    };

    const pageVideoMetadata = widgetData || this.data;

    /* Free Video Preview */
    const freeVideoPreview = features.video.isFreeVideoPreview();

    return (
      <RouterContext.Consumer>
        {
          (ctx) => {
            this.ctx = ctx;

            return (
              <div>
                <div id={`${this.nodeId}-container`} {...containerProps}>
                  <VideoMetadata page={pageVideoMetadata} />
                  {((isLiveStream || showFreePopup) && freeVideoPreview)
                    && <VideoPopupsWrapper theme={this.theme} nodeId={this.nodeId} />}
                  <div className={Styles.titleCard}>
                    <PlaceholderWrapper
                      shouldHide={contentPlaying || geoGateError}
                      id={`${this.nodeId}-placeholder`}
                      isVideoLayout={this.isVideoLayout}
                      data-nodeiduvn={this.nodeId}
                      ref={this.refCallback}
                    >
                      {placeholder}
                    </PlaceholderWrapper>
                  </div>
                </div>
              </div>
            );
          }
        }
      </RouterContext.Consumer>
    );
  }
}

VideoComponent.propTypes = {
  activeTab: PropTypes.number,
  anchored: PropTypes.bool,
  autoplay: PropTypes.bool,
  allowAnchor: PropTypes.bool,
  castingAdBreakEnd: PropTypes.func,
  castingAdBreakStart: PropTypes.func,
  castingAdPod: PropTypes.func,
  castingDisabled: PropTypes.func,
  castingEnabled: PropTypes.func,
  className: PropTypes.string,
  controls: PropTypes.bool,
  disableAnchor: PropTypes.bool,
  digitalChannelSchedule: PropTypes.array,
  disableEnVivoLabel: PropTypes.bool,
  disableVideoAds: PropTypes.bool,
  disableFirstPreroll: PropTypes.bool,
  fmgCall: PropTypes.shape({
    name: PropTypes.string.isRequired,
    options: PropTypes.object,
    custom: PropTypes.func,
  }),
  embedVideo: PropTypes.bool,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  isActive: PropTypes.bool,
  isCastingEnabled: PropTypes.bool,
  isLiveStream: PropTypes.bool,
  isLivestream: PropTypes.bool,
  isNewsDigitalChannel: PropTypes.bool,
  isPrendeTV: PropTypes.bool,
  isSensitive: PropTypes.bool,
  language: PropTypes.string,
  livestreamId: PropTypes.string,
  mcpid: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  nodeId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onClick: PropTypes.func,
  onNext: PropTypes.func,
  onPlaylistInitialized: PropTypes.func,
  onSdkReady: PropTypes.func,
  onPlay: PropTypes.func,
  onNewVideos: PropTypes.func,
  overrideImageUrl: PropTypes.string,
  placeholderId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  playlist: PropTypes.array,
  playlistClicked: PropTypes.bool,
  playlistContent: PropTypes.array,
  playlistItem: PropTypes.number,
  playlistMeta: PropTypes.object,
  program: PropTypes.object,
  repeat: PropTypes.bool,
  reloadPlayer: PropTypes.bool,
  setListeners: PropTypes.func,
  setPlaylistClicked: PropTypes.func,
  sharing: PropTypes.object,
  showFreePopup: PropTypes.bool,
  skipPause: PropTypes.bool,
  storePlayingData: PropTypes.func.isRequired,
  style: PropTypes.object,
  uid: PropTypes.string,
  pageData: PropTypes.object,
  settings: PropTypes.object,
  title: PropTypes.string,
  uri: PropTypes.string,
  userId: PropTypes.string,
  widgetData: PropTypes.object,
};

VideoComponent.defaultProps = {
  autoplay: true,
  allowAnchor: true,
  className: '',
  controls: true,
  embedVideo: false,
  isActive: true,
  isCastingEnabled: false,
  isLiveStream: false,
  isPrendeTV: false,
  language: languages.ES,
  repeat: false,
  style: {},
};

VideoComponent.contextType = ReactReduxContext;

/**
 * map app state to local props
 * @param  {Object} player the player state from app store
 * @returns {Object} the props to inject to the component
 */
export const stateToProps = ({ video, user }) => {
  const props = {};
  props.userId = getUserData()?.userId;
  if (video) {
    props.userId = user.sub || props.userId;
    props.anchored = video.anchored;
    props.playlistClicked = video.playlistClicked;
    props.isCastingEnabled = video.castingEnabled;
  }
  return props;
};

const actions = {
  castingAdBreakEnd,
  castingAdBreakStart,
  castingAdPod,
  castingDisabled,
  castingEnabled,
  setPlaylistClicked,
  storePlayingData: action,
};

/**
 * Check if shouldn't set new props.
 * @param {Object} nextProps to be applied
 * @param {Object} prevProps to be applied
 * @returns {boolean}
 */
export const areStatePropsEqual = (nextProps, prevProps) => {
  return getKey(nextProps, 'anchored') === getKey(prevProps, 'anchored')
    && getKey(nextProps, 'playlistClicked') === getKey(prevProps, 'playlistClicked')
    && getKey(nextProps, 'isCastingEnabled') === getKey(prevProps, 'isCastingEnabled')
    && getKey(nextProps, 'disableAnchor') === getKey(prevProps, 'disableAnchor');
};

export const VideoPlayer = connect(
  stateToProps,
  actions,
  null,
  {
    pure: true,
    areStatePropsEqual,
    forwardRef: true,
  }
)(VideoComponent);

/**
 * Connected Video Component
 * @param {Object} props the component props
 * @returns {JSX}
 */
const Video = React.forwardRef(
  (props, ref) => (
    <VideoPlayer {...props} ref={ref} />
  )
);

export default Video;
export { VideoComponent };
