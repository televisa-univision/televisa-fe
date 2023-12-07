import React from 'react';

import { storiesOf } from '@storybook/react';
import VerticalSlideshow from '.';
import mockData from './__mocks__/mockSlideshowData.json';

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
  name,
  device,
}) => Stories.add(name, () => (
  <VerticalSlideshow pageData={{ ...mockData, device }} />
)));
