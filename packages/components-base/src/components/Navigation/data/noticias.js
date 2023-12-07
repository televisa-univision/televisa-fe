import { CERULEAN_BLUE } from '@univision/fe-commons/dist/utils/styled/constants';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

const rootPath = '/noticias';
const site = UNIVISION_SITE;
const target = '_self';

const children = [
  {
    name: LocalizationManager.get('latinAmerica'),
    href: `${rootPath}/america-latina`,
    site,
    target,
    crawlable: true,
  },
  {
    name: LocalizationManager.get('attacks'),
    href: `${rootPath}/ataques`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('science'),
    href: `${rootPath}/ciencia`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('community'),
    href: `${rootPath}/comunidad`,
    site,
    target,
  },
  {
    name: 'Coronavirus',
    href: '/coronavirus',
    site,
    target,
    crawlable: true,
  },
  {
    name: LocalizationManager.get('criminality'),
    href: `${rootPath}/criminalidad`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('money'),
    href: `${rootPath}/dinero`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('education'),
    href: `${rootPath}/educacion`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('specials'),
    href: `${rootPath}/especiales`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('unitedStates'),
    href: `${rootPath}/estados-unidos`,
    site,
    target,
    crawlable: true,
  },
  {
    name: LocalizationManager.get('explore'),
    href: '/explora',
    site,
    target,
  },
  {
    name: LocalizationManager.get('naturalPhenomena'),
    href: `${rootPath}/fenomenos-naturales`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('racism'),
    href: `${rootPath}/racismo`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('reto28'),
    href: `${rootPath}/reto-28`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('happening'),
    href: `${rootPath}/sucesos`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('shootings'),
    href: `${rootPath}/tiroteos`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('newsInEnglish'),
    href: '/univision-news',
    site,
    target,
    crawlable: true,
  },
  {
    name: LocalizationManager.get('politics'),
    href: `${rootPath}/politica`,
    site,
    target,
    crawlable: true,
  },
  {
    name: LocalizationManager.get('religion'),
    href: `${rootPath}/religion`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('health'),
    href: `${rootPath}/salud`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('technology'),
    href: `${rootPath}/tecnologia`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('trending'),
    href: `${rootPath}/trending`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('hispanics'),
    href: `${rootPath}/hispanos`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('immigration'),
    href: `${rootPath}/inmigracion`,
    site,
    target,
    crawlable: true,
  },
  {
    name: LocalizationManager.get('justice'),
    href: `${rootPath}/justicia`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('meteorology'),
    href: `${rootPath}/meteorologia`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('world'),
    href: `${rootPath}/mundo`,
    site,
    target,
    crawlable: true,
  },
  {
    name: LocalizationManager.get('drugTrafficking'),
    href: `${rootPath}/narcotrafico`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('opinion'),
    href: `${rootPath}/opinion`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('gangs'),
    href: `${rootPath}/pandillas`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('planet'),
    href: `${rootPath}/planeta`,
    site,
    target,
  },
];

export default {
  children,
  href: rootPath,
  name: LocalizationManager.get('news'),
  site,
  target,
  theme: {
    primary: CERULEAN_BLUE,
  },
  crawlable: true,
};
