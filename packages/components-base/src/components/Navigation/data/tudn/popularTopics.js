import { TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';
import localization from '@univision/fe-utilities/localization';

const site = TUDN_SITE;
const target = '_self';

const topics = [
  {
    id: 1,
    name: localization.get('ligaMx'),
    href: '/futbol/liga-mx',
    site,
    target,
  },
  {
    id: 2,
    name: localization.get('Video'),
    href: '/video',
    site,
    target,
  },
  {
    id: 3,
    name: localization.get('mexicansAbroad'),
    href: '/futbol/mexicanos-en-el-exterior',
    site,
    target,
  },
  {
    id: 4,
    name: localization.get('mxSoccerTeam'),
    href: '/futbol/mexico',
    site,
    target,
  },
  {
    id: 5,
    name: localization.get('combateGlobal'),
    href: '/futbol/combate-global',
    site,
    target,
  },
  {
    id: 6,
    name: localization.get('uefaChampions'),
    href: '/futbol/uefa-champions-league',
    site,
    target,
  },
  {
    id: 7,
    name: localization.get('qatarWorldcup'),
    href: '/futbol/mundial-qatar-2022',
    site,
    target,
  },
  {
    id: 8,
    name: localization.get('mls'),
    href: '/futbol/mls',
    site,
    target,
  },
  {
    id: 9,
    name: localization.get('nfl'),
    href: '/nfl',
    site,
    target,
  },
  {
    id: 10,
    name: localization.get('footballEurope'),
    href: '/futbol/europa',
    site,
    target,
  },
];

export default {
  name: localization.get('popularTopics'),
  children: topics,
};
