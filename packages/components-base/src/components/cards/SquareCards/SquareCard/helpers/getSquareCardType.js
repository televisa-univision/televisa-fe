// SquareCard type specific helpers
import { HOROSCOPE } from '@univision/fe-commons/dist/constants/articleTypes';
import { ADVERTISING } from '@univision/fe-commons/dist/constants/labelTypes';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes';
import { LOADING } from '@univision/fe-commons/dist/constants/status';

import squareCardTypes from '../constants/cardTypes';

/**
 * Gets the card type depending on the article type
 * @param {string} articleType - article type to determine which card to show
 * @returns {string}
 */
function getArticleCardType({ articleType }) {
  if (articleType === HOROSCOPE) {
    return squareCardTypes.HOROSCOPE_CARD;
  }

  return squareCardTypes.ARTICLE_IMAGE_CARD;
}

/**
 * Determines which type of live stream card to render
 * @param {bool} isLiveStreamMatch - true if a livestream match
 * @returns {string}
 */
function getLiveStreamCardType({ isLiveStreamMatch }) {
  return isLiveStreamMatch
    ? squareCardTypes.SOCCER_MATCH_CARD
    : squareCardTypes.LIVE_STREAM_CARD;
}

/**
 * Determines which type of video card to render
 * @param {bool} isInlineVideo - true if video is inline
 * @returns {string}
 */
function getVideoCardType({ isInlineVideo }) {
  return isInlineVideo
    ? squareCardTypes.VIDEO_INLINE_CARD
    : squareCardTypes.VIDEO_PREVIEW_CARD;
}

/**
 * Determines the square card type to be rendered
 * @param {Object} options - options to be passed
 * @returns {string}
 */
export default function getSquareCardType({
  isLiveStreamMatch,
  isInlineVideo,
  articleType,
  type,
  status,
}) {
  // Separating the logic for LOADING status
  if (status === LOADING) {
    return squareCardTypes.LOADING;
  }
  // Separating the logic for articles
  if (type === contentTypes.ARTICLE) {
    return getArticleCardType({ articleType });
  }

  // Sometimes a livestream can be a soccer match
  if (type === contentTypes.LIVE_STREAM) {
    return getLiveStreamCardType({ isLiveStreamMatch });
  }

  // Video is either inline or preview
  if (type === contentTypes.VIDEO) {
    return getVideoCardType({ isInlineVideo });
  }

  // Simpler rules that don't require extra logic
  switch (type) {
    case contentTypes.SLIDESHOW:
      return squareCardTypes.GRID_CARD;

    case contentTypes.SHOW:
      return squareCardTypes.SHOW_CARD;

    case contentTypes.SOCCER_MATCH:
    case contentTypes.BASIC_SOCCER_MATCH:
      return squareCardTypes.SOCCER_MATCH_CARD;

    case contentTypes.PODCAST_EPISODE:
      return squareCardTypes.PODCAST_EPISODE_CARD;

    case contentTypes.PODCAST_SERIES:
      return squareCardTypes.PODCAST_SERIES_CARD;

    case contentTypes.PERSON:
      return squareCardTypes.PERSON_CARD;

    case contentTypes.RADIO_STATION:
      return squareCardTypes.RADIO_STATION_CARD;

    case contentTypes.SECTION:
    case contentTypes.TV_STATION:
      return squareCardTypes.GENERIC_CARD;

    case contentTypes.EXTERNAL_CONTENT_PROMO:
    case contentTypes.EXTERNAL_LINK:
      return squareCardTypes.EXTERNAL_CONTENT_PROMO_CARD;

    case contentTypes.LIVE_BLOG:
      return squareCardTypes.LIVE_BLOG_CARD;

    case ADVERTISING:
      return squareCardTypes.ADVERTISING_CARD;

    case contentTypes.SOCCER_PERSON:
      return squareCardTypes.SOCCER_PERSON_CARD;

    default:
      return squareCardTypes.ARTICLE_IMAGE_CARD;
  }
}
