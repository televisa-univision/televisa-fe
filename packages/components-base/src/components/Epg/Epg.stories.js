import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { storiesOf } from '@storybook/react';
import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { Provider } from 'react-redux';

import mockData from './__mocks__/epg.json';
import Epg from '.';

const { digitalChannelSchedule } = mockData.contents[0];
const device = getDevice();

const BodyReset = createGlobalStyle`
  body #root {
    padding: 0;
  }
`;

storiesOf('Clickable/Epg', module)
  .addDecorator(story => (
    <>
      <BodyReset />
      <div className="uvs-container" style={{ marginTop: '16px' }}>
        <Provider store={Store}>
          {story()}
        </Provider>
      </div>
    </>
  ))
  .add('default', () => {
    Store.dispatch(setPageData({ device }));
    return <Epg digitalChannelSchedule={digitalChannelSchedule} />;
  });
