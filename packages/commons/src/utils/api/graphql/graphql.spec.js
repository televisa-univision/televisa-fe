import {
  fetchGraphQL,
  fetchAuthGraphQL,
} from '.';
import { GRAPHQL_SERVICE_ERROR } from '../../../constants/messages';

import * as fetch from '../../fetch';
import promiseMock from '../../jest/helpers';

const query = '{ query }';
const mockServer = { query: jest.fn(() => ({ data: {} })) };
const serverUri = 'https://www.univision.com';

describe('GraphQL request test', () => {
  let fetchSpy;

  beforeEach(() => {
    jest.useFakeTimers();
    fetchSpy = jest.spyOn(fetch, 'default').mockReturnValue(
      promiseMock({
        resolve: {
          data: {
            foo: 'bar',
          },
        },
      })
    );
    jest.runAllTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });

  describe('fetchGraphQL', () => {
    it('should throw an error by default', async () => {
      expect.assertions(1);
      await expect(fetchGraphQL()).rejects.toEqual(
        new Error('No valid GraphQL query provided!')
      );
    });

    it('should call fetch', async () => {
      await fetchGraphQL({ query });
      expect.assertions(1);
      expect(fetchSpy).toHaveBeenCalled();
    });

    it('should call fetch on mockServer', async () => {
      await fetchGraphQL({ query, mockServer });
      expect.assertions(1);
      expect(mockServer.query).toHaveBeenCalled();
    });

    it('should use the credentials header when a token is provided', async () => {
      await fetchGraphQL({
        query,
        token: '1234',
        serverUri,
      });
      const expectedObject = {
        headers: {
          Authorization: 'Bearer 1234',
          'Content-Type': 'application/json',
        },
      };
      expect.assertions(1);
      expect(fetchSpy).toHaveBeenLastCalledWith(
        serverUri,
        expect.objectContaining(expectedObject)
      );
    });

    it('should return the contents of the data node from the server response', async () => {
      fetchSpy.mockReturnValue(
        promiseMock({
          resolve: {
            data: {
              foo: 'bar',
            },
          },
        })
      );
      jest.runAllTimers();
      expect.assertions(1);
      await expect(fetchGraphQL({ query })).resolves.toEqual({ foo: 'bar' });
    });

    it('should throw the errors from the server response if there is any error', async () => {
      expect.assertions(2);
      const errors = [
        { message: 'Error1' },
        { message: 'Error2' },
      ];
      fetchSpy.mockReturnValue(
        promiseMock({
          resolve: {
            errors,
            data: {
              foo: 'bar',
            },
          },
        })
      );
      jest.runAllTimers();
      try {
        await fetchGraphQL({ query, serverUri });
      } catch (e) {
        expect(e.message).toEqual(JSON.stringify(errors));
        // This e.name is important and used in packages/commons/src/store/middlewares/user.js
        expect(e.name).toEqual(GRAPHQL_SERVICE_ERROR);
      }
    });

    it('should be able to handle the error when the request function throws an error', async () => {
      fetchSpy.mockImplementation(() => {
        throw new Error();
      });
      expect.assertions(1);
      await expect(fetchGraphQL({ query })).rejects.toEqual(new Error());
    });

    it('should throw an error when server response is empty', async () => {
      expect.assertions(1);
      fetchSpy.mockReturnValue(
        promiseMock({
          resolve: {},
        })
      );
      jest.runAllTimers();
      await expect(fetchGraphQL({ query }))
        .rejects.toEqual(
          new Error('Invalid GraphQL response data')
        );
    });
  });

  describe('fetchAuthGraphQL', () => {
    it('should throw error if there is no token between the arguments', async() => {
      expect.assertions(1);

      try {
        await fetchAuthGraphQL({
          query,
        });
      } catch (e) {
        expect(e).toEqual(new Error('Invalid access token.'));
      }
    });
    it('should use token from the arguments ', async() => {
      expect.assertions(1);

      await fetchAuthGraphQL({
        query,
        token: '1234',
        serverUri,
      });
      const expectedObject = {
        headers: {
          Authorization: 'Bearer 1234',
          'Content-Type': 'application/json',
        },
      };
      expect(fetchSpy).toHaveBeenLastCalledWith(
        serverUri,
        expect.objectContaining(expectedObject)
      );
    });
  });

  describe('fetch a real service tests', () => {
    /**
     * To test real service when needed but it should be skipped
     * to avoid potential issues in CI/CD process
     */
    it.skip('should fetch properly', async () => {
      fetchSpy.mockRestore();
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwY2FkODMzYy05OWZiLTQxNWYtYWJlOC1iNDE5MmNhY2Y2ZmMiLCJpYXQiOjE1ODY3ODc1MTd9.1GyOEpV0-onyfKKKTiRU5Hj2thnfgsy0cMU3C5t4h2E';
      const response = await fetchAuthGraphQL({
        query: 'query getFavoriteHoroscopes($requestingUrl: String!) {authenticatedUser {dailyHoroscopes(requestingUrl: $requestingUrl) {ids items {__typename}}}}',
        token,
        variables: {
          requestingUrl: 'https://uat2.x.univision.com/horoscopos',
        },
        uri: 'https://graphql.test-univision.com',
      });
      expect(response).toBeDefined();
    });
  });
});
