import { isContentSubNav } from '../../helpers';
import genericNavData from '../genericNavData';
import links from './links/inmigracion';

const logo = 'https://st1.uvnimg.com/8e/a6/35d4a669416fb88f32eb3a3a067e/logo-noticias-exposed-nav.svg';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const isContent = isContentSubNav(defaultNav.subNavType);

  const title = {
    ...defaultNav.title,
    logo: isContent ? logo : null,
    name: isContent ? null : 'Inmigración',
  };

  return {
    ...defaultNav,
    title,
    links,
  };
};
