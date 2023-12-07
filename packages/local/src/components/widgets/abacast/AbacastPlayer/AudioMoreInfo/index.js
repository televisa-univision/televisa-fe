import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import PLAY_STATES from '@univision/fe-commons/dist/constants/radioPlayStates';
import Button from '@univision/fe-components-base/dist/components/Button';
import OptionsList from '@univision/fe-components-base/dist/components/CardOptionsList';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Store from '@univision/fe-commons/dist/store/store';
import { isDesktop } from '@univision/fe-commons/dist/store/storeHelpers';
import StreamLoading from '../StreamLoading';
import AbacastPlayerContext from '../AbacastPlayerContext';

import {
  AudioTitleWrapper,
  AudioTitle,
  AudioDetails,
  AudioItem,
  AudioButton,
} from './AudioMoreInfo.styles';

/**
 * Shows detailed information of the audio being played.
 * @param {string} description audio description
 * @param {string} iconName icon name of the link
 * @param {string} play audio state
 * @param {string} title audio title
 * @param {string} textLink text for link (entrypoint)
 * @param {function} togglePlaying action for play icon
 * @param {string} uri link for entrypoint
 * @returns {JSX}
 */
const AudioMoreInfo = ({
  description,
  iconName,
  play,
  textLink,
  title,
  togglePlaying,
  uri,
}) => {
  const context = useContext(AbacastPlayerContext);
  const [playerData, setPlayerData] = useState({ position: 0 });
  const setPlayerDataDelay = throttle(setPlayerData, 1000);

  useEffect(() => {
    // eslint-disable-next-line babel/no-unused-expressions
    context?.player?.on('time', setPlayerDataDelay);
    return () => {
      // eslint-disable-next-line babel/no-unused-expressions
      context?.player?.off('time', setPlayerDataDelay);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react/destructuring-assignment
  const duration = context?.player?.getDuration() || 0;
  const minutes = Math.round(duration / 60);
  const remaining = minutes - Math.round(playerData.position / 60);
  return (
    <>
      <AudioTitleWrapper>
        <AudioTitle>{title}</AudioTitle>
        {play === PLAY_STATES.LOADING ? (
          <StreamLoading size={57} />
        ) : (
          <Button onClick={togglePlaying} plain>
            <Icon
              name={play === PLAY_STATES.PLAY ? 'pausecircle' : 'playcircle'}
              size={isDesktop(Store) ? 56 : 49}
              fill={WHITE}
            />
          </Button>
        )}
      </AudioTitleWrapper>
      {(minutes && remaining) && (
        <OptionsList>
          <AudioItem>{minutes} MIN</AudioItem>
          <AudioItem>{remaining} MIN RESTANTES</AudioItem>
        </OptionsList>
      )}
      <AudioDetails>{description}</AudioDetails>
      <AudioButton href={uri}>
        <Icon name={iconName} size={20} fill={WHITE} />
        {textLink}
      </AudioButton>
    </>
  );
};

AudioMoreInfo.propTypes = {
  description: PropTypes.string,
  iconName: PropTypes.string,
  play: PropTypes.string,
  textLink: PropTypes.string,
  title: PropTypes.string,
  togglePlaying: PropTypes.func,
  uri: PropTypes.string,
};

AudioMoreInfo.defaultProps = {
  iconName: 'podcast',
};

export default AudioMoreInfo;
