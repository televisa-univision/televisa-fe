import { PLACEHOLDER } from '@univision/fe-commons/dist/constants/weather';
import { PODCAST_EPISODE } from '@univision/fe-commons/dist/constants/contentTypes.json';

import mockData from '../mocks/weatherMock';
import * as helpers from '.';

import mockedAlerts from './mockedAlerts.json';

/**
 * Get mock hourly forecast data. First forecast is in the past and is intended to be filtered out.
 * @returns {Array}
 */
const getMockHourlyForecasts = () => {
  const past = new Date();
  past.setDate(past.getDate() - 2);

  let isFirstForecast = true;
  return mockData.forecasts.hourly.map((forecast, index) => {
    if (forecast === null) return null;

    // return current conditions item as-is
    if (forecast.localeTime === null) return forecast;

    const future = new Date();
    future.setHours(future.getHours() + index);

    const date = isFirstForecast ? past : future;

    if (isFirstForecast) isFirstForecast = false;

    const hours = date.getHours();
    return {
      ...forecast,
      // format like 2019-09-11T17:00:00-05:00
      localeTime: `${date.toISOString().split('T')[0]}T${hours < 10 ? '0' : ''}${hours}:00:00-05:00`,
    };
  });
};

describe('getRadioStationLanguage', () => {
  it('returns language from brandable object', () => {
    const sourceStation = {
      uid: 'uid',
      radioStation: {
        primaryBroadcastLanguage: 'en',
      },
    };
    expect(helpers.getRadioStationLanguage(sourceStation)).toBe('en');
  });

  it('returns language from sourceStation object', () => {
    const sourceStation = {
      uid: 'uid',
      primaryBroadcastLanguage: 'en',
    };
    expect(helpers.getRadioStationLanguage(sourceStation)).toBe('en');
  });

  it('returns default language for undefined station', () => {
    expect(helpers.getRadioStationLanguage()).toBe('es');
  });
});

describe('getLanguage', () => {
  it('returns default language when data is undefined', () => {
    expect(helpers.getLanguage()).toBe('es');
  });
  it('returns language when radioStation is defined', () => {
    const language = helpers.getLanguage({
      radioStation: {
        primaryBroadcastLanguage: 'en',
      },
    });
    expect(language).toBe('en');
  });
});

describe('convertFahrenheitToCelsius', () => {
  it('should convert correctly when a valid number is send', () => {
    expect(helpers.convertFahrenheitToCelsius(50)).toEqual(10);
  });
  it('should return defaultValue as fallback when the value is not correct', () => {
    expect(helpers.convertFahrenheitToCelsius(null)).toEqual(PLACEHOLDER);
  });
});

describe('convertFahrenheitToCelsius', () => {
  it('should convert correctly when a valid number is send', () => {
    expect(helpers.convertFahrenheitToCelsius(50)).toEqual(10);
  });
  it('should return defaultValue as fallback when the value is not correct', () => {
    expect(helpers.convertFahrenheitToCelsius(null)).toEqual(PLACEHOLDER);
  });
});

describe('hourlyForecastExtractor', () => {
  it('should extract hourly values with limit', () => {
    expect(helpers.hourlyForecastExtractor({
      hourly: getMockHourlyForecasts(),
    }, 4)).toHaveLength(4);
  });
  it('should extract hourly values without limit', () => {
    expect(helpers.hourlyForecastExtractor({
      hourly: getMockHourlyForecasts(),
    })).toHaveLength(24);
  });
  it('should return null if the value is not a valid array', () => {
    const forecast = {
      hourly: {
        test: 'test',
      },
    };

    expect(helpers.hourlyForecastExtractor(forecast)).toBeNull();
  });
  it('should eliminate the object if the value is not a valid one', () => {
    const forecasts = {
      hourly: [null],
    };

    expect(helpers.hourlyForecastExtractor(forecasts))
      .toHaveLength(0);
  });
});

