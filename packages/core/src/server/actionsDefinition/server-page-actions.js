import * as types from '@univision/fe-commons/dist/store/actions/action-types';

// Real proxy API
import PageApi from 'server/proxy/api/page/PageApi';

/**
 * Action to gets BEX API data
 * @param {string} url BEX API url
 * @param {function} onError - callback for any error that comes up.
 * @returns {Object}
 */
export const getApiContent = (url, onError) => dispatch => (
  dispatch({
    type: types.GET_PAGE_API_CONTENT,
    payload: PageApi.getPage(url, onError),
  }));

/**
 * Action to sync global store
 * @param {Object} data data to sync
 * @returns {Object}
 */
export const syncStore = data => ({
  type: types.SYNC_STORE,
  data,
});
