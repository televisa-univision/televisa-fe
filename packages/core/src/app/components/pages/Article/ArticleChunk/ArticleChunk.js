import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import Loadable from 'react-loadable';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { hasKey, getKey, isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import {
  getTheme,
  getPageData,
  getRequestParams,
} from '@univision/fe-commons/dist/store/storeHelpers';
import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import LazyLoading from '@univision/fe-commons/dist/components/LazyLoad';
import loadingModes from '@univision/fe-commons/dist/components/LazyLoad/modes.json';

import { ContentPlaceholder } from '@univision/fe-components-base/dist/components/Placeholder';
import RawHtmlContainer from '@univision/fe-components-base/dist/components/enhancements/RawHtmlContainer';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';

import SlideshowPlaceholder from '../../HorizontalSlideshow/Layouts/Inline/Placeholder';

import Styles from './ArticleChunk.scss';

/**
 * Track clicks on images and articles enhancements.
 * @param {string} enhancementType article|image
 * @param {Object} article the full article object
 * @returns {function} the async function to be calld on click
 */
const trackArticleClick = (enhancementType, article) => {
  return () => {
    ArticleTracker.track(ArticleTracker.events.enhancementClick, {
      enhancementType,
      uid: article.uid,
      title: article.title,
      primaryTag: article.primaryTag,
    });
  };
};

const enhancementMap = {
  image: () => import(/* webpackChunkName: "articleEnhancements" */ '@univision/fe-components-base/dist/components/enhancements/InlineImage'),
  article: () => import(/* webpackChunkName: "articleEnhancements" */ '@univision/fe-components-base/dist/components/enhancements/RelatedArticle'),
  video: () => import(/* webpackChunkName: "articleEnhancements/video" */ '@univision/fe-video/dist/components/enhancements/Video'),
  livestream: () => import(/* webpackChunkName: "articleEnhancements/video" */ '@univision/fe-video/dist/components/enhancements/LiveStream'),
  slideshow: () => import(/* webpackChunkName: "articleEnhancements" */ 'components/pages/HorizontalSlideshow/SlideshowWrapper'),
  quoteenhancement: () => import(/* webpackChunkName: "articleEnhancements/quote" */ '@univision/fe-components-base/dist/components/enhancements/Quote'),
};

/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/**
 * inspects objectData and determins
 * which type of enhancement to render
 * @param   {Object} objectData the enhancement object
 * @param   {Object} article the full article object
 * @param   {boolean} isLiveBlog whether it is a liveblog enhancement
 * @param   {string} className Custom class name
 * @returns {JSX} the enhancement component to be rendered
 */
export const getEnhancement = (
  { objectData, enhancementData },
  article,
  isLiveBlog = false,
  className
) => {
  let finalEnhancement;
  const type = getKey(objectData, 'type');
  const enhancementProps = { ...objectData, className };
  // if type not defined return
  if (!type) return null;

  const loadableSettings = {
    loader: enhancementMap[type],
    loading: ContentPlaceholder,
  };
  switch (type) {
    case 'image': {
      enhancementProps.onClick = trackArticleClick(type, article);
      enhancementProps.fullWidth = true;
      enhancementProps.alignment = enhancementData.alignment;
      enhancementProps.lazyload = true;
      break;
    }
    case 'slideshow': {
      enhancementProps.fullWidth = true;
      enhancementProps.type = 'inline';
      enhancementProps.autoplay = false;
      enhancementProps.lazyload = !Array.isArray(objectData.slides)
        ? {
          fetchMode: loadingModes.lazy,
        }
        : true;
      enhancementProps.nextSlideshows = null;

      loadableSettings.loading = () => <SlideshowPlaceholder {...enhancementProps} />;
      break;
    }
    case 'video': {
      enhancementProps.fullWidth = true;
      enhancementProps.env = getRequestParams(Store).mode;
      enhancementProps.pageData = getPageData(Store);
      enhancementProps.widgetData = objectData;
      break;
    }
    case 'livestream': {
      enhancementProps.fullWidth = true;
      break;
    }
    case 'article': {
      enhancementProps.onClick = trackArticleClick(type, article);
      enhancementProps.alignment = enhancementData.alignment;
      enhancementProps.theme = getTheme(Store);
      enhancementProps.isLiveBlog = isLiveBlog;
      break;
    }
    case 'quoteenhancement': {
      enhancementProps.text = enhancementData.text;
      enhancementProps.type = hasKey(enhancementData, 'quoteType.name')
        ? enhancementData.quoteType.name.toLowerCase()
        : undefined;
      enhancementProps.theme = getTheme(Store);
      break;
    }
    case 'externalcontent': {
      const responseData = getKey(objectData, 'responseData', {});
      const { html = '', fullWidth } = responseData;

      finalEnhancement = (
        <RawHtmlContainer
          html={html}
          settingsExternalContent={responseData}
        />
      );
      // Some external content must be full-width on all breakpoints
      if (fullWidth) {
        finalEnhancement = (
          <FullWidth breakpoints={['xxs', 'xs', 'sm', 'md', 'lg', 'xl']}>
            {finalEnhancement}
          </FullWidth>
        );
      }
      return finalEnhancement;
    }
    case 'rawhtml': {
      return objectData?.html ? <RawHtmlContainer html={objectData.html} /> : null;
    }
    default:
      return null;
  }

  const LoadableWidget = Loadable(loadableSettings);
  finalEnhancement = <LoadableWidget {...enhancementProps} />;
  if (enhancementProps.fullWidth) {
    finalEnhancement = <FullWidth breakpoints={['xxs', 'xs']}>{finalEnhancement}</FullWidth>;
  }

  if (isValidObject(enhancementProps.lazyload)) {
    finalEnhancement = (
      <LazyLoading
        uri={objectData.uri}
        placeholder={loadableSettings.loading()}
        {...enhancementProps.lazyload}
      >
        {data => (
          <FullWidth breakpoints={['xxs', 'xs']}>
            <LoadableWidget {...data} {...enhancementProps} />
          </FullWidth>
        )}
      </LazyLoading>
    );
  } else if (enhancementProps.lazyload === true) {
    finalEnhancement = (
      <LazyLoad height={100} once>
        {finalEnhancement}
      </LazyLoad>
    );
  }
  return finalEnhancement;
};

/* eslint-enable react/prop-types */
/**
 * ArticleChunk - render article content based on it's type
 * @param  {Object} props component props
 * @returns {JSX}
 */
export default function ArticleChunk({
  type,
  value,
  article,
  isLiveBlog,
  className,
  ...enhancementData
}) {
  switch (type) {
    case 'text':
      return (
        <div
          dangerouslySetInnerHTML={{ __html: value }}
          className={classnames({ [Styles.h3Container]: value.startsWith('<h3') })}
        />
      );
    case 'ad':
      return value;
    case 'enhancement':
      return (
        <ErrorBoundary>
          {getEnhancement(enhancementData, article, isLiveBlog, className)}
        </ErrorBoundary>
      );
    default:
      return null;
  }
}

ArticleChunk.propTypes = {
  type: PropTypes.oneOf(['text', 'enhancement', 'ad']),
  value: PropTypes.node,
  article: PropTypes.object,
  isLiveBlog: PropTypes.bool,
  className: PropTypes.string,
};

ArticleChunk.defaultProps = {
  isLiveBlog: false,
};
