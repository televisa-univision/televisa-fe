import cconsole from '../dist/utils/console';

/**
 * Decorate the query function of a mocked graphql server to print out errors
 * @param {Object} graphQLMockServer graphql server mock
 * @returns {Object} graphql mock server that we can query
 */
export default graphQLMockServer => ({
  query: (query, variables, { latency = 0 } = {}) => graphQLMockServer.query(query, variables)
    .then(async (result) => {
      if (result.errors) {
        cconsole.error(`Query Error: ${result.errors.map(e => e.message).join('\n')}`);
      }

      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          resolve(result);
          clearTimeout(timeout);
        }, latency);
      });
    }),
});
