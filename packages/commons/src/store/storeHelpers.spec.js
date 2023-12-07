import setPageData, { setPreLoadableComponents } from './actions/page-actions';
import { setSearchData } from './actions/search/search-actions';
import { insertTopAd } from './actions/ads-actions';
import { setCurrentSlideshow } from './actions/slideshow/horizontal-slideshow-actions';
import { toAbsoluteUrl } from '../utils/helpers';
import Store from './store';
import * as storeHelpers from './storeHelpers';
import contentTypes from '../constants/contentTypes.json';
import Brandable from '../utils/brandable';
import features from '../config/features';

jest.mock('../utils/themes/themes', () => jest.fn(() => ({
  defaultTheme: 'a',
})));

const pageData = {
  data: {
    test: {},
  },
};

describe('getPageData', () => {
  it('should return empty object not data in Store', () => {
    Store.dispatch(setPageData({}));
    expect(storeHelpers.getPageData()).toBe(null);
  });
  it('should return object data in Store', () => {
    Store.dispatch(setPageData(pageData));
    expect(storeHelpers.getPageData(Store).data).toEqual(pageData.data);
  });

  it('should return object data from state', () => {
    const state = {
      page: {
        data: {
          test2: {},
        },
      },
    };
    Store.dispatch(setPageData(pageData));
    expect(storeHelpers.getPageData(Store, state)).toEqual(state.page);
  });
});

describe('getPageUrl', () => {
  it('should return null by default', () => {
    expect(storeHelpers.getPageUrl(Store)).toBe(null);
  });
  it('should return the right url', () => {
    const url = '/test';
    const data = {
      data: {
        uri: url,
      },
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.getPageUrl(Store)).toBe(url);
  });
});

describe('getPageId', () => {
  it('should return an empty string by default', () => {
    expect(storeHelpers.getPageId(Store)).toBe('');
  });

  it('should return the right page id', () => {
    const uid = '123-456-789';
    const data = {
      data: {
        uid,
      },
    };

    Store.dispatch(setPageData(data));
    expect(storeHelpers.getPageId(Store)).toBe(uid);
  });
});

describe('getPageTitle', () => {
  it('should return an empty string by default', () => {
    expect(storeHelpers.getPageTitle(Store)).toBe('');
  });

  it('should return the right page id', () => {
    const title = 'test page';
    const data = {
      data: {
        title,
      },
    };

    Store.dispatch(setPageData(data));
    expect(storeHelpers.getPageTitle(Store)).toBe(title);
  });
});

describe('getTheme', () => {
  Store.dispatch(setPageData(null));
  it('should return default is not theme in Store', () => {
    expect(storeHelpers.getTheme(Store)).toEqual({});
  });
  it('should return right theme theme in Store', () => {
    const theme = { test: 1 };
    const pageDataWithTheme = Object.assign({}, pageData, { theme });
    Store.dispatch(setPageData(pageDataWithTheme));
    expect(storeHelpers.getTheme(Store)).toEqual(theme);
  });
});

describe('getDevice', () => {
  Store.dispatch(setPageData(null));
  it('should return mobile is not device in Store', () => {
    expect(storeHelpers.getDevice(Store)).toBe('mobile');
  });
  it('should return test is environmet in Store', () => {
    const pageDataWithDevice = Object.assign({}, pageData, { device: 'tablet' });
    Store.dispatch(setPageData(pageDataWithDevice));
    expect(storeHelpers.getDevice(Store)).toBe('tablet');
  });
});

describe('getSharingOptions', () => {
  Store.dispatch(setPageData(null));
  it('should return empty object is not SharingOptions in Store', () => {
    expect(storeHelpers.getSharingOptions(Store)).toEqual({});
  });
  it('should return test is environmet in Store', () => {
    const sharingOptions = {
      data: {
        sharing: {
          options: 'a',
        },
      },
    };
    const pageDataWithSharingOptions = Object.assign({}, pageData, sharingOptions);
    Store.dispatch(setPageData(pageDataWithSharingOptions));
    expect(storeHelpers.getSharingOptions(Store)).toBe('a');
  });
});

describe('getEnv', () => {
  Store.dispatch(setPageData(null));
  it('should return production is not environmet in Store', () => {
    expect(storeHelpers.getEnv(Store)).toBe('production');
  });
  it('should return test is environmet in Store', () => {
    const pageDataWithEnv = Object.assign({}, pageData, { env: 'test' });
    Store.dispatch(setPageData(pageDataWithEnv));
    expect(storeHelpers.getEnv(Store)).toBe('test');
  });
});

describe('getAdSettings', () => {
  it('should return null is not adSettings in Store', () => {
    expect(storeHelpers.getAdSettings(Store)).toBe(null);
  });
  it('should return test is adSettings in Store', () => {
    const pageDataWithAdSettings = Object.assign({}, pageData, {
      data: { adSettings: { test: 1 } },
    });
    Store.dispatch(setPageData(pageDataWithAdSettings));
    expect(storeHelpers.getAdSettings(Store)).not.toBe(null);
  });
});

