import * as request from './request';
import sportsRequest from './proxyDefinition';

// mocks
request.requestServer = jest.fn(() => ({ data: {} }));

describe('proxyDefinition', () => {
  beforeEach(() => {
    request.requestServer.mockClear();
  });

  it('should call request server with sports api url ', async () => {
    process.env.SPORT_API_URL = 'https://sports-api.com';
    process.env.SPORT_API_KEY = 'api-key';
    const response = await sportsRequest({ path: '/test-path', query: 'test=true' });
    expect(request.requestServer).toHaveBeenCalledWith(expect.objectContaining({
      url: 'https://sports-api.com/test-path',
    }));
    expect(response).toEqual({ data: {} });
  });
  it('should not call request server if no sport api url present', () => {
    delete process.env.SPORT_API_URL;
    process.env.SPORT_API_KEY = 'api-key';
    sportsRequest({ path: '/test-path', query: 'test=true' });
    expect(request.requestServer).toHaveBeenCalledTimes(0);
  });
  it('should not call request server if no valid sport api url present and return empty response', async () => {
    process.env.SPORT_API_KEY = 'api-key';
    delete process.env.SPORT_API_URL;
    const response = await sportsRequest({ path: '/test-path', query: 'test=true' });
    expect(request.requestServer).toHaveBeenCalledTimes(0);
    expect(response).toEqual({ statusText: 'Proxy error' });
  });
  it('should not call request server if no have valid URL', async () => {
    process.env.SPORT_API_URL = 'invalid';
    process.env.SPORT_API_KEY = 'api-key';
    const response = await sportsRequest({ path: '/test-path', query: 'test=true' });
    expect(request.requestServer).toHaveBeenCalledTimes(0);
    expect(response).toHaveProperty('message', 'Invalid URL');
  });
});
