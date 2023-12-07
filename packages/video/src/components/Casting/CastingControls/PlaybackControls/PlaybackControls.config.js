/**
 * Icons name for playback control buttons
*/
const PLAY = 'avPlay';
const PAUSE = 'avPause';
const REWIND = 'rewindTen';
const FORWARD = 'forwardTen';
const VOLUME = 'volumeUp';
const VOLUME_OFF = 'volumeOff';
const NEXT = 'avNext';
const PREVIOUS = 'avPrevious';

export const controlNames = Object.freeze({
  PLAY,
  PAUSE,
  REWIND,
  FORWARD,
  VOLUME,
  VOLUME_OFF,
  NEXT,
  PREVIOUS,
});

/**
 * Play button props
 */
const playButton = {
  defaultName: PLAY,
  updateName: PAUSE,
};

/**
 * Volume button props
 */
const volumeButton = {
  defaultName: VOLUME,
  updateName: VOLUME_OFF,
};

/**
 * Next button props
 */
const nextButton = {
  name: NEXT,
  fixed: true,
};

const forwardButton = {
  name: FORWARD,
  fixed: true,
};

const rewindButton = {
  name: REWIND,
  fixed: true,
};

/**
 * Playback controls configuration
 */
const controls = {
  livestream: {
    hasDuration: true,
    hasExtraControls: true,
    buttons: [
      playButton,
      nextButton,
      volumeButton,
    ],
  },
  clip: {
    hasDuration: true,
    hasExtraControls: false,
    buttons: [
      rewindButton,
      playButton,
      forwardButton,
      volumeButton,
    ],
  },
  advertising: {
    hasDuration: false,
    hasExtraControls: false,
    buttons: [
      playButton,
      volumeButton,
    ],
  },
  playlist: {
    hasDuration: true,
    hasExtraControls: false,
    buttons: [
      rewindButton,
      playButton,
      forwardButton,
      nextButton,
      volumeButton,
    ],
  },
};

export default controls;
