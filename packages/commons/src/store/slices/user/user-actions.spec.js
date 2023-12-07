import configureMockStore from 'redux-mock-store';
import LocalStorage from '../../../utils/helpers/LocalStorage';
import * as actions from './user-actions';
import * as fetchGraphQL from '../../../utils/api/graphql';
import * as favSelectors from '../../selectors/favorite-selectors';
import { ANON_USER_TOKEN_KEY } from '../../../constants/personalization';
import * as slice from './user-slice';
import * as asyncActions from './user-asyncActions';
import {
  LOADING,
  SUCCESS,
} from '../../../constants/status';
import { cloneDeep } from '../../../utils/helpers';
import features from '../../../config/features';
import { HOROSCOPES } from '../../../constants/personalizationType';

const widgetKey = 'testKey';
const mockStore = configureMockStore();

const userState = cloneDeep({
  ...slice.initialState,
  horoscopes: {
    ...slice.initialState.horoscopes,
    favorites: [
      { id: '1', status: SUCCESS },
      { id: '2', status: LOADING },
    ],
    requestingUrl: 'https://www.univision.com/',
    status: SUCCESS,
    widgetKey,
  },
  reactions: {
    byId: {
      test: {
        reaction: 'LIKE',
      },
    },
  },
});
const pageState = {
  requestParams: { favoriteHoroscopesExperience: 'true' },
  domain: 'https://www.univision.com',
  data: {
    widgets: [
      { settings: { uid: 'testKey', personalizationType: HOROSCOPES } },
      { settings: { uid: 'testKey2', personalizationType: HOROSCOPES } },
    ],
  },
};
const reactionState = {
  byId: {
    test: {
      counts: [{
        reaction: 'LIKE',
        count: 1,
      }],
    },
  },
};

let initialState;

let store;
let mockDispatch;
const favoritesResponse = {
  ids: ['12345'],
  items: [{}],
};
const actionMock = { action: 'TEST', payload: 'TEST' };

