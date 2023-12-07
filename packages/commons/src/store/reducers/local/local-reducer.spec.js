import deepFreeze from 'deep-freeze';
import * as types from '../../actions/local/local-action-types';
import { CURRENT_LOCAL_MARKET } from '../../../constants/personalization';
import LocalStorage from '../../../utils/helpers/LocalStorage';
import localReducer from './local-reducer';
import { jobsSlice } from '../../slices/local/jobSearchSlice';
import { SYNC_STORE } from '../../actions/action-types';

/**
 * Mocking here to aviod store inclusion since the store is not initilized yet
 * ?? some how jest detect those dependencies
 */
jest.mock('../../store', () => {});

/**
 * Mock data for api
 * @type {Object}
 */
const initialState = {
  isCelsius: null,
  marketByLocation: {
    currentMarket: null,
    contents: {},
  },
  loadingLocalMarket: false,
};

/**
 * Mock data for api
 * @type {Object}
 */
const data = {
  a: 1,
  b: 2,
};

deepFreeze(initialState);

describe('SET_WEATHER_FORECAST_BY_LOCAL action', () => {
  it('returns data on local key', () => {
    expect(localReducer(undefined, {
      type: types.SET_WEATHER_FORECAST_BY_LOCAL,
      data,
      local: 'test',
    })).toEqual({
      ...initialState,
      test: {
        weatherForecast: {
          ...data,
        },
      },
    });
  });
});

describe('FETCH_WEATHER_FORECAST_PENDING action', () => {
  it('returns data on local key', () => {
    expect(localReducer(initialState, {
      type: types.FETCH_WEATHER_FORECAST_PENDING,
    })).toEqual({
      ...initialState,
      loading: true,
      error: null,
      isCelsius: null,
    });
  });
});

describe('FETCH_WEATHER_FORECAST_FULFILLED action', () => {
  it('should return fullfiled state', () => {
    expect(localReducer(initialState, {
      type: types.FETCH_WEATHER_FORECAST_FULFILLED,
    })).toEqual({
      ...initialState, error: null, loading: false, isCelsius: null,
    });
  });
});

describe('FETCH_WEATHER_FORECAST_REJECTED action', () => {
  it('should return rejected state', () => {
    expect(localReducer(initialState, {
      type: types.FETCH_WEATHER_FORECAST_REJECTED,
      payload: {},
    })).toEqual({
      ...initialState,
      error: {},
      loading: false,
      isCelsius: null,
    });
  });
});

describe('SET_ISCELSIUS_ACTIVE', () => {
  it('should return isCelsius as true', () => {
    expect(localReducer(initialState, {
      type: types.SET_ISCELSIUS_ACTIVE,
    })).toEqual({
      ...initialState,
      isCelsius: true,
    });
  });
});

describe('SET_ISCELSIUS_DISABLED', () => {
  it('should return isCelsius as false', () => {
    expect(localReducer(initialState, {
      type: types.SET_ISCELSIUS_DISABLED,
    })).toEqual({
      ...initialState,
      isCelsius: false,
    });
  });
});

describe('default action', () => {
  it('returns state', () => {
    expect(localReducer(initialState, {
      type: '',
    })).toEqual(initialState);
  });
});

describe('FETCH_LOCAL_MARKET_CONTENT_PENDING action', () => {
  it('returns data on local key', () => {
    expect(localReducer(initialState, {
      type: types.FETCH_LOCAL_MARKET_CONTENT_PENDING,
    })).toEqual({
      ...initialState,
      loadingLocalMarket: true,
      error: null,
    });
  });
});

describe('FETCH_LOCAL_MARKET_CONTENT__FULFILLED action', () => {
  it('should return fullfiled state', () => {
    expect(localReducer(initialState, {
      type: types.FETCH_LOCAL_MARKET_CONTENT__FULFILLED,
    })).toEqual({
      ...initialState,
      loadingLocalMarket: false,
      error: null,
    });
  });
});

describe('FETCH_LOCAL_MARKET_CONTENT__REJECTED action', () => {
  it('should return rejected state', () => {
    expect(localReducer(initialState, {
      type: types.FETCH_LOCAL_MARKET_CONTENT__REJECTED,
      payload: {},
    })).toEqual({
      ...initialState,
      error: {},
      loadingLocalMarket: false,
    });
  });
});

