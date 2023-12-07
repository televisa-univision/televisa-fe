import { LIGHT_BLUE } from '@univision/fe-commons/dist/utils/styled/constants';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

const rootPath = '/local';
const site = UNIVISION_SITE;
const target = '_self';

const children = [
  {
    name: LocalizationManager.get('arizona'),
    href: `${rootPath}/arizona-ktvw`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('atlanta'),
    href: `${rootPath}/atlanta-wuvg`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('austin'),
    href: `${rootPath}/austin-kakw`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('bakersfield'),
    href: `${rootPath}/bakersfield-kabe`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('chicago'),
    href: `${rootPath}/chicago-wgbo`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('dallas'),
    href: `${rootPath}/dallas-kuvn`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('fresno'),
    href: `${rootPath}/fresno-kftv`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('houston'),
    href: `${rootPath}/houston-kxln`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('losAngeles'),
    href: `${rootPath}/los-angeles-kmex`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('miami'),
    href: `${rootPath}/miami-wltv`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('newYork'),
    href: `${rootPath}/nueva-york-wxtv`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('philadelphia'),
    href: `${rootPath}/philadelphia-wuvp`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('puertoRico'),
    href: `${rootPath}/puerto-rico-wlii`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('northCarolina'),
    href: `${rootPath}/north-carolina-wuvc`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('saltLakeCity'),
    href: `${rootPath}/salt-lake-city-kuth`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('bayArea'),
    href: `${rootPath}/san-francisco-kdtv`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('sanAntonio'),
    href: `${rootPath}/san-antonio-kwex`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('sacramento'),
    href: `${rootPath}/sacramento-kuvs`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('orlando'),
    href: `${rootPath}/orlando-wven`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('tampa'),
    href: `${rootPath}/tampa-wvea`,
    site,
    target,
  },
  {
    name: LocalizationManager.get('washington'),
    href: `${rootPath}/washington-dc-wfdc`,
    site,
    target,
  },
];

export default {
  children,
  href: rootPath,
  name: LocalizationManager.get('yourCity'),
  site,
  target,
  theme: {
    primary: LIGHT_BLUE,
  },
  crawlable: true,
};
