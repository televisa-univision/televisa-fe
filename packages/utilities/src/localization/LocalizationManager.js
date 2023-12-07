/**
 * @module localization
 */

import * as languages from './languages';
import commonEnglishData from './common/en.json';
import commonSpanishData from './common/es.json';
import commonPortugueseData from './common/pt.json';

/**
 * Manages the localization for UVN
 */
class LocalizationManager {
  /**
   * Initialize translations per language
   * @constructor
   */
  constructor() {
    this.translations = {};
    this.translations[languages.ES] = commonSpanishData;
    this.translations[languages.EN] = commonEnglishData;
    this.translations[languages.PT] = commonPortugueseData;
    this.supportedLanguages = Object.keys(this.translations);
  }

  /**
   * extend the default language data
   * @returns {Object}
   */
  extend({ spanishData, englishData, portugueseData }) {
    this.translations[languages.ES] = { ...this.translations[languages.ES], ...spanishData };
    this.translations[languages.EN] = { ...this.translations[languages.EN], ...englishData };
    this.translations[languages.PT] = { ...this.translations[languages.PT], ...portugueseData };

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
    if (!this.language) {
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
    const language = options?.language || this.getCurrentLanguage();
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

export default LocalizationManager;
