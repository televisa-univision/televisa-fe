import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import Styles from './StationFilters.scss';

/**
 * Key constants
 */
const keys = {
  genres: 'genres',
  cities: 'cities',
};

/**
 * FilterToggles
 *
 * @param {Function} onShowFilters toggle the filter list visibility
 * @param {string} activeKey the toggle that is currently active
 * @returns {JSX}
 */
const FilterToggles = ({ onShowFilters, activeKey, selectedFilter }) => (
  <div className={Styles.toggles}>
    <button
      className={classnames(Styles.toggle, {
        [Styles.active]: activeKey === keys.genres,
      })}
      onClick={() => {
        onShowFilters(keys.genres);
      }}
    >
      <span className={Styles.key}>Género</span>
      <span
        className={classnames(Styles.selected, 'uvs-font-a-bold', {
          [Styles.active]: activeKey === keys.genres,
          [Styles.inactive]: activeKey === keys.cities,
        })}
      >
        {selectedFilter.genres}
      </span>
    </button>
    <button
      className={classnames(Styles.toggle, {
        [Styles.active]: activeKey === keys.cities,
      })}
      onClick={() => {
        onShowFilters(keys.cities);
      }}
    >
      <span className={Styles.key}>Ciudad</span>
      <span
        className={classnames(Styles.selected, 'uvs-font-a-bold', {
          [Styles.active]: activeKey === keys.cities,
          [Styles.inactive]: activeKey === keys.genres,
        })}
      >
        {selectedFilter.cities}
      </span>
    </button>
  </div>
);

FilterToggles.propTypes = {
  onShowFilters: PropTypes.func.isRequired,
  activeKey: PropTypes.string.isRequired,
  selectedFilter: PropTypes.shape({
    genres: PropTypes.string.isRequired,
    cities: PropTypes.string.isRequired,
  }).isRequired,
};

export default FilterToggles;
