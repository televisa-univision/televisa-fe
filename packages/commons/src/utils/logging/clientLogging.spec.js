/* eslint-disable no-underscore-dangle */
import request from '../api/request';
import clientLogging, { urlEncode, urlDecode, clientLevelLogging } from './clientLogging';

jest.mock('../api/request', () => jest.fn());

const initialCall = {
  uri: 'https://univision.com/proxy/api/uncached/client-side-logging',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};

describe('clientLogging', () => {
  beforeEach(() => {
    Object.defineProperty(window.navigator, 'userAgent', { value: '', writable: true });
    window.console.error = jest.fn();
    window.console.info = jest.fn();
    global.window.navigator.userAgent = 'Chrome';
    window.__NEXT_DATA__ = {
      props: {
        pageProps: {
          initialState: {
            page: {
              config: {
                proxy: 'https://univision.com',
              },
            },
          },
        },
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should ignore IE user agents.', () => {
    // IE 7
    window.navigator.userAgent = 'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko';
    clientLogging({}, 'test');
    // IE 9
    window.navigator.userAgent = 'Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; 125LA; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)';
    clientLogging({}, 'test');
    // IE 10
    window.navigator.userAgent = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2)';
    clientLogging({}, 'test');
    // Edge
    window.navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14931';
    clientLogging({}, 'test');
    expect(request).not.toHaveBeenCalled();
  });

  it('should fetch the server endpoint to log the error.', () => {
    const error = new Error('Error!');
    const expectedCall = {
      ...initialCall,
      body: {
        level: 'error',
        message: urlEncode(btoa(`[nextjs] ${error.message}`)),
        stackTrace: '',
      },
    };
    delete error.stack;
    clientLogging(error, 'test2');
    expect(request).toHaveBeenCalledWith(expectedCall);
  });

  it('should fetch the server endpoint to log the error.', () => {
    const error = new Error('Error!');
    const expectedCall = {
      ...initialCall,
      body: {
        level: 'error',
        message: urlEncode(btoa(`[nextjs] ${error.message}`)),
        stackTrace: '',
      },
    };
    delete error.stack;
    clientLogging(error, 'test2');
    expect(request).toHaveBeenCalledWith(expectedCall);
  });

  it('should fetch the server endpoint to log the error string', () => {
    const error = 'The Error string';
    const expectedCall = {
      ...initialCall,
      body: {
        level: 'error',
        message: urlEncode(btoa(`[nextjs] ${error}`)),
        stackTrace: '',
      },
    };
    clientLogging(error, 'test');
    expect(request).toHaveBeenCalledWith(expectedCall);
  });

  it('should fetch the server endpoint to log the error for non-nextjs', () => {
    window.__NEXT_DATA__ = null;
    const error = new Error('Error!');
    const expectedCall = {
      ...initialCall,
      uri: '/proxy/api/uncached/client-side-logging',
      body: {
        level: 'error',
        message: urlEncode(btoa(error.message)),
        stackTrace: '',
      },
    };
    delete error.stack;
    clientLogging(error, 'test');
    expect(request).toHaveBeenCalledWith(expectedCall);
  });

  it('should fetch the server endpoint to log the error with complete stack trace.', () => {
    const error = new Error('Error!');
    error.stack = `
      Line 1
      Line 2
      Line 3
      Line 4
      Line 5
    `;
    const expectedCall = {
      ...initialCall,
      body: {
        level: 'error',
        message: urlEncode(btoa(`[nextjs] ${error.message}`)),
        stackTrace: urlEncode(btoa(error.stack)),
      },
    };
    clientLogging(error, 'test');
    expect(request).toHaveBeenCalledWith(expectedCall);
    expect(window.console.error).toHaveBeenCalled();
  });

  it('should handle encode invalid base64 characters', () => {
    const input = 'VG++VzdGl//uZw==';
    expect(urlEncode(input)).toBe('VG..VzdGl__uZw--');
  });

  it('should handle decode invalid base64 characters', () => {
    const input = 'VG..VzdGl__uZw--';
    expect(urlDecode(input)).toBe('VG++VzdGl//uZw==');
  });
});

describe('clientLevelLogging', () => {
  beforeEach(() => {
    Object.defineProperty(window.navigator, 'userAgent', { value: '', writable: true });
    window.console.error = jest.fn();
    window.console.info = jest.fn();
    window.console.warn = jest.fn();
    global.window.navigator.userAgent = 'Chrome';
    window.__NEXT_DATA__ = {
      props: {
        pageProps: {
          initialState: {
            page: {
              config: {
                proxy: 'https://univision.com',
              },
            },
          },
        },
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the server endpoint to log the warn', () => {
    const error = new Error('Error!');
    delete error.stack;
    const expectedCall = {
      ...initialCall,
      body: {
        level: 'warn',
        message: urlEncode(btoa(`[nextjs] ${error.message}`)),
        stackTrace: '',
      },
    };
    const info = 'error';
    clientLevelLogging({ error, info, level: 'warn' });
    expect(request).toHaveBeenCalledWith(expectedCall);
  });

  it('should fetch the server endpoint to log the error string', () => {
    const error = 'The Error string';
    const expectedCall = {
      ...initialCall,
      body: {
        level: 'error',
        message: urlEncode(btoa(`[nextjs] ${error}`)),
        stackTrace: '',
      },
    };
    clientLevelLogging({ error, info: null, level: 'error' });
    expect(request).toHaveBeenCalledWith(expectedCall);
  });

  it('should fetch the server endpoint to log the error of missing error value', () => {
    const error = new Error('Missing error information');
    const expectedCall = {
      ...initialCall,
      body: {
        level: 'error',
        message: urlEncode(btoa(`[nextjs] ${error.message}`)),
        stackTrace: expect.stringContaining('RXJyb3I6IE1pc3NpbmcgZXJyb3IgaW5mb3JtYXRpb'),
      },
    };
    clientLevelLogging({ error: null, info: null, level: 'error' });
    expect(request).toHaveBeenCalledWith(expectedCall);
  });

  it('should fetch the server endpoint to log the info', () => {
    const error = new Error('Error!');
    delete error.stack;
    const expectedCall = {
      ...initialCall,
      body: {
        level: 'info',
        message: urlEncode(btoa(`[nextjs] ${error.message}`)),
        stackTrace: '',
      },
    };
    const info = 'error';
    clientLevelLogging({ error, info, level: 'info' });
    expect(request).toHaveBeenCalledWith(expectedCall);
  });

  it('should fetch the server endpoint to log the error for non-nextjs', () => {
    window.__NEXT_DATA__ = null;
    const error = new Error('Error!');
    const expectedCall = {
      ...initialCall,
      uri: '/proxy/api/uncached/client-side-logging',
      body: {
        level: 'error',
        message: urlEncode(btoa(error.message)),
        stackTrace: '',
      },
    };
    delete error.stack;
    clientLevelLogging({ error, level: 'error' });
    expect(request).toHaveBeenCalledWith(expectedCall);
  });

  it('should fallback to error when level is not in the whitelist', () => {
    const error = new Error('Error!');
    delete error.stack;
    const expectedCall = {
      ...initialCall,
      body: {
        level: 'error',
        message: urlEncode(btoa(`[nextjs] ${error.message}`)),
        stackTrace: '',
      },
    };
    const info = 'error';
    clientLevelLogging({ error, info, level: 'group' });
    expect(request).toHaveBeenCalledWith(expectedCall);
  });
});

describe('urlDecode test', () => {
  it('should decode the base64 string', () => {
    expect(urlDecode(btoa('my string to base64'))).toBe('bXkgc3RyaW5nIHRvIGJhc2U2NA==');
  });

  it('should not decode if is not a valid string', () => {
    expect(urlDecode(1)).toBe('');
    expect(urlDecode(null)).toBe('');
    expect(urlDecode()).toBe('');
    expect(urlDecode(new Error('error'))).toBe('');
  });
});

describe('urlEncode test', () => {
  it('should encode the base64 string', () => {
    expect(urlEncode(btoa('my string to base64'))).toBe('bXkgc3RyaW5nIHRvIGJhc2U2NA--');
  });

  it('should not encode if is not a valid string', () => {
    expect(urlEncode(1)).toBe('');
    expect(urlEncode(null)).toBe('');
    expect(urlEncode()).toBe('');
    expect(urlEncode(new Error('error'))).toBe('');
  });
});
