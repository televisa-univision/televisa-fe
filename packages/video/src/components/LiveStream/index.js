import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';
import { VIDEO_TYPE_LIVESTREAM } from '@univision/fe-commons/dist/constants/video';
import {
  getRequestParams, getTracking, getPageData, getPageUrl,
} from '@univision/fe-commons/dist/store/storeHelpers';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import features from '@univision/fe-commons/dist/config/features';
import { userLocationSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { checkPreauthorizedResources, parsePlaylistItems } from '../../helpers';

import ratingNeulionMapping from './ratingNeulionMapping';
import RatingValidator from '../player/NeulionPlayerWrapper/NeulionPlayerRatingValidator';

import Video from '../Video';

/**
 * LiveStream component. Wraps a Video component to display a live stream.
 * @param {Object} props Component props
 * @returns {XML}
 * @constructor
 */
class LiveStream extends React.Component {
  /**
   * setup state and bind methods
   * @param  {Object} props component props
   */
  constructor(props) {
    super(props);
    const {
      livestreamId,
      streamId,
      videoProps,
      customNodeId,
      userLocation,
      ...restItem
    } = this.props;

    this.isWorldCupMVP = features.deportes.isWorldCupMVP();
    this.fmgCustom = this.fmgCustom.bind(this);
    this.onPreauthorizedResources = checkPreauthorizedResources.bind(this);
    this.livestreamId = streamId || livestreamId;
    this.nodeId = customNodeId || `livestream-${this.livestreamId}`;
    this.requestParams = getRequestParams(Store);
    this.trackingData = getTracking(Store);
    this.pageDisableAds = getKey(getPageData(Store), 'data.adSettings.disableVideoAds', false);
    this.isActive = getKey(props, 'isActive', getKey(props, 'active'));
    this.fmgCallName = 'playLivestream';
    this.playlist = videoProps?.playlist || parsePlaylistItems([{
      streamId,
      livestreamId,
      videoType: VIDEO_TYPE_LIVESTREAM,
      ...restItem,
    }], this.isWorldCupMVP, userLocation);
  }

  /**
   * Execute this custom fuction here instead of calling default FMG
   * @param {Object} options extra options to be sent to the SDK
   */
  async fmgCustom(options) {
    const {
      channels,
      dfp,
      disableVideoAds,
      enabled,
      enableDai,
      jwRecommendationChannel,
      isAkamaiTokenEnabled,
      isNewsDigitalChannel,
      isDigitalChannelLiveStream,
      mainImage,
      playerType,
      primaryTag,
      program,
      title,
      tvssUrl,
      is360,
      skipPause,
    } = this.props;

    const seoName = ratingNeulionMapping[getPageUrl(Store)];
    await RatingValidator.initLivestreamValidation(seoName, this.nodeId);
    const rating = RatingValidator.getCurrentRating();

    const liveStreamOptions = {
      channels,
      disableAds: options.disableAds || disableVideoAds || this.pageDisableAds,
      displayEnVivo: true,
      hlsUrl: true,
      image: mainImage,
      isActive: this.isActive,
      isAkamaiTokenEnabled,
      isAuth: getKey(this.props, 'isAuth', getKey(this.props, 'auth')),
      isDAI: enableDai,
      livestreamId: this.livestreamId,
      primaryTag: getKey(primaryTag, 'name', ''),
      title: program?.title || title,
      jwRecommendationChannel,
      rating,
      tvssUrl,
      type: playerType || '',
      is360,
      skipPause,
      isNewsDigitalChannel: isNewsDigitalChannel || isDigitalChannelLiveStream,
      playlist: this.playlist,
    };

    if (enableDai) {
      liveStreamOptions.streamId = this.livestreamId;
    }

    if (typeof enabled !== 'undefined') {
      liveStreamOptions.disabled = !enabled;
    }

    if (dfp) {
      liveStreamOptions.dfp = dfp;
    }

    global.window.FMG[this.fmgCallName]({
      ...options,
      ...liveStreamOptions,
    });

    global.window.FMG.on(
      'preauthorizedResources',
      this.onPreauthorizedResources,
      this.nodeId
    );
  }

  /**
   * Render view
   * @returns {JSX}
   */
  render() {
    const {
      autoplay,
      controls,
      disableAnchor,
      disableFirstPreroll,
      image,
      isNewsDigitalChannel,
      isDigitalChannelLiveStream,
      title,
      uri,
      videoProps = {
        isLivestream: true,
      },
      skipPause,
    } = this.props;

    return (
      <Video
        {...videoProps}
        autoplay={autoplay}
        controls={controls}
        disableAnchor={disableAnchor}
        disableFirstPreroll={disableFirstPreroll}
        sticky
        fmgCall={{
          name: this.fmgCallName,
          custom: this.fmgCustom,
        }}
        nodeId={this.nodeId}
        image={image}
        isActive={this.isActive}
        isNewsDigitalChannel={isNewsDigitalChannel || isDigitalChannelLiveStream}
        isLiveStream
        title={title}
        uri={uri}
        playlist={this.playlist}
        skipPause={skipPause}
      />
    );
  }
}

/**
 * @property {array} channels - array of channels needed for tudn xtra livestream validations
 * @property {string} livestreamId - id required for livestream playback
 * @property {string} uri - livestream content url
 */
LiveStream.propTypes = {
  autoplay: PropTypes.bool,
  controls: PropTypes.bool,
  disableAnchor: PropTypes.bool,
  disableFirstPreroll: PropTypes.bool,
  channels: PropTypes.array,
  dfp: PropTypes.object,
  disableVideoAds: PropTypes.bool,
  enabled: PropTypes.bool,
  enableDai: PropTypes.bool,
  image: PropTypes.object,
  jwRecommendationChannel: PropTypes.string,
  livestreamId: PropTypes.string.isRequired,
  streamId: PropTypes.string.isRequired,
  mainImage: PropTypes.string,
  playerType: PropTypes.string,
  primaryTag: PropTypes.object.isRequired,
  title: PropTypes.string,
  tvssUrl: PropTypes.string.isRequired,
  uri: PropTypes.string,
  videoProps: PropTypes.object,
  program: PropTypes.object,
  customNodeId: PropTypes.string,
  isAkamaiTokenEnabled: PropTypes.bool,
  isNewsDigitalChannel: PropTypes.bool,
  isDigitalChannelLiveStream: PropTypes.bool,
  is360: PropTypes.bool,
  skipPause: PropTypes.bool,
  userLocation: PropTypes.string,
};

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
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
)(LiveStream);
