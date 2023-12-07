import genericNavData from '../genericNavData';
import * as subNavTypes from '../../../../constants/subNavTypes';

// Second Chances
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    logo: 'https://st1.uvnimg.com/91/13/5243a7fd4a1d9bc1643643814863/logo-so-ing.svg',
  };
  return {
    ...defaultNav,
    subNavType: subNavTypes.SECTION_SUBNAV,
    title,
  };
};
