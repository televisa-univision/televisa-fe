import dynamic from 'next/dynamic';

import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import GridPlaceholder from '@univision/fe-components-base/dist/components/widgets/Placeholder/Grid';

import types from './widgetTypes.json';

/**
 * Widgets meant to be used on local weather sections.
 * THE CHUNK NAME MUST BE "localMarketsWidgets"
 */
const widgets = {
  [widgetTypes.JOB_SEARCH]: {
    name: 'Job Search',
    types: types.list,
    loader: dynamic(() => import(/* webpackChunkName: "localMarketsWidgets-job-search" */ '@univision/fe-local/dist/components/widgets/JobSearch')),
  },
  [widgetTypes.LOCAL_OPENING]: {
    name: 'Locales - Opening Widget',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/LocalOpening/LocalOpening')),
    placeholder: GridPlaceholder,
  },
  [widgetTypes.WEATHER_ALERTS_LIST]: {
    name: 'Weather Alerts List',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "globalWidgets-weather-alert-list" */ '@univision/fe-local/dist/components/widgets/Weather/alerts/WeatherAlertsList')),
  },
  [widgetTypes.LOCAL_NOTICIAS_CARD_LOTTERY]: {
    name: 'Noticias - Card - Lottery',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/Lottery')),
  },
  [widgetTypes.LOCAL_NOTICIAS_CARD_WEATHER_MAPS]: {
    name: 'Noticias - Card - Weather Maps',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/Weather/WeatherMaps')),
  },
  [widgetTypes.LOCAL_NOTICIAS_CARD_WEATHER_GRAPHICS]: {
    name: 'Noticias - Card - Weather Graphics',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/Weather/WeatherGraphics')),
  },
  [widgetTypes.LOCAL_NOTICIAS_CARD_WEATHER_CONDITIONS]: {
    name: 'Noticias - Card - Weather Conditions',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/Weather/WeatherConditions')),
  },
  [widgetTypes.LOCAL_NOTICIAS_CARD_TROPICAL_WEATHER_CONDITIONS]: {
    name: 'Noticias - Card - Tropical Weather Conditions',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/Weather/WeatherTropicalConditions')),
  },
  [widgetTypes.LOCAL_NOTICIAS_INTERACTIVE_WEATHER_FORECAST]: {
    name: 'Noticias - Card - Weather forecast',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "localMarketsWidgets" */'@univision/fe-local/dist/components/connected/WeatherForecast')),
  },
  [widgetTypes.LOCAL_NOTICIAS_EXTERNAL_WEATHER_RADAR]: {
    name: 'Noticias - External - Weather - Radar',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/Weather/TWC/RadarMap')),
  },
  [widgetTypes.LOCAL_NOTICIAS_EXTERNAL_WEATHER_TROPICAL_SYSTEMS]: {
    name: 'Noticias - External - Weather - Tropical Systems',
    type: types.card,
    loader: dynamic(() => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/Weather/TWC/TropicalSystemsMap')),
  },
  [widgetTypes.HELP_CENTER]: {
    name: 'Helpcenter - Grid - Items By Category Filter',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/HelpCenter')),
  },
};

export default widgets;
