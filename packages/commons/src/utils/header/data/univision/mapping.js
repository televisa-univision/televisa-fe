import * as pageCategories from '../../../../constants/pageCategories';
import univision from '.';
import univisionFoundation from './univisionFoundation';
import votaConmigo from './votaConmigo';
import lupita from './lupita';

export default {
  [pageCategories.JUEGOS]: univision,
  [pageCategories.LUPITA]: lupita,
  [pageCategories.SE_HABLA_USA]: univision,
  [pageCategories.UNIVISION]: univision,
  [pageCategories.UNIVISION_FOUNDATION]: univisionFoundation,
  [pageCategories.TRABAJOS]: univision,
  [pageCategories.WOMEN_DAY]: univision,
  [pageCategories.VOTA_CONMIGO]: votaConmigo,
};
