import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import Error404 from '.';
import Search from '../../contentTypes/Search';

const store = configureStore();

/**
 * Wait for async behaviours to finish
 * @param {Object} wrapper component
 * @param {function} _actions any actions to be triggered
 * @returns {Promise<void>}
 */
const actions = async (wrapper, _actions) => {
  await act(async () => {
    await (new Promise(resolve => setTimeout(resolve, 0)));
    if (_actions) _actions();
    wrapper.update();
  });
};

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

    await actions(wrapper);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(Search)).toHaveLength(1);
  });
});
