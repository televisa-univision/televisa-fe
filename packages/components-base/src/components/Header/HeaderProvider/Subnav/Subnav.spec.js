import React from 'react';
import { shallow } from 'enzyme';

import Subnav from '.';

describe('Subnav', () => {
  it('should render default nav', () => {
    const wrapper = shallow(<Subnav links={[]} />);
    expect(wrapper.find('DefaultSubNav')).toHaveLength(1);
  });

  it('should render custom nav', () => {
    const wrapper = shallow(<Subnav links={[]} subNavComponent="DEFAULT" />);
    expect(wrapper.find('DefaultSubNav')).toHaveLength(1);
  });
});
