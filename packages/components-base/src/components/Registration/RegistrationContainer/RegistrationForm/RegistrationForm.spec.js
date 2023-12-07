/* eslint-disable require-jsdoc */
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as hooks from 'react-redux';
import { shallow } from 'enzyme';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { act } from 'react-dom/test-utils';
import RegistrationForm from '.';

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

describe('RegistrationForm component tests', () => {
  let mockUseSelector;

  beforeEach(() => {
    mockUseSelector = jest.spyOn(hooks, 'useSelector');
  });
  it('renders without crashing', () => {
    mockUseSelector.mockImplementation(callback => callback(mockTheme));
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><RegistrationForm /></Provider>, div);
  });
  it('should render validate form correctly empty', () => {
    const fn = jest.fn();
    const mRef = {
      current:
      {
        name: {
          value: '',
        },
        email: {
          value: '',
        },
        password: {
          value: '',
        },
      },
    };
    useRef.mockReturnValueOnce(mRef);
    const wrapper = shallow(ShallowMock(<RegistrationForm navigateToPage={fn} />, store));
    act(() => {
      wrapper.find('RegistrationForm__Form').simulate('submit', { preventDefault () {} });
    });
    wrapper.update();
    expect(wrapper.find('InputField').at(0).props().error).toBe(localization.get('registrationWrongName'));
    expect(wrapper.find('InputField').at(1).props().error).toBe(localization.get('registrationWrongEmail'));
    expect(wrapper.find('InputField').at(2).props().error).toBe(localization.get('registrationWrongPass'));
  });
  it('should render validate form correctly fullfilled', () => {
    const fn = jest.fn();
    const mRef = {
      current:
      {
        name: {
          value: 'Name Lastname',
        },
        email: {
          value: 'example@email.com',
        },
        password: {
          value: {
            length: 10,
          },
        },
      },
    };
    useRef.mockReturnValueOnce(mRef);
    handleRegistration.mockReturnValueOnce(() => true);
    const wrapper = shallow(ShallowMock(<RegistrationForm navigateToPage={fn} />, store));
    act(() => {
      wrapper.find('RegistrationForm__Form').simulate('submit', { preventDefault () {} });
    });
    wrapper.update();
    expect(wrapper.find('InputField').at(0).props().error).toBe(null);
    expect(wrapper.find('InputField').at(1).props().error).toBe(null);
    expect(wrapper.find('InputField').at(2).props().error).toBe(null);
  });

  it('should title back function to exe correctly', () => {
    const fn = jest.fn();
    const wrapper = shallow(ShallowMock(<RegistrationForm navigateToPage={fn} />, store));
    act(() => {
      wrapper.find('TitleBack').simulate('click');
    });
    wrapper.update();
    expect(fn).toHaveBeenCalled();
  });

  it('should render without crash if function does not exist when title clicked', () => {
    const wrapper = shallow(ShallowMock(<RegistrationForm />, store));
    act(() => {
      wrapper.find('TitleBack').simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('TitleBack')).toHaveLength(1);
  });
  it('should render without crash when function is null to exe correctly', () => {
    const mRef = {
      current:
      {
        name: {
          value: 'Name Lastname',
        },
        email: {
          value: 'example@email.com',
        },
        password: {
          value: {
            length: 10,
          },
        },
      },
    };
    useRef.mockReturnValueOnce(mRef);
    handleRegistration.mockReturnValueOnce(() => true);
    const wrapper = shallow(ShallowMock(<RegistrationForm />, store));
    act(() => {
      wrapper.find('RegistrationForm__Form').simulate('submit', { preventDefault () {} });
    });
    wrapper.update();
    expect(wrapper.find('InputField').at(0).props().error).toBe(null);
    expect(wrapper.find('InputField').at(1).props().error).toBe(null);
    expect(wrapper.find('InputField').at(2).props().error).toBe(null);
  });
});
