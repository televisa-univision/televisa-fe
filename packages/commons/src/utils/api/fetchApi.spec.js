/* eslint-disable no-undef */
import Store from '../../store/store';
import setPageData from '../../store/actions/page-actions';
import * as request from './request';
import * as proxyDefinition from './proxyDefinition';
import fetchApi, {
  fetchAlertApi,
  fetchLocationApi,
  fetchSearchApi,
  fetchSportApi,
  fetchWeatherForecastApi,
  fetchWidgetApi,
  fetchPlaylistApi,
  fetchPlayerTokenApi,
} from './fetchApi';

// mocks
request.default = jest.fn(() => ({ data: {} }));
request.requestServer = jest.fn(() => ({ data: {} }));
proxyDefinition.default = jest.fn(() => ({ data: {} }));
jest.mock('../logging/clientLogging', () => ({
  clientLevelLogging: jest.fn(),
}));

describe('fetchSportApi', () => {
  // create a mock window
  const mockWindow = {
    location: {
      href: '#',
      host: 'localhost',
    },
  };
  // mock the global window object
  const windowSpy = jest.spyOn(global, 'window', 'get');
  windowSpy.mockImplementation(() => mockWindow);
  beforeEach(() => {
    request.default.mockClear();
    request.requestServer.mockClear();
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should call the client request with relative path', () => {
    fetchSportApi('/test-path');
    const callArgs = request.default.mock.calls;
    expect(callArgs[0][0].uri).toBe('/proxy/api/cached/sports/test-path');
  });
  it('should call the client request with performance path in local storybook', () => {
    jsdom.reconfigure({
      url: 'https://localhost:6010',
    });
    fetchSportApi('/test-path');
    const callArgs = request.default.mock.calls;
    expect(callArgs[0][0].uri).toBe('https://performance.univision.com/proxy/api/cached/sports/test-path');
  });
  it('should be using CDN url if defined in prod mode', () => {
    process.env.NODE_ENV = 'production';
    process.env.DEPLOY_ENV = 'production';
    process.env.CDN_URL = 'http://test.com';
    fetchSportApi('/test-path');
    const callArgs = request.default.mock.calls;
    expect(callArgs[0][0].uri).toBe('http://test.com/proxy/api/cached/sports/test-path');
  });
  it('should call server request if window not defined', () => {
    process.env.NODE_ENV = 'test';
    delete global.window;
    fetchSportApi('/test-path');
    expect(proxyDefinition.default).toHaveBeenCalledTimes(1);
  });
  it('should call server request using default location', () => {
    delete global.window;
    delete process.env.CDN_URL;
    fetchSportApi({ uri: '/test-path', params: { test: true } });
    expect(proxyDefinition.default).toHaveBeenCalledWith(expect.objectContaining({
      path: '/test-path',
    }));
  });
  it('should call server request with correctly object options', () => {
    process.env.NODE_ENV = 'production';
    process.env.DEPLOY_ENV = 'production';
    process.env.CDN_URL = 'http://test.com';
    delete global.window;
    fetchSportApi({ uri: '/test-path', params: { test: true } });
    expect(proxyDefinition.default).toHaveBeenCalledWith(expect.objectContaining({
      path: '/test-path',
    }));
  });
});
describe('fetchLocationApi', () => {
  beforeEach(() => {
    request.default.mockClear();
  });
  it('should use performance', () => {
    beforeEach(() => {
      request.default.mockClear();
    });
    Store.dispatch(setPageData({
      config: {
        syndicator: {
          uri: 'https://syndicator.performance.univision.com',
        },
      },
    }));
    fetchLocationApi().then(() => {
      const callArgs = request.default.mock.calls;
      expect(callArgs[0][0].uri).toBe('https://syndicator.performance.univision.com/proxy/uncached/user-loc');
    });
  });
});
describe('fetchAlertApi', () => {
  beforeEach(() => {
    request.default.mockClear();
  });
  it('should use performance and a uid', () => fetchAlertApi('00000166-4216-dd50-a166-e73f34130000', 'https://syndicator.performance.univision.com').then(() => {
    const callArgs = request.default.mock.calls;
    expect(callArgs[0][0].uri).toBe('https://syndicator.performance.univision.com/web-api/alert?i=00000166-4216-dd50-a166-e73f34130000');
  }));
  it('should be response a object empty', () => {
    Store.dispatch(setPageData({
      config: {
        syndicator: {
          uri: null,
        },
      },
    }));
    fetchAlertApi('00000166-4216-dd50-a166-e73f34130000').then((response) => {
      expect(response).toBeDefined();
    });
  });
  it('should use config store for default', () => {
    Store.dispatch(setPageData({
      config: {
        syndicator: {
          uri: 'https://syndicator.univision.com',
        },
      },
    }));
    fetchAlertApi('00000166-4216-dd50-a166-e73f34130000').then((response) => {
      const callArgs = request.default.mock.calls;
      expect(callArgs[0][0].uri).toBe('https://syndicator.univision.com/web-api/alert?i=00000166-4216-dd50-a166-e73f34130000');
      expect(response).toBeDefined();
    });
  });
  it('should be response a object empty', () => {
    const error = new Error('Not Found');
    request.default.mockReturnValueOnce(Promise.reject(error));
    fetchAlertApi('00000166-4216-dd50-a166-e73f34130000').then((response) => {
      expect(response).toBeDefined();
    });
  });
});
describe('fetchApi', () => {
  beforeEach(() => {
    request.default.mockClear();
  });

  it('should use performance url', () => fetchApi({ url: '/test-path', env: 'performance' }).then(() => {
    const callArgs = request.default.mock.calls;
    expect(callArgs[0][0].uri).toBe('https://syndicator.performance.univision.com/web-api/content?url=/test-path');
  }));
  it('should use prod url by default', () => fetchApi({ url: '/test-path', env: 'x' }).then(() => {
    const callArgs = request.default.mock.calls;
    expect(callArgs[0][0].uri).toBe('https://syndicator.univision.com/web-api/content?url=/test-path');
  }));
});

