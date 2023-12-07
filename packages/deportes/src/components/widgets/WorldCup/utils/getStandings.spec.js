import promiseMock from '@univision/fe-commons/dist/utils/jest/helpers';
import * as fetchApi from '@univision/fe-commons/dist/utils/api/fetchApi';

import data from '../Standings/__mocks__/standings.json';
import getStandings from './getStandings';

describe('getStandings', () => {
  let sportApiSpy;

  beforeEach(() => {
    sportApiSpy = jest.spyOn(fetchApi, 'fetchSportApi');
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });

  it('should return an array after a successful request', async () => {
    sportApiSpy.mockReturnValue(
      promiseMock({
        resolve: data,
      })
    );
    jest.runAllTimers();
    const standings = await getStandings();
    expect(standings).toEqual(
      expect.any(Object)
    );
  });

  it('should return a null value after a failed request', async () => {
    sportApiSpy.mockReturnValue(
      promiseMock({
        reject: new Error(),
      })
    );
    jest.runAllTimers();
    const schedule = await getStandings();
    expect(schedule).toEqual(null);
  });
});
