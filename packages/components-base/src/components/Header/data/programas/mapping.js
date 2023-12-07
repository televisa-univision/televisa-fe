/* eslint-disable import/no-cycle */
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';

/**
 * Map a programa page category with the navigation to use
 */
export default {
  [pageCategories.SHOW]: () => import(/* webpackChunkName: "header/shows" */ './shows'),
  [pageCategories.NOVELA]: () => import(/* webpackChunkName: "header/shows" */ './shows'),
  [pageCategories.SERIE]: () => import(/* webpackChunkName: "header/shows" */ './shows'),
  [pageCategories.ESPECIALES]: () => import(/* webpackChunkName: "header/shows" */ './especiales'),

  // "Custom" shows
  [pageCategories.NOTICIERO_EDICION_DIGITAL]: () => import(/* webpackChunkName: "header/shows" */ './shows/noticias-digital'),
};
