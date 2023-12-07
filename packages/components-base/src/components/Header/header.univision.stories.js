import React, { Fragment } from 'react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';

import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import NavDataProvider from './NavDataProvider';
import Styles from './Header.stories.scss';
import Header from '.';

const Stories = storiesOf('Layout/Header/univision', module);

const univision = [
  {
    uri: '/',
    name: 'BrandedHeader - Univision',
    pageCategory: pageCategories.UNIVISION,
    device: 'desktop',
  },
  {
    uri: '/',
    name: 'BrandedHeader - Univision Mobile',
    pageCategory: pageCategories.UNIVISION,
    device: 'mobile',
  },
  {
    uri: '/',
    name: 'BrandedHeader - Univision - UNINOW Button - enVivoTvIcon',
    pageCategory: pageCategories.UNIVISION,
    device: 'desktop',
    requestParams: {
      uniNow: 'enVivoTvIcon',
    },
  },
  {
    uri: '/',
    name: 'BrandedHeader - Univision - UNINOW Button - tvEnVivoText',
    pageCategory: pageCategories.UNIVISION,
    device: 'desktop',
    requestParams: {
      uniNow: 'enVivoTvText',
    },
  },
  {
    uri: '/',
    name: 'BrandedHeader - Univision - UNINOW Button - verTvIcon',
    pageCategory: pageCategories.UNIVISION,
    device: 'desktop',
    requestParams: {
      uniNow: 'verTvIcon',
    },
  },
  {
    uri: '/',
    name: 'BrandedHeader - Univision - UNINOW Button - verTvText',
    pageCategory: pageCategories.UNIVISION,
    device: 'desktop',
    requestParams: {
      uniNow: 'verTvText',
    },
  },
  {
    uri: '/',
    name: 'BrandedHeader - Univision - UNINOW Button - watchIcon',
    pageCategory: pageCategories.UNIVISION,
    device: 'desktop',
    requestParams: {
      uniNow: 'watchIcon',
    },
  },
];

univision.forEach(({
  uri,
  name,
  pageCategory,
  device = 'mobile',
  requestParams,
}) => Stories.add(name, () => (
  <ApiProvider
    url={`https://univision.com${uri}`}
    store={Store}
    render={data => (
      // load the header using dynamic import
      <NavDataProvider
        data={data}
        pageCategory={pageCategory}
        render={() => {
          Store.dispatch(setPageData({ pageCategory, device, data }));
          Store.dispatch(setPageData({
            pageCategory,
            device,
            data,
            requestParams,
          }));
          return (
            <Fragment>
              <BKPIndicator />
              <div className={Styles.wrapper}>
                <Header pageData={data} pageCategory={pageCategory} />
              </div>
            </Fragment>
          );
        }}
      />
    )}
  />
)));
