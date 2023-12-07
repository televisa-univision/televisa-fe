import React from 'react';

import { storiesOf } from '@storybook/react';

import Styles from './NumericList.stories.scss';
import NumericList from '.';

const title = 'Artículos Relacionados';
const contents = [
  {
    uid: '0000015b-4618-d660-adff-e7dc22f60000',
    uri: 'http://www.univision.com',
    type: 'promo',
    versionCreated: null,
    title: 'Hadasha y Daniela',
    description: 'La capitana y su pequeña.',
    image: {},
    isFeatured: false,
  },
  {
    uid: '0000015b-4618-d660-adff-e7dcewexe000',
    uri: null,
    type: 'promo',
    versionCreated: null,
    title: 'Hadasha y Daniela Luján estuvieron espectaculares',
    description: 'La capitana y su pequeña gigante sorprendieron en la gran final con un número muy romántico que dejó a todos enamorados.',
    image: {},
    isFeatured: false,
    link: {
      uid: '0000015b-4618-d660-adff-e7dc22fe0000',
      uri: null,
      type: 'internallink',
      versionCreated: null,
      text: 'Hadasha y Daniela Luján estuvieron espectaculares',
      target: null,
    },
  },
];

storiesOf('Clickable/NumericList', module)
  .add('with title and content', () => (
    <div className={Styles.container}>
      <NumericList
        title={title}
        contents={contents}
      />
    </div>
  ));
