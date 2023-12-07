import localization from '../../../../utils/localization';

export const NoticiasCardWeatherMaps = {
  title: localization.get('weatherMaps'),
  type: 'noticiascardweathermaps',
  promo_name: 'mapas_show',
  button_menu_promo_name: 'mapas_button_menu',
  options: [
    {
      name: 'radar_satelite_loop',
      promo_name: 'mapas_sateliteRadar',
      icon: 'satellite',
      label: localization.get('weatherOptionSatelite'),
      alt: localization.get('weatherOptionSateliteAlt'),
      format: 'gif',
    },
    {
      name: 'temperatura_ahora',
      promo_name: 'mapas_temp_actual',
      icon: 'temperature',
      label: localization.get('weatherOptionTemperature'),
      alt: localization.get('weatherOptionTemperatureAlt'),
      format: 'jpg',
    },
    {
      name: 'viento_ahora',
      promo_name: 'mapas_vientos',
      icon: 'wind',
      label: localization.get('weatherOptionWind'),
      alt: localization.get('weatherOptionWindAlt'),
      format: 'jpg',
    },
    {
      name: 'radar_alerta',
      promo_name: 'mapas_alerta_tiempo',
      icon: 'alarmOff',
      label: localization.get('weatherOptionTime'),
      alt: localization.get('weatherOptionTimeAlt'),
      format: 'jpg',
    },
    {
      name: 'proximas_horas',
      promo_name: 'mapas_pronostico_horas',
      icon: 'clockArrow',
      label: localization.get('weatherOptionForecastHour'),
      alt: localization.get('weatherOptionForecastHourAlt'),
      format: 'jpg',
    },
    {
      name: 'proximos_dias',
      promo_name: 'mapas_pronostico_dias',
      icon: 'calendar',
      label: localization.get('weatherOptionForecastDay'),
      alt: localization.get('weatherOptionForecastDayAlt'),
      format: 'jpg',
    },
  ],
};

export const NoticiasCardWeatherGraphics = {
  title: localization.get('weatherGraphics'),
  type: 'noticiascardweathergraphics',
  promo_name: 'graphics_show',
  button_menu_promo_name: 'graphics_button_menu',
  options: [
    {
      name: 'polen',
      promo_name: 'graphics_polen',
      icon: 'polen',
      label: localization.get('weatherOptionPolen'),
      alt: localization.get('weatherOptionPolenAlt'),
      format: 'jpg',
    },
    {
      name: 'indiceuv',
      promo_name: 'graphics_indiceUV',
      icon: 'uvIndex',
      label: localization.get('weatherOptionUvIndex'),
      alt: localization.get('weatherOptionUvIndexAlt'),
      format: 'jpg',
    },
    {
      name: 'alerta_cabello',
      promo_name: 'graphics_alterta_cabello',
      icon: 'hairAlert',
      label: localization.get('weatherOptionHairAlert'),
      alt: localization.get('weatherOptionHairAlertAlt'),
      format: 'jpg',
    },
  ],
};

export const NoticiasCardWeatherConditions = {
  title: localization.get('weatherConditions'),
  type: 'noticiascardweatherconditions',
  promo_name: 'condiciones_show',
  button_menu_promo_name: 'condiciones_button_menu',
  options: [
    {
      name: 'temperatura_agua',
      promo_name: 'condiciones_temperatura',
      icon: 'waterTemperature',
      label: localization.get('weatherOptionWaterTemperature'),
      alt: localization.get('weatherOptionWaterTemperatureAlt'),
      format: 'jpg',
    },
    {
      name: 'altura_oleaje',
      promo_name: 'condiciones_altura',
      icon: 'waveHeight',
      label: localization.get('weatherOptionWaveHeight'),
      alt: localization.get('weatherOptionWaveHeightAlt'),
      format: 'jpg',
    },
    {
      name: 'boya',
      promo_name: 'condiciones_boyas',
      icon: 'buoy',
      label: localization.get('weatherOptionOnTheCoast'),
      alt: localization.get('weatherOptionOnTheCoastAlt'),
      format: 'jpg',
    },
  ],
};

export const NoticiasCardTropicalWeatherConditions = {
  title: localization.get('weatherConditionsTropical'),
  type: 'noticiascardtropicalweatherconditions',
  promo_name: 'sistemas_show',
  button_menu_promo_name: 'sistemas_button_menu',
  options: [
    {
      name: 'golfo_mexico',
      promo_name: 'sistemas_atlantico',
      icon: 'atlantic',
      label: localization.get('weatherOptionAtlantic'),
      alt: localization.get('weatherOptionAtlanticAlt'),
      format: 'jpg',
    },
    {
      name: 'trayectoria',
      promo_name: 'sistemas_trayectoria',
      icon: 'trajectory',
      label: localization.get('weatherOptionWaveHeight'),
      alt: localization.get('weatherOptionWaveHeightAlt'),
      format: 'jpg',
    },
  ],
};

export const Pronosticos = {
  title: localization.get('forecast'),
  type: 'pronosticos',
  options: [],
};
