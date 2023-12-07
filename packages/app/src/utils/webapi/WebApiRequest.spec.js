import dotenv from 'dotenv';
import { FROM, NEXTJS, COUNTRY } from '@univision/fe-commons/dist/constants/nextjs';
import { US } from '@univision/fe-commons/dist/constants/userLocation';

import WebApiRequest from './WebApiRequest';

const tudnConfig = {
  proxy: 'https://www.tudn.com',
  apiEnv: 'prod',
};
const options = {
  config: tudnConfig,
  siteName: 'tudn',
};

const nextjsQuery = `&${FROM}=${NEXTJS}&${COUNTRY}=${US}`;

/**
 * @test {WebApiRequest}
 */
describe('WebApiRequest utility test', () => {
  beforeEach(() => {
    // Load env variables
    dotenv.config();
    process.env.API_ENV = 'prod';
  });

  describe('getWebApiUrl', () => {
    it('should return right webApi URL', () => {
      const asPath = '/futbol';
      const siteName = 'univision';
      const config = {
        proxy: 'https://www.univision.com',
        apiEnv: 'prod',
      };
      const webApiUrl = WebApiRequest.getWebApiUrl(asPath, { config, siteName });

      expect(webApiUrl).toBe(`https://www.univision.com/proxy/api/cached/web-app-state?url=https%3A%2F%2Fwww.univision.com%2Ffutbol${nextjsQuery}`);
    });

    it('should return right webApi URL for TUDN', () => {
      const asPath = '/futbol';
      const webApiUrl = WebApiRequest.getWebApiUrl(asPath, options);

      expect(webApiUrl).toBe(`https://www.tudn.com/proxy/api/cached/web-app-state?url=https%3A%2F%2Fwww.tudn.com%2Ffutbol${nextjsQuery}`);
    });

    it('should return null if query is not defined', () => {
      const webApiUrl = WebApiRequest.getWebApiUrl();

      expect(webApiUrl).toBeNull();
    });

    it('should return null if invalid sitename', () => {
      const webApiUrl = WebApiRequest.getWebApiUrl('/', { siteName: 'test' });

      expect(webApiUrl).toBeNull();
    });

    it('should return correct url for TUDNXtra', () => {
      const webApiUrl = WebApiRequest.getWebApiUrl('/tudnxtra', options);

      expect(webApiUrl).toBe(`https://www.tudn.com/proxy/api/cached/web-app-state?url=https%3A%2F%2Fwww.tudn.com%2Ftudnxtra${nextjsQuery}`);
    });

    it('should return correct url for /tudn', () => {
      const webApiUrl = WebApiRequest.getWebApiUrl('/tudn/', options);

      expect(webApiUrl).toBe(`https://www.tudn.com/proxy/api/cached/web-app-state?url=https%3A%2F%2Fwww.tudn.com%2F${nextjsQuery}`);
    });

    it('should return correct url for /tudn without extra parameters', () => {
      const webApiUrl = WebApiRequest.getWebApiUrl('/tudn?proxy=https://tudn.com', options);

      expect(webApiUrl).toBe(`https://www.tudn.com/proxy/api/cached/web-app-state?url=https%3A%2F%2Fwww.tudn.com%2F${nextjsQuery}`);
    });

    it('should return correct url from default', () => {
      const webApiUrl = WebApiRequest.getWebApiUrl('/tudn?proxy=https://tudn.com', { siteName: 'tudn' });

      expect(webApiUrl).toBe(`https://univision.com/proxy/api/cached/web-app-state?url=https%3A%2F%2Fwww.tudn.com%2F${nextjsQuery}`);
    });
  });

  it('should not replace site name with amp path', () => {
    const webApiUrl = WebApiRequest.getWebApiUrl('/amp/univision/test', options);

    expect(webApiUrl).toBe(`https://www.tudn.com/proxy/api/cached/web-app-state?url=https%3A%2F%2Fwww.tudn.com%2Famp%2Funivision%2Ftest${nextjsQuery}`);
  });

  describe('getWebApiParams', () => {
    it('should return expected object parameters', () => {
      const url = 'https://www.univision.com/futbol';
      const webApiUrl = WebApiRequest.getWebApiParams(url, { id: 'univision' });

      expect(webApiUrl).toEqual({
        url,
        id: 'univision',
      });
    });

    it('should return expected object parameters without additional params', () => {
      const url = 'https://www.univision.com/futbol';
      const webApiUrl = WebApiRequest.getWebApiParams(url);

      expect(webApiUrl).toEqual({
        url,
      });
    });
  });
});
