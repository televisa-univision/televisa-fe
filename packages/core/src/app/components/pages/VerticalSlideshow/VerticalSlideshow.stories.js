import React from 'react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import VerticalSlideshow from './VerticalSlideshow';

const Stories = storiesOf('Vertical Slideshows', module);

const slideshows = [
  {
    uri: '/deportes/futbol/candidatos-para-el-tri-tecnicos-mundialistas-que-estan-sin-equipo-en-la-actualidad-fotos',
    name: 'Default desktop',
    device: 'desktop',
  },
  {
    uri: '/deportes/futbol/candidatos-para-el-tri-tecnicos-mundialistas-que-estan-sin-equipo-en-la-actualidad-fotos',
    name: 'Default mobile',
    device: 'mobile',
  },
];

slideshows.forEach(({
  uri,
  name,
  device,
}) => Stories.add(name, () => (
  <ApiProvider
    url={`https://fe.integration.y.univision.com${uri}`}
    store={Store}
    env="performance"
    render={(data) => {
      Store.dispatch(setPageData({ device }));
      return (
        <VerticalSlideshow page={data} />
      );
    }}
  />
)));
