import React from 'react';
import helper from 'react-dom/server';
import {
  getSsoAcpFlow,
} from './ssoAcp';

jest.mock('components/shell/BasicShell', () => props => <div {...props} />);
let res;
let req;
const next = jest.fn();
helper.renderToString = jest.fn();

describe('SSO ACP', () => {
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should end with status 200 when referrer', () => {
    req = {
      get: header => ({
        referrer: 'www.tudn.com',
      }[header]),
    };
    getSsoAcpFlow(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should invoke next if we have any exception', () => {
    helper.renderToString.mockImplementationOnce(() => {
      throw new Error('Test Error');
    });
    getSsoAcpFlow(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error('Test Error'));
  });
});
