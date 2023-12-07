import {
  JUEGOS,
  LUPITA,
  SE_HABLA_USA,
  TRABAJOS,
  TEMAS,
  UNIVISION,
  UNIVISION_FOUNDATION,
  VOTA_CONMIGO,
} from '../../../constants/pageCategories';
import { UNIVISION_SITE } from '../../../constants/sites';
// eslint-disable-next-line import/no-cycle
import { matchPageUri } from './matchers';
// eslint-disable-next-line import/no-cycle
import matchesTemasPage from './matchers/custom/temas';

export default {
  [LUPITA]: [matchPageUri('/lupita')],
  [SE_HABLA_USA]: [matchPageUri('/se-habla-usa'), matchPageUri('/sehablausa')],
  [TEMAS]: [matchesTemasPage(UNIVISION_SITE)],
  [TRABAJOS]: [matchPageUri('/trabajos'), matchPageUri('/trabajos-1')],
  [JUEGOS]: [matchPageUri('/juegos'), matchPageUri('/juegos')],
  [UNIVISION]: [matchPageUri('/temas'), matchPageUri('/posible'), matchPageUri('/descubrecon76'), matchPageUri('/descubre76')],
  [VOTA_CONMIGO]: [matchPageUri('/votaconmigo')],
  [UNIVISION_FOUNDATION]: [matchPageUri('/univision-foundation')],
};