describe('fetchWeatherForecastApi', () => {
  beforeEach(() => {
    request.default.mockClear();
  });

  it('should fetch a weather api data', () => fetchWeatherForecastApi().then((response) => {
    expect(response).toBeDefined();
  }));
  it('should fetch data for type hour', () => {
    const filter = {
      type: 'hour',
      value: 12,
      languageCode: 'en-US',
      zipCode: 81657,
    };
    return fetchWeatherForecastApi(filter).then((response) => {
      expect(response).toBeDefined();
    });
  });
  it('should fetch data for default which is current option', () => {
    jsdom.reconfigure({
      url: 'http://localhost:8080',
    });
    const filter = {
      type: undefined,
      value: undefined,
      languageCode: 'en-US',
      zipCode: 81657,
    };
    return fetchWeatherForecastApi(filter).then((response) => {
      const callArgs = request.default.mock.calls;
      expect(callArgs[0][0].uri).toBe(`${window.location.origin}/proxy/api/cached/weather/current/en-US/81657`);
      expect(response).toBeDefined();
    });
  });
  it('should fetch data from local system env', () => {
    const filter = {
      type: undefined,
      value: undefined,
      languageCode: 'en-US',
      zipCode: 81657,
    };
    return fetchWeatherForecastApi(filter).then((response) => {
      const callArgs = request.default.mock.calls;
      expect(callArgs[0][0].uri).toBe('http://localhost:8080/proxy/api/cached/weather/current/en-US/81657');
      expect(response).toBeDefined();
    });
  });
});

