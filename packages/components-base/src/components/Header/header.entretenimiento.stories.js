import React, { Fragment } from 'react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';
import themes from '@univision/fe-commons/dist/utils/themes/themes.json';

import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Styles from './Header.stories.scss';
import Header from '.';
import NavDataProvider from './NavDataProvider';

const Stories = storiesOf('Layout/Header/entretenimiento', module);

const entretenimiento = [{
  uri: '/entretenimiento',
  name: 'BrandedHeader - Entretenimiento',
  pageCategory: pageCategories.ENTERTAINMENT,
  device: 'desktop',
},
{
  uri: '/entretenimiento/horoscopos/horoscopos-y-predicciones-niño-prodigio',
  name: 'Horoscope section',
  pageCategory: pageCategories.HOROSCOPE,
  device: 'desktop',
},
{
  uri: '/entretenimiento/horoscopo-chino/serpiente',
  name: 'Horoscope content page',
  pageCategory: pageCategories.HOROSCOPE,
  device: 'desktop',
},
{
  uri: '/estilo-de-vida',
  name: 'Estilo de Vida',
  pageCategory: pageCategories.ESTILO_DE_VIDA,
  device: 'desktop',
},
{
  uri: '/estilo-de-vida/el-secreto-de-jessica-cediel-para-el-cuerpo-ideal-video',
  name: 'Estilo de Vida content page',
  pageCategory: pageCategories.ESTILO_DE_VIDA,
  device: 'desktop',
},
{
  uri: '/temas/gastronomia',
  name: 'Header Gastronomía',
  pageCategory: pageCategories.GASTRONOMY,
  device: 'desktop',
},
{
  uri: '/entretenimiento/horoscopo-chino/serpiente',
  name: 'With whiteLogo & dark variant',
  pageCategory: pageCategories.HOROSCOPE,
  device: 'desktop',
  theme: themes.themes.white,
  variant: 'dark',
  showWhiteLogo: true,
},
{
  uri: '/famosos',
  name: 'Famosos',
  pageCategory: pageCategories.FAMOSOS,
  device: 'desktop',
}];

entretenimiento.forEach(({
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
