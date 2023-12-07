import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';

import LocalStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import mockData from './__mocks__/crossVerticalListMockData.json';
import CrossVerticalList from '.';

const store = configureStore();

storiesOf('Widgets/Redesign 2020/CrossVerticalList', module)
  .addDecorator((story) => {
    return (
      <div className="uvs-container">
        {story()}
      </div>
    );
  })
  .add('Default', () => {
    LocalStorage.setMultiObject('videoHistory', 3361422, {
      currentTime: 67,
      duration: 100,
    });

    return <Provider store={store}><CrossVerticalList {...mockData} /></Provider>;
  });
