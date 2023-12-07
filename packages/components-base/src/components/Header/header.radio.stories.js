import React, { Fragment } from 'react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';

import themes from '@univision/fe-commons/dist/utils/themes/themes.json';
import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import NavDataProvider from './NavDataProvider';
import Styles from './Header.stories.scss';
import Header from '.';

const Stories = storiesOf('Layout/Header/radio', module);

const sections = [{
  uri: '/musica/uforia-music/radio',
  name: 'Radio Home',
  pageCategory: pageCategories.RADIO,
  device: 'desktop',
  theme: themes.themes.white,
  variant: 'dark',
  showWhiteLogo: true,
},
{
  uri: '/san-antonio/krom',
  name: 'Radio Stations',
  pageCategory: pageCategories.RADIO,
  device: 'desktop',
  theme: themes.themes.emerald,
  variant: 'dark',
  showWhiteLogo: true,
}];

sections.forEach(({
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
          Store.dispatch(setPageData({
            pageCategory: null,
            device,
            data,
            theme,
          }));
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
