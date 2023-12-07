import { LAS_ESTRELLAS_SITE } from '../../../../../constants/sites';
import { MILANO_RED } from '../../../../styled/constants';

export default [
  {
    name: 'Telenovelas',
    link: '/telenovelas',
    site: LAS_ESTRELLAS_SITE,
  },
  {
    name: 'Programas',
    link: '/programas',
    site: LAS_ESTRELLAS_SITE,
  },
  {
    name: 'Reality',
    link: '/reality',
    site: LAS_ESTRELLAS_SITE,
  },
  {
    name: 'Capitulos Gratis',
    link: '/telenovelas/capitulos-gratis',
    site: LAS_ESTRELLAS_SITE,
  },
  {
    name: 'Horoscopos',
    link: '/horoscopos',
    site: LAS_ESTRELLAS_SITE,
  },
  {
    name: 'En vivo',
    link: '/en-vivo',
    site: LAS_ESTRELLAS_SITE,
    icon: {
      name: 'live',
      props: {
        fill: MILANO_RED,
      },
    },
  },
];
