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

const Stories = storiesOf('Layout/Header/Shows/Content', module);

const shows = [
  {
    uri: '/shows/al-punto/al-punto-entrevista-con-carlos-gutierrez-ex-ministro-de-comercio',
    name: 'Al punto - Article - Desktop',
  },
  {
    uri: '/shows/al-punto/al-punto-con-jorge-ramos-10-de-marzo-2019-video',
    name: 'Al punto - Video - Desktop',
  },
  {
    uri: '/shows/al-punto/felicidades-jorge-ramos-asi-has-cambiado-en-tus-30-anos-en-univision-fotos',
    name: 'Al punto - Slideshow - Desktop',
  },
];

shows.forEach(({
  uri,
  name,
  pageCategory = pageCategories.SHOW,
  device = 'desktop',
}) => Stories.add(name, () => (
  <ApiProvider
    url={`https://uat2.x.univision.com${uri}`}
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
                <Header
                  pageData={data}
                  pageCategory={pageCategory}
                />
              </div>
            </Fragment>
          );
        }}
      />
    )}
  />
)));
