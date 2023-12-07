/**
 * @module styled/mixins/darkModeWrapper
 */
import { BLACK } from '../constants';

/**
 * Sets the default paddings and background color for a dark mode wrapper in a widget
 * @param {boolean} isDark - dark mode flag
 * @returns {JSX}
 */
export default function darkModeWidgetWrapper({ isDark }) {
  if (!isDark) {
    return null;
  }

  return `
    background-color: ${BLACK};
    padding-bottom: 24px;
    padding-top: 24px;
  `;
}
