import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isValidObject } from '@univision/fe-commons/dist/utils/helpers';

const defaultConfig = {
  storeKey: '__UVN_STORE__',
  debug: process.env.NODE_ENV === 'development',
  serializeState: state => state,
  deserializeState: state => state,
};

/**
 * Initialize and create redux store
 * @param {Function} makeStore - function to create a new store instance
 * @param {Object} options - option to the create store function
 * @param {Object} options.initialState - initial store data to send to redux
 * @param {Object} options.ctx - Next.js context data
 * @param {Object} options.config - withReudx config object
 * @returns {Object} store instance
 */
const initStore = (makeStore, { initialState, ctx, config }) => {
  const { storeKey, isServer } = config;
  const storeContext = {
    ...ctx,
    ...config,
    isServer,
  };

  /**
   * Call 'makeStore' function with the store context
   * @returns {Object}
   */
  const createStore = () => (
    makeStore(config.deserializeState(initialState), storeContext)
  );

  if (isServer) return createStore();

  // Memoize store if client
  if (!(storeKey in window)) {
    window[storeKey] = createStore();
  }

  return window[storeKey];
};

/**
 * Get ReduxWrapper component with the children component
 * @param {Node} AppOrPage - component to wrap with redux, can be the Next.js _app or a page
 * @param {Function} makeStore - function to create a new store instance
 * @param {Object} config - withRedux configuration
 * @returns {JSX}
 */
function getReduxWrapper(AppOrPage, makeStore, config) {
  const { isServer } = config;
  /**
   * ReduxWrapper component wrapper delegates the redux initialization
   * on server and client side
   * @public
   * @extends {React.Component}
   */
  class ReduxWrapper extends Component {
    static displayName = `withRedux(${AppOrPage.displayName || AppOrPage.name || 'Page'})`;

    static propTypes = {
      initialProps: PropTypes.object,
      initialState: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
      ]),
    }

    /**
     * Redux initialization on server and client side (on route page)
     * @access public
     * @param {Object} context - Next.js _app or page context
     * @returns {Object} initialProps component state and props
     */
    static getInitialProps = async (context = {}) => {
      const ctx = context.ctx || context;

      if (!isValidObject(ctx)) throw new Error('No app or page context');
      if (config.debug) {
        // TODO: add some logs like
        // 'ReduxWrapper.getInitialProps wrapper got the store with state');
      }
      // Create store for collection data time
      const store = initStore(makeStore, {
        ctx,
        config,
      });
      ctx.store = store;
      ctx.isServer = isServer;
      let pageState = {};

      if ('getInitialProps' in AppOrPage) {
        pageState = await AppOrPage.getInitialProps.call(AppOrPage, context);
      }

      if (config.debug) {
        // TODO: add debug logs
        // 'ReduxWrapper.getInitialProps has store state');
      }

      const initialState = isServer
        ? config.serializeState(pageState)
        : pageState;

      return {
        initialState,
      };
    };

    /**
     * Initialize redux store on client with the initialState
     * @constructor
     * @param {Object} props component react props
     * @param {Object} context next,js _app or page context
     */
    constructor(props, context) {
      super(props, context);

      const ctx = context.ctx || context;
      const { initialState } = props;

      if (config.debug) {
        // TODO: add logs
        // 'ReduxWrapper.render created new store with initialState', initialState);
      }

      // Check final store instance to set in SSR o client side
      // with the initial state collected on getInitialProps
      this.store = initStore(makeStore, {
        ctx,
        initialState,
        config,
      });
    }

    /**
     * ReduxWrapper component
     * @returns {JSX}
     */
    render() {
      const { initialState, ...props } = this.props;

      // AppOrPage render must return something like <Provider><Component/></Provider>
      return <AppOrPage {...props} {...initialState} isServer={isServer} store={this.store} />;
    }
  }

  return ReduxWrapper;
}

/**
 * The withRedux HOC that brings Next.js and Redux together.
 * @param {Function} makeStore - function will receive the initial state and should
 * return a new Redux store instance each time it's called, No memoization is needed here,
 * it is automatically done inside the wrapper.
 * When makeStore is invoked it is provided with a configuration object
 * along with a Next.js page context which includes:
 *
 *  {boolean} isServer - indicates whether makeStore is executed on the server or the client side
 *  {Request} req - the next.js getInitialProps context req attribute
 *  {Response} res - the next.js getInitialProps context res attribute
 *
 *  The req and res attributes are only set for the first server-side store.
 *
 * @example
 * function MyApp(initialState, { isServer, req, res }) {
 *   // Redux stuff here
 * }
 * export default withRedux(makeStore, { storeKey: 'REDUX_STORE', debug: false })(MyApp);
 *
 * @param {Object} config - option to the create store function
 * @param {string} config.storeKey - the key used on window to persist the store on the client
 * @param {boolean} config.debug - force enable debug logging
 * by default is enabled with NODE_ENV=='development'
 * @param {Function} config.serializeState - custom functions for serializing the redux state
 * @param {Function} config.deserializeState - custom functions for deserializing the redux state
 * @returns {JSX} ReduxWrapper - wrapper of Next.js _app or page with redux store
 */
function withRedux(makeStore, config) {
  const isServer = typeof window === 'undefined';
  const defaultedConfig = {
    ...defaultConfig,
    ...config,
    isServer,
  };

  return AppOrPage => (getReduxWrapper(AppOrPage, makeStore, defaultedConfig));
}

export default withRedux;
