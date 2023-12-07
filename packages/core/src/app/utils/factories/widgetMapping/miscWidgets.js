import hints from '@univision/fe-commons/dist/utils/ssr/hints';
import types from './widgetTypes.json';
// eslint-disable-next-line import/no-cycle
import { setSSRModuleHint } from '.';

/**
 * Miscellaneous widgets, try not to use this.
 * THE CHUNK NAME MUST BE "miscWidgets"
 */
const miscWidgets = {
  /**
   * Deprecated
   * @constructor
   */
  FourItems: {
    name: 'Four Items',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "miscWidgets" */ 'components/widgets/ImageItems/ImageItems'),
  },
  /**
   * Deprecated
   * @constructor
   */
  ImageItems: {
    name: 'Image Items',
    type: types.grid,
    loader: () => import(/* webpackChunkName: "miscWidgets" */ 'components/widgets/ImageItems/ImageItems'),
  },
  NotificationBanner: {
    name: 'Notification Banner',
    type: types.banner,
    loader: () => import(/* webpackChunkName: "miscWidgets" */ '@univision/fe-components-base/dist/components/NotificationBanner'),
  },
  /**
   * Deprecated
   * @constructor
   */
  PromoCardWidget: {
    name: 'Promo Card Widget',
    type: types.card,
    loader: () => import(/* webpackChunkName: "miscWidgets" */ 'components/widgets/PromoCard/PromoCard'),
  },
};

setSSRModuleHint(miscWidgets, hints.miscWidgets);
export default miscWidgets;
