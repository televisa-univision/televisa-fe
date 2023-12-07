import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

export default (data) => {
  let widgets = [];
  if (isValidArray(data.widgets)) {
    ({ widgets } = data);
  }
  const widget = [{
    type: widgetTypes.DEPORTES_LEAGUES_TOURNAMENTS,
    settings: {
      styleType: 'bar',
      showLeagues: true,
    },
  },
  {
    type: 'Advertisement',
    settings: {
      type: AdTypes.TOP_AD,
      isLazyLoaded: false,
      hasBg: true,
      trackingValue: '1',
    },
  },
  {
    type: widgetTypes.DEPORTES_LEAGUES_TOURNAMENTS,
    settings: {
      styleType: 'bar',
      showTournaments: true,
    },
  },
  {
    type: widgetTypes.DEPORTES_LEAGUES_TOURNAMENTS,
    settings: {
      styleType: 'bar',
      showConfederations: true,
    },
  }];
  return [].concat(widget, widgets);
};
