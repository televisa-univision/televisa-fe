import React from 'react';
import { storiesOf } from '@storybook/react';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Store from '@univision/fe-commons/dist/store/store';
import config from '@univision/fe-commons/dist/config/index';
import SpaShellDummy from './SpaShellDummy';

storiesOf('SpaShellDummy', module)
  .add('fetch content', () => {
    Store.dispatch(setPageData({ domain: 'https://www.univision.com' }));
    config.routes.syndicator = { content: 'https://syndicator.univision.com/web-api/content' };
    return <SpaShellDummy uri="/" />;
  });
