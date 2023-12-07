import React from 'react';
import { shallow } from 'enzyme';
import VideoImage from '.';

describe('VideoImage tests', () => {
  it('should render picture component', () => {
    const wrapper = shallow(<VideoImage />);
    expect(wrapper.find('.imageWrapper').length).toBe(1);
  });
});
