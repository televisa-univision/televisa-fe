import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import { connect } from 'react-redux';
import styled from 'styled-components';

import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import Meta from '@univision/fe-components-base/dist/components/Meta/Meta';
import Link from '@univision/fe-components-base/dist/components/Link';
import {
  EmptyPlaceholder,
  ImagePlaceholder,
} from '@univision/fe-components-base/dist/components/Placeholder';
import features from '@univision/fe-commons/dist/config/features';

import { getKey, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';

import ContentHeader from '../../../base/ContentHeader';
import Styles from './LiveBlogOpening.styles';

const ShareBar = dynamic(() => import(/* webpackChunkName: "shareBar" */ '@univision/fe-components-base/dist/components/ShareBar'), {
  loading: EmptyPlaceholder,
});

const Lead = styled.div`${Styles.lead}`;
const Container = styled.div`${Styles.container}`;
const Offset2 = styled.div`${Styles.offset2}`;
const LabelWrapper = styled.div`${Styles.labelWrapper}`;
const Label = styled.div`${Styles.label}`;
const StyledContentHeader = styled(ContentHeader)`${Styles.contentHeader}`;
const MetaWrapper = styled.div`${Styles.meta}`;
const ShareBarWrapper = styled(ShareBar)`${Styles.shareBar}`;
const Separator = styled.hr`${Styles.separator}`;

const leadMap = {
  image: dynamic(() => import(/* webpackChunkName: "articleEnhancements-image" */ '@univision/fe-components-base/dist/components/enhancements/InlineImage'), {
    loading: EmptyPlaceholder,
  }),
  video: dynamic(() => import(/* webpackChunkName: "liveblogLead-video" */ '@univision/fe-video/dist/components/VideoPlayer'), {
    loading: ImagePlaceholder,
  }),
  livestream: dynamic(() => import(/* webpackChunkName: "articleEnhancements-livestream" */ '@univision/fe-video/dist/components/enhancements/LiveStream'), {
    loading: ImagePlaceholder,
  }),
};

/**
 * Returns a react-loadable component for the article lead.
 * @param {Object} lead Article lead
 * @param {boolean} liveBlogPerformance if this feature flag is true
 * @returns {*}
 */
export function getLoadableLiveblogLead(lead = {}, liveBlogPerformance) {
  if (!hasKey(lead, 'type')) {
    return null;
  }

  const LoadableLead = leadMap[lead.type];

  let leadProps = {};
  let child;

  switch (lead.type) {
    case 'image': {
      leadProps = {
        ...(liveBlogPerformance && { lazyload: true }),
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
        widgetData: lead,
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

  child = <LoadableLead {...leadProps} />;
  child = <FullWidth breakpoints={leadProps.fullWidthSettings}>{child}</FullWidth>;

  return <Lead>{child}</Lead>;
}

/**
 * Get the header description prop
 * @param {Object} descriptions the bullet or rich descriptions
 * @returns {JSX}
 */
export const getDescription = (descriptions) => {
  const { description, linkableBulletedDescription, richTextDescription } = descriptions;

  if (linkableBulletedDescription && linkableBulletedDescription.length) {
    return (
      <ul>
        {linkableBulletedDescription.map((item, idx) => (
          /* eslint-disable react/no-array-index-key */
          <li key={idx}>
            {item.link ? (
              <Link to={item.link}>
                {item.text}
              </Link>
            ) : (
              <p>{item.text}</p>
            )
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
    device,
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
  // feature flag
  const isLiveBlogFeatureFlag = features.liveblog.liveBlogPerformance();
  const pageDescription = getDescription({
    description,
    linkableBulletedDescription,
    richTextDescription,
  });
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const isTelevisaSite = features.televisa.isTelevisaSite();
  return (
    <Container data-component-name="opening">
      <Offset2 className={classnames('col-sm-12', 'col-md-10', 'col-lg-8')}>
        {!hideLabel && (
          <LabelWrapper isWorldCupMVP={isWorldCupMVP} isTelevisaSite={isTelevisaSite}>
            <Label className="uvs-font-a-bold" isWorldCupMVP={isWorldCupMVP} isTelevisaSite={isTelevisaSite}>
              <span>&#9679;</span> Liveblog
            </Label>
          </LabelWrapper>
        )}
        <StyledContentHeader
          dark
          title={title}
          description={pageDescription}
          isWorldCupMVP={isWorldCupMVP}
          isTelevisaSite={isTelevisaSite}
        />
        <MetaWrapper>
          <Meta
            showAvatar
            authors={Array.isArray(authors) && authors.length > 0 ? authors : null}
            tempAuthors={Array.isArray(tempAuthors) && tempAuthors.length > 0 ? tempAuthors : null}
            date={published}
            source={source}
          />
          {!isWorldCupMVP && (
            <ShareBarWrapper
              compact
              theme="rounded"
              padLeft={false}
              sharingOptions={sharingOptions}
              device={device}
              onClick={name => SocialTracker.track(SocialTracker.events.share,
                { name, ...shareData })
              }
            />
          )}
        </MetaWrapper>
        {displayLeadMedia && getLoadableLiveblogLead(leadMedia, isLiveBlogFeatureFlag)}
        <Separator isWorldCupMVP={isWorldCupMVP} />
      </Offset2>
    </Container>
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
    device: deviceSelector(state),
    displayLeadMedia: getKey(state, 'liveBlog.displayLeadMedia', getKey(ownProps, 'displayLeadMedia')),
  };
};

Opening.propTypes = {
  description: PropTypes.string,
  device: PropTypes.string,
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
