/* eslint-disable babel/no-unused-expressions */
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import getEventName, { eventTypes, getProgress, INTERVAL_VALUE } from './analyticsHelpers';

/**
 * analytics class.
 */
class Analytics {
  /**
 *constructor.
 */
  constructor() {
    this.eventTypes = eventTypes;
    this.videoData = {};
    this.started = false;
    this.paused = false;
    this.progressEvents = {};
    this.timeWatched = 0;
    this.playbackPosition = 0;
    this.heartBeatInterval = null;
    this.disableTracking = false;
  }

  /**
 * receive GTM.
 * @param {any} tagManager Manager - GTM object
 */
  initAnalytics(tagManager) {
    this.TagManager = tagManager;
  }

  /**
 * start listening to analytics events.
 * @param {any} playerManager - player manager object
 */
  startTracking(playerManager) {
    if (this.disableTracking) return;
    for (let i = 0; i < this.eventTypes.length; i += 1) {
      const event = this.eventTypes[i];
      playerManager.addEventListener(event, (data) => {
        if (event === 'REQUEST_PAUSE') this.paused = true;
        if (event === 'REQUEST_PLAY') this.paused = false;
        this.trackEvent(getEventName(event, data));
      });
    }
    playerManager.addEventListener('PLAYER_LOAD_COMPLETE', ({ media }) => {
      this.setVideoData(media);
    });
    playerManager.addEventListener('TIME_UPDATE', ({ currentMediaTime }) => {
      const { duration, adDuration, customData } = this.videoData;
      if (customData?.streamEndTime) {
        // Match end time. For free users - 5 mins from now
        const endTime = new Date(customData.streamEndTime);
        if (endTime.valueOf() < new Date().valueOf()) {
          playerManager.stop();
        }
      }
      if (currentMediaTime > adDuration && !this.started) {
        this.trackEvent('video_start');
        this.started = true;
        this.playbackPosition = currentMediaTime - adDuration;
        clearInterval(this.heartBeatInterval);
        this.timeWatched = 0;
        this.heartBeatInterval = setInterval(() => { this.heartBeatTimer(); }, INTERVAL_VALUE);
      }
      const progress = getProgress(currentMediaTime - adDuration, duration);
      if (progress > 1 && !this.progressEvents[progress]) {
        this.progressEvents[progress] = true;
        this.trackEvent(`video_${progress}_percent`);
      }
    });
  }

  /**
 * track specific event.
 * @param {string} eventName - name of tracking event
 * @param {Object} extraParams - additional params to pass in
 */
  trackEvent(eventName, extraParams = {}) {
    if (this.disableTracking) return;
    const trackingData = getKey(this, 'videoData.customData.trackingData', {});
    const { preRollCount, adDuration } = this.videoData || {};
    this.TagManager.triggerEvent({
      ...trackingData,
      ...extraParams,
      device_type: 'chromecast',
      event: eventName,
      video_preroll_count: preRollCount,
      video_preroll_duration: adDuration,
    });
  }

  /**
 * video heartbeat timer.
 */
  heartBeatTimer() {
    if (this.timeWatched === 30) {
      this.trackEvent('video_heartbeat', {
        video_heartbeat_value: this.timeWatched,
        video_playback_pos: this.playbackPosition,
      });
      this.timeWatched = 0;
    }
    if (this.started && !this.paused) {
      this.timeWatched += 1;
    }
  }

  /**
 * set local value for video data.
 * @param {Object} videoData - data to be passed into the event
 */
  setVideoData(videoData = {}) {
    // disable tracking for web.
    // if web will start sending custom data, we can use the flag 'disableTracking'
    if (!videoData.customData || videoData.customData?.disableTracking) {
      this.disableTracking = true;
      return;
    }
    let adDuration = 0;
    let preRollCount = 0;
    videoData?.breakClips?.forEach((clip) => {
      adDuration += clip.duration;
      preRollCount += 1;
    });
    this.started = false;
    this.progressEvents = {};
    this.videoData = { ...videoData, adDuration, preRollCount };
    if (this.disableTracking) this.disableTracking = false;
  }
}

export default Analytics;
