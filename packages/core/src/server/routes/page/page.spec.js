import fs from 'fs';
import Promise from 'bluebird';
import logger from 'app/utils/logging/serverLogger';
import Loadable from 'react-loadable';
import Store from '@univision/fe-commons/dist/store/store';
import * as pageFactory from 'app/utils/factories/pageFactory';
import PageApi from 'server/proxy/api/page/PageApi';
import renderUtils from 'server/utils/renderUtils';
import * as helpers from '@univision/fe-components-base/dist/components/Header/data/helpers';
import * as messages from '@univision/fe-commons/dist/constants/messages';
import getDeviceForRequest from '@univision/fe-commons/dist/utils/server/deviceDetector';
import * as headerUtils from '@univision/fe-commons/dist/utils/header/headerConf';
import matchCenterExtractor from '@univision/shared-components/dist/extractors/matchCenterExtractor';
import * as fetchApi from '@univision/fe-commons/dist/utils/api/fetchApi';
import { getKey, isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import * as pageActions from '@univision/fe-commons/dist/store/actions/page-actions';
import * as headerActions from '@univision/fe-commons/dist/store/actions/header/header-actions';
import * as userActions from '@univision/fe-commons/dist/store/slices/user/user-actions';
import Features from '@univision/fe-commons/dist/config/features';
import staticErrorPage from 'server/routes/page/error';
import * as pageMethods from './page';
import * as api from '../../actionsDefinition/server-page-actions';
import * as serverUtils from '../../utils/serverUtils';
import * as sites from '../../utils/sites';
import HttpError from '../../utils/api/httpError';
import WebApiRequest from '../../webapi/WebApiRequest';

const requestId = '00000000-0000-0000-0000-000000000000';
let path = '/noticias';
const mockData = {
  data: {
    uid: '0000014b-e5ba-de59-abfb-f7bb8a210000',
    uri: '/noticias',
    type: 'section',
    vertical: 'Global',
    sectionType: 'section',
    source: 'Univision',
    title: 'Univision | Shows, Entretenimiento, Noticias, Deportes y Novelas',
    hierarchy: [{
      name: 'univision | shows, entretenimiento, noticias, deportes y novelas',
      title: 'Univision | Shows, Entretenimiento, Noticias, Deportes y Novelas',
      uri: '/noticias',
    }],
    html: '<html><body><div>Test</div></body></html>',
    adSettings: {
      adTagValue: 'section/inicio',
    },
  },
};
const mockHeader = {
  headers: [],
  status: 200,
};
const httpReq = {
  url: '/noticias',
  originalUrl: '/noticias',
  pathname: '/noticias',
  query: { test: true },
  host: 'localhost:8080',
  headers: {
    'user-agent': '',
  },
  assets: {
    javascript: {
      section: '/assets/section.764ff813bbdaee8bd19b.js',
      AMPsection: '/assets/AMPsection.764ff813bbdaee8bd19b.js',
    },
    styles: {
      section: '/assets/section.764ff813bbdaee8bd19b.css',
      AMPsection: '/assets/AMPsection.764ff813bbdaee8bd19b.css',
    },
  },
  get() {
    return this.host;
  },
};
const httpRes = {
  headers: {
    'X-Request-Id': requestId,
  },
  headersSent: false,
  state: 200,
  text: '',
  url: '/',
  status(state) {
    this.state = state;
    return this;
  },
  send(text) {
    this.text = text;
    return this;
  },
  json(body) {
    this.body = body;
    return this;
  },
  setHeader(prop, value) {
    this.headers[prop] = value;
  },
  get(prop) {
    return this.headers[prop];
  },
  redirect(state, url) {
    this.state = state;
    this.url = url;
    return this;
  },
  end: jest.fn(),
};

logger.info = jest.fn();
logger.error = jest.fn();
logger.warn = jest.fn();
pageActions.fetchRecommendedVideos = jest.fn(() => ({ type: '', payload: {} }));
sites.isTudnSite = jest.fn().mockImplementation(() => false);

jest.mock('../../utils/api/httpError', () => jest.fn().mockImplementation(() => ({ sendErrorLogger: jest.fn() })));
jest.mock('@univision/fe-commons/dist/utils/header/headerConf');
jest.mock('@univision/fe-commons/dist/utils/server/deviceDetector', () => jest.fn());
jest.mock('@univision/fe-commons/dist/utils/logging/clientLogging', () => jest.fn());
jest.mock('@univision/fe-commons/dist/utils/tracking/perfume/perfumeTracker');
jest.mock('@univision/shared-components/dist/extractors/matchCenterExtractor');
jest.mock('dd-trace', () => ({
  init: jest.fn(),
  use: jest.fn(),
  startSpan: jest.fn(),
  scope: () => ({
    active: () => ({
      setTag: jest.fn(),
    }),
  }),
}));

beforeEach(() => {
  Features.video.isSsrSeoEnabled = () => true;
});

describe('initialStoreData', () => {
  beforeAll(() => {
    jest.restoreAllMocks();
  });

  it('should call the dispatch method once with the expected data', async () => {
    const dispatchSpy = jest.spyOn(Store, 'dispatch');
    const req = {
      ...httpReq,
      store: Store,
      clientConfig: {},
    };
    PageApi.getPage = jest.fn(() => Promise.resolve(mockData));
    await Store.dispatch(api.getApiContent('/'));
    getDeviceForRequest.mockReturnValueOnce('desktop');
    dispatchSpy.mockClear();
    pageMethods.initialStoreData(req, httpRes);
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenNthCalledWith(1, expect.objectContaining({
      data: {
        device: 'desktop',
        domain: expect.stringMatching('http'),
        config: expect.any(Object),
        env: expect.any(String),
        headers: expect.any(Object),
        requestId,
        requestParams: expect.any(Object),
        sites: expect.any(Object),
        userAgent: expect.any(String),
        originalUrl: expect.any(String),
      },
      type: 'SET_PAGE_DATA',
    }));
  });

  it('should have device be mobile by default when getDeviceForRequest returns null', async () => {
    PageApi.getPage = jest.fn(() => Promise.resolve(mockData));
    await Store.dispatch(api.getApiContent('/'));
    getDeviceForRequest.mockReturnValueOnce(null);
    pageMethods.initialStoreData({ store: Store, ...httpReq }, httpRes);
    expect(Store.getState().page.device).toEqual('mobile');
  });
});

describe('assemblePageData', () => {
  beforeAll(() => {
    jest.restoreAllMocks();
  });

  it('should call the dispatch method once', async () => {
    const data = {};
    const dispatchSpy = jest.spyOn(Store, 'dispatch');
    const currentPageType = pageFactory.getCurrentPageType(data, path);
    const req = {
      ...httpReq,
      store: Store,
    };
    PageApi.getPage = jest.fn(() => Promise.resolve(mockData));
    await Store.dispatch(api.getApiContent('/'));
    getDeviceForRequest.mockReturnValueOnce('desktop');
    dispatchSpy.mockClear();
    pageMethods.assemblePageData({
      req,
      currentPageType,
      path,
    });
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
      data: {
        data: expect.any(Object),
        env: expect.any(String),
        isAmp: expect.any(Boolean),
        isSpa: expect.any(Boolean),
        isTudn: expect.any(Boolean),
        language: expect.any(String),
        site: expect.any(String),
        theme: expect.any(Object),
        pageCategory: expect.any(String),
      },
      type: 'SET_PAGE_DATA',
    }));
  });
  it('should call the dispatch method once with TUDN site', async () => {
    const data = {};
    const dispatchSpy = jest.spyOn(Store, 'dispatch');
    const currentPageType = pageFactory.getCurrentPageType(data, path);
    const req = {
      ...httpReq,
      store: Store,
    };
    PageApi.getPage = jest.fn(() => Promise.resolve(mockData));
    await Store.dispatch(api.getApiContent('/'));
    getDeviceForRequest.mockReturnValueOnce('desktop');
    sites.isTudnSite.mockReturnValueOnce(true);
    dispatchSpy.mockClear();
    pageMethods.assemblePageData({
      req,
      currentPageType,
      path,
    });
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
      data: {
        data: expect.any(Object),
        env: expect.any(String),
        isAmp: expect.any(Boolean),
        isSpa: expect.any(Boolean),
        isTudn: expect.any(Boolean),
        language: expect.any(String),
        site: expect.any(String),
        theme: expect.any(Object),
        pageCategory: expect.any(String),
      },
      type: 'SET_PAGE_DATA',
    }));
  });
});

