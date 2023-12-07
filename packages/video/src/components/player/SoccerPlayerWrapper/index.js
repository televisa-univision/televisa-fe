/* eslint-disable babel/no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux';

import setCurrentLanguage from '@univision/fe-commons/dist/store/actions/page-actions';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import * as languages from '@univision/fe-utilities/localization/languages';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import isEqual from '@univision/fe-utilities/helpers/common/isEqual';
import createTimer from '@univision/fe-commons/dist/utils/timer';
import { VIDEO_PLAY_REASON_VIEWABLE } from '@univision/fe-commons/dist/constants/video';
import { checkMatchStatus } from '@univision/fe-commons/dist/utils/video';
import { fetchPlaylistApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import {
  proxySelector,
  configSelector,
  userLocationSelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { MX } from '@univision/fe-commons/dist/constants/userLocation';
import features from '@univision/fe-commons/dist/config/features';

import {
  matchOver,
  initSoccerPlaylist,
  onPreauthorizedResources,
  onVideoLanguageChanged,
  onCuePointsModuleReady,
  updateBroadcastState,
} from './SdkHelpers';
import {
  checkPreauthorizedResources,
  generateVideoPlayerId,
  getVideoLanguageParams,
  setVideoLanguageParams,
} from '../../../helpers';
import Video from '../../Video';
import VideoPlaceholder from '../../VideoPlaceholder';

const EXTRA_TIME_PERIOD = '3';
const REQUEST_TIME_HIGHLIGHTS = 90;
const PROD_SYNDICATOR = 'https://syndicator.univision.com';

/**
 * SoccerPlayerWrapper
 * @param {Object} props the components content
 */
class SoccerPlayerWrapper extends React.Component {
  /**
   * setup state and bind methods
   * @param  {Object} props component props
   */
  constructor(props) {
    super(props);
    this.settings = {
      // When we have a broadcast match, that has no opta data, use livestream data
      soccerMatch: {
        // eslint-disable-next-line react/prop-types
        ...(props.settings?.livestream || {}),
      },
      ...props.settings,
    };

    this.soccerData = this.getSoccerData();
    this.fmgCustom = this.fmgCustom.bind(this);
    this.onPreauthorizedResources = checkPreauthorizedResources.bind(this);
    this.onLanguageChanged = this.onLanguageChanged.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.setCuePoints = this.setCuePoints.bind(this);
    this.hasExtraTimePeriod = this.hasExtraTimePeriod.bind(this);

    this.state = {
      playlist: props.playlist,
      reloadPlayer: false,
      lang: languages.ES,
    };

    this.interval = null;
    this.gamePlaying = false;
    this.nodeId = props.nodeId || generateVideoPlayerId();
    this.matchOver = false;
    this.isLangChanged = false;
    this.cueModule = false;
  }

  /**
   * Maps broadcast/embedVix events to event status
   * @param {string} broadcastStatus status
   * @returns {string}
   */
  getEventStatus = (broadcastStatus) => {
    const playerState = broadcastStatus?.toLowerCase();
    const stateMap = {
      pre: 'pre-event',
      on: 'live',
      post: 'post-event',
      error: 'post-event',
    };

    return stateMap[playerState] || 'post-event';
  }

  /**
   * Gets final status for broadcast, vixPlayer or opta/non-broadcast status
   * @param {string} eventStatus current opta/cms status
   * @param {string} broadcastStatus broadcast status
   * @param {string} vixPlayerStatus vixPlayer status
   * @returns {string}
   */
  getCurrentEventStatus = (eventStatus, broadcastStatus, vixPlayerStatus) => {
    const userLocation = userLocationSelector(this.context?.store?.getState());
    const broadcastEventStatus = this.getEventStatus(broadcastStatus);
    const vixStatus = this.getEventStatus(vixPlayerStatus);
    const {
      pageData: {
        broadcastEvent,
        vixPlayerMx,
        vixPlayerUs,
      },
    } = this.props;

    // If exist broadcastEvent and vixPlayerMx, vixPlayerMx have priority
    if (features.deportes.isWorldCupMVP()) {
      if (userLocation === MX && !isValidObject(vixPlayerMx)) {
        updateBroadcastState(this.nodeId, { broadcastState: broadcastStatus, broadcastEvent });
        return broadcastEventStatus;
      }
      if (isValidObject(vixPlayerUs) || isValidObject(vixPlayerMx)) {
        return vixStatus;
      }
    }

    return eventStatus || 'post-event';
  }

  /**
   * Gets final auth status
   * @returns {boolean}
   */
  getAuthStatus = () => {
    const userLocation = userLocationSelector(this.context?.store?.getState());
    const { soccerMatch } = this.settings;
    const {
      pageData: {
        broadcastEventLogin,
        broadcastEvent,
      },
    } = this.props;

    if (userLocation === MX && features.deportes.isWorldCupMVP()) {
      return isValidObject(broadcastEvent) && broadcastEventLogin;
    }

    return getKey(soccerMatch, 'isAuth', getKey(soccerMatch, 'auth'));
  }

