import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import { DeployEnvironment } from '../constants/environment';

import user from './middlewares/user';

// eslint-disable-next-line import/no-cycle
import reducers from './reducers';

/**
 * StoreManager state.
 */
class State {
  /**
   * Constructor
   */
  constructor() {
    const middlewares = [promise, thunk, user];
    /* eslint no-underscore-dangle: 0 */
    const deployEnv = global?.window?.__INITIAL_STATE__?.env
    || global?.window?.__NEXT_DATA__;
    const reduxDevtoolsEnabled = (
      deployEnv && deployEnv !== DeployEnvironment.Production
    );
    const composeEnhancers = reduxDevtoolsEnabled
      ? global?.window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
      : compose;

    this.Store = createStore(
      reducers,
      composeEnhancers(applyMiddleware(...middlewares))
    );
  }

  /**
   * Return the redux store
   * @returns {*}
   * @constructor
   */
  getStore() {
    return this.Store;
  }
}

/**
 * Manager for the redux store.
 */
class StoreManager {
  /**
   * Create a fresh, new state (including a fresh, new store)
   * @returns {Object} StoreManager state
   */
  init() {
    this.state = new State();
    return this.state;
  }

  /**
   * Return the redux store
   * @returns {Object}
   * @constructor
   */
  getStore() {
    if (!this.state) {
      this.init();
    }
    return this.state.getStore();
  }
}

/**
 * A singleton implementation with many states, each request can use
 * a different state to support a store-per-request scheme.
 */
export default new StoreManager();
