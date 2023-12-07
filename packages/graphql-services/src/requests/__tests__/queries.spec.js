import serverMock from '../../../serviceMock/server';
import getFavoriteHoroscopes from '../queries/getFavoriteHoroscopes';
import getReactions from '../queries/getReactions';
import {
  getWeatherAlertsHeadlines,
  getWeatherAlertsWithDescription,
  getWeatherAlerts,
} from '../queries/weatherAlertQueries';
import getSpanishTranslation from '../queries/getSpanishTranslation';
import getForecastByTVStation from '../queries/getWeatherForecastByTVStation';
import getForecastByGeoCode from '../queries/getWeatherForecastByGeoCode';
import { getApploiUser } from '../queries/jobSearch';

const url = 'https://www.univision.com.url';

describe('user-service queries', () => {
  it('should getFavoriteHoroscopes works properly', async () => {
    expect.assertions(3);
    const res = await serverMock.query(
      getFavoriteHoroscopes,
      { requestingUrl: url },
    );

    const dailyHoroscopes = res.data.getUser.favorites.horoscopes;
    expect(dailyHoroscopes).toBeDefined();
    expect(dailyHoroscopes.signIds).toBeDefined();
    expect(dailyHoroscopes.daily).toBeDefined();
  });

  it('should getReactions works properly', async () => {
    expect.assertions(4);
    const res = await serverMock.query(
      getReactions,
      { contentIds: ['1', '2', '3'] },
    );

    expect(res.data.getReactions).toBeDefined();
    expect(res.data.getReactions.reactions[0].contentId).toBeDefined();
    expect(res.data.getReactions.reactions[0].userReaction).toBeDefined();
    expect(res.data.getReactions.reactions[0].counts).toBeDefined();
  });
});

describe('translation query', () => {
  it('should getSpanishTranslation works properly', async () => {
    const res = await serverMock.query(
      getSpanishTranslation,
      { text: 'have you seen that?' },
    );

    expect(res.data.getSpanishTranslation).toBeDefined();
  });
});

describe('Weather-service queries', () => {
  it('should getWeatherAlertsHeadlines works properly', async () => {
    const res = await serverMock.query(
      getWeatherAlertsHeadlines,
      { areaIds: ['FLZ202'] },
    );
    expect(res.data.getWeatherAlertsHeadlines).toBeDefined();
    expect(res.data.getWeatherAlertsHeadlines.alerts).toBeDefined();
    expect(res.data.getWeatherAlertsHeadlines.alerts[0].eventDescription).toBeDefined();
    expect(res.data.getWeatherAlertsHeadlines.alerts.length)
      .toEqual(res.data.getWeatherAlertsHeadlines.totalCount);
  });
  it('should getWeatherAlertsWithDescription works properly', async () => {
    const res = await serverMock.query(
      getWeatherAlertsWithDescription,
      { areaIds: ['FLZ202'] },
    );

    expect(res.data.getWeatherAlertsWithDescription).toBeDefined();
    expect(res.data.getWeatherAlertsWithDescription.alerts).toBeDefined();
    expect(res.data.getWeatherAlertsWithDescription.alerts[0].texts[0].description).toBeDefined();
    expect(res.data.getWeatherAlertsWithDescription.alerts.length)
      .toEqual(res.data.getWeatherAlertsWithDescription.totalCount);
  });
  it('should getWeatherAlerts works properly', async () => {
    const alertDetailKey = '7c872b0a-009b-3280-999a-19dd8105c6a2';
    const res = await serverMock.query(
      getWeatherAlerts,
      { alerts: [alertDetailKey] },
    );
    expect(res.data.getWeatherAlerts).toBeDefined();
    expect(res.data.getWeatherAlerts.length).toBeDefined();
    expect(res.data.getWeatherAlerts[0].detailKey).toEqual(alertDetailKey);
  });
  it('should get apploi user info', async () => {
    const res = await serverMock.query(getApploiUser, { token: 'foo' });
    expect(res.data.getApploiUser.email).toBeDefined();
    expect(res.data.getApploiUser.firstName).toBeDefined();
    expect(res.data.getApploiUser.lastName).toBeDefined();
    expect(res.data.getApploiUser.resumeFileName).toBeDefined();
  });
});

describe('weather forecast by tvstation queries', () => {
  it('should getForecastByTVStation works properly', async () => {
    expect.assertions(4);
    const res = await serverMock.query(
      getForecastByTVStation,
      { language: 'ES', tvStation: 'WXTV' },
    );

    expect(res.data.getWeatherForecastByTvStation).toBeDefined();
    expect(res.data.getWeatherForecastByTvStation.tempF).toBeDefined();
    expect(res.data.getWeatherForecastByTvStation.forecasts).toBeDefined();
    expect(res.data.getWeatherForecastByTvStation.forecasts.hourly).toBeDefined();
  });

  it('should getForecastByTVStation returns an error if variables was not provided', async () => {
    expect.assertions(2);
    const res = await serverMock.query(
      getForecastByTVStation,
      {},
    );

    expect(res.errors).toBeDefined();
    expect(res.errors).toHaveLength(2);
  });
});

describe('weather forecast by geocode queries', () => {
  it('should getForecastByGeoCode works properly', async () => {
    expect.assertions(4);
    const res = await serverMock.query(
      getForecastByGeoCode,
      { language: 'ES', geoCode: { latitude: 25.799, longitude: -80.27 } },
    );

    expect(res.data.getWeatherForecastByGeoCode).toBeDefined();
    expect(res.data.getWeatherForecastByGeoCode.tempF).toBeDefined();
    expect(res.data.getWeatherForecastByGeoCode.forecasts).toBeDefined();
    expect(res.data.getWeatherForecastByGeoCode.forecasts.hourly).toBeDefined();
  });

  it('should getForecastByGeoCode returns an error if variables was not provided', async () => {
    expect.assertions(2);
    const res = await serverMock.query(
      getForecastByGeoCode,
      {},
    );

    expect(res.errors).toBeDefined();
    expect(res.errors).toHaveLength(2);
  });
});
