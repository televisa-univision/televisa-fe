import * as categories from '../../../constants/pageCategories';
// eslint-disable-next-line import/no-cycle
import { matchPageUri } from './matchers';
// eslint-disable-next-line import/no-cycle
import matchesShowType from './matchers/custom/shows';

export default {
  [categories.NOVELA]: [matchPageUri('/temas/novelas'), matchPageUri('/novelas'), matchPageUri('/telenovelas/capitulos-gratis'), matchesShowType('NOVELAS')],
  [categories.SERIE]: [matchPageUri('/programas/series-tema'), matchPageUri('/series'), matchesShowType('SERIES')],
  [categories.ESPECIALES]: [matchPageUri('/temas/especiales'), matchPageUri('/especiales'), matchesShowType('ESPECIALES'), matchesShowType('TENTPOLES')],
  [categories.SHOW]: [matchPageUri('/temas/shows'), matchPageUri('/shows'), matchesShowType(['SHOWS', 'NOTICIAS', 'DEPORTES']), matchPageUri('/shows/cronicas-de-sabado/especiales'),
    matchPageUri('/shows/aqui-y-ahora/especiales'), matchPageUri('/conecta')],

  // "Custom" shows
  [categories.NOTICIERO_EDICION_DIGITAL]: [matchPageUri('/noticias/edicion-digital')],
};
