import fetch from '@univision/fe-commons/dist/utils/fetch';
import * as getDeviceFromRequest from '@univision/fe-commons/dist/utils/server/deviceDetector';
import * as pageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import {
  TUDN_SITE,
  MULHER_SITE,
} from '@univision/fe-commons/dist/constants/sites';
import { FROM, NEXTJS, COUNTRY } from '@univision/fe-commons/dist/constants/nextjs';
import { EMBED_PATH } from '@univision/fe-commons/dist/constants/video';
import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import {
  USER_AGENT,
  X_IS_USER_LOC_EU,
  X_UA_DEVICE,
  X_USER_LOCATION,
} from '@univision/fe-commons/dist/constants/requestHeaders';
import { MX, US } from '@univision/fe-commons/dist/constants/userLocation';

import mockData from '../../../__mocks__/tudnPageData.json';
import * as config from '../../config';
import HttpError from './HttpError';
// eslint-disable-next-line import/named
import setupPage from './setupPage';
import * as serverUtils from '../server/setupUtils';

const nextjsQuery = `&${FROM}=${NEXTJS}&${COUNTRY}=${US}`;

const stateUrl = 'https://uat.tudn.com/proxy/api/cached/web-app-state?url=';
const store = configureStore();
const context = {
  asPath: '/',
  store,
  query: {
    serverQuery: true,
  },
};
const serverContext = {
  ...context,
  res: {
    setHeader: jest.fn(),
    end: jest.fn(),
    writeHead: jest.fn(),
  },
  req: {
    headers: {
      [USER_AGENT]: 'Mozilla',
      [X_UA_DEVICE]: 'pc',
      [X_IS_USER_LOC_EU]: 'true',
      [X_USER_LOCATION]: 'US',
    },
  },
  isServer: true,
};
const stateMock = {
  data: {
    ...mockData.data,
    headerConf: {
      activePath: 'https://uat.tudn.com',
      brandedNavLogoName: 'tudn',
      brandedNavLogoUri: '/',
      contentType: 'section',
      globalNavTop: true,
      links: mockData.data.headerConf.links,
      shouldRenderMVPD: true,
      slideshowType: undefined,
      subNavType: 'sectionSubNav',
      title: null,
      vertical: 'Deportes',
    },
  },
};

// Mocks
fetch.setResponse({ res: stateMock });

/**
 * @test {page/setupPage}
 */
