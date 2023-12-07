// eslint-disable-next-line import/no-cycle
import globalWidgets from './globalWidgets';
// eslint-disable-next-line import/no-cycle
import radioCoreWidgets from './radioCoreWidgets';
// eslint-disable-next-line import/no-cycle
import radioWidgets from './radioWidgets';
// eslint-disable-next-line import/no-cycle
import entertainmentWidgets from './entertainmentWidgets';
// eslint-disable-next-line import/no-cycle
import miscWidgets from './miscWidgets';
// eslint-disable-next-line import/no-cycle
import sportsWidgets from './sportsWidgets';
// eslint-disable-next-line import/no-cycle
import localMarketsWidgets from './localMarketsWidgets';

/**
 * Set a hint about the modules need for the SSR
 * @param {Object} widgets Widgets mapping
 * @param {string|Array} module Module name
 */
export function setSSRModuleHint(widgets, module) {
  Object
    .keys(widgets)
    .forEach((widget) => {
      // eslint-disable-next-line no-param-reassign
      widgets[widget].modules = Array.isArray(module) ? module : [module];
    });
}

/**
 * Mapping to import widgets. Please, set one of the following webpackChunkName
 * (or add a new one if you need to):
 *
 * - "globalWidgets": Widgets meant to be used globally.
 * - "radioCoreWidgets": Widgets meant to be used on most radio sections.
 * - "radioWidgets": Widgets meant to be used on some radio sections.
 * - "entertainmentWidgets": Widgets meant to be used on entertainment sections.
 * - "localMarketsWidgets": Widgets meant to be used on local sections.
 * - "miscWidgets": Miscellaneous widgets, try to not use this.
 */
const widgetMapping = {
  ...globalWidgets,
  ...radioCoreWidgets,
  ...radioWidgets,
  ...entertainmentWidgets,
  ...miscWidgets,
  ...sportsWidgets,
  ...localMarketsWidgets,
};

export default widgetMapping;
