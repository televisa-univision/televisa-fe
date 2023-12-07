import genericNavData from '../genericNavData';
import links from './links/estiloDeVida';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: defaultNav.title?.name || 'Estilo de Vida',
    logo: null,
    link: '/estilo-de-vida',
  };

  return {
    ...defaultNav,
    title,
    links,
  };
};
