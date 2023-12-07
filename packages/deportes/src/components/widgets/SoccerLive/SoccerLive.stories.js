import React from 'react';
import { storiesOf } from '@storybook/react';
import deportes from '@univision/fe-commons/dist/config/features/deportes';
import matchesExtractor from '@univision/shared-components/dist/extractors/matchesExtractor';
import soccerLiveEvents from '../../../utils/mocks/soccerLiveEvents.json';
import SoccerLive from '.';

import selectSoccerLiveEvenData from './SoccerLiveSelector';

/**
 * Generate an state with n events
 * @param {boolean} lessThanEight wheather or not show less then 8 items
 * @param {boolean} xtra if tudn xtra
 * @returns {Object}
 */
const createState = (lessThanEight, xtra) => {
  const { events } = matchesExtractor(soccerLiveEvents);
  const enrrichedEvents = events.map(event => ({ ...event, tudnXtra: xtra, channels: ['tv'] }));
  return {
    page: {
      data: {
        widgets: [
          {
            settings: {
              uid: 'soccer-live',
            },
            extraData: {
              events: lessThanEight ? enrrichedEvents.slice(2, 7) : enrrichedEvents,
              ready: true,
            },
          },
        ],
      },
    },
  };
};

const containerStyles = {
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingRight: '23px',
  paddingLeft: '23px',
  maxWidth: '1306px',
};

storiesOf('Widgets/SoccerLive', module)
  .addDecorator((story) => {
    deportes.isTudn = () => (false);
    return (
      <div style={containerStyles}>
        {story()}
      </div>
    );
  })
  .add('Not ready', () => {
    return (
      <SoccerLive
        eventGroups={[]}
        getAllEvents={() => {}}
        ready={false}
      />
    );
  })
  .add('No events', () => {
    return (
      <SoccerLive
        events={[]}
        getAllEvents={() => {}}
        date={new Date()}
        ready
      />
    );
  })
  .add('mixed events more than eight items', () => {
    const state = createState(false, false);
    const events = selectSoccerLiveEvenData('soccer-live', state);

    return (
      <SoccerLive
        {...events}
        getAllEvents={() => {}}
        ready
      />
    );
  })
  .add('mixed events less than eight items', () => {
    const state = createState(true, false);
    const events = selectSoccerLiveEvenData('soccer-live', state);

    return (
      <SoccerLive
        {...events}
        getAllEvents={() => {}}
        ready
      />
    );
  });

storiesOf('Widgets/SoccerLive/tudn', module)
  .addDecorator((story) => {
    deportes.isTudn = () => (true);
    return (
      <div style={containerStyles}>
        {story()}
      </div>
    );
  })
  .add('Not ready', () => {
    return (
      <SoccerLive
        eventGroups={[]}
        ready={false}
        getAllEvents={() => {}}
      />
    );
  })
  .add('mixed events more than eight items', () => {
    const state = createState(false, false);
    const events = selectSoccerLiveEvenData('soccer-live', state);

    return (
      <SoccerLive
        {...events}
        getAllEvents={() => {}}
        ready
      />
    );
  })
  .add('mixed events less than eight items', () => {
    const state = createState(true, false);
    const events = selectSoccerLiveEvenData('soccer-live', state);

    return (
      <SoccerLive
        {...events}
        getAllEvents={() => {}}
        ready
      />
    );
  });

storiesOf('Widgets/SoccerLive/tudnXtra', module)
  .addDecorator((story) => {
    deportes.isTudn = () => (true);
    return (
      <div style={containerStyles}>
        {story()}
      </div>
    );
  })
  .add('Not ready', () => {
    return (
      <SoccerLive
        eventGroups={[]}
        ready={false}
        getAllEvents={() => {}}
      />
    );
  })
  .add('mixed events more than eight items', () => {
    const state = createState(false, true);
    const events = selectSoccerLiveEvenData('soccer-live', state);

    return (
      <SoccerLive
        {...events}
        getAllEvents={() => {}}
        ready
      />
    );
  })
  .add('mixed events less than eight items', () => {
    const state = createState(true, true);
    const events = selectSoccerLiveEvenData('soccer-live', state);

    return (
      <SoccerLive
        {...events}
        getAllEvents={() => {}}
        ready
      />
    );
  });
