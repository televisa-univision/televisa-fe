import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import StrippedBackground from '.';

/** @test {StrippedBackground for bio elements} */
describe('StrippedBackground', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const button = (<StrippedBackground />);
    ReactDOM.render(button, div);
  });

  it('should render the background', () => {
    const wrapper = mount(<StrippedBackground />);
    expect(wrapper.find('StrippedBackground__StrippedImage').html()).toBeDefined();
  });
});
