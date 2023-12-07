import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Taboola from './Taboola';

Store.dispatch(setPageData({ data: { uri: 'http://www.univision.com/' } }));

describe('Taboola', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const props = {
    data: {
      site: 'univision',
      type: 'article',
      uri: 'https://uat.x.univision.com/horoscopos/horoscopo-de-hoy-sabado-1-de-octubre-2022',
      analyticsData: {
        apps: {
          common: {
            section: 'horoscopos',
          },
        },
      },
    },
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={Store}>
        <Taboola />
      </Provider>, div
    );
  });

  it('should render taboola thumbnail', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={Store}>
        <Taboola mode={'thumbnails-a'} placement={'Below Article Thumbnails'} pageData={props} uri={props?.data?.type} />
      </Provider>, div
    );
  });

  it('should render multile taboola placements without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={Store}>
        <Taboola mode={'thumbnails-a'} placement={'Below Article Thumbnails'} pageData={props} uri={props?.data?.type} />
        <Taboola mode={'thumbnails-rr'} placement={'Right Rail Thumbnails'} pageData={props} uri={props?.data?.type} />
      </Provider>, div
    );
  });

  it('should render taboola with lazu loading testing', () => {
    const uri = '';
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={Store}>
        <Taboola
          mode="alternating-thumbnails-a"
          placement="Below Article Thumbnails - Test"
          page={props}
          isFeed
          uri={uri}
        />
      </Provider>, div
    );
  });

  it('should render taboola midcarticle', () => {
    const uri = '';
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={Store}>
        <Taboola
          mode={'thumbnails-mid-article-1x1'}
          placement={'Mid Article 1x1'}
          page={props}
          articleDepth={1}
          uri={uri}
          isFeed
        />
      </Provider>, div
    );
  });
});
