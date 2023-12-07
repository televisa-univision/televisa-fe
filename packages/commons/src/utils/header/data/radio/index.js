import { toRelativeUrl } from '../../../helpers';
import { getBrandable } from '../../helpers';

import genericNavData from '../genericNavData';
import radioLinks from './links/radio';
import getRadioStationData from './getRadioStationData';

// Known main radio sections
const radioSections = [
  '/radio',
  '/radio/podcasts',
  '/radio/eventos',
  '/musica',
];

const uforiaLogo = 'https://st1.uvnimg.com/75/8c/e912578d40d7a12842b8c8cb59e6/logo-uforia-exposed-nav.svg';

// Radio stations data file
export default (data = {}) => {
  const uri = data?.uri ?? '/';
  const defaultNav = genericNavData(data);
  const brandable = getBrandable(data);
  const relativeUri = toRelativeUrl(uri);
  const isRadioSection = radioSections.some(section => relativeUri.startsWith(section));
  const title = {
    ...defaultNav.title,
    name: isRadioSection ? null : defaultNav.title.name,
    link: isRadioSection ? '/radio' : defaultNav.title.link,
    logo: isRadioSection && uforiaLogo,
  };
  const links = isRadioSection ? radioLinks : defaultNav.links;

  // If branded radio section, then get radio station data
  if (brandable.isBranded) {
    return getRadioStationData(brandable, defaultNav);
  }

  return {
    ...defaultNav,
    links,
    title,
  };
};
