import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import VixError404 from '.';

const store = configureStore();

describe('VixError404', () => {
  it('should render as expected', async () => {
    const wrapper = shallow(
      <Provider store={store}>
        <VixError404 pageData={{ data: {} }} />
      </Provider>,
    );

    await act(async () => {
      await new Promise(resolve => setImmediate(resolve));
    });

    expect(wrapper.find(VixError404)).toHaveLength(1);
  });
});
