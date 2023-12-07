import React from 'react';
import { mount } from 'enzyme';

import IndexListAside from '.';

describe('IndexListAside', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<IndexListAside />);
    expect(wrapper.find('IndexListAside')).toHaveLength(1);
  });
});
