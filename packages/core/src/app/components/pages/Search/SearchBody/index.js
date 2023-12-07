import React from 'react';
import PropTypes from 'prop-types';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Store from '@univision/fe-commons/dist/store/store';
import {
  isValidArray,
  isValidFunction,
} from '@univision/fe-commons/dist/utils/helpers';
import {
  getDevice,
  getPageData,
} from '@univision/fe-commons/dist/store/storeHelpers';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import SearchTracker from '@univision/fe-commons/dist/utils/tracking/tealium/search/SearchTracker';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import Title from '@univision/fe-components-base/dist/components/Title';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import Pagination from '@univision/fe-components-base/dist/components/Pagination';
import SearchPlaceholder from '@univision/fe-components-base/dist/components/Placeholder/searchCard';

import Sidebar from '../Sidebar/Sidebar';
import Results from '../Results/Results';
import Loader from '../Loader/Loader';
import Form from '../Form/Form';

import Styles from './SearchBody.scss';

/**
 * SearchBody component
 */
class SearchBody extends React.PureComponent {
  /**
   * Scroll to top animation
   */
  static scrollToTop() {
    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: 0,
    });
  }

  /**
   * Setup component
   * @param {Object} props the component props
   */
  constructor(props) {
    super(props);
    /**
     * Initial State
     */
    const {
      filter,
      dateFilter,
      page,
      totalResults,
    } = this.props;
    this.state = {
      placeholder: localization.get('search'),
      filter,
      dateFilter,
      page,
      totalResults,
    };
    this.clientFetch = false;
    this.fetchData = this.fetchData.bind(this);
    this.filterByDate = this.filterByDate.bind(this);
    this.filterByType = this.filterByType.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handlePaginate = this.handlePaginate.bind(this);
    this.element = React.createRef();
    this.container = React.createRef();
  }

  /**
   * Setup the the query and fetch results.
   */
  componentDidMount() {
    const {
      query,
      getSearchResults,
      setSearchQuery,
    } = this.props;
    if (isValidFunction(setSearchQuery)) {
      setSearchQuery(query);
    }
    if (isValidFunction(getSearchResults)) {
      getSearchResults();
    }
  }

  /**
   * handle select by type
   * @param {Object} prevProps Prev props
   */
  componentDidUpdate(prevProps) {
    const {
      query,
      setSearchQuery,
      setPageNumber,
    } = this.props;
    if (query !== prevProps.query) {
      if (isValidFunction(setSearchQuery)) {
        setSearchQuery(query);
      }
      if (isValidFunction(setPageNumber)) {
        setPageNumber(1);
      }
      this.fetchData();
    }
  }

  /**
   * Returns the tracking data
   * @returns {Object} Tracking data
   */
  getTrackingData() {
    const { query } = this.props;
    const {
      page, totalResults, filter, dateFilter,
    } = this.state;
    return {
      page,
      searchTerm: query,
      hasResults: (totalResults > 0).toString(),
      count: totalResults,
      filters: {
        type: filter,
        date: dateFilter,
      },
    };
  }

  /**
   * handle select by type
   * @param {Object} e the event
   */
  filterByType(e) {
    const { setFilterType, setPageNumber } = this.props;
    const value = e.target.value.toLowerCase();
    this.setState({ filter: value, page: 1 });
    if (isValidFunction(setFilterType)) {
      setFilterType(value);
    }
    if (isValidFunction(setPageNumber)) {
      setPageNumber(1);
    }
    this.fetchData();
  }

  /**
   * handle select by date
   * @param {Object} e the event
   */
  filterByDate(e) {
    const { setDateFilter, setPageNumber } = this.props;
    const value = e.target.value.toLowerCase();
    this.setState({ dateFilter: value, page: 1 });
    if (isValidFunction(setDateFilter)) {
      setDateFilter(value);
    }
    if (isValidFunction(setPageNumber)) {
      setPageNumber(1);
    }
    this.fetchData();
  }

  /**
   * handle search input on blur event
   * @param {Object} e the event
   */
  handleInputBlur(e) {
    const {
      query,
    } = this.props;
    if (e.target.value !== '' && e.target.value !== query) {
      this.handleSubmitForm(e);
    }
  }

  /**
   * handle search form submit
   * @param {Object} e the event
   */
  handleSubmitForm(e) {
    e.preventDefault();

    const { setSearchQuery, setPageNumber } = this.props;
    const value = e.target.tagName === 'FORM'
      ? e.target.elements.namedItem('search-box').value
      : e.target.value;

    window.history.replaceState({}, '', `${window.location.pathname}?q=${value}`);
    this.setState({ page: 1 });
    if (isValidFunction(setSearchQuery)) {
      setSearchQuery(value);
    }
    if (isValidFunction(setPageNumber)) {
      setPageNumber(1);
    }
    this.fetchData();
  }

  /**
   * Callback for clicks on the pagination buttons
   * @param {string} pageNumber number of new page
   */
  handlePaginate(pageNumber) {
    const { setPageNumber } = this.props;
    this.setState({ page: pageNumber });
    WidgetTracker.track(WidgetTracker.events.engagement, {
      target: `search-goto-page-${pageNumber}`,
    });
    if (isValidFunction(setPageNumber)) {
      setPageNumber(pageNumber);
    }
    this.fetchData();
  }

  /**
   * Get new data from the api
   */
  fetchData() {
    const { getSearchResults } = this.props;
    const { scrollToTop } = this.constructor;
    this.clientFetch = true;

    if (isValidFunction(getSearchResults)) {
      const trackingData = this.getTrackingData();

      scrollToTop();
      getSearchResults();
      SearchTracker.track(SearchTracker.events.userSearch, trackingData);
    }
  }

  /**
   * Render
   * @returns {?JSX}
   */
  render() {
    const pageData = getPageData(Store).data;
    const {
      dateFilter,
      page,
      ready,
      results,
      totalPages,
      totalResults,
      query,
    } = this.props;
    if (pageData) {
      const {
        placeholder,
      } = this.state;
      const isDesktop = getDevice(Store) === 'desktop';
      const showPlaceholder = !ready && this.clientFetch;
      const showPagination = isValidArray(results) && page < totalPages;
      const placeholderCards = isValidArray(results) ? results.length : 5;
      const pageTitle = localization.get('searchSeoTitle', { locals: { query } });

      return (
        <div
          className={Styles.wrapper}
          ref={this.element}
          data-element-name="search-page"
        >
          <div className="uvs-container">
            <div className="row">
              <div className="col-md-7 col-lg-8">
                <div
                  className={Styles.container}
                  ref={this.container}
                  data-element-name="search-page-container"
                >
                  <Title hidden element="h1">{pageTitle}</Title>
                  <Form
                    dateFilter={dateFilter}
                    page={pageData}
                    placeholder={placeholder}
                    resultSize={totalResults}
                    results={results}
                    loading={!ready}
                    query={query}
                    onChangeFilterByType={this.filterByType}
                    onChangeFilterByDate={this.filterByDate}
                    handleInputBlur={this.handleInputBlur}
                    handleInputFocus={this.handleInputFocus}
                    handleSubmitForm={this.handleSubmitForm}
                  />
                  {showPlaceholder
                    ? <SearchPlaceholder numberOfCards={placeholderCards} />
                    : <Results results={results} loading={!ready} />}
                  {showPagination && (
                    <div className={Styles.pagination}>
                      <Pagination
                        activePageNumber={page}
                        totalPages={totalPages}
                        onUpdate={this.handlePaginate}
                      />
                      <Loader loading={!ready} size="small" />
                    </div>
                  )}
                </div>
              </div>
              {isDesktop && (
                <Sidebar parent={this.element} container={this.container}>
                  {adHelper.getAd(AdTypes.WIDGET_AD, { isLazyLoaded: false, hasBg: false })}
                </Sidebar>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

/**
 * propTypes
 * @property {Function} getSearchResults - the redux action to get matches data
 * @property {Function} setSearchQuery - the redux action to get matches data
 * @property {Function} setFilterType - the redux action to get matches data
 * @property {Function} setDateFilter - the redux action to get matches data
 * @property {Function} setPageNumber - the redux action to get matches data
 * @property {boolean} ready - true if redux data is ready
 * @property {Array} results - array of results query
 * @property {string} query - the search query
 * @property {string} filter - the filter type for results to be filtered by
 * @property {string} dateFilter - the date filter to filter results by
 * @property {Number} page - the page number of the results form the query
 * @property {Number} totalPages - the total of result pages from the query
 * @property {Number} totalResults - the total results from the search query
 */
SearchBody.propTypes = {
  getSearchResults: PropTypes.func,
  setSearchQuery: PropTypes.func,
  setFilterType: PropTypes.func,
  setDateFilter: PropTypes.func,
  setPageNumber: PropTypes.func,
  ready: PropTypes.bool,
  results: PropTypes.array,
  query: PropTypes.string,
  filter: PropTypes.string,
  dateFilter: PropTypes.string,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  totalResults: PropTypes.number,
};

export default SearchBody;
