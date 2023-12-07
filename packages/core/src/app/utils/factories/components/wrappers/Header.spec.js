import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('HeaderWrapper', () => {
  it('should render a header', () => {
    const wrapper = shallow(<Header initialState={{}} />);
    expect(wrapper.find('Header')).toHaveLength(1);
  });
});
