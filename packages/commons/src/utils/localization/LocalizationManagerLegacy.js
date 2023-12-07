import * as languages from './languages';
// eslint-disable-next-line import/no-cycle
import { exists, getKey } from '../helpers';
import commonEnglishData from './en.json';
import commonSpanishData from './es.json';

/**
 * Manages the localization settings
 * @deprecated replaced with {@link @univision/fe-utilities/localization} library
 */
export class LocalizationManager {
  /**
   * Constructor
   */
  constructor() {
    this.translations = {};
    this.translations[languages.ES] = commonSpanishData;
    this.translations[languages.EN] = commonEnglishData;
    this.supportedLanguages = Object.keys(this.translations);
  }

  /**
   * extend the default language data
   * @returns {Object}
   */
  extend({ spanishData, englishData }) {
    this.translations[languages.ES] = { ...this.translations[languages.ES], ...spanishData };
    this.translations[languages.EN] = { ...this.translations[languages.EN], ...englishData };

    return this;
  }

  /**
   * set the language to be used
   * @param {string} language the language (es|en)
   */
  setLanguage(language) {
    if (this.supportedLanguages.indexOf(language) > -1) {
      this.language = language;
    }
  }

  /**
   * Returns the current language
   * @returns {string}
   */
  getCurrentLanguage() {
    if (!exists(this.language)) {
      this.language = languages.ES;
    }

    return this.language;
  }

  /**
   * Translate a given key using the current language
   * @example localization.get(key, { locals: {object})
   * @example localization.get(key, { locals: {object}, fallback: {string} })
   * @param {string} key Text ID
   * @param {Object} options - get options
   * @returns {string}
   */
  get(key, options = {}) {
    const language = getKey(options, 'language', this.getCurrentLanguage());
    let transkey = this.translations[language][key];
    const { locals, fallback } = options;

    if (transkey && typeof locals === 'object') {
      transkey = transkey.replace(/{(\w+)}/g, (match, prop) => {
        const propValue = locals[prop];
        return typeof propValue !== 'undefined' && propValue !== null
          ? propValue
          : fallback || match;
      });
    }

    return transkey || fallback || key;
  }
}

export default new LocalizationManager();