describe('getNielsenTracking', () => {
  it('should return test is Tracking in Store', () => {
    const pageDataWithTracking = Object.assign({}, pageData, {
      device: 'desktop',
      data: {
        analyticsData: {
          web: {
            nielsen: {
              vcid: 'c04',
            },
          },
        },
      },
    });
    Store.dispatch(setPageData(pageDataWithTracking));
    expect(storeHelpers.getNielsenTracking(Store)).toMatchObject({
      vcid: 'c04',
    });
  });
});

describe('getTracking', () => {
  it('should return test is Tracking in Store', () => {
    const pageDataWithTracking = Object.assign({}, pageData, {
      device: 'desktop',
      data: {
        analyticsData: {
          web: {
            common: {
              uid: 'test',
            },
            contentSpecific: {
              word_count: 15,
            },
          },
        },
      },
    });
    Store.dispatch(setPageData(pageDataWithTracking));
    expect(storeHelpers.getTracking(Store)).toMatchObject({
      uid: 'test',
      word_count: 15,
    });
  });
});

describe('getRequestParams', () => {
  Store.dispatch(setPageData({}));
  it('should return null is not requestParams in Store', () => {
    expect(storeHelpers.getRequestParams(Store)).toEqual({});
  });
  it('should return object is requestParams in Store', () => {
    const pageDataWithRequestParams = Object.assign({}, pageData, { requestParams: { test: 1 } });
    Store.dispatch(setPageData(pageDataWithRequestParams));
    expect(storeHelpers.getRequestParams(Store).test).toBe(1);
  });
  it('query string - should return an empty string if there is not requestParams in Store', () => {
    Store.dispatch(setPageData({ requestParams: null }));
    expect(storeHelpers.getQueryString(Store)).toBe('');
  });
  it('query string - should return object is requestParams in Store', () => {
    const pageDataWithRequestParams = Object.assign({}, pageData, {
      requestParams: { test: 1, foo: 'bar' },
    });
    Store.dispatch(setPageData(pageDataWithRequestParams));
    expect(storeHelpers.getQueryString(Store)).toBe('test=1&foo=bar');
  });
});

describe('getPageCategory', () => {
  Store.dispatch(setPageData({}));
  it('should return null if not pageCategory in Store', () => {
    expect(storeHelpers.getPageCategory(Store)).toBe(null);
  });
  it('should return object is pageCategory in Store', () => {
    const pageDataWithRequestParams = Object.assign({}, pageData, { pageCategory: 'radio' });
    Store.dispatch(setPageData(pageDataWithRequestParams));
    expect(storeHelpers.getPageCategory(Store)).not.toBe(null);
  });
});

describe('getPreloadedComponents', () => {
  Store.dispatch(setPreLoadableComponents(null));
  it('should return {} if loadableComponents is not in Store', () => {
    expect(storeHelpers.getPreloadedComponents(Store)).toEqual({});
  });
  it('should return object if loadableComponents in Store', () => {
    Store.dispatch(setPreLoadableComponents({ foo: 'bar' }));
    expect(storeHelpers.getPreloadedComponents(Store)).toEqual({ foo: 'bar' });
  });
});

describe('getContentType', () => {
  it('should return null is not content type in Store', () => {
    expect(storeHelpers.getContentType(Store)).toBe(null);
  });
  it('should return type "video" if content type in Store', () => {
    const pageDataWithContentType = Object.assign({}, pageData, { data: { type: 'video' } });
    Store.dispatch(setPageData(pageDataWithContentType));
    expect(storeHelpers.getContentType(Store)).not.toBe(null);
  });
});

describe('isWidgetId', () => {
  it('should return true if right id', () => {
    const widget = {
      settings: {
        uid: 5,
      },
    };
    expect(storeHelpers.isWidgetId(widget, 5)).toBe(true);
  });
  it('should return false if wrong id', () => {
    const widget = {
      settings: {
        uid: 3,
      },
    };
    expect(storeHelpers.isWidgetId(widget, 5)).toBe(false);
  });
  it('should return false if wrong widget data', () => {
    expect(storeHelpers.isWidgetId({}, 5)).toBe(false);
  });
});

describe('getWidgetIndexById', () => {
  const state = {
    data: {
      widgets: [
        {
          settings: {
            uid: 1,
          },
        },
        {
          settings: {
            uid: 2,
          },
        },
      ],
    },
  };
  it('should -1 by default', () => {
    expect(storeHelpers.getWidgetIndexById({}, 5)).toBe(-1);
  });
  it('should nul by default', () => {
    expect(storeHelpers.getWidgetIndexById(state, 1)).toBe(0);
  });
});

