import fetch from '@univision/fe-commons/dist/utils/fetch';
import PageApi from './PageApi';
import mockApiData from './__mocks__/mockPageApiData.json';

jest.mock('app/utils/logging/serverLogger', () => ({
  error: jest.fn(),
}));

jest.mock('@univision/fe-commons/dist/utils/fetch');

/** @test {PageApi} */
describe('PageApi Spec', () => {
  describe('getPage static method', () => {
    it('should return a Promise that resolves with the data', async () => {
      fetch.setResponseOnce({ res: { data: mockApiData } });

      const response = await PageApi.getPage('pageFeedSampleResponse');
      expect(response).toEqual(mockApiData);
    });

    it('should catch error from API', async () => {
      const err = new Error('Not found');
      err.status = 404;
      err.url = 'notFoundUrl';
      fetch.setResponseOnce({ err });

      const response = await PageApi.getPage('notFoundUrl');
      expect(response.data.status).toBe(err.status);
      expect(response.data.error.toString()).toBe('Error: Got failure from page API [404] Not found url: notFoundUrl');
    });

    it('should catch error from API and call the onError fallback', async () => {
      const err = new Error('Not found');
      err.status = 404;
      err.url = 'notFoundUrl';
      fetch.setResponseOnce({ err });

      const onError = jest.fn();
      const response = await PageApi.getPage('notFoundUrl', onError);
      expect(response.data.status).toBe(err.status);
      expect(response.data.error.toString()).toBe('Error: Got failure from page API [404] Not found url: notFoundUrl');
      expect(onError).toHaveBeenCalled();
    });

    it('should modify page type when it is basicsoccermatch', async () => {
      const mockResponse = {
        status: 'success',
        data: {
          type: 'basicsoccermatch',
          widgets: [{
            contents: [{
              type: 'basicsoccermatch',
              image: {},
            }, {
              type: 'article',
            }],
            type: 'CarouselWidget',
          }, {
            contents: [],
            type: 'CarouselWidget',
          }],
        },
      };
      fetch.setResponseOnce({ res: { data: mockResponse } });
      const response = await PageApi.getPage('/futbol/argentina-primera/monterrey-vs-atletico-san-luis-argentina-primera');

      expect(response.data.type).toBe('soccermatch');
      expect(response.data.widgets[0].type).toBe('CarouselWidget');
      expect(response.data.widgets[0].contents).toEqual([{
        type: 'soccermatch',
        image: {},
      }, {
        type: 'article',
      }]);
    });
  });
});
