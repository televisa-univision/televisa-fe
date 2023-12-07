import dynamic from 'next/dynamic';

import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import types from './widgetTypes.json';

/**
 * Widgets meant to be used on shows sections.
 * THE CHUNK NAME MUST BE "showsWidgets"
 */
const widgets = {
  [widgetTypes.LF_HIGH_IMPACT]: {
    name: 'Shows - LF - High Impact',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "showsWidgets-cp" */ '@univision/fe-components-base/dist/components/widgets/ShowHighImpact')),
  },
  [widgetTypes.LF_LIST_SCHEDULE]: {
    name: 'Shows - LF - Schedule - Live & Future',
    type: types.grid,
    loader: dynamic(() => import(/* webpackChunkName: "showsWidgets-cp" */ '@univision/fe-components-base/dist/components/widgets/LongformScheduleList')),
  },
  [widgetTypes.LF_VIDEO_LIST]: {
    name: 'All - LongFormVideoList - Video',
    type: types.list,
    loader: dynamic(() => import(/* webpackChunkName: "showsWidgets-cp" */ '@univision/fe-components-base/dist/components/widgets/LongFormVideoList')),
  },
};

export default widgets;
