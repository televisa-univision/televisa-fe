import { connect } from 'react-redux';

import {
  setDateFilter,
  setFilterType,
  setPageNumber,
  setSearchQuery,
  fetchSearchResults,
} from '@univision/fe-commons/dist/store/actions/search/search-actions';
import { searchSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import isEqual from '@univision/fe-utilities/helpers/common/isEqual';

import SearchBody from './SearchBody';
import config from './config';

const PAGE_SIZE = config.settings.pageSize;

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{standings: Object}}
 */
const mapStateToProps = (state) => {
  return {
    search: searchSelector(state),
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @returns {{matches: Array}}
 */
const mapDispatchToProps = (dispatch) => {
  return ({
    fetchSearchResults: () => dispatch(fetchSearchResults(PAGE_SIZE)),
    setDateFilter: date => dispatch(setDateFilter(date)),
    setSearchQuery: query => dispatch(setSearchQuery(query)),
    setFilterType: filterType => dispatch(setFilterType(filterType)),
    setPageNumber: page => dispatch(setPageNumber(page)),
  });
};

/**
 * Check if shouldn't set new props if the data is equal or the previous
 * data is not a error
 * @param {Object} nextProps the new prop data
 * @param {Object} prevProps the previous prop data
 * @returns {boolean}
 */
const areStatePropsEqual = (nextProps, prevProps) => {
  return isEqual(prevProps, nextProps);
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: true,
    areStatePropsEqual,
  },
)(SearchBody);

export {
  connector as default,
  areStatePropsEqual,
  mapDispatchToProps,
  mapStateToProps,
};
