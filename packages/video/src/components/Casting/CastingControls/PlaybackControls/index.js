import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import toMinutes from '@univision/fe-utilities/helpers/date/toMinutes';

import CastingBadge from '../CastingBadge';
import CastingControlsButton from '../CastingControlsButton';
import CastingFixedButton from '../CastingFixedButton';
import controls, { controlNames } from './PlaybackControls.config';
import castingTypes from '../CastingControls.config';
import Styles from './PlaybackControls.styles';

const PlaybackWrapper = styled.div`${Styles.playbackWrapper}`;
const ControlsWrapper = styled.div`${Styles.controlsWrapper}`;
const CastingTime = styled.div`${Styles.castingTime}`;

/**
 * Get Playback controls
 * @param {Array} buttonsArray - array containing buttons for controls
 * @param {Array} iconUpdates - array with icon that should update
 * @param {Array} callbacks - array with callbacks for th control buttons
 * @param {bool} isPlaylist - if casting video is in playlist
 * @param {string} type - the video casting type
 * @returns {Array}
 */
const getPlaybackControls = ({
  buttonsArray, iconUpdates, callbacks, type, isPlaylist,
}) => {
  if (isValidArray(buttonsArray)) {
    let usedButtons = buttonsArray;
    if (!isPlaylist) {
      usedButtons = usedButtons.filter(b => b?.name !== controlNames.NEXT);
    }
    const hasExtendedControls = [castingTypes.CLIP, castingTypes.PLAYLIST].includes(type);
    return usedButtons.map((btn) => {
      const ButtonComponent = btn?.fixed ? CastingFixedButton : CastingControlsButton;
      const buttonName = btn?.defaultName || btn?.name;
      const cb = callbacks[buttonName];
      const updates = iconUpdates[buttonName] || false;

      if (!isValidFunction(cb)) {
        return null;
      }
      return (
        <ButtonComponent
          key={buttonName}
          isPlaybackButton
          buttonCallback={cb}
          shouldUpdateName={updates}
          hasExtendedControls={hasExtendedControls}
          {...btn}
        />
      );
    });
  }
  return [];
};

/**
 * Get Playback time
 * @param {number} duration - the video casting duration
 * @param {number} elapsedTime - the current elapsed time of the video
 * @param {string} type - the video casting type
 * @returns {number/string}
 */
const getPlaybackTime = ({
  duration, elapsedTime, type,
}) => {
  const defaultTime = toMinutes(0);
  const isLivestream = [castingTypes.LIVESTREAM].includes(type);
  const currentTime = isValidValue(elapsedTime) ? toMinutes(elapsedTime) : defaultTime;
  const totalTime = isValidValue(duration) ? toMinutes(duration) : defaultTime;

  if (isLivestream) {
    return totalTime;
  }
  return `${currentTime} - ${totalTime}`;
};

/**
 * PlaybackControls Component
 * @param {Object} props - component props
 * @param {number} [props.duration] - the duration of the video
 * @param {number} [props.elapsedTime] - the elapsed time  of the video
 * @param {function} [props.forwardCallback] - the forward 10 video callback
 * @param {bool} [props.isMobile = false] - true if in mobile
 * @param {bool} [props.isMuted = false] - true if video is muted
 * @param {bool} [props.isPlaying = false] - true if casting video is playing
 * @param {bool} [props.isPlaylist = false] - true if casting video is in playlist
 * @param {function} [props.nextCallback] - the play next video function callback
 * @param {function} [props.pauseCallback] - the function for playing the casting video
 * @param {function} [props.previousCallback] - the play previous video function callback
 * @param {function} [props.rewindCallback] - the rewind 10 video callback
 * @param {string} [props.type] - the type of video that is casting
 * @param {function} [props.volumeCallback] - the function for muting volume on video
 * @returns {JSX}
 */
const PlaybackControls = ({
  duration,
  elapsedTime,
  forwardCallback,
  isMobile,
  isMuted,
  isPlaying,
  isPlaylist,
  nextCallback,
  pauseCallback,
  previousCallback,
  rewindCallback,
  type,
  volumeCallback,
}) => {
  const callbacks = {
    [controlNames.FORWARD]: forwardCallback,
    [controlNames.PLAY]: pauseCallback,
    [controlNames.NEXT]: nextCallback,
    [controlNames.PREVIOUS]: previousCallback,
    [controlNames.REWIND]: rewindCallback,
    [controlNames.VOLUME]: volumeCallback,
  };
  const iconUpdates = {
    [controlNames.PLAY]: isPlaying,
    [controlNames.VOLUME]: isMuted,
  };
  const buttonsArray = useMemo(() => controls[type]?.buttons, [type]);

  const playbackControl = useMemo(() => getPlaybackControls({
    buttonsArray, iconUpdates, callbacks, type, isPlaylist,
  }),
  [buttonsArray, iconUpdates, callbacks, type, isPlaylist]);

  const playbackTime = useMemo(() => getPlaybackTime({
    duration, elapsedTime, type,
  }),
  [duration, elapsedTime, type]);

  if (!isValidArray(buttonsArray)) {
    return null;
  }

  return (
    <PlaybackWrapper>
      {!isMobile && (<CastingBadge type={type} />)}
      <ControlsWrapper>
        {playbackControl}
        {controls[type].hasDuration && (
          <CastingTime>
            {type !== castingTypes.LIVESTREAM && playbackTime}
          </CastingTime>
        )}
      </ControlsWrapper>
    </PlaybackWrapper>
  );
};

PlaybackControls.propTypes = {
  duration: PropTypes.number,
  elapsedTime: PropTypes.number,
  forwardCallback: PropTypes.func,
  isMobile: PropTypes.bool,
  isMuted: PropTypes.bool,
  isPlaying: PropTypes.bool,
  isPlaylist: PropTypes.bool,
  nextCallback: PropTypes.func,
  pauseCallback: PropTypes.func,
  previousCallback: PropTypes.func,
  rewindCallback: PropTypes.func,
  type: PropTypes.string,
  volumeCallback: PropTypes.func,
};

PlaybackControls.defaultProps = {
  isPlaying: true,
  isMuted: false,
  isPlaylist: false,
  isMobile: false,
};

export default PlaybackControls;
