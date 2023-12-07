import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';
import { isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';
import * as playerActions from '@univision/fe-commons/dist/store/actions/player-actions';
import {
  closeAnchoredPlayer,
  getPlayerInstance,
  pauseAnyPlayerPlaying,
  removeAnyPlayerAnchored,
} from '@univision/fe-commons/dist/utils/video';
import { fetchPlayerTokenApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import syndicatorFetchByUri, { fetchById as syndicatorFetchById } from '@univision/fe-commons/dist/utils/api/content/fetch';
import RadioStationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/station/RadioStationTracker';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import PLAY_STATES from '@univision/fe-commons/dist/constants/radioPlayStates';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import radioRatios from '@univision/fe-commons/dist/utils/images/ratios/radio';
import { RADIO_PLAYER_ID, FORWARD, REWIND } from '@univision/fe-commons/dist/constants/radio';
import adswizzManager from '@univision/fe-commons/dist/utils/ads/adswizzManager';

import AbacastPlayer from './AbacastPlayer';
import AbacastPlayerContext from './AbacastPlayerContext';

/**
 * Abacast Player Container to inject props
 */
export class AbacastPlayerContainer extends PureComponent {
  /**
   * Constructor
   * @param {Object} props Properties
   */
  constructor(props) {
    super(props);

    this.addEvents = this.addEvents.bind(this);
    this.configurePlayer = this.configurePlayer.bind(this);
    this.getVolumeIconName = this.getVolumeIconName.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleProgressBar = this.handleProgressBar.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.onImageError = this.onImageError.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.playRadioAction = this.playRadioAction.bind(this);
    this.setListeners = this.setListeners.bind(this);
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
    this.togglePlaying = this.togglePlaying.bind(this);
    this.togglePlaybackRate = this.togglePlaybackRate.bind(this);
    this.onCloseMediaPlayer = this.onCloseMediaPlayer.bind(this);
    this.onShare = this.onShare.bind(this);

    this.state = {
      collapsed: true,
      play: PLAY_STATES.PAUSED,
      stationContact: false,
      stationMenu: false,
      stationShare: false,
      volume: 50,
      rate: 1,
    };
  }

  /**
   * trigger video
   */
  componentDidMount() {
    this.initVideo();
  }

  /**
   * If streamUrl changes, re-trigger the video stream
   * @param {Object} prevProps the props before component was updated
   * @param {Object} prevState the props before component was updated
   */
  componentDidUpdate(prevProps) {
    const { streamUrl, pause } = this.props;
    const { play: currentPlayStatus } = this.state;
    if (streamUrl && (prevProps.streamUrl !== streamUrl)) {
      this.configurePlayer();
      this.trackEngagement(RadioStationTracker.events.streamStart);
    }
    if (pause !== prevProps.pause && currentPlayStatus === PLAY_STATES.PLAY) {
      this.togglePlaying();
    }
  }

  /**
   * If streamUrl will change, we need stop the heartbeat timeout and track the current time.
   * @param {Object} nextProps the props after component was updated
   * @param {Object} nextState the props after component was updated
   */
  componentWillUpdate(nextProps) {
    const { streamUrl } = this.props;
    if (nextProps.streamUrl !== streamUrl) {
      if (hasKey(this.props, 'heartbeat.timeoutId')) {
        const { heartbeat } = this.props;
        clearTimeout(heartbeat.timeoutId);
        this.trackHeartBeat();
      }
    }
  }

  /**
   * Call the methods to get JWPlayer set up.
   */
  initVideo() {
    adswizzManager.load();
    this.setListeners();
    this.configurePlayer();
  }

  /**
   * Handle the player ready event
   */
  onPlayerReady() {
    this.playerInstance = getPlayerInstance(RADIO_PLAYER_ID);
    this.playerInstance.play();
    this.playRadioAction();
    this.addEvents();
  }

  /**
   * Resets player timer when changing stations or playing again
   */
  async playRadioAction() {
    const { mediaPlayerPlayRadio, nowPlaying } = this.props;
    await mediaPlayerPlayRadio(nowPlaying);
  }

  /**
   * Triggered when a radio has been shared.
   * @param {Event} event JS Event
   */
  onShare(event) {
    const share = getKey(event, 'target.dataset.share');
    this.trackEngagement('social_share', { name: share });
  }

  /**
   * Provide fallback album art image on error
   * @returns {string}
   */
  onImageError() {
    const { image, logo } = this.props;
    const originalImage = getKey(image, 'renditions.original');
    if (originalImage) {
      return getRenditionUrl(originalImage, radioRatios['1:1']);
    }
    return getKey(logo, 'renditions.original.href');
  }

  /**
   * Triggered when the media player has been closed.
   */
  onCloseMediaPlayer() {
    const { onClose } = this.props;
    this.trackEngagement(RadioStationTracker.events.anchorClose);
    if (typeof onClose === 'function') {
      this.togglePlaying();
      onClose();
    }
  }

  /**
   * Set FMG listeners
   */
  setListeners() {
    const { FMG } = global.window;

    FMG.on('playerReady', this.onPlayerReady, RADIO_PLAYER_ID);
  }

  /**
   * Get the name of the volume icon based on the state
   * @returns {string}
   */
  getVolumeIconName() {
    const { volume } = this.state;

    if (volume === 0) {
      return 'volumeOff';
    }

    if (volume < 50) {
      return 'volumeLow';
    }

    return 'volumeHigh';
  }

  /**
   * Returns the analytics data associated to the current Radio Station.
   * @returns {Promise<null>}
   */
  async getAnalyticsData() {
    const { uid, uri } = this.props;
    if (!this.analyticsData && (uri || uid)) {
      try {
        const data = uri ? await syndicatorFetchByUri(uri) : await syndicatorFetchById(uid);
        this.analyticsData = Object.assign({}, getKey(data, 'analyticsData.web.contentSpecific'));
      } catch (e) {
        // nothing to do here
      }
    }
    return this.analyticsData;
  }

  /**
   * Track an engagement based on the event supplied and the analytics data.
   * @param {string} event Event name.
   * @param {Object} extraData for the event.
   * @returns {Promise<void>}
   */
  async trackEngagement(event, extraData = {}) {
    const analyticsData = await this.getAnalyticsData();
    const isSocialShareEvent = (event === 'social_share');

    if (analyticsData) {
      const shareData = {
        uid: analyticsData.audiostream_id,
        title: analyticsData.audiostream_title,
        type: analyticsData.audiostream_station_type,
      };

      if (hasKey(analyticsData, 'section_category')) {
        delete analyticsData.section_category;
      }

      if (isSocialShareEvent) {
        SocialTracker.track(SocialTracker.events.share, { ...extraData, ...shareData });
      } else if (event === RadioStationTracker.events.heartbeat) {
        RadioStationTracker.track(event, { analyticsData: { ...analyticsData, ...extraData } });
      } else {
        RadioStationTracker.track(event, { analyticsData, ...extraData });
      }
    }
  }

  /**
   * run jwplayer setup
   */
  async configurePlayer() {
    if (!getKey(global, 'window.FMG')) {
      return;
    }

    /**
     * streamUrl must be the direct livestream link
     * This format looks like https://live.wostreaming.net/direct/univision-kltnfmaac-imc1
     * The old format is https://live.wostreaming.net/playlist/univision-kltnfmaac-imc1.m3u
     * To convert to the new format change playlist -> direct and remove the .m3u extension
     */
    const { streamUrl, zoneId } = this.props;
    const { volume } = this.state;
    this.analyticsData = null;
    if (streamUrl) {
      const { token } = await fetchPlayerTokenApi();
      if (!token) return;
      const stream = this.addTokenToStream(token);
      const radioData = {
        nodeId: RADIO_PLAYER_ID,
        file: stream,
        autostart: false,
        mute: false,
        volume: 50,
      };
      if (window?.adswizzSDK) {
        adswizzManager.setPlayerData({
          ...radioData, stream: streamUrl, token, zoneId,
        });
        adswizzManager.initAdsWizz();
      } else {
        global.window.FMG.callFn('playRadio', radioData);
      }
      // increase volume to avoid play on mute
      if (volume === 0) {
        this.updateVolume(50);
      }
    }
  }

  /**
   * Append token string
   * @param {string} token the playing state
   * @returns {string}
   */
  addTokenToStream(token) {
    const { streamUrl } = this.props;
    const prependString = streamUrl.includes('?') ? '&' : '?';
    return `${streamUrl}${prependString}key=${token}`;
  }

  /**
   * attach events to audio element so we can update the icon based on buffering/play/pause state
   * @returns {boolean} whether or not events were attached.
   */
  addEvents() {
    if (!this.playerInstance) return false;

    // clear old event listeners if any
    this.playerInstance.off('play', this.handleEvent(PLAY_STATES.PLAY));
    this.playerInstance.off('pause', this.handleEvent(PLAY_STATES.PAUSED));
    // idle event is triggered when playerInstance.stop() is called
    this.playerInstance.off('idle', this.handleEvent(PLAY_STATES.PAUSED));
    this.playerInstance.off('buffer', this.handleEvent(PLAY_STATES.LOADING));
    this.playerInstance.off('closeRadio', this.onCloseMediaPlayer);

    // add new event listeners
    this.playerInstance.on('play', this.handleEvent(PLAY_STATES.PLAY));
    this.playerInstance.on('pause', this.handleEvent(PLAY_STATES.PAUSED));
    this.playerInstance.on('idle', this.handleEvent(PLAY_STATES.PAUSED));
    this.playerInstance.on('buffer', this.handleEvent(PLAY_STATES.LOADING));
    this.playerInstance.on('closeRadio', this.onCloseMediaPlayer);
    return true;
  }

  /**
   * Handle player events
   * @param {string} playState the playing state
   * @returns {function}
   */
  handleEvent(playState) {
    return () => {
      this.setState({ play: playState });
      if (playState !== PLAY_STATES.LOADING) {
        this.toggleTrackHearbeat();
      }

      if (playState === PLAY_STATES.PLAY) {
        // Pause any player playing on any other place
        pauseAnyPlayerPlaying(RADIO_PLAYER_ID);
        // remove any other video on anchor mode
        removeAnyPlayerAnchored();
      }

      if (playState === PLAY_STATES.PAUSED) {
        this.playerInstance.stop();
      }
    };
  }

  /**
   * Open station component
   * @param {string} key the station component to open
   */
  handleOpen(key) {
    this.setState({ [key]: true });
  }

  /**
   * Close station component
   * @param {string} key the station component to close
   */
  handleClose(key) {
    this.setState({ [key]: false });
  }

  /**
   * Jump to the specified position
   * @param {string} sec the station component to close
   * @param {string} direction rewind or forward
   */
  handleSeek(sec, direction) {
    if (isValidObject(this.playerInstance)) {
      const current = this.playerInstance.getPosition();
      const duration = this.playerInstance.getDuration();
      switch (direction) {
        case REWIND:
          if (current > sec) {
            this.playerInstance.seek(current - sec);
          }
          break;
        case FORWARD:
          if (current < duration - sec) {
            this.playerInstance.seek(current + sec);
          }
          break;
        default:
          if (sec > 0 && sec < duration) {
            this.playerInstance.seek(sec);
          }
          break;
      }
    }
  }

  /**
   * Update JWPlayer volume
   * @param {Object} evt the input event
   */
  handleVolume(evt) {
    const { play } = this.state;
    const newVolume = parseInt(evt.target?.value, 10);

    // stop audio if volume change to 0
    if (newVolume === 0) {
      this.togglePlaying();
    } else {
      this.updateVolume(newVolume);
      // if there is a volume but player is not playing, start playback
      if (play !== PLAY_STATES.PLAY) {
        this.togglePlaying();
      }
    }
  }

  /**
   * Update JWPlayer volume
   * @param {string} volume new volume value
   */
  updateVolume(volume) {
    this.setState({ volume });

    if (this.playerInstance) {
      this.playerInstance.setVolume(volume);
    }
  }

  /**
   * Update JWPlayer progressBar
   * @param {Object} evt the input event
   */
  handleProgressBar(evt) {
    if (this.playerInstance) {
      let newPosition = parseInt(evt.target.value, 10);
      newPosition = (newPosition * this.playerInstance.getDuration() / 100);
      this.handleSeek(newPosition);
    }
  }

  /**
 * Update local collapsed state of the player
 * @param {Object} evt the event object
 */
  toggleCollapsed(evt) {
    // ignore keyboard events not on the enter key
    if (evt instanceof KeyboardEvent && evt.keyCode !== 13) {
      return;
    }

    this.setState((state) => {
      const method = !state.collapsed ? 'remove' : 'add';
      document.body.classList[method]('player-open');
      this.trackEngagement(RadioStationTracker.events[`fullScreen${state.collapsed ? 'Open' : 'Close'}`]);

      return {
        collapsed: !state.collapsed,
      };
    });
  }

  /**
 * Update playblack rate state of the component and dispatch event on the audio element
 */
  togglePlaybackRate() {
    const { rate } = this.state;
    let newRate = 1;
    switch (rate) {
      case 1:
        newRate = 1.5;
        break;
      case 1.5:
        newRate = 2;
        break;
      case 2:
        newRate = 0.5;
        break;
      case 0.5:
      default:
        newRate = 1;
        break;
    }

    this.setState({ rate: newRate });
    if (this.playerInstance) {
      this.playerInstance.setPlaybackRate(newRate);
    }
  }

  /**
 * Update local "play/pause" state of the component and dispatch event on the audio element
 */
  togglePlaying() {
    const { play, volume } = this.state;

    if (this.playerInstance) {
      if (play === PLAY_STATES.PLAY) {
        if (this.playerInstance.getState() === PLAY_STATES.PLAY) {
          // use .stop() because safari continues streaming even when paused
          this.playerInstance.stop();
          this.updateVolume(0);
          this.trackEngagement(RadioStationTracker.events.streamPause);
        }
      } else {
        this.playerInstance.play();
        closeAnchoredPlayer();
        // increase volume to avoid play on mute
        if (volume === 0) {
          this.updateVolume(50);
        }
        this.configurePlayer();
        this.trackEngagement(RadioStationTracker.events.streamResume);
      }
    }
  }

  /**
 * Update local heartbeat state of the component and dispatch event on the audio element
 * @param {bool} timeExpired time expired by the timeout
 */
  toggleTrackHearbeat(timeExpired) {
    const { heartbeatTimeWait, heartbeat } = this.props;
    if (hasKey(heartbeat, 'timeoutId')) {
      clearTimeout(heartbeat.timeoutId);
    }
    if (this.playerInstance && performance !== undefined) {
      /**
       * On this validation we are checking if the timeout is ends or
       * if the player was paused to track.
       */
      if (timeExpired || (hasKey(heartbeat, 'timeoutId') && this.playerInstance.getState() === PLAY_STATES.PAUSED)) {
        /**
         * When the timeout has ends or the player us paused, should track and start over.
         */
        this.trackHeartBeat();

        if (!timeExpired) {
          Store.dispatch(playerActions.setHeartBeat({
            timeoutId: undefined,
            initialTime: undefined,
          }));
          return;
        }
      }
      Store.dispatch(playerActions.setHeartBeat({
        timeoutId: setTimeout(() => this.toggleTrackHearbeat(true), heartbeatTimeWait),
        initialTime: performance.now(),
      }));
    }
  }

  /**
 * Call the heartbeat track.
 */
  trackHeartBeat() {
    const heartbeat = getKey(this.props, 'heartbeat');
    if (hasKey(heartbeat, 'timeoutId')) {
      const endTime = performance.now();
      const minutes = Math.round((endTime - heartbeat.initialTime) / 60000);
      this.trackEngagement(RadioStationTracker.events.heartbeat, {
        radio_heartbeat_value: minutes <= 0 ? 1 : minutes,
      });
    }
  }

  /**
 * Render
 * @returns {JSX}
 */
  render() {
    const {
      alternativeLogo,
      detailedDescription,
      image,
      isPodcastEpisode,
      logo,
      nowPlaying,
      sharingOptions,
      socialNetworks,
      stationDescription,
      stationTitle,
      uri,
    } = this.props;
    const {
      collapsed, play, stationContact, stationMenu, stationShare, volume, rate,
    } = this.state;

    return (
      <AbacastPlayerContext.Provider value={{ player: this.playerInstance }}>
        <AbacastPlayer
          alternativeLogo={alternativeLogo}
          collapsed={collapsed}
          detailedDescription={detailedDescription}
          handleClose={this.handleClose}
          handleOpen={this.handleOpen}
          handleVolume={this.handleVolume}
          handleProgressBar={this.handleProgressBar}
          handleSeek={this.handleSeek}
          image={image}
          isPodcastEpisode={isPodcastEpisode}
          logo={logo}
          nowPlaying={nowPlaying}
          onClose={this.onCloseMediaPlayer}
          onImageError={this.onImageError}
          onShare={this.onShare}
          play={play}
          rate={rate}
          sharingOptions={sharingOptions}
          socialNetworks={socialNetworks}
          stationContact={stationContact}
          stationDescription={stationDescription}
          stationMenu={stationMenu}
          stationShare={stationShare}
          stationTitle={stationTitle}
          toggleCollapsed={this.toggleCollapsed}
          toggleMuted={this.togglePlaying}
          togglePlaying={this.togglePlaying}
          togglePlaybackRate={this.togglePlaybackRate}
          uri={uri}
          volume={volume}
          volumeIconName={this.getVolumeIconName()}
        />
      </AbacastPlayerContext.Provider>
    );
  }
}

AbacastPlayerContainer.propTypes = {
  alternativeLogo: PropTypes.object,
  detailedDescription: PropTypes.string,
  heartbeat: PropTypes.object,
  heartbeatTimeWait: PropTypes.number,
  image: PropTypes.object,
  isPodcastEpisode: PropTypes.bool,
  mediaPlayerPlayRadio: PropTypes.func,
  logo: PropTypes.object,
  nowPlaying: PropTypes.shape({
    title: PropTypes.string,
    artist: PropTypes.string,
    largeimage: PropTypes.string,
  }),
  onClose: PropTypes.func,
  pause: PropTypes.bool,
  sharingOptions: PropTypes.object,
  socialNetworks: PropTypes.array,
  stationDescription: PropTypes.string,
  stationTitle: PropTypes.string,
  streamUrl: PropTypes.string,
  uri: PropTypes.string,
  uid: PropTypes.string,
  zoneId: PropTypes.number,
};

AbacastPlayerContainer.defaultProps = {
  heartbeat: {},
  heartbeatTimeWait: 300000, // 5 minutes in milli-seconds
  nowPlaying: {},
  streamUrl: null,
};

/**
 * Connect map store to props
 * @param {Object} state sdf
 * @returns {Object}
 */
export const mapStateToProps = ({ player }) => {
  return {
    nowPlaying: getKey(player, 'anchorPlayer'),
    pause: getKey(player, 'pause'),
    heartbeat: getKey(player, 'heartbeat'),
  };
};

/**
 * Check to render only when nowPlaying or pause change.
 * @param {Object} nextProps to be applied
 * @param {Object} prevProps to be applied
 * @returns {boolean}
 */
export const areStatePropsEqual = (nextProps, prevProps) => {
  const prevPause = getKey(prevProps, 'pause');
  const nextPause = getKey(nextProps, 'pause');
  const prevStationTitle = getKey(prevProps, 'stationTitle');
  const nextStationTitle = getKey(nextProps, 'stationTitle');
  const prevHeartbeatTimeoutId = getKey(prevProps, 'heartbeat.timeoutId');
  const nextHeartbeatTimeoutId = getKey(nextProps, 'heartbeat.timeoutId');

  return prevPause === nextPause
    && prevStationTitle === nextStationTitle
    && prevHeartbeatTimeoutId === nextHeartbeatTimeoutId;
};

export default connect(
  mapStateToProps,
  {
    mediaPlayerPlayRadio: playerActions.playRadio,
  },
  null,
  {
    areStatePropsEqual,
  }
)(AbacastPlayerContainer);