describe('setVerticalNavigation', () => {
  let setHeaderDataSpy;
  let setHeaderConfSpy;
  let getHeaderConfSpy;

  beforeEach(() => {
    setHeaderDataSpy = jest.spyOn(pageActions, 'setHeaderData');
    setHeaderConfSpy = jest.spyOn(headerActions, 'setHeaderConf');
    getHeaderConfSpy = jest.spyOn(headerUtils, 'default');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the correct data and call onLoad callback', async () => {
    Store.dispatch(pageActions.default({
      data: { ...mockData.data, uri: '/shows' },
      pageCategory: 'show',
    }));
    await pageMethods.setVerticalNavigation(Store);
    expect(setHeaderDataSpy).toHaveBeenCalled();
  });

  it('should throw an exception', async () => {
    jest.spyOn(helpers, 'getVerticalNav')
      .mockRejectedValueOnce(new Error('Simulate error'));
    try {
      await pageMethods.setVerticalNavigation(Store);
    } catch (e) {
      expect(e.message).toBe('Simulate error');
    }
  });

  it('should not call the dispatch method when the nav data is null', async () => {
    jest.spyOn(helpers, 'getVerticalNav').mockResolvedValueOnce(null);
    await pageMethods.setVerticalNavigation(Store);
    expect(setHeaderDataSpy).toHaveBeenCalledTimes(0);
  });

  it('should call the dispatch method when the getVerticalNav returns a valid value', async () => {
    jest.spyOn(helpers, 'getVerticalNav').mockResolvedValueOnce({ test: 'test' });
    await pageMethods.setVerticalNavigation(Store);
    expect(setHeaderDataSpy).toHaveBeenCalledWith({ test: 'test' });
  });

  it('should call the dispatch method when getHeaderConf returns a value', async () => {
    getHeaderConfSpy.mockReturnValueOnce({ foo: 'bar' });
    await pageMethods.setVerticalNavigation(Store);
    expect(setHeaderConfSpy).toHaveBeenCalledWith({ foo: 'bar' });
  });

  it('should not call the dispatch method when getHeaderConf returns a null value', async () => {
    getHeaderConfSpy.mockReturnValueOnce(null);
    await pageMethods.setVerticalNavigation(Store);
    expect(setHeaderConfSpy).toHaveBeenCalledTimes(0);
  });
});

