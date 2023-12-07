import * as serverLogger from 'app/utils/logging/serverLogger';
import logging, { getErrorExtraInfo } from './logging';

jest.mock('app/utils/logging/serverLogger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

jest.mock('on-finished', () => (response, logRequest) => {
  response.finished = logRequest;
});

let res;
const req = {
  get: () => 'univision.com',
  protocol: 'https',
  originalUrl: '/test',
  headers: {
    'x-forwarded-for': 'test',
  },
  connection: {
    remoteAddress: 'tudn.com',
  },
};
const next = jest.fn();
// let loggerMock

describe('logging', () => {
  beforeEach(() => {
    res = {
      header: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should subscribe to onFinished', () => {
    logging(req, res, next);
    expect(res.finished).toBeDefined();
  });

  it('should not log anything if req does not exist', () => {
    logging(undefined, res, next);
    res.finished();
    expect(serverLogger.info).not.toHaveBeenCalled();
  });

  it('should log properly and info message', () => {
    logging(req, res, next);
    res.finished();
    expect(serverLogger.info).toHaveBeenCalled();
  });

  it('should log properly and error message', () => {
    res.statusCode = 400;
    logging(req, res, next);
    res.finished();
    expect(serverLogger.error).toHaveBeenCalled();
  });

  it('sould send remoteAddress if header x-frwarded-for does not exist', () => {
    req.headers = {};
    logging(req, res, next);
    res.finished();

    const data = serverLogger.info.mock.calls[0][1];
    expect(data.remoteAddress).toEqual(req.connection.remoteAddress);
  });

  describe('getErrorExtraInfo', () => {
    beforeEach(() => {
      res.statusCode = 400;
    });

    it('sould return include the property extraError', () => {
      logging(req, res, next);
      res.finished();

      const data = serverLogger.error.mock.calls[0][1];
      expect(data.errorExtra).toBeDefined();
    });

    it('should include the JSON information errorExtra body property', () => {
      res.body = JSON.stringify('{}');
      const errorExtra = getErrorExtraInfo(res);
      expect(errorExtra).toEqual({ body: JSON.stringify(JSON.parse('{}')) });
    });

    it('should include errorMessage information in the errorExtra', () => {
      res.errorMessage = 'Blue screen';
      const errorExtra = getErrorExtraInfo(res);
      expect(errorExtra.errorMessage).toEqual('Blue screen');
    });

    it('should log invalid json error is not valid body was provided', () => {
      res.body = 'invalid';
      const errorExtra = getErrorExtraInfo(res);
      expect(errorExtra.body).toEqual('Body content-type is not JSON. SyntaxError: Unexpected token i in JSON at position 0');
    });
  });
});
