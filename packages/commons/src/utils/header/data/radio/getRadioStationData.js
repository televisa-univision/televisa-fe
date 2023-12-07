import { hasKey } from '../../../helpers';
import localization from '../../../localization/LocalizationManager';

const LOTTERY = {
  'WADO-AM': 'https://www.univision.com/radio/nueva-york-wado-am/loteria-ny',
  'WXNY-FM': 'https://www.univision.com/radio/nueva-york-wxny-fm/loteria-ny',
  'WQBU-FM': 'https://www.univision.com/radio/nueva-york-wqbu-fm/loteria-ny',
};
/**
 * Build links for brandable.
 * @param {Object} brandable - radio station data
 * @returns {Array}
 */
const buildLinks = (brandable) => {
  const links = [];

  if (hasKey(brandable, 'data.contact.aboutStation')) {
    links.push({
      name: localization.get('contactUs'),
      link: brandable.data.contact.aboutStation,
    });
  }

  const radioStationLink = LOTTERY[brandable?.pageData?.radioStation?.call];

  if (radioStationLink) {
    links.push({
      name: localization.get('lottery'),
      link: radioStationLink,
    });
  }

  return links;
};

// Extractor to get data from a radio station brandable for header configuration
export default (brandable, defaultNav) => {
  const {
    headerLogo,
  } = brandable;

  const links = buildLinks(brandable);

  return {
    ...defaultNav,
    links,
    title: {
      ...defaultNav.title,
      name: null,
      logo: headerLogo,
    },
  };
};
