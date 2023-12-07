import { getKey } from '../../helpers';

const requestModule = jest.genMockFromModule('../requestNode');
const request = getKey(requestModule, 'default', requestModule);

request.mockImplementation(jest.fn((options) => {
  return new Promise((resolve, reject) => {
    const { err, res } = { ...request.parametersOnce };

    delete request.parametersOnce;

    if (err) return reject(err);

    if (res) {
      res.request = options;
      return resolve(res);
    }

    return reject(new Error('fails'));
  });
}));

request.setParametersOnce = function setParametersOnce(err, res) {
  this.parametersOnce = { err, res };
};

export default request;
