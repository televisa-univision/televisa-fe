import configureMockStore from 'redux-mock-store';

import { jobSearchJobsQuery } from '@univision/fe-graphql-services/dist/requests/queries/jobSearch';

import * as fetchGraphQL from '../../../utils/api/graphql';
import * as clientLogging from '../../../utils/logging/clientLogging';
import promiseMock from '../../../utils/jest/helpers';

import { fetchJobsData } from './jobSearchAsyncActions';
import * as slice from './jobSearchSlice';
import marketCoordinates from '../../../constants/marketCoordinates.json';

const mockFetch = {
  getApploiJobs: [{
    applyMethod: 'FULL',
    resumeRequired: true,
    brandName: 'US Army',
    city: 'Tomball',
    description: '',
    id: '624846',
    industry: 'Government - Military',
    jobCode: '',
    jobType: 'FULL_TIME',
    name: { en: 'Military Police Officer ', es: 'Oficial de policía militar' },
    partner: {},
    publishedDate: '2021-07-06T00:00:00.000Z',
    redirectApplyUrl: 'https://jobs.apploi.com/view/624846?utm_campaign=integration&utm_medium=job-board-search&utm_source=univision_web-boosted&language=es&ajs_event=LOAD_JOB_PAGE&ajs_aid=3f617530-4530-11e9-a2ca-7e775511d9e3&ajs_prop_search_fetch_id=413fc99dfce746baa1240b82b7bccaef&ajs_prop_keyword=&ajs_prop_page=1&ajs_prop_city_center=Houston&ajs_prop_language=es&ajs_prop_jobseeker_location_lat=30.07&ajs_prop_jobseeker_location_lon=-95.56&ajs_prop_search_order=1&ajs_prop_job_id=624846&ajs_prop_doc_type=preferredjob&ajs_prop_distance=4&ajs_prop_job_location_lat=30.0158&ajs_prop_job_location_lon=-95.59172&ajs_prop_boosted=1&ajs_prop_utm_source=univision_web-boosted&ajs_prop_utm_medium=job-board-search&ajs_prop_utm_campaign=integration',
    state: 'Texas',
  }],
};

const marketName = 'KXLN';
const market = marketCoordinates[marketName];
const {
  lat,
  long,
  radius,
  name,
} = market;
const location = { latitude: lat, longitude: long, radius };

const data = {
  location,
  language: 'es',
  city: null,
  cityCenter: name,
  size: 25,
  state: null,
  searchTerm: null,
  industry: null,
  page: 1,
  utmSource: 'univision_web',
};

jest.useFakeTimers();

describe('fetch jobs async creators', () => {
  const mockStore = configureMockStore();
  const jobsState = slice.initialState;
  const pageState = {
    data: {
      tvStation: {
        call: marketName,
      },
    },
    config: {
      graphql: 'test',
    },
  };
  let store;
  let initialState;
  let fetchSpy;
  let loggerSpy;

  beforeEach(() => {
    initialState = {
      content: jobsState,
      page: pageState,
    };
    store = mockStore(initialState);
    fetchSpy = jest.spyOn(fetchGraphQL, 'fetchGraphQL');
    loggerSpy = jest.spyOn(clientLogging, 'clientLevelLogging').mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchJobDataActions', () => {
    it('should call properly fetchGraphQL', async () => {
      fetchSpy.mockReturnValue(promiseMock({
        resolve: mockFetch,
      }));
      jest.runAllTimers();
      const jobs = await fetchJobsData(
        null, { getState: store.getState }
      );
      expect.assertions(2);
      expect(fetchSpy).toHaveBeenCalledWith({
        query: jobSearchJobsQuery,
        variables: data,
        serverUri: initialState.page.config.graphql,
      });
      expect(jobs).toEqual(expect.objectContaining(mockFetch.getApploiJobs));
    });

    it('should reject when an error is thrown', async () => {
      fetchSpy.mockReturnValue(promiseMock({
        reject: new Error('test'),
      }));
      jest.runAllTimers();
      expect.assertions(2);
      try {
        await fetchJobsData(
          { data }, { getState: store.getState }
        );
      } catch (err) {
        expect(err.message).toEqual('test');
        expect(loggerSpy).toHaveBeenCalled();
      }
    });

    it('should use a local market as fallback', async () => {
      delete initialState.page.data;
      store = mockStore(initialState);
      fetchSpy.mockReturnValue(promiseMock({
        resolve: mockFetch,
      }));
      jest.runAllTimers();
      const jobs = await fetchJobsData(
        null, { getState: store.getState }
      );
      const newMarketName = Object.keys(marketCoordinates)[10];
      const newMarket = marketCoordinates[newMarketName];
      const newData = {
        ...data,
        location: {
          latitude: newMarket.lat,
          longitude: newMarket.long,
          radius: newMarket.radius,
        },
        cityCenter: newMarket.name,
      };
      expect.assertions(2);
      expect(fetchSpy).toHaveBeenCalledWith({
        query: jobSearchJobsQuery,
        variables: newData,
        serverUri: initialState.page.config.graphql,
      });
      expect(jobs).toEqual(expect.objectContaining(mockFetch.getApploiJobs));
    });
  });
});
