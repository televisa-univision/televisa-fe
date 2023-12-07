import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import Title from '.';

/** @test {Title for bio elements} */
describe('BioTitle', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const button = (<Title>foo</Title>);
    ReactDOM.render(button, div);
  });

  it('should return null if children is not set', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<Title />);
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('should render text', () => {
    const wrapper = mount(<Title>foo</Title>);
    expect(wrapper.text()).toBe('foo');
  });
});
