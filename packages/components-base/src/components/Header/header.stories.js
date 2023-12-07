import React, { Fragment } from 'react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';

import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import NavDataProvider from './NavDataProvider';
import Styles from './Header.stories.scss';
import Header from '.';

const Stories = storiesOf('Layout/Header/music', module);

const music = [{ uri: '/', name: 'Generic vertical (light)' },
  { uri: '/los-angeles/klve', name: 'Radio vertical (dark)', pageCategory: pageCategories.RADIO },
  { uri: '/musica/uforia-music/radio', name: 'Radio vertical - default logo (dark)', pageCategory: pageCategories.RADIO },
  { uri: '/radio/podcasts', name: 'Musica vertical - podcasts (dark)', pageCategory: pageCategories.MUSIC },
  { uri: '/musica', name: 'Musica vertical (dark)', pageCategory: pageCategories.MUSIC }];

const headers = [
  { uri: '/', name: 'univision.com', pageCategory: pageCategories.UNIVISION },
  { uri: '/deportes', name: 'Deportes homepage', pageCategory: pageCategories.SPORTS },
  { uri: '/los-angeles/klve', name: 'Radio Station', pageCategory: pageCategories.RADIO },
  { uri: '/atlanta/wuvg', name: 'TV Station', pageCategory: pageCategories.TV },
  { uri: '/shows/mira-quien-baila', name: 'Shows', pageCategory: pageCategories.SHOW },
  { uri: '/shows/nuestra-belleza-latina', name: 'Shows - nbl', pageCategory: pageCategories.SHOW },
  { uri: '/musica/turno7', name: 'Show - turno7', pageCategory: pageCategories.TURNO7 },
  { uri: '/shows/al-punto', name: 'Show - Al punto', pageCategory: pageCategories.SHOW },
  { uri: '/shows/despierta-america', name: 'Show - DA', pageCategory: pageCategories.SHOW },
  { uri: '/novelas/por-amar-sin-ley', name: 'Novelas', pageCategory: pageCategories.NOVELA },
  { uri: '/especiales/premios-juventud', name: 'Especiales', pageCategory: pageCategories.ESPECIALES },
  { uri: '/famosos', name: 'Custom Show', pageCategory: pageCategories.ENTERTAINMENT },
  { uri: '/local', name: 'tu ciudad', pageCategory: pageCategories.NEWS },
  { uri: '/local/miami-wltv', name: 'local - mia', pageCategory: pageCategories.TV },
];

music.forEach(({
  uri,
  name,
  pageCategory,
  device = 'mobile',
}) => Stories.add(name, () => (
  <ApiProvider
    url={`https://www.univision.com${uri}`}
    store={Store}
    render={data => (
      // load the header using dynamic import
      <NavDataProvider
        data={data}
        pageCategory={pageCategory}
        render={() => {
          Store.dispatch(setPageData({ pageCategory, device, data }));
          return (
            <Fragment>
              <BKPIndicator />
              <div className={Styles.wrapper}>
                <Header pageData={data} pageCategory={pageCategory} />
              </div>
            </Fragment>
          );
        }}
      />
    )}
  />
)));

headers.forEach(({
  uri,
  name,
  pageCategory,
  device = 'mobile',
}) => storiesOf('Headers/mobile', module).add(name, () => (
  <ApiProvider
    url={`https://www.univision.com${uri}`}
    store={Store}
    render={data => (
      // load the header using dynamic import
      <NavDataProvider
        data={data}
        pageCategory={pageCategory}
        render={() => {
          Store.dispatch(setPageData({ pageCategory, device, data }));
          return (
            <Fragment>
              <BKPIndicator />
              <div className={Styles.wrapper}>
                <Header pageData={data} pageCategory={pageCategory} />
              </div>
            </Fragment>
          );
        }}
      />
    )}
  />
)));

headers.forEach(({
  uri,
  name,
  pageCategory,
  device = 'desktop',
}) => storiesOf('Headers/Desktop', module).add(name, () => (
  <ApiProvider
    url={`https://www.univision.com${uri}`}
    store={Store}
    render={data => (
    // load the header using dynamic import
      <NavDataProvider
        data={data}
        pageCategory={pageCategory}
        render={() => {
          Store.dispatch(setPageData({ pageCategory, device, data }));
          return (
            <Fragment>
              <BKPIndicator />
              <div className={Styles.wrapper}>
                <Header pageData={data} pageCategory={pageCategory} />
              </div>
            </Fragment>
          );
        }}
      />
    )}
  />
)));
