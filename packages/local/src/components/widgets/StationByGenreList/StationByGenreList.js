import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { hasKey, isInArray } from '@univision/fe-commons/dist/utils/helpers';
import TopicBar from '@univision/fe-components-base/dist/components/TopicBar';
import FilterToggles from './FilterToggles';
import FilterList from './FilterList';
import StationList from './StationList';
import Styles from './StationByGenreList.scss';

const defaultGenre = 'Todos los géneros';
const defaultLocation = 'Todas las ciudades';
const exclusiveStationsLabel = 'Exclusivas';

/**
 * Parse the station data to get a list of all genres and cities
 * @param {Object} data The data returned from the API
 * @param {Object} allowedGenres Allowed music genres for filtering
 * @param {Object} filter An optional filter for returning only selected
 * @returns {Object}
 */
const getFilterLists = (data, allowedGenres, filter) => {
  const isDefaultFilter = filter
    && (filter.selected === defaultGenre || filter.selected === defaultLocation);

  const filters = {
    genres: [],
    cities: [],
  };
  // Whether display the exclusiveStationsLabel as a filtering option or not
  let shouldDisplayExclusivesLabel = data.length > 0;

  if (Array.isArray(data)) {
    data.forEach((station) => {
      filters.genres = filters.genres.concat(station.radioStation.genres);
      filters.cities = filters.cities.concat(station.radioStation.localMarkets);
    });
  }

  if (filter && !isDefaultFilter) {
    const keys = {
      genres: 'genres',
      cities: 'localMarkets',
    };

    const reverseDataKeys = {
      genres: 'localMarkets',
      cities: 'genres',
    };

    const reverseKeys = {
      genres: 'cities',
      cities: 'genres',
    };

    filters[reverseKeys[filter.key]] = [];
    shouldDisplayExclusivesLabel = false;

    const matches = data.filter(
      station => isInArray(filter.selected, station.radioStation[keys[filter.key]])
        || (filter.selected === exclusiveStationsLabel && station.radioStation.isExclusive)
    );

    // Populate the filtering options using the available stations to prevent empty results.
    matches.forEach((match) => {
      filters[reverseKeys[filter.key]] = filters[reverseKeys[filter.key]].concat(
        match.radioStation[reverseDataKeys[filter.key]]
      );

      // Only display the exclusiveStationsLabel if there is at least one exclusive station
      shouldDisplayExclusivesLabel = shouldDisplayExclusivesLabel || match.radioStation.isExclusive;
    });
  }

  // Only display the allowed genres
  filters.genres = filters.genres.filter(genre => isInArray(genre, allowedGenres));
  // Add the 'Exclusivas' filtering option
  if (shouldDisplayExclusivesLabel === true) {
    filters.genres = filters.genres.concat(exclusiveStationsLabel);
  }

  return {
    genres: [...new Set(filters.genres)].sort(),
    cities: [...new Set(filters.cities)].sort(),
  };
};

/**
 * Get the list of stations based off the current filter
 * @param {Array} stations List of all stations
 * @param {Object} filters The currently selected filters
 * @returns {Array}
 */
const getStationList = (stations, filters) => stations.filter((station) => {
  /* eslint-disable operator-linebreak */
  const matchesGenre =
      // If the default genre is selected
      filters.genres === defaultGenre
      // If 'Exclusivas' is selected and the station is exclusive
      || (filters.genres === exclusiveStationsLabel
          && (station.radioStation.isExclusive || station.radioStation.exclusive))
      // If the station has the selected genre
      || (hasKey(station, 'radioStation.genres')
        && isInArray(filters.genres, station.radioStation.genres));

  const matchesCity = filters.cities === defaultLocation
      || (hasKey(station, 'radioStation.localMarkets')
        && isInArray(filters.cities, station.radioStation.localMarkets));

  return matchesGenre && matchesCity;
});

/**
 * StationByGenreList widget
 */
class StationByGenreList extends Component {
  /**
   * Set up initial component state
   * @param {Object} props React Props for this component
   */
  constructor(props) {
    super(props);
    this.data = props.content;
    // BEX support
    if (Array.isArray(this.data)) {
      for (let i = 0; i < this.data.length; i += 1) {
        if (!hasKey(this.data[i], 'radioStation')) {
          this.data[i].radioStation = this.data[i];
          this.data[i].radioStation.localMarkets = [];
          if (hasKey(this.data[i], 'localMarket.title')) {
            this.data[i].radioStation.localMarkets.push(this.data[i].localMarket.title);
          }
        }
      }
    }

    const allowedGenresForFiltering = props.allowedGenresForFiltering
      .filter(option => option.isMusicGenre)
      .filter(option => option.name !== 'Exclusive Stations')
      .map(option => option.name);

    /* eslint-disable react/no-unused-state */
    this.state = {
      showFilters: false,
      activeKey: '',
      activeFilters: [],
      selectedFilter: {
        genres: defaultGenre,
        cities: defaultLocation,
      },
      stationList: this.data,
      filterLists: getFilterLists(this.data, allowedGenresForFiltering),
      allowedGenresForFiltering,
    };
  }

  /**
   * Handle visibility of genre/location filter lists
   * @param {string} key the type of filters to show
   */
  handleShowFilters = (key) => {
    const { showFilters, activeKey } = this.state;

    if (showFilters && activeKey === key) {
      this.setState(() => ({ showFilters: false, activeKey: '' }));
    } else {
      this.setState(state => ({
        showFilters: true,
        activeKey: key,
        activeFilters: state.filterLists[key],
      }));
    }
  };

  /**
   * Update the state when a filter is selected
   * @param {string} key The filter key to update
   * @param {string} filter The name of the selected filter
   */
  handleSelectFilter = (key, filter) => {
    const content = this.data;
    this.setState(({ allowedGenresForFiltering, selectedFilter }) => {
      const selectedFilterValue = Object.assign({}, selectedFilter, { [key]: filter });

      return {
        showFilters: false,
        activeKey: '',
        selectedFilter,
        stationList: getStationList(content, selectedFilterValue),
        filterLists: getFilterLists(content, allowedGenresForFiltering, {
          key,
          selected: filter,
        }),
      };
    });
  };

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const {
      showFilters, activeKey, selectedFilter, activeFilters, stationList,
    } = this.state;
    const { device, settings, theme } = this.props;

    return (
      <div className="uvs-widget">
        <TopicBar
          settings={settings}
          separator="top"
          className={Styles.topicModifier}
          theme={theme}
        />
        <FilterToggles
          onShowFilters={this.handleShowFilters}
          activeKey={activeKey}
          selectedFilter={selectedFilter}
        />
        {showFilters
          && activeKey && (
            <FilterList
              activeFilter={activeKey}
              filters={activeFilters}
              selectedFilter={selectedFilter[activeKey]}
              onSelectFilter={(filter) => {
                this.handleSelectFilter(activeKey, filter);
              }}
            />
        )}
        <StationList stations={stationList} device={device} />
      </div>
    );
  }
}

StationByGenreList.propTypes = {
  device: PropTypes.string,
  allowedGenresForFiltering: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      isMusicGenre: PropTypes.bool,
    })
  ),
  content: PropTypes.arrayOf(
    PropTypes.shape({
      radioStation: PropTypes.shape({
        genres: PropTypes.arrayOf(PropTypes.string),
        localMarkets: PropTypes.arrayOf(PropTypes.string),
      }).isRequired,
    })
  ).isRequired,
  settings: PropTypes.object,
  theme: PropTypes.object,
};

StationByGenreList.defaultProps = {
  allowedGenresForFiltering: [],
};

export default StationByGenreList;
