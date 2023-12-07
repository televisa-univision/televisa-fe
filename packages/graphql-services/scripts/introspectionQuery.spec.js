import axios from 'axios';
import introspectionQuery from './introspectionQuery';

const url = 'https://www.univision.com';

jest.mock('axios');

describe('Introspection Query tests', () => {
  it('should return the schema if status is 200', async () => {
    expect.assertions(1);
    jest.spyOn(axios, 'post').mockImplementationOnce(() => Promise.resolve({ data: { data: '123' }, status: 200 }));

    const res = await introspectionQuery(url);
    expect(res.data).toEqual('123');
  });

  it('should raise exception if no errors in response', () => {
    expect.assertions(1);
    jest.spyOn(axios, 'post').mockImplementationOnce(() => Promise.resolve({ data: { data: '123' }, status: 401, statusText: 'Bad request' }));

    return introspectionQuery(url)
      .catch((err) => {
        expect(err.message).toEqual('Bad request');
      });
  });


  it('should raise exception with errors in response if status is not 200', () => {
    jest.spyOn(axios, 'post').mockImplementationOnce(() => Promise.resolve({ data: { errors: [{ message: 'Err1' }, { message: 'Err2' }] }, status: 400 }));

    return introspectionQuery(url)
      .catch((err) => {
        expect(err.message).toEqual('Err1\nErr2');
      });
  });
});
