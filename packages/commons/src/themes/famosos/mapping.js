import * as pageCategories from '../../constants/pageCategories';

import estiloDeVida from './estiloDeVida';
import gangasAndDeals from './gangasAndDeals';
import famosos from '.';

export default {
  [pageCategories.FAMOSOS]: famosos,
  [pageCategories.ESTILO_DE_VIDA]: estiloDeVida,
  [pageCategories.GANGAS_AND_DEALS]: gangasAndDeals,
};