  /**
   * Gets playlist highlights
   * @params {boolean} shouldPrepend if we should prepend videos, otherwise are appended
   */
  getHighlights = async ({ shouldPrepend }) => {
    const {
      updatePlaylist,
      pageData: {
        uid,
      },
    } = this.props;
    const videos = await fetchPlaylistApi(uid);
    updatePlaylist?.(videos, true, shouldPrepend);
  }

  /**
   * Component did mount lifecycle
   */
  componentDidMount() {
    const { optaId } = this.soccerData;
    const store = this.context?.store;
    const state = store?.getState();
    const proxyUri = proxySelector(state);
    const config = configSelector(state);
    const {
      pageData: {
        broadcastEvent,
        uid,
        vixPlayerMx,
        vixPlayerUs,
      },
    } = this.props;

    this.getHighlights({ shouldPrepend: false });

    checkMatchStatus(optaId, ({
      eventStatus,
      gameState,
      broadcastStatus,
      vixPlayerStatus,
    }) => {
      const { shouldShowPlaylist, onMatchOver } = this.props;
      this.gameState = gameState;

      this.eventStatus = this.getCurrentEventStatus(eventStatus, broadcastStatus, vixPlayerStatus);

      if (this.eventStatus === 'post-event') {
        shouldShowPlaylist(true);
        onMatchOver?.();
      } else if (this.eventStatus === 'live') {
        shouldShowPlaylist(true);
        this.gamePlaying = true;
      }

      this.setState({ matchStatusReady: true });
    },
    proxyUri,
    uid,
    isValidObject(broadcastEvent),
    isValidObject(vixPlayerMx),
    isValidObject(vixPlayerUs),
      config?.syndicator?.uri || PROD_SYNDICATOR);
  }

  /**
   * Component is being removed from the DOM
   */
  componentWillUnmount() {
    this.interval?.cancel();
    this.highlightsInterval?.cancel();
  }

  /**
   * Set isLangChanged to false if language was changed.
   * and add cuepoints if available
   * @param {Object} prevProps - the previous props data
   */
  componentDidUpdate(prevProps) {
    const { cuepoints, language } = this.props;
    const { lang } = this.state;
    if (this.isLangChanged) {
      this.isLangChanged = false;
    }
    if (isValidArray(cuepoints)) {
      this.setCuePoints(this.cueModule);
    }
    if (language !== prevProps.language && language !== lang) {
      this.onLanguageChanged({ lang: language });
    }
  }

  /**
   * Check if the component should update when have valid data
   * or the props/state changed
   * @param {Object} nextProps - the new props data
   * @param {Object} nextState - the new state for this component
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextState, this.state, true)
      || !isEqual(nextProps, this.props);
  }

  /**
   * Set language from url params when user reloads page or set default language
   */
  setLanguage() {
    const lang = getVideoLanguageParams() || languages.ES;
    this.setState({
      lang,
    });
    this.context?.store?.dispatch(setCurrentLanguage({ language: lang }));
  }

  /**
   * Execute this custom function when changing language
   * @param {Object} options language option
   */
  onLanguageChanged({ lang }) {
    const { lang: stateLang } = this.state;
    if (isValidValue(lang) && lang !== stateLang) {
      this.isLangChanged = true;
      setVideoLanguageParams(lang);
      this.setState({ reloadPlayer: true, lang });
      this.context?.store?.dispatch(setCurrentLanguage({ language: lang }));
    }
  }

  /**
   * See if cuepoints have extra time period to adjust timeline on video player
   * @returns {boolean}
   */
  hasExtraTimePeriod() {
    const { soccerMatch } = this.settings;
    const { cuepoints } = this.props;
    if (isValidArray(cuepoints)) {
      // cuepoints come sorted descending so will be the first item usually
      // but just to be sure not break the functionality
      // if the parent component change the order
      return soccerMatch?.gamePeriod >= EXTRA_TIME_PERIOD
        || cuepoints.some(event => event?.period >= EXTRA_TIME_PERIOD);
    }
    return false;
  }

  /**
   * Execute this custom function when player ready to set
   * cue points for highlights
   * @param {Object} cueModule - the cue module for adding cue/highlights
   */
  setCuePoints(cueModule) {
    if (cueModule) {
      this.cueModule = cueModule;
      const { cuepoints } = this.props;
      if (isValidArray(cuepoints)) {
        cueModule.addCuepoints(cuepoints);
      }
      if (this.hasExtraTimePeriod()) {
        cueModule.setExtraTime();
      }
    }
  }

