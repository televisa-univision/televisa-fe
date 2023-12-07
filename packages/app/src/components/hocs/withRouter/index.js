import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NextRouter from 'next/router';

import createHistory from '@univision/fe-commons/dist/utils/helpers/history';
import { isRelativeUrl, toRelativeUrl } from '@univision/fe-commons/dist/utils/helpers';
import { resetNextSpa } from '@univision/fe-commons/dist/store/actions/page-actions';
import { getPermutiveSchema } from '@univision/fe-commons/dist/utils/ads/vendors/permutiveLoader';

import Router from '../../base/Router';

/**
 * HOC to insert custom router
 * In the future if we are not longer use it,
 * just remove this HOC
 * @param {Object} WrappedComponent to be proxy
 * @returns {React.Component}
 */
export default function(WrappedComponent) {
  /**
   * Wraps the passed component with Router
   */
  class RouteWrapper extends PureComponent {
    /**
     * Acesss initialProps on the client
     * @access public
     * @param {Object} context - Next.js _app or page context
     * @returns {Object} initialProps component state and props
     */
    static getInitialProps = async (context = {}) => {
      let pageData = {};

      if ('getInitialProps' in WrappedComponent) {
        pageData = await WrappedComponent.getInitialProps.call(WrappedComponent, context);
      }

      return {
        ...pageData,
      };
    };

    /**
     * Main constructor
     * @param {Object} props Component props
     */
    constructor(props) {
      super(props);
      this.history = createHistory('');
    }

    /**
     * component did mount to prevent next router handling back button
     */
    componentDidMount() {
      NextRouter.beforePopState(
        () => false,
      );
    }

    /**
     * Fetch data before route change
     * @param {string} uri the new route path
     * @param {string} historyAction history api action [POP|PUSH]
     */
    handleChange = (uri, historyAction) => {
      const { store } = this.props;
      const requestUrl = isRelativeUrl(uri) ? uri : toRelativeUrl(uri);
      const paths = window.location.pathname.split('/').filter(path => path);
      const search = new URLSearchParams(window.location.search);
      const params = {};
      const paramKeys = search.keys();
      // eslint-disable-next-line no-restricted-syntax
      for (const paramKey of paramKeys) {
        params[paramKey] = search.get(paramKey);
      }
      RouteWrapper.getInitialProps({
        query: { ...params, paths },
        asPath: requestUrl,
        store,
      }).then(() => {
        // we need to dispatch this addon for SPA
        // eslint-disable-next-line babel/no-unused-expressions
        window.permutive?.addon('web', getPermutiveSchema());
      });
      // handle the history navigation in a separated way, to fix issue with back button, check:
      // packages/app/src/components/base/ContentTypeWrapper/index.js
      if (historyAction !== 'POP') {
        window.scrollTo(0, 0);
      }
      store.dispatch(resetNextSpa(historyAction));
    };

    /**
     * Render component
     * @returns {JSX}
     */
    render() {
      const { props: { page: { config: propsConfig } } } = this;
      const config = propsConfig;

      return (
        <Router beforeChange={this.handleChange} history={this.history}>
          <WrappedComponent {...this.props} config={config} />
        </Router>
      );
    }
  }

  RouteWrapper.propTypes = {
    page: PropTypes.object,
    store: PropTypes.object,
  };

  RouteWrapper.defaultProps = {
    page: {},
  };

  return RouteWrapper;
}
