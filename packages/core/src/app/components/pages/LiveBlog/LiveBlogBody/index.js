import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import { updateLiveBlogContext } from '@univision/fe-commons/dist/store/actions/liveblog/liveblog-actions';
import { getKey, hasKey, fetchPageData } from '@univision/fe-commons/dist/utils/helpers';
import LiveBlogTracker from '@univision/fe-commons/dist/utils/tracking/tealium/liveblog/LiveBlogTracker';
import { getTimestamp } from '@univision/fe-commons/dist/utils/datetime';
import comScoreManager from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';

import ScrollToTop from '@univision/fe-components-base/dist/components/ScrollToTop';

import RefreshButton, { RefreshLabel } from '@univision/fe-components-base/dist/components/RefreshButton';

import Pagination from '@univision/fe-components-base/dist/components/Pagination';
import Feed from '../LiveBlogFeed';

import Styles from './LiveBlogBody.scss';

/**
 * Represents a LiveBlog Body
 */
class LiveBlogBody extends Component {
  /**
   * Constructor
   * @param {Object} props Component props
   */
  constructor(props) {
    super(props);

    this.pageData = getPageData(Store).data;
    this.verticalPosition = 0;
    this.cacheBusterInterval = 15; // 15 seconds
    this.currentPostsLength = getKey(this.pageData, 'options.totalPosts', 0);
    this.newData = {};
    this.state = {
      activePageNumber: getKey(this.pageData, 'options.pageNumber', 1),
      missingPostsLength: 0,
      posts: this.pageData.posts,
      lastFeedUpdate: getTimestamp(), // Last time when the Feed was rendered
    };
    this.timeout = null;

    this.fetchData = this.fetchData.bind(this);
    this.onRefreshClick = this.onRefreshClick.bind(this);
    this.handlePaginate = this.handlePaginate.bind(this);
    this.onNextVerticalPosition = this.onNextVerticalPosition.bind(this);
    this.setMostRecentPost = this.setMostRecentPost.bind(this);
  }

  /**
   * Setup the auto-refresh
   */
  componentDidMount() {
    const { pageData } = this;
    const refreshTime = getKey(pageData, 'options.refresh_time', 30) * 1000;
    const urlHash = window.location.hash.substring(1);

    this.refreshInterval = setInterval(this.fetchData, refreshTime);
    window.addEventListener('scroll', this.handleScrolling);
    if (urlHash) {
      this.timeout = setTimeout(() => {
        document.getElementById(urlHash).scrollIntoView();
      }, 3000);
    }
  }

  /**
   * Only re-render the component if we have new posts or if the user has navigated
   * to a different page.
   * @param {Object} nextProps the next set of props
   * @param {Object} nextState the next state
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    const { currentPage, lastFeedUpdate, missingPostsLength } = this.state;
    // We need to show/hide the "Refresh Button"
    const hasNewPosts = nextState.missingPostsLength !== missingPostsLength;
    // We need to render the new page
    const weAreInDifferentPage = nextState.currentPage !== currentPage;
    // We need to render the Feed to show the new posts
    const refreshHasBeenTriggered = nextState.lastFeedUpdate !== lastFeedUpdate;

    return hasNewPosts || weAreInDifferentPage || refreshHasBeenTriggered;
  }

  /**
   * Clean up the timer on unmount
   */
  componentWillUnmount() {
    clearInterval(this.refreshInterval);
    clearTimeout(this.timeout);
    global.window.removeEventListener('scroll', this.handleScrolling);
  }

  /**
   * Callback for clicks on the manual refresher
   */
  async onRefreshClick() {
    const { activePageNumber } = this.state;
    const trackingData = this.getTrackingData();
    LiveBlogTracker.track(LiveBlogTracker.events.refresh, trackingData);

    if (activePageNumber !== 1) {
      // Go to the first page
      await this.fetchData(1);
    }
    // Reset the counter and scroll to the top of the page.
    this.updateCurrentPosts({ scrollTo: this.mostRecentPostRef });
  }

  /**
   * Callback for advancing to a new vertical position (A new position is reached each 3000px)
   */
  onNextVerticalPosition() {
    const trackingData = this.getTrackingData();
    let event = LiveBlogTracker.events.advance;

    if (!this.startTracked) {
      this.startTracked = true;
      event = LiveBlogTracker.events.start;
    }

    LiveBlogTracker.track(event, trackingData);
  }

  /**
   * Returns the tracking data
   * @returns {Object} Tracking data
   */
  getTrackingData() {
    return {
      title: this.pageData.title,
      scrollingCount: this.verticalPosition,
    };
  }

  /**
   * Returns the missing posts length.
   * First try to use the totalPosts count from the API response,
   * then try to find a difference in the posts array.
   * @returns {number}
   */
  getMissingPostsLength() {
    const length = getKey(this.newData, 'options.totalPosts', 0);
    const { posts } = this.state;
    // Maybe we have some updated posts (edited in the CMS)
    if (length <= this.currentPostsLength && Array.isArray(posts)) {
      const currentPosts = posts.map(p => `${p.uid}`);
      return getKey(this.newData, 'posts', []).filter(
        p => currentPosts.indexOf(`${p.uid}`) < 0
      ).length;
    }
    return Math.max(length - this.currentPostsLength, 0);
  }

