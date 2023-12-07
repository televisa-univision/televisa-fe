import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import contactoBg from '@univision/fe-commons/dist/assets/images/tudn/shows/contacto-deportivo-2x.png';
import centralBg from '@univision/fe-commons/dist/assets/images/tudn/shows/futbol-central-2x.png';
import repDptBg from '@univision/fe-commons/dist/assets/images/tudn/shows/rep-deportiva-2x.png';
import clubBg from '@univision/fe-commons/dist/assets/images/tudn/shows/futbol-club-2x.png';

const site = UNIVISION_SITE;
const target = '_self';
const rootPath = '/shows/deportes';

const tudnShows = [
  {
    id: 1,
    name: 'contacto deportivo',
    href: `${rootPath}/contacto-deportivo-udn`,
    site,
    target,
    renditions: {
      xxs: contactoBg,
    },
  },
  {
    id: 2,
    name: 'fútbol central',
    href: `${rootPath}/futbol-central`,
    site,
    target,
    renditions: {
      xxs: centralBg,
    },
  },
  {
    id: 3,
    name: 'república deportiva',
    href: `${rootPath}/republica-deportiva`,
    site,
    target,
    renditions: {
      xxs: repDptBg,
    },
  },
  {
    id: 4,
    name: 'fútbol club',
    href: `${rootPath}/futbol-club`,
    site,
    target,
    renditions: {
      xxs: clubBg,
    },
  },
];

export default {
  name: LocalizationManager.get('sportShows'),
  href: rootPath,
  target,
  cta: {
    text: LocalizationManager.get('seeAllShows'),
    site: UNIVISION_SITE,
  },
  site: UNIVISION_SITE,
  children: tudnShows,
};
