import React, { Fragment, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Timeago from 'react-timeago';
import classnames from 'classnames';

import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { getKey, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import { getTimeAgoFormatter } from '@univision/fe-commons/dist/utils/datetime';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';

import aspectRatios from '@univision/fe-components-base/dist/components/Picture/aspectRatios';
import ShareBar from '@univision/fe-components-base/dist/components/ShareBar';
import Link from '@univision/fe-components-base/dist/components/Link';
import { EmptyPlaceholder } from '@univision/fe-components-base/dist/components/Placeholder';
import { pageSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';

import BodyChunk from '../../../base/BodyChunk';
import Styles from './ExpertPost.scss';
import trackEnhancementClick from '../../../base/Enhancement/util';

const TwitterFollow = dynamic(() => import(/* webpackChunkName: "twitterFollow" */ '@univision/fe-components-base/dist/components/TwitterFollow'), {
  loading: EmptyPlaceholder,
});

/**
 * ExpertPost component for LiveBlog
 * @returns {JSX}
 */
const ExpertPost = ({
  hideTimestamp, post, theme, shareData,
}) => {
  const author = getKey(post, 'authors.0', null);
  const authorImage = getRenditionUrl(getKey(post, 'authors.0.image.renditions.original', {}), aspectRatios['1x1'].xxsm);
  const authorTwitter = getKey(post, 'authors.0.socialNetworks.twitterUrl.url', null);
  const sharingOptions = getKey(post, 'sharing.options', {});
  const pageData = useSelector(pageSelector);

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
      className={classnames(Styles.container, { [Styles.flex]: authorImage })}
      id={post?.shortId}
    >
      {authorImage && (
        <div
          className={Styles.avatar}
          style={{
            backgroundImage: `url(${authorImage})`,
          }}
        />
      )}
      <div>
        <div className={Styles.header}>
          {author && (
            <Fragment>
              <div className={Styles.author}>
                {authorImage && (
                  <div
                    className={Styles.mobileAvatar}
                    style={{
                      backgroundImage: `url(${authorImage})`,
                    }}
                  />
                )}
                <div className={Styles.authorInfo}>
                  <div className={Styles.name} style={{ color: theme?.primary }}>
                    {author.uri ? (
                      <Link href={author.uri} style={{ color: theme?.primary }}>
                        {author.firstName} {author.lastName}
                      </Link>
                    ) : (
                      `${author.firstName} ${author.lastName}`
                    )}
                  </div>
                  {author.shortDescription && (
                    <div className={Styles.shortDescription}>{author.shortDescription}</div>
                  )}
                  {authorTwitter && (
                    <div className={Styles.twitter}>
                      <TwitterFollow twitterUrl={authorTwitter} windowSize={520} />
                    </div>
                  )}
                  {!hideTimestamp && (
                    <div
                      className={classnames(Styles.timeago, 'uvs-font-a-bold')}
                      style={{ color: theme?.primary }}
                    >
                      <Timeago
                        date={post?.publishDate}
                        formatter={getTimeAgoFormatter(localization.getCurrentLanguage())}
                      />
                    </div>
                  )}
                </div>
              </div>
              {author.miniBio && (
                /* eslint-disable react/no-danger */
                <div
                  className={Styles.description}
                  dangerouslySetInnerHTML={{ __html: author.miniBio }}
                />
              )}
            </Fragment>
          )}
        </div>
        <div className={Styles.content}>
          {hasKey(post, 'body.referentialText')
            && post.body.referentialText.map((item, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <BodyChunk key={idx} {...item} isLiveBlog onClick={track(item)} />
            ))}
          <div className={Styles.disclaimer}>– {localization.get('opinionDisclaimer')} –</div>
          <ShareBar
            compact
            theme="rounded"
            className={Styles.sharingBar}
            padLeft={false}
            sharingOptions={sharingOptions}
            onClick={name => SocialTracker.track(SocialTracker.events.share, { name, ...shareData })
            }
          />
        </div>
      </div>
    </div>
  );
};

ExpertPost.propTypes = {
  hideTimestamp: PropTypes.bool,
  post: PropTypes.shape({
    title: PropTypes.string,
    publishDate: PropTypes.string,
    body: PropTypes.shape({
      referentialText: PropTypes.array,
    }),
    shortId: PropTypes.string,
  }).isRequired,
  theme: PropTypes.object,
  shareData: PropTypes.object,
};

ExpertPost.defaultProps = {
  hideTimestamp: false,
  theme: {},
};

export default ExpertPost;
