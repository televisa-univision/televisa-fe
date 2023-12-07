import { PURPLE } from '@univision/fe-commons/dist/utils/styled/constants';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

const rootPath = '/horoscopos';
const site = UNIVISION_SITE;
const target = '_self';

const children = [
  {
    children: [
      {
        name: LocalizationManager.get('aries'),
        href: `${rootPath}/aries`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('taurus'),
        href: `${rootPath}/tauro`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('gemini'),
        href: `${rootPath}/geminis`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('cancer'),
        href: `${rootPath}/cancer`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('libra'),
        href: `${rootPath}/libra`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('leo'),
        href: `${rootPath}/leo`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('sagittarius'),
        href: `${rootPath}/sagitario`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('aquarius'),
        href: `${rootPath}/acuario`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('pisces'),
        href: `${rootPath}/piscis`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('scorpio'),
        href: `${rootPath}/escorpion`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('capricorn'),
        href: `${rootPath}/capricornio`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('virgo'),
        href: `${rootPath}/virgo`,
        site,
        target,
      },
    ],
    isSubgroup: true,
    name: LocalizationManager.get('findYourHoroscope'),
  },
  {
    children: [
      {
        name: LocalizationManager.get('compatibility'),
        href: `${rootPath}/compatibilidad`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('predictions2023'),
        href: `${rootPath}/predicciones-2023`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('prodigyBoy'),
        href: `${rootPath}/nino-prodigio`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('predictions'),
        href: `${rootPath}/predicciones-horoscopos`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('chineseHoroscope'),
        href: `${rootPath}/horoscopo-chino`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('tarot'),
        href: `${rootPath}/tarot`,
        site,
        target,
      },
      {
        name: LocalizationManager.get('antahkarana'),
        href: 'http://antahkarana.com',
        site,
        target,
      },
    ],
    isSubgroup: true,
    name: LocalizationManager.get('moreAstrology'),
  },
];

export default {
  children,
  href: rootPath,
  name: LocalizationManager.get('horoscopes'),
  site,
  target,
  theme: {
    primary: PURPLE,
  },
  crawlable: true,
};
