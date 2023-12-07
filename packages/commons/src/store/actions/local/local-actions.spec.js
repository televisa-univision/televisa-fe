import * as Actions from './local-actions';
import * as types from './local-action-types';
import request from '../../../utils/api/request';
import Store from '../../store';
import LocalStorage from '../../../utils/helpers/LocalStorage';
import setPageData from '../page-actions';
import fetchContent from '../../../utils/api/content/fetch';
import { LOCAL_ISCELSIUS, CURRENT_LOCAL_MARKET } from '../../../constants/personalization';
import { FAHRENHEIT, CELSIUS, READ_WEATHER_ALERTS_IDS } from '../../../constants/weather';
import mockStore from '../../__mocks__/store';
import marketCoordinates from '../../../constants/marketCoordinates';
import fetchGraphql from '../../../utils/api/graphql';
import { SET_WEATHER_ALERTS } from './local-action-types';
import { fetchWeatherAlerts } from './local-actions';
import * as logger from '../../../utils/logging/clientLogging';

jest.mock('../../../utils/api/request', () => jest.fn());
jest.mock('../../../utils/api/content/fetch', () => jest.fn());
jest.mock('../../../utils/api/graphql', () => jest.fn());

const localMarket = Object.keys(marketCoordinates)[0];

const pageData = {
  data: {
    tvStation: {
      call: localMarket,
    },
    uri: '/foo',
  },
  page: {
    config: {
      graphql: 'graphql-url',
    },
  },
};

const initialState = {
  page: pageData,
  local: {
    isCelsius: null,
    marketByLocation: {
      currentMarket: null,
      contents: {},
    },
    loadingLocalMarket: false,
  },
};

describe('setWeatherForecastByLocal action', () => {
  it('should return expected action type', () => {
    expect(Actions.setWeatherForecastByLocal('', {}))
      .toEqual({
        type: types.SET_WEATHER_FORECAST_BY_LOCAL,
        data: {},
        local: '',
      });
  });
});

describe('fetchWeatherData action', () => {
  beforeEach(() => {
    request.mockReset();
  });

  it('should not fetch weather forecast if market is invalid', async () => {
    Store.dispatch(setPageData({}));
    const action = Actions.fetchWeatherData();
    const mockDispatch = jest.fn().mockImplementation(() => new Promise((resolve) => {
      resolve({ value: { data: 'test' } });
    }));
    await action(mockDispatch);
    expect(fetchGraphql).not.toHaveBeenCalled();
  });

  it('should return expected action type', async () => {
    Store.dispatch(setPageData(pageData));
    request.mockImplementationOnce(async () => ({}));
    fetchGraphql.mockReturnValueOnce(Promise.resolve({ value: { data: 'test' } }));
    const action = Actions.fetchWeatherData();
    const mockDispatch = jest.fn().mockImplementation(() => new Promise((resolve) => {
      resolve({ value: { data: 'test' } });
    }));
    await action(mockDispatch);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should call logger if api returns an error', async () => {
    const logFn = jest.spyOn(logger, 'default');
    Store.dispatch(setPageData(pageData));
    fetchGraphql.mockRejectedValueOnce(new Error('an error occured'));
    const action = Actions.fetchWeatherData();
    await action(Store.dispatch);
    expect(logFn).toHaveBeenCalled();
  });

  it('should return expected action type when proxy is available', async () => {
    Store.dispatch(setPageData({ ...pageData, config: { proxy: 'test' } }));
    request.mockImplementationOnce(async () => ({}));
    const action = Actions.fetchWeatherData();
    fetchGraphql.mockReturnValueOnce(Promise.resolve({ value: { data: 'test' } }));
    const mockDispatch = jest.fn().mockImplementation(() => new Promise((resolve) => {
      resolve({ value: { data: 'test' } });
    }));
    await action(mockDispatch);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should not call dispatch if market already exists', async () => {
    Store.dispatch(setPageData(pageData));
    Store.dispatch(Actions.setWeatherForecastByLocal(localMarket, {}));
    const action = Actions.fetchWeatherData();
    expect(action).toEqual({ type: types.EMPTY_TYPE });
  });
});

