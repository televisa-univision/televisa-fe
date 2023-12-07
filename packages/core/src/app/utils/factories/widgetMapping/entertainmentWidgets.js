import hints from '@univision/fe-commons/dist/utils/ssr/hints';
import types from './widgetTypes.json';
// eslint-disable-next-line import/no-cycle
import { setSSRModuleHint } from '.';

/**
 * Widgets meant to be used on entertainment sections.
 * THE CHUNK NAME MUST BE "entertainmentWidgets"
 */
const widgets = {
  HoroscoposInteractiveChineseHoroscopes: {
    name: 'Horoscopos - Interactive - Chinese Horoscopes',
    type: types.interactive,
    loader: () => import(/* webpackChunkName: "entertainmentWidgets" */ '@univision/fe-components-base/dist/components/widgets/Horoscope'),
  },
  HoroscoposInteractiveLoveCalculator: {
    name: 'Horoscopos - Interactive - Love Calculator',
    type: types.interactive,
    loader: () => import(/* webpackChunkName: "entertainmentWidgets" */ '@univision/fe-components-base/dist/components/widgets/LoveCalculator'),
  },
};

setSSRModuleHint(widgets, hints.entertainmentWidgets);
export default widgets;
