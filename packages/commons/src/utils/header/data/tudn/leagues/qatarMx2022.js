import { logos } from '../../../../../themes/tudn';
import { TUDN_SITE } from '../../../../../constants/sites';
import genericTudnData from '../generic';

/**
 * Qatar 2022 MX header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericTudnData(data);

  return {
    ...defaultNav,
    links: [{
      name: 'Partidos',
      link: '/mx/futbol/mundial-qatar-2022/partidos-en-vivo',
      site: TUDN_SITE,
    }, {
      name: 'Calendario',
      link: '/mx/futbol/mundial-qatar-2022/calendario-horarios',
      site: TUDN_SITE,
    }, {
      name: 'Grupos',
      link: '/mx/futbol/mundial-qatar-2022/grupos',
      site: TUDN_SITE,
    }, {
      name: 'Equipos',
      link: '/mx/futbol/mundial-qatar-2022/equipos',
      site: TUDN_SITE,
    }, {
      name: 'Selección México',
      link: '/mx/futbol/mundial-qatar-2022/equipos/seleccion-mexico',
      site: TUDN_SITE,
    }, {
      name: 'Más',
      site: TUDN_SITE,
      dropDownOptions: [{
        name: 'Videos',
        link: '/mx/futbol/mundial-qatar-2022/videos',
        site: TUDN_SITE,
      }, {
        name: 'Resultados',
        link: '/mx/futbol/mundial-qatar-2022/resultados',
        site: TUDN_SITE,
      }, {
        name: 'Sedes',
        link: '/mx/futbol/mundial-qatar-2022/estadios-y-sedes',
        site: TUDN_SITE,
      }, {
        name: 'Clasificación y Sorteo',
        link: '/mx/futbol/mundial-qatar-2022/clasificacion-sorteo',
        site: TUDN_SITE,
      }, {
        name: 'Historia De Mundiales',
        link: '/mx/futbol/mundial-qatar-2022/historia-mundiales',
        site: TUDN_SITE,
      }],
    }],
    title: {
      logo: logos.logoMXQatar2022,
      name: null,
      link: '/mx/futbol/mundial-qatar-2022',
      site: TUDN_SITE,
    },
  };
};