describe('getWidgetById', () => {
  const state = {
    data: {
      widgets: [
        {
          settings: {
            uid: 1,
          },
        },
        {
          settings: {
            uid: 2,
          },
        },
      ],
    },
  };
  it('should return null by default', () => {
    expect(storeHelpers.getWidgetById({}, 5)).toBe(null);
  });
  it('should return the appropiate widget data', () => {
    expect(storeHelpers.getWidgetById(state, 1)).toEqual({
      settings: {
        uid: 1,
      },
    });
  });
});
describe('isWidgetType', () => {
  const type = 'abc';
  const widget = {
    type,
  };
  it('should return true if right type', () => {
    expect(storeHelpers.isWidgetType(widget, type)).toBe(true);
  });
  it('should return false if different type', () => {
    expect(storeHelpers.isWidgetType(widget, 'dfg')).toBe(false);
  });
  it('should return false if no type', () => {
    expect(storeHelpers.isWidgetType({}, 'dfg')).toBe(false);
  });
});
describe('getWidgetIndexByType', () => {
  const data = {
    widgets: [
      {
        type: 'abc',
      },
      {
        type: 'cde',
      },
    ],
  };
  it('should return the right index', () => {
    expect(storeHelpers.getWidgetIndexByType(data, 'abc')).toBe(0);
    expect(storeHelpers.getWidgetIndexByType(data, 'cde')).toBe(1);
    expect(storeHelpers.getWidgetIndexByType(data, '')).toBe(-1);
    expect(storeHelpers.getWidgetIndexByType({}, '')).toBe(-1);
    expect(storeHelpers.getWidgetIndexByType(null, '')).toBe(-1);
  });
});
describe('mergeWidgets', () => {
  const prevWidgets = [
    {
      type: 'test1',
      extraData: { status: 'test' },
      settings: {
        uid: 1,
      },
    },
    {
      type: 'test2',
    },
    {
      type: 'test3',
      settings: {
        uid: 3,
      },
    },
  ];
  const nextWidgets = [
    {
      type: 'test1',
      settings: {
        uid: 1,
      },
    },
    {
      type: 'test2',
      settings: {
        uid: 2,
      },
    },
  ];
  it('should return the prev widgets if next is empty', () => {
    expect(storeHelpers.mergeWidgets([], prevWidgets)).toEqual(prevWidgets);
  });
  it('should return the next widgets if the prev is empty', () => {
    expect(storeHelpers.mergeWidgets(nextWidgets, [])).toEqual(nextWidgets);
  });
  it('should return the merged widgets data', () => {
    const widgets = storeHelpers.mergeWidgets(nextWidgets, prevWidgets);
    expect(widgets).toHaveLength(2);
    expect(widgets[0]).toHaveProperty('extraData', { status: 'test' });
  });
});
describe('isVerticalHome', () => {
  it('should return true if data.uri is /deportes', () => {
    const pageDataDeportes = Object.assign({}, pageData, { data: { uri: '/deportes' } });
    Store.dispatch(setPageData(pageDataDeportes));
    expect(storeHelpers.isVerticalHome(Store)).toBe(true);
  });
  it('should return true if data.uri override is /deportes', () => {
    expect(storeHelpers.isVerticalHome(null, '/deportes')).toBe(true);
  });
});
describe('isCurrentPage', () => {
  const home = ['/'];
  it('should return true if data.uri is home', () => {
    const pageDataHome = {
      ...pageData,
      data: {
        uri: '/',
      },
    };
    Store.dispatch(setPageData(pageDataHome));
    expect(storeHelpers.isCurrentPage(Store, home)).toBeTruthy();
  });
  it('should return false if data.uri is /deportes', () => {
    const pageDataHome = {
      ...pageData,
      data: {
        uri: '/deportes',
      },
    };
    Store.dispatch(setPageData(pageDataHome, home));
    expect(storeHelpers.isCurrentPage(Store)).toBeFalsy();
  });

  it('should return false if no pages provided', () => {
    const pageDataHome = {
      ...pageData,
      data: {
        uri: '/deportes',
      },
    };
    Store.dispatch(setPageData(pageDataHome, null));
    expect(storeHelpers.isCurrentPage(Store)).toBe(false);
  });
});
describe('getDeviceType', () => {
  it('Should return ios if iphone user agent is found', () => {
    const data = { userAgent: 'iPhone' };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.getDeviceType(Store)).toBe('ios');
  });
  it('Should return `android` if android user agent is found', () => {
    const data = { userAgent: 'android' };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.getDeviceType(Store)).toBe('android');
  });
  it('Should return `` if user agent is blank', () => {
    const data = { userAgent: '' };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.getDeviceType(Store)).toBe('');
  });
  it('Should return `` if user agent not found', () => {
    const data = { userAgent: 'linux' };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.getDeviceType(Store)).toBe('');
  });
});
describe('isSafariMobile', () => {
  it('Should return true if is safari from "uaDevice"', () => {
    const data = {
      uaDevice: 'mobile-iphone-safari',
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isSafariMobile(Store)).toBeTruthy();
  });
  it('Should return true if is safari on IOS', () => {
    const data = {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1',
      uaDevice: null,
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isSafariMobile(Store)).toBeTruthy();
  });
  it('Should return false if is not safari on IOS', () => {
    const data = {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/600.7.12 (KHTML, like Gecko) Version/8.0.7 Safari/600.7.12',
      uaDevice: null,
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isSafariMobile(Store)).toBeFalsy();
  });
  it('Should return false if is not have valid data', () => {
    expect(storeHelpers.isSafariMobile(null)).toBeFalsy();
  });
});
describe('getVertical', () => {
  it('Should return null if parameter is not found', () => {
    expect(storeHelpers.getVertical(Store)).toBeNull();
  });
  it('Should return value if parameter is found', () => {
    const data = {
      data: {
        vertical: 'Entretenimiento',
      },
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.getVertical(Store)).toBe('entretenimiento');
  });
});
describe('getModeParam', () => {
  it('Should return empty string if parameter is not found', () => {
    expect(storeHelpers.getModeParam(Store)).toBe('');
  });
  it('Should return value if mode parameter is found', () => {
    const data = { requestParams: { mode: 'test' } };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.getModeParam(Store)).toBe('test');
  });
});
describe('getRequestId', () => {
  it('Should return empty string if requestId is not found', () => {
    expect(storeHelpers.getRequestId(Store)).toBe('');
  });
  it('Should return value if mode parameter is found', () => {
    const data = { requestId: '61b6ea30-58c1-11e8-91d0-d58d645c390c' };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.getRequestId(Store)).toBe('61b6ea30-58c1-11e8-91d0-d58d645c390c');
  });
});

