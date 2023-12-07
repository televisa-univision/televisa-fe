import { PRENDE_TV_LANDING } from '@univision/fe-prendetv/dist/constants';
import fetch from '@univision/fe-commons/dist/utils/fetch';

import { getPrefix } from '@univision/fe-prendetv/src/utils';
import setupPrendeTV from './setupPrendeTV';

const ctx = {
  req: {},
  res: {},
  asPath: PRENDE_TV_LANDING,
  query: { paths: null },
};

describe('setupPrendeTV test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should throw an HttpError by default', async () => {
    try {
      await setupPrendeTV();
    } catch (e) {
      expect(e.message).toBe('Missing page context');
    }
  });
  it('should return content with the context provided', async () => {
    const props = await setupPrendeTV(ctx);
    expect(props.device).toEqual('mobile');
  });
  it('should return mobile device when the context doesnt has request', async () => {
    const props = await setupPrendeTV({
      ...ctx,
      req: null,
    });
    expect(props.device).toEqual('mobile');
  });
  it('should return response status code as 404 when no path found', async () => {
    const params = {
      ...ctx,
    };
    fetch.setResponseOnce({ err: { status: 404 } });
    await setupPrendeTV(params);
    expect(params.res.statusCode).toEqual(404);
  });
  it('should take the path from proxy when the paths is not specified.', async () => {
    const params = {
      ...ctx,
      query: { proxy: 'press', paths: undefined },
      asPath: null,
    };
    const props = await setupPrendeTV(params);
    expect(props.path).toEqual(`${getPrefix()}/press`);
  });
  it('should take the path from paths.', async () => {
    const params = {
      ...ctx,
      query: { paths: ['press'] },
      asPath: null,
    };
    const props = await setupPrendeTV(params);
    expect(props.path).toEqual(`${getPrefix()}/press`);
  });
  it('should take the path from asPath when the query is undefined.', async () => {
    const params = {
      ...ctx,
      query: null,
      asPath: '/press',
    };
    const props = await setupPrendeTV(params);
    expect(props.path).toEqual('/press');
  });
  it('should not request to the backedn when the path is a file blacklisted.', async () => {
    const params = {
      ...ctx,
      res: {},
      asPath: 'prendetv.js',
    };
    fetch.setResponseOnce({ err: { status: 404 } });
    await setupPrendeTV(params);
    expect(params.res.statusCode).toEqual(404);
  });
});
