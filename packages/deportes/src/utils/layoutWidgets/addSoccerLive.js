import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import soccerLiveSettings from '@univision/fe-commons/dist/config/data/tudn/soccerLiveSettings.json';

import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';

export default (data) => {
  const widgets = isValidArray(data.widgets) ? data.widgets : [];

  return [
    {
      type: widgetTypes.DEPORTES_SOCCER_LIVE,
      settings: {
        ...soccerLiveSettings.settings,
        uid: 'soccer-live-widget',
      },
    },
    ...widgets,
  ];
};
