import {
  LAS_ESTRELLAS_SITE,
  TELEVISA_SITE,
  ELNU9VE_SITE,
  CANAL5_SITE,
} from '../../constants/sites';
// eslint-disable-next-line import/no-cycle
import lasestrellas from './taxonomy/lasestrellas';
// eslint-disable-next-line import/no-cycle
import elnu9ve from './taxonomy/elnueve';
// eslint-disable-next-line import/no-cycle
import canal5 from './taxonomy/canal5';
// eslint-disable-next-line import/no-cycle
import televisa from './taxonomy/televisa';
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
  [TELEVISA_SITE]: {
    ...televisa,
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