describe('setupPage test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should fetch webapi endpoint to get page data', async () => {
    process.env.API_ENV = 'uat2';
    process.env.PROXY_API_URL = 'https://uat.tudn.com';
    const initialProps = await setupPage(serverContext, TUDN_SITE);

    expect(fetch).toHaveBeenCalledWith(
      `${stateUrl}https%3A%2F%2Fuat.tudn.com%2F${nextjsQuery}`,
      { params: { device: 'mobile' } },
    );
    expect(initialProps.page).toEqual(stateMock.data.page);
  });

  it('should fetch webapi endpoint with params', async () => {
    process.env.API_ENV = 'uat2';
    process.env.PROXY_API_URL = 'https://uat.tudn.com';
    const query = { q: 'test' };
    await setupPage({ ...serverContext, query }, TUDN_SITE);

    expect(fetch).toHaveBeenCalledWith(`${stateUrl}https%3A%2F%2Fuat.tudn.com%2F${nextjsQuery}`, {
      params: {
        ...query,
        device: 'mobile',
      },
    });
  });

  it('should fetch webapi endpoint from query paths', async () => {
    process.env.API_ENV = 'uat2';
    process.env.PROXY_API_URL = 'https://uat.tudn.com';
    const params = { q: 'test', device: 'mobile' };
    const query = { paths: ['futbol', 'test'], ...params };
    await setupPage({ ...serverContext, query }, TUDN_SITE);

    expect(fetch).toHaveBeenCalledWith(`${stateUrl}https%3A%2F%2Fuat.tudn.com%2Ffutbol%2Ftest${nextjsQuery}`, { params });
  });

  it('should fetch webapi endpoint to get page data for /.well-known/assetlink.json', async () => {
    process.env.API_ENV = 'uat2';
    process.env.PROXY_API_URL = 'https://uat.tudn.com';
    const initialProps = await setupPage({ ...serverContext, asPath: '/.well-known/assetlinks.json' }, TUDN_SITE);

    expect(fetch).toHaveBeenCalledWith(
      `${stateUrl}https%3A%2F%2Fuat.tudn.com%2F.well-known%2Fassetlinks.json${nextjsQuery}`,
      { params: { device: 'mobile' } },
    );
    expect(initialProps.page).toEqual(stateMock.data.page);
  });

  it('should not set in intialState proxy param', async () => {
    const params = { proxy: 'https:/tudn.com/futbol' };
    const query = { paths: ['futbol', 'test'], ...params };
    const initialProps = await setupPage({ ...serverContext, query }, TUDN_SITE);

    expect(initialProps.page.requestParams).toEqual({});
  });

  it('should set config on server side', async () => {
    process.env.DEPLOY_ENV = 'test';
    const getClientConfigSpy = jest.spyOn(config, 'getClientConfig');
    const configSelectorSpy = jest.spyOn(pageSelectors, 'configSelector');
    const initialProps = await setupPage(serverContext, TUDN_SITE);

    expect(initialProps.page.config).toHaveProperty('deploy.env', 'test');
    expect(getClientConfigSpy).toHaveBeenCalled();
    expect(configSelectorSpy).not.toHaveBeenCalled();
    getClientConfigSpy.mockRestore();
    configSelectorSpy.mockRestore();
  });

  it('should set config on client side', async () => {
    const pageMock = stateMock.data.page;
    store.dispatch(setPageData({
      ...pageMock,
      config: {
        ...pageMock.config, deploy: { env: 'prod' },
      },
    }));
    const getClientConfigSpy = jest.spyOn(config, 'getClientConfig');
    const configSelectorSpy = jest.spyOn(pageSelectors, 'configSelector');
    const initialProps = await setupPage(context, TUDN_SITE);

    expect(initialProps.page.config).toHaveProperty('deploy.env', 'prod');
    expect(configSelectorSpy).toHaveBeenCalled();
    expect(getClientConfigSpy).not.toHaveBeenCalled();
    getClientConfigSpy.mockRestore();
    configSelectorSpy.mockRestore();
  });

  it('should set device on server side', async () => {
    const getDeviceFromRequestSpy = jest.spyOn(getDeviceFromRequest, 'default');
    const deviceSelectorSpy = jest.spyOn(pageSelectors, 'deviceSelector');
    const uaDeviceSelectorSpy = jest.spyOn(pageSelectors, 'uaDeviceSelector');
    const serverContextMobile = {
      ...serverContext,
      req: {
        headers: {
          [USER_AGENT]: 'Mozilla',
          [X_UA_DEVICE]: 'mobile-android',
        },
      },
    };
    const windowRef = global.window;
    delete global.window;
    const initialProps = await setupPage(serverContextMobile, TUDN_SITE);

    expect(initialProps.page.device).toEqual('mobile');
    expect(initialProps.page.uaDevice).toEqual('mobile-android');
    expect(deviceSelectorSpy).not.toHaveBeenCalled();
    expect(uaDeviceSelectorSpy).not.toHaveBeenCalled();

    getDeviceFromRequestSpy.mockRestore();
    deviceSelectorSpy.mockRestore();
    global.window = windowRef;
  });

  it('should set device on client side', async () => {
    store.dispatch(setPageData({ device: 'desktop', uaDevice: 'pc' }));
    const getDeviceFromRequestSpy = jest.spyOn(getDeviceFromRequest, 'default');
    const deviceSelectorSpy = jest.spyOn(pageSelectors, 'deviceSelector');
    const uaDeviceSelectorSpy = jest.spyOn(pageSelectors, 'uaDeviceSelector');
    const initialProps = await setupPage(context, TUDN_SITE);

    expect(initialProps.page.device).toEqual('desktop');
    expect(initialProps.page.uaDevice).toEqual('pc');
    expect(deviceSelectorSpy).toHaveBeenCalled();
    expect(uaDeviceSelectorSpy).toHaveBeenCalled();
    expect(getDeviceFromRequestSpy).not.toHaveBeenCalled();

    deviceSelectorSpy.mockRestore();
    getDeviceFromRequestSpy.mockRestore();
  });

  it('should set breakpoint on client side', async () => {
    const breakpoint = {
      size: 'lg',
      width: 1440,
      device: 'desktop',
    };
    store.dispatch(setPageData({
      breakpoint,
    }));
    const breakpointSelectorSpy = jest.spyOn(pageSelectors, 'breakpointSelector');
    const initialProps = await setupPage(context, TUDN_SITE);

    expect(initialProps.page.breakpoint).toEqual(breakpoint);
    expect(breakpointSelectorSpy).toHaveBeenCalled();
  });

  it('should set user agent on server side', async () => {
    const pageState = await setupPage(serverContext, TUDN_SITE);
    expect(pageState.page.userAgent).toBe('Mozilla');
  });

  it('should set user agent on client side', async () => {
    jest.spyOn(pageSelectors, 'userAgentSelector').mockReturnValueOnce('Mozilla');
    const pageState = await setupPage(context, TUDN_SITE);
    expect(pageState.page.userAgent).toBe('Mozilla');
  });

  it('should set eu user loc flag', async () => {
    const pageState = await setupPage(serverContext, TUDN_SITE);
    expect(pageState.page.headers[X_IS_USER_LOC_EU]).toBe('true');
  });

  it('should set eu user loc flag on client side', async () => {
    jest.spyOn(pageSelectors, 'requestHeadersSelector').mockReturnValueOnce({ [X_IS_USER_LOC_EU]: 'false' });
    const pageState = await setupPage(context, TUDN_SITE);
    expect(pageState.page.headers[X_IS_USER_LOC_EU]).toBe('false');
  });

  it('should dispatch sync action to support old global store', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    await setupPage(context, TUDN_SITE);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    dispatchSpy.mockRestore();
  });

  it('should throw error if data is not valid', async() => {
    try {
      await setupPage();
    } catch (e) {
      expect(e.message).toBe('Missing page context');
    }
  });

  it('should throw error if context is not valid', async() => {
    fetch.setResponseOnce({ res: null });

    return expect(setupPage(null, TUDN_SITE)).rejects.toHaveProperty('message', 'Missing page context');
  });

  it('should resolve with error data on 404', async() => {
    fetch.setResponseOnce({ err: { status: 404 } });

    return expect(setupPage(serverContext, TUDN_SITE)).resolves.toEqual(expect.objectContaining({
      error: expect.any(HttpError),
    }));
  });

  it('should return empty object on redirect', async () => {
    fetch.setResponseOnce({ res: { type: 'redirectdata' } });

    return expect(setupPage(serverContext, TUDN_SITE)).resolves.toEqual({});
  });

  it('should set request parameter from requet on server side', async () => {
    const pageState = await setupPage(serverContext, TUDN_SITE);
    expect(pageState.page.requestParams).toEqual({ serverQuery: true });
  });

  it('should set request parameter from requet on on client side', async () => {
    const storeQuery = { storeQuery: true };
    store.dispatch(setPageData({ requestParams: storeQuery }));
    const pageState = await setupPage(context, TUDN_SITE);
    expect(pageState.page.requestParams).toEqual(storeQuery);
  });

  it('should set page category override', async () => {
    const storeQuery = { storeQuery: true };
    store.dispatch(setPageData({ requestParams: storeQuery }));
    const pageState = await setupPage(context, MULHER_SITE);
    expect(pageState.page.pageCategory).toEqual('mulher');
  });

  it('should return empty query by default', async () => {
    const sampleContext = {
      asPath: '/',
      store,
      req: {
        headers: {
          'user-agent': 'Mozilla',
        },
      },
    };
    const pageState = await setupPage(sampleContext, TUDN_SITE);
    expect(pageState.page.requestParams).toEqual({});
  });

  it('should ignore request based on ignored path configuration', async () => {
    const sampleContext = {
      ...serverContext,
      query: { paths: ['path', 'not', 'allowed.js'] },
    };
    jest.spyOn(serverUtils, 'setNotFoundProps');
    await setupPage(sampleContext, TUDN_SITE);
    expect(serverUtils.setNotFoundProps).toHaveBeenCalled();
  });

  it('should not ignore request if is an allowed path', async () => {
    const sampleContext = {
      ...serverContext,
      asPath: '/futbol-js',
    };
    const pageState = await setupPage(sampleContext, TUDN_SITE);
    expect(sampleContext.res.end).toHaveBeenCalledTimes(0);
    expect(pageState).toHaveProperty('page');
  });

  it('should set navigationCount on server side', async () => {
    const pageState = await setupPage(serverContext, TUDN_SITE);
    expect(pageState.page.navigationCount).toBe(0);
  });

  it('should set navigationCount on client side', async () => {
    jest.spyOn(pageSelectors, 'navigationCountSelector').mockReturnValueOnce(2);
    const pageState = await setupPage(context, TUDN_SITE);
    expect(pageState.page.navigationCount).toBe(3);
  });

  it('should add video embed as content type', async () => {
    const embedContext = {
      asPath: `/video/${EMBED_PATH}`,
      store,
    };
    const pageState = await setupPage(embedContext, TUDN_SITE);
    expect(pageState.page.data.type).toBe(contentTypes.VIDEO_EMBEDDED);
  });

  it('should not add video embed as content type if 404', async () => {
    const embedContext = {
      asPath: `/video/${EMBED_PATH}`,
      store,
    };
    fetch.setResponseOnce({ err: { status: 404 } });
    const pageState = await setupPage(embedContext, TUDN_SITE);
    expect(pageState.page.data.type).not.toBe(contentTypes.VIDEO_EMBEDDED);
  });

  it('should fetch webapi with clean path', async () => {
    const embedContext = {
      asPath: `/video/${EMBED_PATH}`,
      store,
    };
    process.env.API_ENV = 'uat2';
    process.env.PROXY_API_URL = 'https://uat.tudn.com';
    await setupPage(embedContext, TUDN_SITE);
    expect(fetch).toHaveBeenCalledWith(`${stateUrl}https%3A%2F%2Fuat.tudn.com%2Fvideo%2F${nextjsQuery}`, {
      params: {},
    });
  });
  it('should fetch webapi with clean path and ignore cleaning if path is not string', async () => {
    const embedContext = {
      asPath: {},
      store,
    };
    process.env.API_ENV = 'uat2';
    process.env.PROXY_API_URL = 'https://uat.tudn.com';
    await setupPage(embedContext, TUDN_SITE);
    expect(fetch).toHaveBeenCalledWith(`${stateUrl}https%3A%2F%2Fuat.tudn.com%2F${nextjsQuery}`, {
      params: {},
    });
  });
  it('should redirect on client', async () => {
    const windowLocRef = window.location;
    delete window.location;
    window.location = {};
    fetch.setResponseOnce({
      res: {
        type: 'redirectdata',
        url: 'https://www.univision.com/radio/los-angeles-klve-fm',
      },
    });
    const dataResponse = await setupPage(context, TUDN_SITE);
    expect(dataResponse).toEqual({});
    window.location = windowLocRef;
  });
  it('should return empty object if res type is redirectdata and req is null', async() => {
    const windowLocRef = window.location;
    delete window.location;
    window.location = {};

    const data = {
      res: {
        type: 'redirectdata',
        url: 'https://www.univision.com',
      },
      req: null,
    };

    fetch.setResponseOnce(data);

    const dataResponse = await setupPage(context, TUDN_SITE);
    expect(dataResponse).toEqual({});

    window.location = windowLocRef;
  });

  it('should handle redirection of type "redirectdata"', async() => {
    const windowLocRef = window.location;
    delete window.location;
    window.location = {};

    const data = {
      res: {
        type: 'redirectdata',
      },
      req: null,
    };

    fetch.setResponseOnce(data);

    const dataResponse = await setupPage(context, TUDN_SITE);
    expect(dataResponse.page.site).toBe(TUDN_SITE);

    window.location = windowLocRef;
  });

  it('should set default value for pageData when it is undefined and resolve error for 404', async() => {
    const response = JSON.parse(JSON.stringify(stateMock));
    delete response.data.page;
    fetch.setResponseOnce({ res: response });

    const pageState = await setupPage(context, TUDN_SITE);
    expect(pageState.page).toEqual(expect.anything());
    expect(pageState).toEqual(expect.objectContaining({
      error: expect.any(HttpError),
    }));
  });
  it('should redirect on client', async () => {
    const windowLocRef = window.location;
    delete window.location;
    window.location = {};
    fetch.setResponseOnce({
      res: {
        type: 'redirectdata',
        url: 'https://www.univision.com/radio/los-angeles-klve-fm',
      },
    });
    const dataResponse = await setupPage(context, TUDN_SITE);
    expect(dataResponse).toEqual({});
    window.location = windowLocRef;
  });

  it('should redirect if no www on host', () => {
    const ctx = {
      ...serverContext,
      isServer: true,
      req: {
        headers: {
          host: 'mulher.com.br',
        },
      },
    };

    setupPage(ctx, 'mulher');
    expect(ctx.res.writeHead).toHaveBeenCalledWith(301, { location: 'https://www.mulher.com.br' });
    expect(ctx.res.end).toHaveBeenCalled();
  });

  it('should redirect if no www on host and url available', () => {
    const ctx = {
      ...serverContext,
      isServer: true,
      req: {
        url: '/robots.txt',
        headers: {
          host: 'mulher.com.br',
        },
      },
    };

    setupPage(ctx, 'mulher');
    expect(ctx.res.writeHead).toHaveBeenCalledWith(301, { location: 'https://www.mulher.com.br/robots.txt' });
    expect(ctx.res.end).toHaveBeenCalled();
  });

  it('should grab from user location requestParam when header is undefined', async () => {
    const ctx = {
      ...serverContext,
      req: {
        headers: {},
      },
      query: {
        userLocation: MX,
      },
    };
    const response = await setupPage(ctx, TUDN_SITE);
    expect(response.page.userLocation).toBe(MX);
  });

  it('should redirect to MX section when user is located in MX but requesting US section', async () => {
    const ctx = {
      ...serverContext,
      query: {
        userLocation: MX,
        isWorldCupMVP: 'true',
      },
      isServer: true,
    };
    fetch.setResponseOnce({
      res: {
        data: {
          page: {
            data: {
              type: 'section',
            },
          },
        },
      },
    });
    const response = await setupPage(ctx, TUDN_SITE);
    expect(ctx.res.writeHead).toHaveBeenCalledWith(
      302,
      { Location: 'https://uat.tudn.com/mx/' },
    );
    expect(response).toEqual({});
  });

  it('should redirect to US section when user is located in US but requesing MX section', async () => {
    const ctx = {
      ...serverContext,
      query: {
        userLocation: US,
        isWorldCupMVP: 'true',
        paths: ['mx', 'video'],
      },
      isServer: true,
    };
    fetch.setResponseOnce({
      res: {
        data: {
          page: {
            data: {
              type: 'section',
            },
          },
        },
      },
    });
    const response = await setupPage(ctx, TUDN_SITE);
    expect(ctx.res.writeHead).toHaveBeenCalledWith(
      302,
      { Location: 'https://uat.tudn.com/video' },
    );
    expect(response).toEqual({});
  });

  it('should redirect with prod env', async () => {
    process.env.API_ENV = undefined;
    const ctx = {
      ...serverContext,
      query: {
        userLocation: US,
        isWorldCupMVP: 'true',
        paths: ['mx', 'video'],
      },
      isServer: true,
    };
    fetch.setResponseOnce({
      res: {
        data: {
          page: {
            data: {
              type: 'section',
            },
          },
        },
      },
    });
    const response = await setupPage(ctx, TUDN_SITE);
    expect(ctx.res.writeHead).toHaveBeenCalledWith(
      302,
      { Location: 'https://www.tudn.com/video' },
    );
    expect(response).toEqual({});
  });

  it('should not redirect when user matches the correct section location', async () => {
    process.env.API_ENV = 'uat2';
    const ctx = {
      ...serverContext,
      query: {
        userLocation: MX,
        isWorldCupMVP: 'true',
        paths: ['mx', 'video'],
      },
      isServer: true,
    };
    const res = {
      ...stateMock,
      data: {
        ...stateMock.data,
        page: {
          ...stateMock.data.page,
          data: {
            ...stateMock.data.page.data,
            type: 'section',
          },
        },
      },
    };
    fetch.setResponseOnce({ res });
    const response = await setupPage(ctx, TUDN_SITE);
    expect(response.page.data.type).toBe(contentTypes.SECTION);
  });
  it('should redirect televisa if no www on host', () => {
    const ctx = {
      ...serverContext,
      isServer: true,
      req: {
        headers: {
          host: 'lasestrellas.tv',
        },
      },
    };

    setupPage(ctx, 'lasestrellas');
    expect(ctx.res.writeHead).toHaveBeenCalledWith(301, { location: 'https://www.lasestrellas.tv' });
    expect(ctx.res.end).toHaveBeenCalled();
  });
});
