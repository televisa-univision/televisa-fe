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
import unicableShowsThemeConfig from './unicable/shows';

// losbingers
import losbingers from './losbingers';
import showLosbingers from './losbingers/shows';

// Bandamax
import { bandamaxThemeConfig } from './bandamax';

// LCDLF
import lcdlf from './lcdlf';
import lcdlfShow from './lcdlf/show';

// TODO: BEX Migration - Themes for every Televisa site and its categories.
export default {
  [pageCategories.DISTRITO_COMEDIA]: distritocomedia,
  // Canal 5
  [pageCategories.CANAL5]: canal5ThemeConfig,
  [pageCategories.CANAL5_SHOW]: canal5ThemeShowsConfig,

  // Unicable
  [pageCategories.UNICABLE]: unicableThemeConfig,
  [pageCategories.UNICABLE_SHOWS]: unicableShowsThemeConfig,

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
  [pageCategories.LOS_BINGERS_SHOW]: showLosbingers,
  // Bandamax
  [pageCategories.BANDAMAX]: bandamaxThemeConfig,
  [pageCategories.BANDAMAX_BANDANEWS]: bandamaxThemeConfig,
  [pageCategories.BANDAMAX_EXCLUSIVAS]: bandamaxThemeConfig,
  [pageCategories.BANDAMAX_PROGRAMAS]: bandamaxThemeConfig,
  [pageCategories.BANDAMAX_TENDENCIAS]: bandamaxThemeConfig,
  // LCDLF
  [pageCategories.LCDLF]: lcdlf,
  [pageCategories.LCDLF_SHOW]: lcdlfShow,
};
