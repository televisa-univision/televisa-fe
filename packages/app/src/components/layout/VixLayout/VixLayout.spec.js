import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import VixLayout from '.';

const store = configureStore();
/**
 * @test {VixLayout}
 */
describe('VixLayout test', () => {
  it('should render correctly', () => {
    const pageData = {
      data: {},
      site: 'mulher',
    };

    const wrapper = shallow(
      <Provider store={store}>
        <VixLayout pageData={pageData}>
          <div className="children">Layout</div>
        </VixLayout>
      </Provider>,
    );

    expect(wrapper.exists()).toBe(true);
  });
});
