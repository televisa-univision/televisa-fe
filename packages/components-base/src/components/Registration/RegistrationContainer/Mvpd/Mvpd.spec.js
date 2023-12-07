/* eslint-disable require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import * as hooks from 'react-redux';
import Mvpd from '.';

const mockTheme = {
  page: {
    theme: {
      registration: {
        primary: '#000',
        gradient: null,
        welcomeIcon: 'tudn',
      },
    },
  },
};

describe('Landing component tests', () => {
  let mockUseSelector;

  beforeEach(() => {
    mockUseSelector = jest.spyOn(hooks, 'useSelector');
  });
  it('renders without crashing', () => {
    mockUseSelector.mockImplementation(callback => callback(mockTheme));
    const div = document.createElement('div');
    ReactDOM.render(<Mvpd />, div);
  });
  it('should without props', () => {
    const wrapper = shallow(<Mvpd />);
    act(() => {
      wrapper.find('Mvpd__Title').simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('Mvpd__Title')).toHaveLength(1);
  });
  it('should call func correctly', () => {
    const fn = jest.fn(() => jest.fn());
    const wrapper = shallow(<Mvpd navigateToPage={fn} />);
    act(() => {
      wrapper.find('Mvpd__Title').simulate('click');
    });
    wrapper.update();
    expect(fn).toHaveBeenCalled();
  });
});
