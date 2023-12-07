import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';

export default (data = {}) => {
  let widgets = [];
  if (isValidArray(data.widgets)) {
    ({ widgets } = data);
  }
  const widget = {
    type: widgetTypes.SEARCH_WIDGET_BODY,
    settings: {
      uid: 1,
      typeFilters: data.typeFilters,
      dateFilters: data.dateFilters,
    },
  };
  return [widget, ...widgets];
};
