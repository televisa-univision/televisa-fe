import dynamic from 'next/dynamic';

import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import types from './widgetTypes.json';

/**
 * Widgets meant to be used on entertainment sections.
 * THE CHUNK NAME MUST BE "entertainmentWidgets"
 */
const widgets = {
  [widgetTypes.HOROSCOPE_INTERACTIVE_CHINESE]: {
    name: 'Horoscopos - Interactive - Chinese Horoscopes',
    type: types.interactive,
    loader: dynamic(() => import(/* webpackChunkName: "entertainmentWidgets-cpm" */ '@univision/fe-components-base/dist/components/widgets/Horoscope')),
  },
  [widgetTypes.HOROSCOPE_INTERACTIVE_LOVECALCULATOR]: {
    name: 'Horoscopos - Interactive - Love Calculator',
    type: types.interactive,
    loader: dynamic(() => import(/* webpackChunkName: "entertainmentWidgets-cpm" */ '@univision/fe-components-base/dist/components/widgets/LoveCalculator')),
  },
};

export default widgets;
