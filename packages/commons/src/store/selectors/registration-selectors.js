/**
 * Get the current state for registration if is open selector from the Store
 * @param {Object} state store instance or state data
 * @returns {bool} the selector function that takes the redux state as an
 * argument
 */
export const registrationSelector = state => state?.registration?.isRegistrationOpen;
export default registrationSelector;
