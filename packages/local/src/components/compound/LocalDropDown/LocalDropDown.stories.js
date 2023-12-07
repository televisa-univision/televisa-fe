import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import LocalDropDown from '.';

const props = {
  name: 'Más',
  options: [
    {
      name: 'Ofertas de trabajo',
      link: 'http://univision.com',
    },
    {
      name: 'Pregunta al experto',
      link: 'http://univision.com',
    },
  ],
};

const moreOptions = {
  name: 'Ver Capítulo',
  options: [
    {
      name: 'Liga Mexicana de Futbol',
      link: 'http://univision.com',
    },
    {
      name: 'Especiales de verano',
      link: 'http://univision.com',
    },
    {
      name: 'Telenovelas',
      link: 'http://univision.com',
    },
    {
      name: 'Premios Juventud 2020',
      link: 'http://univision.com',
    },
  ],
};

const Decorator = styled.div`
  background-color: #1F2A50;
  height: 80px;
  padding: 16px 160px;
  width: 400px;
`;

storiesOf('Layout/LocalDropDown', module)
  .add('default', () => (
    <Decorator>
      <LocalDropDown {...props} />
    </Decorator>
  ))
  .add('with more options', () => (
    <Decorator>
      <LocalDropDown {...moreOptions} />
    </Decorator>
  ));