describe('isVideoSDKReady', () => {
  it('should return false by default', () => {
    expect(storeHelpers.isVideoSDKReady(Store)).toBe(false);
  });
});

describe('isAmp', () => {
  it('should return false by default', () => {
    expect(storeHelpers.isAmp(Store)).toBe(false);
  });
});

describe('isSpa', () => {
  it('should return false by default', () => {
    expect(storeHelpers.isSpa(Store)).toBe(false);
  });
});

describe('getBrandable', () => {
  it('Should return a Brandable object', () => {
    expect(storeHelpers.getBrandable(Store) instanceof Brandable).toBe(true);
  });
});

describe('isPrimaryTagEnabled', () => {
  it('should return false by default', () => {
    expect(storeHelpers.isPrimaryTagEnabled(Store)).toBe(false);
  });
  it('should return true with provided data', () => {
    const data = {
      data: {
        primaryTag: {
          name: 'Delicioso',
        },
      },
    };
    const tagList = ['delicioso'];
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isPrimaryTagEnabled(Store, tagList)).toBe(true);
  });
  it('should return true with provided data for BEX', () => {
    const data = {
      data: {
        hierarchy: [{
          name: 'Delicioso',
        }],
      },
    };
    const tagList = ['delicioso'];
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isPrimaryTagEnabled(Store, tagList)).toBe(true);
  });
  it('should return false when an array is not provided', () => {
    const data = {
      data: {
        primaryTag: {
          name: 'Delicioso',
        },
      },
    };
    const tagList = 'delicioso';
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isPrimaryTagEnabled(Store, tagList)).toBe(false);
  });
});
describe('isOptimizeAntiFlickerEnabled', () => {
  it('should return false by default', () => {
    expect(storeHelpers.isOptimizeAntiFlickerEnabled(Store)).toBe(false);
  });
  it('should return false if the vertical has not uris assigned.', () => {
    const data = {
      data: {
        vertical: 'Entretenimiento',
        uri: '/delicioso',
      },
    };
    const dataList = {
      entretenimiento: [],
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isOptimizeAntiFlickerEnabled(Store, dataList)).toBe(false);
  });
  it('should return true if the vertical has at least one uri assigned', () => {
    const data = {
      data: {
        vertical: 'entretenimiento',
        uri: '/delicioso',
      },
    };
    const dataList = {
      entretenimiento: [
        '/delicioso',
      ],
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isOptimizeAntiFlickerEnabled(Store, dataList)).toBe(true);
  });
  it('should return false if the Store is not defined', () => {
    const dataList = {
      entretenimiento: [
        '/delicioso',
      ],
    };
    expect(storeHelpers.isOptimizeAntiFlickerEnabled(null, dataList)).toBe(false);
  });
  it('should return false if the uri is not in the config data', () => {
    const data = {
      data: {
        vertical: 'entretenimiento',
        uri: '/delicioso/receta-1',
      },
    };
    const dataList = {
      entretenimiento: [
        '/delicioso',
      ],
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isOptimizeAntiFlickerEnabled(Store, dataList)).toBe(false);
  });
  it('should return false if the uri is not specified.', () => {
    const data = {
      data: {
        vertical: 'entretenimiento',
      },
    };
    const dataList = {
      entretenimiento: [
        '/delicioso',
      ],
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isOptimizeAntiFlickerEnabled(Store, dataList)).toBe(false);
  });
  it('should return false when the config data is null', () => {
    const data = {
      data: {
        vertical: 'Entretenimiento',
        uri: '/delicioso',
      },
    };
    const dataList = null;
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isOptimizeAntiFlickerEnabled(Store, dataList)).toBe(false);
  });
  it('should return false if the vertical is invalid', () => {
    const data = {
      data: {
        vertical: 'novertical',
        uri: '/delicioso',
      },
    };
    const dataList = {
      entretenimiento: [
        '/delicioso',
      ],
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isOptimizeAntiFlickerEnabled(Store, dataList)).toBe(false);
  });
  it('should return false if the vertical is not specified', () => {
    const data = {
      data: {
        uri: '/delicioso',
      },
    };
    const dataList = {
      entretenimiento: [
        '/delicioso',
      ],
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isOptimizeAntiFlickerEnabled(Store, dataList)).toBe(false);
  });
});