describe('dailyForecastExtractor', () => {
  it('should extract daily values with limit', () => {
    expect(helpers.dailyForecastExtractor(mockData.forecasts, 4)).toHaveLength(4);
  });
  it('should return null if the value is not a valid array', () => {
    const forecast = {
      daily: {
        test: 'test',
      },
    };
    expect(helpers.dailyForecastExtractor(forecast)).toBeNull();
  });
  it('should extract daily values without limit', () => {
    expect(helpers.dailyForecastExtractor(mockData.forecasts)).toHaveLength(11);
  });
  it('should return the precipMessage as precipChance', () => {
    const forecasts = {
      daily: [{
        precipType: null,
      }],
    };
    expect(helpers.dailyForecastExtractor(forecasts)[0].precipMessage)
      .toEqual('Probabilidad de precipitación');
  });
  it('should return the precipMessage as snowChance', () => {
    const forecasts = {
      daily: [{
        precipType: 'snow',
      }],
    };
    expect(helpers.dailyForecastExtractor(forecasts)[0].precipMessage)
      .toEqual('Probabilidad de nevada');
  });
  it('should return the precipMessage as precepChance abbreviated', () => {
    expect(helpers.precipMessage('precip', true))
      .toEqual('Prob. precipitación');
  });
  it('should return the precipMessage as snowChance abbreviated', () => {
    expect(helpers.precipMessage('snow', true))
      .toEqual('Prob. nevada');
  });
  it('should return the precipMessage as rainChance abbreviated', () => {
    expect(helpers.precipMessage('rain', true))
      .toEqual('Prob. lluvia');
  });
  it('should eliminate the object if the value is not a valid one', () => {
    const forecasts = {
      daily: [null],
    };

    expect(helpers.dailyForecastExtractor(forecasts))
      .toHaveLength(0);
  });
  it('should return date as null if it\'s not a valid date', () => {
    const forecasts = {
      daily: [{
        localeTime: 'dfdsfd',
      }],
    };

    expect(helpers.dailyForecastExtractor(forecasts)[0].date)
      .toBeNull();
  });
});

describe('populateDefaultStationUrl', () => {
  it('should populate a default url', () => {
    const sharedOptions = {
      a: {
        a1: 'test',
        url: 'https://www.test.com',
      },
      b: {},
    };
    expect(helpers.populateDefaultStationUrl(sharedOptions).b.url).toBe('https://www.univision.com/radio');
    expect(helpers.populateDefaultStationUrl({})).toEqual({});
  });
});

describe('getRadioStationProps', () => {
  it('should return a specific radio station', () => {
    expect(helpers.getRadioStationProps({ abacast: true })).toBeTruthy();
  });
});

describe('getRadioStationProps', () => {
  it('should return a specific radio station', () => {
    expect(helpers.getRadioStationProps({ abacast: true })).toBeTruthy();
  });
});

describe('isPodcastEpisode', () => {
  it('should return true if is a Podcast Episode', () => {
    expect(helpers.isPodcastEpisode('test')).toEqual(false);
  });
  it('should return false if is a Podcast Episode', () => {
    expect(helpers.isPodcastEpisode(PODCAST_EPISODE)).toEqual(true);
  });
});

describe('order alerts', () => {
  it('should order groups alphabetically', () => {
    const expectedResponse = [
      'Baker County',
      'Clay County',
      'Coastal Bay County',
      'Coastal Escambia County',
      'Coastal Franklin County',
      'Coastal Gulf County',
      'Coastal Okaloosa County',
      'Coastal Santa Rosa County',
      'Hamilton County',
      'Hillsborough County',
      'Nassau County',
      'South Walton County',
      'Suwannee County',
    ];
    const { alerts } = mockedAlerts;
    const formatterAlerts = helpers.formatWeatherAlerts(alerts);
    formatterAlerts.forEach((alert, index) => {
      expect(alert.county).toEqual(expectedResponse[index]);
    });
  });
  it('should order alerts by severity', () => {
    const expectedResponse = [
      'Baker County',
      'Clay County',
      'Coastal Bay County',
      'Coastal Escambia County',
      'Coastal Franklin County',
      'Coastal Gulf County',
      'Coastal Okaloosa County',
      'Coastal Santa Rosa County',
      'Hamilton County',
      'Hillsborough County',
      'Nassau County',
      'South Walton County',
      'Suwannee County',
    ];
    const { alerts } = mockedAlerts;
    const formatterAlerts = helpers.formatWeatherAlerts(alerts);
    formatterAlerts.forEach((alert, index) => {
      expect(alert.county).toEqual(expectedResponse[index]);
    });
  });
});
