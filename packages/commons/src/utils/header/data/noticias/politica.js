import genericNavData from '../genericNavData';

// Politica
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: 'Política',
    link: '/noticias/politica',
  };

  return {
    ...defaultNav,
    title,
  };
};
