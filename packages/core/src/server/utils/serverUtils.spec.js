import Datadog from 'app/utils/datadog';
import logger from 'app/utils/logging/serverLogger';
import {
  handleError,
  isDomainAllowed,
  isCmsValidDomain,
  isSsoDomain,
  corsOptions,
  setHeaders,
  isVanityDomain,
  setTransactionName,
  decodeAndClean,
} from './serverUtils';
import vanityDomains from '../assets/domains/vanity.json';
import HttpError from './api/httpError';

const invalidOrigins = [
  'http://www.univi.com',
  'https://www.googl.com',
];

const validOrigins = [
  'http://www.univision.com',
  'https://www.univision.com',
  'http://tudn.com',
  'https://tudn.com',
  'http://www.tudn.com',
  'https://www.tudn.com',
  'http://subdomain.univision.com',
  'https://subdomain.univision.com',
  'about:',
  'null',
  null,
  'http://localhost:8080',
  'https://localhost:8080',
  'https://univision-fe.k8s.prod-univision.com',
  'https://ydzgd0hy3d.execute-api.us-east-1.amazonaws.com',
];

const validSsoUrls = [
  'https://sso.univision.com',
  'https://sso-performance.webapp.univision.com/',
  'https://sso-uat.webapp.univision.com/',
];

jest.mock('app/utils/datadog', () => ({
  addTag: jest.fn(),
  addSpan: jest.fn(),
  closeSpan: jest.fn(),
}));
jest.mock('app/utils/logging/serverLogger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
}));

describe('isSsoDomain function', () => {
  it('should be invalid SSO domain', () => {
    validOrigins.forEach((url) => {
      expect(isSsoDomain(url)).toBe(false);
    });
  });

  it('should be a SSO domain', () => {
    validSsoUrls.forEach((url) => {
      expect(isSsoDomain(url)).toBe(true);
    });
  });
});

describe('isDomainAllowed function', () => {
  beforeEach(() => {
    delete process.env.BYPASS_DOMAIN_VALIDATION;
    process.env.DEPLOY_ENV = 'test';
  });
  it('should disallow unknown origins', () => {
    invalidOrigins.forEach((origin) => {
      expect(isDomainAllowed((origin))).toBe(false);
    });
  });

  it('should allow known origins', () => {
    validOrigins.forEach((origin) => {
      expect(isDomainAllowed((origin))).toBe(true);
    });
  });

  it('should bypass validation if env variable is defined', () => {
    process.env.BYPASS_DOMAIN_VALIDATION = true;
    invalidOrigins.forEach((origin) => {
      expect(isDomainAllowed((origin))).toBe(true);
    });
  });

  it('should allow vanity domains', () => {
    vanityDomains.forEach((vanityDomain) => {
      if (!vanityDomain.startsWith('http')) {
        expect(isDomainAllowed(`http://${vanityDomain}`)).toBe(true);
      } else {
        expect(isDomainAllowed(vanityDomain)).toBe(true);
      }
    });
  });
});

describe('isCmsValidDomain function', () => {
  it('should return false if external domain or invalid url', () => {
    expect(isCmsValidDomain('https://somedomain.com')).toBeFalsy();
    expect(isCmsValidDomain(null)).toBeFalsy();
  });
  it('should return true if univision domain', () => {
    expect(isCmsValidDomain('https://www.univision.com')).toBeTruthy();
  });
});

describe('corsOptions function', () => {
  it('should not call callback for invalid origins', () => {
    const cb = jest.fn();
    invalidOrigins.forEach((origin) => {
      corsOptions.origin(origin, cb);
      expect(cb).not.toBeCalledWith(null, true);
    });
  });

  it('should call callback for valid origins', () => {
    const cb = jest.fn();
    validOrigins.forEach((origin) => {
      corsOptions.origin(origin, cb);
      expect(cb).toBeCalledWith(null, true);
    });
  });
});

describe('setHeaders function', () => {
  const headers = {};

  it('should uses default TTL', () => {
    const mockResponse = {
      setHeader: (key, value) => {
        headers[key] = value;
      },
    };

    setHeaders(mockResponse, null);
    expect(headers).toEqual({
      'Edge-Control': '!no-store, cache-maxage=900s',
      'Cache-Control': 'max-age=900',
    });
  });

  it('should use custom TTL', () => {
    const mockResponse = {
      setHeader: (key, value) => {
        headers[key] = value;
      },
    };

    setHeaders(mockResponse, 500);
    expect(headers).toEqual({
      'Edge-Control': '!no-store, cache-maxage=500s',
      'Cache-Control': 'max-age=500',
    });
  });
});

