import { TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';
import localization from '@univision/fe-utilities/localization';

const site = TUDN_SITE;
const target = '_self';

const topics = [
  {
    id: 1,
    name: localization.get('ligaMx'),
    href: '/mx/futbol/liga-mx',
    site,
    target,
  },
  {
    id: 2,
    name: localization.get('mxTeam'),
    href: '/mx/futbol/mexico',
    site,
    target,
  },
  {
    id: 3,
    name: localization.get('qatarWorldcup'),
    href: '/mx/futbol/mundial-qatar-2022',
    site,
    target,
  },
  {
    id: 6,
    name: localization.get('nfl'),
    href: '/nfl',
    site,
    target,
  },
  {
    id: 5,
    name: localization.get('futInternacional'),
    href: '/futbol',
    site,
    target,
  },
  {
    id: 6,
    name: localization.get('combateGlobal'),
    href: '/combate-global',
    site,
    target,
  },
  {
    id: 7,
    name: localization.get('mexicansAbroad'),
    href: '/mx/futbol/mexicanos-en-el-exterior',
    site,
    target,
  },
  {
    id: 8,
    name: 'MLB',
    href: '/futbol/mlb',
    site,
    target,
  },
  {
    id: 9,
    name: 'NBA',
    href: '/futbol/nba',
    site,
    target,
  },
  {
    id: 10,
    name: localization.get('uefaChampions'),
    href: '/mx/futbol/uefa-champions-league',
    site,
    target,
  },
];

export default {
  name: localization.get('popularTopics'),
  children: topics,
};
