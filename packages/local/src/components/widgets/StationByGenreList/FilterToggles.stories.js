import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FilterToggles from './FilterToggles';

storiesOf('Widgets/FilterToggles', module)
  .add(
    'with city, genres, activeKey, filters',
    () => (
      <div className="uvs-widget">
        <FilterToggles
          activeKey="cities"
          filters={['Austin', 'Chicago', 'Dallas Ft. Worth', 'El Paso', 'Fresno']}
          selectedFilter={{
            cities: ['Austin'],
            genres: 'Todos los géneros',
          }}
          onShowFilters={() => action('hello There')}
        />
      </div>
    )
  );
