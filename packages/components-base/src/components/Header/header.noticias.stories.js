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

const Stories = storiesOf('Layout/Header/noticias', module);

const noticias = [{
  uri: '/noticias/politica/primer-debate-presidencial-estados-unidos-2020-bernie-sanders-joe-biden-bill-de-blasio-beto-orourke-elizabeth-warren-cory-booker-julian-castro-john-delaney-tulsi-gabbard-jay-inslee-amy-klobuchar-tim-ryan-michael-bennet-kamala-harris-pete-buttigieg-kirsten-gillibrand-marianne-williamson-john-hickenlooper-eric-swalwell-y-andrew-yang-miércoles-y-jueves-26-y-27-de-junio-2019',
  name: 'BrandedHeader - Elecciones 2020',
  pageCategory: pageCategories.ELECCIONES_2020,
  device: 'desktop',
}, {
  uri: '/noticias',
  name: 'BrandedHeader - Noticias',
  pageCategory: pageCategories.NEWS,
  device: 'desktop',
}, {
  uri: '/noticias/educacion',
  name: 'SectionTitle, with Subnav (light variant)',
  pageCategory: pageCategories.NEWS,
  device: 'desktop',
}, {
  uri: '/noticias/educacion',
  name: 'SectionTitle, no subnav (light variant)',
  pageCategory: pageCategories.NEWS,
  type: 'article',
  device: 'desktop',
},
{
  uri: '/noticias/documentales',
  name: 'Documentales Section',
  pageCategory: pageCategories.DOCUMENTALES,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/documentales-univision/violacion-de-un-sueno-fuerza-laboral-invisible-i-video',
  name: 'Documentales Content Page',
  pageCategory: pageCategories.DOCUMENTALES,
  device: 'mobile',
},
{
  uri: '/noticias/politica/accion-ejecutiva',
  name: 'Acción Ejecutiva Section',
  pageCategory: pageCategories.ACCION_EJECUTIVA,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/amexica',
  name: 'Amexica Section',
  pageCategory: pageCategories.AMEXICA,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/amexica/un-dia-en-la-vida-de-un-coyote-que-cruza-migrantes-de-mexico-a-eeuu-de-forma-ilegal',
  name: 'Amexica Content Page',
  pageCategory: pageCategories.AMEXICA,
  device: 'mobile',
},
{
  uri: '/noticias/mexico',
  name: 'México Section',
  pageCategory: pageCategories.MEXICO,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/citylab-latino',
  name: 'Citylab Section',
  pageCategory: pageCategories.CITYLAB,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/detector-de-mentiras',
  name: 'Detector de Mentiras Section',
  pageCategory: pageCategories.DETECTOR_MENTIRAS,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/inmigracion',
  name: 'Inmigracion Section',
  pageCategory: pageCategories.INMIGRACION,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/el-reporte-del-odio',
  name: 'El Reporte del Odio Section',
  pageCategory: pageCategories.REPORTE_ODIO,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/medio-ambiente',
  name: 'Planeta Section',
  pageCategory: pageCategories.PLANETA,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/salud',
  name: 'Salud Section',
  pageCategory: pageCategories.NOTICIAS,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/salud/salud-para-todos',
  name: 'Salud para Todos Section',
  pageCategory: pageCategories.NEWS,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/adultos-mayores',
  name: 'Adultos Mayores Section',
  pageCategory: pageCategories.NEWS,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/salud-es-vida',
  name: 'Salud es Vida Section',
  pageCategory: pageCategories.NEWS,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/salud-y-mujer',
  name: 'Salud y Mujer Section',
  pageCategory: pageCategories.NEWS,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/reto-28',
  name: 'Reto 28',
  pageCategory: pageCategories.NEWS,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/desarrollar-el-cerebro',
  name: 'VROOM',
  pageCategory: pageCategories.NEWS,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/univision-news',
  name: 'Univision News Section',
  pageCategory: pageCategories.UNIVISION_NEWS,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/tag/health',
  name: 'Univision News Tag Section',
  pageCategory: pageCategories.UNIVISION_NEWS,
  type: 'tagnode',
  device: 'mobile',
},
{
  uri: '/noticias/elecciones-mexico-2018',
  name: 'Elecciones México 2018 Section',
  pageCategory: pageCategories.ELECCIONES_MEXICO_2018,
  type: 'section',
  device: 'mobile',
},
{
  uri: '/noticias/politica/elecciones-en-eeuu-2022',
  name: 'Elecciones en EEUU 2022',
  pageCategory: pageCategories.ELECCIONES_2022,
  type: 'section',
  device: 'desktop',
},
{
  uri: '/noticias/documentales',
  name: 'With whiteLogo & dark variant',
  pageCategory: pageCategories.DOCUMENTALES,
  type: 'section',
  device: 'mobile',
  theme: themes.themes.white,
  variant: 'dark',
  showWhiteLogo: true,
}];

noticias.forEach(({
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
