import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Store from '../../store/store';
import { setThemeData } from '../../store/actions/page-actions';
import ThemeProviderConnect from './ThemeProviderConnector';
import ThemeProvider from '.';

const themeSettings = {
  backgroundColor: 'red',
};

describe('HeaderWithProfile', () => {
  beforeEach(() => {
    Store.dispatch(setThemeData(themeSettings));
  });

  it('should render a Header', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ThemeProviderConnect />
      </Provider>
    );
    expect(wrapper.find(ThemeProvider)).toHaveLength(1);
  });

  it('should render a Header with correct props', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <ThemeProviderConnect />
      </Provider>
    );
    expect(wrapper.find(ThemeProviderConnect)).toHaveLength(1);
    expect(wrapper.find(ThemeProvider).props().theme).toEqual(themeSettings);
  });
});