  /**
   * Set the reference to the most recent post
   * @param {Node} node Most recent post
   */
  setMostRecentPost(node) {
    this.mostRecentPostRef = node;
  }

  /**
   * Handles the scroll event to determine the current vertical position.
   */
  handleScrolling = () => {
    const scrollingCount = Math.floor(global.window.scrollY / 3000);

    if (scrollingCount && this.verticalPosition !== scrollingCount) {
      this.verticalPosition = scrollingCount;
      this.onNextVerticalPosition();
    }
  };

  /**
   * Callback for clicks on the pagination buttons
   * @param {number} pageNumber number of new page
   */
  async handlePaginate(pageNumber) {
    const { options } = this.pageData;
    const { activePageNumber } = this.state;
    const trackingData = this.getTrackingData();
    const trackingEvents = {
      prev: LiveBlogTracker.events.prevPage,
      next: LiveBlogTracker.events.nextPage,
    };

    let type = pageNumber < activePageNumber ? 'prev' : 'next';
    if (pageNumber === 0 || pageNumber > Math.ceil(options.totalPosts / options.pageSize)) {
      type = null;
    }

    // If there is a tracking event for this pagination type
    if (trackingEvents[type]) {
      LiveBlogTracker.track(trackingEvents[type], trackingData);
    }

    await this.fetchData(pageNumber);
    this.updateCurrentPosts();
    LiveBlogTracker.track(LiveBlogTracker.events.newPage, trackingData);
    comScoreManager.beacon();
  }

  /* eslint-disable react/destructuring-assignment */
  /**
   * Get new data from the api
   * @param {number} pageNumber the index of the page to fetch
   */
  async fetchData(pageNumber = this.state.activePageNumber) {
    const { uri } = this.pageData;
    const newData = await fetchPageData(uri, {
      pageNumber,
      mrpts: getTimestamp(
        {
          secondsInterval: this.cacheBusterInterval,
        },
        false
      ),
    });

    this.newData = getKey(newData, 'data', this.newData);
    const missingPostsLength = this.getMissingPostsLength();
    const newState = {};
    // Do we have new posts ?
    if (missingPostsLength) {
      newState.missingPostsLength = missingPostsLength;
    }
    // Are we in a new page ?
    if (getKey(newData, 'data.options.pageNumber') !== this.state.activePageNumber) {
      newState.activePageNumber = newData.data.options.pageNumber;
    }

    Store.dispatch(updateLiveBlogContext({ ...this.newData, ...newState }));

    this.setState(() => ({
      ...newState,
    }));
  }

  /**
   * Resets the posts counter on the state
   */
  updateCurrentPosts({ scrollTo } = {}) {
    this.setState(() => {
      const newState = {
        missingPostsLength: 0,
        lastFeedUpdate: getTimestamp(),
        posts: this.newData.posts,
      };
      this.pageData = this.newData;
      this.currentPostsLength = getKey(this.newData, 'options.totalPosts', this.currentPostsLength);

      if (hasKey(scrollTo, 'scrollIntoView')) {
        scrollTo.scrollIntoView({
          behavior: 'smooth',
        });
      } else {
        global.window.scrollTo(0, 0);
      }
      return newState;
    });
  }

  /**
   * Renders the LiveBlog body
   * @returns {XML}
   */
  render() {
    const { pageData } = this;
    const { displayRefrehButton } = this.props;
    const {
      activePageNumber, missingPostsLength, posts, lastFeedUpdate,
    } = this.state;

    const showPagination = getKey(pageData, 'options.totalPosts', 0) > getKey(pageData, 'options.pageSize', 0);
    const totalPages = Math.ceil(
      getKey(pageData, 'options.totalPosts', 1) / getKey(pageData, 'options.pageSize', 1)
    );

    return (
      <Fragment>
        {missingPostsLength === 0 && <ScrollToTop showAtOffset={200} />}
        <div className={classnames('row', Styles.row)}>
          <div
            className={classnames('col-sm-12', 'col-md-10', 'col-lg-8', Styles.offset_2)}
            data-component-name="feed"
          >
            <div className={Styles.postsFeed}>
              <Feed
                setMostRecentPost={this.setMostRecentPost}
                posts={posts}
                lastFeedUpdate={lastFeedUpdate}
              />
            </div>

            {showPagination && (
              <Pagination
                activePageNumber={activePageNumber}
                totalPages={totalPages}
                onUpdate={this.handlePaginate}
                className={Styles.paginationContainer}
              />
            )}
            {(missingPostsLength > 0 || displayRefrehButton) && (
              <RefreshButton onClick={this.onRefreshClick}>
                <RefreshLabel>
                  <p className={classnames(Styles.count, 'uvs-font-a-bold')}>{missingPostsLength}</p>
                </RefreshLabel>
              </RefreshButton>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

LiveBlogBody.propTypes = {
  // For easy verification in storybook
  displayRefrehButton: PropTypes.bool,
};

LiveBlogBody.defaultProps = {
  displayRefrehButton: false,
};

export default LiveBlogBody;