describe('setScaleUnit action', () => {
  afterAll(() => {
    localStorage.clear();
  });
  it('should set isCelsius false if there isn\'t in the storage and isCelsius equals null', () => {
    expect(Actions.setScaleUnit())
      .toEqual({
        type: types.SET_ISCELSIUS_DISABLED,
      });
  });
  it('should set isCelsius true if the value is coming from the storage', () => {
    LocalStorage.set(LOCAL_ISCELSIUS, CELSIUS);
    expect(Actions.setScaleUnit())
      .toEqual({
        type: types.SET_ISCELSIUS_ACTIVE,
      });
  });
  it('should set isCelsius false if the value is coming from the storage', () => {
    LocalStorage.set(LOCAL_ISCELSIUS, FAHRENHEIT);
    expect(Actions.setScaleUnit())
      .toEqual({
        type: types.SET_ISCELSIUS_DISABLED,
      });
  });
  it('should returns empty if the function is called but store and storage values are the equal', () => {
    Store.dispatch(Actions.setIsCelsiusActive());
    expect(Actions.setScaleUnit())
      .toEqual({
        type: types.EMPTY_TYPE,
      });
    Store.dispatch(Actions.setIsCelsiusDisabled());
    expect(Actions.setScaleUnit())
      .toEqual({
        type: types.EMPTY_TYPE,
      });
  });
});

describe('setIsCelsiusActive', () => {
  it('should return the expected action type', () => {
    expect(Actions.setIsCelsiusActive())
      .toEqual({
        type: types.SET_ISCELSIUS_ACTIVE,
      });
  });
});

describe('setIsCelsiusDisabled', () => {
  it('should return the expected action type', () => {
    expect(Actions.setIsCelsiusDisabled())
      .toEqual({
        type: types.SET_ISCELSIUS_DISABLED,
      });
  });
});

describe('setCurrentMarketByLocation', () => {
  it('should return the expected action type', () => {
    expect(Actions.setCurrentMarketByLocation('foo'))
      .toEqual({
        type: types.SET_LOCAL_MARKET_BY_LOCATION,
        localMarket: 'foo',
        disableStorage: false,
      });
  });
});

describe('setContentByMarketLocation', () => {
  it('should return the expected action type', () => {
    expect(Actions.setContentByMarketLocation('foo', { foo: 'bar' }))
      .toEqual({
        type: types.SET_LOCAL_CONTENT_BY_LOCATION,
        localMarket: 'foo',
        contents: { foo: 'bar' },
      });
  });
});

describe('fetchLocalMarketContent action', () => {
  beforeEach(() => {
    fetchContent.mockReset();
  });

  it('should return expected action type', async () => {
    const store = mockStore(initialState);
    fetchContent.mockImplementationOnce(async () => ({
      call: 'KAKW',
      contents: ['test'],
    }));
    const action = Actions.fetchLocalMarketContent();
    const { dispatch, getState } = store;
    await action(dispatch, getState);
    const actions = store.getActions();

    expect(actions).toHaveLength(5);
    expect(actions[actions.length - 3]).toEqual({
      type: 'SET_LOCAL_MARKET_BY_LOCATION',
      localMarket: 'KAKW',
      disableStorage: false,
    });
    expect(actions[actions.length - 1]).toEqual({
      type: 'SET_LOCAL_CONTENT_BY_LOCATION',
      localMarket: 'KAKW',
      contents: ['test'],
    });
  });

  it('should return expected action with disable storage', async () => {
    const store = mockStore({
      ...initialState,
      local: {
        marketByLocation: {
          currentMarket: 'KAKW',
        },
      },
    });
    fetchContent.mockImplementationOnce(async () => ({
      call: 'KAKW',
      contents: ['test'],
    }));
    const action = Actions.fetchLocalMarketContent({ disableStorage: true });
    const { dispatch, getState } = store;
    await action(dispatch, getState);
    const actions = store.getActions();

    expect(actions).toHaveLength(4);
    expect(actions[actions.length - 1]).toEqual(
      {
        type: 'SET_LOCAL_CONTENT_BY_LOCATION',
        localMarket: 'KAKW',
        contents: ['test'],
      },
    );
  });

  it('should return expected action when there is not a local market', async () => {
    const store = mockStore(initialState);
    fetchContent.mockImplementationOnce(async () => ({
      call: null,
      contents: ['test'],
    }));
    const action = Actions.fetchLocalMarketContent();
    const { dispatch, getState } = store;
    await action(dispatch, getState);

    expect(store.getActions()).toHaveLength(2);
  });

  it('should return expected action when there is not a local market', async () => {
    const store = mockStore({
      ...initialState,
      page: {
        ...pageData,
        data: {
          ...pageData.data,
          uri: null,
        },
      },
    });
    fetchContent.mockImplementationOnce(async () => ({
      call: null,
      contents: ['test'],
    }));
    const action = Actions.fetchLocalMarketContent();
    const { dispatch, getState } = store;
    await action(dispatch, getState);
    expect(store.getActions()).toHaveLength(0);
  });

  it('should return expected action when local market is available in local storage', async () => {
    LocalStorage.set(CURRENT_LOCAL_MARKET, 'KAWW');
    const store = mockStore(initialState);

    const action = Actions.fetchLocalMarketContent();
    const { dispatch, getState } = store;
    await action(dispatch, getState);

    expect(store.getActions()).toHaveLength(1);
  });
});

