import React, { Fragment } from 'react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import {
  GALAVISION,
  UNIMAS,
} from '@univision/fe-commons/dist/constants/pageCategories';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';

import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import NavDataProvider from './NavDataProvider';
import Styles from './Header.stories.scss';
import Header from '.';

const Stories = storiesOf('Layout/Header/networks', module);

const networks = [{
  uri: '/networks/galavision',
  name: 'Galavisión',
  pageCategory: GALAVISION,
  device: 'desktop',
},
{
  uri: '/unimas',
  name: 'UniMás',
  pageCategory: UNIMAS,
  device: 'desktop',
}];

networks.forEach(({
  uri,
  name,
  pageCategory,
  device = 'mobile',
  theme,
  variant,
  showWhiteLogo,
}) => Stories.add(name, () => (
  <ApiProvider
    url={`https://univision.com${uri}`}
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
                  theme={theme}
                  variant={variant}
                  showWhiteLogo={showWhiteLogo}
                />
              </div>
            </Fragment>
          );
        }}
      />
    )}
  />
)));
