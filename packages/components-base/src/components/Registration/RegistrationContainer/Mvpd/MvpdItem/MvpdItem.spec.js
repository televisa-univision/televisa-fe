/* eslint-disable require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import MvpdItem from '.';

describe('MvpdItem component tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MvpdItem logo="test.jpg" />, div);
  });
  it('should back to exe func correctly', () => {
    const fn = jest.fn();
    const wrapper = shallow(<MvpdItem onClick={fn} logo="test.jpg" />);
    act(() => {
      wrapper.simulate('click');
    });
    wrapper.update();
    expect(fn).toHaveBeenCalled();
  });
});
