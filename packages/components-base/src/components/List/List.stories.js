import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import ListWrapper from '.';
import content from './__mocks__/listDataMock';
import mockPageData from './__mocks__/pageDataMock';

const store = configureStore();
const title = 'Últimas Noticias';
const props = {
  contentList: content,
  title,
};
const style = {
  height: '552px',
  width: '376px',

};

storiesOf('Widgets/List', module)
  .add('Default in Spanish', () => {
    localization.setLanguage('es');
    store.dispatch(setPageData({
      env: 'test',
      language: 'es',
      device: 'mobile',
      data: {
        ...mockPageData.data,
      },
      requestParams: null,
    }));
    return (
      <div style={style}>
        <Provider store={store}>
          <ListWrapper {...props}>
            Hello There
          </ListWrapper>
        </Provider>
      </div>
    );
  }).add('Default in English', () => {
    localization.setLanguage('en');
    return (
      <div style={style}>
        <Provider store={store}>
          <ListWrapper {...props}>
            Hello There
          </ListWrapper>
        </Provider>
      </div>
    );
  });
