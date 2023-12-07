import React from 'react';
import { mount } from 'enzyme';

import List from '.';

describe('List placeholder', () => {
  it('should render as expected', () => {
    const wrapper = mount(<List />);

    expect(wrapper.find('List__TitleContainer')).toHaveLength(1);
    expect(wrapper.find('List__Card')).toHaveLength(6);
    expect(wrapper.find('List__Button')).toHaveLength(1);
    expect(wrapper.find('List__Aside')).toHaveLength(1);
    expect(wrapper.find('List__AdBackground')).toHaveLength(1);
  });
});
