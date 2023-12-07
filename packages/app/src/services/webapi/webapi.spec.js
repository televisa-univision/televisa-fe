import fetch from '@univision/fe-commons/dist/utils/fetch';
import { FROM, NEXTJS, COUNTRY } from '@univision/fe-commons/dist/constants/nextjs';
import { US } from '@univision/fe-commons/dist/constants/userLocation';
import * as webapi from '.';

const config = {
  proxy: 'https://www.univision.com',
  apiEnv: 'prod',
};
const options = {
  siteName: 'univision',
  config,
};

const nextjsQuery = `&${FROM}=${NEXTJS}&${COUNTRY}=${US}`;

/**
 * @test {webapi}
 */
describe('webapi services test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('getPage', () => {
    it('should call fetch and return pageData', async () => {
      const asPath = '/famosos';
      const pageData = await webapi.getPage(asPath, options);

      expect(fetch).toHaveBeenCalledWith(`https://www.univision.com/proxy/api/cached/web-app-state?url=https%3A%2F%2Fwww.univision.com%2Ffamosos${nextjsQuery}`, {
        params: {},
      });
      expect(pageData).toEqual({
        status: 'succees',
        data: {
          page: {
            config: {},
            data: {
              title: 'dummy',
              type: 'section',
            },
          },
        },
        request: {
          params: {},
        },
      });
    });

    it('should throw an error on fetch', async () => {
      const message = 'internal error';
      fetch.setResponseOnce({ err: new Error(message) });
      const res = await webapi.getPage({});
      expect(res).toHaveProperty('message', message);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    describe('getContent', () => {
      it('should call fetch and return the content data', async () => {
        const res = await webapi.getContent('https://univision.com/test', {
          contentUrl: 'https://syndicator.univision.com/web-api/content',
          params: { id: 'ID' },
        });

        expect(res).toEqual({
          data: {
            page: {
              config: {},
              data: {
                title: 'dummy',
                type: 'section',
              },
            },
          },
          request: {
            params: {
              url: 'https://univision.com/test',
              id: 'ID',
            },
          },
          status: 'succees',
        });
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('https://syndicator.univision.com/web-api/content', {
          params: {
            url: 'https://univision.com/test',
            id: 'ID',
          },
        });
      });

      it('should throw an error on fetch', async () => {
        const message = 'Not found';
        fetch.setResponseOnce({ err: new Error(message) });
        const res = await webapi.getContent('/path-not-found');

        expect(res).toHaveProperty('message', message);
        expect(fetch).toHaveBeenCalledTimes(1);
      });
    });
  });
});
