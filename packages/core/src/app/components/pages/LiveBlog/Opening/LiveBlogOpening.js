import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import classnames from 'classnames';
import { connect } from 'react-redux';

import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import Meta from '@univision/fe-components-base/dist/components/Meta/Meta';
import Link from '@univision/fe-components-base/dist/components/Link';
import {
  EmptyPlaceholder,
  ImagePlaceholder,
} from '@univision/fe-components-base/dist/components/Placeholder';
import Store from '@univision/fe-commons/dist/store/store';
import { getKey, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import {
  getDevice,
  getPreloadedComponents,
} from '@univision/fe-commons/dist/store/storeHelpers';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';

import ContentHeader from 'components/layout/ContentHeader/ContentHeader';
import Styles from './LiveBlogOpening.scss';

/**
 * Returns a react-loadable component for the article lead.
 * @param {Object} lead Article lead
 * @returns {*}
 */
export function getLoadableLiveblogLead(lead = {}) {
  if (!hasKey(lead, 'type')) {
    return null;
  }

  let Component = null;
  switch (lead.type) {
    case 'image':
      Component = Loadable({
        loader: () => import(/* webpackChunkName: "liveblogLead/InlineImage" */ '@univision/fe-components-base/dist/components/enhancements/InlineImage'),
        loading: EmptyPlaceholder,
      });
      break;
    case 'video':
      Component = Loadable({
        loader: () => import(/* webpackChunkName: "liveblogLead/video" */ '@univision/fe-video/dist/components/VideoPlayer'),
        loading: ImagePlaceholder(lead.image),
      });
      break;
    case 'livestream':
      Component = Loadable({
        loader: () => import(/* webpackChunkName: "liveblogLead/video" */ '@univision/fe-video/dist/components/enhancements/LiveStream'),
        loading: ImagePlaceholder(lead.image),
      });
      break;
    // no default
  }

  const LoadableLead = getPreloadedComponents(Store).liveblogLead || Component;
  let leadProps = {};
  let child;

  switch (lead.type) {
    case 'image': {
      leadProps = {
        fullWidthSettings: ['xxs', 'xs'],
        ...lead,
      };
      break;
    }
    case 'video': {
      leadProps = {
        fullWidthSettings: ['xxs', 'xs'],
        autoplay: true,
        hideMeta: true,
        hidePlaylist: true,
        ...lead,
      };
      break;
    }
    case 'livestream': {
      leadProps = {
        fullWidthSettings: ['xxs', 'xs'],
        ...lead,
      };
      break;
    }
    // no default
  }

  if (!LoadableLead) {
    return null;
  }

  child = <LoadableLead {...leadProps} className={Styles.enhancementWrapper} />;
  child = <FullWidth breakpoints={leadProps.fullWidthSettings}>{child}</FullWidth>;

  return <div className={Styles.lead}>{child}</div>;
}

/**
 * Get the header description prop
 * @param {Object} descriptions the bullet or rich descriptions
 * @returns {JSX}
 */
export const getDescription = (descriptions) => {
  const { description, linkableBulletedDescription, richTextDescription } = descriptions;

  if (linkableBulletedDescription && linkableBulletedDescription.length) {
    /* eslint-disable react/no-array-index-key */
    return (
      <ul>
        {linkableBulletedDescription.map((item, idx) => (
          <li>
            {item.link ? (
              <Link key={idx} to={item.link}>
                {item.text}
              </Link> // eslint-disable-line
            ) : (
              <p key={idx}>{item.text}</p>
            ) // eslint-disable-line
            }
          </li>
        ))}
      </ul>
    );
  } if (richTextDescription && richTextDescription.length) {
    return richTextDescription.map((item, idx) => (
      <p key={idx} dangerouslySetInnerHTML={{ __html: item.value }} /> // eslint-disable-line
    ));
  }

  return description;
};

/**
 * Opening component for LiveBlog
 * @param {Object} props Component props
 * @returns {JSX}
 */
export const Opening = (props) => {
  const {
    description,
    linkableBulletedDescription,
    richTextDescription,
    hideLabel,
    title,
    authors,
    tempAuthors,
    published,
    source,
    sharingOptions,
    shareData,
    leadMedia,
    displayLeadMedia,
  } = props;
  const device = getDevice(Store);
  const pageDescription = getDescription({
    description,
    linkableBulletedDescription,
    richTextDescription,
  });

  const ShareBar = Loadable({
    loader: () => import(/* webpackChunkName: "shareBar" */ '@univision/fe-components-base/dist/components/ShareBar'),
    loading: EmptyPlaceholder,
  });

  return (
    <div className={classnames('row', Styles.container)} data-component-name="opening">
      <div className={classnames('col-sm-12', 'col-md-10', 'col-lg-8', Styles.offset_2)}>
        {!hideLabel && (
          <div className={Styles.labelWrapper}>
            <div className={classnames(Styles.label, 'uvs-font-a-bold')}>
              <span>&#9679;</span> Liveblog
            </div>
          </div>
        )}
        <ContentHeader
          dark
          title={title}
          description={pageDescription}
          className={Styles.contentHeader}
        />
        <div className={Styles.meta}>
          <Meta
            showAvatar
            authors={Array.isArray(authors) && authors.length > 0 ? authors : null}
            tempAuthors={Array.isArray(tempAuthors) && tempAuthors.length > 0 ? tempAuthors : null}
            date={published}
            source={source}
          />
          <ShareBar
            compact
            theme="rounded"
            padLeft={false}
            className={Styles.shareBar}
            sharingOptions={sharingOptions}
            device={device}
            onClick={name => SocialTracker.track(SocialTracker.events.share, { name, ...shareData })
            }
          />
        </div>
        {displayLeadMedia && getLoadableLiveblogLead(leadMedia)}
        <hr className={Styles.separator} />
      </div>
    </div>
  );
};

/**
 * Connector to subscribe on popups store changes
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{popups: Object}}
 */
export const mapStateToProps = (state, ownProps) => {
  return {
    displayLeadMedia: getKey(state, 'liveBlog.displayLeadMedia', getKey(ownProps, 'displayLeadMedia')),
  };
};

Opening.propTypes = {
  description: PropTypes.string,
  linkableBulletedDescription: PropTypes.array,
  richTextDescription: PropTypes.array,
  hideLabel: PropTypes.bool,
  title: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.object),
  tempAuthors: PropTypes.arrayOf(PropTypes.object),
  published: PropTypes.string,
  source: PropTypes.string,
  sharingOptions: PropTypes.object,
  shareData: PropTypes.object,
  leadMedia: PropTypes.object,
  displayLeadMedia: PropTypes.bool,
};

Opening.defaultProps = {
  description: '',
  linkableBulletedDescription: [],
  richTextDescription: [],
  hideLabel: false,
  title: '',
  displayLeadMedia: true,
};

export default connect(mapStateToProps)(Opening);
