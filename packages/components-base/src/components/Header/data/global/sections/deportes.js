import { getTudnTheme } from '@univision/fe-commons/dist/utils/themes/themes';
import { TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';

export default (profile) => {
  const site = TUDN_SITE;
  const profileLinks = {
    core: [
      {
        name: 'Liga MX',
        href: '/futbol/liga-mx',
        site,
      },
    ],
    uefa: [
      {
        name: 'UEFA Champions League',
        href: '/futbol/uefa-champions-league',
        site,
      },
    ],
  };

  const globalNavLinks = profileLinks[profile] || profileLinks.core;

  return [{
    name: 'Deportes',
    theme: getTudnTheme(),
    href: '/',
    site,
    children: [{
      name: 'Fútbol',
      href: '/futbol',
      site,
    }, {
      name: 'Boxeo',
      href: '/boxeo',
      site,
    }, {
      name: 'Formula 1',
      href: '/formula-1',
      site,
    }, {
      name: 'MLB',
      href: '/mlb',
      site,
    }, {
      name: 'NBA',
      href: '/nba',
      site,
    }, {
      name: 'NFL',
      href: '/nfl',
      site,
    }, {
      name: 'Sensación Deporte',
      href: '/sensacion-deporte',
      site,
    }, {
      name: 'Tenis',
      href: '/tenis',
      site,
    }, {
      name: 'UFC',
      href: '/ufc',
      site,
    }, {
      name: 'Combate Americas',
      href: '/combate-americas',
      site,
    }, {
      name: 'Mas Deportes',
      href: '/mas-deportes',
      site,
    }, {
      name: 'Premios Univision Deportes',
      href: '/premios-univision-deportes',
      site,
    }, {
      name: 'Liga MX',
      href: '/futbol/liga-mx',
      site,
    }, {
      name: 'Posiciones',
      href: '/futbol/posiciones',
      site,
    }, {
      name: 'Radio',
      href: '/univision-deportes-radio',
      site,
    }, {
      name: 'UEFA Champions League',
      href: '/futbol/uefa-champions-league',
      site,
    }, {
      name: 'Otras Ligas',
      href: '/futbol/ligas-y-torneos',
      site,
    }, {
      name: 'Selección MX',
      href: '/futbol/mexico',
      site,
    }, {
      name: 'Selección USA',
      href: '/futbol/eeuu',
      site,
    }, {
      name: 'MLS',
      href: '/futbol/mls',
      site,
    }, {
      name: 'Opinión',
      href: '/opinion-deportes',
      site,
    }, {
      name: 'Entrevistas',
      href: '/entrevistas',
      site,
    }, {
      name: 'COPA MX',
      href: '/futbol/copa-mx',
      site,
    }, {
      name: 'UEFA Europa League',
      href: '/futbol/uefa-europa-league',
      site,
    }, {
      name: 'UEFA Nations League',
      href: '/futbol/uefa-nations-league',
      site,
    }, {
      name: 'Deportes Extremos',
      href: '/mas-deportes-extremos',
      site,
    }, {
      name: 'Fanshop',
      href: 'https://www.univisiondeportesfanshop.com',
    }],
  }, ...globalNavLinks];
};
