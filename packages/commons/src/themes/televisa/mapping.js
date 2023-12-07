import * as pageCategories from '../../constants/pageCategories';

// Las Estrellas
import lasestrellas from './lasestrellas';
// Telehit
import telehit from './telehit';
// Shows Las Estrellas
import shows from './lasestrellas/shows';
// Canal 9
import elnu9ve from './elnu9ve';
import elnu9veShows from './elnu9ve/shows';
// Distrito Comedia
import distritocomedia from './distritocomedia';

// Canal 5
import canal5ThemeConfig from './canal5';
import canal5ThemeShowsConfig from './canal5/shows';

// Televisa
import televisa from './televisa';
// unicable
import { unicableThemeConfig } from './unicable';
// losbingers
import losbingers from './losbingers';
// Bandamax
import { bandamaxThemeConfig } from './bandamax';

// TODO: BEX Migration - Themes for every Televisa site and its categories.
export default {
  [pageCategories.DISTRITO_COMEDIA]: distritocomedia,
  // Canal 5
  [pageCategories.CANAL5]: canal5ThemeConfig,
  [pageCategories.CANAL5_SHOW]: canal5ThemeShowsConfig,

  // Unicable
  [pageCategories.UNICABLE]: unicableThemeConfig,

  // Las Estrellas
  [pageCategories.LAS_ESTRELLAS]: lasestrellas,
  [pageCategories.LAS_ESTRELLAS_TELENOVELAS]: shows,
  [pageCategories.LAS_ESTRELLAS_PROGRAMAS]: lasestrellas,
  [pageCategories.LAS_ESTRELLAS_REALITY]: lasestrellas,
  [pageCategories.LAS_ESTRELLAS_CAPITULOS_GRATIS]: lasestrellas,
  [pageCategories.LAS_ESTRELLAS_HOROSCOPOS]: lasestrellas,
  [pageCategories.LAS_ESTRELLAS_EN_VIVO]: lasestrellas,
  [pageCategories.LAS_ESTRELLAS_SHOW]: shows,
  /* Canal 9 theme configaration */
  [pageCategories.ELNU9VE]: elnu9ve,
  [pageCategories.ELNU9VE_NOVELA]: elnu9ve,
  [pageCategories.ELNU9VE_SHOW]: elnu9veShows,
  // Televisa
  [pageCategories.TELEVISA]: televisa,
  // Telehit
  [pageCategories.TELEHIT]: telehit,
  // Los Bingers
  [pageCategories.LOS_BINGERS]: losbingers,
  // Bandamax
  [pageCategories.BANDAMAX]: bandamaxThemeConfig,
  [pageCategories.BANDAMAX_BANDANEWS]: bandamaxThemeConfig,
  [pageCategories.BANDAMAX_EXCLUSIVAS]: bandamaxThemeConfig,
  [pageCategories.BANDAMAX_PROGRAMAS]: bandamaxThemeConfig,
  [pageCategories.BANDAMAX_TENDENCIAS]: bandamaxThemeConfig,
};
