import fetch from '@univision/fe-commons/dist/utils/fetch';
import { PRENDE_TV_PRESS_NEWS_DATASOURCE } from '@univision/fe-prendetv/dist/constants';

import getData from '.';
import { getClientConfig } from '../../config';

const config = getClientConfig();
const pathObject = {
  path: PRENDE_TV_PRESS_NEWS_DATASOURCE,
  requestParams: {
    param1: 'value1',
  },
};

describe('prendetv service test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('getData', () => {
    it('should call fetch and return the content data', async () => {
      const response = { type: 'year' };
      fetch.setResponseOnce({ res: response });
      const res = await getData(pathObject, config);
      expect(res).toEqual(response);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should thow an error on fetch', async () => {
      fetch.setResponseOnce({ err: new Error('Not found') });
      const res = await getData({
        ...pathObject,
        path: '',
      }, config);

      expect(res).toEqual(expect.any(Error));
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
