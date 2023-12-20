import { toRelativeUrl } from '../../../helpers';
import { getBrandable } from '../../helpers';
import { isPartOfDestino2024 } from '../locales/localesNavHelpers';
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
  const defaultNav = genericNavData(data);
  const brandable = getBrandable(data);

  if (isPartOfDestino2024(data.uri)) {
    return {
      ...defaultNav,
      title: {
        link: brandable.uri,
        logo: 'https://st1.uvnimg.com/2f/db/d7d5845c4e6f9d89971e636d1363/destino-2024-wide-199x31px.svg',
        name: null,
        target: '_self',
        maxWidth: '300px',
        maxHeight: '48px',
      },
    };
  }

  const uri = data?.uri ?? '/';
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
