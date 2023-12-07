import React from 'react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import { storiesOf } from '@storybook/react';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import HorizontalSlideshow from '.';

const Stories = storiesOf('Horizontal Slideshow', module);
const store = configureStore();
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
    store={store}
    render={(data) => {
      store.dispatch(setPageData({ device: 'desktop' }));
      return (
        <HorizontalSlideshow page={data} />
      );
    }}
  />
)));
