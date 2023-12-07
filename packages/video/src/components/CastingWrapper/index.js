import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';

import {
  castingAdPodSelector,
  castingAdBreakSelector,
  castingEnabledSelector,
  castingNodeIdSelector,
  castingVideoDataSelector,
  castingPlatformSelector,
  castingDeviceNameSelector,
} from '@univision/fe-commons/dist/store/selectors/castingSelectors';
import {
  deviceSelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';
import isEqual from '@univision/fe-utilities/helpers/common/isEqual';
import { useInterval } from '@univision/fe-commons/dist/utils/hooks';
import { getPlayerInstance } from '@univision/fe-commons/dist/utils/video';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import CastingTracker from '@univision/fe-commons/dist/utils/tracking/tealium/video/CastingTracker';

import castingTypes from '../Casting/CastingControls/CastingControls.config';
import CastingControls from '../Casting/CastingControls';

export const TIMER_REFRESH_INTERVAL = 1000;
export const SEEK_SECONDS = 10;
export const VIDEO_PLAYING_STATUS = 'playing';

/**
 * Casting Wrapper component
 * @param {Object} props - component props
 * @returns {JSX}
 */
const CastingWrapper = () => {
  const [timer, setTimer] = useState(0);
  const [videoLength, setVideoLength] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDisable, setShowDisable] = useState(false);
  const [castingType, setCastingType] = useState(castingTypes.CLIP);
  const [isPlaylist, setIsPlaylist] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasCaptions, setHasCaptions] = useState(false);
  const [activeCaptions, setActiveCaptions] = useState(false);
  const [hasSessionStarted, setHasSessionStarted] = useState(false);
  const device = useSelector(deviceSelector);
  const isMobile = useMemo(() => device === 'mobile', [device]);
  const isCastingEnabled = useSelector(castingEnabledSelector);
  const isAdBreakEnabled = useSelector(castingAdBreakSelector);
  const adPod = useSelector(castingAdPodSelector);
  const videoTag = useRef(null);
  // nodeId for JW Player calls
  const nodeId = useSelector(castingNodeIdSelector);
  // Player instance from current video casting
  const playerInstance = useMemo(() => getPlayerInstance(nodeId), [nodeId]);
  // Casting video data
  const data = useSelector(castingVideoDataSelector);
  // Casting platform
  const castingPlatform = useSelector(castingPlatformSelector);
  // Casting device
  const castingDeviceName = useSelector(castingDeviceNameSelector);

  // Player instance related callbacks
  useEffect(() => {
    if (isValidObject(playerInstance)) {
      // Video length comes as an integer
      setVideoLength(playerInstance.getDuration());
      // Set video status
      setIsPlaying(playerInstance.getState() === VIDEO_PLAYING_STATUS);
      // set if is playlist
      const playerPlaylist = playerInstance.getPlaylist();
      setIsPlaylist(isValidArray(playerPlaylist) && playerPlaylist.length > 1);
      // set captions
      const captions = playerInstance.getCaptionsList();
      setHasCaptions(isValidArray(captions) && captions.length > 1);
      setActiveCaptions(playerInstance.getCurrentCaptions() > 0);
      // video html tag
      videoTag.current = playerInstance.getContainer?.().querySelector?.('video');
    } else {
      setVideoLength(0);
      setTimer(0);
      setIsPlaying(false);
      videoTag.current = null;
    }
  }, [playerInstance]);

  // set casting type
  useEffect(() => {
    if (isAdBreakEnabled) {
      setCastingType(castingTypes.ADVERTISING);
    } else {
      switch (true) {
        case data.isLiveStream:
          setCastingType(castingTypes.LIVESTREAM);
          break;

        case !data.isLiveStream && isPlaylist:
          setCastingType(castingTypes.PLAYLIST);
          break;

        default:
          setCastingType(castingTypes.CLIP);
          break;
      }
    }
  }, [isAdBreakEnabled, data.isLiveStream, isPlaylist]);

  // After casting disable reset states for controls
  useEffect(() => {
    if (!isCastingEnabled) {
      setShowDisable(false);
      setCastingType(castingTypes.CLIP);
      setIsMuted(false);
    } else {
      setHasSessionStarted(true);
    }
  }, [isCastingEnabled]);

  // Triggers tracking connected event when casting is enabled
  useEffect(() => {
    if (hasSessionStarted) {
      CastingTracker.track(
        CastingTracker.events.connected,
        {
          casting_device_type: castingPlatform,
          isCastingEnabled,
        }
      );
    }
  }, [isCastingEnabled, castingPlatform, castingDeviceName, hasSessionStarted]);

  /**
   * Interval to poll current video casting playback. If isCastingEnabled flag
   * sets itself to false, then there won't be an interval running. The position
   * comes as a floating point number, therefore it makes sense to take it to
   * the upper integer
   */
  useInterval(() => {
    if (isValidObject(playerInstance)) {
      setTimer(
        Math.ceil(playerInstance.getPosition())
      );
      setVideoLength(playerInstance.getDuration());
      setIsPlaying(playerInstance.getState() === VIDEO_PLAYING_STATUS);
    } else {
      setTimer(0);
      setVideoLength(0);
      setIsPlaying(false);
    }
  }, isCastingEnabled ? TIMER_REFRESH_INTERVAL : null);

  // Track click method
  const trackClick = useCallback(({ target }) => {
    const trackingData = {
      casting_device_type: castingPlatform,
    };
    CastingTracker.track(
      CastingTracker.events.castingClick,
      target,
      trackingData
    );
  }, [castingPlatform]);

  // Playback click method
  const trackPlaybackClick = useCallback(({ target }) => {
    const trackingData = {
      casting_device_type: castingPlatform,
    };
    CastingTracker.track(
      CastingTracker.events.playbackClick,
      target,
      trackingData
    );
  }, [castingPlatform]);

  /** Playback callbacks */
  // Play/Pause video
  const pausePlayFn = useCallback(() => {
    if (isValidObject(playerInstance)) {
      const { pause, play } = playerInstance;

      if (isPlaying) {
        pause();
      } else {
        play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, playerInstance]);
  // Forward video
  const forwardFn = useCallback(() => {
    if (isValidObject(playerInstance)) {
      const position = Math.min(videoLength, timer + SEEK_SECONDS);

      playerInstance.seek(position);
      setTimer(Math.ceil(position));
      trackPlaybackClick({ target: 'click_forward10' });
    }
  }, [playerInstance, timer, videoLength, trackPlaybackClick]);
  // Backward video
  const backwardFn = useCallback(() => {
    if (isValidObject(playerInstance)) {
      const position = Math.max(0, timer - SEEK_SECONDS);

      playerInstance.seek(position);
      setTimer(Math.ceil(position));
      trackPlaybackClick({ target: 'click_backward10' });
    }
  }, [playerInstance, timer, trackPlaybackClick]);
  // Turn off casting
  const disableCastingFn = useCallback(() => {
    if (isCastingEnabled && isValidObject(playerInstance)) {
      // Calling this method will dispatch casting disable action from video
      playerInstance.stopCasting();
    }
  }, [isCastingEnabled, playerInstance]);
  // Playlist next video
  const nextFn = useCallback(() => {
    if (isValidFunction(playerInstance?.next)) {
      playerInstance.next();
    }
  }, [playerInstance]);
  // Mute cb
  const isMutedFn = useCallback(() => {
    if (isValidObject(playerInstance)) {
      playerInstance.setVolume(playerInstance.getMute() ? 100 : 0);
      const isMute = playerInstance.getMute();
      setIsMuted(isMute);
    }
  }, [playerInstance]);
  //  turn captions on/off
  const captionsFn = useCallback(() => {
    if (isValidFunction(playerInstance?.setCurrentCaptions)) {
      playerInstance.setCurrentCaptions(activeCaptions ? 0 : 1);
      setActiveCaptions(!activeCaptions);
      trackClick({ target: 'cc' });
    }
  }, [playerInstance, activeCaptions, trackClick]);
  /**
   * For handling disable screen
   */
  const showDisableScreen = useCallback(() => {
    // Will show device list in AirPlay if available
    if (
      videoTag.current?.webkitShowPlaybackTargetPicker
      && global.window?.WebKitPlaybackTargetAvailabilityEvent
    ) {
      videoTag.current.webkitShowPlaybackTargetPicker();
    } else {
      setShowDisable(!showDisable);
    }
  }, [showDisable, videoTag]);

  return (
    <CastingControls
      elapsedTime={timer}
      duration={videoLength}
      castingDeviceName={castingDeviceName}
      castingPlatform={castingPlatform}
      title={data?.title}
      pauseCallback={pausePlayFn}
      isPlaying={isPlaying}
      showDisableScreenCallback={showDisableScreen}
      showDisableScreen={showDisable}
      onCasting={isCastingEnabled && !data.hideCastingBar}
      rewindCallback={backwardFn}
      forwardCallback={forwardFn}
      nextCallback={nextFn}
      disableCallback={disableCastingFn}
      volumeCallback={isMutedFn}
      isMuted={isMuted}
      isMobile={isMobile}
      isPlaylist={isPlaylist}
      type={castingType}
      captionsCallback={captionsFn}
      activeCaptions={activeCaptions}
      hasCaptions={hasCaptions}
      currentAd={adPod?.adSequence}
      totalAds={adPod?.adPodcount}
    />
  );
};

export default CastingWrapper;
