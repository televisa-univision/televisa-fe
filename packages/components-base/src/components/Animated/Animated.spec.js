import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Animated from '.';

/** @test {Animated} */
describe('Animated', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const el = (
      <Animated isVisible />
    );
    ReactDOM.render(el, div);
  });

  it('should not render the modal background', () => {
    const wrapper = mount(<Animated><div /></Animated>);
    expect(wrapper.find('PresenceChild').length).toEqual(0);
  });

  it('should render the modal background', () => {
    const wrapper = mount(<Animated isVisible><div /></Animated>);
    expect(wrapper.find('PresenceChild').length).toEqual(1);
  });
});
