import { PLACEHOLDER } from '@univision/fe-commons/dist/constants/weather';

export default (options) => {
  const localDate = new Date();
  const {
    disableHourly,
    disableDaily,
    disableNumber,
  } = options || {};

  const dailyValues = [
    {
      localeTime: '2019-09-23T10:00:00',
      icon: 30,
      precipChance: 10,
      precipType: 'rain',
      phrase: 'Parcialmente nublado',
      minTempF: 65,
      maxTempF: 79,
    },
    {
      localeTime: '2019-09-24T10:00:00',
      icon: 32,
      precipChance: 10,
      precipType: 'rain',
      phrase: 'Soleado',
      minTempF: 68,
      maxTempF: 78,
    },
    {
      localeTime: '2019-09-25T10:00:00',
      icon: 34,
      precipChance: 10,
      precipType: 'rain',
      phrase: 'Mayormente soleado',
      minTempF: 67,
      maxTempF: 81,
    },
    {
      localeTime: '2019-09-26T10:00:00',
      icon: 30,
      precipChance: 20,
      precipType: 'rain',
      phrase: 'Parcialmente nublado',
      minTempF: 66,
      maxTempF: 74,
    },
    {
      localeTime: '2019-09-27T10:00:00',
      icon: 39,
      precipChance: 40,
      precipType: 'rain',
      phrase: 'Chubascos matinales',
      minTempF: 64,
      maxTempF: 71,
    },
    {
      localeTime: '2019-09-28T10:00:00',
      icon: 30,
      precipChance: 20,
      precipType: 'rain',
      phrase: 'Parcialmente nublado',
      minTempF: 60,
      maxTempF: 68,
    },
    {
      localeTime: '2019-09-29T10:00:00',
      icon: 34,
      precipChance: 20,
      precipType: 'rain',
      phrase: 'Mayormente soleado',
      minTempF: 59,
      maxTempF: 69,
    },
    {
      localeTime: '2019-09-30T10:00:00',
      icon: 32,
      precipChance: 0,
      precipType: 'rain',
      phrase: 'Soleado',
      minTempF: 58,
      maxTempF: 70,
    },
    {
      localeTime: '2019-10-01T10:00:00',
      icon: 32,
      precipChance: 0,
      precipType: 'rain',
      phrase: 'Soleado',
      minTempF: 61,
      maxTempF: 77,
    },
    {
      localeTime: '2019-10-02T10:00:00',
      icon: 32,
      precipChance: 0,
      precipType: 'rain',
      phrase: 'Soleado',
      minTempF: 63,
      maxTempF: 79,
    },
  ];

  return {
    tempF: 72,
    icon: 33,
    phrase: 'Despejado',
    maxTempF: PLACEHOLDER,
    minTempF: 67,
    humidity: 72,
    windDirection: 'SO',
    windSpeedMph: 6,
    precipChance: 10,
    precipType: 'rain',
    forecasts: {
      hourly: [...Array(25)].map((item, index) => {
        if (disableHourly) return 'test';

        if (index === 0) {
          return {
            localeTime: null,
            tempF: !disableNumber ? 72 : 'foo',
            icon: 33,
          };
        }

        localDate.setMinutes(0);
        const newDate = localDate.setHours(localDate.getHours() + 1);
        const newDate2 = new Date(newDate).toUTCString();

        return {
          localeTime: newDate2,
          tempF: Math.floor(Math.random() * Math.floor(90)) + 10,
          icon: Math.floor(Math.random() * Math.floor(40)),
        };
      }),
      daily: [...(disableDaily ? [undefined] : dailyValues)],
    },
  };
};
