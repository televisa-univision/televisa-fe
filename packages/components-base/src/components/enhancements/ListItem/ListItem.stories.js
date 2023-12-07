import React from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import dataTestListItem from './__mocks__/dataTestListItem.json';
import ListItem from '.';

const newDataMain = {
  ...dataTestListItem.data,
};

storiesOf('Enhancement/ListItem', module)
  .add('Default view in desktop', () => (
    <Provider store={configureStore()}>
      <ListItem
        {...newDataMain.body[0].objectData}
        listNumber={1}
        device="desktop"
      />
    </Provider>
  ))
  .add('view in mobile', () => (
    <Provider store={configureStore()}>
      <ListItem
        {...newDataMain.body[0].objectData}
        listNumber={1}
        device="mobile"
      />
    </Provider>
  ))
  .add('hidden data and show video', () => (
    <Provider store={configureStore()}>
      <ListItem {...newDataMain.body[1].objectData} listNumber={2} />
    </Provider>
  ))
  .add('author data and external content', () => (
    <Provider store={configureStore()}>
      <ListItem {...newDataMain.body[2].objectData} listNumber={3} />
    </Provider>
  ));
