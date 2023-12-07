import getKey from '@univision/fe-utilities/helpers/object/getKey';
import * as widgetTypes from '../../../constants/widgetTypes';
import { TUDN_SITE } from '../../../constants/sites';
import adHelper from '../adHelper';

/**
 * Get widget position
 * @param {Object} widgets - Page widgets
 * @param {Object} widget - Grid widget data
 * @returns {number}
 */
export function getWidgetPosition(widgets, widget) {
  let position = -1;
  if (widgets.length) {
    position = widgets.findIndex(
      w => getKey(w, 'settings.uid') && (getKey(w, 'settings.uid') === getKey(widget, 'settings.uid'))
    );
    if (position >= 0) {
      return position + 1;
    }
  }
  return position;
}

/**
 * Verify is grid widget
 * @param {Object} widget - Widget to verify
 * @param {string} site - Site of the page
 * @returns {boolean}
 */
export function isGridWidget(widget, site) {
  const { type } = widget;
  switch (type) {
    case widgetTypes.GRID_WIDGET:
    case widgetTypes.LOCAL_OPENING:
      return true;
    default:
      // TODO: TUDN is using enhanced grid instead of hero
      if (site === TUDN_SITE && type === widgetTypes.HERO_WIDGET) {
        return true;
      }
  }
  return false;
}

/**
 * Helper to enable top ad insertion on grid based on widget position
 * only widget on top position
 * @param {Object} pageData - Page data
 * @param {number} position - Widget position
 * @param {Object} widget - Grid widget data
 * @returns {boolean}
 */
export function shouldInjectTopAd(pageData, position, widget) {
  const widgets = getKey(pageData, 'data.widgets');
  const { site, device } = pageData;
  if (device !== 'mobile' || !isGridWidget(widget, site)) {
    return false;
  }
  let widgetPosition = position;
  if (!widgetPosition) {
    // TODO: Remove after migrating to nextjs
    // Widgets key on legacy app is not consistent
    widgetPosition = getWidgetPosition(widgets, widget);
  }
  switch (widgetPosition) {
    case 1:
      return true;
    default:
      // lets check there is no other content widget before
      // we are checking until 3rd position due to other widgets
      // like: scorecell, countdown that doesn't have ads below
      if (widgetPosition < 4 && widgets && widgets.length) {
        const otherComtentWidgetBefore = widgets
          .slice(0, widgetPosition - 1)
          .find(w => adHelper.widgetsWithTopAds(w));
        return !otherComtentWidgetBefore;
      }
      return false;
  }
}
