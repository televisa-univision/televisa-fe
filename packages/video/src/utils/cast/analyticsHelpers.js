const events = {
  BREAK_CLIP_STARTED: 'video_ad_start_p',
  BREAK_CLIP_ENDED: 'video_ad_complete_p',
  REQUEST_PAUSE: 'video_pause',
  REQUEST_PLAY: 'video_resume',
  MEDIA_FINISHED: 'video_complete',
  PLAYER_LOAD_COMPLETE: 'video_ready',
  LIVE_ENDED: 'video_complete',
};
/**
 * get Event name to be sent to GA.
 * @param {string} event - player event name
 * @param {Object} data - player event data
 * @returns {string}
 */
export default function getEventName(event, data) {
  if (event === 'BREAK_CLIP_STARTED' || event === 'BREAK_CLIP_ENDED') {
    return `${events[event]}${data?.index}`;
  }
  return events[event];
}

export const eventTypes = Object.keys(events);

export const INTERVAL_VALUE = 1000;

/**
 * get progress percentage.
 * @param {number} time - time passed
 * @param {number} duration - video duration
 * @returns {number}
 */
export function getProgress(time, duration) {
  if (time < 1) return -1;
  const progress = time / duration;
  const progressPercent = Math.round(progress * 100);
  if (progressPercent === 25
    || progressPercent === 50
    || progressPercent === 75) return progressPercent;
  return -1;
}
