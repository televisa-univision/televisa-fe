import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import Error404 from '.';
import Search from '../../contentTypes/Search';

const store = configureStore();

describe('Error404 tests', () => {
  let props;

  beforeEach(() => {
    props = {
      pageData: {},
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders as expected', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <Error404 {...props} />
      </Provider>,
    );

    await act(async () => {
      await new Promise(resolve => setImmediate(resolve));
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(Search)).toHaveLength(1);
  });
});
