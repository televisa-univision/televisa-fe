import request from 'axios';
import requestNode from './requestNode';
import logger from '../logging/serverLogger';

jest.mock('axios');
logger.error = jest.fn();

/** @test {requestNode} */
describe('requestNode', () => {
  beforeEach(() => {
    request.mockClear();
  });

  afterAll(() => {
    request.mockRestore();
    jest.restoreAllMocks();
  });

  it('should call the request without an error', () => {
    request.setParametersOnce(null, {
      status: 200,
      data: '{ "data": "successful" }',
    });
    expect(requestNode('/test-path')).resolves.toHaveProperty('data.data');
  });

  it('should throw an error when options params is undefined', () => {
    request.setParametersOnce(null, null);
    expect(requestNode()).rejects.toBeInstanceOf(Error);
  });

  it('should handle timeout errors', async () => {
    const loggerSpy = jest.spyOn(logger, 'error');
    const error = new Error('Timeout');
    error.code = 'ETIMEDOUT';
    request.setParametersOnce(error);
    try {
      await requestNode({ url: '/test-path' });
    } catch (err) {
      expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('code: ETIMEDOUT'));
    }
  });

  it('should log timeout errors with URL from options', async () => {
    const loggerSpy = jest.spyOn(logger, 'error');
    const error = new Error('Timeout');
    error.code = 'ESOCKETTIMEDOUT';
    request.setParametersOnce(error);
    try {
      await requestNode({ uri: '/test-path' });
    } catch (err) {
      expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('url: /test-path'));
    }
  });

  it('should log timeout errors with URL from string', async () => {
    const loggerSpy = jest.spyOn(logger, 'error');
    const error = new Error('Timeout');
    error.code = 'ESOCKETTIMEDOUT';
    request.setParametersOnce(error);
    try {
      await requestNode('/test-path');
    } catch (err) {
      expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('url: /test-path'));
    }
  });

  it('should handle POST method', () => {
    request.setParametersOnce(null, {
      status: 200,
      data: '{ "data": "successful" }',
    });
    const options = {
      method: 'POST',
      url: '/test',
      body: {
        foo: 'bar',
      },
    };
    expect(requestNode(options)).resolves.toHaveProperty('data.data');
  });
});
