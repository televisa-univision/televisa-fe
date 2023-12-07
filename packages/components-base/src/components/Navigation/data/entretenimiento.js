import { BRIGHT_PURPLE } from '@univision/fe-commons/dist/utils/styled/constants';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

const rootPath = '/entretenimiento';
const site = UNIVISION_SITE;
const target = '_self';

const children = [
  {
    name: 'Cultura pop',
    href: 'entretenimiento/cultura-pop',
    site,
    target,
  },
  {
    name: 'Cine y series',
    href: 'entretenimiento/cine-y-series',
    site,
    target,
  },
  {
    name: 'Geek',
    href: 'entretenimiento/geek',
    site,
    target,
  },
];

export default {
  children,
  href: rootPath,
  name: LocalizationManager.get('entertainment'),
  site,
  target,
  theme: {
    primary: BRIGHT_PURPLE,
  },
  crawlable: true,
};
