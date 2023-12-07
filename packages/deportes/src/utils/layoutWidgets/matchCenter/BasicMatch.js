import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import * as adTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import widgetDefinitions, { getContentWidgets, attachAdType } from './soccerMatchWidgetDefinitions';

export default (data) => {
  const widgets = [];
  const widgetSettings = widgetDefinitions(data);
  const hasMatchId = isValidValue(data?.matchId);
  if (widgetSettings) {
    const contentWidgets = getContentWidgets(data);
    widgets.push(widgetSettings[widgetTypes.DEPORTES_GRID_SOCCER_MATCH_OPENING]);
    widgets.push(
      widgetSettings.TopAdvertisement,
      contentWidgets[widgetTypes.CAROUSEL_WIDGET]
    );
    if (hasMatchId) {
      widgets.push(
        attachAdType(
          widgetSettings[widgetTypes.DEPORTES_GRID_SOCCER_STANDINGS],
          adTypes.MID_AD_NO_FLEX
        ),
      );
    }
    widgets.push(
      contentWidgets[widgetTypes.LIST_WIDGET]
    );
  }
  return widgets;
};
