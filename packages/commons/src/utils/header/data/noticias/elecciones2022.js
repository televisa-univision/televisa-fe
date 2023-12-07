import genericNavData from '../genericNavData';

export const ELECTIONS_2022_NATIONAL_HOME_PAGE = '/noticias/politica/elecciones-en-eeuu-2022';
// Politica
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: ELECTIONS_2022_NATIONAL_HOME_PAGE,
    logo: 'https://st1.uvnimg.com/5d/7c/0f3b6cbc4286a0334d4a32d5e30f/destino-2022.png',
  };

  return {
    ...defaultNav,
    title,
    links: [
      {
        name: 'El Detector Política',
        link: 'https://www.univision.com/especiales/noticias/detector/politica.html',
        target: '_blank',
      },
      {
        name: 'Encuestas',
        link: '/encuestas2022',
      },
      {
        name: 'Vota Conmigo',
        link: '/noticias/especiales/contigo',
      },
      {
        name: 'Resultados',
        link: '/noticias/politica/elecciones-en-eeuu-2022/resultados-elecciones-estados-unidos-2022',
      },
      {
        name: 'Ciudad',
        dropDownOptions: [
          {
            name: 'Área de la Bahía',
            link: '/local/san-francisco-kdtv/politica-area-de-la-bahia',
          },
          {
            name: 'Arizona',
            link: '/local/arizona-ktvw/politica-arizona',
          },
          {
            name: 'Atlanta',
            link: '/local/atlanta-wuvg/politica-atlanta',
          },
          {
            name: 'Austin',
            link: '/local/austin-kakw/politica-austin',
          },
          {
            name: 'Bakersfield',
            link: '/local/bakersfield-kabe/politica-bakersfield',
          },
          {
            name: 'Chicago',
            link: '/local/chicago-wgbo/politica-chicago',
          },
          {
            name: 'Dallas Fort-Worth',
            link: '/local/dallas-kuvn/politica-dallas',
          },
          {
            name: 'Filadelfia',
            link: '/local/philadelphia-wuvp/politica-philadelphia',
          },
          {
            name: 'Fresno',
            link: '/local/fresno-kftv/politica-fresno',
          },
          {
            name: 'Houston',
            link: '/local/houston-kxln/politica-houston',
          },
          {
            name: 'Los Ángeles',
            link: '/local/los-angeles-kmex/politica-los-angeles',
          },
          {
            name: 'Miami',
            link: '/local/miami-wltv/politica-miami',
          },
          {
            name: 'Nueva York',
            link: '/local/nueva-york-wxtv/politica-new-york',
          },
          {
            name: 'Orlando',
            link: '/local/orlando-wven/politica-orlando',
          },
          {
            name: 'Puerto Rico',
            link: '/local/puerto-rico-wlii/politica-puerto-rico',
          },
          {
            name: 'Tampa Bay',
            link: '/local/tampa-wvea/politica-tampa',
          },
          {
            name: 'Raleigh',
            link: '/local/north-carolina-wuvc/politica-north-carolina',
          },
          {
            name: 'Sacramento',
            link: '/local/sacramento-kuvs/politica-sacramento',
          },
          {
            name: 'Salt Lake City',
            link: '/local/salt-lake-city-kuth/politica-salt-lake-city',
          },
          {
            name: 'San Antonio',
            link: '/local/san-antonio-kwex/politica-san-antonio',
          },
          {
            name: 'Washington D.C.',
            link: '/local/washington-dc-wfdc/politica-washington-dc',
          },
        ],
      },
    ],
  };
};
