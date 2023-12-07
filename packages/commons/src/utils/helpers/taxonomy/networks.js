import {
  GALAVISION,
  UNIMAS,
  UNIDOS_POR_LOS_NUESTROS,
} from '../../../constants/pageCategories';
// eslint-disable-next-line import/no-cycle
import { matchPageUri, matchTagUri } from './matchers';

export default {
  [GALAVISION]: [matchTagUri('/galavision'), matchPageUri('/networks/galavision')],
  [UNIMAS]: [matchTagUri('/unimas'), matchPageUri('/unimas')],
  [UNIDOS_POR_LOS_NUESTROS]: [matchPageUri('/networks/univision/unidos-por-los-nuestros')],
};
