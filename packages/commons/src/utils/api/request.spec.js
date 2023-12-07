import requestNode from 'axios';
import request, { requestWithBasicAuth, queryBuilder, requestServer } from './request';
import logger from '../logging/serverLogger';
import * as messages from '../../constants/messages';

jest.mock('axios');

jest.mock('../logging/serverLogger', () => ({
  error: jest.fn(),
}));

describe('Reqeust util tests', () => {
  const uri = 'http://...';
  const uriCredentials = 'http://foo:bar@...';

  it('returns responseBody', async () => {
    global.fetch = jest.fn(() => ({
      json: () => Promise.resolve('response'),
      ok: true,
    }));

    const response = await request({ uri });
    expect(response).toEqual('response');
  });

  it('stringifies request body', async () => {
    global.fetch = jest.fn(() => ({
      json: () => Promise.resolve('response'),
      ok: true,
    }));

    const body = { foo: 'bar' };
    await request({ uri, body });
    expect(global.fetch.mock.calls[0][1].body).toEqual(JSON.stringify(body));
  });

  it('passes headers to fetch', async () => {
    global.fetch = jest.fn(() => ({
      json: () => Promise.resolve('response'),
      ok: true,
    }));
    const headers = { foo: 'bar' };
    await request({ uri, headers });
    expect(global.fetch.mock.calls[0][1].headers).toEqual(headers);
  });

  it('passes mode to fetch', async () => {
    global.fetch = jest.fn(() => ({
      json: () => Promise.resolve('response'),
      ok: true,
    }));
    const mode = { credentials: 'same-origin' };
    await request({ uri, mode });
    expect(global.fetch.mock.calls[0][1].mode).toEqual(mode);
  });

  it('throws error if bad response', async () => {
    global.fetch = jest.fn(() => ({
      json: () => Promise.resolve({ error: 'not found' }),
      ok: false,
      statusText: 'oops',
      status: 404,
    }));
    try {
      await request({ uri: '/notfound' });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('oops');
      expect(e.payload).toEqual({ error: 'not found' });
    }
  });

  it('catches if throws an exception', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('fail'));
    try {
      await request({ uri });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('fail');
    }
  });

  it('catches if response.json fails', async () => {
    global.fetch = jest.fn(() => ({
      json: () => new Promise((res) => { res(JSON.parse('{"bad"')); }),
      text: () => Promise.resolve('text'),
      ok: true,
    }));
    const res = await request({ uri });
    expect(res).toEqual('text');
  });

  it('returns null if unable to parse response body', async () => {
    global.fetch = jest.fn(() => ({
      json: () => new Promise((res) => { res(JSON.parse('{"bad"')); }),
      text: () => Promise.reject(new Error('Something went wrong')),
      ok: true,
    }));
    const res = await request({ uri });
    expect(res).toEqual(null);
  });

  it('runs through queryBuilder if params are set', async () => {
    global.fetch = jest.fn(() => ({
      json: () => Promise.resolve('response'),
      ok: true,
    }));
    const res = await request({ uri, params: { foo: true } });
    expect(res).toEqual('response');
  });

  it('should use requestWithBasicAuth and return false with empty arguments', async () => {
    global.fetch = jest.fn(() => ({
      json: () => new Promise((res) => { res({}); }),
      text: () => Promise.reject(new Error('Something went wrong')),
      ok: true,
    }));

    const response = await requestWithBasicAuth();
    expect(response).toEqual(false);
  });

  it('should use requestWithBasicAuth to request a host without credentials', async () => {
    global.fetch = jest.fn(() => ({
      json: () => new Promise((res) => { res({ success: true }); }),
      text: () => Promise.reject(new Error('Something went wrong')),
      ok: true,
    }));

    const response = await requestWithBasicAuth({ uri: 'https://univiosn.com/api' });
    expect(response).toEqual({ success: true });
  });

  it('should use requestWithBasicAuth to request a bad URL', async () => {
    global.fetch = jest.fn(() => ({
      json: () => new Promise((res) => { res(JSON.parse('{"bad"')); }),
      text: () => Promise.reject(new Error('Something went wrong')),
      ok: true,
    }));

    const response = await requestWithBasicAuth({ uri: false });
    expect(response).toEqual(false);
  });

  it('should use requestwithBasicAuth to request a relative URL with no credentials', async () => {
    global.fetch = jest.fn(() => ({
      json: () => Promise.resolve('response'),
      ok: true,
    }));

    const response = await requestWithBasicAuth({ uri: '/asd' });
    expect(response).toEqual('response');
  });

  it('should make a request with credentials in URL', async () => {
    global.fetch = jest.fn(() => ({
      json: () => Promise.resolve('response'),
      ok: true,
    }));

    const response = await requestWithBasicAuth({ uri: uriCredentials });
    expect(response).toEqual('response');
  });
});

