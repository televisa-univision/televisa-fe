import { GO_BEN } from '@univision/fe-commons/dist/utils/styled/constants';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

const rootPath = '/carros';
const site = UNIVISION_SITE;
const target = '_self';

const children = [
  {
    name: LocalizationManager.get('testDrives'),
    href: `${rootPath}/pruebas-de-manejo`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('advise'),
    href: `${rootPath}/consejos-de-carros`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('ranking'),
    href: `${rootPath}/ranking-de-carros`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('categories'),
    href: `${rootPath}/categorias-de-carros`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('brands'),
    href: `${rootPath}/marcas-de-carros`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('photos'),
    href: `${rootPath}/fotos-de-carros`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('videos'),
    href: `${rootPath}/videos-de-carros`,
    site,
    target,
  },
];

export default {
  children,
  href: rootPath,
  name: LocalizationManager.get('aboard'),
  site,
  target,
  theme: {
    primary: GO_BEN,
  },
  crawlable: true,
};
