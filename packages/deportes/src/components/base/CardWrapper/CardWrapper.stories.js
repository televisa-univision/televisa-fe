import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ShowCard from '@univision/shared-components/dist/components/v2/ShowCard';
import TVSoccerCard from '@univision/shared-components/dist/components/v2/TVSoccerCard';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Styles from './CardWrapper.stories.scss';
import CardWrapper from '.';

const cardProps = {
  showTitle: 'El Gordo y la Flaca',
  showDescription: 'Dos presentadores que en forma amena y divertida relatan las novedades de las estrellas.',
  showImage: 'https://neul.tmsimg.com/assets/p374378_b_h13_ab.jpg',
  showLink: { href: 'https://www.univision.com/shows/el-gordo-y-la-flaca', target: '_blank' },
  isLive: false,
};

const matchProps = {
  leagueName: 'UEFA CHAMPIONS LEAGUE',
  leagueWeek: 'Jornada 10 de 15',
  teams: {
    home: {
      fullName: 'barcelona',
      abbreviatedName: 'bar',
      imageURI: 'https://cdn7.uvnimg.com/univision-media/image/upload/v1539096758/prod/sports/teams_logos/178.png',
      scoreValue: {
        score: 3,
        penalty: null,
      },
    },
    away: {
      fullName: 'dc united',
      abbreviatedName: 'dcu',
      imageURI: 'https://cdn7.uvnimg.com/univision-media/image/upload/v1/prod/sports/teams_logos/1326',
      scoreValue: {
        score: 3,
      },
    },
  },
  onPress: action('Clicked Soccer Card'),
  link: { href: 'https://www.univision.com/shows/el-gordo-y-la-flaca', target: '_blank' },
};

storiesOf('Base/CardWrapper', module)
  .addDecorator((story) => {
    let size = 'desktop';
    if (global.innerWidth <= 568) {
      size = 'mobile';
    }
    Store.dispatch(setPageData({ device: size }));
    return <div className="uvs-container">{story()}</div>;
  })
  .add('default', () => (
    <CardWrapper date="2018-01-29T21:00:00Z" onDigital onTV>
      Card Here!
    </CardWrapper>
  ))
  .add('with show card', () => (
    <CardWrapper
      date="2018-01-29T21:00:00Z"
      onDigital
      onTV
    >
      <ShowCard {...cardProps} />
    </CardWrapper>
  ))
  .add('with show card live', () => (
    <CardWrapper
      date="2018-01-29T21:00:00Z"
      onDigital
      onTV
      isLive
      progress={60}
    >
      <ShowCard {...cardProps} />
    </CardWrapper>
  ))
  .add('with soccer card', () => (
    <CardWrapper
      date="2018-01-29T21:00:00Z"
      onDigital
      onTV
    >
      <TVSoccerCard {...matchProps} className={Styles.match} />
    </CardWrapper>
  ))
  .add('with more cards', () => (
    <div>
      <CardWrapper
        date="2018-01-29T21:00:00Z"
        onTV
      >
        <ShowCard {...cardProps} />
      </CardWrapper>
      <CardWrapper
        date="2018-01-29T21:00:00Z"
        onDigital
        isLive
        progress={50}
      >
        <TVSoccerCard {...matchProps} className={Styles.match} />
      </CardWrapper>
      <CardWrapper
        date="2018-01-29T21:00:00Z"
        onDigital
        onTV
      >
        <ShowCard {...cardProps} />
      </CardWrapper>
    </div>
  ));
