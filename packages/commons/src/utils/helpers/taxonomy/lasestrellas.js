import {
  LAS_ESTRELLAS_TELENOVELAS,
  LAS_ESTRELLAS_PROGRAMAS,
  LAS_ESTRELLAS_REALITY,
  LAS_ESTRELLAS_CAPITULOS_GRATIS,
  LAS_ESTRELLAS_HOROSCOPOS,
  LAS_ESTRELLAS_EN_VIVO,
  LAS_ESTRELLAS,
} from '../../../constants/pageCategories';
// eslint-disable-next-line import/no-cycle
import { matchPageUri } from './matchers';

export default {
  [LAS_ESTRELLAS_TELENOVELAS]: [matchPageUri('/telenovelas'), matchPageUri('/shows/novelas')],
  [LAS_ESTRELLAS_PROGRAMAS]: [matchPageUri('/programas')],
  [LAS_ESTRELLAS_REALITY]: [matchPageUri('/reality')],
  [LAS_ESTRELLAS_CAPITULOS_GRATIS]: [matchPageUri('/telenovelas/capitulos-gratis')],
  [LAS_ESTRELLAS_HOROSCOPOS]: [matchPageUri('/horoscopos')],
  [LAS_ESTRELLAS_EN_VIVO]: [matchPageUri('/en-vivo')],
  [LAS_ESTRELLAS]: [matchPageUri('/')],
};
