import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isomorphicFetch from '../../fetch';
import { GRAPHQL_SERVICE_ERROR } from '../../../constants/messages';

/**
 * Makes a request to the GraphQL server
 * @param {Object} query - query to be made at the GraphQL server
 * @param {string} token - authentication token to be sent
 * @param {Object} variables - GraphQL variables to be sent with the query
 * @throws if not a valid query is provided
 * @returns {Object}
 */
export async function fetchGraphQL({
  query,
  token,
  variables = {},
  mockServer,
  serverUri,
} = {}) {
  if (!query) throw new Error('No valid GraphQL query provided!');

  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const options = {
    method: 'POST',
    headers,
    body: {
      query,
      variables,
    },
  };

  try {
    let response = null;
    if (mockServer) {
      response = await mockServer.query(query, variables, { latency: 1000 });
    } else {
      response = await isomorphicFetch(serverUri, options);
    }

    if (isValidArray(response?.errors)) {
      const error = new Error(JSON.stringify(response?.errors));
      error.name = GRAPHQL_SERVICE_ERROR;
      throw error;
    }
    if (!response?.data) {
      throw new Error(
        'Invalid GraphQL response data'
      );
    }
    return response.data;
  } catch (e) {
    throw e;
  }
}

/**
 * Makes a request to the GraphQL server using a JWT user token
 * @param {Object} args - arguments for the function fetchGraphQL
 * @throws if there is not an accessToken in the entry user.accessToken of Redux store
 * @returns {Object}
 */
export async function fetchAuthGraphQL(args) {
  try {
    const { token } = args;
    if (!token) throw Error('Invalid access token.');
    return await fetchGraphQL({ ...args, token });
  } catch (e) {
    throw e;
  }
}

export default fetchGraphQL;
