import React from 'react';
import { shallow } from 'enzyme';
import TeamItem from '.';

describe('TeamItem test', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<TeamItem />);
    expect(wrapper.find('TeamItem__StyledLink')).toHaveLength(1);
  });
});
