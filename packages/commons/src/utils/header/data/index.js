import genericNavData from './genericNavData';

import delicioso from './delicioso/mapping';
import famosos from './famosos/mapping';
import entretenimiento from './entretenimiento/mapping';
import horoscopos from './horoscopos/mapping';
import locales from './locales/mapping';
import networks from './networks/mapping';
import noticias from './noticias/mapping';
import radio from './radio/mapping';
import shows from './shows/mapping';
import univision from './univision/mapping';
import tudn from './tudn/mapping';
import lasestrellas from './lasestrellas/mapping';
import elnu9ve from './elnu9ve/mapping';
import canal5 from './canal5/mapping';
import distritocomedia from './distritocomedia/mapping';
import televisa from './televisaSite/mapping';
import unicable from './unicable/mapping';
import telehit from './telehit/mapping';
import losbingers from './losbingers/mapping';
import bandamax from './bandamax/mapping';
import lcdlf from './lcdlf/mapping';

// Generic wrapper, chunks are inside each category
export default {
  genericNavData,
  ...delicioso,
  ...entretenimiento,
  ...famosos,
  ...horoscopos,
  ...locales,
  ...networks,
  ...noticias,
  ...radio,
  ...shows,
  ...univision,
  ...tudn,
  ...lasestrellas,
  ...elnu9ve,
  ...canal5,
  ...distritocomedia,
  ...televisa,
  ...unicable,
  ...telehit,
  ...losbingers,
  ...bandamax,
  ...lcdlf,
};
