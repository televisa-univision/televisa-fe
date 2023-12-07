import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as hooks from 'react-redux';
import { mount } from 'enzyme';
import RegistrationContainer from '.';
import {
  LANDING,
  REGISTRATION_FORM,
  WELCOME,
  MVPD,
  GEOLOCATION,
  LOGIN_WITH_EMAIL,
  FORGOT_PASSWORD,
  RECOVERY_PASSWORD,

} from '../RegistrationConfiguration';

const store = configureStore();

const mockTheme = {
  page: {
    theme: {
      registration: {
        primary: '#000',
        gradient: {
          start: '#000',
          end: '#000',
        },
        welcomeIcon: 'tudn',
      },
    },
  },
};

describe('ContainerRegistration component tests', () => {
  let mockUseSelector;

  beforeEach(() => {
    mockUseSelector = jest.spyOn(hooks, 'useSelector');
  });
  it('renders without crashing', () => {
    mockUseSelector.mockImplementation(callback => callback(mockTheme));
    const div = document.createElement('div');
    ReactDOM.render(<RegistrationContainer />, div);
  });
  it('should render with LANDING component', () => {
    const fn = jest.fn(() => jest.fn());
    const wrapper = mount(
      <Provider store={store}>
        <RegistrationContainer contentToShow={LANDING} setContentToShow={fn} />
      </Provider>
    );
    expect(wrapper.find('Landing__Wrapper')).toHaveLength(1);
    act(() => {
      wrapper.find('Landing__LoginWithEmail').simulate('click');
    });
    wrapper.update();
    expect(fn).toHaveBeenCalled();
  });
  it('should render with REGISTRATION_FORM component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <RegistrationContainer contentToShow={REGISTRATION_FORM} />
      </Provider>
    );
    expect(wrapper.find('RegistrationForm__Wrapper')).toHaveLength(1);
  });
  it('should render with WELCOME component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <RegistrationContainer contentToShow={WELCOME} />
      </Provider>
    );
    expect(wrapper.find('Welcome__Wrapper')).toHaveLength(1);
  });
  it('should render with MVPD component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <RegistrationContainer contentToShow={MVPD} />
      </Provider>
    );
    expect(wrapper.find('Mvpd__Wrapper')).toHaveLength(1);
  });
  it('should render with GEOLOCATION component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <RegistrationContainer contentToShow={GEOLOCATION} />
      </Provider>
    );
    expect(wrapper.find('Geolocation__Wrapper')).toHaveLength(1);
  });
  it('should render with LOGIN_WITH_EMAIL component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <RegistrationContainer contentToShow={LOGIN_WITH_EMAIL} />
      </Provider>
    );
    expect(wrapper.find('LoginWithEmail__Wrapper')).toHaveLength(1);
  });
  it('should render with FORGOT_PASSWORD component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <RegistrationContainer contentToShow={FORGOT_PASSWORD} />
      </Provider>
    );
    expect(wrapper.find('ForgotPassword__Wrapper')).toHaveLength(1);
  });
  it('should render with RECOVERY_PASSWORD component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <RegistrationContainer contentToShow={RECOVERY_PASSWORD} />
      </Provider>
    );
    expect(wrapper.find('RecoveryPassword__Wrapper')).toHaveLength(1);
  });
});
