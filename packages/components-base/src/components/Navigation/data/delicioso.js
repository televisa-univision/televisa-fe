import { VELVET_RED } from '@univision/fe-commons/dist/utils/styled/constants';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

const rootPath = '/delicioso';
const site = UNIVISION_SITE;
const target = '_self';

const children = [
  {
    name: LocalizationManager.get('desserts'),
    href: `${rootPath}/postres`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('dinners'),
    href: `${rootPath}/cenas`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('drinks'),
    href: `${rootPath}/bebidas`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('easyRecipes'),
    href: `${rootPath}/recetas-faciles`,
    site,
    target,
  },
];

export default {
  children,
  href: rootPath,
  name: LocalizationManager.get('delicious'),
  site,
  target,
  theme: {
    primary: VELVET_RED,
  },
  crawlable: true,
};
