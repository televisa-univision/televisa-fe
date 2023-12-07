import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mount, shallow } from 'enzyme';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import withRedux from '.';

const storeKey = 'testStoreKey';
const context = {
  pathname: '/',
  req: {},
  res: {
    setHeader: (key, value) => ({
      [key]: value,
    }),
  },
  query: {},
};
const appContext = {
  ctx: context,
  ...context,
};

/**
 * Dummy page component
 * @param {Object} props - react props
 * @returns {JSX}
 */
class SyncPageBase extends Component {
  static propTypes = {
    store: PropTypes.any,
    custom: PropTypes.any,
  }

  /**
   * Dummy page component
   * @constructor
   * @param {Object} props - react props
   */
  constructor(props) {
    super(props);
    this.state = props.store.getState() || {};
  }

  /**
   * Test base page
   * @returns {JSX}
   */
  render () {
    const { custom } = this.props;
    const { page } = this.state;
    return (
      <div>
        <h1>{custom}</h1>
        <p>{JSON.stringify(page)}</p>
      </div>
    );
  }
}

/**
 * App component with sync dispatch
 */
class SyncApp extends SyncPageBase {
  /**
   * Test sync dispatch
   * @param {Object} ctx - page context
   * @returns {Object}
   */
  static getInitialProps() {
    return {
      custom: 'custom',
      page: { foo: 'bar' },
    };
  }
}

/**
 * App component with async dispatch
 */
class AsyncApp extends SyncPageBase {
  /**
   * Test async dispatch
   * @param {Object} ctx - page context
   * @returns {Object}
   */
  static async getInitialProps() {
    const res = await Promise.resolve({ foo: 'async' });
    return {
      custom: 'custom',
      page: res,
    };
  }
}

/**
 * Page component not store dispatch
 */
class NoStorePage extends SyncPageBase {
  /**
   * Test with not store dispatch
   * @returns {Object}
   */
  static async getInitialProps() {
    return { custom: 'custom' };
  }
}

/**
 * Page component with sync dispatch
 */
class SyncPage extends SyncPageBase {
  /**
   * Test sync dispatch
   * @param {Object} ctx - page context
   * @returns {Object}
   */
  static getInitialProps({ store }) {
    store.dispatch(setPageData({ foo: 'bar' }));
    return { custom: 'custom' };
  }
}

/**
 * @test {withRedux}
 */
describe('withRedux test', () => {
  describe('client integration', () => {
    it('should throw when it not have page or app context', () => {
      const WrappedPage = withRedux(configureStore, { storeKey })('div');
      return expect(WrappedPage.getInitialProps()).rejects.toEqual(new Error('No app or page context'));
    });

    it('should render correctly if the page not have initialState', async () => {
      const WrappedPage = withRedux(configureStore, { storeKey })(SyncPageBase);
      // this is called by Next.js on _app
      const props = await WrappedPage.getInitialProps(appContext);
      const wrapper = mount(<WrappedPage {...props} />);
      expect(props.initialState).toEqual({});
      expect(wrapper).toBeDefined();
      expect(wrapper.find('h1').text()).toBe('');
    });

    it('should not set store instance if is taken from window', async () => {
      const WrappedPage = withRedux(configureStore, { storeKey })(NoStorePage);
      const store = configureStore({});
      global.window[storeKey] = store;
      store.dispatch(setPageData({ foo: 'bar' }));
      // this is called by Next.js on _app
      const props = await WrappedPage.getInitialProps(appContext);
      const wrapper = mount(<WrappedPage {...props} />);
      expect(props.initialState.custom).toBe('custom');
      expect(wrapper).toBeDefined();
      expect(wrapper.find('h1').text()).toBe('custom');
      expect(wrapper.find('p').text()).toMatch('"foo":"bar"');

      delete global.window[storeKey];
    });

    it('should set store instance if is not taken from window', async () => {
      const WrappedPage = withRedux(configureStore, { storeKey })(SyncApp);
      // this is called by Next.js on _app
      const props = await WrappedPage.getInitialProps(appContext);
      const wrapper = mount(<WrappedPage {...props} />);
      expect(props.initialState.custom).toBe('custom');
      expect(wrapper).toBeDefined();
      expect(wrapper.find('h1').text()).toBe('custom');
      expect(wrapper.find('p').text()).toMatch('"foo":"bar"');
    });

    it('should takes the page context', async () => {
      const WrappedPage = withRedux(configureStore, { storeKey })(SyncPage);
      // this is called by Next.js on pages
      const props = await WrappedPage.getInitialProps(appContext.ctx);
      const wrapper = mount(<WrappedPage {...props} />);

      expect(props.initialState.custom).toBe('custom');
      expect(wrapper).toBeDefined();
      expect(wrapper.find('h1').text()).toBe('custom');
      expect(wrapper.find('p').text()).toMatch('"foo":"bar"');
    });
  });

  describe('server integration', () => {
    beforeAll(() => {
      delete global.window;
    });

    it('should render in server a sync page', async () => {
      const WrappedPage = withRedux(configureStore)(SyncApp);
      // this is called by Next.js
      const props = await WrappedPage.getInitialProps(appContext);
      const wrapper = shallow(<WrappedPage {...props} />);
      expect(props.initialState.custom).toBe('custom');
      expect(props.initialState.page).toHaveProperty('foo', 'bar');
      expect(wrapper).toBeDefined();
      expect(wrapper.dive().find('h1').text()).toBe('custom');
      expect(wrapper.dive().find('p').text()).toMatch('"foo":"bar"');
    });

    it('should render in server an async page', async () => {
      const WrappedPage = withRedux(configureStore)(AsyncApp);
      // this is called by Next.js
      const props = await WrappedPage.getInitialProps(appContext);
      const wrapper = shallow(<WrappedPage {...props} />);

      expect(props.initialState.custom).toBe('custom');
      expect(props.initialState.page).toHaveProperty('foo', 'async');
      expect(wrapper).toBeDefined();
      expect(wrapper.dive().find('h1').text()).toBe('custom');
      expect(wrapper.dive().find('p').text()).toMatch('"foo":"async"');
    });
  });

  describe('custom serialization', () => {
    it('should wrap correctly with custom serialization', async () => {
      const prevwindow = global.window;
      delete global.window;
      const WrappedPage = withRedux(configureStore, {
        serializeState: state => ({ ...state, serialized: true }),
        deserializeState: state => ({ ...state, deserialized: true }),
        debug: true,
      })(SyncApp);
      const props = await WrappedPage.getInitialProps(appContext.ctx);
      const wrapper = shallow(<WrappedPage {...props} />);
      expect(props.initialState.serialized).toBe(true);
      expect(wrapper).toBeDefined();
      global.window = prevwindow;
    });
  });
});
