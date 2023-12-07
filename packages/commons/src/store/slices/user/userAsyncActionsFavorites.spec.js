import jwtDecode from 'jwt-decode';

import getFavoriteHoroscopes from '@univision/fe-graphql-services/dist/requests/queries/getFavoriteHoroscopes';
import addFavoriteHoroscopeSign from '@univision/fe-graphql-services/dist/requests/mutations/addFavoriteHoroscopeSign';
import removeFavoriteHoroscopeSign from '@univision/fe-graphql-services/dist/requests/mutations/removeFavoriteHoroscopeSign';

import LocalStorage from '../../../utils/helpers/LocalStorage';
import * as clientLogging from '../../../utils/logging/clientLogging';
import * as fetchGraphQL from '../../../utils/api/graphql';
import { ANON_USER_TOKEN_KEY } from '../../../constants/personalization';
import * as ssoAnonUserToken from '../../../utils/user';
import configureStore from '../../configureStore';
import {
  fetchAnonUserCreator,
  fetchFavoriteHoroscopesCreator,
  updateFavoriteHoroscopesCreator,
} from './user-asyncActions';
import {
  LOADING,
  SUCCESS,
} from '../../../constants/status';
import { cloneDeep } from '../../../utils/helpers';
import features from '../../../config/features';
import gtmManager from '../../../utils/tracking/googleTagManager/gtmManager';
import * as userSlice from './user-slice';
import { loggingLevels } from '../../../utils/logging/loggingLevels';

const widgetKey = 'testKey';
const requestingUrl = 'https://www.univision.com/horoscopos';
const userState = cloneDeep({
  ...userSlice.initialState,
  accessToken: 'TestToken',
  horoscopes: {
    ...userSlice.initialState.horoscopes,
    favorites: [
      { id: '1', status: SUCCESS },
      { id: '2', status: LOADING },
    ],
    status: SUCCESS,
    widgetKey,
  },
});

let initialState;

let store;
let mockLogging;
let fetchSpy;
let ssoAnonUserTokenSpy;
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzBlYjY4Zi1lMGZhLTVlY2MtODg3YS03YzdhNjI2MTQ2ODEiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsImlzcyI6IlVuaXZpc2lvbiJ9.9VbQjeqJJAUZeE8473qF_flUFv7oiXim88U7fZAcCvw';
const userResponse = {
  accessToken,
  sub: jwtDecode(accessToken).sub,
};
const favoritesResponse = {
  ids: ['12345'],
  items: [{}],
};

jest.mock('../../configureStore');

