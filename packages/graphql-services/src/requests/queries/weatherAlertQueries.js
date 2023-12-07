/**
 * graphQL query to get weather-alerts with only headlines info.
 */
export const getWeatherAlertsHeadlines = `
query getWeatherAlertsHeadlines($country: String, $areaIds: [String!]!, $language: WeatherAlertSearchLanguage, $ignoreSeverity: [WeatherAlertSeverity!], $limit: Int) {
  getWeatherAlertsHeadlines(country: $country, areaIds: $areaIds, language: $language, ignoreSeverity: $ignoreSeverity, limit: $limit) {
    totalCount
    alerts {
      areaId
      areaName
      eventDescription
      detailKey
      effectiveTimeLocal
      severity
      severityCode
    }
  }
}`;

/**
 * graphQL query to get weather-alerts data for particular alerts
 */
export const getWeatherAlerts = `
query getWeatherAlerts($alerts: [String!]!, $language: WeatherAlertSearchLanguage){
  getWeatherAlerts(alerts: $alerts, language: $language) {
    areaId
    areaName
    eventDescription
    detailKey
    effectiveTimeLocal
    effectiveTimeLocalTimeZone
    officeAdminDistrict
    officeAdminDistrictCode
    severity
    severityCode
    texts {
      description
    }
  }
}
`;

/**
 * graphQL query to get weather-alerts with description
 */
export const getWeatherAlertsWithDescription = `
query getWeatherAlertsWithDescription($country: String, $areaIds: [String!]!, $language: WeatherAlertSearchLanguage, $ignoreSeverity: [WeatherAlertSeverity!], $limit: Int) {
  getWeatherAlertsWithDescription(country: $country, areaIds: $areaIds, language: $language, ignoreSeverity: $ignoreSeverity, limit: $limit) {
    totalCount
    alerts {
      areaId
      areaName
      eventDescription
      detailKey
      issueTimeLocal
      issueTimeLocalTimeZone
      officeAdminDistrict
      officeAdminDistrictCode
      severity
      severityCode
      texts {
        description
      }
    }
  }
}`;
