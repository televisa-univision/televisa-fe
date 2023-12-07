import React from 'react';
import Datadog from 'app/utils/datadog';
import * as serverUtils from 'server/utils/serverUtils';
import {
  getSsoIFrame,
  addHeaders,
  isValidAncestor,
} from '.';
import {
  CONTENT_SECURITY_POLICY,
} from '../../constants/headers';

jest.mock('components/shell/BasicShell', () => props => <div {...props} />);

let res;
let req;
let handleErrorMock;
const next = jest.fn();

describe('ssoIFrame', () => {
  beforeEach(() => {
    res = {
      headers: {},
      setHeader: (header, value) => { res.headers[header] = value; },
      status: jest.fn(() => ({ send: jest.fn(() => ({ end: jest.fn() })) })),
    };
    req = {
      get: header => ({
        referrer: 'www.univision.com',
      }[header]),
    };
    Datadog.addSpan = jest.fn(tag => tag);
    Datadog.closeSpan = jest.fn();
    handleErrorMock = jest.spyOn(serverUtils, 'handleError').mockImplementationOnce();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isValidAncestor', () => {
    it('should isValidAncestor return false if not domain', () => {
      expect(isValidAncestor(undefined)).toBeFalsy();
    });

    it('should isValidAncestor return true for localhost', () => {
      expect(isValidAncestor('localhost:8080')).toBeTruthy();
      expect(isValidAncestor('http://localhost:8080')).toBeTruthy();
    });

    it('should isValidAncestor return true for a valid domain', () => {
      expect(isValidAncestor('www.univision.com')).toBeTruthy();
    });
  });

  describe('addHeaders', () => {
    it('should add CSP headers properly', () => {
      addHeaders(res);
      expect(res.headers[CONTENT_SECURITY_POLICY]).toBeDefined();
    });
  });

  describe('defaultRoute', () => {
    it('should always add CSP header', () => {
      // Valid headers case
      getSsoIFrame(req, res, next);
      expect(res.headers[CONTENT_SECURITY_POLICY]).toBeDefined();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should end with status 403 when invalid referrer', () => {
      req = {
        get: header => ({
          referrer: 'www.invalid.com',
        }[header]),
      };
      getSsoIFrame(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);

      req.get = () => {};
      getSsoIFrame(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should invoke next if we have any exception', () => {
      req = {
        get: () => { throw new Error('Test Error'); },
      };
      getSsoIFrame(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error('Test Error'));
    });

    it('should create a DD span and before finish close it', () => {
      getSsoIFrame(req, res, next);
      expect(Datadog.addSpan).toHaveBeenCalledWith('getSsoIFrame');
      expect(Datadog.closeSpan).toHaveBeenCalledWith('getSsoIFrame');
    });

    it('should invoke handle error properly', () => {
      req = {
        get: header => ({
          referrer: 'www.invalid.com',
        }[header]),
      };
      getSsoIFrame(req, res, next);
      expect(handleErrorMock).toHaveBeenCalled();
    });
  });
});
