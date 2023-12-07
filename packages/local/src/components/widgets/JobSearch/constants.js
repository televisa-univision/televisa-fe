import { GRAYISH_BLUE, MOSTLY_BLACK } from '@univision/fe-utilities/styled/constants';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

export const apploiUrl = 'https://www.apploi.com';

/**
 * Select the right icon for the arrow icon using Collapsible component
 * @type {{hide: string, show: string}}
 */
export const arrows = {
  show: 'arrowUp',
  hide: 'arrowDown',
};

export const activeMarketsAbbr = [
  'KXLN',
  'WGBO',
  'KMEX',
  'WXTV',
  'WLTV',
  'KUVN',
  'KTVW',
  'KWEX',
  'KAKW',
  'KDTV',
  'WFDC',
  'WVEA',
  'WVEN',
  'WUVG',
  'KUTH',
  'WUVP',
  'KFTV',
  'KUVS',
  'WUVC',
  'KABE',
];

export const applyMethods = {
  QUICK: 'QUICK',
  FULL: 'FULL',
  REDIRECT: 'REDIRECT',
};

export const languages = [
  { value: 'es', name: 'Español' },
  { value: 'en', name: 'Inglés' },
];

export const inactiveMarket = {
  en: 'We are sorry, there are no jobs available for your location. Please use the dropdown on the left to select one of the cities that Univision has job listings.',
  es: 'Lo sentimos, no hay trabajos disponibles para su ubicación. Utilice el menú desplegable a la izquierda para seleccionar una de las ciudades en las que Univision tiene listas de trabajos.',
};

export const theme = {
  primary: MOSTLY_BLACK,
  gradient: {
    start: MOSTLY_BLACK,
    end: GRAYISH_BLUE,
  },
};

export const utmSource = {
  desktop: 'univision_web',
  mobile: 'univision_mobile_web',
  tablet: 'univision_mobile_web',
};

export const jobTypes = {
  es: {
    FULL_TIME: localization.get('jobFullTime', { language: 'es' }),
    PART_TIME: localization.get('jobPartTime', { language: 'es' }),
    ALL: localization.get('all', { language: 'es' }),
  },
  en: {
    FULL_TIME: localization.get('jobFullTime', { language: 'en' }),
    PART_TIME: localization.get('jobPartTime', { language: 'en' }),
    ALL: localization.get('all', { language: 'en' }),
  },
};

export const customCitiesNames = {
  Washington: 'Washington D.C.',
};
