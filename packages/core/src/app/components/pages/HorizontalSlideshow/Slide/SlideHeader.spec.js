import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SlideHeader from './SlideHeader';

/** @test {SlideHeader} */
describe('SlideHeader', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(React.createElement(SlideHeader), div);
  });

  it('should render a Meta if available', () => {
    const wrapper = shallow(<SlideHeader meta={{ author: 'alejandro' }} />);
    expect(wrapper.find('Meta')).toHaveLength(1);
  });
});
