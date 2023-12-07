import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import Store from '@univision/fe-commons/dist/store/store';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';

import HeaderConfProvider from './storybook/HeaderConfProvider';
import Navigation from '.';
import Styles from './Navigation.stories.styles';

const StoryWrapper = styled.div`${Styles.wrapper}`;

const stories = storiesOf('Navigation/Verticals', module);
const storiesTudn = storiesOf('Navigation/Tudn', module);

/**
 * Get Navigation component
 * @param {Object} props - nav props
 * @returns {JSX}
 */
const getStoryNavigation = (props) => {
  return (
    <StoryWrapper>
      <HeaderConfProvider {...props}>
        <Navigation />
      </HeaderConfProvider>
    </StoryWrapper>
  );
};

const navs = [
  {
    name: 'Homepage',
    uri: '/',
    device: 'desktop',
    pageCategory: pageCategories.UNIVISION,
  },
  {
    name: 'Noticias - Homepage',
    uri: '/noticias',
    device: 'desktop',
    pageCategory: pageCategories.NEWS,
  },
  {
    name: 'Noticias - Reto 28',
    uri: '/noticias',
    device: 'desktop',
    pageCategory: pageCategories.RETO28,
  },
  {
    name: 'Famosos - Homepage',
    uri: '/famosos',
    device: 'desktop',
    pageCategory: pageCategories.FAMOSOS,
  },
  {
    name: 'Locales - Chicago',
    uri: '/local/chicago-wgbo',
    device: 'desktop',
    pageCategory: pageCategories.TV,
  },
  {
    name: 'Locales - Los Angeles',
    uri: '/local/los-angeles-kmex',
    device: 'desktop',
    pageCategory: pageCategories.TV,
  },
  {
    name: 'Horoscope - Homepage',
    uri: '/horoscopos',
    device: 'desktop',
    pageCategory: pageCategories.HOROSCOPE,
  },
  {
    name: 'Delicioso - Homepage',
    uri: '/delicioso',
    device: 'desktop',
    pageCategory: pageCategories.GASTRONOMY,
  },
  {
    name: 'Shows - Homepage',
    uri: '/shows',
    device: 'desktop',
    pageCategory: pageCategories.SHOW,
  },
  {
    name: 'Shows - Novelas',
    uri: '/shows/novelas',
    device: 'desktop',
    pageCategory: pageCategories.SHOW,
  },
  {
    name: 'Uforia',
    uri: '/radio',
    device: 'desktop',
    pageCategory: pageCategories.RADIO,
  },
];

const navsTudn = [
  {
    name: 'Homepage',
    uri: '/',
    device: 'desktop',
    pageCategory: pageCategories.SPORTS,
  },
  {
    name: 'Futbol - Home',
    uri: '/futbol',
    device: 'desktop',
    pageCategory: pageCategories.SOCCER_FUTBOL,
  },
  {
    name: 'Article',
    uri: '/futbol/liga-mx/kuri-calma-los-animos-en-veracruz',
    device: 'desktop',
    pageCategory: pageCategories.SOCCER_FUTBOL,
  },
  {
    name: 'TUDNXtra',
    uri: '/tudnxtra',
    device: 'desktop',
    pageCategory: pageCategories.TUDNXTRA,
  },
  {
    name: 'TUDN Opinion',
    uri: '/opinion-deportes',
    device: 'desktop',
    pageCategory: pageCategories.OPINION,
  },
  {
    name: 'TUDN Entrevistas',
    uri: '/entrevistas',
    device: 'desktop',
    pageCategory: pageCategories.ENTREVISTAS,
  },
  {
    name: 'Premios UVN Deportes',
    uri: '/premios-univision-deportes',
    device: 'desktop',
    pageCategory: pageCategories.PREMIOS_UVN_DPTS,
  },
  {
    name: 'NFL SuperBowl',
    uri: '/nfl/super-bowl',
    device: 'desktop',
    pageCategory: pageCategories.NFL_SUPER_BOWL,
  },
  {
    name: 'Soccer Match',
    uri: '/futbol/mls/atlanta-united-fc-vs-new-england-revolution-mls-2019-10-19',
    device: 'desktop',
    pageCategory: pageCategories.SOCCER_MATCH_PRE,
  },
  {
    name: 'Generic Team - Home',
    uri: '/futbol/jamaica',
    device: 'desktop',
    pageCategory: pageCategories.SOCCER_TEAM,
  },
  {
    name: 'Generic League - Home',
    uri: '/futbol/ascenso-mx',
    device: 'desktop',
    pageCategory: pageCategories.SOCCER_LEAGUE,
  },
  {
    name: 'Liga MX - Home',
    uri: '/futbol/liga-mx',
    device: 'desktop',
    pageCategory: pageCategories.SOCCER_LEAGUE,
  },
  {
    name: 'MLS - Home',
    uri: '/futbol/mls',
    device: 'desktop',
    pageCategory: pageCategories.SOCCER_LEAGUE,
  },
  {
    name: 'UEFA - Home',
    uri: '/futbol/uefa-champions-league',
    device: 'desktop',
    pageCategory: pageCategories.SOCCER_LEAGUE,
  },
  {
    name: 'UEFA Europa - Home',
    uri: '/futbol/uefa-europa-league',
    device: 'desktop',
    pageCategory: pageCategories.SOCCER_LEAGUE,
  },
  {
    name: 'UEFA Nations - Home',
    uri: '/futbol/uefa-nations-league',
    device: 'desktop',
    pageCategory: pageCategories.SOCCER_LEAGUE,
  },
];

navs.forEach((nav) => {
  const {
    device, name, pageCategory, uri,
  } = nav;

  stories.add(name, () => (
    <ApiProvider
      url={`https://www.univision.com${uri}`}
      store={Store}
      render={(data) => {
        const providerProps = {
          data,
          device,
          pageCategory,
          isTudn: true,
        };
        return getStoryNavigation(providerProps);
      }}
    />
  ));
});

navsTudn.forEach((nav) => {
  const {
    device, name, pageCategory, uri,
  } = nav;

  storiesTudn.add(name, () => (
    <ApiProvider
      url={`https://www.tudn.com${uri}`}
      store={Store}
      render={(data) => {
        const providerProps = {
          data,
          device,
          pageCategory,
          isTudn: true,
        };
        return getStoryNavigation(providerProps);
      }}
    />
  ));
});
