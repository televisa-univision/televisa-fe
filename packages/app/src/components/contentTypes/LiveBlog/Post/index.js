/* eslint-disable react/no-array-index-key */
import React, { Fragment, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Timeago from 'react-timeago';
import classnames from 'classnames';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import bgPattern from '@univision/fe-commons/dist/assets/images/striped-background.svg';
import { hasKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import { cleanEnhancementsInBody } from '@univision/fe-commons/dist/utils/text';
import formatDate from '@univision/fe-utilities/helpers/date/formatDate';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import { getTimeAgoFormatter } from '@univision/fe-commons/dist/utils/datetime';
import { pageSelector, isTelevisaSiteSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Meta from '@univision/fe-components-base/dist/components/Meta/Meta';
import ShareBar from '@univision/fe-components-base/dist/components/ShareBar';
import features from '@univision/fe-commons/dist/config/features';

import BodyChunk from '../../../base/BodyChunk';
import Styles from './Post.scss';
import trackEnhancementClick from '../../../base/Enhancement/util';

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
  const pageData = useSelector(pageSelector);
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const timeAgoMVPcolor = isWorldCupMVP ? theme.anchor : theme.primary;
  const isTelevisaSite = features.televisa.isTelevisaSite();

  /**
   * Track click on enhanced chunks
   * @param {Object} item - body chunk
   * @returns {Function}
   */
  const track = useCallback((item) => {
    return trackEnhancementClick(item, pageData);
  }, [pageData]);

  return (
    <div
      className={classnames(Styles.container, { [Styles.isPinned]: isPinned })}
      style={{ background: isPinned ? 'none' : `url(${bgPattern}) repeat-y` }}
      id={post.shortId}
    >
      <div className={Styles.header}>
        {isPinned && (
          <div className={Styles.pinnedWrapper}>
            <div
              className={Styles.pin}
              style={{ backgroundColor: theme.liveblogPostsTheme || theme.primary }}
            >
              <Icon name="pushPin" size="xsmall" />
            </div>
            <span
              style={{ color: theme.liveblogPostsTheme || theme.primary }}
              className={classnames(Styles.pinned, 'uvs-font-a-bold')}
            >
              {localization.get('pinned')}
            </span>
          </div>
        )}
        <div
          className={classnames(Styles.time, {
            [Styles.pinnedTime]: isPinned,
            [Styles.timeMVP]: isWorldCupMVP,
          })}
        >
          {
            !hideTimestamp && (
              <Fragment>
                <div
                  className={classnames(
                    Styles.timeago,
                    { [Styles.isPinned]: isPinned },
                    { [Styles.timeagoMVP]: isWorldCupMVP },
                    'uvs-font-a-bold',
                  )}
                  style={{
                    color: theme.liveblogPostsTheme || timeAgoMVPcolor,
                    borderColor: theme.liveblogPostsTheme || timeAgoMVPcolor,
                  }}
                >
                  <Timeago
                    date={post.publishDate}
                    formatter={getTimeAgoFormatter(localization.getCurrentLanguage())}
                  />
                  <span
                    className={
                      classnames({ [Styles.borderMVP]: isWorldCupMVP },
                        isTelevisaSite ? Styles.borderTelevisa : Styles.border)
                    }
                    style={{ borderColor: theme.liveblogPostsTheme || timeAgoMVPcolor }}
                  />
                </div>
                <div
                  className={Styles.plain}
                  style={{ color: isTelevisaSite ? '#808080' : 'initial' }}
                >{formatDate(new Date(post.publishDate))}
                </div>
              </Fragment>
            )}
        </div>
      </div>
      <div className={Styles.content}>
        <h2
          className={classnames({ [Styles.titleMVP]: isWorldCupMVP }, Styles.title)}
        >
          {post.title}
        </h2>
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
              <BodyChunk
                key={idx}
                {...item}
                isLiveBlog
                onClick={track(item)}
                className={classnames({ [Styles.postChunkMVP]: isWorldCupMVP },
                  Styles.postChunk)}
              />
            ))}
        </div>
        {!isWorldCupMVP && (
          <ShareBar
            compact
            theme="rounded"
            className={Styles.sharingBar}
            padLeft={false}
            sharingOptions={sharingOptions}
            onClick={name => SocialTracker
              .track(SocialTracker.events.share, { name, ...shareData })}
          />
        )}
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
      options: PropTypes.object,
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
