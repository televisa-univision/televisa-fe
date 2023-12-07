import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import TudnLayout from '.';
import PageWrapper from '../../base/PageWrapper';

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

/**
 * @test {TudnLayout}
 */
describe('TudnLayout test', () => {
  it('should render correctly', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <TudnLayout pageData={null}>
          <div className="children">Layout</div>
        </TudnLayout>
      </Provider>,
    );

    await actions(wrapper);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(PageWrapper)).toHaveLength(1);
    expect(wrapper.find('.children').text()).toBe('Layout');
  });
});