describe('isInfiniteScrollingEnabled', () => {
  it('should return false by default', () => {
    expect(storeHelpers.isInfiniteScrollingEnabled(Store)).toBe(false);
  });
  it('should return false if vertical is null', () => {
    const data = {
      data: {
        vertical: null,
        uri: '/delicioso',
      },
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isInfiniteScrollingEnabled(Store)).toBe(false);
  });
  it('should return false when isInfiniteScrollingEnabled is disable from pageData', () => {
    const data = {
      data: {
        vertical: 'Noticias',
        isInfiniteScrollEnabled: false,
      },
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isInfiniteScrollingEnabled(Store)).toBe(false);
  });
  it('should return false when in US location and univision site from pageData', () => {
    const data = {
      data: {
        vertical: 'Noticias',
        isInfiniteScrollEnabled: false,
        userLocation: 'US',
      },
      site: 'univision',
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isInfiniteScrollingEnabled(Store)).toBe(false);
  });
  it('should return true when isInfiniteScrollingEnabled is enable from pageData', () => {
    const data = {
      data: {
        vertical: 'Noticias',
        isInfiniteScrollEnabled: true,
      },
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isInfiniteScrollingEnabled(Store)).toBe(true);
  });
  it('should return true when isInfiniteScrollingEnabled is an horoscope subsection', () => {
    const data = {
      data: {
        vertical: 'Noticias',
        isInfiniteScrollEnabled: true,
      },
      pageCategory: 'horoscopos',
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isInfiniteScrollingEnabled(Store)).toBe(true);
  });
});

describe('isContentTypeAllowed', () => {
  it('should return TRUE if content type from STORE is in given array', () => {
    const pageDataWithContentType = {
      ...pageData,
      data: { type: 'video' },
    };
    Store.dispatch(setPageData(pageDataWithContentType));
    expect(storeHelpers.isContentTypeAllowed(Store, ['video'])).toBe(true);
  });

  it('should return FALSE if content type from STORE is not in given array', () => {
    const pageDataWithContentType = {
      ...pageData,
      data: { type: 'video' },
    };
    Store.dispatch(setPageData(pageDataWithContentType));
    expect(storeHelpers.isContentTypeAllowed(Store, ['section'])).toBe(false);
  });

  it('should return FALSE if given array is invalid', () => {
    expect(storeHelpers.isContentTypeAllowed(Store, [])).toBe(false);
  });

  it('should return FALSE if given array is invalid', () => {
    expect(storeHelpers.isContentTypeAllowed(Store, undefined)).toBe(false);
  });

  it('should return FALSE if Store is empty ', () => {
    expect(storeHelpers.isContentTypeAllowed(null, ['video'])).toBe(false);
  });
});

describe('isDeviceAllowed', () => {
  it('should return TRUE if device from STORE is in given array', () => {
    const pageDataWithDevice = {
      ...pageData,
      device: 'mobile',
    };
    Store.dispatch(setPageData(pageDataWithDevice));

    const device = storeHelpers.getDevice(Store);
    expect(device).toBe('mobile');

    const allowed = storeHelpers.isDeviceAllowed(Store, ['mobile']);
    expect(allowed).toBe(true);
  });

  it('should return FALSE if device from STORE is in given array', () => {
    const pageDataWithDevice = Object.assign({}, pageData, { device: 'mobile' });
    Store.dispatch(setPageData(pageDataWithDevice));

    const device = storeHelpers.getDevice(Store);
    expect(device).toBe('mobile');

    const allowed = storeHelpers.isDeviceAllowed(Store, ['desktop']);
    expect(allowed).toBe(false);
  });

  it('should return FALSE if no array provided', () => {
    const allowed = storeHelpers.isDeviceAllowed(Store, undefined);
    expect(allowed).toBe(false);
  });

  it('should return FALSE if given array is invalid', () => {
    const allowed = storeHelpers.isDeviceAllowed(Store, 'notAnArray');
    expect(allowed).toBe(false);
  });
});

describe('isUrlAllowed', () => {
  it('should return false with no params', () => {
    expect(storeHelpers.isUrlAllowed()).toBeFalsy();
  });
  it('should return TRUE if the url its allowed', () => {
    const data = {
      data: {
        uri: 'foo',
      },
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isUrlAllowed(Store, ['foo'])).toBeTruthy();
  });
  it('should return false if the url its allowed', () => {
    const data = {
      data: {
        uri: 'foo',
      },
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isUrlAllowed(Store, ['bar'])).toBeFalsy();
  });
  it('should return false if the store is not a valid object', () => {
    const data = 'data';
    expect(storeHelpers.isUrlAllowed(data, ['bar'])).toBeFalsy();
  });
});

describe('isTopAdInserted', () => {
  it('should return false by default', () => {
    expect(storeHelpers.isTopAdInserted(Store)).toBe(false);
  });
});

describe('getTopAdInsertedFrom', () => {
  it('should return null by default', () => {
    expect(storeHelpers.getTopAdInsertedFrom(Store)).toBe(null);
  });

  it('should return the correct value', () => {
    Store.dispatch(insertTopAd('SectionAd'));

    expect(storeHelpers.getTopAdInsertedFrom(Store)).toBe('SectionAd');
  });
});

