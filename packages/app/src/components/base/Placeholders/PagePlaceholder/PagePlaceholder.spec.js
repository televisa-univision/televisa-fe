import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import { PagePlaceholder, VideoPagePlaceholder } from '.';

const store = configureStore();

/**
 * PageWrapper with provider
 * @param {Object} params component params
 * @returns {JSX}
 */
const PageWrapper = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

PageWrapper.propTypes = {
  children: PropTypes.node,
};

describe('PagePlaceholder', () => {
  it('should render desktop placeholder without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<PageWrapper><PagePlaceholder /></PageWrapper>, div);
  });

  it('should render mobile placeholder without crashing', () => {
    store.dispatch(setPageData({ device: 'mobile' }));
    const div = document.createElement('div');

    ReactDOM.render(<PageWrapper><PagePlaceholder /></PageWrapper>, div);
  });

  it('should render video page placeholder without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<VideoPagePlaceholder />, div);
  });
});
