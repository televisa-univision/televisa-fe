import genericNavData from '../genericNavData';
import links from './links/home';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    link: defaultNav.title.link,
    name: defaultNav.title.name,
  };

  return {
    ...defaultNav,
    links,
    title,
  };
};
