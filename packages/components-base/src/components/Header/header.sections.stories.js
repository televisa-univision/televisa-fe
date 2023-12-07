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

const Stories = storiesOf('Layout/Header/sections', module);

const sections = [{
  uri: '/estilo-de-vida/los-sitios-de-estilo-de-vida-que-deberias-estar-viendo',
  name: 'Default Article',
  pageCategory: pageCategories.ESTILO_DE_VIDA,
  device: 'desktop',
}, {
  uri: '/noticias/educacion',
  name: 'Article color theming',
  pageCategory: pageCategories.ENTERTAINMENT,
  device: 'desktop',
}, {
  uri: '/deportes/futbol/bundesliga/el-bayern-perdio-con-el-mgladbach-y-cedio-terreno-en-el-liderato-de-la-bundesliga-fotos',
  name: 'Deportes without section related',
  pageCategory: pageCategories.SPORTS,
  device: 'desktop',
}, {
  uri: '/deportes/ufc',
  name: 'Deportes with white logo',
  pageCategory: pageCategories.SPORTS,
  device: 'desktop',
},
{
  uri: '/entretenimiento/exclusiva-el-hijo-de-ariadne-diaz-ya-recibe-instrucciones-en-los-foros-donde-trabaja-su-mama',
  name: 'Vertical Slideshow without section related',
  pageCategory: pageCategories.ENTERTAINMENT,
  device: 'desktop',
},
{
  uri: '/noticias/trending/el-vuelo-que-regreso-a-la-por-un-pasajero-de-mas-y-otras-6-extranas-razones-por-las-que-los-aviones-han-dado-la-vuelta-fotos',
  name: 'Default Horizonal Slideshow',
  pageCategory: pageCategories.NEWS,
  device: 'desktop',
  theme: themes.themes.white,
  variant: 'dark',
  showWhiteLogo: true,
},
{
  uri: '/noticias/asi-fue-el-intento-por-romper-el-record-guinness-saltando-la-cuerda-en-brasil-video',
  name: 'Default Video',
  pageCategory: pageCategories.NEWS,
  device: 'desktop',
  theme: themes.themes.white,
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
