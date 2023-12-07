import React from 'react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import HorizontalSlideshow from './HorizontalSlideshow';

const Stories = storiesOf('Horizontal Slideshow', module);

const slideshows = [{
  uri: '/deportes/futbol/liga-mx/mundialito-mx-los-20-paises-que-tienen-extranjeros-representantes-en-el-apertura-2017-fotos',
  name: 'Horizontal Slideshow',
}];

slideshows.forEach(({
  uri,
  name,
}) => Stories.add(name, () => (
  <ApiProvider
    url={`https://univision.com${uri}`}
    store={Store}
    render={(data) => {
      Store.dispatch(setPageData({ device: 'desktop' }));
      return (
        <HorizontalSlideshow page={data} />
      );
    }}
  />
)));
