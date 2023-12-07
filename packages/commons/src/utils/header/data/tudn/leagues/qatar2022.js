import { logos } from '../../../../../themes/tudn';
import { TUDN_SITE } from '../../../../../constants/sites';
import genericTudnData from '../generic';

/**
 * Qatar 2022 header configuration
 * @param {Object} data - page data
 * @returns {Object}
 */
export default (data = {}) => {
  const defaultNav = genericTudnData(data);

  return {
    ...defaultNav,
    links: [{
      name: 'Calendario',
      link: '/futbol/mundial-qatar-2022/calendario-horarios',
      site: TUDN_SITE,
    }, {
      name: 'Grupos',
      link: '/futbol/mundial-qatar-2022/grupos',
      site: TUDN_SITE,
    }, {
      name: 'Equipos',
      link: '/futbol/mundial-qatar-2022/equipos',
      site: TUDN_SITE,
    }, {
      name: 'Selección México',
      link: '/futbol/mundial-qatar-2022/seleccion-mexico',
      site: TUDN_SITE,
    }, {
      name: 'Selección USA',
      link: '/futbol/mundial-qatar-2022/seleccion-estados-unidos',
      site: TUDN_SITE,
    }, {
      name: 'Sedes',
      link: '/futbol/mundial-qatar-2022/estadios-y-sedes',
      site: TUDN_SITE,
    }, {
      name: 'Más',
      site: TUDN_SITE,
      dropDownOptions: [{
        name: 'Clasificación y Sorteo',
        link: '/futbol/mundial-qatar-2022/clasificacion-sorteo',
        site: TUDN_SITE,
      }, {
        name: 'Historia De Mundiales',
        link: '/futbol/mundial-qatar-2022/historia-mundiales',
        site: TUDN_SITE,
      }],
    }],
    title: {
      logo: logos.logoQatar2022,
      name: null,
      link: '/futbol/mundial-qatar-2022',
      site: TUDN_SITE,
    },
  };
};
