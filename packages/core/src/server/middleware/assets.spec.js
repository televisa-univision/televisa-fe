import dotenv from 'dotenv';
import request from '@univision/fe-commons/dist/utils/api/requestNode';
import * as serverUtils from 'server/utils/serverUtils';

import assetsMiddleware from './assets';

jest.mock('@univision/fe-commons/dist/utils/api/requestNode');

describe('assetsMiddleware', () => {
  beforeEach(() => {
    // Load env variables
    dotenv.config();
  });

  beforeAll(() => {
    jest.restoreAllMocks();
  });

  it('should call the next middleware if env variable is not defined.', () => {
    delete process.env.AWS_S3_ASSETS_BUCKET;
    const next = jest.fn();

    assetsMiddleware({}, {}, next);
    expect(next).toHaveBeenCalled();
  });

  it('should call the next middleware if S3 returns a 404', (done) => {
    process.env.AWS_S3_ASSETS_BUCKET = 'testing';
    request.setParametersOnce({ status: 404 });
    const res = { statusCode: 404 };
    const next = jest.fn(() => {
      expect(next).toHaveBeenCalled();
      done();
    });
    assetsMiddleware({}, res, next);
  });

  it('should not call the next middleware if S3 returns a valid response', (done) => {
    process.env.AWS_S3_ASSETS_BUCKET = 'testing';
    const res = {
      headers: {},
      setHeader: jest.fn(),
      status: jest.fn(() => res),
    };
    request.setParametersOnce(null, {
      headers: {},
      data: 'test content',
    });

    const next = jest.fn();
    res.send = jest.fn(() => {
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('test content');
      done();
    });
    assetsMiddleware({}, res, next);
  });

  it('Should call res.end method when the request does not have response', (done) => {
    process.env.AWS_S3_ASSETS_BUCKET = 'testing';
    const req = {};
    const res = {
      statusCode: 200,
      headers: {},
      header: jest.fn(),
      setHeader: jest.fn(),
    };

    const handleErrorSpy = jest.spyOn(serverUtils, 'handleError');
    request.setParametersOnce(null, null);
    const next = jest.fn(() => {
      expect(handleErrorSpy).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      done();
    });
    assetsMiddleware(req, res, next);
  });

  it('Should call res.end method when the request throws and error', (done) => {
    process.env.AWS_S3_ASSETS_BUCKET = 'testing';
    const req = {};
    const res = {
      statusCode: 200,
      headers: {},
      header: jest.fn(),
      setHeader: jest.fn(),
      status: jest.fn(() => res),
    };

    const handleErrorSpy = jest.spyOn(serverUtils, 'handleError');
    const error = new Error('fail');
    error.status = 500;
    request.setParametersOnce(error, null);
    const next = jest.fn(() => {
      expect(handleErrorSpy).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      done();
    });
    assetsMiddleware(req, res, next);
  });
});
