import { TUDN_SITE } from '../../../../../../constants/sites';

export default [
  {
    name: 'Liga MX',
    link: '/mx/futbol/liga-mx',
    site: TUDN_SITE,
    target: '_self',
  },
  {
    name: 'Internacional',
    link: 'mx/futbol',
    site: TUDN_SITE,
    target: '_self',
  },
  {
    name: 'Tri',
    link: '/mx/futbol/mexico',
    site: TUDN_SITE,
    target: '_self',
  },
  {
    name: 'NFL',
    link: '/mx/nfl-mx',
    site: TUDN_SITE,
    target: '_self',
  },
  {
    name: 'Estadísticas',
    link: '/mx/futbol/resultados-y-estadisticas-futbol',
    site: TUDN_SITE,
    target: '_self',
  },
  {
    name: 'Más',
    dropDownOptions: [
      {
        name: 'Combate Global',
        link: '/mx/combate-global',
        site: TUDN_SITE,
        target: '_self',
      },
      {
        name: 'Boxeo',
        link: '/mx/boxeo',
        site: TUDN_SITE,
        target: '_self',
      },
      {
        name: 'F1',
        link: '/mx/formula-1',
        site: TUDN_SITE,
        target: '_self',
      },
      {
        name: 'Más Deportes',
        link: '/mx/mas-deportes',
        site: TUDN_SITE,
        target: '_self',
      },
      {
        name: 'Copa Oro',
        link: 'mx/futbol/copa-oro',
        site: TUDN_SITE,
        target: '_self',
      },
    ],
  },
];