describe('isLongForm', () => {
  it('should return false by default', () => {
    expect(storeHelpers.isLongForm()).toBeFalsy();
  });
  it('should return false if the store is a valid object without required params', () => {
    const store = {
      test: 'test',
    };
    expect(storeHelpers.isLongForm(store)).toBeFalsy();
  });
  it('should return true if longorm is set to true', () => {
    const data = {
      data: {
        longform: true,
      },
    };
    expect(storeHelpers.isLongForm(data)).toBeTruthy();
  });
});

describe('getEntryByKey', () => {
  it('should return a value using the key', () => {
    const data = {
      data: {
        type: 'section',
        primaryTag: {
          name: 'Uforia Music',
        },
      },
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.getEntryByKey(Store, 'data.type')).toBe('section');
  });
});

describe('isLiveTvPage', () => {
  it('should return true if page category is local-tv and uri includes "tv-en-vivo"', () => {
    const data = { data: { uri: 'univision.com/tv-en-vivo' }, pageCategory: 'local-tv' };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isLiveTvPage(Store)).toBe(true);
  });

  it('should return false if uri does not include "tv-en-vivo"', () => {
    const data = { data: { uri: 'univision.com' }, pageCategory: 'local-tv' };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isLiveTvPage(Store)).toBe(false);
  });

  it('should return false if page category is not "local-tv"', () => {
    const data = { data: { uri: 'univision.com/tv-en-vivo' }, pageCategory: 'radio' };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isLiveTvPage(Store)).toBe(false);
  });
});

describe('isRadioPage', () => {
  it('should return true if page category is radio', () => {
    const data = { pageCategory: 'radio' };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isRadioPage(Store)).toBe(true);
  });
});

describe('getCanonicalUrl', () => {
  const canonicalUrl = 'https://www.univision.com/noticias/incendios/fotografias-interactivas';
  const uri = '/san-francisco/kdtv/noticias/incendios/fotografias-interactivas';
  const seoData = {
    domain: 'https://www.univision.com',
    data: {
      seo: { canonicalUrl },
      type: 'article',
      uri,
      primaryTag: {
        name: 'Noticias',
      },
    },
  };
  it('should return empty if not have valid page data or store', () => {
    expect(storeHelpers.getCanonicalUrl()).toBeNull();
  });
  it('should return the canonical url from the seo node if present', () => {
    Store.dispatch(setPageData(seoData));
    expect(storeHelpers.getCanonicalUrl(Store)).toBe(canonicalUrl);
  });
  it('should return the page url as canonical url when not on the seo node', () => {
    const noSeoData = { ...seoData };
    delete noSeoData.data.seo;
    Store.dispatch(setPageData(noSeoData));
    expect(storeHelpers.getCanonicalUrl(Store)).toBe(toAbsoluteUrl(uri, seoData.domain));
  });
  it('should return canonical url for search page with query', () => {
    const canonicalSearch = 'https://www.univision.com/search';
    const requestParams = { q: 'mexico' };
    const searchData = {
      ...seoData,
      requestParams,
      data: {
        seo: { canonicalUrl: canonicalSearch },
        type: contentTypes.SEARCH_PORTAL,
        uri: '/search',
      },
    };
    Store.dispatch(setPageData(searchData));
    expect(storeHelpers.getCanonicalUrl(Store)).toBe(`${canonicalSearch}?q=${requestParams.q}`);
  });
  it('should return canonical url for search page without query if it is empty', () => {
    const canonicalSearch = 'https://www.univision.com/search';
    const requestParams = null;
    const searchData = {
      ...seoData,
      requestParams,
      data: {
        seo: { canonicalUrl: canonicalSearch },
        type: contentTypes.SEARCH_PORTAL,
        uri: '/search',
      },
    };
    Store.dispatch(setPageData(searchData));
    expect(storeHelpers.getCanonicalUrl(Store)).toBe(canonicalSearch);
  });
  it('should return canonical url from uri for search if seo data is invalid', () => {
    const searchUri = '/search';
    const badData = {
      ...seoData,
      domain: 'www.univision.com',
      data: {
        seo: null,
        type: contentTypes.SEARCH_PORTAL,
        uri: searchUri,
      },
    };
    Store.dispatch(setPageData(badData));
    expect(storeHelpers.getCanonicalUrl(Store)).toBe(toAbsoluteUrl(searchUri, badData.domain));
  });
});

describe('getDomain', () => {
  it('should return univision.com domain', () => {
    const domainData = {
      domain: 'https://www.univision.com',
    };
    Store.dispatch(setPageData(domainData));
    expect(storeHelpers.getDomain(Store)).toBe(domainData.domain);
  });
});

describe('getOriginalUrl', () => {
  it('should return the original url', () => {
    const data = {
      originalUrl: 'https://www.univision.com/original-url',
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.getOriginalUrl(Store)).toBe(data.originalUrl);
  });
});

describe('getSites', () => {
  it('should return empty object if have not sites data', () => {
    const data = {
      sites: null,
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.getSites(Store)).toEqual({});
  });

  it('should return available sites', () => {
    const data = {
      sites: {
        univision: 'https://www.univision.com',
        tudn: 'https://www.tudn.com',
      },
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.getSites(Store)).toEqual(data.sites);
  });
});

