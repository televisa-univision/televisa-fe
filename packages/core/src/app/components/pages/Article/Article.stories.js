import React from 'react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Article from './Article';

const Stories = storiesOf('Article', module);

const articles = [{
  uri: '/test/article-with-lead-slideshow',
  name: 'Article with lead slideshow',
}, {
  uri: '/noticias/univision-contigo/una-estudiante-latina-fue-aceptada-en-11-facultades-de-medicina',
  name: 'Article with lead video',
}, {
  uri: '/noticias/educacion-publica/lideramos-con-el-ejemplo-la-directora-de-una-exitosa-escuela-bilingue-sobre-los-retos-de-ser-una-lider-latina-en-la-educacion',
  name: 'Article with lead image',
}, {
  uri: '/deportes/futbol/liga-mx/lobos-buap-se-mantendra-en-primera-division',
  name: 'Article with infinite scroll',
}, {
  uri: '/delicioso/cenas-delicioso/pozole-verde',
  name: 'Article type: Recipe',
}];

articles.forEach(({
  uri,
  name,
}) => Stories.add(name, () => (
  <ApiProvider
    url={`https://performance.univision.com${uri}`}
    store={Store}
    render={(data) => {
      Store.dispatch(setPageData({ data }));
      return (
        <Article page={data} />
      );
    }}
  />
)));
