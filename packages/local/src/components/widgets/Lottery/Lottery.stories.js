import React from 'react';

import { storiesOf } from '@storybook/react';

import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import Lottery from '.';

storiesOf('Widgets/Lottery', module)
  .add('Atlanta Market', () => (
    <ApiProvider
      url="https://www.univision.com/atlanta/wuvg/loteria"
      render={(data) => {
        Store.dispatch(setPageData({ data }));
        return (
          <Lottery market="Atlanta" />
        );
      }}
    />
  ))
  .add('Miami Market', () => (
    <ApiProvider
      url="https://www.univision.com/miami/wltv/loteria"
      render={(data) => {
        Store.dispatch(setPageData({ data }));
        return (
          <Lottery market="Miami" />
        );
      }}
    />
  ));
