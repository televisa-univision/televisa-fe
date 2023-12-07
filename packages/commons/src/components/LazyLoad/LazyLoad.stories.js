import React from 'react';
import { storiesOf } from '@storybook/react';

import Store from '../../store/store';
import setPageData from '../../store/actions/page-actions';
import config from '../../config/index';

import LazyLoad from '.';

storiesOf('Helpers/LazyLoad', module).add('default', () => {
  Store.dispatch(setPageData({ domain: 'https://www.univision.com' }));
  config.routes.syndicator.content = 'https://syndicator.univision.com/web-api/content';
  return (
    <LazyLoad uri="/musica" placeholder={<h2>Loading</h2>}>
      {data => (
        <div>
          <h2>
            {data.title}
            {' '}
Feed
          </h2>
          <p>{JSON.stringify(data)}</p>
        </div>
      )}
    </LazyLoad>
  );
});
