const query = `
query getForecastByGeoCode($language:WeatherForecastLanguage!, $geoCode:GeoCode!) {
  getWeatherForecastByGeoCode(language: $language, geoCode: $geoCode ) {
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
