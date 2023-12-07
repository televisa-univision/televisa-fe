import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import Canal5Layout from '.';

describe('Canal5Layout test', () => {
  const store = configureStore();

  it('should render without crashing', () => {
    const wrapper = shallow(<Canal5Layout store={store} />);
    expect(wrapper).toHaveLength(1);
  });
});
