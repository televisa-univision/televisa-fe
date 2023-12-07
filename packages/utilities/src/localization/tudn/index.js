/**
 * @module localization/tudn
 */
import LocalizationManager from '../LocalizationManager';

import spanishData from './es.json';
import englishData from './en.json';

const localization = new LocalizationManager();

/**
 * Localization instance of {@link module:localization~LocalizationManager} with TUDN l10n
 * @augments LocalizationManager
 */
export default localization.extend({ spanishData, englishData });
