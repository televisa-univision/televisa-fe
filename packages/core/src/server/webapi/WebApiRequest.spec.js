import dotenv from 'dotenv';

import Features from '@univision/fe-commons/dist/config/features';

import WebApiType from './WebApiType';
import WebApiRequest from './WebApiRequest';

beforeEach(() => {
  // Load env variables
  dotenv.config();
  process.env.CMS_API_URL = 'https://syndicator.univision.com';
  delete process.env.CI_CLIENT;
  delete process.env.CMS_API_SIGNING_REQUIRED;
  Features.content.serverSideLazyLoading = true;
  process.env.DEPLOY_ENV = 'production';
});

afterEach(() => {
  // Revert any changes
  dotenv.config();
});

describe('WebApiRequest', () => {
  describe('getRequiredSignature', () => {
    it('should return an empty string if signature is not required', () => {
      delete process.env.CMS_API_SIGNING_REQUIRED;
      expect(WebApiRequest.getRequiredSignature('www.univision.com')).toBe('');
    });

    it('should return a non-empty string if signature is not required', () => {
      process.env.CMS_API_SIGNING_REQUIRED = true;
      expect(WebApiRequest.getRequiredSignature('www.univision.com')).not.toBe('');
    });
  });

  describe('getContentDomain', () => {
    it('should return default for an invalid HTTP request', () => {
      expect(WebApiRequest.getContentDomain(null)).toBe('https://www.univision.com');
    });

    it('should not redirect to univision domain when the host is a subdmain', () => {
      expect(WebApiRequest.getContentDomain({
        headers: {
          host: 'noticias.univision.com',
          'X-Forwarded-Proto': 'http',
        },
      })).toBe('http://noticias.univision.com');
    });

    it('should default to https if "X-Forwarded-Proto" is not present', () => {
      expect(WebApiRequest.getContentDomain({
        headers: {
          host: 'univision.com',
        },
      })).toBe('https://www.univision.com');
    });

    it('should return default if not have "CMS_API_URL"', () => {
      delete process.env.CMS_API_URL;
      expect(WebApiRequest.getContentDomain(null)).toBe('https://www.univision.com');
    });
    it('should return default if not have "CMS_API_URL"', () => {
      delete process.env.CMS_API_URL;
      expect(WebApiRequest.getContentDomain({
        headers: {
          host: 'lasestrellas.tv',
        },
      })).toBe('https://www.lasestrellas.tv');
    });
  });

  describe('getContentDomain TUDN', () => {
    it('should return TUDN domain using the request Headers', () => {
      expect(WebApiRequest.getContentDomain({
        headers: {
          host: 'uat.tudn.com',
          'X-Forwarded-Proto': 'http',
        },
      })).toBe('http://uat.tudn.com');
    });

    it('should default to https if "X-Forwarded-Proto" is not present', () => {
      expect(WebApiRequest.getContentDomain({
        headers: {
          host: 'www.tudn.com',
        },
      })).toBe('https://www.tudn.com');
    });

    it('should return default if has TUDN host even if have "CMS_API_URL"', () => {
      process.env.DEPLOY_ENV = 'development';
      expect(WebApiRequest.getContentDomain({
        headers: {
          host: 'www.tudn.com',
        },
      })).toBe('https://www.tudn.com');
    });
  });

  describe('getWebApiEndpoint', () => {
    it('should return a valid endpoint for a content page', () => {
      expect(WebApiRequest.getWebApiEndpoint({ originalUrl: 'https://www.univision.com/noticias/amazing-webapp' })).toBe('https://syndicator.univision.com/web-api');
    });

    it('should return a valid endpoint for a preview page', () => {
      expect(WebApiRequest.getWebApiEndpoint({ originalUrl: 'https://www.univision.com/_preview/123/LOCAL' })).toBe('http://www.local.univision.com/web-api');
    });

    it('should return a valid endpoint for a preview page in an unknown environment', () => {
      expect(WebApiRequest.getWebApiEndpoint({ originalUrl: 'https://www.univision.com/_preview/123/UNKNOWN' })).toBe('https://syndicator.univision.com/web-api');
    });
  });

  describe('isPreview', () => {
    it('should return false if the req is not valid', () => {
      expect(WebApiRequest.isPreview({ originalUrl: 'https://www.univision.com/noticias/amazing-webapp' })).toBeFalsy();
    });
    it('should return true if the req is a valid preview', () => {
      expect(WebApiRequest.isPreview({ originalUrl: 'https://www.univision.com/_preview/123' })).toBeTruthy();
    });
  });

  describe('getContentUri', () => {
    it('should remove the AMP prefix', () => {
      expect(WebApiRequest.getContentUri(({ originalUrl: 'https://www.univision.com/amp/noticias/amazing-webapp' }))).toBe('https://www.univision.com/noticias/amazing-webapp');
    });
    it('should remove the EMBED suffix if no embedId', () => {
      const url = 'http://univision.com/noticias/avioneta-droga-video-general-video';
      expect(WebApiRequest.getContentUri({ originalUrl: `${url}/embed` })).toBe(url);
    });
    it('should not remove the EMBED suffix if eid available', () => {
      const url = 'http://univision.com/noticias/avioneta-droga-video-general-video/embed?eid=1';
      expect(WebApiRequest.getContentUri({ originalUrl: url })).toBe(url);
    });
  });

  describe('getWebApiUrl', () => {
    it('should return null for an unknown API type', () => {
      expect(WebApiRequest.getWebApiUrl(null, 'UNKNOWN')).toBe(null);
    });

    it('should return null for an invalid HTTP Request', () => {
      expect(WebApiRequest.getWebApiUrl(null, WebApiType.CONTENT)).toBe(null);
    });

    describe('/content', () => {
      it('should return a valid Content web-api URL with query string', () => {
        expect(WebApiRequest.getWebApiUrl({
          originalUrl: 'https://www.univision.com/noticias/amazing-webapp?test=true',
          headers: {
            host: 'www.univision.com',
            'X-Forwarded-Proto': 'http',
          },
        }, WebApiType.CONTENT)).toBe('https://syndicator.univision.com/web-api/content?userLocation=US&url=http://www.univision.com/noticias/amazing-webapp&test=true');
      });

      it('should return a valid Content web-api URL without query string', () => {
        expect(WebApiRequest.getWebApiUrl({
          originalUrl: 'https://www.univision.com/noticias/amazing-webapp',
          headers: {
            host: 'www.univision.com',
            'X-Forwarded-Proto': 'http',
          },
        }, WebApiType.CONTENT)).toBe('https://syndicator.univision.com/web-api/content?userLocation=US&url=http://www.univision.com/noticias/amazing-webapp');
      });

      it('should return a valid Content web-api URL with vanity url', () => {
        expect(WebApiRequest.getWebApiUrl({
          originalUrl: 'http://www.1003masvariedad.com',
          headers: {
            host: 'www.1003masvariedad.com',
            'X-Forwarded-Proto': 'http',
          },
        }, WebApiType.CONTENT)).toBe('https://syndicator.univision.com/web-api/content?userLocation=US&url=http://www.1003masvariedad.com/');
      });

      it('should disable lazy loading for AMP', () => {
        expect(WebApiRequest.getWebApiUrl({
          originalUrl: 'https://www.univision.com/amp/noticias/amazing-webapp',
          headers: {
            host: 'www.univision.com',
            'X-Forwarded-Proto': 'http',
          },
        })).toBe('https://syndicator.univision.com/web-api/content?userLocation=US&url=http://www.univision.com/noticias/amazing-webapp&lazyload=false');
      });

      it('should disable lazy loading if the feature flag is false', () => {
        Features.content.serverSideLazyLoading = false;
        expect(WebApiRequest.getWebApiUrl({
          originalUrl: 'https://www.univision.com/noticias/amazing-webapp',
          headers: {
            host: 'www.univision.com',
            'X-Forwarded-Proto': 'http',
          },
        })).toBe('https://syndicator.univision.com/web-api/content?userLocation=US&url=http://www.univision.com/noticias/amazing-webapp&lazyload=false');
      });
    });
  });

  describe('getHttpHeaders', () => {
    describe('x-is-user-loc-eu', () => {
      it('should return the value in the header', () => {
        expect(WebApiRequest.getHttpHeaders({ headers: { 'x-is-user-loc-eu': 'true' } })).toEqual({ 'x-is-user-loc-eu': 'true' });
      });

      it('should return the default value if the header is not present', () => {
        expect(WebApiRequest.getHttpHeaders({})).toEqual({ 'x-is-user-loc-eu': 'false' });
      });
    });
  });

  describe('getCustomRedirect', () => {
    it('should create a redirect for univision.com/test', () => {
      expect(WebApiRequest.getCustomRedirect({
        originalUrl: 'univision.com/test',
        path: '/test',
        headers: {
          host: 'univision.com',
          'X-Forwarded-Proto': 'http',
        },
      })).toEqual({
        url: 'https://www.univision.com/test',
        code: 301,
        type: 'redirectdata',
      });
    });

    it('should create a redirect for tudn.com/test', () => {
      expect(WebApiRequest.getCustomRedirect({
        originalUrl: 'tudn.com/test',
        path: '/test',
        headers: {
          host: 'tudn.com',
          'X-Forwarded-Proto': 'http',
        },
      })).toEqual({
        url: 'https://www.tudn.com/test',
        code: 301,
        type: 'redirectdata',
      });
    });

    it('should not create a redirect for www.univision.com/test', () => {
      expect(WebApiRequest.getCustomRedirect({
        originalUrl: 'www.univision.com/test',
        path: '/test',
        headers: {
          host: 'www.univision.com',
          'X-Forwarded-Proto': 'http',
        },
      })).toEqual(null);
    });
  });

  describe('getUserLocation', () => {
    it('should return the appropiate value', () => {
      expect(WebApiRequest.getUserLocation({
        userLocation: 'US',
      })).toEqual('userLocation=US&');
    });
  });
});
