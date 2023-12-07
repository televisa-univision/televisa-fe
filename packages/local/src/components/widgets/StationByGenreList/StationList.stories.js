import React from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import Store from '@univision/fe-commons/dist/store/store';

import StationList from './StationList';

const story = storiesOf('Widgets/StationList', module);

story.add(
  'default',
  () => (
    <ApiProvider
      url="http://www.univision.com/radio"
      render={api => <Provider store={Store}><div className="uvs-container uvs-widget"><StationList stations={api.widgets[3].contents} /></div></Provider>}
    />
  )
);
