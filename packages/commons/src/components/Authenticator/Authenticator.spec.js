import React from 'react';
import { create, act } from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import * as reactRedux from 'react-redux';
import * as userActions from '../../store/slices/user/user-actions';
import * as ssoIFrameLocalStorage from '../../utils/helpers/SsoIFrameLocalStorage';
import Authenticator from '.';

const mockStore = configureMockStore([]);

const { Provider } = reactRedux;
let store;
const state = {
  page: {
    config: {
      ssoIframeUrl: 'https://www.univision.com/sso-iframe',
      deploy: {
        buildMode: 'production',
      },
    },
    requestParams: {
      ssoEnabled: 'false',
    },
  },
};
const enabledSsoState = {
  page: {
    ...state.page,
    requestParams: {
      ssoEnabled: 'true',
    },
  },
};

describe('Authenticator', () => {
  beforeEach(() => {
    store = mockStore(state);
    jest.spyOn(userActions, 'fetchAnonUser').mockImplementationOnce(() => ({ type: 'test' }));
    jest.spyOn(ssoIFrameLocalStorage, 'init').mockImplementationOnce(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render without crashing', () => {
    let component;
    act(() => {
      component = create(
        <Provider store={store}>
          <Authenticator />
        </Provider>
      );
    });
    expect(component.root).toBeDefined();
  });

  it('should fetch anonymous user data', () => {
    act(() => {
      create(
        <Provider store={store}>
          <Authenticator />
        </Provider>
      );
    });

    expect(store.getActions()[0]).toEqual({ type: 'test' });
  });

  it('should not render the iframe when SSO flag is disabled', () => {
    let component;
    act(() => {
      component = create(
        <Provider store={store}>
          <Authenticator />
        </Provider>
      );
    });

    const iframe = component.root.findByType(Authenticator);
    expect(iframe.children).toEqual([]);
  });

  describe('ssoEnabled', () => {
    beforeEach(() => {
      store = mockStore(enabledSsoState);
    });

    it('should render an iframe with the right properties', () => {
      let component;
      act(() => {
        component = create(
          <Provider store={store}>
            <Authenticator />
          </Provider>
        );
      });

      const iframe = component.root.findByType('iframe');
      expect(iframe).toBeDefined();
      expect(iframe.props.src).toEqual(state.page.config.ssoIframeUrl);

      // Important to ensure the iframe doesn't show a frame
      expect(iframe.props.width).toEqual(0);
      expect(iframe.props.height).toEqual(0);
      expect(iframe.props.style).toEqual({ display: 'none' });
    });

    it('should create and instance of SsoIFrameLocalStorage', () => {
      let component;
      act(() => {
        component = create(
          <Provider store={store}>
            <Authenticator />
          </Provider>,
          {
            createNodeMock: (el) => {
              if (el.type !== 'iframe') return null;
              return {
                contentWindow: {},
              };
            },
          }
        );
      });

      const iframe = component.root.findByType('iframe');
      expect(iframe).toBeDefined();

      act(() => {
        iframe.props.onLoad();
      });

      expect(store.getActions()[0]).toEqual({ type: 'test' });
      expect(ssoIFrameLocalStorage.init).toHaveBeenCalledWith({}, 'https://www.univision.com');
    });

    it('should not create and instance of SsoIFrameLocalStorage when iframe is not loaded', () => {
      let component;
      act(() => {
        component = create(
          <Provider store={store}>
            <Authenticator />
          </Provider>,
          {
            createNodeMock: (el) => {
              if (el.type !== 'iframe') return null;
              return {
                contentWindow: {},
              };
            },
          }
        );
      });

      const iframe = component.root.findByType('iframe');
      expect(iframe).toBeDefined();

      expect(ssoIFrameLocalStorage.init).not.toHaveBeenCalled();
    });

    it('should not create and instance of SsoIFrameLocalStorage when iframe loading fails', () => {
      let component;
      act(() => {
        component = create(
          <Provider store={store}>
            <Authenticator />
          </Provider>,
          {
            createNodeMock: (el) => {
              if (el.type !== 'iframe') return null;
              return {
                contentWindow: {},
              };
            },
          }
        );
      });

      const iframe = component.root.findByType('iframe');
      expect(iframe).toBeDefined();

      act(() => {
        iframe.props.onError();
      });

      expect(store.getActions()[0]).toEqual({ type: 'test' });
      expect(ssoIFrameLocalStorage.init).not.toHaveBeenCalled();
    });

    it('should work properly if ssoIframeUrl is not valid', () => {
      let component;
      store = mockStore({
        page: {
          requestParams: {
            ssoEnabled: 'true',
          },
          config: {
            deploy: {
              buildMode: 'production',
            },
          },
        },
      });

      act(() => {
        component = create(
          <Provider store={store}>
            <Authenticator />
          </Provider>,
          {
            createNodeMock: (el) => {
              if (el.type !== 'iframe') return null;
              return {
                contentWindow: {},
              };
            },
          }
        );
      });

      const iframe = component.root.findByType('iframe');
      expect(iframe).toBeDefined();

      act(() => {
        iframe.props.onLoad();
      });

      expect(store.getActions()[0]).toEqual({ type: 'test' });
      expect(ssoIFrameLocalStorage.init).toHaveBeenCalledWith({}, '');
    });
  });
});