describe('user actions', () => {
  beforeEach(() => {
    initialState = cloneDeep({
      user: userState,
      page: pageState,
      reactions: reactionState,
    });
    store = mockStore(initialState);
    mockDispatch = jest.fn();
    features.content.isAnonUserCreationEnabled = () => true;

    jest.spyOn(asyncActions, 'fetchAnonUser').mockReturnValue(actionMock);
    jest.spyOn(asyncActions, 'fetchFavoriteHoroscopes').mockImplementationOnce(data => data);
    jest.spyOn(asyncActions, 'updateFavoriteHoroscopes').mockImplementationOnce(data => data);
  });

  afterEach(() => {
    jest.clearAllMocks();
    features.content.isAnonUserCreationEnabled = () => false;
    LocalStorage.remove(ANON_USER_TOKEN_KEY);
  });

  describe('fetchAnonUser', () => {
    it('should dispatch when there is not user stored', async () => {
      await actions.fetchAnonUser()(mockDispatch, store.getState);
      expect(mockDispatch).toHaveBeenCalledWith(actionMock);
    });

    it('should not dispatch anything when user already exists in the store', async () => {
      store = mockStore({ user: { ...initialState, accessToken: 'test' } });
      await actions.fetchAnonUser()(mockDispatch, store.getState);
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch anything when user feature flag is disabled', async () => {
      features.content.isAnonUserCreationEnabled = () => false;
      await actions.fetchAnonUser()(mockDispatch, store.getState);
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });

  describe('fetchFavoriteHoroscopes', () => {
    beforeEach(() => {
      initialState.user.horoscopes.status = null; // To avoid short circuit condition
      store = mockStore(initialState);
      jest.spyOn(favSelectors, 'favHoroscopesEnabledSelector').mockReturnValue(true);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should stop execution when feature flag is disabled', async () => {
      jest.spyOn(favSelectors, 'favHoroscopesEnabledSelector').mockReturnValue(false);
      await actions.fetchFavoriteHoroscopes()(mockDispatch, store.getState);
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should stop execution when we have invalid requesting url', async () => {
      store.getState().page.domain = null;
      store.getState().user.horoscopes.requestingUrl = null;
      await actions.fetchFavoriteHoroscopes()(mockDispatch, store.getState);
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should stop execution when status LOADING or SUCCESS', async () => {
      store.getState().user.horoscopes.status = SUCCESS;
      await actions.fetchFavoriteHoroscopes()(mockDispatch, store.getState);

      store.getState().user.horoscopes.status = LOADING;
      await actions.fetchFavoriteHoroscopes()(mockDispatch, store.getState);

      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should refresh horoscopes content when requestingUrl in the page changed', async () => {
      store.getState().page.domain = 'http://www.tudn.com';
      await actions.fetchFavoriteHoroscopes()(mockDispatch, store.getState);

      const newHoroscopesState = {
        horoscopes: slice.initialState.horoscopes,
      };
      expect(mockDispatch).toHaveBeenCalledWith(
        slice.setUserState(newHoroscopesState)
      );
    });

    it('should dispatch fetchFavoriteHoroscopes action if preconditions pass', async () => {
      await actions.fetchFavoriteHoroscopes()(mockDispatch, store.getState);
      expect(mockDispatch).toHaveBeenCalledWith(
        slice.fetchFavoriteHoroscopes({
          widgetKey,
          requestingUrl: 'https://www.univision.com/',
          restartAction: actions.restartAnonymousUser,
        })
      );
    });
  });

  describe('updateFavoriteHoroscopes', () => {
    beforeEach(() => {
      jest.spyOn(fetchGraphQL, 'fetchAuthGraphQL').mockImplementation(
        async () => Promise.resolve({ updateFavoriteHoroscopeSign: favoritesResponse })
      );
    });
    it('should stop execution if fetch favorites horoscopes was not SUCCESS', async () => {
      expect.assertions(1);
      await actions.updateFavoriteHoroscopes('2')(mockDispatch, store.getState);
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should stop execution if operation with that favorite id is LOADING', async () => {
      expect.assertions(1);
      initialState.user.horoscopes.status = LOADING;
      store = mockStore(initialState);
      await actions.updateFavoriteHoroscopes('2')(mockDispatch, store.getState);
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should be isRemove = true when id already exist', async () => {
      expect.assertions(1);
      await actions.updateFavoriteHoroscopes('1')(mockDispatch, store.getState);
      expect(mockDispatch).toHaveBeenCalledWith(
        {
          id: '1',
          isRemove: true,
          requestingUrl: 'https://www.univision.com/',
          restartAction: actions.restartAnonymousUser,
        }
      );
    });

    it('should be isRemove = false when id does not exist', async () => {
      expect.assertions(1);
      await actions.updateFavoriteHoroscopes('3')(mockDispatch, store.getState);
      expect(mockDispatch).toHaveBeenCalledWith(
        {
          id: '3',
          isRemove: false,
          requestingUrl: 'https://www.univision.com/',
          restartAction: actions.restartAnonymousUser,
        }
      );
    });
  });

  describe('restartAnonymousUser', () => {
    it('should clear local storage user information, redux state, and creat user again', () => {
      LocalStorage.setObject(ANON_USER_TOKEN_KEY, 'test');
      expect(LocalStorage.get(ANON_USER_TOKEN_KEY)).toBeDefined();
      actions.restartAnonymousUser()(mockDispatch, store.getState);
      expect(LocalStorage.get(ANON_USER_TOKEN_KEY)).toEqual(null);

      expect(mockDispatch.mock.calls[0][0]).toEqual(slice.resetUserState());
      expect(mockDispatch.mock.calls[1][0]).toEqual(slice.fetchAnonUser());
    });
  });

  describe('addUserReaction', () => {
    it('should add a user reaction', () => {
      actions.addUserReaction({
        contentId: 'test', reaction: 'LIKE',
      })(mockDispatch, store.getState);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, expect.objectContaining({
        type: 'reactions/incrementCount',
      }));
      expect(mockDispatch).toHaveBeenNthCalledWith(2, expect.objectContaining({
        type: slice.setUserReaction.toString(),
      }));
      expect(mockDispatch).toHaveBeenNthCalledWith(3, expect.any(Function));
    });
  });

  describe('removeUserReaction', () => {
    it('should remove a user reaction', () => {
      actions.removeUserReaction({
        contentId: 'test',
      })(mockDispatch, store.getState);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, expect.objectContaining({
        payload: {
          contentId: 'test',
          reaction: 'LIKE',
        },
        type: 'reactions/decrementCount',
      }));
      expect(mockDispatch).toHaveBeenNthCalledWith(2, expect.objectContaining({
        type: slice.unsetUserReaction.toString(),
      }));
      expect(mockDispatch).toHaveBeenNthCalledWith(3, expect.any(Function));
    });
  });
});
