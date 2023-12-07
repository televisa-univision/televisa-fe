import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';

import { exists, getKey } from '@univision/fe-commons/dist/utils/helpers';
import { getPageCategory, getDomain } from '@univision/fe-commons/dist/store/storeHelpers';
import Header from '@univision/fe-components-base/dist/components/Header';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import ThemeStyle from '@univision/fe-commons/dist/utils/themes/ThemeStyle';
import GlobalWidget from '../../layout/GlobalWidget';
import MainWrapper from '../../layout/MainWrapper';
import LiveBlogOpening from './Opening/LiveBlogOpening';
import LiveBlogBody from './LiveBlogBody';
import LiveBlogMetadata from './LiveBlogMetadata';
import Styles from './LiveBlog.scss';

/**
 * LiveBlog page component
 * @param {Object} props Component properties
 * @returns {XML}
 */
const LiveBlog = ({ page, displayRefrehButton }) => {
  if (exists(page)) {
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
      <Provider store={Store}>
        <Fragment>
          <MainWrapper state={Store.getState()}>
            <Header pageData={page} pageCategory={getPageCategory(Store)} />
            <GlobalWidget />
            <div className={classnames('uvs-container', Styles.container)}>
              <LiveBlogMetadata page={page} domain={getDomain(Store)} />
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
                <LiveBlogBody displayRefrehButton={displayRefrehButton} />
              </ThemeStyle>
            </div>
            <Footer />
          </MainWrapper>
        </Fragment>
      </Provider>
    );
  }

  return null;
};

LiveBlog.propTypes = {
  page: PropTypes.object,
  // For easy verification in storybook
  displayRefrehButton: PropTypes.bool,
};

LiveBlog.defaultProps = {
  displayRefrehButton: false,
};

export default LiveBlog;
