import * as categories from '../../../constants/pageCategories';
import { extendBrandableShow } from '../page-actions';

/**
 * Use this if you need to dispatch an action for a page category
 */
export default {
  [categories.NOTICIERO_EDICION_DIGITAL]: {
    action: extendBrandableShow,
  },
  [categories.BODAS]: {
    action: extendBrandableShow,
  },
  [categories.GALAVISION]: {
    action: extendBrandableShow,
  },
  [categories.UNIMAS]: {
    action: extendBrandableShow,
  },
  [categories.GASTRONOMY]: {
    action: extendBrandableShow,
  },
  [categories.ELECCIONES_MEXICO_2018]: {
    action: extendBrandableShow,
  },
  [categories.POSIBLE]: {
    action: extendBrandableShow,
  },
  [categories.JUAN_FUTBOL]: {
    action: extendBrandableShow,
  },
  [categories.ENTREVISTAS]: {
    action: extendBrandableShow,
  },
  [categories.VIDEOS_VIRALES]: {
    action: extendBrandableShow,
  },
  [categories.OPINION]: {
    action: extendBrandableShow,
  },
  [categories.PREMIOS_UVN_DPTS]: {
    action: extendBrandableShow,
  },
  [categories.TURNO7]: {
    action: extendBrandableShow,
  },
  [categories.NFL_SUPER_BOWL]: {
    action: extendBrandableShow,
  },
  [categories.AUTOS]: {
    action: extendBrandableShow,
  },
};
