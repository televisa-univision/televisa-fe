/* eslint-disable require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import * as hooks from 'react-redux';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Landing from '.';

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
    ReactDOM.render(<Landing />, div);
  });

  it('should back to REGISTRATION_FORM correctly', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Landing navigateToPage={fn} />);
    act(() => {
      wrapper.find('Button').at(0).simulate('click');
    });
    wrapper.update();
    expect(fn).toHaveBeenCalled();
  });

  it('should not crash if function does not exist', () => {
    const wrapper = shallow(<Landing />);
    act(() => {
      wrapper.find('Button').at(0).simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('Landing__Wrapper')).toHaveLength(1);
  });
});
