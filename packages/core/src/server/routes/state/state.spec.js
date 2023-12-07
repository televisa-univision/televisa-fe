import PageApi from 'server/proxy/api/page/PageApi';
import { NEXTJS } from '@univision/fe-commons/dist/constants/nextjs';
import * as serverState from '.';

jest.mock('../../webapi/WebApiRequest', () => ({
  getWebApiUrl: () => 'https://test.com/?url=https://www.univision.com/test',
  getContentDomain: () => 'www.univision.com',
  getHttpHeaders: () => ({}),
}));

jest.mock('server/proxy/api/page/PageApi', () => ({
  getPage: jest.fn(),
}));

describe('SSR Initial State', () => {
  it('should return the SSR initial state', async () => {
    PageApi.getPage.mockReturnValueOnce(Promise.resolve({
      data: {
        type: 'test',
      },
      navigationCount: 0,
    }));
    const req = {
      query: {
        url: 'https://wwww.univision.com/test',
      },
      headers: {},
    };
    const res = {
      send: jest.fn(),
      get: jest.fn(),
      setHeader: jest.fn(),
    };
    const initialState = await serverState.sendInitialState(req, res);
    expect(res.send).toHaveBeenCalledWith({ data: initialState });
    expect(initialState.page).toMatchObject({
      data: {
        type: 'test',
      },
    });
    expect(initialState.headerConf).toBeDefined();
    expect(initialState.search).toBeDefined();
  });

  it('should follow a syndicator redirect', async () => {
    const mockedStore = {
      dispatch: jest.fn(),
      getState: () => ({
        page: {
          data: {
            type: 'redirectdata',
            url: 'http://www.univision.com/noticias',
          },
        },
      }),
    };
    await serverState.dispatchGetApiContent(mockedStore, '');
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(3);
  });

  it('should not follow syndicator redirect if external domain', async () => {
    const mockedStore = {
      dispatch: jest.fn(),
      getState: () => ({
        page: {
          data: {
            type: 'redirectdata',
            url: 'http://www.somedomain.com/test',
          },
        },
      }),
    };
    await serverState.dispatchGetApiContent(mockedStore, '');
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should not follow syndicator if request from nextjs', async () => {
    const mockedStore = {
      dispatch: jest.fn(),
      getState: () => ({
        page: {
          data: {
            type: 'redirectdata',
            url: 'http://www.univision.com/test',
          },
        },
      }),
    };
    await serverState.dispatchGetApiContent(mockedStore, '', NEXTJS);
    expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should catch errors.', async () => {
    const req = {
      query: {
        url: 'https://wwww.univision.com/test',
      },
      headers: {},
    };
    const res = {
      send: jest.fn(),
      get: 'invalid function to force error',
      setHeader: 'invalid function to force error',
      header: jest.fn(),
    };
    const initialState = await serverState.sendInitialState(req, res);
    expect(initialState.error).toBeDefined();
  });

  it('should handle 404', async () => {
    PageApi.getPage.mockReturnValueOnce(Promise.resolve({
      data: {
        error: 'Error',
        status: 404,
      },
    }));
    const req = {
      query: {
        url: 'https://wwww.univision.com/test',
      },
      headers: {},
    };
    const res = {
      send: jest.fn(),
      get: jest.fn(),
      setHeader: jest.fn(),
      status: () => ({ send: jest.fn() }),
    };
    const initialState = await serverState.sendInitialState(req, res);
    expect(initialState.data.status).toBe(404);
    expect(initialState.data.page).toBeDefined();
    expect(initialState.data.page.sites).toBeDefined();
  });

  it('should send redirect data', async () => {
    PageApi.getPage.mockReturnValueOnce(Promise.resolve({
      data: {
        type: 'redirectdata',
      },
    }));
    const req = {
      query: {
        url: 'https://wwww.univision.com/test',
      },
      headers: {},
    };
    const res = {
      send: jest.fn(),
      get: jest.fn(),
      setHeader: 'invalid function to force error',
      header: jest.fn(),
    };
    await serverState.sendInitialState(req, res);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  it('should catch error when url is undefined', async () => {
    const req = {
      query: {},
      headers: {},
    };
    const res = {
      send: jest.fn(),
      get: 'invalid function to force error',
      setHeader: 'invalid function to force error',
      header: jest.fn(),
    };
    const initialState = await serverState.sendInitialState(req, res);
    expect(initialState.error).toBeDefined();
  });

  it('should remove userLocation from query', async () => {
    PageApi.getPage.mockReturnValueOnce(Promise.resolve({
      data: {
        type: 'test',
      },
      navigationCount: 0,
    }));
    const req = {
      query: {
        userLocation: 'US',
        url: 'https://www.tudn.com',
      },
      headers: {},
    };
    const res = {
      send: jest.fn(),
      get: jest.fn(),
      setHeader: jest.fn(),
      header: jest.fn(),
    };
    const initialState = await serverState.sendInitialState(req, res);
    expect(initialState.page.data).toEqual(
      expect.objectContaining({ type: 'test' })
    );
    expect(req.query.userLocation).toBeUndefined();
  });
});
