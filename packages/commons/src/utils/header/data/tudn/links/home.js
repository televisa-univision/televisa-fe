import { TUDN_SITE } from '../../../../../constants/sites';

export default [
  {
    name: 'Liga MX',
    link: '/futbol/liga-mx',
    site: TUDN_SITE,
  },
  {
    name: 'Futbol Europa',
    link: '/futbol/europa',
    site: TUDN_SITE,
  },
  {
    name: 'MLS',
    link: '/futbol/mls ',
    site: TUDN_SITE,
  },
  {
    name: 'Combate Global',
    link: '/combate-global',
    site: TUDN_SITE,
  },
  {
    name: 'Estadísticas',
    link: '/futbol/resultados-y-estadisticas-futbol',
    site: TUDN_SITE,
  },
  {
    name: 'Más',
    dropDownOptions: [
      {
        name: 'Tri',
        link: '/futbol/mexico',
        site: TUDN_SITE,
      },
      {
        name: 'Video',
        link: '/video',
        site: TUDN_SITE,
      },
      {
        name: 'TUDNxtra',
        link: '/tudnxtra',
        site: TUDN_SITE,
      },
      {
        name: 'Más deportes',
        link: '/mas-deportes',
        site: TUDN_SITE,
      },
      {
        name: 'TUDN 24/7',
        link: '/tudn-livestream-24-7',
        site: TUDN_SITE,
      },
      {
        name: 'Radio',
        link: '/TUDN-radio',
        site: TUDN_SITE,
      },
      {
        name: 'TUDN VISION',
        link: '/tudn-vision',
        target: '_parent',
        site: TUDN_SITE,
      },
    ],
  },
];
