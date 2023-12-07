import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData, { setThemeData } from '@univision/fe-commons/dist/store/actions/page-actions';

import HeaderWithProfile from '.';

jest.mock('@univision/shared-components/dist/components/weather/MinMaxTemp', () => () => 'MinMaxTemp');
jest.mock('@univision/shared-components/dist/components/weather/WeatherDate', () => 'mock-widget');

beforeEach(() => {
  Store.dispatch(setPageData({
    data: {},
  }));
});

describe('Header', () => {
  it('should render a Header', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <HeaderWithProfile />
      </Provider>
    );
    expect(wrapper.childAt(0).find(HeaderWithProfile)).toHaveLength(1);
  });

  it('should render a Header with correct props', () => {
    const props = { test: true };
    const wrapper = mount(
      <Provider store={Store}>
        <HeaderWithProfile {...props} />
      </Provider>
    );
    expect(wrapper.childAt(0).find(HeaderWithProfile)).toHaveLength(1);
    expect(wrapper.childAt(0).find(HeaderWithProfile).props('test')).toBeTruthy();
  });

  it('should render a Navigation with feature flag', () => {
    Store.dispatch(setThemeData({ v2: { foo: 'bar' } }));
    const wrapper = mount(
      <Provider store={Store}>
        <HeaderWithProfile />
      </Provider>
    );
    expect(wrapper.find('Connect(NavProvider)')).toHaveLength(1);
  });
});
