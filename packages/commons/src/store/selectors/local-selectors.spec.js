import deepFreeze from 'deep-freeze';
import {
  localSelector,
  currentMarketSelector,
  currentMarketUriSelector,
  localMarketSelector,
  localWeatherForecastSelector,
  isCelsius,
  jobSearchSelector,
  marketByLocationSelector,
  currentMarketByLocationSelector,
  contentByLocationSelector,
  unreadWeatherAlertsSelector,
  weatherAlertsSelector,
  hasWeatherForecast,
  hasWeatherAlerts,
  weatherForecastSelector,
  tuCiudadLocalMarketSelector,
} from './local-selectors';

const weatherAlerts = {
  extremeAlert: {
    areaId: 'CAZ035',
    areaName: 'Santa Barbara County Central Coast',
    detailKey: 'bdeff10b-3f98-3e67-959a-e3041a7c3f47',
    severity: 'Moderate',
  },
  totalCount: 10,
  unreadWeatherAlerts: [
    {
      areaId: 'CAZ035',
      areaName: 'Santa Barbara County Central Coast',
      detailKey: 'bdeff10b-3f98-3e67-959a-e3041a7c3f47',
      severity: 'Moderate',
    },
    {
      areaId: 'TAZ035',
      areaName: 'Santa Barbara County Central Coast',
      detailKey: 'bdeff10b-3f98-3e67-959a-e3041a7c3f47',
      severity: 'Extreme',
    },
  ],
};
const weatherForecast = {};

const state = {
  local: {
    isCelsius: true,
    WLII: {
      foo: 'bar',
      weatherAlerts,
      weatherForecast,
    },
    marketByLocation: {
      currentMarket: 'KAKW',
      tuCiudadLocalMarket: 'KAKW',
      contents: {
        KAKW: ['test'],
      },
    },
  },
  page: {
    data: {
      tvStation: {
        call: 'WLII',
        uri: 'https://univision.com',
        forecast: {
          maxTemp: 40,
        },
      },
    },
  },
};

deepFreeze(state);

describe('local-selectors', () => {
  describe('localSelector', () => {
    it('should return the corresponding values', () => {
      expect(localSelector(state)).toEqual(state.local);
    });
  });
  describe('currentMarketSelector', () => {
    it('should return the corresponding values', () => {
      expect(currentMarketSelector(state)).toEqual('WLII');
    });
  });
  describe('currentMarketUriSelector', () => {
    it('should return the corresponding values', () => {
      expect(currentMarketUriSelector(state)).toEqual('https://univision.com');
    });
  });
  describe('localMarketSelector', () => {
    it('should return the corresponding values', () => {
      expect(localMarketSelector(state)).toEqual({
        foo: 'bar',
        weatherAlerts,
        weatherForecast,
      });
    });
  });
  describe('isCelsius', () => {
    it('should return the corresponding values', () => {
      expect(isCelsius(state)).toBeTruthy();
    });
  });
  describe('marketByLocationSelector', () => {
    it('should return the corresponding values', () => {
      expect(marketByLocationSelector(state)).toEqual(state.local.marketByLocation);
    });
  });
  describe('currentMarketByLocationSelector', () => {
    it('should return the corresponding values', () => {
      expect(currentMarketByLocationSelector(state)).toEqual('KAKW');
    });
  });
  describe('tuCiudadLocalMarketSelector', () => {
    it('should return the corresponding values', () => {
      expect(tuCiudadLocalMarketSelector(state)).toEqual('KAKW');
    });
  });
  describe('contentByLocationSelector', () => {
    it('should return the corresponding values', () => {
      expect(contentByLocationSelector(state)).toEqual(['test']);
    });
  });
  describe('localWeatherForecastSelector', () => {
    it('should return the corresponding values', () => {
      expect(localWeatherForecastSelector(state)).toEqual(state.local.WLII.weatherForecast);
    });

    it('should return empty object', () => {
      expect(localWeatherForecastSelector({})).toEqual({});
    });
  });
  describe('weatherAlertsSelector', () => {
    it('should return the corresponding values', () => {
      expect(weatherAlertsSelector(state)).toEqual(state.local.WLII.weatherAlerts);
    });
  });
  describe('unreadWeatherAlertsSelector', () => {
    it('should return the corresponding values', () => {
      expect(unreadWeatherAlertsSelector(state))
        .toEqual(state.local.WLII.weatherAlerts.unreadWeatherAlerts);
    });
    it('should return an empty array', () => {
      const storeState = {
        local: {
          WLII: {
            weatherAlerts: null,
          },
        },
      };
      expect(unreadWeatherAlertsSelector(storeState)).toEqual([]);
    });
  });
  describe('hasWeatherForecast', () => {
    it('should return the corresponding values', () => {
      expect(hasWeatherForecast(state)).toBeTruthy();
    });

    it('should return false when not finding weatherForecast', () => {
      expect(hasWeatherForecast({})).toBeFalsy();
    });
  });
  describe('hasWeatherAlerts', () => {
    it('should return the corresponding values', () => {
      expect(hasWeatherAlerts(state)).toBeTruthy();
    });

    it('should return false when not finding weatherForecast', () => {
      expect(hasWeatherAlerts({})).toBeFalsy();
    });
  });
  describe('jobSearchSelector', () => {
    expect(jobSearchSelector(state)).toEqual([]);
    const newState = {
      ...state,
      local: {
        ...state.local,
        jobs: [1, 2],
      },
    };
    expect(jobSearchSelector(newState)).toEqual([1, 2]);
  });

  describe('weatherForecastSelector', () => {
    it('should return the corresponding weatherForecastSelector values', () => {
      expect(weatherForecastSelector({})).toEqual({});
      expect(weatherForecastSelector(state)).toEqual({ maxTemp: 40 });
    });

    it('should return the corresponding values from store isntance', () => {
      const store = {
        getState: jest.fn(() => state),
      };
      weatherForecastSelector(store);
      expect(store.getState).toHaveBeenCalled();
    });

    it('should return the corresponding values from local state', () => {
      const store = {
        local: {
          isCelsius: true,
          WLII: {
            foo: 'bar',
            weatherAlerts,
            weatherForecast: {
              maxTemp: 40,
            },
          },
          marketByLocation: {
            currentMarket: 'WLII',
            contents: {
              KAKW: ['test'],
            },
          },
        },
        page: {
          data: {
            tvStation: {
              call: 'WLII',
              uri: 'https://univision.com',
              forecast: {
                maxTemp: 40,
              },
            },
          },
        },
      };
      expect(weatherForecastSelector(store)).toEqual({ maxTemp: 40 });
    });
  });
});
