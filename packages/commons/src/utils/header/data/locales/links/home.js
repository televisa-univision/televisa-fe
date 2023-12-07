import sortArrayByObjectKey from '@univision/fe-utilities/helpers/array/sortArrayByObjectKey';

import { hasKey, getKey, isValidArray } from '../../../../helpers';
import { ELECTIONS_2020_NATIONAL_HOME_PAGE } from '../../noticias/elecciones2020';
import jobMarkets from './jobLinks';
import askExpertsMarkets from './askExpertsLinks';
import resultadosLinks from './resultadosLinks';

const basePaths = {
  arizona: '/local/arizona-ktvw',
  atlanta: '/local/atlanta-wuvg',
  austin: '/local/austin-kakw',
  bakersfield: '/local/bakersfield-kabe',
  chicago: '/local/chicago-wgbo',
  dallas: '/local/dallas-kuvn',
  fresno: '/local/fresno-kftv',
  houston: '/local/houston-kxln',
  losAngeles: '/local/los-angeles-kmex',
  miami: '/local/miami-wltv',
  northCarolina: '/local/north-carolina-wuvc',
  nuevaYork: '/local/nueva-york-wxtv',
  philadelphia: '/local/philadelphia-wuvp',
  puertoRico: '/local/puerto-rico-wlii',
  sacramento: '/local/sacramento-kuvs',
  sanAntonio: '/local/san-antonio-kwex',
  sanFrancisco: '/local/san-francisco-kdtv',
  saltLakeCity: '/local/salt-lake-city-kuth',
  tampa: '/local/tampa-wvea',
  washington: '/local/washington-dc-wfdc',
  orlando: '/local/orlando-wven',
};
export const quienesSomosPaths = {
  '/local/arizona-ktvw': 'somos-univision-arizona',
  '/local/atlanta-wuvg': 'somos-univision-34-atlanta',
  '/local/austin-kakw': 'somos-univision62',
  '/local/bakersfield-kabe': 'somos-univision-bakersfield',
  '/local/chicago-wgbo': 'quienes-somos-univision-chicago',
  '/local/dallas-kuvn': 'somos-univision-23-dallas',
  '/local/fresno-kftv': 'somos-univision-fresno',
  '/local/houston-kxln': 'somos-univision-45-houston',
  '/local/los-angeles-kmex': 'los-angeles/kmex/somos-univision-34-los-angeles',
  '/local/miami-wltv': 'somos-univision-23-miami',
  '/local/north-carolina-wuvc': 'somos-univision-40-north-carolina',
  '/local/nueva-york-wxtv': 'quienes-somos-univision-41-nueva-york',
  '/local/philadelphia-wuvp': 'philadelphia/wuvp/nosotros-somos-univision-65-philadelphia',
  '/local/puerto-rico-wlii': 'quienes-somos',
  '/local/sacramento-kuvs': 'somos-univision-19',
  '/local/san-antonio-kwex': 'quienes-somos-en-univision-san-antonio',
  '/local/san-francisco-kdtv': 'somos-univision-14',
  '/local/salt-lake-city-kuth': 'quienes-somos',
  '/local/tampa-wvea': 'contactenos-en-univision-tampa-bay',
  '/local/washington-dc-wfdc': 'contactenos-en-univision-washington-dc',
  '/local/orlando-wven': 'contactenos-en-univision-orlando',
};
export const ELECTIONS_2020_HOME = '/elecciones-estados-unidos-2020';
export const ELECTIONS_2022_HOME = '/elecciones-en-eeuu-2022';
export const ELECTIONS_2020_LOGO = 'https://st1.uvnimg.com/e9/26/e648eea94e17aabbda49c210e456/destino2020-logo.svg';
export const LOCALES_JOBS_HOME = '/ofertas-de-trabajo-en-';
export const ASK_THE_EXPERTS_HOME = '/pregunta-al-experto';
export const CORONOVIRUS_HOME = '/coronavirus';
export const CORONAVIRUS_LOGO = 'https://st1.uvnimg.com/09/4c/853e49fc4a46ae30d9ae8717a70b/lg-coronavirus.svg';
const FINANZAS = '/cada-dolar-cuenta-finanzas-personales';