describe('SET_LOCAL_MARKET_BY_LOCATION', () => {
  afterAll(() => {
    localStorage.clear();
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('should set the local market in the store and local storage', () => {
    expect(localReducer(initialState, {
      type: types.SET_LOCAL_MARKET_BY_LOCATION,
      localMarket: 'KAKW',
    })).toEqual({
      ...initialState,
      marketByLocation: {
        ...initialState.marketByLocation,
        currentMarket: 'KAKW',
      },
    });
    expect(LocalStorage.get(CURRENT_LOCAL_MARKET)).toEqual('KAKW');
  });

  it('should set the local market in the store but not local storage', () => {
    expect(localReducer(initialState, {
      type: types.SET_LOCAL_MARKET_BY_LOCATION,
      localMarket: 'KAKW',
      disableStorage: true,
    })).toEqual({
      ...initialState,
      marketByLocation: {
        ...initialState.marketByLocation,
        currentMarket: 'KAKW',
      },
    });
    expect(LocalStorage.get(CURRENT_LOCAL_MARKET)).toEqual(null);
  });
});

describe('SET_LOCAL_CONTENT_BY_LOCATION action', () => {
  it('should set the content for a local market', () => {
    expect(localReducer(initialState, {
      type: types.SET_LOCAL_CONTENT_BY_LOCATION,
      localMarket: 'KAKW',
      contents: ['test'],
    })).toEqual({
      ...initialState,
      marketByLocation: {
        ...initialState.marketByLocation,
        contents: {
          KAKW: ['test'],
        },
      },
    });
  });
});

describe('SET_TU_CIUDAD_LOCAL_MARKET action', () => {
  it('should set the content for tu ciudad local market', () => {
    expect(localReducer(initialState, {
      type: types.SET_TU_CIUDAD_LOCAL_MARKET,
      localMarket: 'KAKW',
    })).toEqual({
      ...initialState,
      marketByLocation: {
        ...initialState.marketByLocation,
        tuCiudadLocalMarket: 'KAKW',
      },
    });
  });
});

describe('SET_WEATHER_ALERTS', () => {
  const weatherAlerts = {
    extremeAlert: {
      areaId: 'GEJ232',
      detailKey: 'ae434e-345',
    },
    totalCount: 2,
    unreadWeatherAlerts: [1, 2],
  };
  it('should return correct weather state', () => {
    const finalState = { ...initialState, KDTV: { weatherAlerts } };
    expect(localReducer(initialState, {
      type: types.SET_WEATHER_ALERTS,
      local: 'KDTV',
      weatherAlerts,
    })).toEqual(finalState);
  });
});

describe('FETCH_JOBS', () => {
  it('should execute jobs reducer', () => {
    const spyJobsReducer = jest.spyOn(jobsSlice, 'reducer');

    let action = {
      type: types.FETCH_JOBS_REJECTED,
      jobs: [],
    };
    localReducer(initialState, action);

    expect(spyJobsReducer).toHaveBeenCalledWith(initialState, action);

    action = {
      type: types.FETCH_JOBS_PENDING,
      jobs: undefined,
    };
    localReducer(initialState, action);
    expect(spyJobsReducer).toHaveBeenCalledWith(initialState, action);

    action = {
      type: types.FETCH_JOBS_FULFILLED,
      jobs: [1, 2],
    };
    localReducer(initialState, action);
    expect(spyJobsReducer).toHaveBeenCalledWith(initialState, action);

    action = {
      type: SYNC_STORE,
      jobs: [1, 2],
    };
    localReducer(initialState, action);
    expect(spyJobsReducer).toHaveBeenCalledWith(initialState, action);
  });
});

describe('UPDATE_WEATHER_ALERTS', () => {
  it('should return correct weather state', () => {
    const initialWeatherAlerts = {
      totalCount: 3,
      unreadWeatherAlerts: [1, 2, 3],
      extremeAlert: null,
    };

    const finalWeatherAlerts = {
      totalCount: 3,
      unreadWeatherAlerts: [1, 2],
      extremeAlert: null,
    };

    const finalState = {
      ...initialState,
      KDTV: {
        weatherAlerts: finalWeatherAlerts,
      },
    };
    const state = localReducer(initialState, {
      type: types.SET_WEATHER_ALERTS,
      local: 'KDTV',
      weatherAlerts: initialWeatherAlerts,
    });
    expect(localReducer(state, {
      type: types.UPDATE_UNREAD_WEATHER_ALERTS,
      local: 'KDTV',
      unreadWeatherAlerts: [1, 2],
    })).toEqual(finalState);
  });
});