describe('queryBuilder tests', () => {
  it('aborts if no keys in object', () => {
    expect(queryBuilder('uri')).toBe('uri');
  });

  it('does not add falsey keys', () => {
    const params = {
      foo: '',
      bar: undefined,
      baz: null,
    };
    expect(queryBuilder('uri', params)).toBe('uri?');
  });

  it('appends truthy params', () => {
    const params = {
      foo: 'dog',
      bar: 'cat',
    };
    expect(queryBuilder('uri', params)).toBe('uri?foo=dog&bar=cat');
  });

  it('appends additional params to existing query string', () => {
    const params = {
      bar: 'cat',
    };
    expect(queryBuilder('uri?foo=dog', params)).toBe('uri?foo=dog&bar=cat');
  });

  it('does not encode urls', () => {
    const params = {
      url: 'http://uni.com?this=that',
    };
    expect(queryBuilder('uri', params)).toBe('uri?url=http://uni.com?this=that');
  });

  it('url encodes as needed', () => {
    const params = {
      foo: 'my#String',
    };
    expect(queryBuilder('uri', params)).toBe('uri?foo=my%23String');
  });
});

describe('requestServer', () => {
  beforeEach(() => {
    requestNode.mockClear();
  });

  afterAll(() => {
    requestNode.mockRestore();
    jest.restoreAllMocks();
  });

  it('should return an error', () => {
    requestNode.setParametersOnce(new Error('Internal error'));
    return expect(requestServer('/test-path')).rejects.toBeInstanceOf(Error);
  });

  it('should return an error from the sports api', () => {
    requestNode.setParametersOnce(null, null, null);
    return expect(requestServer('/test-path')).rejects.toEqual(new Error(messages.SERVER_REQUEST_ERROR));
  });

  it('should return the respose with 404', () => {
    const opts = {
      uri: 'https://performance.univision.com/proxy/api/cached/sports/test-soccer',
    };
    requestNode.setParametersOnce({ response: { status: 404 } }, null);
    return expect(requestServer(opts)).rejects.toHaveProperty('status', 404);
  });

  it('should return the correct response', async () => {
    const opts = {
      uri: 'https://performance.univision.com/proxy/api/cached/sports/v1/schedule-results/soccer',
    };
    requestNode.setParametersOnce(null, {
      status: 200,
      data: '{ "sports-content": [] }',
    });
    return expect(requestServer(opts)).resolves.toHaveProperty('sports-content');
  });

  it('should return the correct response for full data when requested in opts', async () => {
    const opts = {
      uri: 'https://performance.univision.com/proxy/api/cached/sports/v1/schedule-results/soccer',
      fullData: true,
    };
    requestNode.setParametersOnce(null, {
      status: 200,
      data: '{ "sports-content": [] }',
    });
    const response = await requestServer(opts);
    return expect(response).toEqual(expect.objectContaining(
      {
        data: { 'sports-content': [] },
      }
    ));
  });

  it('should return the resolve if we throw an exceeption in the JSON parse', () => {
    const data = {};
    const opts = {
      uri: 'https://performance.univision.com/proxy/api/cached/sports/v1/schedule-results/soccer',
    };
    requestNode.setParametersOnce(null, {
      status: 200,
      data,
    });
    return expect(requestServer(opts)).resolves.not.toHaveProperty('sports-content');
  });

  it('should call the log if throws an error on JSON parse', async () => {
    const data = {};
    const opts = {
      url: 'https://performance.univision.com/proxy/api/cached/sports/v1/schedule-results/soccer',
    };
    requestNode.setParametersOnce(null, {
      status: 200,
      data,
    });
    try {
      await requestServer(opts);
    } catch (err) {
      expect(logger.error).toHaveBeenCalled();
      expect(err).toBeInstanceOf(Error);
    }
  });

  it('should log has the same url than options parameter', async (done) => {
    const opts = 'https://performance.univision.com/proxy/api/cached/sports/v1/schedule-results/soccer';
    requestNode.setParametersOnce({ response: { status: 404 } }, null);
    logger.error.mockImplementationOnce((data) => {
      expect(data.url).toEqual(opts);
      done();
    });
    try {
      await requestServer(opts);
    } catch (error) {
      expect(error.status).toEqual(404);
    }
  });

  it('should call the logger error if dynamic import fails for requestNode', async () => {
    jest.mock('./requestNode', () => ({
      default: null,
    }));
    const opts = 'https://performance.univision.com/proxy/api/cached/sports/v1/schedule-results/soccer';
    const result = await requestServer(opts);
    expect(logger.error).toHaveBeenCalled();
    expect(result).toEqual(null);
  });

  it('should return null if dynamic import fails for requestNode', async () => {
    jest.mock('./requestNode', () => ({
      default: null,
    }));
    logger.error = null;
    const opts = 'https://performance.univision.com/proxy/api/cached/sports/v1/schedule-results/soccer';
    const result = await requestServer(opts);
    expect(result).toEqual(null);
  });
});