/**
 * Each market can have an optional custom link, this link will
 * be added at the first or last position of the menu:
 * (customLinks.{marketURL}.firstLink) | (customLinks.{marketURL}.lastLink)
 */
const customLinks = {
  [basePaths.chicago]: {
    lastLink: {
      name: '#SomosOrgullo',
      link: `${basePaths.chicago}/somos-orgullo`,
      position: 4,
    },
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.chicago}${FINANZAS}`,
      },
      {
        name: 'Localísimo',
        link: `${basePaths.chicago}/localisimo`,
      },
      {
        name: '#SomosOrgullo',
        link: `${basePaths.chicago}/somos-orgullo`,
      },
      {
        name: 'Video',
        link: `${basePaths.chicago}/videos`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.chicago}/reportalo`,
      },
    ],
  },
  [basePaths.nuevaYork]: {
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.nuevaYork}/cada-dolar-cuenta-nueva-york`,
      },
      {
        name: 'Localísimo',
        link: `${basePaths.nuevaYork}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.nuevaYork}/reportalo`,
      },
    ],
  },
  [basePaths.sacramento]: {
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.sacramento}${FINANZAS}`,
      },
      {
        name: 'Localísimo',
        link: `${basePaths.sacramento}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.sacramento}/reportalo`,
      },
    ],
  },
  [basePaths.atlanta]: {
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.atlanta}${FINANZAS}`,
      },
      {
        name: 'Localísimo',
        link: `${basePaths.atlanta}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.atlanta}/reportalo`,
      },
    ],
  },
  [basePaths.austin]: {
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.austin}/cada-dolar-cuenta-austin`,
      },
      {
        name: 'Localísimo',
        link: `${basePaths.austin}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.austin}/reportalo`,
      },
    ],
  },
  [basePaths.bakersfield]: {
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.bakersfield}${FINANZAS}`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.bakersfield}/reportalo`,
      },
    ],
  },
  [basePaths.fresno]: {
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.fresno}${FINANZAS}`,
      },
      {
        name: 'Localísimo',
        link: `${basePaths.fresno}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.fresno}/reportalo`,
      },
    ],
  },
  [basePaths.sanFrancisco]: {
    masLink: [
      {
        name: 'Localísimo',
        link: `${basePaths.sanFrancisco}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.sanFrancisco}/reportalo`,
      },
    ],
  },
  [basePaths.losAngeles]: {
    masLink: [
      {
        name: 'Ayuda legal',
        link: 'https://embed.livecloudhost.com/ayudalegal/',
      },
      {
        name: 'Finanzas',
        link: `${basePaths.losAngeles}/cada-dolar-cuenta-los-angeles`,
      },
      {
        name: 'Anúnciate',
        link: 'https://univision.wyng.com/6024c303de99cf05bd84e1ce',
        target: '_blank',
      },
      {
        name: 'Localísimo',
        link: `${basePaths.losAngeles}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.losAngeles}/reportalo`,
      },
    ],
  },
  [basePaths.philadelphia]: {
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.philadelphia}${FINANZAS}`,
      },
      {
        name: 'Localísimo',
        link: `${basePaths.philadelphia}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.philadelphia}/reportalo`,
      },
    ],
  },
  [basePaths.puertoRico]: {
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.puertoRico}${FINANZAS}`,
      },
      {
        name: 'Localísimo',
        link: `${basePaths.puertoRico}/localisimo`,
      },
    ],
    removeLinks: [
      `${basePaths.puertoRico}/trabajos`,
      `${basePaths.puertoRico}/quienes-somos`,
      `${basePaths.puertoRico}/contigo`,
    ],
  },
  [basePaths.sanAntonio]: {
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.sanAntonio}${FINANZAS}`,
      },
      {
        name: 'Localísimo',
        link: `${basePaths.sanAntonio}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.sanAntonio}/reportalo`,
      },
    ],
  },
  [basePaths.houston]: {
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.houston}${FINANZAS}`,
      },
      {
        name: 'Localísimo',
        link: `${basePaths.houston}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.houston}/reportalo`,
      },
    ],
  },
  [basePaths.dallas]: {
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.dallas}/cada-dolar-cuenta-dallas`,
      },
      {
        name: 'Localísimo',
        link: `${basePaths.dallas}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.dallas}/reportalo`,
      },
    ],
  },
  [basePaths.northCarolina]: {
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.northCarolina}${FINANZAS}`,
      },
      {
        name: 'Localísimo',
        link: `${basePaths.northCarolina}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.northCarolina}/reportalo`,
      },
    ],
  },
  [basePaths.miami]: {
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.miami}${FINANZAS}`,
      },
      {
        name: 'Localísimo',
        link: `${basePaths.miami}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.miami}/reportalo`,
      },
    ],
  },
  [basePaths.arizona]: {
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.arizona}${FINANZAS}`,
      },
      {
        name: 'Localísimo',
        link: `${basePaths.arizona}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.arizona}/reportalo`,
      },
    ],
  },
  [basePaths.saltLakeCity]: {
    masLink: [
      {
        name: 'Finanzas',
        link: `${basePaths.saltLakeCity}${FINANZAS}`,
      },
    ],
    removeLinks: [
      `${basePaths.saltLakeCity}/loteria`,
      `${basePaths.saltLakeCity}/videos`,
      `${basePaths.saltLakeCity}/quienes-somos`,
    ],
  },
  [basePaths.tampa]: {
    masLink: [
      {
        name: 'Localísimo',
        link: `${basePaths.tampa}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.tampa}/reportalo`,
      },
    ],
    removeLinks: [
      `${basePaths.tampa}${ELECTIONS_2020_HOME}`,
      `${basePaths.tampa}/contigo`,
    ],
  },
  [basePaths.washington]: {
    masLink: [
      {
        name: 'Localísimo',
        link: `${basePaths.washington}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.washington}/reportalo`,
      },
    ],
    removeLinks: [
      `${basePaths.washington}${ELECTIONS_2020_HOME}`,
    ],
  },
  [basePaths.orlando]: {
    masLink: [
      {
        name: 'Localísimo',
        link: `${basePaths.orlando}/localisimo`,
      },
      {
        name: 'Repórtalo',
        link: `${basePaths.orlando}/reportalo`,
      },
    ],
    removeLinks: [
      `${basePaths.orlando}${ELECTIONS_2020_HOME}`,
      `${basePaths.orlando}/contigo`,
    ],
  },
};

const politicLinks = {
  kakw: '/politica-austin',
  wgbo: '/politica-chicago',
  kuvn: '/politica-dallas',
  kxln: '/politica-houston',
  kmex: '/politica-los-angeles',
  wltv: '/politica-miami',
  wxtv: '/politica-new-york',
  kuvs: '/politica-sacramento',
  kwex: '/politica-san-antonio',
  kabe: '/politica-bakersfield',
  kftv: '/politica-fresno',
  wuvc: '/politica-north-carolina',
  ktvw: '/politica-arizona',
  wuvp: '/politica-philadelphia',
  wlii: '/politica-puerto-rico',
  wuvg: '/politica-atlanta',
  kdtv: '/politica-area-de-la-bahia',
  kuth: '/politica-salt-lake-city',
  wfdc: '/politica-washington-dc',
  wvea: '/politica-tampa',
  wven: '/politica-orlando',
};

/**
 * Send back the list of links for current local
 * @param {Object} brandable Brandable object
 * @returns {Array}
 */
export default function localLinks({
  uri,
  isElections = false,
  isLocalesJob = false,
  isAskExperts = false,
  isCoronavirusNav = false,
  localMarket,
  jobsHomepage,
  isMarketActiveForJobs,
  isMarketActiveForATE,
  askExpertsHomepage,
  station,
}) {
  if (isLocalesJob) {
    const localMarketJobs = getKey(jobMarkets, `${localMarket}.options`);

    if (isValidArray(localMarketJobs)) {
      return localMarketJobs.map(market => ({
        name: getKey(market, 'name'),
        link: `${uri}${getKey(market, 'link')}`,
      }));
    }
  }

  if (isAskExperts) {
    const localAskExperts = getKey(askExpertsMarkets, `${localMarket}.options`);

    if (isValidArray(localAskExperts)) {
      return localAskExperts.map(market => ({
        name: getKey(market, 'name'),
        link: `${uri}${getKey(market, 'link')}`,
      }));
    }
  }

  // Custom links for Elections 2020
  const electionsLinks = [
    {
      name: 'Inicio',
      link: `${uri}${ELECTIONS_2020_HOME}`,
    },
    {
      name: 'Encuestas',
      link: `${ELECTIONS_2020_NATIONAL_HOME_PAGE}/encuestas`,
    },
    {
      name: 'Resultados',
      link: `${uri}${ELECTIONS_2020_HOME}/resultados-primarias-en-${getKey(resultadosLinks, station)}`,
    },
    {
      name: 'Nacionales',
      link: ELECTIONS_2020_NATIONAL_HOME_PAGE,
    },
    {
      name: 'Vota Conmigo',
      link: `${uri}/noticias/politica/votaconmigo`,
    },
  ];

  // Custom links for Coronavirus Nav
  const coronavirusNavLinks = [
    {
      name: 'Noticias',
      link: `${uri}${CORONOVIRUS_HOME}`,
    },
    {
      name: 'Mapa',
      link: `${uri}${CORONOVIRUS_HOME}/mapa-coronavirus`,
    },
    {
      name: 'Recursos',
      link: `${uri}${CORONOVIRUS_HOME}/recursos`,
    },
    {
      name: 'Cierres',
      link: `${uri}${CORONOVIRUS_HOME}/cierres`,
    },
    {
      name: 'Fotos',
      link: `${uri}${CORONOVIRUS_HOME}/fotos`,
    },
  ];

  if (isElections) {
    return electionsLinks;
  }

  if (isCoronavirusNav) {
    return coronavirusNavLinks;
  }

  const politicLink = politicLinks[localMarket?.toLowerCase()] || ELECTIONS_2020_HOME;

  let links = [
    {
      name: 'Inicio',
      link: `${uri}`,
    },
    {
      name: 'Video',
      link: `${uri}/videos`,
    },
    {
      name: 'Tiempo',
      link: `${uri}/tiempo`,
    },
    {
      name: 'Política',
      link: `${uri}${politicLink}`,
    },
    {
      name: 'Trabajos',
      link: `${uri}/trabajos`,
    },
    {
      name: 'Lotería',
      link: `${uri}/loteria`,
    },
    {
      name: 'Contigo',
      link: `${uri}/contigo`,
    },
    {
      name: 'Repórtalo',
      link: `${uri}/reportalo`,
    },
  ];

  // Last link (custom)
  if (hasKey(customLinks[uri], 'lastLink')) {
    links.push(customLinks[uri].lastLink);
  }

  if (isMarketActiveForJobs && isMarketActiveForATE) {
    links.push({
      name: 'Más',
      dropDownOptions: [
        {
          name: 'Quiénes Somos',
          link: `${uri}/quienes-somos`,
        },
        {
          name: 'Ofertas de trabajo',
          link: `${uri}${jobsHomepage}`,
        },
        {
          name: 'Pregunta al experto',
          link: `${uri}${askExpertsHomepage}`,
        },
      ],
    });
  } else if (isMarketActiveForJobs && !isMarketActiveForATE) {
    links.push({
      name: 'Ofertas de trabajo',
      link: `${uri}${jobsHomepage}`,
    });
  } else if (!isMarketActiveForJobs && isMarketActiveForATE) {
    links.push({
      name: 'Pregunta al experto',
      link: `${uri}${askExpertsHomepage}`,
    });
  } else {
    const masLinks = getKey(customLinks[uri], 'masLink', []);
    links = links.filter(
      link => masLinks.filter(maslink => maslink.link === link.link).length === 0,
    );
    // sort links alphabetically
    const dropDownOptions = sortArrayByObjectKey([...masLinks, {
      name: 'Quiénes Somos',
      link: `${uri}/${quienesSomosPaths[uri]}`,
    }], 'name');
    links.push({
      name: 'Más',
      dropDownOptions,
    });
  }

  // Removing links
  if (hasKey(customLinks[uri], 'removeLinks')) {
    links = links.filter(
      (link) => {
        if (hasKey(link, 'dropDownOptions')) {
          // eslint-disable-next-line no-param-reassign
          link.dropDownOptions = link.dropDownOptions
            .filter(option => customLinks[uri].removeLinks
              .filter(removeLink => removeLink === option.link).length === 0);
          return link.dropDownOptions.length !== 0;
        }
        return customLinks[uri].removeLinks
          .filter(removeLink => removeLink === link.link).length === 0;
      },
    );
  }

  return links;
}
