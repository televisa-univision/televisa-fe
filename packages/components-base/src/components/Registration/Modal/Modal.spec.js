/* eslint-disable require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import * as hooks from 'react-redux';
import { act } from 'react-dom/test-utils';
import Modal from '.';

const mockTheme = {
  page: {
    theme: {
      registration: {
        primary: '#000',
        gradient: {
          start: '#000',
        },
        welcomeIcon: 'tudn',
      },
    },
  },
};

describe('Modal component tests', () => {
  let mockUseSelector;

  beforeEach(() => {
    mockUseSelector = jest.spyOn(hooks, 'useSelector');
  });
  it('renders without crashing', () => {
    mockUseSelector.mockImplementation(callback => callback(mockTheme));
    const div = document.createElement('div');
    ReactDOM.render(<Modal />, div);
  });
  it('should show default Modal', () => {
    const wrapper = mount(<Modal onClick={null} />);
    act(() => {
      wrapper.find('Button').simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('Modal__ModalWrapper')).toHaveLength(1);
  });
  it('should exe function correctly', () => {
    const fn = jest.fn();
    const wrapper = mount(<Modal onClick={fn} />);
    act(() => {
      wrapper.find('Button').simulate('click');
    });
    wrapper.update();
    expect(fn).toHaveBeenCalled();
  });
});
