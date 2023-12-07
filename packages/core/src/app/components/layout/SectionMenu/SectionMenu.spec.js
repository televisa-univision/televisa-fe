import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import SectionMenu from './SectionMenu';

let wrapper;

beforeAll(() => {
  wrapper = shallow(<SectionMenu className="blabblahblah" label="Hello World" />);
});

/** @test {SectionMenu} */
describe('SectionMenu', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SectionMenu className="blabblahblah" label="Hello World" />, div);
  });

  test('renders a Button component', () => {
    const button = wrapper.children().first();
    expect(button).toBeDefined();
    expect(wrapper.find('Button')).toBeTruthy();
  });

  test('passes the onClick function to Button component', () => {
    const button = wrapper.children().first();
    expect(button.props().onClick()).toBe('Section Menu Button clicked!');
  });

  test('renders label prop in a <span> element', () => {
    const span = wrapper.find('span');
    expect(span.text()).toBe('Hello World');
  });

  test('renders the className prop', () => {
    expect(wrapper.hasClass('blabblahblah')).toBeTruthy();
  });
});