describe('getRedirect', () => {
  beforeAll(() => {
    jest.restoreAllMocks();
  });

  it('should not make the redirect with custom redirect equals to null', async () => {
    await Store.dispatch(api.getApiContent('/'));
    const result = pageMethods.getRedirect(Store, httpReq, () => { });
    expect(result).toBeNull();
  });

  it('should make a redirect with custom redirect equals to univision.com', async () => {
    PageApi.getPage = jest.fn(() => Promise.resolve({
      data: {
        ...mockData.data,
        type: 'redirectdata',
      },
    }));
    const req = {
      ...httpReq,
      headers: {
        host: 'univision.com',
        'X-Forwarded-Proto': 'https',
      },
    };
    process.env.DEPLOY_ENV = 'production';
    await Store.dispatch(api.getApiContent('/'));
    const redirect = await pageMethods.getRedirect(Store, req);
    expect(redirect.code).toBe(301);
  });

  it('should not make a redirect with custom redirect different to univision.com', async () => {
    PageApi.getPage = jest.fn(() => Promise.resolve({
      data: {
        ...mockData,
        type: 'redirectdata',
      },
    }));
    const req = {
      ...httpReq,
      headers: {
        host: 'noticias.univision.com',
        'X-Forwarded-Proto': 'https',
      },
    };
    await Store.dispatch(api.getApiContent('/'));
    const result = await pageMethods.getRedirect(Store, req);
    expect(result).toBeNull();
  });
});

