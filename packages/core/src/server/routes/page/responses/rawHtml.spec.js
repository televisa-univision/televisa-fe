import sendResponse from './rawHtml';

const data = {
  ttl: 300,
  headers: [{
    name: 'x-request-id',
    value: '00000000-0000-0000-0000-000000000000',
  }],
};

const res = {
  headers: {
    'Cache-Control': 'max-age=0',
    'Edge-Control': '!no-store, cache-maxage=0s'
  },
  setHeader(prop, value) {
    this.headers[prop] = value;
  },
  send: jest.fn(),
};

describe('sendResponse', () => {
  it('Should returns headers with ttl with data headers', () => {
    const sendSpy = jest.spyOn(res, 'send');
    sendResponse(data, res);
    expect(sendSpy).toHaveBeenCalled();
    expect(res.headers['Cache-Control']).toEqual('max-age=300');
    expect(res.headers['Edge-Control']).toEqual('!no-store, cache-maxage=300s');
    expect(res.headers['x-request-id']).toEqual('00000000-0000-0000-0000-000000000000');
  });

  it('Should returns headers with ttl without data headers', () => {
    const sendSpy = jest.spyOn(res, 'send');
    delete data.headers;
    sendResponse(data, res);
    expect(sendSpy).toHaveBeenCalled();
    expect(res.headers['Cache-Control']).toEqual('max-age=300');
    expect(res.headers['Edge-Control']).toEqual('!no-store, cache-maxage=300s');
  });
});
