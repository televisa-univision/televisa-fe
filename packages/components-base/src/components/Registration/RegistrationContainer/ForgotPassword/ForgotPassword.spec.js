/* eslint-disable require-jsdoc */
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as hooks from 'react-redux';
import { shallow } from 'enzyme';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { act } from 'react-dom/test-utils';
import ForgotPassword from '.';
import Modal from '../../Modal';

const handleRegistration = jest.fn();

const store = configureStore();

const mockTheme = {
  page: {
    theme: {
      registration: {
        primary: '#000',
        welcomeIcon: 'tudn',
        gradient: {
          start: '#000',
          end: '#000',
        },
      },
    },
  },
};
const ShallowMock = (Component, props) => {
  return React.cloneElement(
    Component,
    props,
  );
};

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  const mUseRef = jest.fn();
  return {
    ...originReact,
    useRef: mUseRef,
  };
});

describe('ForgotPassword component tests', () => {
  let mockUseSelector;

  beforeEach(() => {
    mockUseSelector = jest.spyOn(hooks, 'useSelector');
  });
  it('renders without crashing', () => {
    mockUseSelector.mockImplementation(callback => callback(mockTheme));
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><ForgotPassword /></Provider>, div);
  });
  it('should render validate form correctly empty', () => {
    const mRef = {
      current:
      {
        password: {
          value: '',
        },
      },
    };
    useRef.mockReturnValueOnce(mRef);
    const wrapper = shallow(ShallowMock(<ForgotPassword />, store));
    act(() => {
      wrapper.find('ForgotPassword__Form').simulate('submit', { preventDefault () {} });
    });
    wrapper.update();
    expect(wrapper.find('InputField').at(0).props().error).toBe(localization.get('registrationWrongEmail'));
  });
  it('should render validate form correctly fullfilled', () => {
    const fn = jest.fn();
    const mRef = {
      current:
      {
        email: {
          value: 'example@email.com',
        },
      },
    };
    useRef.mockReturnValueOnce(mRef);
    handleRegistration.mockReturnValueOnce(() => true);
    const wrapper = shallow(ShallowMock(<ForgotPassword navigateToPage={fn} />, store));
    act(() => {
      wrapper.find('ForgotPassword__Form').simulate('submit', { preventDefault () {} });
    });
    wrapper.update();
    expect(wrapper.find('InputField').at(0).props().error).toBe(null);
  });

  it('should back to exe correctly', () => {
    const fn = jest.fn(() => jest.fn());
    const wrapper = shallow(ShallowMock(<ForgotPassword navigateToPage={fn} />, store));
    act(() => {
      wrapper.find('TitleBack').simulate('click');
    });
    wrapper.update();
    expect(fn).toHaveBeenCalled();
  });

  it('should open modal and close it', () => {
    const fn = jest.fn();
    const mRef = {
      current:
      {
        email: {
          value: 'example@email.com',
        },
      },
    };
    useRef.mockReturnValueOnce(mRef);
    handleRegistration.mockReturnValueOnce(() => true);
    const wrapper = shallow(ShallowMock(<ForgotPassword navigateToPage={fn} />, store));
    act(() => {
      wrapper.find('ForgotPassword__Form').simulate('submit', { preventDefault () {} });
    });
    wrapper.update();
    expect(wrapper.find('InputField').at(0).props().error).toBe(null);
    const modal = wrapper.find(Modal);
    expect(modal).toHaveLength(1);
    act(() => {
      modal.simulate('click', { preventDefault () {} });
    });
    wrapper.update();
    expect(fn).toHaveBeenCalled();
  });

  it('should validate when is function does not exist', () => {
    const fn = null;
    const mRef = {
      current:
      {
        email: {
          value: 'example@email.com',
        },
      },
    };
    useRef.mockReturnValueOnce(mRef);
    handleRegistration.mockReturnValueOnce(() => true);
    const wrapper = shallow(ShallowMock(<ForgotPassword navigateToPage={fn} />, store));
    act(() => {
      wrapper.find('ForgotPassword__Form').simulate('submit', { preventDefault () {} });
    });
    wrapper.update();
    expect(wrapper.find('InputField').at(0).props().error).toBe(null);
    const modal = wrapper.find(Modal);
    act(() => {
      modal.simulate('click', { preventDefault () {} });
    });
    wrapper.update();
    act(() => {
      wrapper.find('TitleBack').simulate('click');
    });
    wrapper.update();
    expect(modal).toHaveLength(1);
  });
});
