import { VELVET_RED } from '@univision/fe-commons/dist/utils/styled/constants';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

const rootPath = '/radio';
const site = UNIVISION_SITE;
const target = '_self';

const children = [
  {
    name: LocalizationManager.get('radio'),
    href: rootPath,
    site,
    target,
  },
  {
    name: LocalizationManager.get('music'),
    href: '/musica',
    site,
    target,
  },
  {
    name: LocalizationManager.get('podcasts'),
    href: `${rootPath}/podcasts`,
    site,
    target,
  },
  // {
  //   name: LocalizationManager.get('concerts'),
  //   href: rootPath, // TODO :TBA POST LAUNCH
  //   site,
  //   target,
  // },
  // {
  //   name: LocalizationManager.get('news'),
  //   href: rootPath, // TODO :TBA POST LAUNCH
  //   site,
  //   target,
  // },
];

export default {
  children,
  name: LocalizationManager.get('uforia'),
  href: rootPath,
  theme: {
    primary: VELVET_RED,
  },
  crawlable: true,
};