describe('isVanityDomain', () => {
  it('should return false if the origin is not a vanity domain', () => {
    expect(isVanityDomain('http://www.spam.com')).toBe(false);
  });

  it('should return false for invalid values', () => {
    expect(isVanityDomain(null)).toBe(false);
    expect(isVanityDomain(undefined)).toBe(false);
    expect(isVanityDomain('0.0.0.0')).toBe(false);
    expect(isVanityDomain(1)).toBe(false);
    expect(isVanityDomain({})).toBe(false);
    expect(isVanityDomain(jest.fn)).toBe(false);
  });

  it('should work with `host` and `origin`', () => {
    expect(isDomainAllowed('hot1007fm.com')).toBe(true);
    expect(isDomainAllowed('http://hot1007fm.com')).toBe(true);
    expect(isDomainAllowed('http://hot1007fm.com:8080')).toBe(true);
  });
});

describe('setTransactionName', () => {
  it('Should call newrelic and data dog methods to create new transactions', () => {
    const addTag = jest.spyOn(Datadog, 'addTag');
    const arg1 = 'test';
    const arg2 = 'one';
    setTransactionName(arg1, arg2);
    expect(addTag).toHaveBeenLastCalledWith(arg1, arg2);
  });
});

describe('handleError', () => {
  const res = { header: jest.fn() };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log the exception', () => {
    const message = 'Error message';
    handleError({}, {}, message, null);
    expect(logger.error).toHaveBeenCalledWith(message, { errorType: 'SSR' });
  });

  it('should add the error info to the headers and response', () => {
    const message = 'Error message';
    const err = {
      message,
    };
    handleError({}, res, message, err);
    expect(res.header).toHaveBeenCalledWith('X-Error-Message', message);
    expect(res.header).toHaveBeenCalledWith('X-Error-Id', 'e20cbb947afcf84cf58de1358ee1068d');
    expect(res.errorMessage).toBe(message);
  });

  it('should handle HttpError', () => {
    const error = new HttpError({
      url: 'https://www.univision.com',
    }, 500);
    const message = 'Error message';
    handleError({}, res, message, error);
    expect(logger.error).toHaveBeenCalledWith(message, Object.assign({ errorType: 'SSR' }, error.context));
  });

  it('should handle HttpError as warning', () => {
    const error = new HttpError({
      url: 'https://www.univision.com',
      level: 'warn',
    }, 500);
    const message = 'Warning message';
    handleError({}, res, message, error);
    expect(logger.warn).toHaveBeenCalledWith(message, Object.assign({ errorType: 'SSR' }, error.context));
  });

  it('should handle HttpError as info', () => {
    const error = new HttpError({
      url: 'https://www.univision.com',
      level: 'info',
    }, 500);
    const message = 'Info message';
    handleError({}, res, message, error);
    expect(logger.info).toHaveBeenCalledWith(message, Object.assign({ errorType: 'SSR' }, error.context));
  });

  it('should handle HttpError as error when level is not in the whitelist', () => {
    const error = new HttpError({
      url: 'https://www.univision.com',
      level: 'group',
    }, 500);
    const message = 'Info message';
    handleError({}, res, message, error);
    expect(logger.error).toHaveBeenCalledWith(message, Object.assign({ errorType: 'SSR' }, error.context));
  });

  it('should fallback to error level when level is not available in context', () => {
    const message = 'Error';
    const error = {
      context: { message },
    };
    handleError({}, res, message, error);
    expect(logger.error).toHaveBeenCalledWith(message, Object.assign({ errorType: 'SSR' }, error.context));
  });
});

describe('decodeAndClean', () => {
  it('should return null string', () => {
    expect(decodeAndClean()).toBe(null);
    expect(decodeAndClean(null)).toBe(null);
    expect(decodeAndClean('')).toBe(null);
  });
  it('should decode and clean a string', () => {
    expect(decodeAndClean('dGVzdA--')).toBe('test');
  });
});
