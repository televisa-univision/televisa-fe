import deepFreeze from 'deep-freeze';
import * as types from '../actions/action-types';
import { FETCH_WEATHER_FORECAST_FULFILLED } from '../actions/local/local-action-types';
import * as themes from '../../utils/themes/themes';
import pageReducer from './page-reducer';

/**
 * Mocking here to aviod store inclusion since the store is not initilized yet
 * ?? some how jest detect those dependencies
 */
jest.mock('../store', () => { });

/**
 * Mock data for api
 * @type {Object}
 */
const initialState = {};

/**
 * Mock data for api
 * @type {Object}
 */
const data = {
  a: 1,
  b: 2,
};

deepFreeze(initialState);

describe('SET_PAGE_DATA action', () => {
  it('should return data', () => {
    expect(pageReducer(initialState, {
      type: types.SET_PAGE_DATA,
      data,
    })).toEqual(data);
  });
  it('should return empty object is not right type', () => {
    expect(pageReducer(initialState, {
      type: 'test',
      data,
    })).toEqual({});
  });
  it('should return empty object is not state', () => {
    expect(pageReducer(undefined, {
      type: 'test',
      data,
    })).toEqual({});
  });
});

describe('SET_THEME_DATA action', () => {
  const theme = { variant: 'light' };
  it('should return theme data', () => {
    expect(pageReducer(initialState, {
      type: types.SET_THEME_DATA,
      theme,
    })).toEqual({ theme });
  });
});

describe('SET_PRE_LOADABLE_COMPONENTS action', () => {
  it('should return data', () => {
    expect(pageReducer(initialState, {
      type: types.SET_PRE_LOADABLE_COMPONENTS,
      loadableComponents: {},
    })).toEqual({ loadableComponents: {} });
  });
});

describe('several page actions', () => {
  it('should return env', () => {
    const pageParams = [
      { isAMP: true, type: 'SET_AMP' },
    ];
    let keys = [];
    let reducer = {};
    pageParams.forEach((item) => {
      keys = Object.keys(item);
      reducer = pageReducer(initialState, {
        type: types[item.type],
        ...item,
      });
      expect(reducer[keys[0]]).toEqual(item[keys[0]]);
    });
  });
});

describe('SET_WIDGET_EXTRA_DATA action', () => {
  const state = {
    data: {
      widgets: [
        {
          settings: {
            uid: 2,
          },
        },
        {
          settings: {
            uid: 3,
          },
        },
      ],
    },
  };
  it('should return widget with extraData', () => {
    const reduced = pageReducer(state, {
      type: types.SET_WIDGET_EXTRA_DATA,
      id: 2,
      data: { a: 'b' },
    });
    expect(reduced.data.widgets[0].extraData).toBeDefined();
  });
  it('should return any widget with extraData', () => {
    const reduced = pageReducer(state, {
      type: types.SET_WIDGET_EXTRA_DATA,
      id: 100,
      data: { a: 'b' },
    });
    expect(reduced).toEqual(state);
  });
  it('should return widget with custom settings', () => {
    const reduced = pageReducer(state, {
      type: types.SET_WIDGET_EXTRA_DATA,
      id: 2,
      data: { a: 'b' },
      settings: {},
    });
    expect(reduced).toEqual(state);
  });
  it('should set settings to widget', () => {
    const reduced = pageReducer(state, {
      type: types.SET_WIDGET_EXTRA_DATA,
      id: 2,
      settings: { a: 'b' },
    });
    expect(reduced.data.widgets[0]).toHaveProperty('settings.a', 'b');
  });
});

describe('SET_AD_SKIN action', () => {
  it('should set flag to true', () => {
    expect(pageReducer(initialState, {
      type: types.SET_AD_SKIN,
      hasAdSkin: true,
    })).toEqual({ hasAdSkin: true });
  });
  it('should set flag to false', () => {
    expect(pageReducer(initialState, {
      type: types.SET_AD_SKIN,
      hasAdSkin: false,
    })).toEqual({ hasAdSkin: false });
  });
});

describe('ADD_WIDEGTS action', () => {
  it('should return new widgets in state', () => {
    const widgets = ['a', 'b'];
    expect(pageReducer({ data: { a: 1 } }, {
      type: types.ADD_WIDGETS,
      widgets,
    }).data.widgets).toEqual(widgets);
  });
  it('should return same state if not data passed', () => {
    const widgets = ['a', 'b'];
    expect(pageReducer({}, {
      type: types.ADD_WIDGETS,
      widgets,
    })).toEqual({});
  });
});

describe('EXTEND_BRANDABLE_SHOW', () => {
  it('should return the same state if there is brandable.show already defined', () => {
    const state = {
      brandable: {
        show: 'defined',
      },
    };
    expect(pageReducer(
      state,
      {
        type: types.EXTEND_BRANDABLE_SHOW,
        data: state,
        pageCategory: 'test',
      }
    )).toEqual(state);
  });

  it('should add a brandable show if there is a custom configuration for the page category', () => {
    const state = {};
    expect(pageReducer(
      state,
      {
        type: types.EXTEND_BRANDABLE_SHOW,
        data: state,
        pageCategory: 'noticiero univision edicion digital',
      }
    ).data.brandable.show.uri).toEqual('/noticias/edicion-digital');
  });
});

describe('SET_HEADER_DATA', () => {
  const navData = { headerTitle: 'test' };
  it('should add the header title', () => {
    expect(pageReducer({}, {
      type: types.SET_HEADER_DATA,
      navData,
    }).navData).toEqual(navData);
  });
});

