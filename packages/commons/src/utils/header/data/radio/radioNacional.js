import genericNavData from '../genericNavData';
import * as subNavTypes from '../../../../constants/subNavTypes';

// Radio Nacional
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: '/radio/radio-nacional',
    logo: 'https://st1.uvnimg.com/2f/d0/590ba2f04468a5d62c47898c86e3/uforia-logo-radionacional-32pxalto-1x.svg',
  };
  return {
    ...defaultNav,
    subNavType: subNavTypes.SECTION_SUBNAV,
    title,
  };
};
