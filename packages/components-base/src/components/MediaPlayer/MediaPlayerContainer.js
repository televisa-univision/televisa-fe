/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Store from '@univision/fe-commons/dist/store/store';
import { isRadioPage } from '@univision/fe-commons/dist/store/storeHelpers';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import features from '@univision/fe-commons/dist/config/features';
import AbacastPlayerContainer from '@univision/fe-local/dist/components/widgets/abacast/AbacastPlayer/AbacastPlayerContainer';
import CastingWrapper from '@univision/fe-video/dist/components/CastingWrapper';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import { RADIO_PLAYER_ID } from '@univision/fe-commons/dist/constants/radio';

import Styles from './MediaPlayerContainer.styles';

// Styled components
export const VideoWrapper = styled.div`${Styles.videoWrapper}`;
export const VideoPipWrapper = styled.div`${Styles.videoPipWrapper}`;

/**
 * Container to handle the spa shell
 * @param {Object} props current props
 * @param {Object} props.mediaplayer.anchorPlayer.isPodcastEpisode
 * true if the reproduced audio is a podcast episode
 * @param {Object} props.mediaplayer.anchorPlayer.sharingOptions social networks links
 * @returns {JSX}
 */
const MediaPlayerContainer = (props) => {
  const {
    mediaPlayer: { anchorPlayer },
    closeRadio,
  } = props;

  const {
    abacast,
    alternativeLogo,
    detailedDescription,
    image,
    isPodcastEpisode,
    logo,
    onReady,
    sharingOptions,
    socialNetworks,
    stationDescription,
    stationTitle,
    uri,
    uid,
    zoneId,
  } = anchorPlayer;

  const audioUrl = isPodcastEpisode ? getKey(abacast, 'url') : getKey(abacast, 'mp3Stream');

  return (
    <ErrorBoundary>
      <VideoWrapper id="mediaplayer-video-anchor-portal" />
      {features.video.enableCasting() && <CastingWrapper />}
      {(audioUrl || isRadioPage(Store)) && (
        <AbacastPlayerContainer
          key={RADIO_PLAYER_ID}
          image={image}
          isPodcastEpisode={isPodcastEpisode}
          detailedDescription={detailedDescription}
          logo={logo}
          alternativeLogo={alternativeLogo}
          onClose={closeRadio}
          onReady={onReady}
          sharingOptions={sharingOptions}
          socialNetworks={socialNetworks}
          stationDescription={stationDescription}
          stationTitle={stationTitle}
          streamUrl={audioUrl}
          uri={uri}
          uid={uid}
          zoneId={zoneId}
        />
      )}
    </ErrorBoundary>
  );
};

MediaPlayerContainer.propTypes = {
  closeRadio: PropTypes.func,
  mediaPlayer: PropTypes.object,
};

export default MediaPlayerContainer;
