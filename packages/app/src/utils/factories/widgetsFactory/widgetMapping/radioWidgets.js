import dynamic from 'next/dynamic';

import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import GridPlaceholder from '@univision/fe-components-base/dist/components/widgets/Placeholder/Grid';
import ListPlaceholder from '@univision/fe-components-base/dist/components/widgets/Placeholder/List';
import types from './widgetTypes.json';

/**
 * Widgets meant to be used on radio sections.
 * THE CHUNK NAME MUST BE "radioWidgets"
 */
const widgets = {
  RadioCarouselFeaturedStations: {
    name: 'Radio - Carousel - Featured Stations',
    type: types.carousel,
    loader: dynamic(() => import(/* webpackChunkName: "radioFeaturedStation" */ '@univision/fe-local/dist/components/compound/sliders/FeaturedStations/FeaturedStations')),
  },
  [widgetTypes.RADIO_GRID_STATION_BY_GENRE]: {
    name: 'Radio - Grid - Stations by Genre Filter',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "radioGridStations" */ '@univision/fe-local/dist/components/widgets/StationByGenreList/StationByGenreList')),
    placeholder: GridPlaceholder,
  },
  [widgetTypes.RADIO_STATION_LIST_WRAPPER]: {
    name: 'Radio - Grid - Stations List',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "radioStationListWrapper" */ '@univision/fe-local/dist/components/widgets/StationByGenreList/StationListWrapper')),
    placeholder: ListPlaceholder,
  },
  [widgetTypes.RADIO_NOW_PLAYING]: {
    name: 'Radio - Now Playing',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "radioNowPlaying" */ '@univision/fe-local/dist/components/connected/NowPlaying/NowPlaying')),
  },
  RadioBannerStationSchedule: {
    name: 'Radio - Banner - Station Schedule',
    type: types.banner,
    loader: dynamic(() => import(/* webpackChunkName: "radioCoreWidgets" */ '@univision/fe-local/dist/components/widgets/abacast/AbacastSchedule/AbacastSchedule')),
  },
  [widgetTypes.RADIO_CARD_SHOWS]: {
    name: 'Radio - Card - Shows',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "radioShowCard" */ '@univision/fe-local/dist/components/widgets/RadioShowCard/RadioShowCard')),
  },
};

export default widgets;