describe('fetchSearchApi', () => {
  const mockWindow = {
    location: {
      href: '#',
      host: 'localhost',
    },
  };
  // mock the global window object
  const windowSpy = jest.spyOn(global, 'window', 'get');
  windowSpy.mockImplementation(() => mockWindow);
  beforeEach(() => {
    request.default.mockClear();
    request.requestServer.mockClear();
  });
  beforeEach(() => {
    request.default.mockClear();
    request.requestServer.mockClear();
    Store.dispatch(setPageData({
      config: {
        syndicator: {
          search: 'http://syndicator.univision.com/web-api/search',
        },
      },
    }));
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should use prod url by default', () => {
    const params = { q: 'noticias' };
    return fetchSearchApi(params).then(() => {
      const callArgs = request.default.mock.calls;
      expect(callArgs[0][0]).toEqual(expect.objectContaining({
        uri: 'http://syndicator.univision.com/web-api/search',
        params,
      }));
    });
  });

  it('should call server request when is not client side', () => {
    const params = { q: 'noticias' };
    delete global.window;

    fetchSearchApi(params);
    expect(request.requestServer).toHaveBeenCalledWith(expect.objectContaining({
      uri: 'http://syndicator.univision.com/web-api/search',
      qs: params,
    }));
  });
  describe('fetchWidgetApi', () => {
    beforeEach(() => {
      request.default.mockClear();
    });
    it('should be response a object empty', () => {
      fetchWidgetApi(undefined, undefined).then((response) => {
        expect(response).toBeDefined();
      });
    });
    it('should be response a object with the widget data', () => {
      fetchWidgetApi('https://www.univision.com/coronavirus-section-container-widget-do-not-delete-is-not-indexable', '00000170-d0f5-dacd-a776-fcff82fc0000').then((response) => {
        expect(response).toBeDefined();
      });
    });
    it('should be response a object empty', () => {
      const error = new Error('Not Found');
      request.default.mockReturnValueOnce(Promise.reject(error));
      fetchWidgetApi('https://www.univision.com/coronavirus-section-container-widget-do-not-delete-is-not-indexable', '00000170-d0f5-dacd-a776-fcff82fc0000').then((response) => {
        expect(response).toBeDefined();
      });
    });
  });
});

describe('fetchPlaylistApi', () => {
  beforeEach(() => {
    request.default.mockClear();
    jest.resetAllMocks();
  });

  it('should return videos if available', async () => {
    request.default.mockReturnValueOnce({
      data: {
        playlist: {
          videos: [{ mcpid: 123 }],
        },
      },
    });
    const response = await fetchPlaylistApi('uid-123');
    expect(response).toEqual([{ mcpid: 123 }]);
  });

  it('should return empty array if not available videos', async () => {
    request.default.mockReturnValueOnce({
      data: {
        playlist: {
          videos: null,
        },
      },
    });
    const response = await fetchPlaylistApi('uid-123');
    expect(response).toEqual([]);
  });

  it('should return empty array if error thrown', async () => {
    request.default.mockReturnValueOnce(Promise.reject(new Error('error')));
    const response = await fetchPlaylistApi('uid-123');
    expect(response).toEqual([]);
  });
});
describe('fetchPlayerTokenApi', () => {
  // mock the global window object
  let windowSpy;

  beforeEach(() => {
    windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    request.default.mockClear();
    request.requestServer.mockClear();
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should return token', async () => {
    request.default.mockReturnValueOnce({
      token: 12345,
    });
    const response = await fetchPlayerTokenApi();
    expect(response).toEqual({ token: 12345 });
  });

  it('should return object', async () => {
    request.default.mockReturnValueOnce(undefined);
    const response = await fetchPlayerTokenApi();
    expect(response).toEqual({});
  });

  it('should fetch token', async () => {
    await fetchPlayerTokenApi().then(() => {
      expect(request.default.mock.calls[0][0].uri).toEqual('https://streamguy.univision.com/api/v3/radio-auth/token');
    });
  });

  it('should be throw error', () => {
    const error = new Error('Not Found');
    request.default.mockReturnValueOnce(Promise.reject(error));
    fetchPlayerTokenApi().then((response) => {
      expect(response).toBeDefined();
    });
  });
});
