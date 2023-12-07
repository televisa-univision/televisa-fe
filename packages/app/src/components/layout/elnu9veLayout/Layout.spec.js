import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import Elnu9veLayout from '.';

describe('Elnu9veLayout test', () => {
  const store = configureStore();

  it('should render without crashing', () => {
    const wrapper = shallow(<Elnu9veLayout store={store} />);
    expect(wrapper).toHaveLength(1);
  });
});
