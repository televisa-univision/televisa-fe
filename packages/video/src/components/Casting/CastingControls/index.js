import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import { GREEN } from '@univision/fe-utilities/styled/constants';
import AnimatedModalBackGround from '@univision/fe-components-base/dist/components/AnimatedModalBackground';

import CastingControlsButton from './CastingControlsButton';
import CastingTitle from './CastingTitle';
import DisableCastingScreen from './DisableCastingScreen';
import PlaybackControls from './PlaybackControls';
import ExtraControls from './ExtraControls';

import castingTypes, {
  castingIcons,
} from './CastingControls.config';
import {
  variants, CASTING_ON, CASTING_OFF,
} from './CastingControls.animation';
import Styles from './CastingControls.styles';

const CastingControlsWrapper = styled(motion.div)`${Styles.container}`;
const CastingControlsButtonWrapper = styled(CastingControlsButton)`${Styles.castingControlsButtonWrapper}`;
const CastingWrapper = styled.div`${Styles.castingWrapper}`;
const PlaybackWrapper = styled.div`${Styles.playbackWrapper}`;
const ControlsWrapper = styled.div`${Styles.controlsWrapper}`;
const MobileTitleWrapper = styled.div`${Styles.mobileTitleWrapper}`;

/**
 * Casting Controls Component
 * @param {Object} props - component props
 * @param {bool} [props.activeCaptions = false] - true if captions are active
 * @param {string} [props.adDuration] - the duration of the currentAd
 * @param {string} [props.advertisementUrl] - the url for the advertisement
 * @param {function} [props.captionsCallback] - the captions callback
 * @param {string} [props.castingDeviceName] - the casting device name
 * @param {string} [props.castingPlatform] - the casting platform name
 * @param {string} [props.currentAd] - the current ad id playing
 * @param {function} [props.disableCallback] - the function for the disabling casting
 * @param {number} [props.duration] - the duration of the video in seconds
 * @param {number} [props.elapsedTime] - the elapsed time of the video in seconds
 * @param {function} [props.forwardCallback] - the forward video function callback
 * @param {bool} [props.hasCaptions = false] - true if captions are available
 * @param {bool} [props.isMobile = false] - true if in mobile
 * @param {bool} [props.isMuted = false] - true if video is muted
 * @param {bool} [props.isPlaying = false] - true if casting video is playing
 * @param {bool} [props.isPlaylist = false] - true if casting video is in playlist
 * @param {function} [props.nextCallback] - the play next video function callback
 * @param {bool} [props.onCasting = false] - true if casting is active
 * @param {function} [props.pauseCallback] - the function for playing the casting video
 * @param {function} [props.previousCallback] - the play previous video function callback
 * @param {function} [props.rewindCallback] - the forward video function callback
 * @param {bool} [props.showDisableScreen = false] - true if it is showing disable screen
 * @param {function} [props.showDisableScreenCallback] - function for show/hide disable cast screen
 * @param {string} [props.title] - the title for the casting video
 * @param {string} [props.totalAds] - the total number of ads on the video
 * @param {string} [props.type] - the type of video that is casting
 * @param {function} [props.volumeCallback] - the function for muting volume on video
 * @returns {JSX}
 */
const CastingControls = ({
  activeCaptions,
  adDuration,
  advertisementUrl,
  captionsCallback,
  castingDeviceName,
  castingPlatform,
  currentAd,
  disableCallback,
  duration,
  elapsedTime,
  forwardCallback,
  hasCaptions,
  isMobile,
  isMuted,
  isPlaying,
  isPlaylist,
  onCasting,
  nextCallback,
  pauseCallback,
  previousCallback,
  rewindCallback,
  showDisableScreen,
  showDisableScreenCallback,
  title,
  totalAds,
  type,
  volumeCallback,
}) => {
  const castTitle = (
    <CastingTitle
      adDuration={adDuration}
      advertisementUrl={advertisementUrl}
      currentAd={currentAd}
      isMobile={isMobile}
      title={title}
      totalAds={totalAds}
      type={type}
    />
  );
  return (
    <AnimatePresence>
      {onCasting && (
        <CastingControlsWrapper
          initial={CASTING_OFF}
          animate={CASTING_ON}
          exit={CASTING_OFF}
          variants={variants.castingControls}
        >
          <CastingWrapper>
            {isMobile && (
              <MobileTitleWrapper>
                {castTitle}
              </MobileTitleWrapper>
            )}
            <ControlsWrapper>
              <PlaybackWrapper>
                <PlaybackControls
                  duration={duration}
                  elapsedTime={elapsedTime}
                  forwardCallback={forwardCallback}
                  isMuted={isMuted}
                  isMobile={isMobile}
                  isPlaying={isPlaying}
                  isPlaylist={isPlaylist}
                  nextCallback={nextCallback}
                  pauseCallback={pauseCallback}
                  previousCallback={previousCallback}
                  rewindCallback={rewindCallback}
                  title={title}
                  type={type}
                  volumeCallback={volumeCallback}
                />
              </PlaybackWrapper>
              {!isMobile && castTitle}
              <ExtraControls
                activeCaptions={activeCaptions}
                hasCaptions={hasCaptions}
                type={type}
                captionsCallback={captionsCallback}
              />
              <CastingControlsButtonWrapper
                isCastingControl
                defaultName={castingIcons.CAST_CONNECTED}
                buttonCallback={showDisableScreenCallback}
                fill={GREEN}
              />
            </ControlsWrapper>
          </CastingWrapper>
          <DisableCastingScreen
            castingDeviceName={castingDeviceName}
            castingPlatform={castingPlatform}
            disableCallback={disableCallback}
            showDisableScreenCallback={showDisableScreenCallback}
            showDisableScreen={showDisableScreen}
          />
          <AnimatedModalBackGround
            isVisible={showDisableScreen}
            onClick={showDisableScreenCallback}
          />
        </CastingControlsWrapper>
      )}
    </AnimatePresence>
  );
};

CastingControls.propTypes = {
  activeCaptions: PropTypes.bool,
  adDuration: PropTypes.string,
  advertisementUrl: PropTypes.string,
  captionsCallback: PropTypes.func,
  castingDeviceName: PropTypes.string,
  castingPlatform: PropTypes.string,
  currentAd: PropTypes.string,
  disableCallback: PropTypes.func,
  duration: PropTypes.number,
  elapsedTime: PropTypes.number,
  forwardCallback: PropTypes.func,
  hasCaptions: PropTypes.bool,
  isMobile: PropTypes.bool,
  isMuted: PropTypes.bool,
  isPlaying: PropTypes.bool,
  isPlaylist: PropTypes.bool,
  nextCallback: PropTypes.func,
  onCasting: PropTypes.bool,
  pauseCallback: PropTypes.func,
  previousCallback: PropTypes.func,
  rewindCallback: PropTypes.func,
  showDisableScreen: PropTypes.bool,
  showDisableScreenCallback: PropTypes.func,
  title: PropTypes.string,
  totalAds: PropTypes.string,
  type: PropTypes.string,
  volumeCallback: PropTypes.func,
};

CastingControls.defaultProps = {
  activeCaptions: false,
  isMuted: false,
  isMobile: false,
  isPlaying: true,
  onCasting: false,
  type: castingTypes.CLIP,
};

export default CastingControls;
