import entertainmentWidgets from './entertainmentWidgets';
import globalWidgets from './globalWidgets';
import radioWidgets from './radioWidgets';
import localMarketsWidgets from './localMarketsWidgets';
import showsWidgets from './showsWidgets';
import sportWidgets from './sportsWidgets';

/**
 * Mapping to import widgets. Please, set one of the following webpackChunkName
 * (or add a new one if you need to):
 *
 * - "globalWidgets": Widgets meant to be used globally.
 */
const widgetMapping = {
  ...entertainmentWidgets,
  ...globalWidgets,
  ...localMarketsWidgets,
  ...radioWidgets,
  ...showsWidgets,
  ...sportWidgets,
  ...localMarketsWidgets,
};

export default widgetMapping;
