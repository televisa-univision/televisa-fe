import genericNavData from '../genericNavData';
import links from './links/gangasAndDeals';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    link: '/estilo-de-vida/gangas-and-deals',
    name: 'Gangas and Deals',
  };

  return {
    ...defaultNav,
    links,
    title,
  };
};
