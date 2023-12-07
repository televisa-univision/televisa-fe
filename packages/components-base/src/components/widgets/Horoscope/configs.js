import mono from '@univision/fe-commons/dist/assets/icons/horoscopos/chino/mono.svg';
import gallo from '@univision/fe-commons/dist/assets/icons/horoscopos/chino/gallo.svg';
import perro from '@univision/fe-commons/dist/assets/icons/horoscopos/chino/perro.svg';
import buey from '@univision/fe-commons/dist/assets/icons/horoscopos/chino/buey.svg';
import jabali from '@univision/fe-commons/dist/assets/icons/horoscopos/chino/jabali.svg';
import rata from '@univision/fe-commons/dist/assets/icons/horoscopos/chino/rata.svg';
import tigre from '@univision/fe-commons/dist/assets/icons/horoscopos/chino/tigre.svg';
import conejo from '@univision/fe-commons/dist/assets/icons/horoscopos/chino/conejo.svg';
import dragon from '@univision/fe-commons/dist/assets/icons/horoscopos/chino/dragon.svg';
import serpiente from '@univision/fe-commons/dist/assets/icons/horoscopos/chino/serpiente.svg';
import caballo from '@univision/fe-commons/dist/assets/icons/horoscopos/chino/caballo.svg';
import cabra from '@univision/fe-commons/dist/assets/icons/horoscopos/chino/cabra.svg';

const animals = [
  {
    name: 'Rata',
    path: '/entretenimiento/horoscopo-chino/rata-del-horoscopo-chino',
    icon: rata,
  }, {
    name: 'Buey',
    path: '/entretenimiento/horoscopo-chino/buey-del-horoscopo-chino',
    icon: buey,
  }, {
    name: 'Tigre',
    path: '/entretenimiento/horoscopo-chino/tigre-del-horoscopo-chino',
    icon: tigre,
  }, {
    name: 'Liebre',
    path: '/entretenimiento/horoscopo-chino/liebre-del-horoscopo-chino',
    icon: conejo,
  }, {
    name: 'Dragón',
    path: '/entretenimiento/horoscopo-chino/dragon-del-horoscopo-chino',
    icon: dragon,
  }, {
    name: 'Serpiente',
    path: '/entretenimiento/horoscopo-chino/serpiente-del-horoscopo-chino',
    icon: serpiente,
  }, {
    name: 'Caballo',
    path: '/entretenimiento/horoscopo-chino/caballo-del-horoscopo-chino',
    icon: caballo,
  }, {
    name: 'Cabra',
    path: '/entretenimiento/horoscopo-chino/cabra-del-horoscopo-chino',
    icon: cabra,
  }, {
    name: 'Mono',
    path: '/entretenimiento/horoscopo-chino/mono-del-horoscopo-chino',
    icon: mono,
  }, {
    name: 'Gallo',
    path: '/entretenimiento/horoscopo-chino/gallo-del-horoscopo-chino',
    icon: gallo,
  }, {
    name: 'Perro',
    path: '/entretenimiento/horoscopo-chino/perro-del-horoscopo-chino',
    icon: perro,
  }, {
    name: 'Jabalí',
    path: '/entretenimiento/horoscopo-chino/jabali-del-horoscopo-chino',
    icon: jabali,
  },
];

const settings = {
  title: 'Horóscopo Chino',
  description: 'El horóscopo chino tiene una tradición de 5000 años y se basa en los años lunares. Cada año se bautiza a las personas con el nombre de un animal.',
};

export default {
  settings,
  animals,
};
