import logo from '@univision/fe-commons/dist/assets/images/logo-univision-white-tulip-color.svg';
import { getTudnTheme } from '@univision/fe-commons/dist/utils/themes/themes';
import Store from '@univision/fe-commons/dist/store/store';
import { getTheme, getBrandable, getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import { getFirstMatch } from '@univision/fe-commons/dist/utils/helpers';
import { getTagHierarchyNames } from '@univision/fe-commons/dist/utils/helpers/taxonomy/helpers';
import { HORIZONTAL_SLIDESHOW } from '@univision/fe-commons/dist/constants/slideshowTypes';
import { getSubNavBackgroundByType, getSubNavBackgrounds } from './subNavBackgrounds';
import { getContentSubNavBackgroundByType, getContentSubNavBackgrounds } from './contentSubNavBackgrounds';

/**
 * Function for setting custom props to the show
 * @returns {Object} the config object
 */
const getCustomData = () => {
  let theme = {};
  if (getTheme(Store).theme === 'sports') {
    theme = getTudnTheme();
  }
  return ({
    logoDesktop: logo,
    logoMobile: logo,
    theme,
  });
};

/**
 * Programas section nav config
 * @param {Object} data api data
 * @returns {Object} the config object
 */
export default (data) => {
  const {
    hierarchy,
    slideshowType,
    type,
    uri,
    show,
  } = data || {};
  const device = getDevice(Store);
  const headerImage = show?.headerImages[device]?.renditions?.original?.href;
  const contentImage = show?.contentImages[device]?.renditions?.original?.href;
  const brandable = getBrandable(Store);
  const isSection = type === 'section';
  const subNavBackgrounds = isSection
    ? getSubNavBackgrounds(headerImage)
    : getContentSubNavBackgrounds(contentImage);
  const subNavKeys = Object.keys(subNavBackgrounds);
  const subNavType = getFirstMatch(getTagHierarchyNames(hierarchy), subNavKeys);
  const typeOrUri = subNavType || uri;
  // @TODO: This content types like:
  // 'horizontalslideshow', 'slideshow', 'article', etc should go on a constants file.
  const showLinks = slideshowType !== HORIZONTAL_SLIDESHOW;
  const subNavBackground = (
    isSection
      ? getSubNavBackgroundByType(typeOrUri, headerImage)
      : getContentSubNavBackgroundByType(typeOrUri, contentImage)
  );

  return {
    globalHeader: true,
    links: {
      primary: [
        {
          name: 'Episodios completos',
          link: `${uri}/episodios-completos`,
        },
        {
          name: 'Entrevistas',
          link: `${uri}/entrevistas`,
        },
        {
          name: 'Artistas y Política',
          link: '/noticias/artistas-y-politica',
        },
      ],
    },
    logoUrl: '/',
    sectionUrl: brandable.uri || uri,
    sectionTitle: brandable.shortTitle || '',
    showLinks,
    subNavBackground,
    title: null,
    variant: 'dark',
    ...getCustomData(),
  };
};
