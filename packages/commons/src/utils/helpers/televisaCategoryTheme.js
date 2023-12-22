import {
  LAS_ESTRELLAS_SITE,
  TELEVISA_SITE,
  ELNU9VE_SITE,
  CANAL5_SITE,
  LOS_BINGERS_SITE,
  UNICABLE_SITE,
  LCDLF_SITE,
} from '../../constants/sites';
import lasestrellas from './taxonomy/lasestrellas';
import elnu9ve from './taxonomy/elnueve';
import canal5 from './taxonomy/canal5';
import losbingers from './taxonomy/losbingers';
import unicable from './taxonomy/unicable';
import televisa from './taxonomy/televisa';
import lcdlf from './taxonomy/lcdlf';
import { types as matcherTypes } from './taxonomy/matchers/Matcher';

/**
 * Taxonomy per televisa "Vertical"
 * @type {Object}
 */
const televisaVerticals = {
  [LAS_ESTRELLAS_SITE]: {
    ...lasestrellas,
  },
  [ELNU9VE_SITE]: {
    ...elnu9ve,
  },
  [CANAL5_SITE]: {
    ...canal5,
  },
  [LOS_BINGERS_SITE]: {
    ...losbingers,
  },
  [LCDLF_SITE]: {
    ...lcdlf,
  },
  [TELEVISA_SITE]: {
    ...televisa,
  },
  [UNICABLE_SITE]: {
    ...unicable,
  },
};

/**
 * Return the category for televisa sites
 * @param {Object} data page data from api
 * @param {string} site request site name
 * @param {string} path the request path
 * @returns {string} the category
 */
export default (data, site, path) => {
  let pageCategory = site;
  const verticalsBySite = televisaVerticals[site];
  if (verticalsBySite) {
    pageCategory = Object.keys(verticalsBySite).find((key) => {
      return verticalsBySite[key].some(matcher => (
        matcher.type === matcherTypes.PAGE_URI && matcher.match({
          data,
          key,
          path,
          site,
        })
      ));
    }) || site;
  }
  return pageCategory;
};
