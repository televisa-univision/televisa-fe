import { BRIGHT_PURPLE } from '@univision/fe-commons/dist/utils/styled/constants';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

const rootPath = '/famosos';
const site = UNIVISION_SITE;
const target = '_self';

const children = [
  {
    name: LocalizationManager.get('breakDeLasSiete'),
    href: 'shows/el-break-de-las-7',
    site,
    target,
  },
  {
    name: 'Bebés Famosos',
    href: 'famosos/bebes',
    site,
    target,
  },
  {
    name: 'Familias Famosas',
    href: 'famosos/hijos-e-hijas',
    site,
    target,
  },
  {
    name: 'Parejas Famosas',
    href: 'famosos/parejas',
    site,
    target,
  },
  {
    name: 'Divorcios Famosos',
    href: 'famosos/divorcio',
    site,
    target,
  },
];

export default {
  children,
  href: rootPath,
  name: LocalizationManager.get('celebrities'),
  site,
  target,
  theme: {
    primary: BRIGHT_PURPLE,
  },
  crawlable: true,
};
