import genericNavData from '../genericNavData';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: '/politica/destino-2024',
    logo: 'https://st1.uvnimg.com/2f/db/d7d5845c4e6f9d89971e636d1363/destino-2024-wide-199x31px.svg',
    maxWidth: '300px',
    maxHeight: '48px',
  };

  return {
    ...defaultNav,
    title,
    links: [
      {
        name: 'Encuestas',
        link: '/especiales/noticias/infografias/2023/encuestas-primaria-republicanas-2024/',
      },
      {
        name: 'Candidatos',
        dropDownOptions: [
          {
            name: 'Joe Biden',
            link: '/temas/joe-biden',
          },
          {
            name: 'Donald Trump',
            link: '/temas/donald-trump',
          },
        ],
      },
      {
        name: 'El Detector',
        link: 'https://www.univision.com/especiales/noticias/detector/',
        target: '_blank',
      },
      {
        name: 'Política',
        link: '/noticias/politica',
      },
    ],
  };
};
