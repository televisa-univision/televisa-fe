import genericNavData from '../genericNavData';

// URL home page.
export const ELECTIONS_2020_NATIONAL_HOME_PAGE = '/noticias/elecciones-en-eeuu-2020';
export const ELECTIONS_2020_LOCALES_HOME = '/elecciones-estados-unidos-2020';
// Elecciones 2020
export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    link: ELECTIONS_2020_NATIONAL_HOME_PAGE,
    logo: 'https://st1.uvnimg.com/e9/26/e648eea94e17aabbda49c210e456/destino2020-logo.svg',
  };
  return {
    ...defaultNav,
    title,
    links: [
      {
        name: 'Inicio',
        link: ELECTIONS_2020_NATIONAL_HOME_PAGE,
      },
      {
        name: 'Candidatos',
        link: `${ELECTIONS_2020_NATIONAL_HOME_PAGE}/candidatos`,
      },
      {
        name: 'Encuestas',
        link: `${ELECTIONS_2020_NATIONAL_HOME_PAGE}/encuestas`,
      },
      {
        name: 'Resultados',
        link: `${ELECTIONS_2020_NATIONAL_HOME_PAGE}/resultados-de-los-caucus-y-primarias-en-estados-unidos`,
      },
      {
        name: 'Vota Conmigo',
        link: '/votaconmigo',
      },
      {
        name: 'Mi Ciudad',
        dropDownOptions: [
          {
            name: 'Arizona',
            link: `/local/arizona-ktvw${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'Atlanta',
            link: `/local/atlanta-wuvg${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'Austin',
            link: `/local/austin-kakw${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'Bakersfield',
            link: `/local/bakersfield-kabe${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'Chicago',
            link: `/local/chicago-wgbo${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'Dallas',
            link: `/local/dallas-kuvn${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'Fresno',
            link: `/local/fresno-kftv${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'Houston',
            link: `/local/houston-kxln${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'Los Angeles',
            link: `/local/los-angeles-kmex${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'Miami',
            link: `/local/miami-wltv${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'North Carolina',
            link: `/local/north-carolina-wuvc${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'Nueva York',
            link: `/local/nueva-york-wxtv${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'Philadelphia',
            link: `/local/philadelphia-wuvp${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'Puerto Rico',
            link: `/local/puerto-rico-wlii${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'San Antonio',
            link: `/local/san-antonio-kwex${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'San Francisco',
            link: `/local/san-francisco-kdtv${ELECTIONS_2020_LOCALES_HOME}`,
          },
          {
            name: 'Sacramento',
            link: `/local/sacramento-kuvs${ELECTIONS_2020_LOCALES_HOME}`,
          },
        ],
      },
    ],
  };
};
