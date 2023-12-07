import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import hints from '@univision/fe-commons/dist/utils/ssr/hints';
import types from './widgetTypes.json';
// eslint-disable-next-line import/no-cycle
import { setSSRModuleHint } from '.';

/**
 * Widgets meant to be used on local weather sections.
 * THE CHUNK NAME MUST BE "localMarketsWidgets"
 */
const widgets = {
  [widgetTypes.JOB_SEARCH]: {
    name: 'Job Search',
    types: types.list,
    loader: () => import(/* webpackChunkName: "localMarketsWidgets-job-search" */ '@univision/fe-local/dist/components/widgets/JobSearch'),
  },
  [widgetTypes.LOCAL_OPENING]: {
    name: 'Locales - Opening Widget',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/LocalOpening/LocalOpening'),
  },
  NoticiasCardLottery: {
    name: 'Noticias - Card - Lottery',
    type: types.card,
    loader: () => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/Lottery'),
  },
  NoticiasCardWeatherMaps: {
    name: 'Noticias - Card - Weather Maps',
    type: types.card,
    loader: () => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/Weather/WeatherMaps'),
  },
  NoticiasCardWeatherGraphics: {
    name: 'Noticias - Card - Weather Graphics',
    type: types.card,
    loader: () => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/Weather/WeatherGraphics'),
  },
  NoticiasCardWeatherConditions: {
    name: 'Noticias - Card - Weather Conditions',
    type: types.card,
    loader: () => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/Weather/WeatherConditions'),
  },
  NoticiasCardTropicalWeatherConditions: {
    name: 'Noticias - Card - Tropical Weather Conditions',
    type: types.card,
    loader: () => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/Weather/WeatherTropicalConditions'),
  },
  NoticiasInteractiveWeatherForecast: {
    name: 'Noticias - Card - Weather forecast',
    type: types.card,
    loader: () => import(/* webpackChunkName: "localMarketsWidgets" */'@univision/fe-local/dist/components/connected/WeatherForecast'),
  },
  NoticiasExternalWeatherRadar: {
    name: 'Noticias - External - Weather - Radar',
    type: types.card,
    loader: () => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/Weather/TWC/RadarMap'),
  },
  NoticiasExternalWeatherTropicalSystems: {
    name: 'Noticias - External - Weather - Tropical Systems',
    type: types.card,
    loader: () => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/Weather/TWC/TropicalSystemsMap'),
  },
  [widgetTypes.HELP_CENTER]: {
    name: 'Helpcenter - Grid - Items by category filter',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/widgets/HelpCenter'),
  },
};

setSSRModuleHint(widgets, hints.localMarketsWidgets);
export default widgets;
