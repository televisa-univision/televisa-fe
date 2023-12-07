import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import {
  isValidArray,
  isValidFunction,
} from '@univision/fe-commons/dist/utils/helpers';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import SearchTracker from '@univision/fe-commons/dist/utils/tracking/tealium/search/SearchTracker';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import Title from '@univision/fe-components-base/dist/components/Title';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import Pagination from '@univision/fe-components-base/dist/components/Pagination';
import SearchPlaceholder from '@univision/fe-components-base/dist/components/Placeholder/searchCard';

import ConnectedPlaceholder from '../../../base/Placeholders/ContentListPlaceholder';
import Sidebar from '../Sidebar';
import Results from '../Results';
import Form from '../Form';
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
      search: {
        filter,
        dateFilter,
        page,
        totalResults,
      },
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
   * handle select by type
   * @param {Object} prevProps Prev props
   */
  componentDidUpdate(prevProps) {
    const {
      search: { query },
      setSearchQuery,
      setPageNumber,
    } = this.props;
    if (query !== prevProps.search.query) {
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
   * handle select by type
   * @param {Object} prevProps Prev props
   */
  componentDidMount() {
    const {
      setSearchQuery,
      pageData: { notFoundPath },
    } = this.props;
    if (notFoundPath) {
      const query = notFoundPath.split('/').pop();

      if (isValidFunction(setSearchQuery) && query) {
        setSearchQuery(decodeURIComponent(query));
      }
      this.fetchData();
    }
  }

  /**
   * Returns the tracking data
   * @returns {Object} Tracking data
   */
  getTrackingData() {
    const { search: { query } } = this.props;
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
      search: { query },
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
    const { fetchSearchResults } = this.props;
    const { scrollToTop } = this.constructor;
    this.clientFetch = true;

    if (isValidFunction(fetchSearchResults)) {
      const trackingData = this.getTrackingData();

      scrollToTop();
      fetchSearchResults();
      SearchTracker.track(SearchTracker.events.userSearch, trackingData);
    }
  }

  /**
   * Render
   * @returns {?JSX}
   */
  render() {
    const {
      pageData: { device, data },
      search,
    } = this.props;
    if (!data || !search) return null;

    const {
      dateFilter,
      ready,
      results = [],
      totalPages,
      totalResults,
      query,
      page,
    } = search;

    const {
      placeholder,
    } = this.state;
    const isDesktop = device === 'desktop';
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
                  page={data}
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
                  : <Results device={device} results={results} loading={!ready} />}
                {showPagination && (
                  <div className={Styles.pagination}>
                    <Pagination
                      activePageNumber={page}
                      totalPages={totalPages}
                      onUpdate={this.handlePaginate}
                    />
                    <div className={
                      classnames(
                        Styles.loader,
                        ready ? Styles.loaded : Styles.loading,
                        Styles.small,
                      )
                    }
                    >
                      <ConnectedPlaceholder size="small" />
                    </div>
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
}

/**
 * propTypes
 * @property {Function} fetchSearchResults - the redux action to get matches data
 * @property {Function} setSearchQuery - the redux action to get matches data
 * @property {Function} setFilterType - the redux action to get matches data
 * @property {Function} setDateFilter - the redux action to get matches data
 * @property {Function} setPageNumber - the redux action to get matches data
 * @property {Function} pageData - from the api content
 * @property {Function} search - from the api content
 */
SearchBody.propTypes = {
  fetchSearchResults: PropTypes.func,
  pageData: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  setDateFilter: PropTypes.func,
  setFilterType: PropTypes.func,
  setPageNumber: PropTypes.func,
  setSearchQuery: PropTypes.func,
};

export default SearchBody;
