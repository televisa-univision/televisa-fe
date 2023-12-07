import Store from '@univision/fe-commons/dist/store/store';
import { getRequestParams } from '@univision/fe-commons/dist/store/storeHelpers';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import { fetchSearchApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import { cleanSearchQuery } from 'app/utils/helpers/helpers';
import config from '.';

/**
 * Main action definition
 */
const definition = {
  /**
   * Get search data from store
   * @returns {Object}
   */
  get searchData() {
    return getKey(Store.getState(), 'search') || {};
  },

  /**
   * Active sort type getter
   * @returns {string}
   */
  get sort() {
    return this.searchData.sort || getRequestParams(Store).o;
  },

  /**
   * Active filter type getter
   * @returns {string}
   */
  get filter() {
    return this.searchData.filter || getRequestParams(Store).t;
  },

  /**
   * Active date getter
   * @returns {Object}
   */
  get dateFilter() {
    return this.searchData.dateFilter
      || getRequestParams(Store).d
      || config.settings.dateFilter;
  },

  /**
   * Active query getter
   * @returns {Object}
   */
  get query() {
    return this.searchData.query || getRequestParams(Store).q;
  },

  /**
   * Active page number getter
   * @returns {Object}
   */
  get pageNumber() {
    return this.searchData.page;
  },

  /**
   * Page size getter
   * @returns {number}
   */
  get pageSize() {
    return typeof window !== 'undefined' ? config.settings.pageSize : 10;
  },

  /**
   * Helper to construct URL params
   * @returns {Object}
   */
  buildParams() {
    return {
      q: cleanSearchQuery(this.query),
      t: this.filter,
      d: this.dateFilter,
      p: this.pageNumber,
      s: this.pageSize,
      o: this.sort,
    };
  },

  /**
   * Action to fetch search results
   * @returns {Function}
   */
  fetchResults() {
    return {
      payload: fetchSearchApi(definition.buildParams()),
      meta: definition,
    };
  },

  /**
   * Extractor to be used on action reducer
   * @param {Object} objData - Data received after fetching
   * @returns {*}
   */
  extractor(objData) {
    const { data = {} } = objData || {};

    return {
      results: data.results || [],
      totalPages: data.totalPages || 0,
      totalResults: data.totalResults || 0,
    };
  },
};

export default definition;
