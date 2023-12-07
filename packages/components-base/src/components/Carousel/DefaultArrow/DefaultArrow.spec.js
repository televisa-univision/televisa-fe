import React from 'react';
import { shallow } from 'enzyme';

import DefaultArrow from '.';

jest.mock('@univision/fe-icons/dist/components/Icon', () => jest.fn());

describe('DefaultArrow tests', () => {
  it('should render without issues', () => {
    const wrapper = shallow(<DefaultArrow />);
    expect(wrapper.getElement()).toBeDefined();
  });
  it('should render the right arrow', () => {
    const wrapper = shallow(<DefaultArrow isRight />);
    expect(wrapper.find('.right').length).toBe(1);
  });
  it('should render the left arrow', () => {
    const wrapper = shallow(<DefaultArrow />);
    expect(wrapper.find('.left').length).toBe(1);
  });
});
