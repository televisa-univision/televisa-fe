export const PRE_EVENT = 'pre-event';
export const MID_EVENT = 'mid-event';
export const POST_EVENT = 'post-event';

export const PRE = 'pre';
export const LIVE = 'live';
export const POST = 'post';

const PRE_MATCH = 'PRE-MATCH';
const LIVE_MATCH = 'LIVE';
const POST_MATCH = 'FULL';

/**
 * Match game status in opta format
 */
export const OPTA_STATUS = Object.freeze({
  PRE_EVENT,
  MID_EVENT,
  POST_EVENT,
});

/**
 * Match game status in tudn/simple format
 */
export const TUDN_STATUS = Object.freeze({
  PRE,
  LIVE,
  POST,
});

/**
 * Match game status in CMS format
 */
export const CMS_STATUS = Object.freeze({
  PRE_MATCH,
  LIVE_MATCH,
  POST_MATCH,
});
