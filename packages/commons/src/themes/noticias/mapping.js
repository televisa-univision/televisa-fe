import * as pageCategories from '../../constants/pageCategories';

import autos from './autos';
import censo2020 from './censo2020';
import contigo from './contigo';
import destino2020VotaConmigo from './destino2020VotaConmigo';
import elecciones2020 from './elecciones2020';
import elecciones2022 from './elecciones2022';
import fuertesJuntos from './fuertesJuntos';
import miSaludMiDecision from './miSaludMiDecision';
import noticias from '.';
import segundaOportunidad from './segundaOportunidad';
import siliconValley from './siliconValley';
import teExplicamos from './teExplicamos';
import digitalchannel from './digitalchannel';
import livestreams from './livestreams';
import unidosContraCoronavirus from './unidosContraCoronavirus';
import healthiNation from './healthiNation';
import unidosSomosUno from './unidosSomosUno';

export default {
  [pageCategories.AUTOS]: autos,
  [pageCategories.CARROS]: autos,
  [pageCategories.CENSO_2020]: censo2020,
  [pageCategories.CONTIGO]: contigo,
  [pageCategories.DESTINO2020_VOTA_CONMIGO]: destino2020VotaConmigo,
  [pageCategories.DIGITAL_CHANNEL]: digitalchannel,
  [pageCategories.LIVESTREAMS]: livestreams,
  [pageCategories.ELECCIONES_2020]: elecciones2020,
  [pageCategories.ELECCIONES_2022]: elecciones2022,
  [pageCategories.POLITICA]: noticias,
  [pageCategories.FUERTES_JUNTOS]: fuertesJuntos,
  [pageCategories.HEALTHI_NATION]: healthiNation,
  [pageCategories.INMIGRACION]: noticias,
  [pageCategories.MEXICO]: noticias,
  [pageCategories.MI_SALUD_MI_DECISION]: miSaludMiDecision,
  [pageCategories.NEWS]: noticias,
  [pageCategories.PLANETA]: noticias,
  [pageCategories.RETO28]: noticias,
  [pageCategories.SECOND_CHANCES]: segundaOportunidad,
  [pageCategories.SEGUNDA_OPORTUNIDAD]: segundaOportunidad,
  [pageCategories.SILICON_VALLEY]: siliconValley,
  [pageCategories.TE_EXPLICAMOS]: teExplicamos,
  [pageCategories.UNIDOS_CONTRA_CORONAVIRUS]: unidosContraCoronavirus,
  [pageCategories.UNIDOS_SOMOS_UNO]: unidosSomosUno,
  [pageCategories.UNIVISION_NEWS]: noticias,
};
