import genericNavData from '../genericNavData';
import links from './links/unimas';

// Unimas
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: '/unimas',
    logo: 'https://st1.uvnimg.com/f0/af/98382f8a420a8b369bb4e7e1ff11/umas-1-spot-wht.png',
  };
  return {
    ...defaultNav,
    title,
    links,
  };
};
