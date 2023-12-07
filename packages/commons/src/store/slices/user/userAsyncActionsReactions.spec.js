import addReaction from '@univision/fe-graphql-services/dist/requests/mutations/addReaction';
import removeReaction from '@univision/fe-graphql-services/dist/requests/mutations/removeReaction';

import * as fetchGraphQL from '../../../utils/api/graphql';
import * as clientLogging from '../../../utils/logging/clientLogging';
import promiseMock from '../../../utils/jest/helpers';
import configureStore from '../../configureStore';
import { writeReactionCreator, removeReactionCreator } from './user-asyncActions';
import { loggingLevels } from '../../../utils/logging/loggingLevels';
import * as userSlice from './user-slice';

jest.useFakeTimers();
jest.mock('../../configureStore');

describe('user async actions reactions creators', () => {
  const userState = userSlice.initialState;
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
      page: pageState,
    };
    store = configureStore(initialState);
    fetchSpy = jest.spyOn(fetchGraphQL, 'fetchAuthGraphQL');
    loggerSpy = jest.spyOn(clientLogging, 'clientLevelLogging').mockImplementation(() => jest.fn());
  });

  describe('writeReactionCreator', () => {
    it('should call fetchAuthGraphQL', async () => {
      const response = 'test';
      const contentId = 'test';
      const reaction = 'test';
      fetchSpy.mockReturnValue(promiseMock({
        resolve: response,
      }));
      jest.runAllTimers();
      const request = await writeReactionCreator(
        { contentId, reaction },
        { getState: store.getState }
      );

      expect.assertions(2);
      expect(fetchSpy).toHaveBeenCalledWith({
        query: addReaction,
        variables: { contentId, reaction },
        token: initialState.user.accessToken,
        serverUri: initialState.page.config.graphql,
      });
      expect(request).toEqual({ contentId, reaction });
    });
    it('should reject when an error is thrown', async () => {
      fetchSpy.mockReturnValue(promiseMock({
        reject: new Error('test'),
      }));
      jest.runAllTimers();

      expect.assertions(2);
      try {
        await writeReactionCreator({ contentId: 'test' }, { getState: store.getState });
      } catch (err) {
        expect(err.message).toEqual('test');
        expect(loggerSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            level: loggingLevels.warn,
          })
        );
      }
    });
    it('should log error when error status > 408', async () => {
      const fetchError = new Error('test');
      fetchError.status = 500;
      fetchSpy.mockReturnValue(promiseMock({
        reject: fetchError,
      }));
      jest.runAllTimers();

      expect.assertions(2);
      try {
        await writeReactionCreator({ contentId: 'test' }, { getState: store.getState });
      } catch (err) {
        expect(err.message).toEqual('test');
        expect(loggerSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            level: loggingLevels.error,
          })
        );
      }
    });
  });
  describe('removeReactionCreator', () => {
    it('should call fetchAuthGraphQL', async () => {
      const response = 'test';
      const contentId = 'test';
      fetchSpy.mockReturnValue(promiseMock({
        resolve: response,
      }));
      jest.runAllTimers();
      const request = await removeReactionCreator(
        { contentId },
        { getState: store.getState }
      );

      expect.assertions(2);
      expect(fetchSpy).toHaveBeenCalledWith({
        query: removeReaction,
        variables: { contentId },
        token: initialState.user.accessToken,
        serverUri: initialState.page.config.graphql,
      });
      expect(request).toEqual({ contentId });
    });
    it('should reject when an error is thrown', async () => {
      fetchSpy.mockReturnValue(promiseMock({
        reject: new Error('test'),
      }));
      jest.runAllTimers();

      expect.assertions(2);
      try {
        await removeReactionCreator({ contentId: 'test' }, { getState: store.getState });
      } catch (err) {
        expect(err.message).toEqual('test');
        expect(loggerSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            level: loggingLevels.warn,
          })
        );
      }
    });
    it('should log error when error status > 408', async () => {
      const fetchError = new Error('test');
      fetchError.status = 500;

      fetchSpy.mockReturnValue(promiseMock({
        reject: fetchError,
      }));
      jest.runAllTimers();

      try {
        await removeReactionCreator({ contentId: 'test' }, { getState: store.getState });
      } catch (err) {
        expect(err.message).toEqual('test');
        expect(loggerSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            level: loggingLevels.error,
          })
        );
      }
    });
  });
});
