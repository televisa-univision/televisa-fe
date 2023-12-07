import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchLocationApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { WHITE } from '@univision/fe-icons/dist/constants/colors';
import Link from '@univision/fe-components-base/dist/components/Link';
import features from '@univision/fe-commons/dist/config/features';
import RadioStationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/station/RadioStationTracker';
import * as actions from '@univision/fe-commons/dist/store/actions/player-actions';
import { getCookie, getKey, isValidURL } from '@univision/fe-commons/dist/utils/helpers';
import {
  changeAutoplayPlayer,
  closeAnchoredPlayer,
  doIfPlayerExists,
} from '@univision/fe-commons/dist/utils/video';
import { PIP_PLAYER_ID } from '@univision/fe-commons/dist/constants/video';
import { DO_NOT_SELL_INFORMATION } from '@univision/fe-commons/dist/constants/personalization';
import { isPodcastEpisode } from '../../../utils/helpers';

import Styles from './PlayStationButton.styles';

const Button = styled.div`${Styles.playStationBtn}`;
const ButtonLink = styled(Link)`${Styles.playStationBtn}`;
/**
 * Button component for playing a station
 */
export class PlayStationButtonComponent extends Component {
  /**
   * Validate if radio station is enabled for radio pip
   * @returns {boolean}
   */
  static isValidPip() {
    return features.radio.isSingleVideoInstance();
  }

  /**
   * Returns the props to use for the launcher button
   * @returns {{}}
   */
  getButtonProps = () => {
    const {
      color,
    } = this.props;
    const bgColor = color || 'transparent';
    const buttonProps = {
      style: { background: bgColor },
      onClick: this.handleStationLaunch,
    };

    return buttonProps;
  };

  /**
   * Add US Privacy String to URL Audio Streaming
   * @param {string} streamUrl streaming url for radio station
   * @param {Object} userLocation user location data
   * @returns {string}
   */
  addPrivacy = (streamUrl, userLocation) => {
    if (!isValidURL(streamUrl)) return streamUrl;
    const separator = streamUrl.indexOf('?') !== -1 ? '&' : '?';
    let valueUsPrivacy = '1YNN';
    if (getKey(userLocation, 'regionCode') === 'CA' && getCookie(DO_NOT_SELL_INFORMATION) === 'DO_NOT_SELL') {
      valueUsPrivacy = '1YNY';
    }
    const privacy = `us_privacy=${valueUsPrivacy}`;
    return streamUrl.concat(separator).concat(privacy);
  }

  handleStationLaunch = async () => {
    const {
      abacast,
      alternativeLogo,
      detailedDescription,
      duration,
      mediaPlayerPlayRadio,
      image,
      logo,
      type,
      sharing: {
        options: sharingOptions,
      } = {},
      socialNetworks,
      stationDescription,
      stationTitle,
      uri,
      uid,
      contentType,
      zoneId,
    } = this.props;

    if (abacast) {
      if (PlayStationButtonComponent.isValidPip()) {
        const isPodcastAudio = isPodcastEpisode(contentType);
        const userLocation = !isPodcastAudio && await fetchLocationApi();
        const links = {
          ...abacast,
          ...(!isPodcastAudio && {
            aacStreamiOS: this.addPrivacy(abacast.aacStreamiOS, userLocation),
            aacStreamAndroid: this.addPrivacy(abacast.aacStreamAndroid, userLocation),
            mp3Stream: this.addPrivacy(abacast.mp3Stream, userLocation),
          }),
        };
        closeAnchoredPlayer();
        doIfPlayerExists(PIP_PLAYER_ID, (player) => {
          player.stop();
        });
        mediaPlayerPlayRadio({
          abacast: links,
          alternativeLogo,
          detailedDescription,
          duration,
          image,
          isPodcastEpisode: isPodcastAudio,
          logo,
          sharingOptions,
          socialNetworks,
          stationDescription,
          stationTitle,
          uri,
          uid,
          zoneId,
        });
        changeAutoplayPlayer(PIP_PLAYER_ID);
      } else {
        RadioStationTracker.track(RadioStationTracker.events.launchRadioPlayer, {
          title: stationTitle,
          type,
        });
      }
    }
  };

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const { children, type } = this.props;
    const defaultChildren = <Icon name="playnocircle" size="small" fill={WHITE} />;

    if (PlayStationButtonComponent.isValidPip()) {
      return (
        <Button
          {...this.getButtonProps()}
          role="button"
          tabIndex="0"
          type={type}
          onKeyPress={this.handleStationLaunch}
        >
          {children || defaultChildren}
        </Button>
      );
    }

    return (
      <ButtonLink {...this.getButtonProps()} type={type}>
        {children || defaultChildren}
      </ButtonLink>
    );
  }
}

PlayStationButtonComponent.propTypes = {
  children: PropTypes.node,
  abacast: PropTypes.object,
  alternativeLogo: PropTypes.object,
  color: PropTypes.string,
  contentType: PropTypes.string,
  detailedDescription: PropTypes.string,
  duration: PropTypes.string,
  image: PropTypes.object,
  logo: PropTypes.object,
  mediaPlayerPlayRadio: PropTypes.func,
  sharing: PropTypes.shape({
    options: PropTypes.shape({
      facebook: PropTypes.object,
      twitter: PropTypes.object,
      whatsapp: PropTypes.object,
      mail: PropTypes.object,
    }),
  }),
  socialNetworks: PropTypes.array,
  stationDescription: PropTypes.string,
  stationTitle: PropTypes.string,
  type: PropTypes.oneOf([
    'featuredStation',
    'toolbar',
    'nowPlaying',
    'nowPlayingPlain',
    'stationList',
    'plain',
  ]),
  uri: PropTypes.string,
  uid: PropTypes.string,
  zoneId: PropTypes.number,
};

export default connect(
  null,
  {
    mediaPlayerPlayRadio: actions.playRadio,
  }
)(PlayStationButtonComponent);
