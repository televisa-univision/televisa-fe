import axios from 'axios';
import requestAxios, { queryBuilder, requestAxiosWithBasicAuth } from './requestAxios';

jest.mock('axios');

/**
 * Mock axios NodeJs module
 * @param {Error} params - the Error instance to error response
 * @param {Error} err - the Error instance to error response
 * @param {Object} res - the response data from request
 * @returns {Function}
 */
function mockServerRequest(params) {
  const defaults = params || {
    err: null,
    res: {
      status: 200,
      data: {},
    },
  };

  return jest.fn((url, options) => {
    return new Promise((resolve, reject) => {
      const { err, res } = { ...defaults, ...axios.defaults, ...axios.parametersOnce };

      if (err) {
        reject(err);
      } else if (res) {
        if (res && typeof res.data === 'string') {
          res.data = JSON.parse(res.data);
        }
        res.request = { url, options };
        resolve(res);
      } else {
        reject(new Error('No response from Server Request'));
      }

      delete axios.parametersOnce;
    });
  });
}

axios.get.mockImplementation(mockServerRequest());

jest.mock('../logging/serverLogger', () => ({
  error: jest.fn(),
}));

describe('Reqeust util tests', () => {
  const uri = 'http://...';
  const uriCredentials = 'http://foo:bar@...';

  it('returns responseBody', async () => {
    axios.get();

    const response = await requestAxios({ uri });
    expect(response).toEqual({});
  });

  it('stringifies request body', async () => {
    axios.get = jest.fn(() => ({
      data: { response: 'response' },
      status: 200,
    }));

    const body = { foo: 'bar' };
    await requestAxios({ uri, body });
    expect(axios.get.mock.calls[0][1].body).toEqual(JSON.stringify(body));
  });

  it('passes headers to fetch', async () => {
    axios.get = jest.fn(() => ({
      data: { response: 'response' },
      status: 200,
    }));

    const headers = { foo: 'bar' };
    await requestAxios({ uri, headers });
    expect(axios.get.mock.calls[0][1].headers).toEqual(headers);
  });

  it('passes mode to fetch', async () => {
    axios.get = jest.fn(() => ({
      data: { response: 'response' },
      status: 200,
    }));
    const mode = { credentials: 'same-origin' };
    await requestAxios({ uri, mode });
    expect(axios.get.mock.calls[0][1].mode).toEqual(mode);
  });

  it('throws error if bad response', async () => {
    axios.get = jest.fn(() => ({
      data: null,
      status: 400,
      statusText: 'Oops',
    }));
    try {
      await requestAxios({ uri: '/notfound' });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('Oops');
    }
  });

  it('catches if throws an exception', async () => {
    axios.get = jest.fn().mockRejectedValueOnce(new Error('fail'));
    try {
      await requestAxios({ uri });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('fail');
    }
  });

  it('runs through queryBuilder if params are set', async () => {
    axios.get = jest.fn(() => ({
      data: { response: 'response' },
      status: 200,
    }));
    const res = await requestAxios({ uri, params: { foo: true } });
    expect(res).toEqual({ response: 'response' });
  });

  it('should use requestAxiosWithBasicAuth and return false with empty arguments', async () => {
    axios.get = jest.fn(() => ({
      data: { response: 'response' },
      status: 200,
    }));

    const response = await requestAxiosWithBasicAuth();
    expect(response).toEqual(false);
  });

  it('should use requestAxiosWithBasicAuth to request a host without credentials', async () => {
    axios.get = jest.fn(() => ({
      data: { response: 'success' },
      status: 200,
    }));

    const response = await requestAxiosWithBasicAuth({ uri: 'https://univiosn.com/api' });
    expect(response).toEqual({ response: 'success' });
  });

  it('should use requestAxiosWithBasicAuth to request a bad URL', async () => {
    axios.get = jest.fn(() => ({
      data: { response: 'response' },
      status: 200,
    }));

    const response = await requestAxiosWithBasicAuth({ uri: false });
    expect(response).toEqual(false);
  });

  it('should use requestAxiosWithBasicAuth to request a relative URL with no credentials', async () => {
    axios.get = jest.fn(() => ({
      data: { response: 'response' },
      status: 200,
    }));

    const response = await requestAxiosWithBasicAuth({ uri: '/asd' });
    expect(response).toEqual({ response: 'response' });
  });

  it('should make a request with credentials in URL', async () => {
    axios.get = jest.fn(() => ({
      data: { response: 'response' },
      status: 200,
    }));

    const response = await requestAxiosWithBasicAuth({ uri: uriCredentials });
    expect(response).toEqual({ response: 'response' });
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
