import React from 'react';
import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';

import CastingExplainer from '.';

const props = {
  showExplainer: true,
  showTime: 100,
  explainerTitle: 'Toca aquí para transmitir contenidos de video y en vivo desde tu TV',
  explainerCopy: 'Presionando el icono de casting transmite contenidos de video y en vivo desde tu dispositivo hacia tu TV',
  explainerIcon: 'cast',
};
storiesOf('Casting/CastingExplainer/Desktop', module)
  .addDecorator((story) => {
    return <div className="uvs-container">{story()}</div>;
  })
  .add('show explainer', () => (
    <CastingExplainer
      {...props}
    />
  ))
  .add('show slide from down explainer', () => (
    <CastingExplainer
      {...props}
      showExplainerUp={false}
    />
  ))
  .add('show with left arrow', () => (
    <CastingExplainer
      {...props}
      showArrowRight={false}
    />
  ));

storiesOf('Casting/CastingExplainer/Mobile', module)
  .addDecorator(withViewport('iphone8p'))
  .add('show slide from up explainer', () => (
    <CastingExplainer
      {...props}
    />
  ))
  .add('show slide from down explainer', () => (
    <CastingExplainer
      {...props}
      showExplainerUp={false}
    />
  ))
  .add('show with left arrow', () => (
    <CastingExplainer
      {...props}
      showArrowRight={false}
    />
  ));
