import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';

export default (data) => {
  let widgets = [];
  if (isValidArray(data.widgets)) {
    ({ widgets } = data);
  }
  const widget = {
    type: widgetTypes.DEPORTES_TV_GUIDE,
    settings: {},
  };
  return [].concat([widget], widgets);
};
