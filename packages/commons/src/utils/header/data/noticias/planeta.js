import genericNavData from '../genericNavData';
import links from './links/planeta';

// Planeta nav
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: 'Planeta',
    logo: null,
    link: '/noticias/medio-ambiente',
  };

  return {
    ...defaultNav,
    links,
    title,
  };
};
