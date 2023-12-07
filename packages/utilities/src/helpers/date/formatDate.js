/**
 * @module helpers/date/formatDate
 */

/**
 * Helper for creating a formatted date string
 * @param {Date} date Date object instance
 * @param {string} lang Language (only supports English 'en' and Spanish 'es')
 * @param {string} timeZone Time zone to use, defaults to America/New_York. Will be ignored in
 *                          unsupported browsers.
 * @returns {string} formatted date by language (ie: '18 Jul | 06:29 EDT')
 */
export default function formatDate(date, lang = 'es', timeZone = 'America/New_York') {
  if (!(date instanceof Date)) {
    return '';
  }

  let month;
  let formattedDate;
  let convertedDate;
  let formattedTime;
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  };

  try {
    /**
     * We convert the actual date to the desired timezone, if the feature is not
     * supported or an invalid timezone is provided, it will error out
     * and will be catched with a non-converted version, this will create an inconsistency
     * and show us the wrong date so it should be considered an edge case.
    */
    convertedDate = new Date(date.toLocaleString('en-US', { timeZone }));
    formattedTime = date.toLocaleTimeString('en-US', {
      ...timeOptions,
      timeZone,
    });
  } catch (e) {
    /**
     * Will not convert to provided timezone, then an incorrect date will be shown.
    */
    convertedDate = date;
    formattedTime = date.toLocaleTimeString('en-US', timeOptions);
  }

  /**
   * nodeJS only supports en-US locale out of the box for datetime formatters
   * and the 'es' locale is not consistent with browsers, therefore messing up with
   * our desired result (i.e. Returning the August month translation like 'ago.' instead of 'Ago').
   * Pretty sure we can go and tinker with that, due to time constraints
   * and our desire to not rely on external libraries like moment, this is the simpler solution.
   */
  switch (lang) {
    case 'es':
      month = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      formattedDate = `${convertedDate.getDate()} ${month[convertedDate.getMonth()]} ${convertedDate.getFullYear()}`;
      break;

    case 'pt':
      month = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      formattedDate = `${convertedDate.getDate()} ${month[convertedDate.getMonth()]} ${convertedDate.getFullYear()}`;
      break;

    default:
      month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      formattedDate = `${month[convertedDate.getMonth()]} ${convertedDate.getDate()}, ${convertedDate.getFullYear()}`;
      break;
  }

  return `${formattedDate} – ${formattedTime}`;
}
