/**
 * Constant for temperature units used in pronosticos.
 * @type {{F: string, C: string}}
 */
const TEMP_UNIT = {
  F: 'fahrenheit',
  C: 'celsius',
};

export const BANNER_FLAVOR_LANDING_PAGE = 'landingPage';
export const BANNER_FLAVOR_MODAL = 'modal';
export const BANNER_FLAVOR_OPENING_CARD = 'openingCard';
export const BANNER_RISK_HIGH = 'high';
export const BANNER_RISK_LOW = 'low';
export const CELSIUS = TEMP_UNIT.C;
export const FAHRENHEIT = TEMP_UNIT.F;
export const PLACEHOLDER = '--';
export const WEATHER_CLIENT_ID = '727838644';
export const READ_WEATHER_ALERTS_IDS = 'READ_WEATHER_ALERTS_IDS';
export const WEATHER_ALERT_SEVERITIES = {
  EXTREME: 'Extreme',
  SEVERE: 'Severe',
  MODERATE: 'Moderate',
};

export default TEMP_UNIT;
