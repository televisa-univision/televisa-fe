const { default: fetch } = jest.genMockFromModule('@univision/fe-commons/dist/utils/fetch');

fetch.responseDefault = {
  err: null,
  res: {
    status: 'succees',
    data: {
      page: {
        data: {
          title: 'dummy',
          type: 'section',
        },
        config: {},
      },
    },
  },
};

// mock fetch by default to avoid unnecessary request calls
fetch.mockImplementation(jest.fn((url, options) => {
  return new Promise((resolve, reject) => {
    const { err, res } = { ...fetch.responseDefault, ...fetch.responseOnce };

    delete fetch.responseOnce;

    if (err) return reject(err);

    if (res) {
      res.request = { ...options };
      return resolve(res);
    }

    return reject(new Error('Fetch error'));
  });
}));

fetch.setResponse = function setParameters({ err, res }) {
  fetch.responseDefault = { err, res };
};

fetch.setResponseOnce = function setParameters({ err, res }) {
  fetch.responseOnce = { err, res };
};

export default fetch;
