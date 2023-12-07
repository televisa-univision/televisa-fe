import configureMockStore from 'redux-mock-store';

import getReactions from '@univision/fe-graphql-services/dist/requests/queries/getReactions';

import * as fetchGraphQL from '../../../utils/api/graphql';
import * as clientLogging from '../../../utils/logging/clientLogging';
import promiseMock from '../../../utils/jest/helpers';
import features from '../../../config/features';

import { fetchReactionsAction } from './reactions-asyncActions';
import * as slice from './reactions-slice';

const mockFetch = {
  getReactions: {
    reactions: [
      {
        contentId: 'test',
        userReaction: 'test',
        counts: [
          {
            reaction: 'test',
            count: 1,
          },
        ],
      },
    ],
  },
};

jest.useFakeTimers();

describe('reactions async creators', () => {
  const mockStore = configureMockStore();
  const reactionsState = slice.initialState;
  const userState = {
    accessToken: 'test',
  };
  const pageState = {
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
      user: userState,
      reactions: reactionsState,
      page: pageState,
    };
    store = mockStore(initialState);
    fetchSpy = jest.spyOn(fetchGraphQL, 'fetchAuthGraphQL');
    loggerSpy = jest.spyOn(clientLogging, 'default').mockImplementation(() => jest.fn());
    features.actionBar.hasActionBar = jest.fn(() => true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchReactionsActions', () => {
    it('should call properly fetchAuthGraphQL', async () => {
      fetchSpy.mockReturnValue(promiseMock({
        resolve: mockFetch,
      }));
      jest.runAllTimers();
      const contentIds = ['test'];
      const reactions = await fetchReactionsAction({ contentIds }, { getState: store.getState });

      expect.assertions(2);
      expect(fetchSpy).toHaveBeenCalledWith({
        query: getReactions,
        variables: { contentIds },
        token: initialState.user.accessToken,
        serverUri: initialState.page.config.graphql,
      });
      expect(reactions[0]).toEqual(expect.objectContaining({ contentId: 'test' }));
    });

    it('should reject when an error is thrown', async () => {
      const mockError = new Error('test');
      mockError.status = 400;
      fetchSpy.mockReturnValue(promiseMock({
        reject: mockError,
      }));
      jest.runAllTimers();
      const contentIds = ['test'];

      expect.assertions(2);
      try {
        await fetchReactionsAction({ contentIds }, { getState: store.getState });
      } catch (err) {
        expect(err.message).toEqual('Reactions Service Error: fetchReactions rejected: test ""');
        expect(loggerSpy).toHaveBeenCalled();
      }
    });

    it('should reject when an error is thrown and include payload errors', async () => {
      const mockError = new Error('test');
      mockError.payload = { errors: 'error' };
      fetchSpy.mockReturnValue(promiseMock({
        reject: mockError,
      }));
      jest.runAllTimers();
      const contentIds = ['test'];

      expect.assertions(2);
      try {
        await fetchReactionsAction({ contentIds }, { getState: store.getState });
      } catch (err) {
        expect(err.message).toEqual('Reactions Service Error: fetchReactions rejected: test "error"');
        expect(loggerSpy).toHaveBeenCalled();
      }
    });

    it('should not call logger if error does not include status or payload.errors', async () => {
      const mockError = new Error('test');
      fetchSpy.mockReturnValue(promiseMock({
        reject: mockError,
      }));
      jest.runAllTimers();
      const contentIds = ['test'];

      expect.assertions(2);
      try {
        await fetchReactionsAction({ contentIds }, { getState: store.getState });
      } catch (err) {
        expect(err.message).toEqual('Reactions Service Error: fetchReactions rejected: test');
        expect(loggerSpy).not.toHaveBeenCalled();
      }
    });

    it('should not call fetchAuthGraphQL when the feature is disabled', async () => {
      features.actionBar.hasActionBar = () => false;
      const contentIds = ['test'];
      const reactions = await fetchReactionsAction({ contentIds }, { getState: store.getState });

      expect.assertions(2);
      expect(fetchSpy).not.toHaveBeenCalled();
      expect(reactions).toEqual([]);
    });

    it('should not call fetchAuthGraphQL when contentIds is empty', async () => {
      const reactions = await fetchReactionsAction({
        contentIds: [],
      }, { getState: store.getState });
      expect.assertions(2);
      expect(fetchSpy).not.toHaveBeenCalled();
      expect(reactions).toEqual([]);
    });

    it('should not call fetchAuthGraphQL when filtered ids is empty', async () => {
      initialState = {
        user: userState,
        page: pageState,
        reactions: {
          allIds: ['test'],
        },
      };
      store = mockStore(initialState);
      const contentIds = ['test'];
      const reactions = await fetchReactionsAction(
        { contentIds },
        { getState: store.getState }
      );
      expect.assertions(2);
      expect(reactions).toEqual([]);
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });
});
