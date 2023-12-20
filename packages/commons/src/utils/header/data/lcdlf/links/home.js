import { LCDLF_SITE } from '../../../../../constants/sites';
import { MILANO_RED } from '../../../../styled/constants';

export default [
  {
    name: 'En vivo',
    link: '/en-vivo',
    site: LCDLF_SITE,
    icon: {
      name: 'live',
      props: {
        fill: MILANO_RED,
      },
    },
  },
  {
    name: 'Famosos',
    link: '/famosos',
    site: LCDLF_SITE,
  },
  {
    name: 'Votaciones',
    link: '/votaciones',
    site: LCDLF_SITE,
  },
  {
    name: 'Ver en vix',
    link: '/ver-en-vix',
    site: LCDLF_SITE,
  },
];
