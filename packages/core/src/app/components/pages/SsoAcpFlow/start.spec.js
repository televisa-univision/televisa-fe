import LocalStorage from '@univision/fe-utilities/storage/localStorage';
import initiateAcpClientFlow from './start';
import { SSO_ACP_STORAGE_KEYS } from '../../../../server/constants/sso';

const origin = 'https://univision.com';
const search = '?code=ZZZ&redirectUri=https://tudn.com&flow=acp&service=https://graphql.univision.com/auth/tokens';
const data = {
  accessToken: 'AAA',
  refreshToken: 'RRR',
  idToken: 'III',
  continuation: 'https://univision.com',
};

describe('initiateAcpClientFlow', () => {
  let location;
  beforeEach(() => {
    location = window.location;
    delete window.location;
    // eslint-disable-next-line no-underscore-dangle
    window.__INITIAL_STATE__ = {
      graphql: 'test',
    };
    window.location = {
      href: origin,
      replace: jest.fn(),
      search,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line no-global-assign
    window.location = location;
    LocalStorage.clear();
  });

  it('should redirect to univision.com if invalid search path is received', () => {
    window.location.search = undefined;
    initiateAcpClientFlow();
    expect(window.location.replace).toHaveBeenCalledWith(origin);
  });

  it('should redirect when expected query params are invalid', () => {
    window.location.search = '?code=ZZZ';
    initiateAcpClientFlow();
    expect(window.location.replace).toHaveBeenCalled();
    jest.clearAllMocks();
  });

  it('should redirect to univision.com if redirectUri is not provided', () => {
    window.location.search = '?';
    initiateAcpClientFlow();
    expect(window.location.replace).toHaveBeenCalledWith(origin);
  });

  it('should redirect to redirectUri when it was provided and something is wrong', () => {
    window.location.search = '?redirectUri=https://test.com';
    initiateAcpClientFlow();
    expect(window.location.replace).toHaveBeenCalledWith('https://test.com');
  });

  it('should redirect to redirectUri if authCode was already used in this site', () => {
    LocalStorage.set(SSO_ACP_STORAGE_KEYS.AUTH_CODE, 'ZZZ');
    initiateAcpClientFlow();
    expect(window.location.replace).toHaveBeenCalled();
  });

  it('should store requested tokens using the service query param', async () => {
    expect.assertions(3);
    const fetchResponse = {
      statusText: 'status',
      ok: true,
      json: () => Promise.resolve({
        data: { getTokens: data },
      }),
    };
    global.fetch = () => Promise.resolve(fetchResponse);
    await initiateAcpClientFlow();

    expect(LocalStorage.get(SSO_ACP_STORAGE_KEYS.ACCESS_TOKEN)).toEqual(data.accessToken);
    expect(LocalStorage.get(SSO_ACP_STORAGE_KEYS.REFRESH_TOKEN)).toEqual(data.refreshToken);
    expect(LocalStorage.get(SSO_ACP_STORAGE_KEYS.ID_TOKEN)).toEqual(data.idToken);
  });

  it('should store auth code after it was successful used', async () => {
    expect.assertions(1);
    const fetchResponse = {
      statusText: 'status',
      ok: true,
      json: () => Promise.resolve({
        data: { getTokens: data },
      }),
    };
    global.fetch = () => Promise.resolve(fetchResponse);
    await initiateAcpClientFlow();

    expect(LocalStorage.get(SSO_ACP_STORAGE_KEYS.AUTH_CODE)).toEqual('ZZZ');
  });

  it('should redirect to continuation URL after store requested tokens', async () => {
    expect.assertions(1);
    const fetchResponse = {
      statusText: 'status',
      ok: true,
      json: () => Promise.resolve({
        data: { getTokens: data },
      }),
    };
    global.fetch = () => Promise.resolve(fetchResponse);
    await initiateAcpClientFlow();

    expect(window.location.replace).toHaveBeenCalledWith(data.continuation);
  });

  it('should redirect out when parsing the body give error ', async () => {
    expect.assertions(1);
    const fetchResponse = {
      statusText: 'status',
      json: () => Promise.reject(),
    };
    global.fetch = () => Promise.resolve(fetchResponse);
    await initiateAcpClientFlow();

    expect(window.location.replace).toHaveBeenCalledWith('https://tudn.com');
  });

  it('should redirect out when response is not status 200', async () => {
    expect.assertions(1);
    const fetchResponse = {
      statusText: 'status',
      ok: false,
      json: () => Promise.resolve({
        data: { getTokens: data },
      }),
    };
    global.fetch = () => Promise.resolve(fetchResponse);
    await initiateAcpClientFlow();

    expect(window.location.replace).toHaveBeenCalledWith('https://tudn.com');
  });

  it('should redirect out when response bring errors', async () => {
    expect.assertions(1);
    const fetchResponse = {
      statusText: 'status',
      ok: true,
      json: () => Promise.resolve({
        errors: [{}],
      }),
    };
    global.fetch = () => Promise.resolve(fetchResponse);
    await initiateAcpClientFlow();

    expect(window.location.replace).toHaveBeenCalledWith('https://tudn.com');
  });
});