describe('user async actions favorites creators', () => {
  beforeEach(() => {
    initialState = cloneDeep({
      user: userState,
      page: {
        requestParams: { ssoEnabled: 'false' },
        config: {
          graphql: 'TestUrl',
          deploy: {
            buildMode: 'production',
          },
        },
        domain: 'https://www.univision.com',
        originalUrl: '/horoscopos',
        data: {
          hierarchy: [{ uri: requestingUrl }],
        },
      },
    });
    mockLogging = jest.spyOn(clientLogging, 'clientLevelLogging').mockImplementation(() => {});
    store = configureStore(initialState);
    features.content.isAnonUserCreationEnabled = () => true;
    jest.spyOn(gtmManager, 'setUserId').mockImplementation(jest.fn());
    ssoAnonUserTokenSpy = jest.spyOn(ssoAnonUserToken, 'default').mockImplementationOnce(() => Promise.resolve(accessToken));
  });

  afterEach(() => {
    jest.clearAllMocks();
    features.content.isAnonUserCreationEnabled = () => false;
    LocalStorage.remove(ANON_USER_TOKEN_KEY);
  });

  describe('fetchAnonUserCreator', () => {
    beforeEach(() => {
      fetchSpy = jest.spyOn(fetchGraphQL, 'fetchGraphQL').mockImplementation(
        async () => Promise.resolve({
          createUser: { accessToken },
        })
      );
    });

    it('should retrieve the user set in localStorage', async () => {
      LocalStorage.setObject(ANON_USER_TOKEN_KEY, userResponse);
      expect.assertions(2);
      const result = await fetchAnonUserCreator(null, { getState: store.getState });
      expect(fetchSpy).not.toHaveBeenCalled();
      expect(result).toEqual(userResponse);
    });

    it('should return the created user', async () => {
      expect.assertions(2);
      const result = await fetchAnonUserCreator(null, { getState: store.getState });
      expect(result.accessToken).toBeDefined();
      expect(result.sub).toBeDefined();
    });

    it('should save the user access token in the store', async () => {
      expect.assertions(1);
      const result = await fetchAnonUserCreator(null, { getState: store.getState });
      expect(LocalStorage.getObject(ANON_USER_TOKEN_KEY)).toEqual({
        accessToken: result.accessToken,
      });
    });

    it('should call ssoAnonUserToken when SSO is enabled', async () => {
      expect.assertions(2);
      initialState.page.requestParams = { ssoEnabled: 'true' };
      store = configureStore(initialState);
      const result = await fetchAnonUserCreator(null, { getState: store.getState });
      expect(ssoAnonUserTokenSpy).toHaveBeenCalled();
      expect(result.accessToken).toEqual(accessToken);
    });

    it('should catch the error when the fetch fails', async () => {
      expect.assertions(2);
      const error = new Error();
      fetchSpy.mockImplementation(() => Promise.reject(error));
      try {
        await fetchAnonUserCreator(null, { getState: store.getState });
      } catch (err) {
        expect(err).toEqual(error);
        expect(mockLogging).toHaveBeenCalledWith(
          expect.objectContaining({
            level: loggingLevels.warn,
          })
        );
      }
    });

    it('should log error level when the fetch status is > 408', async () => {
      expect.assertions(2);
      const error = new Error();
      error.status = 500;
      fetchSpy.mockImplementation(() => Promise.reject(error));
      try {
        await fetchAnonUserCreator(null, { getState: store.getState });
      } catch (err) {
        expect(err).toEqual(error);
        expect(mockLogging).toHaveBeenCalledWith(
          expect.objectContaining({
            level: loggingLevels.error,
          })
        );
      }
    });

    it('should throw exception when token is invalid', async () => {
      expect.assertions(1);
      fetchSpy.mockClear();
      fetchSpy = jest.spyOn(fetchGraphQL, 'fetchGraphQL').mockImplementationOnce(
        async () => ({ createUser: { accessToken: 'InvalidToken' } })
      );
      try {
        await fetchAnonUserCreator(null, { getState: store.getState });
      } catch (err) {
        expect(err.name).toEqual('InvalidTokenError');
      }
    });
  });

  describe('fetchFavoriteHoroscopesCreator', () => {
    beforeEach(() => {
      store = configureStore(initialState);
      fetchSpy = jest.spyOn(fetchGraphQL, 'fetchAuthGraphQL').mockImplementation(
        async () => Promise.resolve({
          getUser: {
            favorites: {
              horoscopes: {
                signIds: favoritesResponse.ids,
                daily: favoritesResponse.items,
              },
            },
          },
        })
      );
      mockLogging = jest.spyOn(clientLogging, 'clientLevelLogging').mockImplementation(() => {});
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should invoke properly fetchAuthGraphQL', async () => {
      await fetchFavoriteHoroscopesCreator(
        { widgetKey, requestingUrl },
        { getState: store.getState }
      );
      expect(fetchSpy).toHaveBeenCalledWith({
        query: getFavoriteHoroscopes,
        variables: { requestingUrl },
        token: initialState.user.accessToken,
        serverUri: initialState.page.config.graphql,
      });
    });

    it('should be Fulfilled when operation works successfully', async () => {
      const { ids, items } = favoritesResponse;
      const result = await fetchFavoriteHoroscopesCreator(
        { widgetKey, requestingUrl },
        { getState: store.getState }
      );
      expect(result).toEqual(
        { ids, widgetKey, items }
      );
    });

    it('should be Rejected when operation throws an error', async () => {
      expect.assertions(2);
      fetchSpy.mockClear();
      jest.spyOn(fetchGraphQL, 'fetchAuthGraphQL')
        .mockImplementationOnce(async () => Promise.reject(new Error('testError')));
      try {
        await fetchFavoriteHoroscopesCreator(
          { widgetKey, requestingUrl },
          { getState: store.getState }
        );
      } catch (err) {
        expect(err.message).toEqual('testError');
        expect(mockLogging).toHaveBeenCalledWith(
          expect.objectContaining({
            level: loggingLevels.warn,
          })
        );
      }
    });

    it('should report as error when fetch rejects with the proper error data', async () => {
      fetchSpy.mockClear();

      const fetchError = new Error('testError');
      fetchError.status = 500;

      jest.spyOn(fetchGraphQL, 'fetchAuthGraphQL')
        .mockImplementation(() => Promise.reject(fetchError));

      try {
        await fetchFavoriteHoroscopesCreator(
          { widgetKey, requestingUrl },
          { getState: store.getState }
        );
      } catch (err) {
        expect(err.message).toEqual('testError');
      }
      expect(mockLogging).toHaveBeenCalledWith(
        expect.objectContaining({ level: loggingLevels.error })
      );
    });

    it('should report as warning when fetch rejects with the proper error data', async () => {
      fetchSpy.mockClear();

      const fetchError = new Error('testError');
      fetchError.status = 404;

      jest.spyOn(fetchGraphQL, 'fetchAuthGraphQL')
        .mockImplementation(() => Promise.reject(fetchError));

      try {
        await fetchFavoriteHoroscopesCreator(
          { widgetKey, requestingUrl },
          { getState: store.getState }
        );
      } catch (err) {
        expect(err.message).toEqual('testError');
      }
      expect(mockLogging).toHaveBeenCalledWith(
        expect.objectContaining({ level: loggingLevels.warn })
      );
    });
  });

  describe('updateFavoriteHoroscopes', () => {
    beforeEach(() => {
      jest.spyOn(fetchGraphQL, 'fetchAuthGraphQL').mockImplementation(
        async ({ query }) => Promise.resolve({
          [
          query === addFavoriteHoroscopeSign
            ? 'addFavoriteHoroscopeSign'
            : 'removeFavoriteHoroscopeSign'
          ]: favoritesResponse,
        })
      );
    });

    it('should invoke properly fetchAuthGraphQL', async () => {
      await updateFavoriteHoroscopesCreator({ requestingUrl, id: '1', isRemove: true }, { getState: store.getState });
      expect(fetchSpy).toHaveBeenCalledWith({
        query: removeFavoriteHoroscopeSign,
        variables: { signId: '1', isRemove: true, requestingUrl },
        token: initialState.user.accessToken,
        serverUri: initialState.page.config.graphql,
      });
    });

    it('should invoke Fulfilled when everything works successfully', async () => {
      expect.assertions(2);
      let result = await updateFavoriteHoroscopesCreator(
        { requestingUrl, id: '1', isRemove: true }, { getState: store.getState }
      );
      expect(result).toEqual(favoritesResponse.items);

      result = await updateFavoriteHoroscopesCreator(
        { requestingUrl, id: '1', isRemove: false }, { getState: store.getState }
      );
      expect(result).toEqual(favoritesResponse.items);
    });

    it('should be Rejected when operation throws an error', async () => {
      expect.assertions(2);
      jest.spyOn(fetchGraphQL, 'fetchAuthGraphQL')
        .mockImplementationOnce(() => { throw new Error('test'); });
      try {
        await updateFavoriteHoroscopesCreator({}, { getState: store.getState });
      } catch (err) {
        expect(err.message).toEqual('test');
        expect(mockLogging).toHaveBeenCalledWith(
          expect.objectContaining({
            level: loggingLevels.warn,
          })
        );
      }
    });

    it('should log error when error status is > 408', async () => {
      expect.assertions(2);
      const fetchError = new Error('test');
      fetchError.status = 500;
      jest.spyOn(fetchGraphQL, 'fetchAuthGraphQL')
        .mockImplementationOnce(() => { throw fetchError; });
      try {
        await updateFavoriteHoroscopesCreator({}, { getState: store.getState });
      } catch (err) {
        expect(err.message).toEqual('test');
        expect(mockLogging).toHaveBeenCalledWith(
          expect.objectContaining({
            level: loggingLevels.error,
          })
        );
      }
    });
  });
});
