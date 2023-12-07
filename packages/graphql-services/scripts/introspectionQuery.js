const { getIntrospectionQuery } = require('graphql');
const axios = require('axios').default;

const data = JSON.stringify({
  query: getIntrospectionQuery({ descriptions: false }),
  variables: {},
});

module.exports = url => axios.post(url, data, { headers: { 'Content-Type': 'application/json' } }).then(async (response) => {
  if (response.status === 200) {
    return response.data;
  }
  const { errors } = response.data;
  if (errors && errors.length > 0) {
    throw new Error(errors.map(err => err.message).join('\n'));
  } else {
    throw new Error(response.statusText);
  }
});
