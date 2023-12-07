import React from 'react';
import PropTypes from 'prop-types';

import Styles from './StationFilters.scss';

/**
 * FilterList Component
 * @param {Array} filters Array of filters to display
 * @param {Function} onSelectFilter Function to close menu on select
 * @returns {JSX}
 */
const FilterList = ({
  activeFilter,
  filters,
  selectedFilter,
  onSelectFilter,
}) => {
  const defaultFilter = activeFilter === 'genres' ? 'Todos los géneros' : 'Todas las ciudades';

  return (
    <div className={Styles.container}>
      <ul className={`${Styles.filters} ${activeFilter === 'genres' ? Styles.left : Styles.right}`}>
        {filters.map(filter => (
          <li className={`${Styles.filter} ${selectedFilter === filter ? Styles.active : ''}`} key={filter}>
            <button
              onClick={() => { onSelectFilter(filter); }}
              role="menuitem"
              tabIndex={0}
            >
              {filter}
            </button>
          </li>
        ))}
        <li className={`${Styles.filter} ${selectedFilter === defaultFilter ? Styles.active : ''}`}>
          <button
            onClick={() => { onSelectFilter(defaultFilter); }}
            role="menuitem"
            tabIndex={0}
          >
            {defaultFilter}
          </button>
        </li>
      </ul>
    </div>
  );
};

FilterList.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFilter: PropTypes.string.isRequired,
  onSelectFilter: PropTypes.func.isRequired,
};

export default FilterList;