describe('getCurrentAssets', () => {
  beforeAll(() => {
    jest.restoreAllMocks();
  });

  it('should returns ths js when has the assets and the env is different to production', async () => {
    jest.spyOn(fs, 'readFile').mockImplementationOnce((filePath, encoding, fn) => {
      if (filePath === '/assets/section.764ff813bbdaee8bd19b.css') {
        return fn(null, 'html{margin: 0 auto}');
      }
      return fn(null, undefined);
    });
    process.env = { ...process.env, NODE_ENV: 'deevelop', CDN_URL: 'http://localhost:8080/' };
    const currentAssets = await pageMethods.getCurrentAssets('section', httpReq.assets, path);
    expect(currentAssets).not.toBeNull();
    expect(currentAssets).toHaveProperty('javascript');
    expect(currentAssets).toHaveProperty('styles');
    expect(currentAssets).toHaveProperty('inlineCss', null);
  });

  it('should return the js, styles and inline css when has the assets and the env is production', async () => {
    path = '/';
    process.env = { ...process.env, NODE_ENV: 'production', CDN_URL: 'http://localhost:8080/' };
    const currentAssets = await pageMethods.getCurrentAssets('section', httpReq.assets, path);
    expect(currentAssets).not.toBeNull();
    expect(currentAssets).toHaveProperty('javascript');
    expect(currentAssets).toHaveProperty('styles');
    expect(currentAssets).toHaveProperty('inlineCss');
  });

  it('should returns the currentAssets inlineCss from asset variable', async () => {
    jest.spyOn(pageFactory, 'getInlineCssPath').mockReturnValue(null);
    process.env = { ...process.env, NODE_ENV: 'production', CDN_URL: 'http://localhost:8080/' };
    const assets = { ...httpReq.assets, ssrInlineCss: { section_inlineCss: 'file data' } };
    const currentAssets = await pageMethods.getCurrentAssets('section', assets, path);
    expect(currentAssets).not.toBeNull();
    expect(currentAssets).toHaveProperty('javascript');
    expect(currentAssets).toHaveProperty('styles');
    expect(currentAssets).toHaveProperty('inlineCss', 'file data');
  });

  it('should return null for AMP pages', async () => {
    jest.spyOn(pageFactory, 'getInlineCssPath').mockReturnValue(null);
    process.env = { ...process.env, NODE_ENV: 'production', CDN_URL: 'http://localhost:8080/' };
    const assets = { ...httpReq.assets, ssrInlineCss: { AMPsection_inlineCss: 'AMP css' } };
    const currentAssets = await pageMethods.getCurrentAssets('article', assets, '/amp/test');
    expect(currentAssets).toBeNull();
  });

  it('should returns the currentAssets object without the inlineCss property', async () => {
    jest.spyOn(pageFactory, 'getInlineCssPath').mockReturnValue(null);
    process.env = { ...process.env, NODE_ENV: 'production', CDN_URL: 'http://localhost:8080/' };
    const currentAssets = await pageMethods.getCurrentAssets('section', httpReq.assets, path);
    expect(currentAssets).not.toBeNull();
    expect(currentAssets).toHaveProperty('javascript');
    expect(currentAssets).toHaveProperty('styles');
    expect(currentAssets).toHaveProperty('inlineCss', null);
  });

  it('should reeturn empty currentAssets object when assets not has a valid paths', async () => {
    jest.spyOn(pageFactory, 'getInlineCssPath').mockReturnValue(null);
    const req = {
      ...httpReq,
      assets: {
        styles: {
          section: 'section.',
        },
      },
    };
    process.env = { ...process.env, NODE_ENV: 'test', CDN_URL: 'http://localhost:8080/' };
    const currentAssets = await pageMethods.getCurrentAssets('', req.assets, path);
    expect(currentAssets).toEqual({ inlineCss: null });
  });
});

