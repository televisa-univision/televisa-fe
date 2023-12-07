import copaAmerica from './copaAmerica';
import copaOro from './copaOro';
import ligaMx from './ligaMx';
import ligaExpansion from './ligaExpansion';
import euro from './euro';
import mls from './mls';
import uefa from './uefa';
import uefaEuropa from './uefaEuropa';
import uefaNations from './uefaNations';
import qatar2022 from './qatar2022';
import qatarMx2022 from './qatarMx2022';

/**
 * Map a particular league path with a header
 */
export default {
  '^\\/futbol\\/mls.*': mls,
  '^\\/mx\\/futbol\\/mls.*': mls,
  '^\\/futbol\\/liga-mx.*': ligaMx,
  '^\\/mx\\/futbol\\/liga-mx.*': ligaMx,
  '^\\/futbol\\/uefa-champions-league.*': uefa,
  '^\\/mx\\/futbol\\/uefa-champions-league.*': uefa,
  '^\\/futbol\\/uefa-europa-league.*': uefaEuropa,
  '^\\/mx\\/futbol\\/uefa-europa-league.*': uefaEuropa,
  '^\\/futbol\\/uefa-nations-league.*': uefaNations,
  '^\\/mx\\/futbol\\/uefa-nations-league.*': uefaNations,
  '^\\/futbol\\/uefa-euro-2020.*': euro,
  '^\\/mx\\/futbol\\/uefa-euro-2020.*': euro,
  '^\\/futbol\\/liga-de-expansion-mx.*': ligaExpansion,
  '^\\/mx\\/futbol\\/liga-de-expansion-mx.*': ligaExpansion,
  '^\\/futbol\\/copa-oro.*': copaOro,
  '^\\/mx\\/futbol\\/copa-oro.*': copaOro,
  '^\\/futbol\\/copa-america': copaAmerica,
  '^\\/mx\\/futbol\\/copa-america': copaAmerica,
  '^\\/futbol\\/mundial-qatar-2022.*': qatar2022,
  '^\\/mundial-qatar-2022.*': qatar2022,
  '^\\/mx\\/futbol\\/mundial-qatar-2022.*': qatarMx2022,
  '^\\/mx\\/mundial-qatar-2022.*': qatarMx2022,
};
