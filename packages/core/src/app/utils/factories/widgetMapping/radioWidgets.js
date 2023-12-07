import hints from '@univision/fe-commons/dist/utils/ssr/hints';
import types from './widgetTypes.json';
// eslint-disable-next-line import/no-cycle
import { setSSRModuleHint } from '.';

/**
 * Widgets meant to be used on some radio sections.
 * THE CHUNK NAME MUST BE "radioWidgets"
 */
const radioWidgets = {
  /**
   * Deprecated in favor of "Radio - Carousel - Featured Stations"
   * @constructor
   */
  FeaturedRadioStations: {
    name: 'Radio - Carousel - Featured Stations',
    type: types.carousel,
    loader: () => import(/* webpackChunkName: "radioWidgets" */ '@univision/fe-local/dist/components/compound/sliders/FeaturedStations/FeaturedStations'),
  },
  RadioCarouselFeaturedStations: {
    name: 'Radio - Carousel - Featured Stations',
    type: types.carousel,
    loader: () => import(/* webpackChunkName: "radioWidgets" */ '@univision/fe-local/dist/components/compound/sliders/FeaturedStations/FeaturedStations'),
  },
  /**
   * Deprecated
   * @constructor
   */
  NationalRadioShowModule: {
    name: 'National Radio Show Module',
    type: types.card,
    loader: () => import(/* webpackChunkName: "radioWidgets" */ '@univision/fe-local/dist/components/widgets/RadioShow/RadioShow'),
  },
  /**
   * Deprecated in favor of "Radio - Card - Shows"
   * @constructor
   */
  RadioShowCardWidget: {
    name: 'Radio - Card - Shows',
    type: types.card,
    loader: () => import(/* webpackChunkName: "radioWidgets" */ '@univision/fe-local/dist/components/widgets/RadioShowCard/RadioShowCard'),
  },
  RadioCardShows: {
    name: 'Radio - Card - Shows',
    type: types.card,
    loader: () => import(/* webpackChunkName: "radioWidgets" */ '@univision/fe-local/dist/components/widgets/RadioShowCard/RadioShowCard'),
  },
  /**
   * Deprecated in favor of "Radio - Grid - Stations by Genre Filter"
   * @constructor
   */
  StationByGenreList: {
    name: 'Radio - Grid - Stations by Genre Filter',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "radioWidgets" */ '@univision/fe-local/dist/components/widgets/StationByGenreList/StationByGenreList'),
  },
  RadioGridStationsbyGenreFilter: {
    name: 'Radio - Grid - Stations by Genre Filter',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "radioWidgets" */ '@univision/fe-local/dist/components/widgets/StationByGenreList/StationByGenreList'),
  },
};

setSSRModuleHint(radioWidgets, hints.radioWidgets);
export default radioWidgets;
