import React from 'react';
import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';

import ChannelStrip from './ChannelStrip';

import data from './__mocks__/channelStrip.json';

storiesOf('Widgets/ChannelStrip', module)
  .addDecorator(withViewport('iphone8p'))
  .add('default - live', () => (
    <Provider store={Store}>
      <ChannelStrip data={data.widgets[0].contents[0]} />
    </Provider>
  ), { viewport: 'Default' })
  .add('default - no program', () => {
    const alteredData = Object.assign({}, data.widgets[0].contents[0]);
    delete alteredData.digitalChannelSchedule;
    return (
      <Provider store={Store}>
        <ChannelStrip data={alteredData} />
      </Provider>
    );
  }, { viewport: 'Default' });
