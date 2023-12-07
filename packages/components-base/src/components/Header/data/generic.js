import logoDesktop from '@univision/fe-commons/dist/assets/images/logo-univision-color.svg';
import logoMobile from '@univision/fe-commons/dist/assets/images/tulip-color.svg';
import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import genericLinks from './genericLinks';
// eslint-disable-next-line import/no-cycle
import { getSectionTitle } from './helpers';

export default (data = {}) => {
  const sectionTitle = getSectionTitle(data);
  return {
    theme: themes.darkGrey,
    globalHeader: true,
    logoDesktop,
    logoMobile,
    sectionTitle,
    variant: 'light',
    baseUrl: '/',
    links: genericLinks,
  };
};
