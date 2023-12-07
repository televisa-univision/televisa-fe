import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import truncateString from '@univision/fe-utilities/helpers/string/truncateString';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import features from '@univision/fe-commons/dist/config/features';
import Link from '../../../../Link';

import { TITLE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } from '../../../constants';
import Styles from './SquareLiveblogPosts.styles';

const POST_COUNT = {
  large: 3,
  medium: 2,
  small: 1,
};

const Bullet = styled.div`${Styles.bullet}`;
const Post = styled.li.attrs({ className: 'uvs-font-a-light' })`${Styles.post}`;
const PostLink = styled(Link)`${Styles.postLink}`;
const Posts = styled.ul`${Styles.posts}`;
const PostsOverlay = styled.div`${Styles.postsOverlay}`;
const PostsWrapper = styled.div`${Styles.postsWrapper}`;
/**
 * Render recent posts
 * @param {string} cardSize - the card size
 * @param {string} description - the live blog description
 * @param {Array} recentPosts - live blog's recent posts
 * @param {function} trackClick - the tracking for the posts
 * @param {bool} isDark - if in dark mode
 * @returns {Array|JSX}
 */
const renderRecentPosts = (
  cardSize,
  description,
  recentPosts,
  trackClick,
  isDark
) => {
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  if (isValidArray(recentPosts)) {
    return recentPosts.slice(0, POST_COUNT[cardSize]).map((post, index) => {
      const isFirst = index === 0;
      return (
        <Post key={post?.uid} size={cardSize} isFirst={isFirst} isDark={isDark}>
          <Bullet isWorldCupMVP={isWorldCupMVP} />
          <PostLink href={post?.uri ?? ''} onClick={trackClick} size={cardSize} isDark={isDark} isWorldCupMVP={isWorldCupMVP}>
            {truncateString(post?.title, { maxChars: TITLE_MAX_LENGTH, checkFeature: false })
          }
          </PostLink>
        </Post>
      );
    });
  }
  // if no posts available return description
  return (
    <Post size={cardSize} isFirst isDark={isDark}>
      <Bullet isWorldCupMVP={isWorldCupMVP} />
      <span>
        {truncateString(description,
          { maxChars: DESCRIPTION_MAX_LENGTH, checkFeature: false })}
      </span>
    </Post>
  );
};

/**
 * Get Recent Titled Posts
 * @param {Array} recentTitledPosts - array containing the titled posts
 * @param {Array} recentPostTitles - array with only post titles
 * @returns {Array}
 */
const getRecentTitledPosts = (recentTitledPosts, recentPostTitles) => {
  if (isValidArray(recentTitledPosts)) {
    return recentTitledPosts.map(post => ({
      title: post?.title,
      uri: post?.uri,
      uid: post?.uid,
    }));
  }

  return isValidArray(recentPostTitles) && recentPostTitles.map((post, idx) => ({
    title: post,
    uid: idx,
  }));
};

/**
 * SquareLiveblogPosts
 * @param {!Object} props - Props for this component
 * @param {string} [props.description] - Live blog description
 * @param {array} [props.recentPostTitles] - List of latest titles for this blog
 * @param {array} [props.recentTitledPosts] - List of latest posts with titles
 * @param {Object} [props.style] - Styles override
 * @param {string} [props.title] - Title of the blog
 * @param {string} [props.uid] - Live blog uid
 * @param {Object} [props.widgetContext] - Widget context
 * @returns {JSX}
 */
const SquareLiveblogPosts = ({
  className,
  description,
  isDark,
  recentPostTitles,
  recentTitledPosts,
  size,
  style,
  title,
  uid,
  widgetContext,
}) => {
  const trackClick = CardTracker.onClickHandler({ uid, title }, widgetContext);

  const posts = useMemo(() => getRecentTitledPosts(recentTitledPosts, recentPostTitles),
    [recentTitledPosts, recentPostTitles]);

  return (
    <PostsWrapper className={className} style={style} size={size} isDark={isDark}>
      <Posts size={size} isDark={isDark}>
        {renderRecentPosts(
          size,
          description,
          posts,
          trackClick,
          isDark,
        )}
      </Posts>
      <PostsOverlay size={size} isDark={isDark} />
    </PostsWrapper>
  );
};

SquareLiveblogPosts.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  isDark: PropTypes.bool,
  recentPostTitles: PropTypes.array,
  recentTitledPosts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      uri: PropTypes.string,
    })
  ),
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  title: PropTypes.string,
  uid: PropTypes.string,
  widgetContext: PropTypes.object,
};

export default SquareLiveblogPosts;
