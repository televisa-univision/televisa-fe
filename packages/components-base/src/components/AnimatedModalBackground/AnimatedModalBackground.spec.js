import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import AnimatedModalBackground from '.';

/** @test {AnimatedModalBackground} */
describe('AnimatedModalBackground', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const el = (
      <AnimatedModalBackground isVisible />
    );
    ReactDOM.render(el, div);
  });

  it('should not render the modal background', () => {
    const wrapper = mount(<AnimatedModalBackground />);
    expect(wrapper.find('PresenceChild').length).toEqual(0);
  });

  it('should render the modal background', () => {
    const wrapper = mount(<AnimatedModalBackground isVisible />);
    expect(wrapper.find('PresenceChild').length).toEqual(1);
  });
});
