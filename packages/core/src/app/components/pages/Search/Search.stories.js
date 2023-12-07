import React from 'react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import { storiesOf } from '@storybook/react';
import Search from './Search';

storiesOf('Search', module)
  .add('default', () => {
    return (
      <ApiProvider
        url="https://performance.univision.com/search"
        store={Store}
        env="performance"
        render={(data) => {
          Store.dispatch(setPageData({ data, device: 'desktop', requestParams: { q: '' } }));
          return (
            <Search page={data} />
          );
        }}
      />
    );
  })
  .add('From search component', () => {
    return (
      <ApiProvider
        url="https://performance.univision.com/search"
        store={Store}
        env="performance"
        render={(data) => {
          Store.dispatch(setPageData({ data, device: 'desktop', requestParams: { q: 'Noticias' } }));
          return (
            <Search page={data} />
          );
        }}
      />
    );
  });
