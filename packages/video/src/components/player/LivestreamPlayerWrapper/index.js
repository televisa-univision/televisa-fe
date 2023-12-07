/* eslint-disable react/destructuring-assignment */
/* eslint-disable babel/no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import * as languages from '@univision/fe-utilities/localization/languages';
import setCurrentLanguage from '@univision/fe-commons/dist/store/actions/page-actions';

import { checkPreauthorizedResources, getVideoLanguageParams, setVideoLanguageParams } from '../../../helpers';
import {
  onPreauthorizedResources,
  onVideoLanguageChanged,
  initPlaylistLivestream,
  initPlayLivestream,
} from '../SoccerPlayerWrapper/SdkHelpers';
import Video from '../../Video';

/**
 * FMG call names for live stream types
 */
const PLAY_LIVESTREAM = 'playLivestream';

/**
 * LivestreamPlayerWrapper
 * @param {Object} props the components content
 */
class LivestreamPlayerWrapper extends React.Component {
  /**
   * setup state and bind methods
   * @param  {Object} props component props
   */
  constructor (props) {
    super(props);
    this.livestreamData = this.getLivestreamData();
    this.onLanguageChanged = this.onLanguageChanged.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.onPreauthorizedResources = checkPreauthorizedResources.bind(this);
    this.fmgCustom = this.fmgCustom.bind(this);
    const { settings, mcpid } = props;
    const isPlaylist = mcpid?.length > 0;
    this.livestreamId = settings?.livestream?.streamId || settings?.livestream?.livestreamId;
    this.nodeId = `livestream-${this.livestreamId}`;
    this.state = {
      lang: languages.ES,
      reloadPlayer: false,
    };
    this.fmgFunction = isPlaylist ? initPlaylistLivestream : initPlayLivestream;
  }

  /**
   * Set up the default language
   */
  componentDidMount() {
    this.setLanguage();
  }

  /**
   * Set language
   * @param {Object} prevProps - the previous props data
   */
  componentDidUpdate(prevProps) {
    const { language } = this.props;
    const {
      lang,
    } = this.state;
    if (language !== prevProps.language && language !== lang) {
      this.onLanguageChanged({ lang: language });
    }
  }

  /**
   * Gets relevant LiveStream metadata
   * @returns {*[]}
   */
  getLivestreamData() {
    const {
      settings: {
        livestream,
      },
    } = this.props;

    livestream.isActive = getKey(livestream, 'isActive', getKey(livestream, 'active'));
    livestream.isVertical = getKey(livestream, 'isVertical', getKey(livestream, 'vertical'));
    livestream.isAuth = getKey(livestream, 'isAuth', getKey(livestream, 'auth'));
    livestream.disableAds = getKey(livestream, 'adSettings.disableVideoAds', false);

    return {
      ...livestream,
      dateReleased: livestream.publishDate,
      image: livestream.mainImage || getKey(livestream, 'image.renditions.original.href', ''),
    };
  }

  /**
   * Execute this custom function here instead of calling default FMG
   * @param {Object} options extra options to be sent to the SDK
   */
  fmgCustom(options) {
    const {
      channels,
      mcpid,
      hidePlaylist,
      is360,
      pageData,
      settings,
      playlist,
    } = this.props;
    const {
      reloadPlayer,
      lang,
    } = this.state;
    const isDAI = settings?.livestream?.enableDai;
    const streamId = lang === languages.ES ? this.livestreamId
      : settings?.livestream?.streamIdEnglish;
    const liveStreamOptions = {
      ...this.livestreamData,
      asyncMeta: true,
      channels: channels?.[lang],
      displayEnVivo: true,
      mcpIds: mcpid,
      language: lang,
      sharing: {
        enabled: hidePlaylist,
        sites: ['facebook', 'twitter', 'email'],
        heading: getKey(pageData, 'data.shortTitle', pageData.headerTitle),
        ...options.sharing,
      },
      streamId: isDAI ? streamId : undefined,
      disableFirstPreroll: reloadPlayer,
      autoplay: true,
      is360,
      playlist,
    };
    this.fmgFunction({
      ...options,
      ...liveStreamOptions,
    });
  }

  /**
   * Set livestream listeners
   */
  setListeners = () => {
    onPreauthorizedResources(this.onPreauthorizedResources, this.nodeId);
    onVideoLanguageChanged(this.onLanguageChanged, this.nodeId);
  };

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
      setVideoLanguageParams(lang);
      this.setState({ reloadPlayer: true, lang });
      this.context?.store?.dispatch(setCurrentLanguage({ language: lang }));
    }
  }

  /**
   * Render view
   * @returns {JSX}
   */
  render () {
    const {
      settings,
      is360,
    } = this.props;
    const {
      reloadPlayer,
      lang,
    } = this.state;
    return (
      <Video
        ref={(v) => { this.video = v; }}
        {...this.props}
        allowAnchor={!is360}
        isActive={this.livestreamData.isActive}
        isLiveStream
        image={getKey(settings, 'livestream.image')}
        widgetData={settings?.livestream}
        language={lang}
        nodeId={this.nodeId}
        setListeners={this.setListeners}
        fmgCall={{
          name: PLAY_LIVESTREAM,
          custom: this.fmgCustom,
        }}
        reloadPlayer={reloadPlayer}
      />
    );
  }
}

LivestreamPlayerWrapper.propTypes = {
  channels: PropTypes.object,
  language: PropTypes.string,
  mcpid: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  hidePlaylist: PropTypes.bool,
  is360: PropTypes.bool,
  pageData: PropTypes.object,
  playlist: PropTypes.array,
  settings: PropTypes.shape({
    livestream: PropTypes.object,
  }).isRequired,
};

LivestreamPlayerWrapper.contextType = ReactReduxContext;

export default LivestreamPlayerWrapper;
