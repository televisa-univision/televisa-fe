import {
  ASK_THE_EXPERTS_HOME,
  ELECTIONS_2020_HOME,
  LOCALES_JOBS_HOME,
  CORONOVIRUS_HOME,
} from './links/home';
/**
 * Check if the current URI is part of Elections Section
 * @param {?string} uri URI to validate if is under election path
 * @returns {boolean}
 */
export function isPartOfElectionsSection(uri) {
  return new RegExp(`/local/([a-z-]*)${ELECTIONS_2020_HOME}`, 'gs').test(uri);
}

/**
 * Check if the current URI is part of locales jobs
 * @param {?string} uri URI to validate if its under job path
 * @returns {boolean}
 */
export function isPartOfLocalesJobs(uri) {
  return new RegExp(`/local/([a-z-]*)${LOCALES_JOBS_HOME}`, 'gs').test(uri);
}

/**
 * Check if the current URI is part of ask the experts
 * @param {?string} uri URI to validate if its under ask the experts path
 * @returns {boolean}
 */
export function isPartOfAskExperts(uri) {
  return new RegExp(`/local/([a-z-]*)${ASK_THE_EXPERTS_HOME}`, 'gs').test(uri);
}

/**
 * Check if the current URI is part of coronavirus nav
 * @param {?string} uri URI to validate if its under coronavirus path
 * @returns {boolean}
 */
export function isPartOfCoronavirusNav(uri) {
  return new RegExp(`/local/([a-z-]*)${CORONOVIRUS_HOME}`, 'gs').test(uri);
}

/**
 * Check if the current URI is part of destino 2024
 * @param {?string} uri URI to validate if its under destino 2024 path
 * @returns {boolean}
 */
export function isPartOfDestino2024(uri) {
  return new RegExp(/\/local\/(.*)\/destino-2024/, 'gs').test(uri);
}
