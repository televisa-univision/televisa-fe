import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { RECTANGLE, LANDSCAPE } from '@univision/fe-commons/dist/constants/cardTypes';
import Store from '@univision/fe-commons/dist/store/store';

import CardSizer from '.';

const props = {
  type: RECTANGLE,
};

describe('CardSizer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <CardSizer {...props} />
      </Provider>
    );
    expect(wrapper.find('CardSizer')).toHaveLength(1);
  });
  it('should render landscape mode', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <CardSizer {...props} type={LANDSCAPE} />
      </Provider>
    );
    expect(wrapper.find('CardSizer')).toHaveLength(1);
  });
  it('should render ActionBar', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <CardSizer {...props} hasActionBar />
      </Provider>
    );
    expect(wrapper.find('CardSizer')).toHaveLength(1);
  });
});
