const query = `
query getForecastByTVStation($language:WeatherForecastLanguage!, $tvStation:TvStation!) {
  getWeatherForecastByTvStation(language: $language, tvStation: $tvStation ) {
    tempF
    icon
    phrase
    maxTempF
    minTempF
    humidity
    windDirection
    windSpeedMph
    precipChance
    precipType
    forecasts {
      hourly {
        localeTime
        tempF
        icon
      }
      daily {
        localeTime
        icon
        precipChance
        precipType
        phrase
        minTempF
        maxTempF
      }
    }
  }
}
`;

export default query;
