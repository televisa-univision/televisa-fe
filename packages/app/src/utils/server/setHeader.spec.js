import setHeaders from './setHeader';

describe('setHeaders function', () => {
  let headers;
  const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
  };
  const mockResponse = {
    setHeader: (key, value) => {
      headers[key] = value;
    },
    writeHead: jest.fn(),
    end: jest.fn(),
  };
  beforeEach(() => {
    headers = {};
  });
  it('should uses default TTL', () => {
    setHeaders({}, mockResponse);
    expect(headers).toEqual({
      'Edge-Control': '!no-store, cache-maxage=900s',
      'Cache-Control': 'max-age=900',
      ...securityHeaders,
    });
  });
  it('should use custom TTL', () => {
    const responseData = {
      data: {
        page: {
          data: {
            ttl: 500,
          },
        },
      },
    };
    setHeaders(responseData, mockResponse);
    expect(headers).toEqual({
      'Edge-Control': '!no-store, cache-maxage=500s',
      'Cache-Control': 'max-age=500',
      ...securityHeaders,
    });
  });

  it('should return text/plain for rawhtml content type', () => {
    const data = {
      data: {
        page: {
          data: {
            type: 'rawhtml',
            html: 'a raw html',
          },
          originalUrl: 'https://www.univision.com/ads.txt',
        },
      },
    };
    setHeaders(data, mockResponse);
    expect(headers).toEqual({
      'Cache-Control': 'max-age=900',
      'Content-Type': 'text/plain',
      'Edge-Control': '!no-store, cache-maxage=900s',
    });
    expect(mockResponse.end).toHaveBeenCalledTimes(1);
  });
  it('should return application/json for rawhtml content type for apple app site', () => {
    const data = {
      data: {
        page: {
          data: {
            type: 'rawhtml',
            html: 'a raw html',
          },
          originalUrl: 'https://www.univision.com/apple-app-site-association',
        },
      },
    };
    setHeaders(data, mockResponse);
    expect(headers).toEqual({
      'Cache-Control': 'max-age=900',
      'Content-Type': 'application/json',
      'Edge-Control': '!no-store, cache-maxage=900s',
    });
  });
  it('should return application/json for rawhtml content type for android app site', () => {
    const data = {
      data: {
        page: {
          data: {
            type: 'rawhtml',
            html: 'a raw html',
          },
          originalUrl: 'https://www.univision.com/.well-known/assetlinks.json',
        },
      },
    };
    setHeaders(data, mockResponse);
    expect(headers).toEqual({
      'Cache-Control': 'max-age=900',
      'Content-Type': 'application/json',
      'Edge-Control': '!no-store, cache-maxage=900s',
    });
  });
  it('should not call setHeader if not defined', () => {
    setHeaders({}, {});
    expect(headers).toEqual({});
  });
  it('should redirect if type type is redirectdata', () => {
    // Example response on https://www.univision.com/easy
    const data = {
      type: 'redirectdata',
      url: 'http://embed.livecloudhost.com/pbr',
      code: '301',
      triggeredBy: 'RedirectFilter',
      tagHierarchy: [
        { },
      ],
      primaryTag: { },
    };
    setHeaders(data, mockResponse);
    expect(mockResponse.writeHead).toHaveBeenCalledTimes(1);
  });
});
