import React, { useCallback, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';
import { action } from '@storybook/addon-actions';

import castingTypes from './CastingControls.config';
import CastingControls from '.';

/**
 * Mock click event handler
 * @param {string} name - click name event
 */
const click = (name) => {
  action(`${name} was clicked`);
};

/**
 * Dummy casting controls wrapper component
 * @param {Object} newProps - react component props
 * @returns {JSX}
 */
const WrapperCastingControls = (newProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasVolume, setHasVolume] = useState(true);
  const [showDisable, setShowDisable] = useState(false);
  const [onCasting, setCastingOn] = useState(true);

  /**
   * For handling play/pause controls
   */
  const playPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);
  /**
   * For handling volume on/off controls
   */
  const volumeOnOff = useCallback(() => {
    setHasVolume(!hasVolume);
  }, [hasVolume]);
  /**
   * For handling disable screen
   */
  const showDisableScreen = useCallback(() => {
    setShowDisable(!showDisable);
  }, [showDisable]);
  /**
   * For handling disable screen
   */
  const startCasting = useCallback(() => {
    setCastingOn(!onCasting);
  }, [onCasting]);

  return (
    <CastingControls
      elapsedTime={100}
      duration={174}
      castingDeviceName="[TV][LG]42LA620T-DA"
      title="Machester United espera la visita del Bayern  en Champions League"
      pauseCallback={playPause}
      volumeCallback={volumeOnOff}
      isPlaying={isPlaying}
      hasVolume={hasVolume}
      showDisableScreenCallback={showDisableScreen}
      showDisableScreen={showDisable}
      disableCallback={startCasting}
      onCasting={onCasting}
      rewindCallback={() => click('Rewind Callback')}
      forwardCallback={() => click('Forward Callback')}
      nextCallback={() => click('Next Callback')}
      previousCallback={() => click('Previous Callback')}
      captionsCallback={() => click('Captions Callback')}
      {...newProps}
    />
  );
};

storiesOf('Casting/CastingControls/Desktop', module)
  .addDecorator((story) => {
    return <div className="uvs-container">{story()}</div>;
  })
  .add('with Video Clip', () => (
    <WrapperCastingControls />
  ))
  .add('with Video Playlist', () => (
    <WrapperCastingControls type={castingTypes.PLAYLIST} />
  ))
  .add('with Livestream', () => (
    <WrapperCastingControls type={castingTypes.LIVESTREAM} />
  ))
  .add('with Advertisement', () => (
    <WrapperCastingControls
      type={castingTypes.ADVERTISING}
      adDuration="35"
      currentAd="1"
      totalAds="4"
      advertisementUrl="www.tudn.com"
    />
  ));

storiesOf('Casting/CastingControls/Mobile', module)
  .addDecorator(withViewport('iphone8p'))
  .add('with Video Clip mobile', () => (
    <WrapperCastingControls isMobile />
  ))
  .add('with Video Playlist mobile', () => (
    <WrapperCastingControls type={castingTypes.PLAYLIST} isMobile />
  ))
  .add('with Livestream mobile', () => (
    <WrapperCastingControls type={castingTypes.LIVESTREAM} isMobile />
  ))
  .add('with Advertisement mobile', () => (
    <WrapperCastingControls
      type={castingTypes.ADVERTISING}
      adDuration="1:37"
      isMobile
      currentAd="2"
      totalAds="3"
      advertisementUrl="www.tudn.com"
    />
  ));
