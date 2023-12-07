import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import Icon from '@univision/fe-icons/dist/components/Icon';
import features from '@univision/fe-commons/dist/config/features';

import Post from '../Post';
import ExpertPost from '../ExpertPost';

import Styles from './LiveBlogFeed.scss';

/**
 * Represents a LiveBlog Feeed
 */
class Feed extends Component {
  /**
   * Constructor
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.theme = props.theme;
    this.pageData = props.pageData;
  }

  /**
   * Only re-render the component if the feed has been updated.
   * @param {Object} nextProps the next set of props
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps) {
    const { lastFeedUpdate } = this.props;
    return nextProps.lastFeedUpdate !== lastFeedUpdate;
  }

  /**
   * Sort posts based on publishDate
   * @param {Object} postA the first post
   * @param {Object} postB the second post
   * @returns {number}
   */
  sortPosts = (postA, postB) => {
    const postADate = new Date(postA.publishDate);
    const postBDate = new Date(postB.publishDate);

    if (postADate > postBDate) return -1;
    if (postADate < postBDate) return 1;
    return 0;
  };

  /**
   * Returns Post for the Feed
   * @param {Object} post LiveBlog post
   * @param {number} index Post index/position (zero-based)
   * @param {Object} previousPost Previous LiveBlog post
   * @returns {XML}
   */
  buildPost(post, index, previousPost) {
    const {
      pageData,
      theme,
      props: { setMostRecentPost },
    } = this;

    const shareData = {
      uid: pageData.uid,
      primaryTag: pageData.primaryTag,
      title: pageData.title,
      type: 'liveblog',
    };

    const isAfterPinned = getKey(previousPost, 'pinned', false);
    const isFirstPost = !pageData.pinnedPost && index === 0;
    const hideTimestamp = getKey(pageData, 'options.hideTimestamp', false);
    const isWorldCupMVP = features.deportes.isWorldCupMVP();

    let el = (
      <Post
        key={post.uid}
        post={post}
        isPinned={post.pinned}
        theme={theme}
        shareData={shareData}
        hideTimestamp={hideTimestamp}
      />
    );

    if (post.expertPost) {
      el = (
        <ExpertPost
          key={post.uid}
          post={post}
          theme={theme}
          shareData={shareData}
          hideTimestamp={hideTimestamp}
        />
      );
    }

    if (isAfterPinned || isFirstPost) {
      return (
        <Fragment key={`first-post-${post.uid}`}>
          <div
            className={classnames({ [Styles.inProgressMVP]: isWorldCupMVP }, Styles.inProgress, 'uvs-font-a-bold')}
          >
            {!isWorldCupMVP && <Icon name="liveblogComment" size="xsmall" />}
            {localization.get('updatesInProgress')}
          </div>
          <div ref={setMostRecentPost}>
            {el}
          </div>
        </Fragment>
      );
    }

    return el;
  }

  /**
   * Render a LiveBlog Feed
   * @returns {boolean}
   */
  render() {
    const { pageData } = this;
    let { posts } = this.props;

    posts = posts.sort(this.sortPosts);

    if (pageData.displayPinnedPost && pageData.pinnedPost && Array.isArray(posts)) {
      // prevent duplicate display of pinned post
      posts = posts.filter(post => post.uid !== pageData.pinnedPost.uid);
      // add pinned post to the top of the list
      posts.unshift({ ...pageData.pinnedPost, pinned: true });
    }

    posts = Array.isArray(posts) && posts
      .map((post, index) => this.buildPost(post, index, posts[index - 1]));

    const postListWithInitialAd = adHelper.injectFullWidthAds({
      widgets: posts,
      injectEvery: 1,
      numberOfAds: 1,
      type: AdTypes.TOP_AD,
      lazyload: false,
      hasBg: true,
    });

    return (
      <Fragment>
        {adHelper.injectFullWidthAds({
          widgets: postListWithInitialAd,
          startFrom: 3,
          injectEvery: 3,
        })}
      </Fragment>
    );
  }
}

Feed.propTypes = {
  pageData: PropTypes.object,
  posts: PropTypes.array,
  lastFeedUpdate: PropTypes.number, // Time Stamp
  setMostRecentPost: PropTypes.func,
  theme: PropTypes.object,
};

export default Feed;
