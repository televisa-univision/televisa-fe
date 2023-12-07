import React from 'react';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';

import { ImagePlaceholder } from '@univision/fe-components-base/dist/components/Placeholder';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import Store from '@univision/fe-commons/dist/store/store';
import {
  hasKey,
  isValidObject,
  isValidArray,
  getKey,
} from '@univision/fe-commons/dist/utils/helpers';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import LazyLoading from '@univision/fe-commons/dist/components/LazyLoad';
import loadingModes from '@univision/fe-commons/dist/components/LazyLoad/modes.json';

import SlideshowPlaceholder, {
  PlaceholderAsFunction,
} from '../../HorizontalSlideshow/Layouts/Inline/Placeholder';

/**
 * Returns a react-loadable component for the article lead.
 * @param {Object} lead Article lead
 * @param {boolean} isFullWidth whether lead is full width
 * @param {string} leadType Gets default or overrided leadType
 * @returns {*}
 */
export function getLoadableArticleLead(lead = {}, isFullWidth, leadType = null) {
  if (!hasKey(lead, 'type')) {
    return null;
  }

  switch (leadType) {
    case 'image':
      return Loadable({
        loader: () => import(/* webpackChunkName: "articleLead/InlineImage" */ '@univision/fe-components-base/dist/components/enhancements/InlineImage'),
        loading: ImagePlaceholder(lead, true, isFullWidth),
      });
    case 'video':
      return Loadable({
        loader: () => import(/* webpackChunkName: "articleLead/video" */ '@univision/fe-video/dist/components/VideoPlayer'),
        loading: ImagePlaceholder(lead.image),
      });
    case 'videoPlaylist':
      return Loadable({
        loader: () => import(/* webpackChunkName: "articleLead/video" */ '@univision/fe-components-base/dist/components/widgets/VideoWithPlaylist'),
        loading: ImagePlaceholder(lead.image),
      });
    case 'livestream':
      return Loadable({
        loader: () => import(/* webpackChunkName: "articleLead/video" */ '@univision/fe-video/dist/components/enhancements/LiveStream'),
        loading: ImagePlaceholder(lead.image),
      });
    case 'slideshow':
      return Loadable({
        loader: () => import(/* webpackChunkName: "articleEnhancements" */ 'components/pages/HorizontalSlideshow/SlideshowWrapper'),
        loading: PlaceholderAsFunction(lead),
      });
    default:
      return null;
  }
}

/**
 * ArticleLead
 * @param {Object} props component props
 * @returns {JSX}
 */
export default function ArticleLead({ lead, isFullWidth, articleDepth }) {
  if (!hasKey(lead, 'type')) {
    return null;
  }

  let leadType = lead.type;
  const relatedVideos = getKey(getPageData(Store), 'data.videoLeadRelatedContent', null);

  // If lead is video and related videos exist show a playlist
  if (isValidArray(relatedVideos) && leadType === 'video') {
    leadType = 'videoPlaylist';
  }

  const LoadableLead = getLoadableArticleLead(lead, isFullWidth, leadType);
  let leadProps = {};
  let child;

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
        settings: {},
        autoplay: articleDepth === 1,
        fullWidthSettings: ['xxs', 'xs'],
        playlistView: 'horizontal',
      };

      break;
    }

    case 'video': {
      leadProps = {
        fullWidthSettings: ['xxs', 'xs'],
        autoplay: articleDepth === 1,
        hideMeta: true,
        hidePlaylist: true,
        store: Store,
        widgetData: lead,
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

  if (isValidObject(leadProps.lazyload)) {
    child = (
      <LazyLoading uri={lead.uri} {...leadProps.lazyload}>
        {data => (
          <FullWidth breakpoints={['xxs', 'xs']}>
            <ErrorBoundary>
              <LoadableLead {...data} {...leadProps} />
            </ErrorBoundary>
          </FullWidth>
        )}
      </LazyLoading>
    );
  } else {
    child = (
      <ErrorBoundary>
        <LoadableLead {...leadProps} />
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
 */
ArticleLead.propTypes = {
  lead: PropTypes.shape({
    type: PropTypes.oneOf(['image', 'video', 'slideshow']),
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
  articleDepth: PropTypes.number,
  isFullWidth: PropTypes.bool,
};

ArticleLead.defaultProps = {
  lead: {},
  isFullWidth: false,
};
