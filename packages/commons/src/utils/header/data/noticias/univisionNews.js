import genericNavData from '../genericNavData';
import links from './links/news';

const logo = 'https://st1.uvnimg.com/d1/f5/eee5bec74604a074b7e093ba8101/logo-news-english-exposed-nav.svg';

// Noticias en ingles nav
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    logo,
    link: '/univision-news',
    name: null,
    target: '_self',
  };

  return {
    ...defaultNav,
    links,
    title,
  };
};
