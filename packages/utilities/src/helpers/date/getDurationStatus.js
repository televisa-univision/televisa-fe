/**
 * @module helpers/date/isLiveEvent
 */

/**
 * Get duration status based on date if its pre, during/active or if it is finished
 * @param {Date} startDate - from the api
 * @param {number} duration - the show duration
 * @access public
 * @returns {string}
 */
export default function getDurationStatus(startDate, duration) {
  const nowDate = new Date().getTime();
  const startTime = new Date(startDate);
  let durationStatus = 'pre';
  if (!Number.isNaN(startTime.getTime())) {
    const showEnd = new Date(startTime);
    showEnd.setMinutes(startTime.getMinutes() + duration);
    if (startTime.getTime() <= nowDate && showEnd.getTime() >= nowDate) {
      durationStatus = 'active';
    }
    if (showEnd.getTime() < nowDate) {
      durationStatus = 'finish';
    }
  }
  return durationStatus;
}