describe('getSearchData', () => {
  it('should return empty object not data in Store', () => {
    Store.dispatch(setSearchData({}));
    expect(storeHelpers.getSearchData()).toBeUndefined();
  });
  it('should return object data in Store', () => {
    Store.dispatch(setSearchData({ results: [] }));
    expect(storeHelpers.getSearchData(Store)).toHaveProperty('results');
  });
});

describe('getInitialState', () => {
  it('should return empty object not data in Store', () => {
    Store.dispatch(setPageData({}));
    expect(storeHelpers.getInitialState()).toBeNull();
  });
  it('should return initial state data with page data', () => {
    Store.dispatch(setPageData(pageData));
    expect(storeHelpers.getInitialState(Store)).toHaveProperty('data');
  });
  it('should return initial state data with search data', () => {
    Store.dispatch(setPageData({
      data: {
        type: contentTypes.SEARCH_PORTAL,
      },
    }));
    expect(storeHelpers.getInitialState(Store)).toHaveProperty('search');
  });
  it('should clear request params', () => {
    Store.dispatch(setPageData({
      requestParams: {
        phased_release: ['pip_player', 'pip_player', 'pip_player'],
      },
    }));
    expect(storeHelpers.getInitialState(Store)).toEqual(expect.objectContaining({
      requestParams: {
        phased_release: 'pip_player',
      },
    }));
  });
  it('should clear request params', () => {
    Store.dispatch(setPageData({
      requestParams: {
        phased_release: 'pip_player',
      },
    }));
    expect(storeHelpers.getInitialState(Store)).toEqual(expect.objectContaining({
      requestParams: {
        phased_release: 'pip_player',
      },
    }));
  });
  it('should clear request params', () => {
    Store.dispatch(setPageData({
      requestParams: null,
    }));
    expect(storeHelpers.getInitialState(Store).requestParams).toEqual(null);
  });
});

describe('getCurrentHorizontalSlideshowIndex', () => {
  it('should return 0 if Store.getState is an invalid function', () => {
    expect(storeHelpers.getCurrentHorizontalSlideshowIndex()).toBe(0);
  });

  it('should return current horizontal slideshow index', () => {
    Store.dispatch(setCurrentSlideshow(3));

    expect(storeHelpers.getCurrentHorizontalSlideshowIndex(Store)).toBe(3);
  });
});

describe('getConfig', () => {
  beforeEach(() => {
    Store.dispatch(setPageData({
      config: {
        syndicator: {
          widget: 'https://syndicator.univision.com/web-api/widget',
        },
      },
    }));
  });

  it('should return the config object if no key is provided', () => {
    expect(storeHelpers.getConfig(Store)).toEqual({
      syndicator: {
        widget: 'https://syndicator.univision.com/web-api/widget',
      },
    });
  });

  it('should return the config value if key is provided', () => {
    expect(storeHelpers.getConfig(Store, 'syndicator.widget')).toBe('https://syndicator.univision.com/web-api/widget');
  });
});

describe('getHeaderConf', () => {
  it('should return an empty object by default', () => {
    expect(storeHelpers.getHeaderConf()).toEqual({});
  });
  it('should return an initial state', () => {
    const expectedHeaderConf = {
      brandableType: null,
      isHamburgerMenuOpen: false,
      isSearchFieldOpen: false,
      isMarketSelectorOpen: false,
      userLogIn: false,
    };
    expect(storeHelpers.getHeaderConf(Store)).toEqual(expectedHeaderConf);
  });
});

describe('isHamburgerMenuOpen', () => {
  it('should return false by default', () => {
    expect(storeHelpers.isHamburgerMenuOpen()).toBe(false);
  });
});

describe('isSearchFieldOpen', () => {
  it('should return false by default', () => {
    expect(storeHelpers.isSearchFieldOpen()).toBe(false);
  });
});

describe('isUnivisionSite', () => {
  it('should not break if have empty page data', () => {
    expect(storeHelpers.isUnivisionSite()).toBe(false);
  });

  it('should return false if is not a univision site/domain', () => {
    const data = {
      domain: 'tudn.com',
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isUnivisionSite(Store)).toBe(false);
  });

  it('should return true if is a univision site/domain', () => {
    const data = {
      domain: 'uat2.x.univision.com',
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isUnivisionSite(Store)).toBe(true);
  });
  it('should return true if from state data', () => {
    const state = {
      domain: 'univision.com',
    };
    expect(storeHelpers.isUnivisionSite(null, state)).toBe(true);
  });

  it('should return false if is univision domain but is TUDN', () => {
    const state = {
      domain: 'univision.com',
      isTudn: true,
      data: {
        uri: 'https://tudn.com/futbol',
      },
    };
    expect(storeHelpers.isUnivisionSite(null, state)).toBe(false);
  });
});

describe('isTudnSite', () => {
  it('should not break if have empty page data', () => {
    expect(storeHelpers.isTudnSite()).toBe(false);
  });

  it('should return false from store value', () => {
    const data = {
      isTudn: false,
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isTudnSite(Store)).toBe(false);
  });

  it('should return true from store value', () => {
    const data = {
      isTudn: true,
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.isTudnSite(Store)).toBe(true);
  });

  it('should return true if from state data', () => {
    const state = {
      isTudn: true,
    };
    expect(storeHelpers.isTudnSite(null, state)).toBe(true);
  });
});

