import logoDesktop from '@univision/fe-commons/dist/assets/images/logo-univision-color.svg';
import logoMobile from '@univision/fe-commons/dist/assets/images/tulip-color.svg';
import genericLinks from './genericLinks';

export default () => {
  return {
    logoDesktop,
    logoMobile,
    baseUrl: '/',
    links: genericLinks,
  };
};
