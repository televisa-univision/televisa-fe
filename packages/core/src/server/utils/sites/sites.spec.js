import * as localHelpers from '@univision/fe-local/dist/utils/helpers';

import * as sites from '.';

/** @test {sites} */
describe('Sites helpers', () => {
  beforeEach(() => {
    // Define env variables
    process.env.CMS_API_URL = 'https://syndicator.univision.com';
    process.env.DEPLOY_ENV = 'production';
    delete process.env.MULTI_DOMAIN_DISABLED;
    delete process.env.TUDN_SITE_HOST;
    delete process.env.LAS_ESTRELLAS_SITE_HOST;
  });

  describe('isTudnHost', () => {
    it('should return true if is a TUDN host', () => {
      const host = 'www.tudn.com';
      expect(sites.isTudnHost(host)).toBe(true);
    });

    it('should return false if not a TUDN host', () => {
      const host = 'www.univision.com';
      expect(sites.isTudnHost(host)).toBe(false);
    });
  });

  describe('isTudnSite', () => {
    it('should not break if have empty page data', () => {
      expect(sites.isTudnSite()).toBe(false);
    });

    it('should return false if is not a tudn site/domain', () => {
      const domain = 'http://uat2.x.univision.com';
      expect(sites.isTudnSite(domain)).toBe(false);
    });

    it('should return true if is a tudn site/domain', () => {
      const domain = 'https://uat.tudn.com';
      expect(sites.isTudnSite(domain)).toBe(true);
    });

    it('should return true if is the main URI has tudn domain', () => {
      const domain = 'http://uat.univision.com';
      const uri = 'https://uat.tudn.com/futbol';
      expect(sites.isTudnSite(domain, uri)).toBe(true);
    });
    it('should return true if is the main URI has /deportes as root path', () => {
      const domain = 'http://uat.univision.com';
      const uri = 'https://uat.univision.com/deportes/futbol';
      expect(sites.isTudnSite(domain, uri)).toBe(true);
    });

    it('should return false if is the main URI not has /deportes as root path', () => {
      const domain = 'http://uat.univision.com';
      const uri = 'https://uat.univision.com/shows/deportes';
      expect(sites.isTudnSite(domain, uri)).toBe(false);
    });
  });

  describe('isUnivisionHost', () => {
    it('should return false by default', () => {
      expect(sites.isUnivisionHost()).toBe(false);
    });

    it('should return true with provided host', () => {
      expect(sites.isUnivisionHost('uat2.x.univision.com')).toBe(true);
    });

    it('should return false with provided host', () => {
      expect(sites.isUnivisionHost('uat.tudn.com')).toBe(false);
    });
  });

  describe('getUnivisionHost', () => {
    it('should return Univision host from CMS_API_URL', () => {
      const host = 'uat2.x.univision.com';
      expect(sites.getUnivisionHost(host)).toBe('www.univision.com');
    });

    it('should return the domain host', () => {
      const host = 'uat2.x.univision.com';
      expect(sites.getUnivisionHost(host, true)).toBe('uat2.x.univision.com');
    });

    it('should return Univision host from request host', () => {
      const host = 'uat2.x.univision.com';
      delete process.env.CMS_API_URL;
      expect(sites.getUnivisionHost(host)).toBe('uat2.x.univision.com');
    });

    it('should return Univision host from defaults if param is empty', () => {
      const host = null;
      delete process.env.CMS_API_URL;
      expect(sites.getUnivisionHost(host)).toBe('www.univision.com');
    });
  });

  describe('getTudnHost', () => {
    it('should return Tudn host from TUDN_SITE_HOST if is not Tudn host', () => {
      const host = 'uat.unviison.com';
      process.env.TUDN_SITE_HOST = 'test.tudn.com';
      expect(sites.getTudnHost(host)).toBe('test.tudn.com');
    });

    it('should return Tudn host from host event is TUDN_SITE_HOST is defined', () => {
      const host = 'uat.tudn.com';
      process.env.TUDN_SITE_HOST = 'test.tudn.com';
      expect(sites.getTudnHost(host)).toBe('uat.tudn.com');
    });

    it('should return Tudn host from request host', () => {
      const host = 'uat.tudn.com';
      expect(sites.getTudnHost(host)).toBe('uat.tudn.com');
    });

    it('should return Tudn host from defaults if param is empty', () => {
      const host = null;
      expect(sites.getTudnHost(host)).toBe('www.tudn.com');
    });
  });

  describe('isLasEstrellasHost', () => {
    it('should return false by default', () => {
      expect(sites.isLasEstrellasHost()).toBe(false);
    });

    it('should return true with provided host', () => {
      expect(sites.isLasEstrellasHost('uat2.x.lasestrellas.tv')).toBe(true);
    });

    it('should return false with provided host', () => {
      expect(sites.isLasEstrellasHost('uat.lasestrellastv')).toBe(false);
    });
  });

  describe('isSiteHost', () => {
    it('should return false by default', () => {
      expect(sites.isSiteHost()).toBe(false);
    });
    it('should return true for provided domain and site', () => {
      expect(sites.isSiteHost('uat.tudn.com', 'tudn')).toBe(true);
    });
    it('should return false for provided domain and site', () => {
      expect(sites.isSiteHost('uat2.x.univision.com', 'tudn')).toBe(false);
    });
  });

  describe('getSiteHost', () => {
    it('should return univision host by default', () => {
      expect(sites.getSiteHost()).toBe('www.univision.com');
    });

    it('should return univision host when site is not configured', () => {
      expect(sites.getSiteHost('test.com', 'test')).toBe('www.univision.com');
    });

    it('should return host from provided site', () => {
      expect(sites.getSiteHost('test.tudn.com', 'tudn')).toBe('test.tudn.com');
    });

    it('should return host from defaults if param is empty', () => {
      expect(sites.getSiteHost(null, 'tudn')).toBe('www.tudn.com');
    });

    it('should return default host if pattern doesn\'t match', () => {
      expect(sites.getSiteHost('test.univision.com', 'tudn')).toBe('www.tudn.com');
    });
  });

  describe('getSites', () => {
    it('should not return relative paths if MULTI_DOMAIN_DISABLED is true', () => {
      const req = {
        headers: {
          host: 'univision.com',
          'X-Forwarded-Proto': 'http',
        },
      };
      process.env.MULTI_DOMAIN_DISABLED = true;
      expect(sites.getSites(req)).toEqual({
        univision: '',
        tudn: '/deportes',
      });
    });

    it('should return the correct sites domains', () => {
      const req = {
        headers: {
          host: 'uat.tudn.com',
          'X-Forwarded-Proto': 'http',
        },
      };
      expect(sites.getSites(req)).toEqual(
        expect.objectContaining({
          univision: 'http://www.univision.com',
          tudn: 'http://uat.tudn.com',
        })
      );
    });

    it('should return the correct sites domains from defaults', () => {
      const req = {
        headers: null,
      };
      expect(sites.getSites(req)).toEqual(
        expect.objectContaining({
          univision: 'https://www.univision.com',
          tudn: 'https://www.tudn.com',
        })
      );
    });
  });

  describe('getSiteNameFromDomain', () => {
    it('should return univision by default', () => {
      expect(sites.getSiteNameFromDomain()).toBe('univision');
    });
    it('should return univision when invalid domain is provided', () => {
      expect(sites.getSiteNameFromDomain('test.com')).toBe('univision');
    });
    it('should return provided site name from host', () => {
      expect(sites.getSiteNameFromDomain('uat.tasaudavel.com.br')).toBe('tasaudavel');
    });
    it('should return provided site name from uri', () => {
      expect(sites.getSiteNameFromDomain('', 'https://tudn.com/test')).toBe('tudn');
    });
  });

  describe('getSiteLanguage', () => {
    let getLanguageSpy;

    beforeEach(() => {
      getLanguageSpy = jest.spyOn(localHelpers, 'getLanguage').mockReturnValue('es');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call getLanguage method by default', () => {
      expect(sites.getSiteLanguage()).toBe('es');
      expect(getLanguageSpy).toHaveBeenCalled();
    });

    it('should return portuguese when site is in vix sites list', () => {
      expect(sites.getSiteLanguage('mulher')).toBe('pt');
    });

    it('should return getLanguage result when site not in vix sites list', () => {
      getLanguageSpy.mockReturnValue('en');
      expect(sites.getSiteLanguage('tudn', { foo: 'bar' })).toBe('en');
      expect(getLanguageSpy).toHaveBeenCalledWith(
        expect.objectContaining({ foo: 'bar' })
      );
    });
  });

  describe('getLasEstrellasHost', () => {
    it('should return las estrellas host from LAS_ESTRELLAS_SITE_HOST if is not las estrellas host', () => {
      const host = 'uat.lasestrellass.tv';
      process.env.LAS_ESTRELLAS_SITE_HOST = 'lasestrellas.tv';
      expect(sites.getLasEstrellasHost(host)).toBe('www.lasestrellas.tv');
    });

    it('should return las estrellas host from host event is LAS_ESTRELLAS_SITE_HOST is defined', () => {
      const host = 'uat.lasestrellas.tv';
      process.env.TUDN_SITE_HOST = 'test.lasestrellas.tv';
      expect(sites.getLasEstrellasHost(host)).toBe('uat.lasestrellas.tv');
    });

    it('should return las estrellas host from request host', () => {
      const host = 'uat.lasestrellas.tv';
      expect(sites.getLasEstrellasHost(host)).toBe('uat.lasestrellas.tv');
    });

    it('should return las estrellas host from defaults if param is empty', () => {
      const host = null;
      expect(sites.getLasEstrellasHost(host)).toBe('www.lasestrellas.tv');
    });
  });
});
