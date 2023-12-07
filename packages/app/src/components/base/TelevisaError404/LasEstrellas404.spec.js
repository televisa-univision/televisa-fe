import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import TelevisaError404 from '.';

const store = configureStore();

describe('TelevisaError404 tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('renders as expected', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <TelevisaError404 {...{ pageData: {} }} />
      </Provider>,
    );

    expect(wrapper.exists()).toBe(true);
  });
});
