/**
 * SquareCard types
 *
 * If you're planning on adding a new card, make sure the type exists here and follows at least
 * the content type name in lowercase followed by a capitalized "Card" value
 *
 * TO-DO: Make video values consistent, given that all content types are lowercase
 * but not for inline video which currently is in titleCase
 * and exists as it is in all themes
 */
const cardTypes = Object.freeze({
  ADVERTISING_CARD: 'advertisingCard',
  ARTICLE_IMAGE_CARD: 'articleCard',
  GRID_CARD: 'slideshowCard',
  HOROSCOPE_CARD: 'horoscoposCard',
  SHOW_CARD: 'showCard',
  SOCCER_MATCH_CARD: 'soccermatchCard',
  SOCCER_PERSON_CARD: 'soccerpersonCard',
  PODCAST_EPISODE_CARD: 'radioCard',
  PODCAST_SERIES_CARD: 'podcastseriesCard',
  PERSON_CARD: 'personCard',
  VIDEO_INLINE_CARD: 'videoInlineCard',
  VIDEO_PREVIEW_CARD: 'videoCard',
  RADIO_STATION_CARD: 'radiostationCard',
  GENERIC_CARD: 'sectionCard',
  EXTERNAL_CONTENT_PROMO_CARD: 'externalcontentpromoCard',
  LIVE_STREAM_CARD: 'livestreamCard',
  LIVE_BLOG_CARD: 'liveblogCard',
  LOADING: 'loadingCard',
});

export default cardTypes;
