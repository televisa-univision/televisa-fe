import * as pageCategories from '../constants/pageCategories';

import delicioso from './delicioso';
import entretenimiento from './entretenimiento/mapping';
import famosos from './famosos/mapping';
import horoscopos from './horoscopos';
import noticias from './noticias/mapping';
import radio from './radio/mapping';
import shows from './shows/mapping';
import univision from './univision/mappings';
import networks from './networks/mapping';
import tudn from './tudn/mapping';
import locales from './locales/mapping';
import breaking from './breaking';
import prendetv from './prendetv';
import vix from './vix/mapping';
import televisa from './televisa/mapping';

export default {
  [pageCategories.BREAKING_NEWS]: breaking,
  [pageCategories.GASTRONOMY]: delicioso,
  [pageCategories.HOROSCOPE]: horoscopos,
  [pageCategories.PRENDETV]: prendetv,
  ...vix,
  ...entretenimiento,
  ...famosos,
  ...networks,
  ...noticias,
  ...radio,
  ...shows,
  ...univision,
  ...tudn,
  ...locales,
  ...televisa,
};
