import request from './request';
import fetchSportApi from './fetchSportClientApi';

/* global jsdom */

jest.mock('./request', () => jest.fn(() => ({ data: {} })));

beforeEach(() => {
  request.mockClear();
});

afterAll(() => {
  request.mockRestore();
});

describe('fetchSportApi', () => {
  it('should call the client request with relative path', () => {
    fetchSportApi('/test-path');
    const callArgs = request.mock.calls;
    expect(callArgs[0][0].uri).toBe('/proxy/api/cached/sports/test-path');
  });
  it('should call the client request with performance path in local storybook', () => {
    jsdom.reconfigure({
      url: 'https://localhost:6010'
    });
    fetchSportApi('/test-path');
    const callArgs = request.mock.calls;
    expect(callArgs[0][0].uri).toBe('https://performance.univision.com/proxy/api/cached/sports/test-path');
  });
  it('should call the request with object as a query', () => {
    fetchSportApi({
      uri: '/foo',
      params: {
        test: true
      }
    });
    const callArgs = request.mock.calls;
    expect(callArgs[0][0].uri).toBe('https://performance.univision.com/proxy/api/cached/sports/foo');
  });
  it('should be using CDN url if defined in prod mode', () => {
    process.env.NODE_ENV = 'production';
    process.env.DEPLOY_ENV = 'production';
    process.env.CDN_URL = 'http://test.com';
    fetchSportApi('/test-path');
    const callArgs = request.mock.calls;
    expect(callArgs[0][0].uri).toBe('http://test.com/proxy/api/cached/sports/test-path');
  });
});
