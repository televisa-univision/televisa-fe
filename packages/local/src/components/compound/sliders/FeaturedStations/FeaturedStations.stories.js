/* eslint-disable require-jsdoc */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Store from '@univision/fe-commons/dist/store/store';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import FeaturedStations from './FeaturedStations';

const url = 'http://www.univision.com/musica/uforia-music/radio';

storiesOf('Widgets/FeaturedStations', module)
  .add('default', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    return (
      <ApiProvider
        store={Store}
        url={url}
        render={api => <FeaturedStations content={api.widgets[0].contents} />}
      />
    );
  })
  .add('mobile', () => {
    Store.dispatch(setPageData({
      device: 'mobile',
    }));

    return (
      <ApiProvider
        store={Store}
        url={url}
        render={api => <FeaturedStations content={api.widgets[0].contents} />}
      />
    );
  });
