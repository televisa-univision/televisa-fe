/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Timeago from 'react-timeago';
import classnames from 'classnames';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import bgPattern from '@univision/fe-commons/dist/assets/images/striped-background.svg';
import { hasKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import { cleanEnhancementsInBody } from '@univision/fe-commons/dist/utils/text';
import formatDate from '@univision/fe-utilities/helpers/date/formatDate';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Meta from '@univision/fe-components-base/dist/components/Meta/Meta';
import ShareBar from '@univision/fe-components-base/dist/components/ShareBar';
import ArticleChunk from '../../Article/ArticleChunk/ArticleChunk';

import { getTimeAgoFormatter } from '../helpers';
import Styles from './Post.scss';

/**
 * Post component for LiveBlog
 * @param {Object} props Component props
 * @returns {JSX}
 */
const Post = (props) => {
  const {
    post, isPinned, theme, shareData, hideTimestamp,
  } = props;
  let sharingOptions = {};
  if (hasKey(post, 'sharing.options')) {
    sharingOptions = post.sharing.options;
  }

  return (
    <div
      className={classnames(Styles.container, { [Styles.isPinned]: isPinned })}
      style={{ background: isPinned ? 'none' : `url(${bgPattern}) repeat-y` }}
      id={post.shortId}
    >
      <div className={Styles.header}>
        {isPinned && (
          <div className={Styles.pinnedWrapper}>
            <div className={Styles.pin} style={{ backgroundColor: theme.primary }}>
              <Icon name="pushPin" size="xsmall" />
            </div>
            <span
              style={{ color: theme.primary }}
              className={classnames(Styles.pinned, 'uvs-font-a-bold')}
            >
              {localization.get('pinned')}
            </span>
          </div>
        )}
        <div className={classnames(Styles.time, { [Styles.pinnedTime]: isPinned })}>
          {
            !hideTimestamp && (
            <Fragment>
              <div
                className={classnames(
                  Styles.timeago,
                  { [Styles.isPinned]: isPinned },
                  'uvs-font-a-bold'
                )}
                style={{ color: theme.primary, borderColor: theme.primary }}
              >
                <Timeago
                  date={post.publishDate}
                  formatter={getTimeAgoFormatter(localization.getCurrentLanguage())}
                />
                <span className={Styles.border} style={{ borderColor: theme.primary }} />
              </div>
              <div className={Styles.plain}>{formatDate(new Date(post.publishDate))}</div>
            </Fragment>
            )}
        </div>
      </div>
      <div className={Styles.content}>
        <h2 className={Styles.title}>{post.title}</h2>
        <div className={Styles.metaWrapper}>
          <Meta
            showAvatar={false}
            authors={isValidArray(post.authors) ? post.authors : null}
            tempAuthors={isValidArray(post.tempAuthors) ? post.tempAuthors : null}
          />
        </div>
        <div className={Styles.postChunksWrapper}>
          {hasKey(post, 'body.referentialText')
          && cleanEnhancementsInBody(post.body.referentialText).map((item, idx) => (
            <ArticleChunk key={idx} {...item} isLiveBlog className={Styles.postChunk} />
          ))}
        </div>
        <ShareBar
          compact
          theme="rounded"
          className={Styles.sharingBar}
          padLeft={false}
          sharingOptions={sharingOptions}
          onClick={name => SocialTracker
            .track(SocialTracker.events.share, { name, ...shareData })}
        />
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    publishDate: PropTypes.string,
    body: PropTypes.shape({
      referentialText: PropTypes.array,
    }),
    sharing: PropTypes.shape({
      options: PropTypes.array,
    }),
    shortId: PropTypes.string,
    authors: PropTypes.array,
    tempAuthors: PropTypes.array,
  }).isRequired,
  theme: PropTypes.object,
  isPinned: PropTypes.bool,
  hideTimestamp: PropTypes.bool,
  shareData: PropTypes.object,
};

Post.defaultProps = {
  hideTimestamp: false,
  isPinned: false,
  theme: {},
};

export default Post;
