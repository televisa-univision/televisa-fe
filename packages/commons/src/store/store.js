// eslint-disable-next-line import/no-cycle
import StoreManager from './StoreManager';

/**
 * Setup global redux store, facade to StoreManager.getStore()
 * @deprecated avoid use the global store, use {@link ReactReduxContext} instead
 */
export default StoreManager.getStore();
