import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import * as useRegistrationTheme from '@univision/fe-commons/dist/hooks/useRegistrationTheme';

import LoginWithEmail from '.';

describe('RegistrationForm LoginWithEmail', () => {
  let useRegistrationThemeSpy;

  beforeEach(() => {
    useRegistrationThemeSpy = jest.spyOn(useRegistrationTheme, 'default');
    useRegistrationThemeSpy.mockReturnValue(() => ({
      gradient: {
        end: '#ccc',
        start: '#eee',
      },
      primary: '#000',
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginWithEmail />, div);
  });

  it('should handle form submission', () => {
    const wrapper = mount(<LoginWithEmail />);

    act(() => {
      wrapper.find('Button').prop('onClick')();
    });
    wrapper.update();

    expect(
      wrapper.find('InputField#loginEmail-email').prop('error')
    ).toBe('Error: Este no es un formato de correo válido');
  });

  it('should validate email address', () => {
    const event = {
      target: {
        name: 'email',
        value: 'test@test.com',
      },
    };
    const wrapper = mount(<LoginWithEmail />);

    act(() => {
      wrapper.find('InputField#loginEmail-email').prop('onKeyUp')(event);
      wrapper.find('Button').prop('onClick')();
    });
    wrapper.update();

    expect(
      wrapper.find('InputField#loginEmail-email').prop('error')
    ).toBe(undefined);
  });

  it('should validate password', () => {
    const event = {
      target: {
        name: 'password',
        value: 'test',
      },
    };
    const wrapper = mount(<LoginWithEmail />);

    act(() => {
      wrapper.find('InputField#loginEmail-password').prop('onKeyUp')(event);
      wrapper.find('Button').prop('onClick')();
    });
    wrapper.update();

    expect(
      wrapper.find('InputField#loginEmail-password').prop('error')
    ).toBe(undefined);
  });

  it('should to exe function correctly', () => {
    const fn = jest.fn();
    const wrapper = shallow(<LoginWithEmail navigateToPage={fn} />);
    act(() => {
      wrapper.find('LoginWithEmail__ForgotPassword').simulate('click');
    });
    wrapper.update();
    expect(fn).toHaveBeenCalled();
  });

  it('should render without crash if navigateToPage is null', () => {
    const wrapper = shallow(<LoginWithEmail />);
    act(() => {
      wrapper.find('LoginWithEmail__ForgotPassword').simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('LoginWithEmail__ForgotPassword')).toHaveLength(1);
  });

  // TO-DO: Test when the validation has been successful
});
