/**
 * @module Prende tv Video Component
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MediaPlayerConnector from '@univision/fe-components-base/dist/components/MediaPlayer/MediaPlayerConnector';
import BaseVideo from '@univision/fe-video/dist/components/VideoPlayer';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import Store from '@univision/fe-commons/dist/store/store';
import Icon from '@univision/fe-icons/dist/components/Icon';

import { getPlayerInstance } from '@univision/fe-commons/dist/utils/video';
import PrendeTVContext from '../../context';
import CTA from '../CTA';
import Styles from './Video.styles';

const ContainerGradient = styled.div`${Styles.containerGradient}`;
const CustomCTA = styled(CTA)`${Styles.link}`;
const ToggleAudio = styled.div`${Styles.toggleAudio}`;
const VideoWrapper = styled.div`${Styles.videoWrapper}`;

/**
 * Prende TV Video component
 * @param {Object} props - initial props of the component
 * @property {Object} props.callToAction - call to action button
 * @property {Object} props.lead - main image
 * @returns {JSX.Element}
 */
const Video = ({
  callToAction, lead, active, handleVideoCallback,
}) => {
  const link = getKey(callToAction, 'link', {});
  const playerId = `player-${lead.uid}`;
  const [isAudioOn, setAudioOn] = useState(false);

  /**
   * Turn on/off audio
   */
  const handleAudio = useCallback(async () => {
    setAudioOn(!isAudioOn);
    const playerInstance = await getPlayerInstance(playerId);
    playerInstance.setMute();
  }, [isAudioOn, playerId]);

  /**
   * Play player instance
   */
  const playInstance = useCallback(async () => {
    const playerInstance = await getPlayerInstance(playerId);
    if (playerInstance) {
      playerInstance.play();
      if (handleVideoCallback && active) {
        playerInstance.on('complete', handleVideoCallback);
      }
    }
  }, [handleVideoCallback, playerId, active]);

  useEffect(() => {
    if (active) {
      playInstance();
    }
  }, [active, playInstance]);

  return (
    <Provider context={PrendeTVContext} store={Store}>
      <VideoWrapper className={`col-12 ${active ? 'active' : ''}`}>
        <BaseVideo
          context={PrendeTVContext}
          controls={false}
          allowAnchor={false}
          fullWidth
          autoplay
          disableVideoAds
          hideMeta
          widgetData={{ ...lead, playlist: [] }}
          hidePlaylist
          isPrendeTV
          repeat={!handleVideoCallback}
        />
        {callToAction && (
          <ContainerGradient>
            <CustomCTA href={link.href} target={link.target} text={link.text} />
          </ContainerGradient>
        )}
        <ToggleAudio onClick={handleAudio}>
          <Icon name={isAudioOn ? 'soundOn' : 'soundOff'} size={20} />
        </ToggleAudio>
        <MediaPlayerConnector context={PrendeTVContext} />
      </VideoWrapper>
    </Provider>
  );
};

Video.propTypes = {
  callToAction: PropTypes.object,
  lead: PropTypes.shape({
    type: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    uri: PropTypes.string,
    mcpid: PropTypes.string,
    publishDate: PropTypes.string,
    image: PropTypes.object,
    sharing: PropTypes.object,
  }),
  active: PropTypes.bool,
  handleVideoCallback: PropTypes.func,
};

export default Video;
