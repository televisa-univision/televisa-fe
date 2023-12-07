const defaultData = {
  modal: {
    cardType: 'alertas cta with badge',
    cardTitle: 'alertas del tiempo',
    widgetPos: 0,
    widgetTitle: 'topnav-weather modal',
    widgetType: 'topnav-weather modal',
  },
  tiempo: {
    cardType: 'alertas cta',
    cardTitle: 'alertas del tiempo',
    widgetPos: 0,
    widgetTitle: 'tiempo section header',
    widgetType: 'header',
  },
  widget: {
    cardType: 'alertas cta with badge',
    cardTitle: 'alertas del tiempo',
    widgetTitle: 'ultimas noticias',
    widgetType: 'locales - opening widget',
  },
};

export const MODAL = 'modal';
export const TIEMPO = 'tiempo';
export const WIDGET = 'widget';

/**
 * Function to get the tracking object
 * @param {string} type - type of weather banner
 * @param {string} id - id for the card with the WeatherBanner
 * @param {number} widgetPos - position of the widget with card with the Weather banner
 * @param {Object} extremeAlert - extreme alert
 * @returns {Object} trackObject
 */
function buildTrackObject({
  type,
  id,
  widgetPos,
  extremeAlert,
}) {
  const extraData = {};
  if (widgetPos) extraData.widgetPos = widgetPos;
  if (id) extraData.cardId = id;
  if ((type === MODAL || type === TIEMPO) && extremeAlert) {
    extraData.cardId = extremeAlert.detailKey;
  }

  return {
    ...extraData,
    ...defaultData[type],
  };
}

export default buildTrackObject;