describe('updateStore', () => {
  beforeAll(() => {
    jest.restoreAllMocks();
  });

  it('should throw an exception when the Poomise All has and error', async () => {
    PageApi.getPage = jest.fn(() => Promise.resolve({
      data: {
        ...mockData.data,
        widgets: [{
          type: 'DeportesGridSoccerMatchCenterOpening',
          settings: {
            type: 'deportesgridsoccermatchcenteropening',
            uid: '00000167-eb84-dddd-afff-ff8479c90051',
            matchId: '1038147',
          },
        }],
      },
    }));
    await Store.dispatch(api.getApiContent('/'));
    jest.spyOn(Promise, 'all').mockRejectedValueOnce(new Error('fail'));
    matchCenterExtractor.mockImplementation(() => ({ 'sports-content': 'abc' }));
    jest.spyOn(fetchApi, 'fetchSportApi').mockResolvedValueOnce({ 'sports-content': 'abc' });
    await pageMethods.updateStore(Store);
    const error = getKey(Store.getState(), 'page.data.error');
    expect(isValidObject(error)).toBe(true);
  });

  it('should get an error message on extraData property when a widget has an error', async () => {
    PageApi.getPage = jest.fn(() => Promise.resolve({
      data: {
        ...mockData.data,
        widgets: [{
          type: 'DeportesGridSoccerMatchCenterOpening',
          settings: {
            type: 'deportesgridsoccermatchcenteropening',
            uid: '00000167-eb84-dddd-afff-ff8479c90051',
            matchId: '1038147',
          },
        }],
      },
    }));
    await Store.dispatch(api.getApiContent('/'));
    matchCenterExtractor.mockImplementation(() => ({ 'sports-content': 'abc' }));
    jest.spyOn(fetchApi, 'fetchSportApi').mockRejectedValueOnce(new Error('fail'));
    await pageMethods.updateStore(Store);
    const error = getKey(Store.getState(), 'page.data.widgets[0].extraData.error');
    expect(error).toHaveProperty('message', 'fail');
  });

  it('should execute all the Widgets Actions', async () => {
    PageApi.getPage = jest.fn(() => Promise.resolve({
      data: {
        ...mockData.data,
        type: 'video',
        longformPlayList: false,
        widgets: [{
          type: 'DeportesGridSoccerMatchCenterOpening',
          settings: {
            type: 'deportesgridsoccermatchcenteropening',
            uid: '00000167-eb84-dddd-afff-ff8479c90051',
            matchId: '1038147',
          },
        }],
      },
    }));
    await Store.dispatch(api.getApiContent('/'));
    matchCenterExtractor.mockImplementation(() => ({ 'sports-content': 'abc' }));
    jest.spyOn(fetchApi, 'fetchSportApi').mockResolvedValueOnce({ 'sports-content': 'abc' });
    await pageMethods.updateStore(Store);
    const widget = getKey(Store.getState(), 'page.data.widgets[0]');
    expect(widget).toHaveProperty('extraData', { 'sports-content': 'abc' });
  });
});

describe('getErrorPage', () => {
  beforeAll(() => {
    jest.restoreAllMocks();
  });

  it('should return error page', async () => {
    const req = {
      store: {
        getState: () => jest.fn(),
      },
    };
    const { data } = Store.getState().page;
    jest.spyOn(renderUtils, 'newHtmlPage').mockResolvedValueOnce(data.html);
    const html = await pageMethods.getErrorPage(req, req.assets);
    expect(html).toBe(data.html);
  });

  it('should render static error html if web app fails', async () => {
    jest.spyOn(renderUtils, 'newHtmlPage').mockRejectedValueOnce(new Error('Simulate Error'));
    jest.spyOn(fs, 'readFile').mockImplementationOnce((filePath, encoding, fn) => fn(undefined, ''));
    const page = await pageMethods.getErrorPage();
    expect(page).toEqual(staticErrorPage);
  });
});

describe('getHtmlPage', () => {
  const store = {
    getState() {
      return { page: { ...mockData } };
    },
  };

  beforeAll(() => {
    jest.restoreAllMocks();
  });

  it('should throw an exception', async () => {
    jest.spyOn(renderUtils, 'newHtmlPage').mockRejectedValueOnce(new Error('Simulate Error'));
    try {
      const req = {};
      await pageMethods.getHtmlPage(store, req, 'section', req.assets);
    } catch (e) {
      expect(e.message).toBe('Simulate Error');
    }
  });

  it('should return section page', async () => {
    const req = {};
    const { data } = Store.getState().page;
    jest.spyOn(renderUtils, 'newHtmlPage').mockResolvedValueOnce(data.html);
    const html = await pageMethods.getHtmlPage(store, req, 'section', req.assets);
    expect(html).toBe(data.html);
  });
});

describe('header', () => {
  afterAll(() => {
    jest.restoreAllMocks();
    HttpError.mockClear();
  });

  it('should sets the headers from API', async () => {
    PageApi.getHeaders = jest.fn(() => Promise.resolve(mockHeader));
    await pageMethods.header(httpReq, httpRes, () => {});
    expect(Object.keys(httpRes.headers).length).toBe(3);
    expect(httpRes.state).toBe(200);
  });

  it('should sets the headers from API, even if the Promise is rejected.', async () => {
    const error = new Error();
    error.status = 404;
    error.headers = {
      'x-cache-ttl': 200,
    };
    PageApi.getHeaders = jest.fn(() => Promise.reject(error));
    await pageMethods.header(httpReq, httpRes, () => {});
    expect(Object.keys(httpRes.headers).length).toBe(3);
    expect(httpRes.state).toBe(404);
  });

  it('should sets the headers from API, even if the Promise is rejected with no response.', async () => {
    PageApi.getHeaders = jest.fn(() => Promise.reject(new Error()));
    await pageMethods.header(httpReq, httpRes, () => {});
    expect(Object.keys(httpRes.headers).length).toBe(3);
    expect(httpRes.state).toBe(500);
  });

  it('should handle unexpected exceptions', async (done) => {
    serverUtils.setHeaders = jest.fn().mockImplementationOnce(() => { throw new Error('Unexpected error'); });
    PageApi.getHeaders = jest.fn(() => Promise.reject(new Error('Error')));
    await pageMethods.header(httpReq, httpRes, (e) => {
      expect(e.message === 'Unexpected error').toBe(true);
      done();
    });
  });

  it('should send 400 status when the domain is not allowed', async () => {
    const req = {
      ...httpReq,
      host: 'test:8080',
    };
    process.env.BYPASS_DOMAIN_VALIDATION = false;
    PageApi.getHeaders = jest.fn(() => Promise.resolve(mockHeader));
    await pageMethods.header(req, httpRes, () => {});
    expect(httpRes.state).toBe(400);
    expect(httpRes.text).toEqual(messages.STATUS_400);
  });
});