describe('FETCH_PAGE_CONTENT', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should set loading to true, error to null if its a SPA transition', () => {
    expect(pageReducer(initialState, {
      type: types.FETCH_PAGE_DATA_PENDING,
      meta: { initiator: 'spa' },
    })).toEqual({
      loading: true,
      error: null,
    });
  });

  it('should not set loading to true if its not a SPA transition', () => {
    expect(pageReducer(initialState, {
      type: types.FETCH_PAGE_DATA_PENDING,
      meta: { initiator: 'infinite-scrolling' },
    })).toEqual(initialState);
  });

  it('should set page content, error to null', () => {
    const result = pageReducer(initialState, {
      type: types.FETCH_PAGE_DATA_FULFILLED,
      payload: {
        data,
      },
    });
    expect({
      data: result.data,
      error: result.error,
    }).toEqual({ error: null, data });
  });

  it('should extend page content and not set theme/pageCategory on server side', () => {
    delete global.window;
    const getThemeFromURLSpy = jest.spyOn(themes, 'default');
    const result = pageReducer({ theme: {}, pageCategory: 'deportes' }, {
      type: types.FETCH_PAGE_DATA_FULFILLED,
      payload: {
        data,
      },
    });
    expect(result.theme).toEqual(expect.any(Object));
    expect(result.pageCategory).toEqual(expect.any(String));
    expect(getThemeFromURLSpy).not.toHaveBeenCalled();
  });

  it('should increase the navigation count if its a SPA transition', () => {
    const state = pageReducer(initialState, {
      type: types.FETCH_PAGE_DATA_FULFILLED,
      meta: { initiator: 'spa' },
    });
    expect(state).toMatchObject({
      navigationCount: 1,
    });

    expect(pageReducer(state, {
      type: types.FETCH_PAGE_DATA_FULFILLED,
      meta: { initiator: 'spa' },
    })).toMatchObject({
      navigationCount: 2,
    });
  });

  it('should set page content, loading to false, error to null', () => {
    expect(pageReducer(initialState, {
      type: types.FETCH_PAGE_DATA_REJECTED,
      payload: {
        data,
      },
    })).toEqual({
      loading: false,
      error: {
        data,
      },
    });
  });
});

describe('GET_PAGE_API_CONTENT_FULFILLED', () => {
  const payload = {
    data: {
      hierarchy: [{
        uri: '/',
      }],
      adSettings: {
        disableAds: true,
      },
    },
  };

  it('should have isSensitive be true if ads are disabled', () => {
    const result = pageReducer({}, {
      type: types.GET_PAGE_API_CONTENT_FULFILLED,
      payload,
    });
    expect(result.data.isSensitive).toBe(true);
  });

  it('should empty out tagHierarchy correctly', () => {
    const result = pageReducer({}, {
      type: types.GET_PAGE_API_CONTENT_FULFILLED,
      payload: { ...payload, data: { hierarchy: [], articleType: 'Type' } },
    });
    expect(result.data.tagHierarchy.length).toBe(0);
  });

  it('should add an item in tagHierarchy array if hierarchy array is null', () => {
    const result = pageReducer({}, {
      type: types.GET_PAGE_API_CONTENT_FULFILLED,
      payload: { ...payload, data: { hierarchy: null } },
    });
    expect(result.data.tagHierarchy.length).toBe(1);
  });

  it('should primaryTag be undefined when tagHierarchy is a empty array', () => {
    delete payload.data.hierarchy;
    const result = pageReducer({}, {
      type: types.GET_PAGE_API_CONTENT_FULFILLED,
      payload: { ...payload, data: { tagHierarchy: [] } },
    });
    expect(result.data).not.toHaveProperty('primaryTag');
  });
});

describe('GET_PAGE_API_CONTENT_ERROR', () => {
  it('Should set the correct error message in the store', () => {
    const result = pageReducer({}, {
      type: types.GET_PAGE_API_CONTENT_ERROR,
      payload: 'Error',
    });
    expect(result.error).toBe(true);
    expect(result.message).toEqual('Error');
  });
});

describe('SYNC_STORE', () => {
  it('Should sync store data', () => {
    const result = pageReducer({}, {
      type: types.SYNC_STORE,
      data: {
        page: {
          data: { uri: '/' },
        },
      },
    });
    expect(result.data).toHaveProperty('uri', '/');
  });
});

describe('FETCH_RECOMMENDED_VIDEOS_FULFILLED', () => {
  const videoPage = { recommendations: {} };
  it('should add the header title', () => {
    expect(pageReducer({}, {
      type: types.FETCH_RECOMMENDED_VIDEOS_FULFILLED,
      payload: videoPage,
    })).toEqual({ videoPage });
  });
});

describe('SET_CURRENT_LANGUAGE_ACTION action', () => {
  const language = 'en';
  it('should return current language value', () => {
    expect(pageReducer(initialState, {
      type: types.SET_CURRENT_LANGUAGE,
      language,
    })).toEqual({ language });
  });
});

describe('FETCH_WEATHER_FORECAST_FULFILLED action', () => {
  it('should return weather forecast value', () => {
    const payload = { maxTemp: 30 };
    expect(pageReducer(initialState, {
      type: FETCH_WEATHER_FORECAST_FULFILLED,
      payload,
    })).toEqual({ data: { tvStation: { forecast: { maxTemp: 30 } } } });
  });

  it('should return error prop in weather forecast when payload is not provided', () => {
    expect(pageReducer(initialState, {
      type: FETCH_WEATHER_FORECAST_FULFILLED,
      payload: null,
    })).toEqual({ data: { tvStation: { forecast: { error: true } } } });
  });
});