describe('FETCH_WEATHER_ALERTS', () => {
  beforeEach(() => {
    request.mockReset();
  });

  it('should throw and return error', async () => {
    Store.dispatch(setPageData(pageData));
    fetchGraphql.mockImplementationOnce(() => Promise.reject(new Error('error')));
    try {
      const action = Actions.fetchWeatherAlerts();
      const mockDispatch = jest.fn().mockImplementation(() => new Promise((resolve) => {
        resolve({ value: { data: 'test' } });
      }));
      await action(mockDispatch);
    } catch (err) {
      expect(err).toEqual(Error('Weather Alert Service Error: fetchWeatherAlerts rejected: error'));
    }
  });

  it('should return correct action type', async () => {
    const getWeatherAlertsHeadlines = {
      alerts: [{
        areaId: 'CAZ035',
        detailKey: 'bdeff10b-3f98-3e67-959a-e3041a7c3f47',
        severity: 'Moderate',
      },
      {
        areaId: 'TAZ035',
        detailKey: 'cdeff10b-3f98-3e67-959a-e3041a7c3f47',
        severity: 'Extreme',
      },
      ],
      totalCount: 2,
    };
    fetchGraphql.mockImplementationOnce(async () => ({
      getWeatherAlertsHeadlines,
    }));
    Store.dispatch(setPageData(pageData));
    const areaIds = [1, 2, 3];
    const action = Actions.fetchWeatherAlerts(areaIds);
    const mockDispatch = jest.fn().mockImplementation(() => new Promise((resolve) => {
      resolve({ value: { data: 'test' } });
    }));
    await action(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: SET_WEATHER_ALERTS,
      local: localMarket,
      weatherAlerts: {
        extremeAlert: getWeatherAlertsHeadlines.alerts[1],
        totalCount: getWeatherAlertsHeadlines.alerts.length,
        unreadWeatherAlerts: getWeatherAlertsHeadlines.alerts,
      },
    });
  });

  it('should return empty type action', async () => {
    Store.dispatch(setPageData(pageData));
    Store.dispatch({ type: SET_WEATHER_ALERTS, local: localMarket, weatherAlerts: {} });
    const action = fetchWeatherAlerts();
    expect(action).toEqual({ type: types.EMPTY_TYPE });
  });
});

describe('UPDATE_UNREAD_WEATHER_ALERTS', () => {
  it('should return correct action type', () => {
    Store.dispatch(setPageData(pageData));
    expect(Actions.updateUnreadAlerts([]))
      .toEqual({
        local: localMarket,
        type: types.UPDATE_UNREAD_WEATHER_ALERTS,
        unreadWeatherAlerts: [],
      });
  });

  it('should save alerts to local Storage', () => {
    const alerts = [
      { detailKey: 'bdeff10b-3f98-3e67-959a-e3041a7c3f47' },
      { detailKey: '246dd8e7-4945-34c2-b81e-fd63436887ee' },
    ];
    const weatherAlerts = { unreadWeatherAlerts: alerts };
    Store.dispatch(setPageData(pageData));
    Store.dispatch({ type: SET_WEATHER_ALERTS, local: localMarket, weatherAlerts });
    Actions.updateUnreadAlerts(alerts);
    const { readWeatherAlertsIds } = LocalStorage.getObject(`${localMarket}_${READ_WEATHER_ALERTS_IDS}`);
    expect(readWeatherAlertsIds)
      .toEqual([
        'bdeff10b-3f98-3e67-959a-e3041a7c3f47',
        '246dd8e7-4945-34c2-b81e-fd63436887ee',
      ]);
  });
});
