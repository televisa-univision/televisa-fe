import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import TooltipButton from '.';

/** @test {TooltipButton} */
describe('TooltipButton', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TooltipButton />, div);
  });

  test('should change the state on click', () => {
    const wrapper = shallow(<TooltipButton />);
    wrapper.find('.openBox').simulate('click');
    expect(wrapper.state('open')).toBe(true);
  });
});
