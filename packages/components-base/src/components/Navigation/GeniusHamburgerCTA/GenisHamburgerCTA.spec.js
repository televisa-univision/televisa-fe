import React from 'react';
import { shallow } from 'enzyme';

import GeniusHamburgerCTA from '.';

describe('GeniusHamburgerCTA', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<GeniusHamburgerCTA />);
    expect(wrapper.find('GeniusHamburgerCTA__Container')).toHaveLength(1);
  });
});
