import * as widgetTypes from '../../constants/widgetTypes';

/**
 * List of widget to be considered on ad insertion logic
 * large widgets: will allow top ads below them
 * small widgets: will be skipped
 */
export const largeWidgets = [
  widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS,
  widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_RESULTS,
  widgetTypes.DEPORTES_GRID_SOCCER_TEAMS_CRESTS,
  widgetTypes.DEPORTES_SOCCER_LIVE,
  widgetTypes.DEPORTES_SOCCER_TEAM_SQUAD,
  widgetTypes.DEPORTES_SOCCER_BRACKETS,
  widgetTypes.LOCAL_NOTICIAS_CARD_LOTTERY,
  widgetTypes.LOCAL_NOTICIAS_INTERACTIVE_WEATHER_FORECAST,
  widgetTypes.LOCAL_NOTICIAS_EXTERNAL_WEATHER_RADAR,
  widgetTypes.LOCAL_NOTICIAS_CARD_WEATHER_MAPS,
  widgetTypes.LOCAL_NOTICIAS_CARD_WEATHER_GRAPHICS,
  widgetTypes.LOCAL_NOTICIAS_CARD_WEATHER_CONDITIONS,
  widgetTypes.LOCAL_NOTICIAS_CARD_TROPICAL_WEATHER_CONDITIONS,
  widgetTypes.LOCAL_NOTICIAS_EXTERNAL_WEATHER_TROPICAL_SYSTEMS,
  widgetTypes.LONG_FORM_LIST_SCHEDULE,
  widgetTypes.ALL_VIDEO_PLAYLIST_VIDEO,
  widgetTypes.RADIO_NOW_PLAYING,
  widgetTypes.RADIO_STATION_LIST_WRAPPER,
  widgetTypes.RADIO_GRID_STATION_BY_GENRE,
  widgetTypes.ALL_LOCAL_NEWS_CAROUSEL,
  widgetTypes.RADIO_CARD_SHOWS,
];

export const smallWidgets = [
  widgetTypes.ALL_COUNTDOWN_TIMER,
  widgetTypes.ALL_MOVING_BANNER,
  widgetTypes.DEPORTES_GRID_EXTERNAL_SCRIPT,
  widgetTypes.DEPORTES_SCORE_CELLS,
  widgetTypes.HOROSCOPE_INTERACTIVE_CHINESE,
  widgetTypes.HOROSCOPE_INTERACTIVE_LOVECALCULATOR,
  widgetTypes.JOB_SEARCH,
  widgetTypes.TOP_QUICK_LINKS,
  widgetTypes.WEATHER_ALERTS_LIST,
  widgetTypes.PODCAST_OPENER,
];
