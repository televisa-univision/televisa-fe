import { GRADIENT_BLACK } from '@univision/fe-commons/dist/utils/styled/constants';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

const rootPath = '/shows';
const site = UNIVISION_SITE;
const target = '_self';

const children = [
  {
    name: 'Latin Grammy',
    href: `${rootPath}/latin-grammy`,
    site,
    target,
  },
  {
    name: 'Premios Juventud',
    href: `${rootPath}/premios-juventud`,
    site,
    target,
  },
  {
    name: 'Premio Lo Nuestro',
    href: `${rootPath}/premio-lo-nuestro`,
    site,
    target,
  },
];

export default {
  children,
  href: rootPath,
  name: LocalizationManager.get('awards'),
  site,
  target,
  theme: {
    primary: GRADIENT_BLACK,
  },
};
