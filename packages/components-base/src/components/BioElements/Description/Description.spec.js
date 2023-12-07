import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import Description from '.';

/** @test {Description for bio elements} */
describe('BioDesciption', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const button = (<Description>foo</Description>);
    ReactDOM.render(button, div);
  });

  it('should return null if children is not set', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<Description />);
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('should render text', () => {
    const wrapper = mount(<Description>foo</Description>);
    expect(wrapper.text()).toBe('foo');
  });

  it('should render text with tags', () => {
    const wrapper = mount(<Description><p>foo</p></Description>);
    expect(wrapper.text()).toBe('foo');
  });
});