  /**
   * Gets relevant soccer metadata
   * @returns {*[]}
   */
  getSoccerData() {
    const { soccerMatch } = this.settings;
    const {
      adPackage,
      description,
      matchId,
      optaId,
      streamId,
      streamIdEnglish,
      title,
      uri,
    } = soccerMatch;

    let image = getKey(soccerMatch, 'image.renditions.original.href', '');
    if (hasKey(soccerMatch, 'mainImage')) {
      image = soccerMatch.mainImage;
    }

    return {
      adPackage,
      description,
      gameId: matchId,
      image,
      statusInterval: 30,
      shareUrl: uri,
      optaId,
      streamId,
      streamIdEnglish,
      title,
    };
  }

  /**
   * Execute this custom fuction here instead of calling default FMG
   * @param {Object} options extra options to be sent to the SDK
   */
  fmgCustom(options) {
    const {
      statusInterval, optaId, streamId, streamIdEnglish,
    } = this.soccerData;
    const {
      lang,
    } = this.state;
    const {
      channels,
      onMatchOver,
    } = this.props;

    const {
      pageData: {
        broadcastEvent,
        uid,
        eventId,
        vixPlayerMx,
        vixPlayerUs,
      },
    } = this.props;

    const store = this.context?.store;
    const state = store?.getState();
    const proxyUri = proxySelector(state);
    const config = configSelector(state);

    this.interval = createTimer(statusInterval, () => {
      checkMatchStatus(optaId, ({ eventStatus, broadcastStatus, vixPlayerStatus }) => {
        this.eventStatus = this.getCurrentEventStatus(eventStatus, broadcastStatus,
          vixPlayerStatus);

        if (this.eventStatus === 'post-event') {
          this.matchOver = true;
          matchOver(this.nodeId);
          onMatchOver?.();
        } else if (this.eventStatus === 'live' && !this.gamePlaying) {
          this.gamePlaying = true;
          this.setState({ reloadPlayer: true });
        }
      }, proxyUri, uid, isValidObject(broadcastEvent), isValidObject(vixPlayerMx),
      isValidObject(vixPlayerUs), config?.syndicator?.uri || PROD_SYNDICATOR);
    });

    this.highlightsInterval = createTimer(
      REQUEST_TIME_HIGHLIGHTS, this.getHighlights.bind(this, {})
    );

    if (this.eventStatus === 'post-event') {
      this.interval.cancel();
      this.highlightsInterval.cancel();
    }

    const streamIdToUSe = lang === languages.ES ? streamId : streamIdEnglish;
    initSoccerPlaylist({
      ...this.soccerData,
      ...options,
      proxyUri,
      isAuth: this.getAuthStatus(),
      autoplay: VIDEO_PLAY_REASON_VIEWABLE,
      displayEnVivo: true,
      eventStatus: this.eventStatus,
      channels: channels?.[lang],
      gameState: this.gameState,
      streamId: streamIdToUSe,
      disableFirstPreroll: this.isLangChanged,
      language: lang,
      uid,
      eventId,
    });
  }

  /**
   * Sets soccer listeners
   */
  setListeners = () => {
    onPreauthorizedResources(this.onPreauthorizedResources, this.nodeId);
    onVideoLanguageChanged(this.onLanguageChanged, this.nodeId);
    onCuePointsModuleReady(this.setCuePoints, this.nodeId);
  };

  /**
   * Render view
   * @returns {JSX}
   */
  render() {
    const { reloadPlayer, matchStatusReady, lang } = this.state;
    const { onPlaylistInitialized } = this.props;

    if (!matchStatusReady) {
      return <VideoPlaceholder />;
    }

    return (
      <Video
        ref={(v) => { this.video = v; }}
        {...this.props}
        language={lang}
        onPlaylistInitialized={onPlaylistInitialized}
        reloadPlayer={reloadPlayer}
        setListeners={this.setListeners}
        fmgCall={{
          name: 'soccerPlaylist',
          custom: this.fmgCustom,
        }}
        nodeId={this.nodeId}
      />
    );
  }
}

SoccerPlayerWrapper.propTypes = {
  channels: PropTypes.object,
  cuepoints: PropTypes.arrayOf(PropTypes.object),
  language: PropTypes.string,
  nodeId: PropTypes.string,
  onMatchOver: PropTypes.func,
  onPlaylistInitialized: PropTypes.func,
  pageData: PropTypes.shape({
    broadcastEvent: PropTypes.object,
    broadcastEventLogin: PropTypes.bool,
    eventId: PropTypes.string,
    uid: PropTypes.string,
    vixPlayerMx: PropTypes.object,
    vixPlayerUs: PropTypes.object,
  }),
  playlist: PropTypes.array,
  uid: PropTypes.string,
  updatePlaylist: PropTypes.func,
  shouldShowPlaylist: PropTypes.func,
  settings: PropTypes.shape({
    soccerMatch: PropTypes.object,
  }).isRequired,
};

SoccerPlayerWrapper.contextType = ReactReduxContext;

export default SoccerPlayerWrapper;
