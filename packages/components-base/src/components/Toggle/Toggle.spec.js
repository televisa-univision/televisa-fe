import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Toggle from '.';

describe('Tooltip component tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Toggle />, div);
  });
  it('should exe func correctly', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Toggle onClick={fn} />);
    act(() => {
      wrapper.find('Toggle__Container').simulate('click');
    });
    wrapper.update();
    expect(fn).toHaveBeenCalled();
  });
  it('should render without crashing when dont have even onclick', () => {
    const wrapper = shallow(<Toggle onClick={null} />);
    act(() => {
      wrapper.find('Toggle__Container').simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('Toggle__Container')).toHaveLength(1);
  });
});
