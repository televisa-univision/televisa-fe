// TODO: BEX Migration - Figure out if this file is needed and if it is, what it does?
import * as pageCategories from '../../../../constants/pageCategories';

import canal5 from '../canal5/mapping';
import lasestrellas from '../lasestrellas/mapping';
import elnu9ve from '../elnu9ve/mapping';
import televisa from '../televisaSite/mapping';
import losbingers from '../losbingers/mapping';
import bandamax from '../bandamax/mapping';
import unicable from '../unicable/mapping';
import lcdlf from '../lcdlf/mapping';

export default {
  // Canal 5
  [pageCategories.CANAL5]: canal5,
  [pageCategories.CANAL5_SHOW]: canal5,

  // Las Estrellas
  [pageCategories.LAS_ESTRELLAS]: lasestrellas,
  [pageCategories.LAS_ESTRELLAS_SHOW]: lasestrellas,

  /* Elnu9ve header configuration */
  [pageCategories.ELNU9VE]: elnu9ve,
  [pageCategories.ELNU9VE_SHOW]: elnu9ve,

  // Televisa
  [pageCategories.TELEVISA]: televisa,

  // Los Bingers
  [pageCategories.LOS_BINGERS]: losbingers,
  [pageCategories.LOS_BINGERS_SHOW]: losbingers,
  // Bandamax
  [pageCategories.BANDAMAX]: bandamax,

  // Unicable
  [pageCategories.UNICABLE]: unicable,
  [pageCategories.UNICABLE_SHOWS]: unicable,

  // LCDLF
  [pageCategories.LCDLF]: lcdlf,
  [pageCategories.LCDLF_SHOW]: lcdlf,
};
