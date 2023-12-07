import Store from './store';
import { SYNC_STORE } from './actions/action-types';
import { isValidObject } from '../utils/helpers';

/**
 * Create store and configure reduces/middlewares (dummy function for now)
 * TODO: move StoreManager logic to this function when global store have been removed
 * @param {Object} initialState - redux state date
 * @returns {Object} store instance
 */
export default function configureStore(initialState) {
  // temporal workaround until remove global store
  if (isValidObject(initialState)) {
    Store.dispatch({
      type: SYNC_STORE,
      data: initialState,
    });
  }
  return Store;
}
