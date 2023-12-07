/* eslint-disable require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import * as hooks from 'react-redux';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Geolocation from '.';

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

describe('Geolocation component tests', () => {
  let mockUseSelector;

  beforeEach(() => {
    mockUseSelector = jest.spyOn(hooks, 'useSelector');
  });
  it('renders without crashing', () => {
    mockUseSelector.mockImplementation(callback => callback(mockTheme));
    const div = document.createElement('div');
    ReactDOM.render(<Geolocation />, div);
  });

  it('should exe function correctly', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Geolocation navigateToPage={fn} />);
    act(() => {
      wrapper.find('TitleBack').simulate('click');
    });
    wrapper.update();
    expect(fn).toHaveBeenCalled();
  });
  it('should render without crash if func does not exist', () => {
    const wrapper = shallow(<Geolocation />);
    act(() => {
      wrapper.find('TitleBack').simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('TitleBack')).toHaveLength(1);
  });
});
