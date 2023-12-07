/**
 * Hints to use for react-loadable components that require SSR.
 * Maps a key to a "webpackChunkName", the css of those chunks are pre-loaded in core/server.js
 * @type {object}
 */
export default {
  cards: 'cards',
  entertainmentWidgets: 'entertainmentWidgets',
  globalWidgets: 'globalWidgets',
  localMarketsWidgets: 'localMarketsWidgets',
  localesHeaderWidget: 'localesHeaderWidget',
  miscWidgets: 'miscWidgets',
  radioCoreWidgets: 'radioCoreWidgets',
  radioWidgets: 'radioWidgets',
  sportsWidgets: 'sportsWidgets',
};