describe('getSectionUrl', () => {
  it('should return the correct section url', () => {
    const sectionUrl = '/noticias/politica';
    const data = {
      navData: { sectionUrl },
    };

    Store.dispatch(setPageData(data));

    expect(storeHelpers.getSectionUrl(Store)).toEqual(sectionUrl);
  });

  it('should return null if section url is not in the store', () => {
    const data = {
      navData: null,
    };

    Store.dispatch(setPageData(data));

    expect(storeHelpers.getSectionUrl(Store)).toEqual(null);
  });
});

describe('getSectionUrlPathname', () => {
  const pathname = '/noticias/politica';

  it('should return the correct section url pathaname when there is an origin', () => {
    const sectionUrl = `https://uat2.x.univision.com${pathname}`;
    const data = {
      navData: { sectionUrl },
    };

    Store.dispatch(setPageData(data));

    expect(storeHelpers.getSectionUrlPathname(Store)).toEqual(pathname);
  });

  it('should return the correct section url pathaname when there is no origin', () => {
    const data = {
      navData: { sectionUrl: pathname },
    };

    Store.dispatch(setPageData(data));

    expect(storeHelpers.getSectionUrlPathname(Store)).toEqual(pathname);
  });

  it('should return null if section url is not in the store', () => {
    const data = {
      navData: null,
    };

    Store.dispatch(setPageData(data));

    expect(storeHelpers.getSectionUrlPathname(Store)).toEqual(null);
  });
});

describe('isDesktop', () => {
  it('should return true if device is desktop', () => {
    Store.dispatch(setPageData({ device: 'desktop' }));
    expect(storeHelpers.isDesktop(Store)).toEqual(true);
  });

  it('should return false if device is not desktop', () => {
    Store.dispatch(setPageData({ device: 'mobile' }));
    expect(storeHelpers.isDesktop(Store)).toEqual(false);
  });
});

describe('isShowPage', () => {
  it('should return false if not show page', () => {
    expect(storeHelpers.isShowPage(Store)).toEqual(false);
  });
  it('should return true if show page', () => {
    Store.dispatch(setPageData({
      data: {
        show: {},
      },
    }));
    expect(storeHelpers.isShowPage(Store)).toEqual(true);
  });
});

describe('getNavigationCount', () => {
  it('should return the navigation count', () => {
    Store.dispatch(setPageData({ navigationCount: 2 }));
    expect(storeHelpers.getNavigationCount(Store)).toBe(2);
  });
});

describe('isSectionPage', () => {
  it('should return true if section type', () => {
    Store.dispatch(setPageData({
      data: {
        type: contentTypes.SECTION,
      },
    }));
    expect(storeHelpers.isSectionPage(Store)).toBe(true);
  });
});

describe('isShowHomePage', () => {
  it('should return false if not home show page', () => {
    expect(storeHelpers.isShowHomePage(Store)).toEqual(false);
  });
  it('should return true if home show page', () => {
    Store.dispatch(setPageData({
      data: {
        show: {},
        sectionType: contentTypes.SHOW,
      },
    }));
    expect(storeHelpers.isShowHomePage(Store)).toEqual(true);
  });
});

describe('getTitleShow', () => {
  it('should return title if user is in show page noticias y mas', () => {
    const data = {
      data: {
        title: 'test',
        primaryTag: {
          name: 'al punto',
        },
      },
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.getTitleShow(Store)).toBe('test - noticias y mas');
  });

  it('should return title if user is in show page videos', () => {
    features.shows.isShortform = jest.fn();
    features.shows.showsRedesign = jest.fn();
    features.shows.isShortform.mockReturnValueOnce(true);
    features.shows.showsRedesign.mockReturnValueOnce(true);
    const data = {
      data: {
        title: 'test',
        primaryTag: {
          name: 'amor eterno',
        },
      },
    };
    Store.dispatch(setPageData(data));
    expect(storeHelpers.getTitleShow(Store)).toBe('test - videos');
  });
});

describe('hasFeatureFlag', () => {
  it('should return false if the feature flag is not enabled', () => {
    expect(storeHelpers.hasFeatureFlag(Store, 'foo')).toBe(false);
  });
  it('should return true if the feature flag is enabled', () => {
    Store.dispatch(setPageData({ requestParams: { foo: 'true' } }));
    expect(storeHelpers.hasFeatureFlag(Store, 'foo')).toBe(true);
  });
  it('should return true if the feature flag is enabled, using a custom value', () => {
    Store.dispatch(setPageData({ requestParams: { foo: 'bar' } }));
    expect(storeHelpers.hasFeatureFlag(Store, 'foo', 'bar')).toBe(true);
  });
});

describe('isSoccerMatchPage', () => {
  it('should return true if soccerMatch type', () => {
    Store.dispatch(setPageData({
      data: {
        type: contentTypes.SOCCER_MATCH,
      },
    }));
    expect(storeHelpers.isSoccerMatchPage(Store)).toBe(true);
  });
});
