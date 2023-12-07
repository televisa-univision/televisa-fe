import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { BLACK } from '@univision/fe-commons/dist/utils/styled/constants';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import mockData from './__mocks__/pageData.json';

import GlobalWidget from './index';

const store = configureStore();

describe('GlobalWidget suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setPageData(mockData));
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <Provider store={store}>
        <GlobalWidget />
      </Provider>), div);
  });

  it('should render the GlobalWidget component by default', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GlobalWidget />
      </Provider>
    );
    expect(wrapper.find('GlobalWidget__GlobalWidgetContainer')).toHaveLength(1);
    expect(wrapper.find('GlobalWidget__GlobalWidgetContainer')).not.toHaveStyleRule('background-color', BLACK);
  });

  it('should render the GlobalWidget component with black background', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GlobalWidget isDark />
      </Provider>
    );
    expect(wrapper.find('GlobalWidget__GlobalWidgetContainer')).toHaveStyleRule('background-color', BLACK);
  });

  it('should not render the GlobalWidget component', () => {
    store.dispatch(setPageData({
      data: {
        globalWidgets: [],
      },
    }));
    const wrapper = mount(
      <Provider store={store}>
        <GlobalWidget />
      </Provider>
    );
    expect(wrapper.find('NotificationBanner__notificationBanner')).toHaveLength(0);
  });

  it('should not render the GlobalWidget component', () => {
    store.dispatch(setPageData({
      data: {
        globalWidgets: null,
      },
    }));
    const wrapper = mount(
      <Provider store={store}>
        <GlobalWidget />
      </Provider>
    );
    expect(wrapper.find('GlobalWidget__GlobalWidgetContainer')).toHaveLength(0);
  });
});
