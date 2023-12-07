import * as pageCategories from '../../constants/pageCategories';

import temas from './temas';
import univision from '.';
import univisionFoundation from './univisionFoundation';
import votaConmigo from './votaConmigo';
import lupita from './lupita';

export default {
  [pageCategories.LUPITA]: lupita,
  [pageCategories.TEMAS]: temas,
  [pageCategories.UNIVISION]: univision,
  [pageCategories.UNIVISION_FOUNDATION]: univisionFoundation,
  [pageCategories.TRABAJOS]: univision,
  [pageCategories.VOTA_CONMIGO]: votaConmigo,
};
