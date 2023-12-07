import { WATERCOURSE_TUDN } from '@univision/fe-commons/dist/utils/styled/constants';
import { TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';
import localization from '@univision/fe-utilities/localization';

const site = TUDN_SITE;
const target = '_self';
const soccerRoot = '/futbol';

const children = [
  {
    name: localization.get('soccer'),
    href: soccerRoot,
    site,
    target,
    crawlable: true,
  },
  {
    name: localization.get('ligaMx'),
    href: `${soccerRoot}/liga-mx`,
    site,
    target,
    crawlable: true,
  },
  {
    name: localization.get('uefaChampions'),
    href: `${soccerRoot}/uefa-champions-league`,
    site,
    target,
    crawlable: true,
  },
  {
    name: localization.get('uefaEuropaLeague'),
    href: `${soccerRoot}/uefa-europa-league`,
    site,
    target,
  },
  {
    name: localization.get('mxSoccerTeam'),
    href: `${soccerRoot}/mexico`,
    site,
    target,
  },
  {
    name: localization.get('copaMx'),
    href: `${soccerRoot}/copa-mx`,
    site,
    target,
  },
  {
    name: localization.get('mls'),
    href: `${soccerRoot}/mls`,
    site,
    target,
  },
  {
    name: localization.get('usaSoccerTeam'),
    href: `${soccerRoot}/eeuu`,
    site,
    target,
  },
  {
    name: localization.get('moreSports'),
    href: '/mas-deportes',
    site,
    target,
  },
  {
    name: localization.get('box'),
    href: '/boxeo',
    site,
    target,
    crawlable: true,
  },
  {
    name: localization.get('combateAmericas'),
    href: '/combate-americas',
    site,
    target,
  },
  {
    name: localization.get('formula1'),
    href: '/formula-1',
    site,
    target,
  },
  {
    name: localization.get('esports'),
    href: '/esports',
    site,
    target,
  },
  {
    name: localization.get('opinion'),
    href: '/opinion-deportes',
    site,
    target,
  },
  {
    name: localization.get('radio'),
    href: '/TUDN-radio',
    site,
    target,
  },
  {
    name: localization.get('tudnShows'),
    href: '/programas',
    site,
    target,
  },
  {
    name: localization.get('stats'),
    href: `${soccerRoot}/resultados-y-estadisticas-futbol`,
    site,
    target,
    crawlable: true,
  },
  {
    name: localization.get('fanShop'),
    href: 'https://www.univisiondeportesfanshop.com',
    site,
    target,
  },
  {
    name: localization.get('footballEurope'),
    href: '/futbol/europa',
    site,
    target,
  },
  {
    name: localization.get('americasCup'),
    href: '/futbol/copa-america',
    site,
    target,
  },
  {
    name: localization.get('goldCup'),
    href: '/futbol/copa-oro',
    site,
    target,
  },
  {
    name: localization.get('nfl'),
    href: '/nfl',
    site,
    target,
  },
  {
    name: localization.get('nba'),
    href: '/nba',
    site,
    target,
  },
];

export default {
  children,
  href: '/',
  name: localization.get('sports'),
  site,
  target,
  theme: {
    primary: WATERCOURSE_TUDN,
  },
  crawlable: true,
};
