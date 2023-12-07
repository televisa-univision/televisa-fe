import React from 'react';
import { shallow } from 'enzyme';

import TestItem from '.';

describe('TestItem tests', () => {
  it('should render without issues', () => {
    const wrapper = shallow(<TestItem />);
    expect(wrapper.getElement()).toBeDefined();
  });
  it('should render the right arrow', () => {
    const wrapper = shallow(<TestItem isselected="true" />);
    expect(wrapper.find('.selected').length).toBe(1);
  });
});
