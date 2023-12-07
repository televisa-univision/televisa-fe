import { connect } from 'react-redux';
import {
  setDateFilter,
  setFilterType,
  setPageNumber,
  setSearchQuery,
  getSearchResults,
} from '@univision/fe-commons/dist/store/actions/search/search-actions';
import { getKey, isEqual } from '@univision/fe-commons/dist/utils/helpers';
import searchActionDefinitions from './config/searchActionDefinitions';
import SearchBody from './SearchBody';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{standings: Object}}
 */
const mapStateToProps = (state, ownProps) => {
  const { dateFilter, query } = searchActionDefinitions;
  return {
    ...getKey(state, 'search', {}),
    ...ownProps,
    dateFilter,
    query,
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @returns {{matches: Array}}
 */
const mapDispatchToProps = (dispatch) => {
  return ({
    getSearchResults: () => dispatch(getSearchResults(searchActionDefinitions.fetchResults)),
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
  const next = nextProps || {};
  const prev = prevProps || {};
  const nextFlag = next.ready || false;
  const prevFlag = prev.ready;
  const nextContent = next.filter;
  const prevContent = prev.filter;
  const nextDate = next.date;
  const prevDate = prev.date;
  const nextPage = next.page;
  const prevPage = prev.page;
  const nextQuery = next.query;
  const prevQuery = prev.query;
  // should returns false to re-render;
  return isEqual(nextFlag, prevFlag) && !nextFlag && isEqual(nextContent, prevContent)
    && isEqual(nextDate, prevDate) && isEqual(nextPage, prevPage) && isEqual(nextQuery, prevQuery);
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: true,
    areStatePropsEqual,
  }
)(SearchBody);

export {
  connector as default,
  mapDispatchToProps,
  mapStateToProps,
  areStatePropsEqual,
};
