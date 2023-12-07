import React from 'react';
import { storiesOf } from '@storybook/react';

import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import NavDataProvider from '../../NavDataProvider';

import ShowHeader from '.';
import Styles from './ShowHeader.stories.scss';

const Stories = storiesOf('Layout/Header/Shows/ShowHeader', module);

const headers = [
  { uri: '/shows/al-punto', name: 'Show - Al punto', pageCategory: pageCategories.SHOW },
  { uri: '/shows/despierta-america', name: 'Show - DA', pageCategory: pageCategories.SHOW },
  { uri: '/novelas/por-amar-sin-ley', name: 'Novelas', pageCategory: pageCategories.NOVELA },
];

headers.forEach(({
  uri,
  name,
  pageCategory,
  device = 'desktop',
}) => Stories.add(name, () => (
  <ApiProvider
    url={`https://www.univision.com${uri}`}
    store={Store}
    render={data => (
      <NavDataProvider
        data={data}
        pageCategory={pageCategory}
        render={() => {
          Store.dispatch(setPageData({ pageCategory, device, data }));
          return (
            <div className={Styles.wrapper}>
              <div>
                <ShowHeader pageData={data} pageCategory={pageCategory} />
              </div>
            </div>
          );
        }}
      />
    )}
  />
)));
