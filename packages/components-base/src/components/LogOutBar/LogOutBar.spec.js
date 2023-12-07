import React from 'react';
import { shallow, mount } from 'enzyme';

import SessionStorage from '@univision/fe-commons/dist/utils/helpers/SessionStorage';

import LogOutBar from '.';

describe('LogOutBar', () => {
  beforeEach(() => {
    window.Adobe = {
      AccessEnabler: jest.fn(() => ({
        setRequestor: jest.fn(),
        logout: jest.fn(),
        checkAuthentication: jest.fn(),
      })),
    };
  });
  it('renders as expected when user is logged in', () => {
    const wrapper = shallow(<LogOutBar />);
    wrapper.setState({ loggedIn: true });
    expect(wrapper.find('LogOutBar__WrapperStyled')).toHaveLength(1);
  });

  it('renders null when user is not logged in', () => {
    const wrapper = shallow(<LogOutBar />);
    expect(wrapper.find('LogOutBar__WrapperStyled')).toHaveLength(0);
  });

  it('should get data from SessionStorage', () => {
    const data = {
      loggedIn: true,
      logo: 'logo.jpg',
      providerName: 'provider',
    };

    SessionStorage.setObject('mvpdData', data);
    const wrapper = shallow(<LogOutBar />);
    wrapper.instance().onLoggedIn();
    expect(wrapper.state('loggedIn')).toBeTruthy();
    expect(wrapper.state('logo')).toBe(data.logo);
    expect(wrapper.state('providerName')).toBe(data.providerName);
  });

  it('should get data from mvpdLoginCompleted if not in SessionStorage (has brandingLogo)', () => {
    const data = {
      apiData: {
        displayName: 'provider',
        logo: 'logo.jpg',
      },
    };

    const wrapper = shallow(<LogOutBar />);
    window.dispatchEvent(new CustomEvent('mvpdLoginCompleted', { detail: data }));
    expect(wrapper.state('loggedIn')).toBeTruthy();
    expect(wrapper.state('logo')).toBe(data.apiData.logo);
    expect(wrapper.state('providerName')).toBe(data.apiData.displayName);
  });

  it('should remove mvpdLoginCompleted listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const wrapper = shallow(<LogOutBar />);
    wrapper.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });

  it('should call setUserLogIn when even mvpdLoginCompleted', () => {
    const data = {
      editorialData: {
        brandingLogo: 'logo.jpg',
        brandingLogoWhite: 'logo-white.jpg',
      },
      apiData: {
        displayName: 'provider',
      },
    };
    const logInAction = jest.fn();
    const wrapper = shallow(<LogOutBar setUserLogIn={logInAction} />);
    window.dispatchEvent(new CustomEvent('mvpdLoginCompleted', { detail: data }));
    expect(wrapper.state('logo')).toBe(data.editorialData.brandingLogo);
    expect(logInAction).toHaveBeenCalled();
  });

  it('should logout when adobepass already loaded', () => {
    const logOutAction = jest.fn();
    const wrapper = shallow(<LogOutBar setUserLogOut={logOutAction} />);
    wrapper.setState({ loggedIn: true });
    window.ae = {
      logout: jest.fn(),
    };

    wrapper.instance().onLogout();
    expect(window.ae.logout).toBeCalled();
    expect(logOutAction).toHaveBeenCalled();
  });

  it('should logout and reload if izzi', () => {
    const logOutAction = jest.fn();
    const data = {
      loggedIn: true,
      logo: 'logo.jpg',
      providerName: 'izzi',
      providerId: 'izzi',
      link: null,
    };

    SessionStorage.setObject('mvpdData', data);
    const wrapper = shallow(<LogOutBar setUserLogOut={logOutAction} />);
    wrapper.setState({ loggedIn: true });
    window.ae = {
      logout: jest.fn(),
    };
    const reloadFn = jest.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadFn },
    });

    wrapper.instance().onLogout();
    expect(window.ae.logout).toBeCalled();
    expect(logOutAction).toHaveBeenCalled();
    expect(reloadFn).toHaveBeenCalled();
  });

  it('should logout when adobepass is not loaded', () => {
    const wrapper = shallow(<LogOutBar />);
    wrapper.setState({ loggedIn: true });

    const module = jest.requireActual('@univision/fe-commons/dist/utils/helpers');
    module.loadExternalScript = jest.fn();
    module.loadExternalScript.mockImplementation((obj) => {
      window.setAuthenticationStatus = jest.fn();
      obj.onLoad();

      window.ae = {
        logout: jest.fn(),
        setRequestor: jest.fn(),
        checkAuthentication: jest.fn(),
      };

      window.entitlementLoaded();
      window.sendTrackingData();
      window.setAuthenticationStatus(1);
      expect(window.ae.logout).toBeCalled();
    });

    window.ae = null;
    wrapper.instance().onLogout();
  });

  it('should not logout when adobepass doesn\'t exist', () => {
    const wrapper = shallow(<LogOutBar />);
    wrapper.setState({ loggedIn: true });

    const module = jest.requireActual('@univision/fe-commons/dist/utils/helpers');
    module.loadExternalScript = jest.fn();
    module.loadExternalScript.mockImplementation((obj) => {
      delete window.Adobe.AccessEnabler;
      window.setAuthenticationStatus = jest.fn();
      obj.onLoad();

      window.ae = {
        logout: jest.fn(),
        setRequestor: jest.fn(),
        checkAuthentication: jest.fn(),
      };

      const saved = Object.assign({}, window.ae);
      delete window.ae;

      window.entitlementLoaded();
      window.sendTrackingData();
      window.setAuthenticationStatus(1);
      expect(saved.logout).not.toBeCalled();
    });

    window.ae = null;
    wrapper.instance().onLogout();
  });

  it('should logout when adobepass is not loaded and do not keep old autentication fn', () => {
    const wrapper = shallow(<LogOutBar />);
    wrapper.setState({ loggedIn: true });

    const module = jest.requireActual('@univision/fe-commons/dist/utils/helpers');
    module.loadExternalScript = jest.fn();
    module.loadExternalScript.mockImplementation((obj) => {
      window.setAuthenticationStatus = null;
      obj.onLoad();

      window.ae = {
        logout: jest.fn(),
        setRequestor: jest.fn(),
        checkAuthentication: jest.fn(),
      };

      window.entitlementLoaded();
      window.setAuthenticationStatus(1);
      expect(window.ae.logout).toBeCalled();
    });

    window.ae = null;
    wrapper.instance().onLogout();
  });

  it('should not logout when adobepass is not loaded but user is not logged in', () => {
    const wrapper = shallow(<LogOutBar />);
    wrapper.setState({ loggedIn: true });

    const module = jest.requireActual('@univision/fe-commons/dist/utils/helpers');
    module.loadExternalScript = jest.fn();
    module.loadExternalScript.mockImplementation((obj) => {
      obj.onLoad();

      window.ae = {
        logout: jest.fn(),
      };

      window.setAuthenticationStatus(0);
      expect(window.ae.logout).not.toBeCalled();
    });

    window.ae = null;
    wrapper.instance().onLogout();
  });

  it('should render mvpd provider logo with variant light prop', () => {
    const data = {
      loggedIn: true,
      logo: 'logo.jpg',
      providerName: 'provider',
      link: null,
    };

    SessionStorage.setObject('mvpdData', data);
    const wrapper = mount(<LogOutBar variant="light" />);
    wrapper.instance().onLoggedIn();
    expect(wrapper.find('LogOutBar__ImageStyled').props()).toHaveProperty('src', 'logo.jpg');
    expect(wrapper.find('LogOutBar__SpanStyled').first().text()).toBe('Cerrar sesión');
    expect(wrapper.find('LogOutBar__SpanStyled').last().text()).toBe('Conectado con:');
  });

  it('should render mvpd provider with link logo with variant light prop', () => {
    const data = {
      loggedIn: true,
      logo: 'logo.jpg',
      providerName: 'provider',
      link: 'www.test.com',
    };

    SessionStorage.setObject('mvpdData', data);
    const wrapper = mount(<LogOutBar variant="light" />);
    wrapper.instance().onLoggedIn();
    expect(wrapper.find('Link').props()).toHaveProperty('href', 'www.test.com');
  });

  it('should render mvpd provider logo with variant dark prop', () => {
    const data = {
      loggedIn: true,
      logoWhite: 'logoWhite.jpg',
      providerName: 'provider',
    };

    SessionStorage.setObject('mvpdData', data);
    const wrapper = mount(<LogOutBar variant="dark" />);
    wrapper.instance().onLoggedIn();
    expect(wrapper.find('LogOutBar__ImageStyled').props()).toHaveProperty('src', 'logoWhite.jpg');
    expect(wrapper.find('LogOutBar__SpanStyled').first().text()).toBe('Conectado con:');
  });

  it('should render mvpd provider logo with default variant prop', () => {
    const data = {
      loggedIn: true,
      logo: 'logo.jpg',
      providerName: 'provider',
    };

    SessionStorage.setObject('mvpdData', data);
    const wrapper = mount(<LogOutBar variant="default" />);
    wrapper.instance().onLoggedIn();
    expect(wrapper.find('LogOutBar__ImageStyled')).toHaveLength(0);
    expect(wrapper.find('LogOutBar__SpanStyled').first().text()).toBe('Sesión iniciada. Haz click aqui para cerrar sesión.');
  });

  it('should call setUserLogIn if logged in', () => {
    const data = {
      loggedIn: true,
      logo: 'logo.jpg',
      providerName: 'provider',
    };

    SessionStorage.setObject('mvpdData', data);
    const logInAction = jest.fn();
    const wrapper = mount(<LogOutBar variant="default" setUserLogIn={logInAction} />);
    wrapper.instance().onLoggedIn();
    expect(logInAction).toHaveBeenCalled();
  });
});
