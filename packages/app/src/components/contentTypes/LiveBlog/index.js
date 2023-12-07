import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import ThemeStyle from '@univision/fe-commons/dist/utils/themes/ThemeStyle';

import ConnectedGlobalWidget from '../../base/GlobalWidget';
import LiveBlogMetadata from './LiveBlogMetadata';
import LiveBlogOpening from './Opening';
import ConnectedLiveBlogBody from './LiveBlogBody';
import Styles from './LiveBlog.styles';

const Container = styled.div`${Styles.container}`;

/**
 * LiveBlog page component
 * @param {Object} props Component properties
 * @returns {XML}
 */
const LiveBlog = ({ pageData, displayRefrehButton }) => {
  const page = getKey(pageData, 'data');
  if (!page) return null;

  const shareData = {
    uid: page.uid,
    primaryTag: page.primaryTag,
    title: page.title,
    type: 'liveblog',
  };
  const leadMedia = getKey(page, 'leadMedia') || getKey(page, 'lead');
  const sharingOptions = getKey(page, 'sharing.options', {});
  const publishDate = page?.mostRecentPostPublishDate || page?.publishDate;

  return (
    <Fragment>
      <ConnectedGlobalWidget />
      <Container className="uvs-container">
        <LiveBlogMetadata page={page} domain={pageData.domain} />
        <ThemeStyle>
          <LiveBlogOpening
            title={page.title}
            description={page.description}
            linkableBulletedDescription={page.linkableBulletedDescription}
            richTextDescription={page.richTextDescription}
            hideLabel={page.hideLabel}
            published={publishDate}
            authors={page.authors}
            tempAuthors={page.tempAuthors}
            source={page.source}
            sharingOptions={sharingOptions}
            shareData={shareData}
            leadMedia={leadMedia}
            displayLeadMedia={page.displayLeadMedia}
            key="Opening"
          />
          <ConnectedLiveBlogBody displayRefrehButton={displayRefrehButton} />
        </ThemeStyle>
      </Container>
    </Fragment>
  );
};

LiveBlog.propTypes = {
  pageData: PropTypes.object,
  // For easy verification in storybook
  displayRefrehButton: PropTypes.bool,
};

LiveBlog.defaultProps = {
  displayRefrehButton: false,
};

export default LiveBlog;
