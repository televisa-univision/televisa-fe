import fetch from '@univision/fe-commons/dist/utils/fetch';
import getArchiveContent from '.';
import { getClientConfig } from '../../config';

const config = getClientConfig();

describe('archive service test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('getArchiveContent', () => {
    it('should call fetch and return the content data', async () => {
      const response = { type: 'year' };
      fetch.setResponseOnce({ res: response });
      const res = await getArchiveContent('2010', { siteName: 'univision', config });
      expect(res).toEqual(response);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should call fetch with default sitename', async () => {
      const response = { type: 'year' };
      fetch.setResponseOnce({ res: response });
      const res = await getArchiveContent('2010', { config });
      expect(res).toEqual(response);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should thow an error on fetch', async () => {
      fetch.setResponseOnce({ err: new Error('Not found') });
      const res = await getArchiveContent('', { siteName: 'univision', config });

      expect(res).toEqual(expect.any(Error));
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
