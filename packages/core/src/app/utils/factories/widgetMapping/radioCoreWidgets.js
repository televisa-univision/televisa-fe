import hints from '@univision/fe-commons/dist/utils/ssr/hints';
import types from './widgetTypes.json';
// eslint-disable-next-line import/no-cycle
import { setSSRModuleHint } from '.';

/**
 * Widgets meant to be used on most radio sections.
 * THE CHUNK NAME MUST BE "radioCoreWidgets"
 */
const radioCoreWidgets = {
  /**
   * Deprecated in favor of "All - Carousel - High Impact"
   * @constructor
   */
  AltoImpacto: {
    name: 'All - Carousel - High Impact',
    type: types.carousel,
    loader: () => import(/* webpackChunkName: "radioCoreWidgets" */ 'components/widgets/AltoImpacto/AltoImpacto'),
  },
  /**
   * Deprecated in favor of "All - Countdown - Timer"
   * @constructor
   */
  CountdownTimer: {
    name: 'All - Countdown - Timer',
    type: types.countdown,
    loader: () => import(/* webpackChunkName: "radioCoreWidgets" */ '@univision/fe-components-base/dist/components/widgets/Countdown/Countdown'),
  },
  AllCountdownTimer: {
    name: 'All - Countdown - Timer',
    type: types.countdown,
    loader: () => import(/* webpackChunkName: "radioCoreWidgets" */ '@univision/fe-components-base/dist/components/widgets/Countdown/Countdown'),
  },
  /**
   * Deprecated in favor of "Local - Banner - Station Schedule"
   * @constructor
   */
  RadioStationScheduleWidget: {
    name: 'Radio - Banner - Station Schedule',
    type: types.banner,
    loader: () => import(/* webpackChunkName: "radioCoreWidgets" */ '@univision/fe-local/dist/components/widgets/abacast/AbacastSchedule/AbacastSchedule'),
  },
  RadioBannerStationSchedule: {
    name: 'Radio - Banner - Station Schedule',
    type: types.banner,
    loader: () => import(/* webpackChunkName: "radioCoreWidgets" */ '@univision/fe-local/dist/components/widgets/abacast/AbacastSchedule/AbacastSchedule'),
  },
  /**
   * Deprecated
   * @constructor
   */
  SixItems: {
    name: 'Six Items',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "radioCoreWidgets" */ 'components/widgets/ImageItems/ImageItems'),
  },
};

setSSRModuleHint(radioCoreWidgets, hints.radioCoreWidgets);
export default radioCoreWidgets;
