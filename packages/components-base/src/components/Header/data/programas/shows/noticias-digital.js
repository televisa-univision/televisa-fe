import logoDesktop from '@univision/fe-commons/dist/assets/images/logo-noticias-white.svg';
import logoMobile from '@univision/fe-commons/dist/assets/images/tulip-white.svg';
import logoDesktopColor from '@univision/fe-commons/dist/assets/images/logo-noticias-color.svg';
import logoMobileColor from '@univision/fe-commons/dist/assets/images/tulip-color.svg';
import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import shows from '.';

/**
 * Noticias Digital nav configuration
 * @param {Object} data api data
 * @returns {Object} the config object
 */
export default (data) => {
  const { type, slideshowType } = data || {};
  const showLinks = slideshowType !== 'horizontalslideshow';
  return {
    ...shows(data),
    showLinks,
    theme: type === 'video' ? themes.blue : themes.white,
    logoDesktop: type === 'video' ? logoDesktopColor : logoDesktop,
    logoMobile: type === 'video' ? logoMobileColor : logoMobile,
    sectionTitle: type === 'section' ? 'Show' : 'Edicion Digital',
    sectionUrl: type === 'section' ? '/noticias/shows' : '/noticias/univision-noticias-digital-en-vivo',
    logoUrl: '/shows',
  };
};
