const axios = jest.genMockFromModule('axios');

// removes default values for axios
axios.defaults = {};

/**
 * Mock axios NodeJs module
 * @param {Error} err - the Error instance to error response
 * @param {Object} res - the response data from request
 * @returns {Function}
 */
function mockServerRequest() {
  const defaults = {
    err: null,
    res: {
      status: 200,
      data: {},
    },
  };

  return jest.fn((url, options) => {
    return new Promise((resolve, reject) => {
      const { err, res } = { ...defaults, ...axios.defaults, ...axios.parametersOnce };

      if (err) {
        reject(err);
      } else if (res) {
        if (res && typeof res.data === 'string') {
          res.data = JSON.parse(res.data);
        }
        res.request = { url, options };
        resolve(res);
      } else {
        reject(new Error('No response from Server Request'));
      }

      delete axios.parametersOnce;
    });
  });
}

axios.create = function create() {
  axios.defaults.headers = { common: {} };
  return axios;
};

axios.request.mockImplementation(mockServerRequest());
axios.get.mockImplementation(mockServerRequest());

axios.setParametersOnce = function setParametersOnce(error, res) {
  const err = error;
  if (err && !err.response) {
    err.response = {
      status: 500,
    };
  }
  axios.parametersOnce = { err, res };
};

export default axios;
