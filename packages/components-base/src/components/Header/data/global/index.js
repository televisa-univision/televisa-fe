import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import univision from './sections/univision';
import famosos from './sections/famosos';
import entretenimiento from './sections/entretenimiento';
import deportes from './sections/deportes';
import noticias from './sections/noticias';
import extras from './sections/extras';

/**
 * which pageCategories the Global BrandedHeader component should be rendered on
 * {@link https://sites.google.com/fusion.net/univision-design-framework/components/navigation/header-nav-v1?authuser=0#h.p_sO5XIBw4PK5-}
 * @type {Array}
 */
export const categories = [
  pageCategories.FAMOSOS,
  pageCategories.ENTERTAINMENT,
  pageCategories.NEWS,
  pageCategories.SPORTS,
  pageCategories.UNIVISION,
];

/**
 * exports sections for global nav
 * @param {string} profile currently applied for sports
 * @returns {Array}
 */
export const sections = (profile) => {
  return [{
    name: 'univision',
    sections: [...univision],
  }, {
    name: 'entretenimiento',
    sections: [...entretenimiento],
  }, {
    name: 'famosos',
    sections: [...famosos],
  }, {
    name: 'noticias',
    sections: [...noticias],
  }, {
    name: 'deportes',
    sections: [...deportes(profile)],
  }, {
    name: 'extras',
    sections: [...extras],
  }];
};
