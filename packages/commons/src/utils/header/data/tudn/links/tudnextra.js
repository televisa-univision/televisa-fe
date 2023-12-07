import { TUDN_SITE } from '../../../../../constants/sites';
import { RED } from '../../../../styled/constants';

export default [
  {
    name: 'Inicio',
    link: '/',
    site: TUDN_SITE,
  },
  {
    name: 'En Vivo',
    link: '/futbol/partidos-de-futbol-para-hoy-en-vivo',
    site: TUDN_SITE,
    icon: {
      name: 'live',
      props: {
        fill: RED,
      },
    },
  },
  {
    name: 'Estadísticas',
    link: '/futbol/resultados-y-estadisticas-futbol',
    site: TUDN_SITE,
  },
];
