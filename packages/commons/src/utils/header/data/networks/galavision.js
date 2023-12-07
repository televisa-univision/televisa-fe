import genericNavData from '../genericNavData';
import links from './links/galavision';

// Galavision
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: '/galavision',
    logo: 'https://st1.uvnimg.com/4d/51/30f8e82549a5bcad737f67ad64c9/galavision-logo.png',
  };
  return {
    ...defaultNav,
    title,
    links,
  };
};
