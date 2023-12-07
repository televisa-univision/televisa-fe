import fetch from '@univision/fe-commons/dist/utils/fetch';

import setupAmpPage from './setupAmpPage';
import * as pageRequest from '../../services/webapi';
import mockData from '../../../__mocks__/articlePageData.json';

fetch.setResponse({ res: mockData });
const context = {
  query: {},
  res: {
    writeHead: jest.fn(),
    end: jest.fn(),
  },
};

describe('setupAmpPage test', () => {
  it('should throw an HttpError by default', async () => {
    try {
      await setupAmpPage();
    } catch (e) {
      expect(e.message).toBe('Missing page context');
    }
  });

  it('should ignore request based on ignored path configuration and make redirect', async () => {
    const getPageSpy = jest.spyOn(pageRequest, 'getPage');
    const sampleContext = {
      ...context,
      query: { paths: ['path', 'not', 'allowed.js'] },
    };
    await setupAmpPage(sampleContext, 'univision');
    expect(sampleContext.res.end).toHaveBeenCalledTimes(1);
    expect(context.res.writeHead).toHaveBeenCalled();
    expect(getPageSpy).not.toHaveBeenCalled();
  });

  it('should return content with the provided context', async () => {
    const props = await setupAmpPage(context, 'univision');
    expect(props).toEqual(expect.any(Object));
  });

  it('should redirect if the provided context is invalid', async () => {
    const sampleContext = {
      ...context,
      query: { paths: ['amp', 'noticias'] },
    };
    fetch.setResponse({ res: { data: { page: {} } } });
    await setupAmpPage(sampleContext, 'univision');
    expect(context.res.writeHead).toHaveBeenCalled();
  });

  it('should redirect if getPage has failed', async () => {
    fetch.setResponse({});
    await setupAmpPage(context, 'univision');
    expect(context.res.writeHead).toHaveBeenCalled();
  });

  it('should redirect if response type is redirectdata', async () => {
    fetch.setResponse({ res: { type: 'redirectdata', url: 'https://www.univision.com/an-article' } });
    await setupAmpPage(context, 'univision');
    expect(context.res.writeHead).toHaveBeenCalled();
  });

  it('should redirect if wrong response api', async () => {
    fetch.setResponse({ res: { data: { page: {} } } });
    await setupAmpPage(context, 'univision');
    expect(context.res.writeHead).toHaveBeenCalled();
  });

  it('should redirect if invalid content', async () => {
    fetch.setResponse(
      {
        res: {
          data: {
            page: {
              data: {
                type: 'section',
              },
            },
          },
        },
      },
    );
    await setupAmpPage(context, 'univision');
    expect(context.res.writeHead).toHaveBeenCalled();
  });
});
