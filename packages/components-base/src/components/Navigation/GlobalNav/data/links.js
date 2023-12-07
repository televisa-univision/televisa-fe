import { UNIVISION_SITE, TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';

import {
  BLACK,
  CARDINAL,
  CARIBBEAN_GREEN,
  CERISE_RED,
  LIGHT_GREY,
  LIGHT_BLUE,
  PURPLE_HEART,
  WATERCOURSE_TUDN,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default [
  {
    name: 'Univision',
    uri: '/',
    site: UNIVISION_SITE,
    icon: 'univisionMobile',
    bottomBorderColor: BLACK,
  },
  {
    name: 'Shows',
    uri: '/shows',
    site: UNIVISION_SITE,
    bottomBorderColor: LIGHT_GREY,
  },
  {
    name: 'Noticias',
    uri: '/noticias',
    site: UNIVISION_SITE,
    bottomBorderColor: LIGHT_BLUE,
  },
  {
    name: 'Famosos',
    uri: '/famosos',
    site: UNIVISION_SITE,
    bottomBorderColor: CERISE_RED,
  },
  {
    name: 'Deportes',
    uri: '/',
    site: TUDN_SITE,
    bottomBorderColor: WATERCOURSE_TUDN,
  },
  {
    name: 'Lifestyle',
    uri: '/estilo-de-vida',
    site: UNIVISION_SITE,
    bottomBorderColor: PURPLE_HEART,
  },
  {
    name: 'Radio',
    uri: '/radio',
    site: UNIVISION_SITE,
    bottomBorderColor: CARDINAL,
  },
  {
    name: 'Shop',
    uri: 'https://shop.univision.com/',
    bottomBorderColor: CARIBBEAN_GREEN,
    target: '_blank',
  },
];

export const tuCiudadLink = {
  name: 'Tu Ciudad',
  uri: '/local',
  site: UNIVISION_SITE,
  bottomBorderColor: LIGHT_BLUE,
};
