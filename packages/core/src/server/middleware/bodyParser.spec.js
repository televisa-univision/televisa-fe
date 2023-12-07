import { responseBodyParser } from './bodyParser';

let res;
const req = {};
const next = jest.fn();
const write = jest.fn();
const end = jest.fn();

describe('responseBodyParser', () => {
  beforeEach(() => {
    res = {
      write,
      end,
      get: () => 'application/json; charset=utf-8',
    };
  });

  it('should not call write and end methods when request method is HEAD method', () => {
    res.get = () => 'text';
    responseBodyParser({ method: 'HEAD' }, res, next);
    expect(write).not.toHaveBeenCalled();
    expect(end).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should handle properly any exception in order to invoke always end or write', () => {
    responseBodyParser(req, res, next);
    res.write(1);
    res.end(2);
    expect(res.body).toEqual(undefined);
  });

  it('should invoke old functions when write or end get invoked', () => {
    responseBodyParser(req, res, next);
    res.write();
    res.end();
    expect(write).toHaveBeenCalled();
    expect(end).toHaveBeenCalled();
  });

  it('should invoke original functions when content type is not the valid one', () => {
    res.get = () => 'text';
    responseBodyParser(req, res, next);
    res.write();
    res.end();
    expect(write).toHaveBeenCalled();
    expect(end).toHaveBeenCalled();
  });

  it('should add the body property to the response concatenating chunks', () => {
    responseBodyParser(req, res, next);
    res.write('1');
    res.end('2');
    expect(res.body).toEqual('12');
  });
});
