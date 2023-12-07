import { UNIVISION_SITE, TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

const site = UNIVISION_SITE;
const target = '_self';

const activeTopics = [1, 2, 11, 4, 17, 13, 6, 15, 10];
const topics = [
  {
    id: 1,
    name: LocalizationManager.get('sports'),
    href: '/',
    site: TUDN_SITE,
    target,
  },
  {
    id: 2,
    name: LocalizationManager.get('radio'),
    href: '/radio',
    site,
    target,
  },
  {
    id: 3,
    name: LocalizationManager.get('almaGlow'),
    href: '/',
    site,
    target,
  },
  {
    id: 4,
    name: LocalizationManager.get('immigration'),
    href: '/noticias/inmigracion',
    site,
    target,
  },
  {
    id: 5,
    name: LocalizationManager.get('momsAndDads'),
    href: '/',
    site,
    target,
  },
  {
    id: 6,
    name: LocalizationManager.get('uefaChampions'),
    href: '/futbol/uefa-champions-league',
    site: TUDN_SITE,
    target,
  },
  {
    id: 7,
    name: LocalizationManager.get('loNuestroAwards'),
    href: '/',
    site,
    target,
  },
  {
    id: 8,
    name: LocalizationManager.get('delicious'),
    href: '/delicioso',
    site,
    target,
  },
  {
    id: 10,
    name: LocalizationManager.get('ligaMx'),
    href: '/futbol/liga-mx',
    site: TUDN_SITE,
    target,
  },
  {
    id: 11,
    name: LocalizationManager.get('celebrities'),
    href: '/famosos',
    site,
    target,
  },
  {
    id: 12,
    name: LocalizationManager.get('theDragon'),
    href: '/shows/el-dragon',
    site,
    target,
  },
  {
    id: 13,
    name: LocalizationManager.get('news'),
    href: '/noticias',
    site,
    target,
  },
  {
    id: 14,
    name: LocalizationManager.get('destino2020'),
    href: '/noticias/elecciones-en-eeuu-2020',
    site,
    target,
  },
  {
    id: 15,
    name: 'Coronavirus',
    href: '/coronavirus',
    site,
    target,
  },
  {
    id: 16,
    name: LocalizationManager.get('games'),
    href: '/juegos',
    site,
    target,
  },
  {
    id: 17,
    name: LocalizationManager.get('crosswords'),
    href: '/juegos',
    site,
    target,
  },
];

export default {
  name: LocalizationManager.get('popularTopics'),
  children: activeTopics.map(activeId => topics.find(topic => activeId === topic.id)),
};
