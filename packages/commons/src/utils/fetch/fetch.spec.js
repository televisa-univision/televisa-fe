import request, { requestServer } from '../api/request';
import fetch from '.';

jest.mock('../api/request');

/**
 * @test {isomorphicFetch}
 */
describe('isomorphicFetch test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should call client fetch', () => {
    fetch('https://syndicator.univision.com', { method: 'GET' });
    expect(request).toHaveBeenCalledWith({
      method: 'GET', uri: 'https://syndicator.univision.com',
    });
  });

  it('should call server fetch', () => {
    delete global.window;
    fetch('https://syndicator.univision.com', { method: 'GET' });
    expect(requestServer).toHaveBeenCalledWith({
      method: 'GET', uri: 'https://syndicator.univision.com',
    });
  });
});
