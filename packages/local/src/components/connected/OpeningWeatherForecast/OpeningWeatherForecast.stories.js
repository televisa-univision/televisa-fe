import React from 'react';
import { storiesOf } from '@storybook/react';
import OpeningWidgetController from './OpeningWeatherForecast';

const extremeAlert = {
  areaName: 'Staten Island, NY',
  eventDescription: 'Huracán Dorian - Categoría 4',
};

storiesOf('Widgets/Weather/OpeningWidget', module)
  .add('w/ Celsius', () => (
    <div className="uvs-container">
      <OpeningWidgetController
        icon={36}
        tempF={86}
        isCelsius
        maxTempF={94}
        minTempF={79}
        humidity={20}
        precipChance={20}
        windDirection="SSE"
        windSpeedMph={10}
        phrase="Huracán"
        location="Nueva York"
        timeString="Miércoles 1:34 PM"
        precipType="rain"
        weatherAlerts={{}}
      />
    </div>
  ))
  .add('with extreme alert', () => (
    <div className="uvs-container">
      <OpeningWidgetController
        icon={36}
        tempF={86}
        isCelsius
        maxTempF={94}
        minTempF={79}
        humidity={20}
        precipChance={20}
        windDirection="SSE"
        windSpeedMph={10}
        phrase="Huracán"
        location="Nueva York"
        timeString="Miércoles 1:34 PM"
        precipType="rain"
        weatherAlerts={{
          totalCount: 1,
          extremeAlert,
        }}
      />
    </div>
  ))
  .add('with regular alert', () => (
    <div className="uvs-container">
      <OpeningWidgetController
        icon={36}
        tempF={86}
        isCelsius
        maxTempF={94}
        minTempF={79}
        humidity={20}
        precipChance={20}
        windDirection="SSE"
        windSpeedMph={10}
        phrase="Huracán"
        location="Nueva York"
        timeString="Miércoles 1:34 PM"
        precipType="rain"
        weatherAlerts={{
          totalCount: 4,
        }}
      />
    </div>
  ))
  .add('with no data', () => (
    <div className="uvs-container">
      <OpeningWidgetController />
    </div>
  ));
