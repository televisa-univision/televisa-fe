import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import * as adTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import widgetDefinitions, { getContentWidgets, attachAdType } from './soccerMatchWidgetDefinitions';

export default (data) => {
  const widgets = [];
  const widgetSettings = widgetDefinitions(data);
  if (widgetSettings) {
    const contentWidgets = getContentWidgets(data);
    widgets.push(
      widgetSettings[widgetTypes.DEPORTES_GRID_SOCCER_MATCH_OPENING],
      widgetSettings[widgetTypes.DEPORTES_MATCH_SUMMARY],
      widgetSettings.TopAdvertisement,
      attachAdType(
        widgetSettings.DeportesGridSoccerMatchStats,
        adTypes.MID_AD_NO_FLEX
      ),
      attachAdType(
        widgetSettings[widgetTypes.DEPORTES_MATCH_COMPARE_HEATMAP],
        adTypes.MID_AD_NO_FLEX
      ),
      contentWidgets[widgetTypes.CAROUSEL_WIDGET],
      attachAdType(
        widgetSettings.DeportesGridSoccerStandings,
        adTypes.MID_AD_NO_FLEX
      ),
      attachAdType(
        widgetSettings[widgetTypes.DEPORTES_CARD_PLAY_BY_PLAY],
        adTypes.MID_AD_NO_FLEX
      ),
      attachAdType(
        widgetSettings[widgetTypes.DEPORTES_MATCH_CENTER_LINEUP],
        adTypes.MID_AD_NO_FLEX
      ),
      contentWidgets[widgetTypes.LIST_WIDGET]
    );
  }
  return widgets;
};
