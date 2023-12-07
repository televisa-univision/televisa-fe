/**
 * @module helpers/date/getTimeAgoFormatter
 */

const l10nsStrings = {
  es: {
    prefixAgo: () => 'hace',
    prefixFromNow: () => 'dentro de',
    suffixAgo: '',
    suffixFromNow: '',
    seconds: 'menos de un minuto',
    minute: 'un minuto',
    minutes: 'unos %d minutos',
    hour: 'una hora',
    hours: '%d horas',
    day: 'un día',
    days: '%d días',
    month: 'un mes',
    months: '%d meses',
    year: 'un año',
    years: '%d años',
  },
  en: {
    prefixAgo: null,
    prefixFromNow: null,
    suffixAgo: 'ago',
    suffixFromNow: 'from now',
    seconds: 'less than a minute',
    minute: 'about a minute',
    minutes: '%d minutes',
    hour: 'about an hour',
    hours: 'about %d hours',
    day: 'a day',
    days: '%d days',
    month: 'about a month',
    months: '%d months',
    year: 'about a year',
    years: '%d years',
    wordSeparator: ' ',
  },
  pt: {
    prefixAgo: () => 'há',
    prefixFromNow: () => 'dentro de',
    suffixAgo: '',
    suffixFromNow: '',
    seconds: 'menos de um minuto',
    minute: 'um minuto',
    minutes: '%d minutos',
    hour: 'uma hora',
    hours: '%d horas',
    day: 'um dia',
    days: '%d dias',
    month: 'um mês',
    months: '%d meses',
    year: 'um ano',
    years: '%d anos',
    wordSeparator: ' ',
  },
};

/**
 * Take a string or a function that takes number of days and returns a string
 * and provide a uniform API to create string parts
 * @private
 * @param {number} value - to format the number from it
 * @param {number} distanceMillis - milliseconds distance/diff
 * @param {number[]} numbers - number to perform format
 * @returns {string}
 */
function normalizeFn (
  value,
  distanceMillis,
) {
  return stringOrFn => (
    typeof stringOrFn === 'function'
      ? stringOrFn(value, distanceMillis).replace(/%d/g, String(value))
      : stringOrFn.replace(/%d/g, String(value)));
}

/**
 * Build formatter agnostic but compatible with React time/ago
 * @private
 * @param {Object} strings - l10n strings language
 * @returns {Function} - formatter function that takes four arguments:
 * value : An integer value, already rounded off
 * unit : A string representing the unit in english. This could be one of:
 * 'second'
 * 'minute'
 * 'hour'
 * 'day'
 * 'week'
 * 'month'
 * 'year'
 * suffix : A string. This can be one of
 * 'ago'
 * 'from now'
 * epochMiliseconds: The result of a custom date.
 * nextFormatter: A function from react-timeago
 * now: The result of Date.now() or the result of a custom now date
 */
function buildFormatter(strings) {
  return function formatter(
    value,
    unit,
    suffix,
    epochMiliseconds,
    _nextFormmate,
    now = () => Date.now(),
  ) {
    const current = now();
    let newValue = value;
    let newUnit = unit;
    // convert weeks to days if strings don't handle weeks
    if (newUnit === 'week' && !strings.week && !strings.weeks) {
      const days = Math.round(
        Math.abs(epochMiliseconds - current) / (1000 * 60 * 60 * 24),
      );
      newValue = days;
      newUnit = 'day';
    }

    // create a normalize function for given value
    const normalize = normalizeFn(
      newValue,
      current - epochMiliseconds,
    );

    // The eventual return value stored in an array so that the wordSeparator can be used
    const dateString = [];

    // handle prefixes
    if (suffix === 'ago' && strings.prefixAgo) {
      dateString.push(normalize(strings.prefixAgo));
    }
    if (suffix === 'from now' && strings.prefixFromNow) {
      dateString.push(normalize(strings.prefixFromNow));
    }
    // Handle Main number and unit
    const isPlural = newValue > 1;
    if (isPlural) {
      const stringFn = strings[`${newUnit}s`] || strings[newUnit] || `%d ${newUnit}`;
      dateString.push(normalize(stringFn));
    } else {
      const stringFn = strings[newUnit] || strings[`${newUnit}s`] || `%d ${newUnit}`;
      dateString.push(normalize(stringFn));
    }
    // Handle Suffixes
    if (suffix === 'ago' && strings.suffixAgo) {
      dateString.push(normalize(strings.suffixAgo));
    }
    if (suffix === 'from now' && strings.suffixFromNow) {
      dateString.push(normalize(strings.suffixFromNow));
    }
    // join the array into a string and return it
    const wordSeparator = typeof strings.wordSeparator === 'string' ? strings.wordSeparator : ' ';
    return dateString.join(wordSeparator);
  };
}

/**
 * Get the correct language time ago component formatter
 * @private
 * @param {string} lang - current language
 * @returns {Object} time ago formatter with corresponding language
 */
function getTimeAgoStrings(lang) {
  return l10nsStrings[lang] || l10nsStrings.en;
}

/**
 * Return the formatter with the corresponding language
 * @public
 * @param {string} lang - current language
 * @returns {Function} - compatible with react time ago component
 */
export default function getTimeAgoFormatter(lang) {
  const strings = getTimeAgoStrings(lang);
  return buildFormatter(strings);
}
