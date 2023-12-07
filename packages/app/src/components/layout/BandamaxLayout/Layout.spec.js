import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import BandamaxLayout from '.';

describe('BandamaxLayout test', () => {
  const store = configureStore();

  it('should render without crashing', () => {
    const wrapper = shallow(<BandamaxLayout store={store} />);
    expect(wrapper).toHaveLength(1);
  });
});
