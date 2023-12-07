import configureStore from '../../configureStore';
import * as clientLogging from '../../../utils/logging/clientLogging';
import { loggingLevels } from '../../../utils/logging/loggingLevels';
import fetch from '../../../utils/fetch';
import { LOADING } from '../../../constants/status';
import { getUserLocation } from './user-asyncActions';
import * as userSlice from './user-slice';

jest.useFakeTimers();
jest.mock('../../configureStore');

const userState = userSlice.initialState;
const pageState = {
  config: {
    syndicator: {
      uri: 'https://syndicator.univision.com',
    },
  },
};

// Mocks
jest.mock('../../../utils/fetch');
jest.mock('../../configureStore');

describe('user async actions', () => {
  let initialState;
  let store;
  let mockLogging;

  beforeEach(() => {
    initialState = {
      user: userState,
      page: pageState,
    };
    store = configureStore(initialState);
    mockLogging = jest.spyOn(clientLogging, 'clientLevelLogging');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('getUserLocation action test', () => {
    const errMessage = 'User Location Service Error: getUserLocationRejected';

    it('should request user location', async () => {
      const locationMock = {
        pinfo: {
          Location: {
            CountryData: { country_code: 'MX' },
          },
        },
      };
      fetch.setResponseOnce({ res: locationMock });
      const res = await store.dispatch(getUserLocation());

      expect(fetch).toHaveBeenCalledWith('https://syndicator.univision.com/proxy/uncached/user-loc');
      expect(res.type).toBe('user/getUserLocation/fulfilled');
      expect(res.payload).toEqual(locationMock.pinfo.Location);
    });

    it('should return empty object when no Location node is available', async () => {
      expect.assertions(2);
      fetch.setResponseOnce({
        res: {
          pinfo: {},
        },
      });
      const resp = await store.dispatch(getUserLocation());
      expect(resp.payload).toEqual({});
      expect(mockLogging).not.toHaveBeenCalled();
    });

    it('should catch error when request object is empty', async () => {
      expect.assertions(1);
      fetch.setResponseOnce({
        res: {},
      });
      await store.dispatch(getUserLocation());
      expect(mockLogging).toHaveBeenCalledWith({
        error: new Error(`${errMessage} - Cannot read properties of undefined (reading 'Location')`),
        info: errMessage,
        level: loggingLevels.warn,
      });
    });

    it('should log with error level when status > 408', async () => {
      expect.assertions(1);
      fetch.setResponseOnce({
        res: {},
      });
      await store.dispatch(getUserLocation());
      expect(mockLogging).toHaveBeenCalledWith({
        error: new Error(`${errMessage} - Cannot read properties of undefined (reading 'Location')`),
        info: errMessage,
        level: loggingLevels.warn,
      });
    });

    it('should prevent duplicate request user location', () => {
      const mockState = {
        ...initialState,
        user: {
          location: {
            status: LOADING,
          },
        },
      };
      store.dispatch(getUserLocation());
      store = configureStore(mockState);
      store.dispatch(getUserLocation());

      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should not request user location if have previous data from state', async () => {
      const mockState = {
        ...initialState,
        user: {
          location: {
            data: {
              CountryData: { country_code: 'MX' },
            },
          },
        },
      };
      store = configureStore(mockState);
      const res = await store.dispatch(getUserLocation());

      expect(fetch).not.toHaveBeenCalled();
      expect(res.type).toBe('user/getUserLocation/fulfilled');
      expect(res.payload).toEqual(mockState.user.location.data);
    });

    it('should catch location request error', async () => {
      const errResponse = new Error('Timeout');
      fetch.setResponseOnce({ err: errResponse });
      const res = await store.dispatch(getUserLocation());

      expect(res.type).toBe('user/getUserLocation/rejected');
      expect(res.error.message).toBe(errResponse.message);
      expect(mockLogging).toHaveBeenCalledWith({
        error: new Error(`${errMessage} - ${errResponse.message}`),
        info: errMessage,
        level: loggingLevels.warn,
      });
    });

    it('should log error level when status > 408', async () => {
      const errResponse = new Error('Timeout');
      errResponse.status = 500;
      fetch.setResponseOnce({ err: errResponse });
      const res = await store.dispatch(getUserLocation());

      expect(res.type).toBe('user/getUserLocation/rejected');
      expect(res.error.message).toBe(errResponse.message);
      expect(mockLogging).toHaveBeenCalledWith({
        error: new Error(`${errMessage} - ${errResponse.message}`),
        info: errMessage,
        level: loggingLevels.error,
      });
    });
  });
});
