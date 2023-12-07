import { DAISY_BUSH } from '@univision/fe-commons/dist/utils/styled/constants';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

const rootPath = '/estilo-de-vida';
const site = UNIVISION_SITE;
const target = '_self';

const children = [
  {
    name: LocalizationManager.get('fashion'),
    href: `${rootPath}/moda`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('beauty'),
    href: `${rootPath}/asi-se-vive-mejor-belleza`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('cooking'),
    href: `${rootPath}/cocinar`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('sexAndRelationships'),
    href: `${rootPath}/sexo-y-relaciones`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('living'),
    href: `${rootPath}/familia-y-hogar`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('well-being'),
    href: `${rootPath}/bienestar`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('couples'),
    href: `${rootPath}/parejas`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('mothers'),
    href: `${rootPath}/madres`,
    site,
    target,
  },
];

export default {
  children,
  href: rootPath,
  name: LocalizationManager.get('lifestyle'),
  site,
  target,
  theme: {
    primary: DAISY_BUSH,
  },
  crawlable: true,
};
