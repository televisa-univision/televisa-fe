import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import { action } from '@storybook/addon-actions';
import playByPlayExtractor from '@univision/shared-components/dist/extractors/playByPlayExtractor';
import playbyplay from '../../../utils/mocks/playbyplay.json';
import { image } from '../../../config/storyMocks';

import PlayByPlay from '.';
import PlayByPlayConnector from './PlayByPlayConnector';
import Styles from './PlayByPlayStory.scss';

const events = [
  {
    url: 'https://univision.com',
    image,
    time: "90'+3'",
    iconName: 'goal',
    title: 'goal',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    time: "78'",
    iconName: 'redCard',
    title: 'Targeta Roja',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    time: "70'",
    iconName: 'corner',
    title: 'Tiro de ezquina',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    time: "68'",
    iconName: 'yellowCard',
    title: 'Targeta Amarilla',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    url: 'https://univision.com',
    time: "50'",
    iconName: 'goal',
    title: 'goal',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    time: "35'",
    iconName: 'goal',
    title: 'goal',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    time: "32'",
    iconName: 'goal',
    title: 'goal',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    time: "21'",
    iconName: 'goal',
    title: 'goal',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
];

const moreEvents = [
  {
    time: "10'",
    iconName: 'redCard',
    title: 'Targeta Roja',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    time: "8'",
    iconName: 'corner',
    title: 'Tiro de ezquina',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    time: "5'",
    iconName: 'yellowCard',
    title: 'Targeta Amarilla',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
  {
    time: "1'",
    iconName: 'yellowCard',
    title: 'Targeta Amarilla',
    summary: 'Alonso Zamora (Puebla) ha sido amonestado con tarjeta amarilla por juego peligroso.',
  },
];

const title = {
  title: 'Comentarios',
  titleLink: {
    uri: 'http://www.univision.com',
    href: 'http://www.univision.com',
  },
};

const sportTheme = {
  primary: '#00A899',
  secondary: '#000000',
};

/**
 * Sample callback
 */
const callback = () => {
  action('Callback called!');
};

storiesOf('Widgets/PlayByPlay', module)
  .addDecorator((story) => {
    Store.dispatch(
      setPageData({
        requestParams: { tudn: 'false' },
      })
    );
    return <div className="uvs-container">{story()}</div>;
  })
  .add('default', () => <PlayByPlay events={events} title={title} />)
  .add('with show more button', () => (
    <PlayByPlay events={[...events, ...moreEvents]} title={title} />
  ))
  .add('with no events', () => <PlayByPlay title={title} />)
  .add('with video', () => <PlayByPlay title={title} events={events} />)
  .add('without video', () => {
    const noVideo = [].concat(events);
    noVideo.shift();
    return (
      <div className={Styles.wrapper}>
        <PlayByPlay title={title} events={noVideo} />
      </div>
    );
  })
  .add('with Connector', () => {
    const device = getDevice();
    const settings = {
      uid: '666',
      type: 'DeportesCardPlayByPlay',
      matchId: '983624',
    };
    Store.dispatch(
      setPageData({
        data: {
          widgets: [
            {
              extraData: {
                data: playByPlayExtractor({}),
              },
              settings: {
                uid: '666',
                type: 'DeportesCardPlayByPlay',
              },
              type: 'DeportesCardPlayByPlay',
            },
          ],
        },
        device,
        requestParams: { tudn: 'false' },
      })
    );

    const props = {
      settings,
    };

    return (
      <Provider store={Store} key="playbyplay-story">
        <PlayByPlayConnector {...props} />
      </Provider>
    );
  })
  .add('mock data with extractor', () => {
    const apiEvents = playByPlayExtractor(playbyplay);
    return <PlayByPlay title={title} events={apiEvents} theme={sportTheme} />;
  })
  .add('with theme', () => <PlayByPlay events={events} title={title} theme={sportTheme} />)
  .add('with setEvents defined', () => (
    <PlayByPlay events={events} title={title} getEvents={callback} />
  ));

storiesOf('Widgets/PlayByPlay/TUDN', module)
  .addDecorator((story) => {
    Store.dispatch(
      setPageData({
        requestParams: { tudn: 'true' },
      })
    );
    return <div className="uvs-container">{story()}</div>;
  })
  .add('default', () => <PlayByPlay events={events} title={title} />)
  .add('with show more button', () => (
    <PlayByPlay events={[...events, ...moreEvents]} title={title} />
  ))
  .add('with Connector', () => {
    const device = getDevice();
    const settings = {
      uid: '666',
      type: 'DeportesCardPlayByPlay',
      matchId: '983624',
    };
    Store.dispatch(
      setPageData({
        data: {
          widgets: [
            {
              extraData: {
                data: playByPlayExtractor({}),
              },
              settings: {
                uid: '666',
                type: 'DeportesCardPlayByPlay',
              },
              type: 'DeportesCardPlayByPlay',
            },
          ],
        },
        device,
      })
    );

    const props = {
      settings,
    };

    return (
      <Provider store={Store} key="playbyplay-story">
        <PlayByPlayConnector {...props} />
      </Provider>
    );
  })
  .add('mock data with extractor', () => {
    const apiEvents = playByPlayExtractor(playbyplay);
    return <PlayByPlay title={title} events={apiEvents} theme={sportTheme} />;
  })
  .add('with theme', () => <PlayByPlay events={events} title={title} theme={sportTheme} />)
  .add('with setEvents defined', () => (
    <PlayByPlay events={events} title={title} getEvents={callback} />
  ));
