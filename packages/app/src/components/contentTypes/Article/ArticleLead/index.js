import React from 'react';
import PropTypes from 'prop-types';

import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import {
  hasKey,
  isValidObject,
  isValidArray,
  getKey,
} from '@univision/fe-commons/dist/utils/helpers';
import LazyLoading from '@univision/fe-commons/dist/components/LazyLoad';
import loadingModes from '@univision/fe-commons/dist/components/LazyLoad/modes.json';

import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';

import leadTypes from './leadTypes';
import SlideshowPlaceholder from '../../HorizontalSlideshow/Layouts/Inline/Placeholder';

/**
 * Returns a dynamic component for the article lead.
 * @param {string} leadType Gets default or overrided leadType
 * @returns {*}
 */
export function getDynamicArticleLead(leadType) {
  if (!leadType) return null;

  const DynamicLead = leadTypes[leadType] || null;

  return DynamicLead;
}

/**
 * Returns leadProps based on leadType
 * @param {string} leadType from the article content
 * @param {Object} options to setup the leadProps
 * @returns {Object}
 */
function getLeadProps(leadType, {
  isFullWidth,
  lead,
  relatedVideos,
  articleDepth,
}) {
  let leadProps = {};
  switch (leadType) {
    case 'image': {
      leadProps = {
        ...lead,
        isLead: true,
        fullWidth: isFullWidth,
      };
      break;
    }

    case 'videoPlaylist': {
      const content = [lead, ...relatedVideos];

      leadProps = {
        content,
        settings: { uid: lead.uid },
        autoplay: articleDepth === 1,
        fullWidthSettings: ['xxs', 'xs'],
        playlistBelowPlayer: true,
        ...lead,
      };

      break;
    }

    case 'video': {
      leadProps = {
        fullWidthSettings: ['xxs', 'xs'],
        autoplay: articleDepth === 1,
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
    case 'slideshow': {
      leadProps = {
        fullWidthSettings: ['xxs', 'xs'],
        ...lead,
        isLead: true,
        type: 'inline',
        autoplay: false,
        lazyload: !Array.isArray(lead.slides)
          ? {
            fetchMode: loadingModes.lazy,
            placeholder: <SlideshowPlaceholder {...lead} />,
          }
          : true,
        nextSlideshows: null,
      };
      break;
    }
    default:
      return null;
  }

  return leadProps;
}

/**
 * ArticleLead
 * @param {Object} props component props
 * @returns {JSX}
 */
export default function ArticleLead({
  lead,
  isFullWidth,
  articleDepth,
  pageData,
}) {
  if (!hasKey(lead, 'type')) {
    return null;
  }

  let leadType = lead.type;
  const relatedVideos = getKey(pageData, 'data.videoLeadRelatedContent', null);

  // If lead is video and related videos exist show a playlist
  if (isValidArray(relatedVideos) && leadType === 'video') {
    leadType = 'videoPlaylist';
  }

  const DynamicLead = getDynamicArticleLead(leadType);
  const leadProps = getLeadProps(leadType, {
    articleDepth,
    isFullWidth,
    lead,
    relatedVideos,
  });
  let child = null;

  if (!DynamicLead) return <div>{child}</div>;

  if (isValidObject(leadProps.lazyload)) {
    child = (
      <LazyLoading uri={lead.uri} {...leadProps.lazyload}>
        {data => (
          <FullWidth breakpoints={['xxs', 'xs']}>
            <ErrorBoundary>
              <DynamicLead {...data} {...leadProps} data-lead={leadType} />
            </ErrorBoundary>
          </FullWidth>
        )}
      </LazyLoading>
    );
  } else {
    child = (
      <ErrorBoundary>
        <DynamicLead {...leadProps} data-lead={leadType} />
      </ErrorBoundary>
    );

    if (Array.isArray(leadProps.fullWidthSettings)) {
      child = <FullWidth breakpoints={leadProps.fullWidthSettings}>{child}</FullWidth>;
    }
  }

  return <div>{child}</div>;
}

/**
 * propTypes
 * @property {Object} lead the lead object from API
 * @property {String} lead.type the type of lead to display
 * @property {number} articleDepth level of depth / position
 * @property {boolean} isFullWidth true should render the article with full width
 * @property {Object} pageData object from the api
 */
ArticleLead.propTypes = {
  lead: PropTypes.shape({
    type: PropTypes.string,
    mcpid: PropTypes.string,
    sharing: PropTypes.object,
    slides: PropTypes.array,
    uri: PropTypes.string,
    renditions: PropTypes.shape({
      original: PropTypes.shape({
        href: PropTypes.string,
      }),
    }),
  }),
  pageData: PropTypes.object,
  articleDepth: PropTypes.number,
  isFullWidth: PropTypes.bool,
};

ArticleLead.defaultProps = {
  lead: {},
  isFullWidth: false,
};