describe('defaultRoute', () => {
  jest.setTimeout(30000);
  beforeEach(() => {
    jest.spyOn(userActions, 'fetchAnonUser').mockImplementation(() => jest.fn());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should send 400 status when the domain is not register', async () => {
    const req = {
      ...httpReq,
      host: 'test:8080',
    };
    process.env.BYPASS_DOMAIN_VALIDATION = false;
    await pageMethods.defaultRoute(req, httpRes, () => {});
    expect(httpRes.state).toBe(400);
  });

  it('should throw an exception if the API has an error', async (done) => {
    PageApi.getPage = jest.fn().mockRejectedValueOnce(new Error(''));
    await pageMethods.defaultRoute(httpReq, httpRes, (e) => {
      expect(e).not.toBeNull();
      done();
    });
  });

  it('should executes redirect', async () => {
    PageApi.getPage = jest.fn(() => Promise.resolve({
      data: {
        ...mockData.data,
        type: 'redirectdata',
      },
    }));
    const req = {
      ...httpReq,
      headers: {
        host: 'univision.com',
        'X-Forwarded-Proto': 'https',
      },
    };
    process.env.DEPLOY_ENV = 'production';
    await Store.dispatch(api.getApiContent('/'));
    await pageMethods.defaultRoute(req, httpRes, () => {});
    expect(httpRes.state).toBe(301);
  });

  it('should set the X-Content-Type', async () => {
    PageApi.getPage = jest.fn(() => Promise.resolve({
      data: {
        ...mockData.data,
        type: 'article',
      },
    }));
    await Store.dispatch(api.getApiContent('/'));
    await pageMethods.defaultRoute(httpReq, httpRes, () => {});
    expect(httpRes.headers['X-Content-Type']).toBe('Legacyarticle');
  });

  it('should redirect to page URI from BEX response', async () => {
    jest.spyOn(Loadable, 'preloadAll').mockResolvedValueOnce({});
    PageApi.getPage = jest.fn(() => Promise.resolve({
      data: {
        ...mockData.data,
        uri: 'https://www.univision.com/noticias',
        type: 'section',
      },
    }));
    const req = {
      ...httpReq,
      host: 'noticias.univision.com',
      originalUrl: '/noticias',
      headersSent: false,
    };
    await Store.dispatch(api.getApiContent('/'));
    await pageMethods.defaultRoute(req, httpRes, () => {});
    expect(httpRes.state).toBe(301);
    expect(httpRes.url).toBe('https://www.univision.com/noticias');
  });

  it('should redirect to site URL of not there valid data', async () => {
    jest.spyOn(Loadable, 'preloadAll').mockResolvedValueOnce({});
    process.env.CMS_API_URL = 'https://uat2.x.univision.com';
    PageApi.getPage = jest.fn(() => Promise.resolve({
      data: {
        status: 404,
      },
    }));
    const req = {
      ...httpReq,
      host: 'notfound.univision.com',
      originalUrl: '/noticias',
      headersSent: false,
    };
    await Store.dispatch(api.getApiContent('/'));
    await pageMethods.defaultRoute(req, httpRes, () => {});
    expect(httpRes.state).toBe(301);
    expect(httpRes.url).toBe('https://uat2.x.univision.com');
  });

  it('should return page data on localhost', async () => {
    process.env.DEPLOY_ENV = 'development';
    jest.spyOn(Loadable, 'preloadAll').mockResolvedValueOnce({});
    PageApi.getPage = jest.fn(() => Promise.resolve({
      data: {
        ...mockData.data,
        uri: 'https://www.univision.com/noticias',
        type: 'section',
      },
    }));
    const req = {
      ...httpReq,
      host: 'localhost:8080',
      originalUrl: '/noticias',
      headersSent: false,
    };
    await Store.dispatch(api.getApiContent('/'));
    await pageMethods.defaultRoute(req, httpRes, () => {});
    expect(httpRes.state).toBe(200);
    expect(httpRes.body).toEqual(expect.objectContaining({
      data: expect.objectContaining({
        type: 'section',
      }),
      site: 'univision',
      sites: expect.any(Object),
    }));
  });

  it('should return page data if is dev env and have showData paramater', async () => {
    process.env.DEPLOY_ENV = 'development';
    jest.spyOn(Loadable, 'preloadAll').mockResolvedValueOnce({});
    PageApi.getPage = jest.fn(() => Promise.resolve({
      data: {
        ...mockData.data,
        uri: 'https://www.univision.com/noticias',
        type: 'section',
      },
    }));
    const req = {
      ...httpReq,
      query: {
        showData: true,
      },
      host: 'uat2.x.univision.com',
      originalUrl: '/noticias',
      headersSent: false,
    };
    await Store.dispatch(api.getApiContent('/'));
    await pageMethods.defaultRoute(req, httpRes, () => {});
    expect(httpRes.state).toBe(200);
    expect(httpRes.body).toEqual(expect.objectContaining({
      data: expect.objectContaining({
        type: 'section',
      }),
      site: 'univision',
      sites: expect.any(Object),
    }));
  });

  it('should return statusCode 200 when currentPage is equals to section', async () => {
    jest.spyOn(Loadable, 'preloadAll').mockResolvedValueOnce({});
    PageApi.getPage = jest.fn(() => Promise.resolve({
      data: {
        ...mockData.data,
        type: 'section',
      },
    }));
    const req = {
      ...httpReq,
      originalUrl: '/noticias/_preview/',
      headersSent: false,
    };
    await Store.dispatch(api.getApiContent('/'));
    jest.spyOn(pageFactory, 'getCurrentPageType').mockReturnValueOnce('seection');
    jest.spyOn(renderUtils, 'getMainShell').mockResolvedValueOnce({});
    jest.spyOn(renderUtils, 'newHtmlPage').mockResolvedValueOnce('<html></html>');
    await pageMethods.defaultRoute(req, httpRes, () => {});
    expect(httpRes.state).toBe(200);
  });

  it('should return statusCode 200 for AMP articles', async () => {
    jest.spyOn(Loadable, 'preloadAll').mockResolvedValueOnce({});
    PageApi.getPage = jest.fn(() => Promise.resolve({
      data: {
        ...mockData.data,
        type: 'article',
      },
    }));
    const req = {
      ...httpReq,
      originalUrl: '/amp/test/',
      path: '/amp/test/',
      headersSent: false,
    };
    await Store.dispatch(api.getApiContent('/'));
    await pageMethods.defaultRoute(req, httpRes, () => {});
    expect(httpRes.state).toBe(200);
  });

  it('should log warning if the headers have been sent.', async () => {
    PageApi.getPage = jest.fn(() => Promise.resolve(mockData));
    const res = {
      ...httpRes,
      headersSent: true,
    };
    await Store.dispatch(api.getApiContent('/'));
    await pageMethods.defaultRoute(httpReq, res, () => {});
    expect(logger.warn).toHaveBeenCalledWith('Headers have already been sent for this request. Ignoring default page route.');
  });

  it('should return call the fallback for error in the getApiContent', async () => {
    serverUtils.handleError = jest.fn();
    WebApiRequest.getWebApiUrl = jest.fn(() => 'notFound');
    jest.spyOn(Loadable, 'preloadAll').mockResolvedValueOnce({});
    PageApi.getPage = jest.fn((url, error) => {
      if (error) {
        error();
      }
      Promise.rejected({
        message: 'error',
        status: 404,
        url,
      });
    });
    const req = {
      ...httpReq,
      url: 'notFound',
      originalUrl: 'notFound',
      pathname: 'notFound',
      headersSent: false,
    };
    await pageMethods.defaultRoute(req, httpRes, () => {});
    expect(serverUtils.handleError).toHaveBeenCalled();
  });
});
