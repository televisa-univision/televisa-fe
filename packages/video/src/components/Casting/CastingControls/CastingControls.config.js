const AD = 'ad';
const ADVERTISING = 'advertising';
const CAST = 'cast';
const CAST_CONNECTED = 'castConnected';
const CLIP = 'clip';
const CLOSE = 'close';
const CLOSED_CAPTIONS = 'cCaption';
const DISCONNECT = 'disconnect';
const LIVESTREAM = 'livestream';
const MORE_INFORMATION = 'moreInformation';
const ONE_OF = 'oneOf';
const PLAYLIST = 'playlist';

/**
 * labels used in casting controls component
 */
export const castingLabels = Object.freeze({
  AD,
  CLOSE,
  DISCONNECT,
  LIVESTREAM,
  MORE_INFORMATION,
  ONE_OF,
});

/**
 * Icons used in casting controls component
 */
export const castingIcons = Object.freeze({
  CAST,
  CAST_CONNECTED,
  CLOSE,
  CLOSED_CAPTIONS,
});

/**
 * Casting types used in casting controls
 */
const castingTypes = Object.freeze({
  CLIP,
  ADVERTISING,
  LIVESTREAM,
  PLAYLIST,
});

export default castingTypes;
