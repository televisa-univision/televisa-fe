import fetchContent, { fetchById, MAX_REDIRECTS_TO_FOLLOW } from './fetch';
import * as request from '../request';

jest.mock('../request', () => ({
  requestWithBasicAuth: jest.fn(async (args) => {
    const { id } = args.params;
    if (id) {
      return {
        data: {
          uid: id,
        },
      };
    }
    const uri = args.params.url.split('/')[1];
    if (uri === 'redirect') {
      return {
        data: {
          type: 'redirectdata',
          url: '/redirect-url',
        },
      };
    }
    if (uri === 'infinite-redirect') {
      return {
        data: {
          type: 'redirectdata',
          url: '/infinite-redirect',
        },
      };
    }
    return {
      data: { foo: 'bar' },
    };
  }),
}));

describe('fetchContent', () => {
  it('should respect the limit for redirects', async () => {
    await fetchContent('/infinite-redirect');
    expect(request.requestWithBasicAuth).toHaveBeenCalledTimes(MAX_REDIRECTS_TO_FOLLOW + 1);
  });

  it('should fetch the data', async () => {
    expect(await fetchContent('/test')).toEqual({ foo: 'bar' });
  });

  it('should fetch the data with absolute URL', async () => {
    expect(await fetchContent('https://univision.com/test')).toEqual({ foo: 'bar' });
  });

  it('should fetch the data from the redirect url', async () => {
    expect(await fetchContent('/redirect')).toEqual({ foo: 'bar' });
  });
});

describe('fetchById', () => {
  it('should fetch a content by the id', async () => {
    expect(await fetchById('123')).toEqual({ uid: '123' });
  });
});
