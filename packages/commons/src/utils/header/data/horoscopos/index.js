import genericNavData from '../genericNavData';
import links from './links/home';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    link: '/horoscopos',
    name: 'Horóscopos',
  };

  return {
    ...defaultNav,
    links,
    title,
  };
};
