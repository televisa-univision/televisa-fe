import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FilterTabMenu from '.';

const onChangeAction = action('Filter changed');
const filters = {
  filterTypes: [
    { name: 'Todos', id: '0' },
    { name: 'Novelas', id: '1' },
    { name: 'Series', id: '2' },
    { name: 'Shows', id: '3' },
    { name: 'Partidos', id: '4' },
  ],
};

storiesOf('Base/FilterTabMenu', module)
  .add('default with callback onChange', () => (
    <FilterTabMenu {...filters} onChange={onChangeAction} />))
  .add('with an active filter', () => (
    <FilterTabMenu {...filters} activeFilter="3" onChange={onChangeAction} />));
