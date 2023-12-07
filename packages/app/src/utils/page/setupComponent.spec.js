import fetch from '@univision/fe-commons/dist/utils/fetch';
import getDeviceForRequest from '@univision/fe-commons/dist/utils/server/deviceDetector';

import setupComponent from './setupComponent';
import mockData from '../../../__mocks__/uvnPageData.json';

fetch.setResponse({ res: mockData });
const context = {
  query: {},
  res: {
    writeHead: jest.fn(),
    end: jest.fn(),
  },
};

describe('setupComponent test', () => {
  it('should throw an HttpError by default', async () => {
    try {
      await setupComponent();
    } catch (e) {
      expect(e.message).toBe('Missing page context');
    }
  });
  it('should return content with the provided context', async () => {
    const props = await setupComponent(context, 'univision');
    expect(props).toEqual(expect.any(Object));
  });

  it('should return content with the provided context when slug is provided', async () => {
    getDeviceForRequest.mockReturnValueOnce(null);
    context.query.slug = 'Footer/hideSearch/true/hideLink/tvshows/pageUri/.noticias';
    const props = await setupComponent(context, 'univision');
    expect(props.page.props).toEqual(expect.any(Object));
  });

  it('should return empty props when url has not params', async () => {
    context.query.slug = '/Header';
    const props = await setupComponent(context, 'univision');
    expect(props.page.props).toEqual({});
  });
});
