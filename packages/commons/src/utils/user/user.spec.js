import createUser from '@univision/fe-graphql-services/dist/requests/mutations/createUser';
import consoleLogger from '@univision/fe-utilities/utils/consola';
import ssoAnonUserToken from '.';
import LocalStorage from '../helpers/LocalStorage';
import { ANON_USER_TOKEN_KEY } from '../../constants/personalization';
import * as ssoIFrameLocalStorage from '../helpers/SsoIFrameLocalStorage';
import * as graphql from '../api/graphql';

let fetchSpy;
let state;
const getItemObjectMock = jest.fn();
const setItemObjectMock = jest.fn();
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzBlYjY4Zi1lMGZhLTVlY2MtODg3YS03YzdhNjI2MTQ2ODEiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsImlzcyI6IlVuaXZpc2lvbiJ9.9VbQjeqJJAUZeE8473qF_flUFv7oiXim88U7fZAcCvw';

describe('ssoAnonUserToken', () => {
  beforeEach(() => {
    state = JSON.parse(JSON.stringify({
      page: {
        config: {
          ssoIframeUrl: 'https://www.univision.com/sso-iframe',
          graphql: 'https://graphql.univision.com/graphql',
        },
        requestParams: {},
      },
    }));
    fetchSpy = jest.spyOn(graphql, 'fetchGraphQL').mockImplementation(
      async () => Promise.resolve({
        createUser: { accessToken },
      })
    );

    jest.spyOn(ssoIFrameLocalStorage, 'getInstance').mockReturnValue({
      getItemObject: getItemObjectMock,
      setItemObject: setItemObjectMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    LocalStorage.clear();
  });

  it('should invalid SsoIFrameLocalStorage instance raise an error', async () => {
    expect.assertions(1);
    jest.clearAllMocks();
    jest.spyOn(ssoIFrameLocalStorage, 'getInstance').mockReturnValue(null);
    try {
      await ssoAnonUserToken(state);
    } catch (err) {
      expect(err.message.startsWith('SsoIFrameLocalStorage')).toBeTruthy();
    }
  });

  it('should return queryParamToken', async () => {
    expect.assertions(1);
    state.page.requestParams.uvnUserToken = 'QueryParamToken';
    const result = await ssoAnonUserToken(state);
    expect(result).toEqual('QueryParamToken');
  });

  it('should not store in Storages queryParamToken when tokens are the same', async () => {
    expect.assertions(1);
    jest.spyOn(ssoIFrameLocalStorage, 'getInstance').mockReturnValue({
      getItemObject: () => Promise.resolve({ accessToken: 'QueryParamToken' }),
    });
    state.page.requestParams.uvnUserToken = 'QueryParamToken';
    await ssoAnonUserToken(state);
    expect(setItemObjectMock).not.toHaveBeenCalled();
  });

  it('should !localToken && !iframeToken fetch graphql and save token in both storages', async () => {
    expect.assertions(4);
    const result = await ssoAnonUserToken(state);

    expect(fetchSpy).toHaveBeenCalledWith({
      query: createUser,
      serverUri: state.page.config.graphql,
    });
    expect(LocalStorage.getObject(ANON_USER_TOKEN_KEY).accessToken).toEqual(accessToken);
    expect(setItemObjectMock).toHaveBeenCalledWith(ANON_USER_TOKEN_KEY, { accessToken });
    expect(result).toEqual(accessToken);
  });

  it('should localToken && !iframeToken share the token to the iFrame storage', async () => {
    expect.assertions(2);
    LocalStorage.setObject(ANON_USER_TOKEN_KEY, { accessToken: 'localToken' });
    const result = await ssoAnonUserToken(state);

    expect(setItemObjectMock).toHaveBeenCalledWith(ANON_USER_TOKEN_KEY, { accessToken: 'localToken' });
    expect(result).toEqual('localToken');
  });

  it('should !localToken && iframeToken save the token in Local storage', async () => {
    expect.assertions(2);
    jest.spyOn(ssoIFrameLocalStorage, 'getInstance').mockReturnValue({
      getItemObject: () => Promise.resolve({ accessToken: 'iFrameToken' }),
    });
    const result = await ssoAnonUserToken(state);

    expect(LocalStorage.getObject(ANON_USER_TOKEN_KEY).accessToken).toEqual('iFrameToken');
    expect(result).toEqual('iFrameToken');
  });

  it('should localToken && iframeToken should return the Local token', async () => {
    expect.assertions(1);
    LocalStorage.setObject(ANON_USER_TOKEN_KEY, { accessToken: 'localToken' });
    jest.spyOn(ssoIFrameLocalStorage, 'getInstance').mockReturnValue({
      getItemObject: () => Promise.resolve({ accessToken: 'iFrameToken' }),
    });
    const result = await ssoAnonUserToken(state);

    expect(result).toEqual('localToken');
  });

  it('should logs when ssoLogsEnabled feature flag is true', async () => {
    expect.assertions(1);
    LocalStorage.setObject(ANON_USER_TOKEN_KEY, { accessToken: 'localToken' });
    jest.spyOn(ssoIFrameLocalStorage, 'getInstance').mockReturnValue({
      getItemObject: () => Promise.resolve({ accessToken: 'iFrameToken' }),
    });
    const logFn = jest.spyOn(consoleLogger, 'log').mockImplementationOnce(() => {});
    state.page.requestParams.ssoLogsEnabled = 'true';
    await ssoAnonUserToken(state);

    expect(logFn).toHaveBeenCalled();
  });
});
