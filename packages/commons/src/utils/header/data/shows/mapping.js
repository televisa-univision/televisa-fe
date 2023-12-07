import * as pageCategories from '../../../../constants/pageCategories';

import shows from '.';
import conecta from './conecta';
import elDragon from './elDragon';
import miraQuienBaila from './miraQuienBaila';
import premiosJuventud from './premiosJuventud';
import latinGrammyCelebraEllas from './latinGrammyCelebraEllas';
import nuestraBellezaLatina from './nuestraBellezaLatina';
import latinGrammy from './latinGrammy';
import premioLoNuestro from './premioLoNuestro';
import latinAmericanMusicAwards from './latinAmericanMusicAwards';

export default {
  [pageCategories.ESPECIALES]: shows,
  [pageCategories.NOVELA]: shows,
  [pageCategories.SERIE]: shows,
  [pageCategories.SHOW]: shows,
  [pageCategories.CONECTA]: conecta,
  [pageCategories.EL_DRAGON]: elDragon,
  [pageCategories.MIRA_QUIEN_BAILA]: miraQuienBaila,
  [pageCategories.PREMIOS_JUVENTUD]: premiosJuventud,
  [pageCategories.LATIN_GRAMMY_CELEBRA_ELLAS]: latinGrammyCelebraEllas,
  [pageCategories.NUESTRA_BELLEZA_LATINA]: nuestraBellezaLatina,
  [pageCategories.LATIN_GRAMMY]: latinGrammy,
  [pageCategories.PREMIO_LO_NUESTRO]: premioLoNuestro,
  [pageCategories.LATIN_AMERICAN_MUSIC_AWARDS]: latinAmericanMusicAwards,
};
