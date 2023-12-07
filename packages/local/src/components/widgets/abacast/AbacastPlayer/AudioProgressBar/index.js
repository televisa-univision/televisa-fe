import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

import { GREY_BLACK, GREEN } from '@univision/fe-commons/dist/utils/styled/constants';
import ProgressBar from '@univision/fe-components-base/dist/components/ProgressBar';
import { AudioProgressBarContainer, RangeInput } from './AudioProgressBar.styles';
import AbacastPlayerContext from '../AbacastPlayerContext';
/**
 * Handle click
 * @param {Object} evt the event object
 */
const handleClick = (evt) => {
  evt.stopPropagation();
};

/**
 * Renders an interactive progress bar showing the current position in the audio.
 * @param {Function} onChange function to be invoked when the progress bar is clicked.
 * @returns {JSX}
 */
const AudioProgressBar = ({ onChange }) => {
  const context = useContext(AbacastPlayerContext);
  const { player } = context;
  const [playerData, setPlayerData] = useState({
    duration: player?.getDuration?.() ?? 0,
    position: player?.getPosition?.() ?? 0,
  });
  const setPlayerDataDelay = throttle(setPlayerData, 1000);

  useEffect(() => {
    if (player && player.on) {
      player.on('time', setPlayerDataDelay);
    }
    return () => {
      if (player && player.off) {
        player.off('time', setPlayerDataDelay);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  const percent = playerData.position / playerData.duration * 100;
  return (
    <AudioProgressBarContainer
      role="button"
      tabIndex="0"
      onClick={handleClick}
      onKeyPress={handleClick}
    >
      <RangeInput type="range" min="0" max="100" value={percent} onChange={onChange} />
      <ProgressBar
        percent={percent}
        strokeColor={GREEN}
        trailSize={4}
        trailColor={GREY_BLACK}
      />
    </AudioProgressBarContainer>
  );
};

AudioProgressBar.propTypes = {
  onChange: PropTypes.func,
};

export default AudioProgressBar;
