import React from 'react';
import { shallow } from 'enzyme';

import Placeholder from '.';

describe('Placeholder', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Placeholder />);
    expect(wrapper.find('.item')).toHaveLength(1);
    expect(wrapper.find('.line')).toHaveLength(4);
  });
});
