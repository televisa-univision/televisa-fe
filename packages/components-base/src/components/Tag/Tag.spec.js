import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Tag from '.';

/** @test {Tag} */
describe('Tag', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Tag name="Noticias" link="https://univision.com/noticias" />, div);
  });
  it('should not render link tag if not link provided', () => {
    const wrapper = shallow(<Tag name="Noticias" />);
    expect(wrapper.find('Link').length).toBe(0);
  });
});
